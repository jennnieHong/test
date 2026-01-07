package com.example.menu;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final org.springframework.security.authentication.AuthenticationManager authenticationManager;
    // using DB-persisted counters (failedAttempts, locked) on User entity

    public AuthController(UserRepository users, PasswordEncoder encoder, org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration authConfig){
        this.users = users;
        this.encoder = encoder;
        org.springframework.security.authentication.AuthenticationManager am;
        try{
            am = authConfig.getAuthenticationManager();
        }catch(Exception ex){
            am = null;
        }
        this.authenticationManager = am;
    }

    public static class SignupRequest {
        public String username;
        public String password;
        public String email;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req){
        if(req.username==null || req.username.trim().isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","username is required"));
        if(req.password==null || req.password.length()<4) return ResponseEntity.badRequest().body(Map.of("error","password is too short"));

        if(users.findByUsername(req.username).isPresent()){
            return ResponseEntity.status(409).body(Map.of("error","username exists"));
        }

        try{
            String encoded = encoder.encode(req.password);
            User u = new User(req.username, encoded, req.email, "USER");
            users.save(u);
            return ResponseEntity.status(201).body(Map.of("message","ok"));
        }catch(DataIntegrityViolationException ex){
            return ResponseEntity.status(409).body(Map.of("error","constraint"));
        }
    }

    public static class LoginRequest { public String username; public String password; }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req){
        try{
            var maybe = users.findByUsername(req.username);
            if(maybe.isEmpty()){
                return ResponseEntity.status(401).body(Map.of("error","invalid","message","Invalid credentials"));
            }
            User u = maybe.get();
            if(u.isLocked()){
                return ResponseEntity.status(423).body(Map.of("error","locked","message","Account locked due to too many failed attempts"));
            }
            if(!encoder.matches(req.password, u.getPassword())){
                int attemptsCount = u.getFailedAttempts() + 1;
                u.setFailedAttempts(attemptsCount);
                if(attemptsCount >= 3){
                    u.setLocked(true);
                }
                users.save(u);
                int left = Math.max(0, 3 - attemptsCount);
                return ResponseEntity.status(401).body(Map.of("error","invalid_password","attemptsLeft", left, "message","Invalid password"));
            }
            // success: reset counters
            if(u.getFailedAttempts() != 0 || u.isLocked()){
                u.setFailedAttempts(0);
                u.setLocked(false);
                users.save(u);
            }
            return ResponseEntity.ok(Map.of("message","ok"));
        }catch(Exception ex){
            return ResponseEntity.status(500).body(Map.of("error","server","message",ex.getMessage()));
        }
    }
}
