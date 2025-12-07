import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/cards/StatCard';
import { ScoreCard } from '@/components/cards/ScoreCard';
import { ScoreRadar } from '@/components/charts/ScoreRadar';
import { NeedsDonut } from '@/components/charts/NeedsDonut';
import { useSchools } from '@/hooks/useSchools';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  School, 
  Users, 
  Building2, 
  AlertTriangle,
  ArrowRight,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function Index() {
  const { data: schools, isLoading } = useSchools();
  const school = schools?.[0];

  const radarData = school ? [
    { subject: 'Staff', score: school.staff_adequacy_score, fullMark: 100 },
    { subject: 'Infrastructure', score: school.infrastructure_score, fullMark: 100 },
    { subject: 'Safety', score: school.safety_score, fullMark: 100 },
    { subject: 'Resources', score: school.learning_resources_score, fullMark: 100 },
    { subject: 'Overall', score: school.overall_score, fullMark: 100 },
  ] : [];

  const needsData = school?.current_needs?.map((need, i) => ({
    name: need.category,
    value: need.cost,
    color: ['hsl(142, 76%, 45%)', 'hsl(199, 89%, 48%)', 'hsl(270, 91%, 65%)', 'hsl(45, 93%, 47%)', 'hsl(0, 84%, 60%)'][i % 5],
  })) || [];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Data Platform
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Nigeria School
              <span className="text-gradient-primary block">Intelligence System</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Comprehensive digital twin platform for every school in Nigeria. 
              Real-time analytics, needs assessment, and donor coordination.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/schools">
                <Button size="lg" className="gap-2">
                  Explore Schools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/support">
                <Button size="lg" variant="outline" className="gap-2">
                  Support a School
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Schools"
            value={schools?.length || 0}
            subtitle="In database"
            icon={School}
            variant="primary"
          />
          <StatCard
            title="Total Teachers"
            value={school?.qualified_teachers || 0}
            subtitle="Qualified staff"
            icon={Users}
            variant="accent"
          />
          <StatCard
            title="Classrooms"
            value={school?.total_classrooms || 0}
            subtitle="Learning spaces"
            icon={Building2}
            variant="default"
          />
          <StatCard
            title="Urgent Needs"
            value={school?.current_needs?.filter(n => n.priority >= 4).length || 0}
            subtitle="High priority items"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>
      </section>

      {/* Main Analytics */}
      {school && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold">{school.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {school.lga}, {school.state}
              </p>
            </div>
            <Link to={`/schools/${school.id}`}>
              <Button variant="outline" className="gap-2">
                Full Profile
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Cards */}
            <div className="space-y-4">
              <ScoreCard title="Staff Adequacy" score={school.staff_adequacy_score} />
              <ScoreCard title="Infrastructure" score={school.infrastructure_score} />
              <ScoreCard title="Safety" score={school.safety_score} />
              <ScoreCard title="Learning Resources" score={school.learning_resources_score} />
            </div>

            {/* Radar Chart */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Performance Overview
              </h3>
              <ScoreRadar data={radarData} />
            </div>

            {/* Needs Donut */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-neon-yellow" />
                Needs by Category
              </h3>
              <NeedsDonut data={needsData} />
            </div>
          </div>
        </section>
      )}

      {isLoading && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
