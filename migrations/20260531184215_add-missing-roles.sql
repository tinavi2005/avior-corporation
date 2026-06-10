-- Insert missing roles into public.roles
-- The existing roles are: admin, teacher, student
-- We need to add: instructor, mechanic, coordinator, secretary

INSERT INTO public.roles (name, description, permissions)
VALUES 
  ('instructor', 'Instructor de vuelo', '["courses:read:own","grades:write:own","flight-logs:read:own","flight-logs:write:own","profile:read:own","profile:read:students"]'::jsonb),
  ('mechanic', 'Mecánico de aeronaves', '["aircraft:read:own","aircraft:write:own","maintenance:read:own","maintenance:write:own","profile:read:own"]'::jsonb),
  ('coordinator', 'Coordinador académico', '["programs:read:all","programs:write:all","courses:read:all","courses:write:all","profile:read:own"]'::jsonb),
  ('secretary', 'Secretaría académica', '["enrollments:read:all","enrollments:write:all","grades:read:all","profile:read:own","profile:read:students"]'::jsonb)
ON CONFLICT (name) DO NOTHING;
