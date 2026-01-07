package com.example.menu;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;
import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService(UserRepository repo) {
        return username -> {
            var opt = repo.findByUsername(username);
            if(opt.isEmpty()) throw new org.springframework.security.core.userdetails.UsernameNotFoundException("no user");
            var u = opt.get();
            String[] roles = u.getRoles()!=null ? u.getRoles().split(",") : new String[]{"USER"};
            return User.withUsername(u.getUsername()).password(u.getPassword()).roles(roles).build();
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(c -> c.configurationSource(corsConfigurationSource()))
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                // allow anonymous GET for menu list and individual menu nodes
                .requestMatchers(HttpMethod.GET, "/api/menus/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/menus").permitAll()
                // allow anonymous signup
                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                // allow dev seed endpoint without auth (convenience for local dev)
                .requestMatchers(HttpMethod.POST, "/api/admin/seed").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .httpBasic();
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000", "http://localhost:5174", "http://localhost:5175"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
