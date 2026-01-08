package com.example.menu.mapper;

import com.example.menu.model.Menu;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * MyBatis Mapper for Menu entity operations.
 */
@Mapper
public interface MenuMapper {
    /**
     * Retrieves all menu items.
     * @return List of all menus.
     */
    List<Menu> findAll();

    /**
     * Retrieves menu items by level.
     * @param level The menu level.
     * @return List of menus at the specified level.
     */
    List<Menu> findByLevel(Integer level);
}
