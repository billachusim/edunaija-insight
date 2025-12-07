export type SchoolType = 'primary' | 'secondary' | 'both';
export type ConditionRating = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type FrequencyRating = 'daily' | 'weekly' | 'monthly' | 'termly' | 'yearly' | 'never';

export interface School {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Basic Information
  name: string;
  school_type: SchoolType;
  state: string;
  lga: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  established_year?: number;
  
  // Staff Information
  qualified_teachers: number;
  teaching_assistants: number;
  non_teaching_staff: number;
  groundsman_available: boolean;
  security_officer_available: boolean;
  cleaners_available: boolean;
  pe_teacher_available: boolean;
  pupil_staff_ratio?: number;
  
  // Secondary School Staff
  science_teachers: number;
  non_science_teachers: number;
  all_science_subjects_covered: boolean;
  
  // Salaries
  teacher_salary_range?: string;
  non_teaching_salary_range?: string;
  science_teacher_salary_range?: string;
  
  // Infrastructure
  total_classrooms: number;
  classrooms_condition: ConditionRating;
  classrooms_lockable: boolean;
  classrooms_tiled: boolean;
  window_condition: ConditionRating;
  door_condition: ConditionRating;
  
  // Toilets
  total_toilets: number;
  toilet_condition: ConditionRating;
  staff_toilet_available: boolean;
  
  // Water & Utilities
  running_water_available: boolean;
  wifi_available: boolean;
  wifi_cost_monthly?: number;
  wifi_paid_by?: string;
  
  // Furniture
  desk_chair_quality: ConditionRating;
  pupils_sitting_on_floor: boolean;
  
  // Learning Resources
  computer_lab_available: boolean;
  library_available: boolean;
  library_fully_stocked: boolean;
  smart_boards_available: boolean;
  projectors_available: boolean;
  
  // Science Labs
  science_labs_available: boolean;
  lab_materials_availability: ConditionRating;
  lab_materials_replacement_frequency: FrequencyRating;
  
  // Teaching Materials
  teaching_materials_supply_frequency: FrequencyRating;
  teaching_materials_adequacy: ConditionRating;
  textbook_supplier?: string;
  pupils_bring_own_supplies: boolean;
  all_subjects_taught: boolean;
  
  // Welfare
  kids_fed_daily: boolean;
  sanitary_towels_provided: boolean;
  sanitary_towels_paid_by?: string;
  sanitary_towels_cost_monthly?: number;
  
  // Outdoor Facilities
  adequate_playground: boolean;
  perimeter_fencing: boolean;
  gate_available: boolean;
  trees_in_compound: boolean;
  grass_plants_healthy: boolean;
  erosion_issues: boolean;
  vehicles_park_on_grass: boolean;
  
  // Staff Facilities
  staff_office_available: boolean;
  old_teachers_quarters_available: boolean;
  
  // Buildings & Maintenance
  uncompleted_buildings: number;
  uncompleted_buildings_purposes: string[];
  government_maintenance_funds?: number;
  building_repainting_frequency: FrequencyRating;
  
  // Records & Archives
  archive_room_available: boolean;
  electronic_archive: boolean;
  old_students_records: boolean;
  
  // Competitions & Excursions
  organizes_competitions: boolean;
  participates_in_competitions: boolean;
  competition_trip_funder?: string;
  excursions_frequency: FrequencyRating;
  excursion_payer?: string;
  cost_per_session?: number;
  
  // Training
  teacher_training_frequency: FrequencyRating;
  
  // Volunteers
  accepts_volunteers: boolean;
  
  // Current Needs
  current_needs: SchoolNeedItem[];
  
  // Scores
  staff_adequacy_score: number;
  infrastructure_score: number;
  safety_score: number;
  learning_resources_score: number;
  overall_score: number;
}

export interface SchoolNeedItem {
  category: string;
  item: string;
  priority: number;
  cost: number;
}

export interface SchoolPhoto {
  id: string;
  school_id: string;
  photo_url: string;
  photo_type: string;
  caption?: string;
  created_at: string;
}

export interface SchoolNeed {
  id: string;
  school_id: string;
  need_category: string;
  description: string;
  priority: number;
  estimated_cost?: number;
  status: 'pending' | 'in_progress' | 'fixed';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}
