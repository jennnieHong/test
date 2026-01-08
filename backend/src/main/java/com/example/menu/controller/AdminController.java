package com.example.menu.controller;

import com.example.menu.repository.UserRepository;
import com.example.menu.model.User;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

/**
 * Controller for administrative tasks.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final JdbcTemplate jdbc;
    private final org.springframework.security.crypto.password.PasswordEncoder encoder;

    /**
     * Constructs the AdminController.
     * @param jdbc The JdbcTemplate.
     * @param encoder The PasswordEncoder.
     */
    public AdminController(JdbcTemplate jdbc, org.springframework.security.crypto.password.PasswordEncoder encoder) {
        this.jdbc = jdbc;
        this.encoder = encoder;
    }

    /**
     * Seeds the database with initial data from data.sql.
     * @return A status message.
     */
    @PostMapping("/seed")
    public String seed() {
        try {
            ClassPathResource res = new ClassPathResource("data.sql");
            String sql = new BufferedReader(new InputStreamReader(res.getInputStream(), StandardCharsets.UTF_8))
                    .lines().collect(Collectors.joining("\n"));
                // remove block comments and line comments, then split on semicolon
                String cleaned = java.util.regex.Pattern.compile("/\\*.*?\\*/", java.util.regex.Pattern.DOTALL)
                    .matcher(sql).replaceAll("");
                cleaned = java.util.regex.Pattern.compile("--.*?$", java.util.regex.Pattern.MULTILINE)
                    .matcher(cleaned).replaceAll("");

                String[] parts = cleaned.split(";");
                for (String part : parts) {
                String stmt = part.trim();
                if (stmt.isEmpty()) continue;
                // Replace any marker __ENC__plain__ with a bcrypt-encoded value
                // marker format: __ENC__plain_password__ (conservative, for dev only)
                java.util.regex.Matcher m = java.util.regex.Pattern.compile("__ENC__(.*?)__").matcher(stmt);
                StringBuffer sb = new StringBuffer();
                while (m.find()) {
                    String plain = m.group(1);
                    String encoded = encoder.encode(plain);
                    // escape single quotes for SQL literal
                    String esc = encoded.replace("'", "''");
                    // quote replacement to avoid treating $ signs in bcrypt as group refs
                    m.appendReplacement(sb, java.util.regex.Matcher.quoteReplacement("'" + esc + "'"));
                }
                m.appendTail(sb);
                String finalStmt = sb.toString();
                try {
                    jdbc.execute(finalStmt);
                } catch (org.springframework.dao.DataAccessException ex) {
                    // ignore duplicate-key insert errors during reseed; log and continue
                    String msg = ex.getMessage() == null ? "" : ex.getMessage().toLowerCase();
                    if (msg.contains("duplicate") || msg.contains("unique") || msg.contains("constraint")) {
                        System.out.println("Skipping statement due to duplicate/constraint: " + finalStmt);
                        continue;
                    }
                    throw ex;
                }
            }
            return "OK: seed executed";
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Seed failed: " + ex.getMessage());
        }
    }
}
