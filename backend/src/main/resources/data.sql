-- Development seed for `menus` table used by the app
-- This file only inserts rows into the existing `menus` table so the app can load hierarchical menus.

INSERT INTO menus (id, name, code, level, parent_id) VALUES (1, '대메뉴 A', 'L001', 1, NULL);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (2, '대메뉴 B', 'L002', 1, NULL);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (3, '대메뉴 C', 'L003', 1, NULL);

INSERT INTO menus (id, name, code, level, parent_id) VALUES (11, '중메뉴 A-1', 'M011', 2, 1);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (12, '중메뉴 A-2', 'M012', 2, 1);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (21, '중메뉴 B-1', 'M021', 2, 2);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (31, '중메뉴 C-1', 'M031', 2, 3);

INSERT INTO menus (id, name, code, level, parent_id) VALUES (101, '소메뉴 A-1-1', 'S0101', 3, 11);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (102, '소메뉴 A-1-2', 'S0102', 3, 11);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (121, '소메뉴 A-2-1', 'S0121', 3, 12);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (211, '소메뉴 B-1-1', 'S0211', 3, 21);

