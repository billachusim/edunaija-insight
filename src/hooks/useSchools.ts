import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { School, SchoolPhoto, SchoolNeed, SchoolNeedItem } from '@/types/school';

export function useSchools() {
  return useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      return data.map(school => ({
        ...school,
        uncompleted_buildings_purposes: (school.uncompleted_buildings_purposes || []) as unknown as string[],
        current_needs: (school.current_needs || []) as unknown as SchoolNeedItem[],
      })) as School[];
    },
  });
}

export function useSchool(id: string) {
  return useQuery({
    queryKey: ['school', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        uncompleted_buildings_purposes: (data.uncompleted_buildings_purposes || []) as unknown as string[],
        current_needs: (data.current_needs || []) as unknown as SchoolNeedItem[],
      } as School;
    },
    enabled: !!id,
  });
}

export function useSchoolPhotos(schoolId: string) {
  return useQuery({
    queryKey: ['school-photos', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('school_photos')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at');
      
      if (error) throw error;
      return data as SchoolPhoto[];
    },
    enabled: !!schoolId,
  });
}

export function useSchoolNeeds(schoolId: string) {
  return useQuery({
    queryKey: ['school-needs', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('school_needs')
        .select('*')
        .eq('school_id', schoolId)
        .order('priority', { ascending: false });
      
      if (error) throw error;
      return data as SchoolNeed[];
    },
    enabled: !!schoolId,
  });
}
