package com.example.menu.service;

import com.example.menu.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public CustomUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var opt = repo.findByUsername(username);
        if (opt.isEmpty()) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        var u = opt.get();
        String[] roles = u.getRoles() != null ? u.getRoles().split(",") : new String[]{"USER"};
        return User.withUsername(u.getUsername())
                .password(u.getPassword())
                .roles(roles)
                .build();
    }
}
