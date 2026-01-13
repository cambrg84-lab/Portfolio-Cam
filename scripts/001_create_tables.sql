-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('photography', 'illustration', 'graphic_design')),
  image_url TEXT NOT NULL,
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public can read all projects
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

-- Only authenticated admins can insert projects
CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
    )
  );

-- Only authenticated admins can update projects
CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
    )
  );

-- Only authenticated admins can delete projects
CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view their own profile"
  ON public.admin_users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can insert their own profile"
  ON public.admin_users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to automatically create admin_user on signup
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.admin_users (id, email)
  VALUES (
    new.id,
    new.email
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Create trigger for new admin users
DROP TRIGGER IF EXISTS on_auth_admin_user_created ON auth.users;

CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_admin_user();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(order_index);
