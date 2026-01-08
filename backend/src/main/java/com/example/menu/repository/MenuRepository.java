package com.example.menu.repository;
import com.example.menu.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * JpaRepository for Menu entity.
 */
public interface MenuRepository extends JpaRepository<Menu, Long> {
    /**
     * Finds menus by level, ordered by ID ascending.
     * @param level The menu level.
     * @return List of menus.
     */
    List<Menu> findByLevelOrderByIdAsc(Integer level);

    /**
     * Finds menus by parent ID, ordered by ID ascending.
     * @param parentId The parent ID.
     * @return List of menus.
     */
    List<Menu> findByParentIdOrderByIdAsc(Long parentId);
}
