-- Schema and seed data for hierarchical menus
-- Create separate tables for 대/중/소 분류, and also populate legacy `menus` table used by the app

CREATE TABLE IF NOT EXISTS menu_large (
	id SERIAL PRIMARY KEY,
	code VARCHAR(50) UNIQUE NOT NULL,
	name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_mid (
	id SERIAL PRIMARY KEY,
	code VARCHAR(50) UNIQUE NOT NULL,
	name VARCHAR(200) NOT NULL,
	large_id INTEGER REFERENCES menu_large(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS menu_small (
	id SERIAL PRIMARY KEY,
	code VARCHAR(50) UNIQUE NOT NULL,
	name VARCHAR(200) NOT NULL,
	mid_id INTEGER REFERENCES menu_mid(id) ON DELETE CASCADE
);

-- Ensure legacy `menus` table exists (the JPA entity expects this)
CREATE TABLE IF NOT EXISTS menus (
	id BIGINT PRIMARY KEY,
	name VARCHAR(200),
	code VARCHAR(100),
	level INTEGER,
	parent_id BIGINT
);

-- Clear previous seed rows (safe for dev only)
TRUNCATE TABLE menu_small RESTART IDENTITY CASCADE;
TRUNCATE TABLE menu_mid RESTART IDENTITY CASCADE;
TRUNCATE TABLE menu_large RESTART IDENTITY CASCADE;
TRUNCATE TABLE menus RESTART IDENTITY CASCADE;

-- Insert sample large categories
INSERT INTO menu_large (id, code, name) VALUES (1, 'L001', '대메뉴 A');
INSERT INTO menu_large (id, code, name) VALUES (2, 'L002', '대메뉴 B');
INSERT INTO menu_large (id, code, name) VALUES (3, 'L003', '대메뉴 C');

-- Insert sample mid categories
INSERT INTO menu_mid (id, code, name, large_id) VALUES (11, 'M011', '중메뉴 A-1', 1);
INSERT INTO menu_mid (id, code, name, large_id) VALUES (12, 'M012', '중메뉴 A-2', 1);
INSERT INTO menu_mid (id, code, name, large_id) VALUES (21, 'M021', '중메뉴 B-1', 2);
INSERT INTO menu_mid (id, code, name, large_id) VALUES (31, 'M031', '중메뉴 C-1', 3);

-- Insert sample small categories
INSERT INTO menu_small (id, code, name, mid_id) VALUES (101, 'S0101', '소메뉴 A-1-1', 11);
INSERT INTO menu_small (id, code, name, mid_id) VALUES (102, 'S0102', '소메뉴 A-1-2', 11);
INSERT INTO menu_small (id, code, name, mid_id) VALUES (121, 'S0121', '소메뉴 A-2-1', 12);
INSERT INTO menu_small (id, code, name, mid_id) VALUES (211, 'S0211', '소메뉴 B-1-1', 21);

-- Populate legacy `menus` table for the existing app entity (level: 1=대,2=중,3=소)
-- Large
INSERT INTO menus (id, name, code, level, parent_id) VALUES (1, '대메뉴 A', 'L001', 1, NULL);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (2, '대메뉴 B', 'L002', 1, NULL);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (3, '대메뉴 C', 'L003', 1, NULL);

-- Mid (parent_id refers to large id above)
INSERT INTO menus (id, name, code, level, parent_id) VALUES (11, '중메뉴 A-1', 'M011', 2, 1);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (12, '중메뉴 A-2', 'M012', 2, 1);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (21, '중메뉴 B-1', 'M021', 2, 2);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (31, '중메뉴 C-1', 'M031', 2, 3);

-- Small (parent_id refers to mid id)
INSERT INTO menus (id, name, code, level, parent_id) VALUES (101, '소메뉴 A-1-1', 'S0101', 3, 11);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (102, '소메뉴 A-1-2', 'S0102', 3, 11);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (121, '소메뉴 A-2-1', 'S0121', 3, 12);
INSERT INTO menus (id, name, code, level, parent_id) VALUES (211, '소메뉴 B-1-1', 'S0211', 3, 21);

