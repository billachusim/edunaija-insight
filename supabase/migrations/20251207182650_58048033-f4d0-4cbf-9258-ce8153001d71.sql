-- Create enum for school types
CREATE TYPE public.school_type AS ENUM ('primary', 'secondary', 'both');

-- Create enum for condition ratings
CREATE TYPE public.condition_rating AS ENUM ('excellent', 'good', 'fair', 'poor', 'critical');

-- Create enum for frequency ratings
CREATE TYPE public.frequency_rating AS ENUM ('daily', 'weekly', 'monthly', 'termly', 'yearly', 'never');

-- Create enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create schools table with comprehensive data model
CREATE TABLE public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Basic Information
    name TEXT NOT NULL,
    school_type school_type NOT NULL DEFAULT 'primary',
    state TEXT NOT NULL,
    lga TEXT NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    established_year INTEGER,
    
    -- Staff Information
    qualified_teachers INTEGER DEFAULT 0,
    teaching_assistants INTEGER DEFAULT 0,
    non_teaching_staff INTEGER DEFAULT 0,
    groundsman_available BOOLEAN DEFAULT false,
    security_officer_available BOOLEAN DEFAULT false,
    cleaners_available BOOLEAN DEFAULT false,
    pe_teacher_available BOOLEAN DEFAULT false,
    pupil_staff_ratio DECIMAL(5, 2),
    
    -- Secondary School Staff (for secondary/both types)
    science_teachers INTEGER DEFAULT 0,
    non_science_teachers INTEGER DEFAULT 0,
    all_science_subjects_covered BOOLEAN DEFAULT false,
    
    -- Salaries
    teacher_salary_range TEXT,
    non_teaching_salary_range TEXT,
    science_teacher_salary_range TEXT,
    
    -- Infrastructure
    total_classrooms INTEGER DEFAULT 0,
    classrooms_condition condition_rating DEFAULT 'fair',
    classrooms_lockable BOOLEAN DEFAULT false,
    classrooms_tiled BOOLEAN DEFAULT false,
    window_condition condition_rating DEFAULT 'fair',
    door_condition condition_rating DEFAULT 'fair',
    
    -- Toilets
    total_toilets INTEGER DEFAULT 0,
    toilet_condition condition_rating DEFAULT 'fair',
    staff_toilet_available BOOLEAN DEFAULT false,
    
    -- Water & Utilities
    running_water_available BOOLEAN DEFAULT false,
    wifi_available BOOLEAN DEFAULT false,
    wifi_cost_monthly DECIMAL(12, 2),
    wifi_paid_by TEXT,
    
    -- Furniture
    desk_chair_quality condition_rating DEFAULT 'fair',
    pupils_sitting_on_floor BOOLEAN DEFAULT false,
    
    -- Learning Resources
    computer_lab_available BOOLEAN DEFAULT false,
    library_available BOOLEAN DEFAULT false,
    library_fully_stocked BOOLEAN DEFAULT false,
    smart_boards_available BOOLEAN DEFAULT false,
    projectors_available BOOLEAN DEFAULT false,
    
    -- Science Labs (Secondary)
    science_labs_available BOOLEAN DEFAULT false,
    lab_materials_availability condition_rating DEFAULT 'fair',
    lab_materials_replacement_frequency frequency_rating DEFAULT 'yearly',
    
    -- Teaching Materials
    teaching_materials_supply_frequency frequency_rating DEFAULT 'termly',
    teaching_materials_adequacy condition_rating DEFAULT 'fair',
    textbook_supplier TEXT,
    pupils_bring_own_supplies BOOLEAN DEFAULT false,
    all_subjects_taught BOOLEAN DEFAULT true,
    
    -- Welfare
    kids_fed_daily BOOLEAN DEFAULT false,
    sanitary_towels_provided BOOLEAN DEFAULT false,
    sanitary_towels_paid_by TEXT,
    sanitary_towels_cost_monthly DECIMAL(12, 2),
    
    -- Outdoor Facilities
    adequate_playground BOOLEAN DEFAULT false,
    perimeter_fencing BOOLEAN DEFAULT false,
    gate_available BOOLEAN DEFAULT false,
    trees_in_compound BOOLEAN DEFAULT false,
    grass_plants_healthy BOOLEAN DEFAULT false,
    erosion_issues BOOLEAN DEFAULT false,
    vehicles_park_on_grass BOOLEAN DEFAULT false,
    
    -- Staff Facilities
    staff_office_available BOOLEAN DEFAULT false,
    old_teachers_quarters_available BOOLEAN DEFAULT false,
    
    -- Buildings & Maintenance
    uncompleted_buildings INTEGER DEFAULT 0,
    uncompleted_buildings_purposes JSONB DEFAULT '[]'::jsonb,
    government_maintenance_funds DECIMAL(12, 2) DEFAULT 0,
    building_repainting_frequency frequency_rating DEFAULT 'yearly',
    
    -- Records & Archives
    archive_room_available BOOLEAN DEFAULT false,
    electronic_archive BOOLEAN DEFAULT false,
    old_students_records BOOLEAN DEFAULT false,
    
    -- Competitions & Excursions
    organizes_competitions BOOLEAN DEFAULT false,
    participates_in_competitions BOOLEAN DEFAULT false,
    competition_trip_funder TEXT,
    excursions_frequency frequency_rating DEFAULT 'termly',
    excursion_payer TEXT,
    cost_per_session DECIMAL(12, 2),
    
    -- Training
    teacher_training_frequency frequency_rating DEFAULT 'yearly',
    
    -- Volunteers
    accepts_volunteers BOOLEAN DEFAULT false,
    
    -- Current Needs (priority list as JSON array)
    current_needs JSONB DEFAULT '[]'::jsonb,
    
    -- Scores (calculated)
    staff_adequacy_score INTEGER DEFAULT 0,
    infrastructure_score INTEGER DEFAULT 0,
    safety_score INTEGER DEFAULT 0,
    learning_resources_score INTEGER DEFAULT 0,
    overall_score INTEGER DEFAULT 0
);

-- Create school_photos table
CREATE TABLE public.school_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
    photo_url TEXT NOT NULL,
    photo_type TEXT NOT NULL, -- 'compound', 'toilet', 'classroom', 'dining', 'playground', 'waste_area', 'staff_toilet', 'uncompleted_building', 'erosion', 'car_park', 'teachers_quarters'
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create school_needs table for detailed tracking
CREATE TABLE public.school_needs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE NOT NULL,
    need_category TEXT NOT NULL,
    description TEXT NOT NULL,
    priority INTEGER DEFAULT 1, -- 1-5, 5 being most urgent
    estimated_cost DECIMAL(12, 2),
    status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'fixed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_needs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for schools (public read, admin write)
CREATE POLICY "Anyone can view schools"
ON public.schools FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert schools"
ON public.schools FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can update schools"
ON public.schools FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete schools"
ON public.schools FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for school_photos (public read, admin write)
CREATE POLICY "Anyone can view school photos"
ON public.school_photos FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage school photos"
ON public.school_photos FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for school_needs (public read, admin write)
CREATE POLICY "Anyone can view school needs"
ON public.school_needs FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage school needs"
ON public.school_needs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_schools_updated_at
    BEFORE UPDATE ON public.schools
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_school_needs_updated_at
    BEFORE UPDATE ON public.school_needs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create profile automatically on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
    RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert dummy school data
INSERT INTO public.schools (
    name, school_type, state, lga, address, latitude, longitude, established_year,
    qualified_teachers, teaching_assistants, non_teaching_staff, groundsman_available,
    security_officer_available, cleaners_available, pe_teacher_available, pupil_staff_ratio,
    science_teachers, non_science_teachers, all_science_subjects_covered,
    teacher_salary_range, non_teaching_salary_range, science_teacher_salary_range,
    total_classrooms, classrooms_condition, classrooms_lockable, classrooms_tiled,
    window_condition, door_condition, total_toilets, toilet_condition, staff_toilet_available,
    running_water_available, wifi_available, wifi_cost_monthly, wifi_paid_by,
    desk_chair_quality, pupils_sitting_on_floor, computer_lab_available, library_available,
    library_fully_stocked, smart_boards_available, projectors_available, science_labs_available,
    lab_materials_availability, lab_materials_replacement_frequency, teaching_materials_supply_frequency,
    teaching_materials_adequacy, textbook_supplier, pupils_bring_own_supplies, all_subjects_taught,
    kids_fed_daily, sanitary_towels_provided, sanitary_towels_paid_by, sanitary_towels_cost_monthly,
    adequate_playground, perimeter_fencing, gate_available, trees_in_compound, grass_plants_healthy,
    erosion_issues, vehicles_park_on_grass, staff_office_available, old_teachers_quarters_available,
    uncompleted_buildings, uncompleted_buildings_purposes, government_maintenance_funds,
    building_repainting_frequency, archive_room_available, electronic_archive, old_students_records,
    organizes_competitions, participates_in_competitions, competition_trip_funder, excursions_frequency,
    excursion_payer, cost_per_session, teacher_training_frequency, accepts_volunteers,
    current_needs, staff_adequacy_score, infrastructure_score, safety_score, learning_resources_score, overall_score
) VALUES (
    'Federal Government College Abuja',
    'both',
    'Federal Capital Territory',
    'Abuja Municipal',
    '12 Education Avenue, Garki District, Abuja',
    9.0579,
    7.4951,
    1985,
    45, 12, 18, true,
    true, true, true, 25.5,
    15, 30, true,
    '₦120,000 - ₦180,000', '₦45,000 - ₦75,000', '₦150,000 - ₦220,000',
    32, 'good', true, true,
    'good', 'fair', 12, 'fair', true,
    true, true, 25000, 'School Administration',
    'good', false, true, true,
    false, false, true, true,
    'fair', 'termly', 'monthly',
    'fair', 'Federal Ministry of Education', false, true,
    true, true, 'NGO Partnership', 15000,
    true, true, true, true, true,
    true, false, true, true,
    2, '["Science Laboratory Extension", "Sports Complex"]'::jsonb, 2500000,
    'yearly', true, false, true,
    true, true, 'PTA and Government', 'termly',
    'Parents', 35000, 'yearly', true,
    '[{"category": "Infrastructure", "item": "Complete science lab extension", "priority": 5, "cost": 15000000}, {"category": "Technology", "item": "Smart boards for all classrooms", "priority": 4, "cost": 8000000}, {"category": "Welfare", "item": "Upgrade toilet facilities", "priority": 4, "cost": 3500000}, {"category": "Learning", "item": "Stock library with current textbooks", "priority": 3, "cost": 2000000}, {"category": "Safety", "item": "Repair perimeter fencing", "priority": 3, "cost": 1500000}]'::jsonb,
    72, 68, 75, 65, 70
);

-- Get the school ID for adding photos
DO $$
DECLARE
    school_uuid UUID;
BEGIN
    SELECT id INTO school_uuid FROM public.schools WHERE name = 'Federal Government College Abuja' LIMIT 1;
    
    -- Insert dummy photos
    INSERT INTO public.school_photos (school_id, photo_url, photo_type, caption) VALUES
    (school_uuid, 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', 'compound', 'Main school compound entrance'),
    (school_uuid, 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', 'compound', 'Administrative building'),
    (school_uuid, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', 'classroom', 'Standard classroom block'),
    (school_uuid, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'classroom', 'Primary school classroom'),
    (school_uuid, 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800', 'playground', 'Main playground area'),
    (school_uuid, 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800', 'classroom', 'Science laboratory'),
    (school_uuid, 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800', 'compound', 'Library building exterior'),
    (school_uuid, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800', 'compound', 'Library interior'),
    (school_uuid, 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=800', 'uncompleted_building', 'Science lab extension (under construction)'),
    (school_uuid, 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800', 'dining', 'School cafeteria'),
    (school_uuid, 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800', 'compound', 'Sports field'),
    (school_uuid, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', 'classroom', 'Computer laboratory');
    
    -- Insert school needs
    INSERT INTO public.school_needs (school_id, need_category, description, priority, estimated_cost, status) VALUES
    (school_uuid, 'Infrastructure', 'Complete science laboratory extension building', 5, 15000000, 'in_progress'),
    (school_uuid, 'Technology', 'Install smart boards in all 32 classrooms', 4, 8000000, 'pending'),
    (school_uuid, 'Welfare', 'Renovate and upgrade all toilet facilities', 4, 3500000, 'pending'),
    (school_uuid, 'Learning', 'Purchase current edition textbooks for library', 3, 2000000, 'pending'),
    (school_uuid, 'Safety', 'Repair damaged sections of perimeter fencing', 3, 1500000, 'pending'),
    (school_uuid, 'Infrastructure', 'Repair erosion-affected areas in compound', 3, 800000, 'pending'),
    (school_uuid, 'Technology', 'Upgrade computer lab with 20 new computers', 3, 4000000, 'pending'),
    (school_uuid, 'Welfare', 'Install additional water tanks and pumps', 2, 500000, 'pending');
END $$;