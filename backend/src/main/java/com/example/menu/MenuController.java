package com.example.menu;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MenuController {
    private final MenuService service;
    public MenuController(MenuService service){ this.service = service; }

    @GetMapping("/menus")
    public List<MenuService.MenuNode> menus(){
        return service.getMenuTree();
    }

    @GetMapping("/menus/{id}")
    public MenuService.MenuNode menuById(@PathVariable Long id){
        return service.getMenuNode(id);
    }
}
