package com.example.menu.model;

import javax.persistence.*;

/**
 * Represents a user in the system.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String nickname;

    @Column(nullable = true)
    private String department;

    @Column(nullable = false)
    private String roles; // comma-separated roles
    @Column(name = "failed_attempts", nullable = true)
    private Integer failedAttempts = 0;

    @Column(name = "locked", nullable = true)
    private Boolean locked = false;

    /**
     * Default constructor for JPA.
     */
    public User() {}

    /**
     * Creates a new User with the specified details.
     * @param username The username.
     * @param password The encoded password.
     * @param email The email address.
     * @param nickname The user's nickname.
     * @param roles Comma-separated roles.
     */
    public User(String username, String password, String email, String nickname, String department, String roles) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.department = department;
        this.roles = roles;
    }

    /**
     * Gets the user ID.
     * @return The ID.
     */
    public Long getId() { return id; }
    /**
     * Sets the user ID.
     * @param id The ID to set.
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Gets the username.
     * @return The username.
     */
    public String getUsername() { return username; }
    /**
     * Sets the username.
     * @param username The username to set.
     */
    public void setUsername(String username) { this.username = username; }

    /**
     * Gets the password.
     * @return The password.
     */
    public String getPassword() { return password; }
    /**
     * Sets the password.
     * @param password The password to set.
     */
    public void setPassword(String password) { this.password = password; }

    /**
     * Gets the email.
     * @return The email.
     */
    public String getEmail() { return email; }
    /**
     * Sets the email.
     * @param email The email to set.
     */
    public void setEmail(String email) { this.email = email; }

    /**
     * Gets the nickname.
     * @return The nickname.
     */
    public String getNickname() { return nickname; }
    /**
     * Sets the nickname.
     * @param nickname The nickname to set.
     */
    public void setNickname(String nickname) { this.nickname = nickname; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    /**
     * Gets the roles.
     * @return The roles.
     */
    public String getRoles() { return roles; }
    /**
     * Sets the roles.
     * @param roles The roles to set.
     */
    public void setRoles(String roles) { this.roles = roles; }

    /**
     * Gets the number of failed login attempts.
     * @return Failed attempts count.
     */
    public Integer getFailedAttempts() { return failedAttempts == null ? 0 : failedAttempts; }
    /**
     * Sets the number of failed login attempts.
     * @param failedAttempts The count to set.
     */
    public void setFailedAttempts(Integer failedAttempts) { this.failedAttempts = failedAttempts; }

    /**
     * Checks if the account is locked.
     * @return True if locked, false otherwise.
     */
    public Boolean isLocked() { return locked == null ? false : locked; }
    /**
     * Sets the account locked status.
     * @param locked True to lock, false to unlock.
     */
    public void setLocked(Boolean locked) { this.locked = locked; }
    
}
