package com.example.menu.controller;

import com.example.menu.model.Menu;
import com.example.menu.service.MenuService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controller for handling menu-related requests.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MenuController {
    private final MenuService service;

    /**
     * Constructs the MenuController.
     * @param service The MenuService.
     */
    public MenuController(MenuService service){ this.service = service; }

    /**
     * Retrieves the entire menu tree.
     * @return A list of root menu nodes.
     */
    @GetMapping("/menus")
    public List<MenuService.MenuNode> menus(){
        return service.getMenuTree();
    }

    /**
     * Retrieves a specific menu node by ID.
     * @param id The ID of the menu.
     * @return The MenuNode.
     */
    @GetMapping("/menus/{id}")
    public MenuService.MenuNode menuById(@PathVariable Long id){
        return service.getMenuNode(id);
    }

    /**
     * Creates a new menu item.
     * @param menu The menu entity to create.
     * @return The created Menu entity.
     */
    @PostMapping("/menus")
    public Menu createMenu(@RequestBody Menu menu) {
        return service.saveMenu(menu);
    }
}
