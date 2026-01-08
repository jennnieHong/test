package com.example.menu.controller;

import com.example.menu.config.JwtUtil;
import com.example.menu.model.User;
import com.example.menu.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

/**
 * Controller for handling user authentication and registration.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    /**
     * Constructs the AuthController.
     * @param users The UserRepository.
     * @param encoder The PasswordEncoder.
     * @param jwtUtil The JwtUtil.
     */
    public AuthController(UserRepository users, PasswordEncoder encoder, JwtUtil jwtUtil){
        this.users = users;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Request body for user signup.
     */
    public static class SignupRequest {
        public String username;
        public String password;
        public String email;
        public String nickname;
    }

    /**
     * Handles user registration.
     * @param req The signup request containing user details.
     * @return A ResponseEntity containing the result.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req){
        if(req.username==null || req.username.trim().isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","username is required"));
        if(req.password==null || req.password.length()<4) return ResponseEntity.badRequest().body(Map.of("error","password is too short"));

        if(users.findByUsername(req.username).isPresent()){
            return ResponseEntity.status(409).body(Map.of("error","username exists"));
        }

        try{
            String encoded = encoder.encode(req.password);
            String nickname = (req.nickname != null && !req.nickname.isBlank()) ? req.nickname : req.username;
            // roles is "USER" by default, department is null for now
            User u = new User(req.username, encoded, req.email, nickname, null, "USER");
            users.save(u);
            return ResponseEntity.status(201).body(Map.of("message","ok"));
        }catch(DataIntegrityViolationException ex){
            return ResponseEntity.status(409).body(Map.of("error","constraint"));
        }
    }

    /**
     * Request body for user login.
     */
    public static class LoginRequest { public String username; public String password; }

    /**
     * Handles user login.
     * @param req The login request containing credentials.
     * @return A ResponseEntity containing the auth result, including nickname on success.
     */
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
            String token = jwtUtil.generateToken(u);
            return ResponseEntity.ok(Map.of(
                "message", "ok",
                "token", token,
                "userInfo", Map.of(
                    "nickname", u.getNickname() != null ? u.getNickname() : u.getUsername(),
                    "department", u.getDepartment() != null ? u.getDepartment() : "Unknown",
                    "roles", u.getRoles()
                )
            ));
        }catch(Exception ex){
            return ResponseEntity.status(500).body(Map.of("error","server","message",ex.getMessage()));
        }
    }
    /**
     * Returns the current authenticated user information from the token.
     * @param authHeader The Authorization header.
     * @return User information.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "unauthorized"));
        }
        String token = authHeader.substring(7);
        try {
            String username = jwtUtil.extractUsername(token);
            String nickname = jwtUtil.extractNickname(token);
            String department = jwtUtil.extractDepartment(token);
            String roles = jwtUtil.extractRoles(token);
            
            return ResponseEntity.ok(Map.of(
                "username", username,
                "nickname", nickname != null ? nickname : username,
                "department", department != null ? department : "Unknown",
                "roles", roles
            ));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "invalid_token"));
        }
    }
}
