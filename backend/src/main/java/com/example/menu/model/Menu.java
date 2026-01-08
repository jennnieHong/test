package com.example.menu.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a menu item in the hierarchy.
 */
@Entity
@Table(name = "menus")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;

    private Integer level; // 1=대,2=중,3=소

    private Long parentId;

    /**
     * Default constructor.
     */
    public Menu() {}

    /**
     * Creates a new Menu item.
     * @param name Name of the menu.
     * @param code Menu code.
     * @param level Menu level (1=Large, 2=Medium, 3=Small).
     * @param parentId ID of the parent menu.
     */
    public Menu(String name, String code, Integer level, Long parentId) {
        this.name = name;
        this.code = code;
        this.level = level;
        this.parentId = parentId;
    }

    /**
     * Gets the ID.
     * @return The ID.
     */
    public Long getId() { return id; }
    /**
     * Sets the ID.
     * @param id The ID to set.
     */
    public void setId(Long id) { this.id = id; }

    /**
     * Gets the name.
     * @return The name.
     */
    public String getName() { return name; }
    /**
     * Sets the name.
     * @param name The name to set.
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the code.
     * @return The code.
     */
    public String getCode() { return code; }
    /**
     * Sets the code.
     * @param code The code to set.
     */
    public void setCode(String code) { this.code = code; }

    /**
     * Gets the level.
     * @return The level.
     */
    public Integer getLevel() { return level; }
    /**
     * Sets the level.
     * @param level The level to set.
     */
    public void setLevel(Integer level) { this.level = level; }

    /**
     * Gets the parent ID.
     * @return The parent ID.
     */
    public Long getParentId() { return parentId; }
    /**
     * Sets the parent ID.
     * @param parentId The parent ID to set.
     */
    public void setParentId(Long parentId) { this.parentId = parentId; }
}
