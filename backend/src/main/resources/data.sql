-- Development seed for `menus` table used by the app
-- This file only inserts rows into the existing `menus` table so the app can load hierarchical menus.

-- Ensure user tracking columns exist for failedAttempts/locked
-- (previously attempted to add columns; now using in-memory tracking, skip altering schema)
-- Add columns safely (if not present) and populate defaults, then set NOT NULL
ALTER TABLE users ADD COLUMN IF NOT EXISTS failed_attempts integer DEFAULT 0;
UPDATE users SET failed_attempts = 0 WHERE failed_attempts IS NULL;
ALTER TABLE users ALTER COLUMN failed_attempts SET NOT NULL;

ALTER TABLE users ADD COLUMN IF NOT EXISTS locked boolean DEFAULT false;
UPDATE users SET locked = false WHERE locked IS NULL;
ALTER TABLE users ALTER COLUMN locked SET NOT NULL;

-- NEW: Add device_type column to menus
ALTER TABLE menus ADD COLUMN IF NOT EXISTS device_type varchar(20) DEFAULT 'BOTH';

INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (1, '대메뉴 A', 'L001', 1, NULL, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (2, '대메뉴 B', 'L002', 1, NULL, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (3, '대메뉴 C', 'L003', 1, NULL, 'BOTH') ON CONFLICT (id) DO NOTHING;

INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (11, '중메뉴 A-1', 'M011', 2, 1, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (12, '중메뉴 A-2', 'M012', 2, 1, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (21, '중메뉴 B-1', 'M021', 2, 2, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (31, '중메뉴 C-1', 'M031', 2, 3, 'BOTH') ON CONFLICT (id) DO NOTHING;

INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (101, '소메뉴 A-1-1', 'S0101', 3, 11, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (102, '소메뉴 A-1-2', 'S0102', 3, 11, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (121, '소메뉴 A-2-1', 'S0121', 3, 12, 'BOTH') ON CONFLICT (id) DO NOTHING;

-- USERS (development): use marker __ENC__plain__ for plaintext passwords
INSERT INTO users (id, username, password, email, roles) VALUES (100, 'admin', __ENC__admin__, 'admin@example.com', 'ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, username, password, email, roles) VALUES (101, 'demo', __ENC__demo123__, 'demo@example.com', 'USER') ON CONFLICT (id) DO NOTHING;

INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (211, '소메뉴 B-1-1', 'S0211', 3, 21, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (311, '샘플 가이드', 'S0311', 3, 31, 'BOTH') ON CONFLICT (id) DO NOTHING;

-- Common Guide Menus
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (400, '공통 가이드', 'GUIDE', 1, NULL, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (401, '컴포넌트 데모', 'G001', 2, 400, 'BOTH') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (402, '실무형 샘플', 'G002', 2, 400, 'PC') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (403, '레이아웃 샘플', 'G003', 2, 400, 'PC') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (404, 'API 연동 샘플', 'G004', 2, 400, 'PC') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (405, '다중 API 샘플', 'G005', 2, 400, 'PC') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (406, '모바일 공통 컴포넌트', 'G006', 2, 400, 'MOBILE') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (407, '모바일 API 연동', 'G007', 2, 400, 'MOBILE') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id, device_type) VALUES (408, '모바일 다중 API', 'G008', 2, 400, 'MOBILE') ON CONFLICT (id) DO NOTHING;

-- For existing rows that might have been inserted before this change
UPDATE menus SET device_type = 'PC' WHERE code IN ('G002', 'G003', 'G004', 'G005');
UPDATE menus SET device_type = 'MOBILE' WHERE code IN ('G006', 'G007', 'G008');

