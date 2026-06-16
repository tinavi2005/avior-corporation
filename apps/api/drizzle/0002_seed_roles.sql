-- Seed default roles for the LMS.
INSERT INTO roles (name, description, permissions) VALUES
('admin', 'System administrator', '["users:read:all","users:write:all","students:read:all","students:write:all","teachers:read:all","teachers:write:all","programs:read:all","programs:write:all","courses:read:all","courses:write:all","enrollments:read:all","enrollments:write:all","grades:read:all","grades:write:all","evaluations:read:all","evaluations:write:all","academic-periods:read:all","academic-periods:write:all"]'),
('instructor', 'Course instructor', '["courses:read:own","courses:read:students","grades:write:own","grades:read:own","evaluations:write:own","progress:read:students"]'),
('student', 'Student', '["profile:read:own","courses:read:own","enrollments:read:own","grades:read:own","progress:read:own"]'),
('coordinator', 'Academic coordinator', '["programs:read:all","programs:write:all","courses:read:all","courses:write:all","academic-periods:read:all","academic-periods:write:all","evaluations:read:all","teachers:read:all"]'),
('secretary', 'Academic secretary', '["profile:read:own","profile:read:students","enrollments:read:all","enrollments:write:all","grades:read:all","students:read:all"]');
