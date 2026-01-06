package com.example.menu;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MenuService {
    private final MenuRepository repo;

    public MenuService(MenuRepository repo) { this.repo = repo; }

    public List<MenuNode> getMenuTree() {
        List<Menu> all = repo.findAll();
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

    public MenuNode getMenuNode(Long id) {
        List<Menu> all = repo.findAll();
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

    public static class MenuNode {
        private Long id; private String name; private String code; private Integer level; private Long parentId; private List<MenuNode> children = new ArrayList<>();
        public MenuNode(Menu m) { this.id=m.getId(); this.name=m.getName(); this.code=m.getCode(); this.level=m.getLevel(); this.parentId=m.getParentId(); }
        public Long getId(){return id;} public String getName(){return name;} public String getCode(){return code;} public Integer getLevel(){return level;} public Long getParentId(){return parentId;} public List<MenuNode> getChildren(){return children;}
    }
}
