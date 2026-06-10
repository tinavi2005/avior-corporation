-- Create a function that syncs auth.users into public.users, public.profiles, and public.user_roles
-- This ensures every user in auth.users has a corresponding row in the app's public tables.

CREATE OR REPLACE FUNCTION public.sync_auth_user()
RETURNS TRIGGER AS $$
DECLARE
  default_role_id uuid;
  existing_user_id uuid;
  first_name_val text;
  last_name_val text;
BEGIN
  -- Extract first_name / last_name from the profile JSONB if present
  first_name_val := COALESCE(NEW.profile->>'first_name', '');
  last_name_val  := COALESCE(NEW.profile->>'last_name', '');

  -- Get the default 'student' role id
  SELECT id INTO default_role_id FROM public.roles WHERE name = 'student' LIMIT 1;

  -- Check if the user already exists in public.users
  SELECT id INTO existing_user_id FROM public.users WHERE id = NEW.id;

  IF existing_user_id IS NULL THEN
    -- Insert into public.users
    INSERT INTO public.users (id, email, email_verified, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.email_verified, false),
      COALESCE(NEW.created_at, NOW()),
      NOW()
    );

    -- Insert a minimal profile
    INSERT INTO public.profiles (
      user_id, first_name, last_name, phone, address, gender, date_of_birth,
      created_at, updated_at
    )
    VALUES (
      NEW.id,
      first_name_val,
      last_name_val,
      NULL, NULL, NULL, NULL,
      NOW(), NOW()
    );

    -- Assign the default 'student' role
    IF default_role_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role_id, created_at, updated_at)
      VALUES (NEW.id, default_role_id, NOW(), NOW());
    END IF;
  ELSE
    -- User exists: just keep email in sync
    UPDATE public.users
    SET email = NEW.email, updated_at = NOW()
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach the trigger to auth.users
-- Note: This requires sufficient privileges on auth.users.
-- If the CLI user lacks permission, the migration will fail and we fall back to app-level sync.
DROP TRIGGER IF EXISTS sync_auth_user_trigger ON auth.users;
CREATE TRIGGER sync_auth_user_trigger
AFTER INSERT OR UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.sync_auth_user();
