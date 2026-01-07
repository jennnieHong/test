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

INSERT INTO menus (id, name, code, level, parent_id) VALUES (1, '대메뉴 A', 'L001', 1, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (2, '대메뉴 B', 'L002', 1, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (3, '대메뉴 C', 'L003', 1, NULL) ON CONFLICT (id) DO NOTHING;

INSERT INTO menus (id, name, code, level, parent_id) VALUES (11, '중메뉴 A-1', 'M011', 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (12, '중메뉴 A-2', 'M012', 2, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (21, '중메뉴 B-1', 'M021', 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (31, '중메뉴 C-1', 'M031', 2, 3) ON CONFLICT (id) DO NOTHING;

INSERT INTO menus (id, name, code, level, parent_id) VALUES (101, '소메뉴 A-1-1', 'S0101', 3, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (102, '소메뉴 A-1-2', 'S0102', 3, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (121, '소메뉴 A-2-1', 'S0121', 3, 12) ON CONFLICT (id) DO NOTHING;

-- USERS (development): use marker __ENC__plain__ for plaintext passwords
-- The Admin seed will replace __ENC__plain__ with a bcrypt-encoded literal before executing.
INSERT INTO users (id, username, password, email, roles) VALUES (100, 'admin', __ENC__admin__, 'admin@example.com', 'ADMIN') ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, username, password, email, roles) VALUES (101, 'demo', __ENC__demo123__, 'demo@example.com', 'USER') ON CONFLICT (id) DO NOTHING;
INSERT INTO menus (id, name, code, level, parent_id) VALUES (211, '소메뉴 B-1-1', 'S0211', 3, 21) ON CONFLICT (id) DO NOTHING;

