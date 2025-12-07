import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSchool, useSchoolPhotos, useSchoolNeeds } from '@/hooks/useSchools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScoreCard } from '@/components/cards/ScoreCard';
import { NeedCard } from '@/components/cards/NeedCard';
import { ScoreRadar } from '@/components/charts/ScoreRadar';
import { InfrastructureBar } from '@/components/charts/InfrastructureBar';
import { PhotoGallery } from '@/components/gallery/PhotoGallery';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Building2,
  Droplets,
  Shield,
  BookOpen,
  Utensils,
  Download,
  CheckCircle2,
  XCircle,
  Wifi,
  FlaskConical,
  Monitor,
  TreePine,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function BooleanIndicator({ value, label }: { value: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {value ? (
        <CheckCircle2 className="h-5 w-5 text-primary" />
      ) : (
        <XCircle className="h-5 w-5 text-destructive" />
      )}
    </div>
  );
}

function ConditionBadge({ condition }: { condition: string }) {
  const colors: Record<string, string> = {
    excellent: 'bg-score-excellent text-primary-foreground',
    good: 'bg-score-good text-primary-foreground',
    fair: 'bg-score-fair text-primary-foreground',
    poor: 'bg-score-poor text-primary-foreground',
    critical: 'bg-score-critical text-primary-foreground',
  };
  
  return (
    <Badge className={cn('capitalize', colors[condition] || 'bg-muted')}>
      {condition}
    </Badge>
  );
}

export default function SchoolProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: school, isLoading } = useSchool(id || '');
  const { data: photos } = useSchoolPhotos(id || '');
  const { data: needs } = useSchoolNeeds(id || '');

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!school) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">School Not Found</h1>
          <p className="text-muted-foreground">The requested school could not be found.</p>
        </div>
      </MainLayout>
    );
  }

  const radarData = [
    { subject: 'Staff', score: school.staff_adequacy_score, fullMark: 100 },
    { subject: 'Infrastructure', score: school.infrastructure_score, fullMark: 100 },
    { subject: 'Safety', score: school.safety_score, fullMark: 100 },
    { subject: 'Resources', score: school.learning_resources_score, fullMark: 100 },
    { subject: 'Overall', score: school.overall_score, fullMark: 100 },
  ];

  const infrastructureData = [
    { name: 'Classrooms', value: school.classrooms_condition === 'excellent' ? 100 : school.classrooms_condition === 'good' ? 75 : school.classrooms_condition === 'fair' ? 50 : 25, status: school.classrooms_condition },
    { name: 'Toilets', value: school.toilet_condition === 'excellent' ? 100 : school.toilet_condition === 'good' ? 75 : school.toilet_condition === 'fair' ? 50 : 25, status: school.toilet_condition },
    { name: 'Windows', value: school.window_condition === 'excellent' ? 100 : school.window_condition === 'good' ? 75 : school.window_condition === 'fair' ? 50 : 25, status: school.window_condition },
    { name: 'Doors', value: school.door_condition === 'excellent' ? 100 : school.door_condition === 'good' ? 75 : school.door_condition === 'fair' ? 50 : 25, status: school.door_condition },
    { name: 'Furniture', value: school.desk_chair_quality === 'excellent' ? 100 : school.desk_chair_quality === 'good' ? 75 : school.desk_chair_quality === 'fair' ? 50 : 25, status: school.desk_chair_quality },
  ];

  return (
    <MainLayout>
      {/* Hero Header */}
      <section className="border-b border-border/50 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <Badge variant="outline" className="mb-3 uppercase">
                {school.school_type === 'both' ? 'Primary & Secondary' : school.school_type} School
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
                {school.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {school.address || `${school.lga}, ${school.state}`}
                </span>
                {school.established_year && (
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Est. {school.established_year}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>

          {/* Quick Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <ScoreCard title="Overall" score={school.overall_score} className="md:col-span-1" />
            <ScoreCard title="Staff" score={school.staff_adequacy_score} />
            <ScoreCard title="Infrastructure" score={school.infrastructure_score} />
            <ScoreCard title="Safety" score={school.safety_score} />
            <ScoreCard title="Resources" score={school.learning_resources_score} />
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Staff</TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Infrastructure</TabsTrigger>
            <TabsTrigger value="facilities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Facilities</TabsTrigger>
            <TabsTrigger value="welfare" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Welfare</TabsTrigger>
            <TabsTrigger value="needs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Needs</TabsTrigger>
            <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Photos</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Performance Radar</h3>
                <ScoreRadar data={radarData} />
              </div>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Infrastructure Condition</h3>
                <InfrastructureBar data={infrastructureData} />
              </div>
            </div>

            {/* AI Insights */}
            <div className="glass-card p-6 border-l-4 border-l-primary">
              <h3 className="font-display font-semibold mb-4 text-primary">AI-Generated Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Strengths</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {school.security_officer_available && <li>• Security personnel on ground</li>}
                    {school.running_water_available && <li>• Running water available</li>}
                    {school.library_available && <li>• Library facility present</li>}
                    {school.perimeter_fencing && <li>• Secured with perimeter fencing</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {!school.smart_boards_available && <li>• No smart boards available</li>}
                    {school.erosion_issues && <li>• Erosion issues need attention</li>}
                    {!school.electronic_archive && <li>• No electronic records system</li>}
                    {school.uncompleted_buildings > 0 && <li>• {school.uncompleted_buildings} uncompleted building(s)</li>}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Qualified Teachers</p>
                    <p className="font-display text-2xl font-bold">{school.qualified_teachers}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Salary Range: {school.teacher_salary_range || 'N/A'}</p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teaching Assistants</p>
                    <p className="font-display text-2xl font-bold">{school.teaching_assistants}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-neon-purple/10">
                    <Users className="h-6 w-6 text-neon-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Non-Teaching Staff</p>
                    <p className="font-display text-2xl font-bold">{school.non_teaching_staff}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Salary Range: {school.non_teaching_salary_range || 'N/A'}</p>
              </div>
            </div>

            {school.school_type !== 'primary' && (
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Secondary School Staff</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Science Teachers</p>
                    <p className="font-display text-xl font-bold">{school.science_teachers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Non-Science Teachers</p>
                    <p className="font-display text-xl font-bold">{school.non_science_teachers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">All Science Subjects Covered</p>
                    <Badge variant={school.all_science_subjects_covered ? 'default' : 'destructive'}>
                      {school.all_science_subjects_covered ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Support Staff</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BooleanIndicator value={school.groundsman_available} label="Groundsman / Caretaker" />
                <BooleanIndicator value={school.security_officer_available} label="Security Officer" />
                <BooleanIndicator value={school.cleaners_available} label="Cleaners" />
                <BooleanIndicator value={school.pe_teacher_available} label="PE Teacher" />
              </div>
              {school.pupil_staff_ratio && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Pupil-Staff Ratio</p>
                  <p className="font-display text-xl font-bold">{school.pupil_staff_ratio}:1</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h3 className="font-display font-semibold">Classrooms</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Classrooms</span>
                    <span className="font-bold">{school.total_classrooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Condition</span>
                    <ConditionBadge condition={school.classrooms_condition} />
                  </div>
                  <BooleanIndicator value={school.classrooms_lockable} label="Lockable" />
                  <BooleanIndicator value={school.classrooms_tiled} label="Tiled Floors" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="h-6 w-6 text-accent" />
                  <h3 className="font-display font-semibold">Toilets & Water</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Toilets</span>
                    <span className="font-bold">{school.total_toilets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Condition</span>
                    <ConditionBadge condition={school.toilet_condition} />
                  </div>
                  <BooleanIndicator value={school.staff_toilet_available} label="Staff Toilet" />
                  <BooleanIndicator value={school.running_water_available} label="Running Water" />
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Building Conditions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Windows</p>
                  <ConditionBadge condition={school.window_condition} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Doors</p>
                  <ConditionBadge condition={school.door_condition} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Desks & Chairs</p>
                  <ConditionBadge condition={school.desk_chair_quality} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teaching Materials</p>
                  <ConditionBadge condition={school.teaching_materials_adequacy} />
                </div>
              </div>
            </div>

            {school.uncompleted_buildings > 0 && (
              <div className="glass-card p-6 border-l-4 border-l-neon-orange">
                <h3 className="font-display font-semibold mb-4">Uncompleted Buildings</h3>
                <p className="text-2xl font-bold text-neon-orange mb-2">{school.uncompleted_buildings}</p>
                {school.uncompleted_buildings_purposes?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {school.uncompleted_buildings_purposes.map((purpose, i) => (
                      <Badge key={i} variant="outline">{purpose}</Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Facilities Tab */}
          <TabsContent value="facilities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="h-6 w-6 text-accent" />
                  <h3 className="font-display font-semibold">Technology</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.computer_lab_available} label="Computer Lab" />
                  <BooleanIndicator value={school.smart_boards_available} label="Smart Boards" />
                  <BooleanIndicator value={school.projectors_available} label="Projectors" />
                  <BooleanIndicator value={school.wifi_available} label="WiFi Available" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h3 className="font-display font-semibold">Learning</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.library_available} label="Library" />
                  <BooleanIndicator value={school.library_fully_stocked} label="Library Fully Stocked" />
                  <BooleanIndicator value={school.all_subjects_taught} label="All Subjects Taught" />
                </div>
              </div>

              {school.school_type !== 'primary' && (
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FlaskConical className="h-6 w-6 text-neon-purple" />
                    <h3 className="font-display font-semibold">Science Labs</h3>
                  </div>
                  <div className="space-y-2">
                    <BooleanIndicator value={school.science_labs_available} label="Labs Available" />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Materials</span>
                      <ConditionBadge condition={school.lab_materials_availability} />
                    </div>
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TreePine className="h-6 w-6 text-primary" />
                  <h3 className="font-display font-semibold">Outdoor</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.adequate_playground} label="Adequate Playground" />
                  <BooleanIndicator value={school.trees_in_compound} label="Trees in Compound" />
                  <BooleanIndicator value={school.grass_plants_healthy} label="Healthy Vegetation" />
                  <BooleanIndicator value={!school.erosion_issues} label="No Erosion Issues" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-neon-yellow" />
                  <h3 className="font-display font-semibold">Security</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.perimeter_fencing} label="Perimeter Fencing" />
                  <BooleanIndicator value={school.gate_available} label="Gate Available" />
                  <BooleanIndicator value={school.security_officer_available} label="Security Officer" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                  <h3 className="font-display font-semibold">Staff Facilities</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.staff_office_available} label="Staff Office" />
                  <BooleanIndicator value={school.staff_toilet_available} label="Staff Toilet" />
                  <BooleanIndicator value={school.old_teachers_quarters_available} label="Teachers' Quarters" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Welfare Tab */}
          <TabsContent value="welfare" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils className="h-6 w-6 text-neon-orange" />
                  <h3 className="font-display font-semibold">Student Welfare</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.kids_fed_daily} label="Daily Feeding Program" />
                  <BooleanIndicator value={school.sanitary_towels_provided} label="Sanitary Products Provided" />
                  <BooleanIndicator value={!school.pupils_sitting_on_floor} label="No Students on Floor" />
                  <BooleanIndicator value={!school.pupils_bring_own_supplies} label="Supplies Provided" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h3 className="font-display font-semibold">Activities</h3>
                </div>
                <div className="space-y-2">
                  <BooleanIndicator value={school.organizes_competitions} label="Organizes Competitions" />
                  <BooleanIndicator value={school.participates_in_competitions} label="Participates in Competitions" />
                  <BooleanIndicator value={school.accepts_volunteers} label="Accepts Volunteers" />
                </div>
                {school.excursions_frequency && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">Excursions</p>
                    <Badge variant="outline" className="capitalize mt-1">{school.excursions_frequency}</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Records & Archives</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BooleanIndicator value={school.archive_room_available} label="Archive Room" />
                <BooleanIndicator value={school.electronic_archive} label="Electronic Archive" />
                <BooleanIndicator value={school.old_students_records} label="Alumni Records" />
              </div>
            </div>
          </TabsContent>

          {/* Needs Tab */}
          <TabsContent value="needs" className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-2">Urgent Needs Summary</h3>
              <p className="text-muted-foreground mb-6">
                Total estimated cost: <span className="text-primary font-bold">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(
                    needs?.reduce((sum, n) => sum + (n.estimated_cost || 0), 0) || 0
                  )}
                </span>
              </p>
              
              <div className="space-y-4">
                {needs?.map((need) => (
                  <NeedCard
                    key={need.id}
                    category={need.need_category}
                    description={need.description}
                    priority={need.priority}
                    estimatedCost={need.estimated_cost || undefined}
                    status={need.status as 'pending' | 'in_progress' | 'fixed'}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-6">Photo Gallery</h3>
              {photos && photos.length > 0 ? (
                <PhotoGallery photos={photos} />
              ) : (
                <p className="text-muted-foreground text-center py-12">No photos available</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </MainLayout>
  );
}
