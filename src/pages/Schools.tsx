import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useSchools } from '@/hooks/useSchools';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Users, 
  Building2,
  ArrowRight,
  Filter,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-score-excellent';
  if (score >= 60) return 'bg-score-good';
  if (score >= 40) return 'bg-score-fair';
  if (score >= 20) return 'bg-score-poor';
  return 'bg-score-critical';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Critical';
}

export default function SchoolsPage() {
  const { data: schools, isLoading } = useSchools();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');

  const filteredSchools = schools?.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.lga.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || school.school_type === typeFilter;
    
    let matchesScore = true;
    if (scoreFilter === 'excellent') matchesScore = school.overall_score >= 80;
    else if (scoreFilter === 'good') matchesScore = school.overall_score >= 60 && school.overall_score < 80;
    else if (scoreFilter === 'fair') matchesScore = school.overall_score >= 40 && school.overall_score < 60;
    else if (scoreFilter === 'poor') matchesScore = school.overall_score < 40;
    
    return matchesSearch && matchesType && matchesScore;
  });

  return (
    <MainLayout>
      {/* Header */}
      <section className="border-b border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            School <span className="text-gradient-primary">Directory</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse all schools in our database. View detailed profiles, analytics, 
            and current needs for each institution.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, state, or LGA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px] bg-card">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={scoreFilter} onValueChange={setScoreFilter}>
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scores</SelectItem>
                <SelectItem value="excellent">Excellent (80+)</SelectItem>
                <SelectItem value="good">Good (60-79)</SelectItem>
                <SelectItem value="fair">Fair (40-59)</SelectItem>
                <SelectItem value="poor">Poor (&lt;40)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Schools Grid */}
      <section className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredSchools?.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">No Schools Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools?.map((school) => (
              <Link
                key={school.id}
                to={`/schools/${school.id}`}
                className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2 text-xs uppercase">
                      {school.school_type === 'both' ? 'Primary & Secondary' : school.school_type}
                    </Badge>
                    <h3 className="font-display font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {school.name}
                    </h3>
                  </div>
                  <div className={cn(
                    'px-2 py-1 rounded-lg text-xs font-bold text-primary-foreground',
                    getScoreColor(school.overall_score)
                  )}>
                    {school.overall_score}
                  </div>
                </div>

                {/* Location */}
                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4" />
                  {school.lga}, {school.state}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Users className="h-3 w-3" />
                      Teachers
                    </div>
                    <p className="font-display font-bold text-lg">{school.qualified_teachers}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                      <Building2 className="h-3 w-3" />
                      Classrooms
                    </div>
                    <p className="font-display font-bold text-lg">{school.total_classrooms}</p>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Overall Score</span>
                    <span className={cn('font-medium', 
                      school.overall_score >= 60 ? 'text-primary' : 'text-neon-orange'
                    )}>
                      {getScoreLabel(school.overall_score)}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full transition-all', getScoreColor(school.overall_score))}
                      style={{ width: `${school.overall_score}%` }}
                    />
                  </div>
                </div>

                {/* View Button */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                    View Full Profile
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
