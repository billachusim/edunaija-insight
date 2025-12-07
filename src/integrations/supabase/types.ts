export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      school_needs: {
        Row: {
          created_at: string | null
          description: string
          estimated_cost: number | null
          id: string
          need_category: string
          priority: number | null
          school_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          estimated_cost?: number | null
          id?: string
          need_category: string
          priority?: number | null
          school_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          estimated_cost?: number | null
          id?: string
          need_category?: string
          priority?: number | null
          school_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_needs_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          photo_type: string
          photo_url: string
          school_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          photo_type: string
          photo_url: string
          school_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          photo_type?: string
          photo_url?: string
          school_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_photos_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          accepts_volunteers: boolean | null
          address: string | null
          adequate_playground: boolean | null
          all_science_subjects_covered: boolean | null
          all_subjects_taught: boolean | null
          archive_room_available: boolean | null
          building_repainting_frequency:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          classrooms_condition:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          classrooms_lockable: boolean | null
          classrooms_tiled: boolean | null
          cleaners_available: boolean | null
          competition_trip_funder: string | null
          computer_lab_available: boolean | null
          cost_per_session: number | null
          created_at: string | null
          current_needs: Json | null
          desk_chair_quality:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          door_condition: Database["public"]["Enums"]["condition_rating"] | null
          electronic_archive: boolean | null
          erosion_issues: boolean | null
          established_year: number | null
          excursion_payer: string | null
          excursions_frequency:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          gate_available: boolean | null
          government_maintenance_funds: number | null
          grass_plants_healthy: boolean | null
          groundsman_available: boolean | null
          id: string
          infrastructure_score: number | null
          kids_fed_daily: boolean | null
          lab_materials_availability:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          lab_materials_replacement_frequency:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          latitude: number | null
          learning_resources_score: number | null
          lga: string
          library_available: boolean | null
          library_fully_stocked: boolean | null
          longitude: number | null
          name: string
          non_science_teachers: number | null
          non_teaching_salary_range: string | null
          non_teaching_staff: number | null
          old_students_records: boolean | null
          old_teachers_quarters_available: boolean | null
          organizes_competitions: boolean | null
          overall_score: number | null
          participates_in_competitions: boolean | null
          pe_teacher_available: boolean | null
          perimeter_fencing: boolean | null
          projectors_available: boolean | null
          pupil_staff_ratio: number | null
          pupils_bring_own_supplies: boolean | null
          pupils_sitting_on_floor: boolean | null
          qualified_teachers: number | null
          running_water_available: boolean | null
          safety_score: number | null
          sanitary_towels_cost_monthly: number | null
          sanitary_towels_paid_by: string | null
          sanitary_towels_provided: boolean | null
          school_type: Database["public"]["Enums"]["school_type"]
          science_labs_available: boolean | null
          science_teacher_salary_range: string | null
          science_teachers: number | null
          security_officer_available: boolean | null
          smart_boards_available: boolean | null
          staff_adequacy_score: number | null
          staff_office_available: boolean | null
          staff_toilet_available: boolean | null
          state: string
          teacher_salary_range: string | null
          teacher_training_frequency:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          teaching_assistants: number | null
          teaching_materials_adequacy:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          teaching_materials_supply_frequency:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          textbook_supplier: string | null
          toilet_condition:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          total_classrooms: number | null
          total_toilets: number | null
          trees_in_compound: boolean | null
          uncompleted_buildings: number | null
          uncompleted_buildings_purposes: Json | null
          updated_at: string | null
          vehicles_park_on_grass: boolean | null
          wifi_available: boolean | null
          wifi_cost_monthly: number | null
          wifi_paid_by: string | null
          window_condition:
            | Database["public"]["Enums"]["condition_rating"]
            | null
        }
        Insert: {
          accepts_volunteers?: boolean | null
          address?: string | null
          adequate_playground?: boolean | null
          all_science_subjects_covered?: boolean | null
          all_subjects_taught?: boolean | null
          archive_room_available?: boolean | null
          building_repainting_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          classrooms_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          classrooms_lockable?: boolean | null
          classrooms_tiled?: boolean | null
          cleaners_available?: boolean | null
          competition_trip_funder?: string | null
          computer_lab_available?: boolean | null
          cost_per_session?: number | null
          created_at?: string | null
          current_needs?: Json | null
          desk_chair_quality?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          door_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          electronic_archive?: boolean | null
          erosion_issues?: boolean | null
          established_year?: number | null
          excursion_payer?: string | null
          excursions_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          gate_available?: boolean | null
          government_maintenance_funds?: number | null
          grass_plants_healthy?: boolean | null
          groundsman_available?: boolean | null
          id?: string
          infrastructure_score?: number | null
          kids_fed_daily?: boolean | null
          lab_materials_availability?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          lab_materials_replacement_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          latitude?: number | null
          learning_resources_score?: number | null
          lga: string
          library_available?: boolean | null
          library_fully_stocked?: boolean | null
          longitude?: number | null
          name: string
          non_science_teachers?: number | null
          non_teaching_salary_range?: string | null
          non_teaching_staff?: number | null
          old_students_records?: boolean | null
          old_teachers_quarters_available?: boolean | null
          organizes_competitions?: boolean | null
          overall_score?: number | null
          participates_in_competitions?: boolean | null
          pe_teacher_available?: boolean | null
          perimeter_fencing?: boolean | null
          projectors_available?: boolean | null
          pupil_staff_ratio?: number | null
          pupils_bring_own_supplies?: boolean | null
          pupils_sitting_on_floor?: boolean | null
          qualified_teachers?: number | null
          running_water_available?: boolean | null
          safety_score?: number | null
          sanitary_towels_cost_monthly?: number | null
          sanitary_towels_paid_by?: string | null
          sanitary_towels_provided?: boolean | null
          school_type?: Database["public"]["Enums"]["school_type"]
          science_labs_available?: boolean | null
          science_teacher_salary_range?: string | null
          science_teachers?: number | null
          security_officer_available?: boolean | null
          smart_boards_available?: boolean | null
          staff_adequacy_score?: number | null
          staff_office_available?: boolean | null
          staff_toilet_available?: boolean | null
          state: string
          teacher_salary_range?: string | null
          teacher_training_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          teaching_assistants?: number | null
          teaching_materials_adequacy?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          teaching_materials_supply_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          textbook_supplier?: string | null
          toilet_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          total_classrooms?: number | null
          total_toilets?: number | null
          trees_in_compound?: boolean | null
          uncompleted_buildings?: number | null
          uncompleted_buildings_purposes?: Json | null
          updated_at?: string | null
          vehicles_park_on_grass?: boolean | null
          wifi_available?: boolean | null
          wifi_cost_monthly?: number | null
          wifi_paid_by?: string | null
          window_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
        }
        Update: {
          accepts_volunteers?: boolean | null
          address?: string | null
          adequate_playground?: boolean | null
          all_science_subjects_covered?: boolean | null
          all_subjects_taught?: boolean | null
          archive_room_available?: boolean | null
          building_repainting_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          classrooms_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          classrooms_lockable?: boolean | null
          classrooms_tiled?: boolean | null
          cleaners_available?: boolean | null
          competition_trip_funder?: string | null
          computer_lab_available?: boolean | null
          cost_per_session?: number | null
          created_at?: string | null
          current_needs?: Json | null
          desk_chair_quality?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          door_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          electronic_archive?: boolean | null
          erosion_issues?: boolean | null
          established_year?: number | null
          excursion_payer?: string | null
          excursions_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          gate_available?: boolean | null
          government_maintenance_funds?: number | null
          grass_plants_healthy?: boolean | null
          groundsman_available?: boolean | null
          id?: string
          infrastructure_score?: number | null
          kids_fed_daily?: boolean | null
          lab_materials_availability?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          lab_materials_replacement_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          latitude?: number | null
          learning_resources_score?: number | null
          lga?: string
          library_available?: boolean | null
          library_fully_stocked?: boolean | null
          longitude?: number | null
          name?: string
          non_science_teachers?: number | null
          non_teaching_salary_range?: string | null
          non_teaching_staff?: number | null
          old_students_records?: boolean | null
          old_teachers_quarters_available?: boolean | null
          organizes_competitions?: boolean | null
          overall_score?: number | null
          participates_in_competitions?: boolean | null
          pe_teacher_available?: boolean | null
          perimeter_fencing?: boolean | null
          projectors_available?: boolean | null
          pupil_staff_ratio?: number | null
          pupils_bring_own_supplies?: boolean | null
          pupils_sitting_on_floor?: boolean | null
          qualified_teachers?: number | null
          running_water_available?: boolean | null
          safety_score?: number | null
          sanitary_towels_cost_monthly?: number | null
          sanitary_towels_paid_by?: string | null
          sanitary_towels_provided?: boolean | null
          school_type?: Database["public"]["Enums"]["school_type"]
          science_labs_available?: boolean | null
          science_teacher_salary_range?: string | null
          science_teachers?: number | null
          security_officer_available?: boolean | null
          smart_boards_available?: boolean | null
          staff_adequacy_score?: number | null
          staff_office_available?: boolean | null
          staff_toilet_available?: boolean | null
          state?: string
          teacher_salary_range?: string | null
          teacher_training_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          teaching_assistants?: number | null
          teaching_materials_adequacy?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          teaching_materials_supply_frequency?:
            | Database["public"]["Enums"]["frequency_rating"]
            | null
          textbook_supplier?: string | null
          toilet_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
          total_classrooms?: number | null
          total_toilets?: number | null
          trees_in_compound?: boolean | null
          uncompleted_buildings?: number | null
          uncompleted_buildings_purposes?: Json | null
          updated_at?: string | null
          vehicles_park_on_grass?: boolean | null
          wifi_available?: boolean | null
          wifi_cost_monthly?: number | null
          wifi_paid_by?: string | null
          window_condition?:
            | Database["public"]["Enums"]["condition_rating"]
            | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
      condition_rating: "excellent" | "good" | "fair" | "poor" | "critical"
      frequency_rating:
        | "daily"
        | "weekly"
        | "monthly"
        | "termly"
        | "yearly"
        | "never"
      school_type: "primary" | "secondary" | "both"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "viewer"],
      condition_rating: ["excellent", "good", "fair", "poor", "critical"],
      frequency_rating: [
        "daily",
        "weekly",
        "monthly",
        "termly",
        "yearly",
        "never",
      ],
      school_type: ["primary", "secondary", "both"],
    },
  },
} as const
