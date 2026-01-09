package com.example.menu.service;

import com.example.menu.model.Menu;
import com.example.menu.repository.MenuRepository;
import com.example.menu.mapper.MenuMapper;
import org.springframework.stereotype.Service;
import java.util.*;

/**
 * Service for menu business logic.
 */
@Service
public class MenuService {
    private final MenuRepository repo;
    private final MenuMapper mapper;

    /**
     * Constructs the MenuService.
     * @param repo The MenuRepository (JPA).
     * @param mapper The MenuMapper (MyBatis).
     */
    public MenuService(MenuRepository repo, MenuMapper mapper) { 
        this.repo = repo; 
        this.mapper = mapper;
    }

    /**
     * Retrieves the menu structure as a tree using MyBatis.
     * @return List of root menu nodes with children populated.
     */
    public List<MenuNode> getMenuTree() {
        List<Menu> all = mapper.findAll();
        Map<Long, MenuNode> map = new LinkedHashMap<>();
        for (Menu m: all) map.put(m.getId(), new MenuNode(m));
        List<MenuNode> roots = new ArrayList<>();
        for (MenuNode node: map.values()) {
            Long pid = node.getParentId();
            if (pid == null) roots.add(node);
            else {
                MenuNode p = map.get(pid);
                if (p != null) p.getChildren().add(node);
                else roots.add(node);
            }
        }
        return roots;
    }

    /**
     * Retrieves a specific menu node by ID.
     * @param id The ID to search for.
     * @return The found MenuNode, or null if not valid.
     */
    public MenuNode getMenuNode(Long id) {
        List<Menu> all = mapper.findAll();
        Map<Long, MenuNode> map = new LinkedHashMap<>();
        for (Menu m: all) map.put(m.getId(), new MenuNode(m));
        for (MenuNode node: map.values()) {
            Long pid = node.getParentId();
            if (pid != null) {
                MenuNode p = map.get(pid);
                if (p != null) p.getChildren().add(node);
            }
        }
        return map.get(id);
    }

    /**
     * Saves a menu entity using JPA.
     * @param menu The menu to save.
     * @return The saved menu entity.
     */
    public Menu saveMenu(Menu menu) {
        return repo.save(menu);
    }

    /**
     * DTO representing a node in the menu tree.
     */
    public static class MenuNode {
        private Long id; private String name; private String code; private Integer level; private Long parentId; private String deviceType; private List<MenuNode> children = new ArrayList<>();
        public MenuNode(Menu m) { 
            this.id=m.getId(); 
            this.name=m.getName(); 
            this.code=m.getCode(); 
            this.level=m.getLevel(); 
            this.parentId=m.getParentId(); 
            this.deviceType=m.getDeviceType();
        }
        public Long getId(){return id;} 
        public String getName(){return name;} 
        public String getCode(){return code;} 
        public Integer getLevel(){return level;} 
        public Long getParentId(){return parentId;} 
        public String getDeviceType(){return deviceType;}
        public List<MenuNode> getChildren(){return children;}
    }
}
