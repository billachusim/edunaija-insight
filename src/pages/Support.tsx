import { MainLayout } from '@/components/layout/MainLayout';
import { useSchools } from '@/hooks/useSchools';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Heart,
  Building2,
  Users,
  BookOpen,
  Droplets,
  Shield,
  ArrowRight,
  Mail,
  Phone,
  CheckCircle2,
} from 'lucide-react';

const supportCategories = [
  {
    icon: Building2,
    title: 'Infrastructure',
    description: 'Help build and repair classrooms, toilets, and school buildings',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Provide textbooks, computers, smart boards, and library materials',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Users,
    title: 'Staff & Training',
    description: 'Support teacher training programs and salary supplements',
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple/10',
  },
  {
    icon: Droplets,
    title: 'Water & Sanitation',
    description: 'Install water systems, repair toilets, and provide sanitary supplies',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: 'Build fences, gates, and improve overall school security',
    color: 'text-neon-yellow',
    bgColor: 'bg-neon-yellow/10',
  },
];

const impactStats = [
  { value: '1M+', label: 'Students Impacted' },
  { value: '50K+', label: 'Teachers Supported' },
  { value: '₦2.5B', label: 'Needs Identified' },
  { value: '36', label: 'States Covered' },
];

export default function SupportPage() {
  const { data: schools } = useSchools();
  
  const totalNeeds = schools?.reduce((sum, school) => {
    return sum + (school.current_needs?.reduce((needSum, need) => needSum + need.cost, 0) || 0);
  }, 0) || 0;

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient border-b border-border/50">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Heart className="h-3 w-3 mr-1" />
              Make a Difference
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Support Nigeria's
              <span className="text-gradient-primary block">Educational Future</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Every school has unique needs. Your contribution—big or small—directly 
              impacts students and teachers across Nigeria. Join government agencies, 
              NGOs, and individuals making education better.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Heart className="h-4 w-4" />
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Help */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">How You Can Help</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a category that resonates with you and make a targeted impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCategories.map((category, i) => (
            <div 
              key={i} 
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-xl ${category.bgColor} mb-4`}>
                <category.icon className={`h-6 w-6 ${category.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <Button variant="ghost" className="gap-2 group-hover:text-primary p-0">
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Current Needs */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Current Funding Needs
              </h2>
              <p className="text-muted-foreground mb-6">
                Our platform tracks real-time needs across all registered schools. 
                These are verified, prioritized requirements that need immediate attention.
              </p>
              
              <div className="glass-card p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Total Estimated Needs</p>
                <p className="font-display text-4xl font-bold text-primary">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0,
                    notation: 'compact',
                  }).format(totalNeeds)}
                </p>
              </div>

              <Link to="/schools">
                <Button className="gap-2">
                  View All School Needs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {schools?.[0]?.current_needs?.slice(0, 4).map((need, i) => (
                <div key={i} className="glass-card p-4 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{need.item}</p>
                    <p className="text-sm text-muted-foreground">{need.category}</p>
                  </div>
                  <p className="font-display font-bold text-primary">
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                      minimumFractionDigits: 0,
                      notation: 'compact',
                    }).format(need.cost)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Want to partner with us or need more information about supporting schools?
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              support@schoolintel.ng
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              +234 800 SCHOOL
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
