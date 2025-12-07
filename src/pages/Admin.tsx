import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSchools, useSchoolNeeds } from '@/hooks/useSchools';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  School,
  Plus,
  Search,
  Settings,
  Users,
  AlertTriangle,
  CheckCircle2,
  Edit,
  Trash2,
  LogOut,
  LayoutDashboard,
  ImagePlus,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCard } from '@/components/cards/StatCard';

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: schools, isLoading: schoolsLoading } = useSchools();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not authenticated or not admin
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredSchools = schools?.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalNeeds = schools?.reduce((sum, school) => 
    sum + (school.current_needs?.filter(n => n.priority >= 4).length || 0), 0
  ) || 0;

  const handleMarkNeedFixed = async (needId: string) => {
    try {
      const { error } = await supabase
        .from('school_needs')
        .update({ status: 'fixed' })
        .eq('id', needId);

      if (error) throw error;
      toast({ title: 'Success', description: 'Need marked as fixed' });
    } catch {
      toast({ title: 'Error', description: 'Failed to update need', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <School className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg tracking-tight">
                  SCHOOL<span className="text-primary">INTEL</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-sidebar-accent">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <School className="h-4 w-4" />
              Schools
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <AlertTriangle className="h-4 w-4" />
              Needs
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <ImagePlus className="h-4 w-4" />
              Photos
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Users className="h-4 w-4" />
              Users
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <Badge variant="outline" className="text-xs">Admin</Badge>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-muted-foreground"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" size="sm">
                  View Public Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Schools"
              value={schools?.length || 0}
              icon={School}
              variant="primary"
            />
            <StatCard
              title="Total Teachers"
              value={schools?.reduce((sum, s) => sum + s.qualified_teachers, 0) || 0}
              icon={Users}
              variant="accent"
            />
            <StatCard
              title="Urgent Needs"
              value={totalNeeds}
              icon={AlertTriangle}
              variant="warning"
            />
            <StatCard
              title="Avg Score"
              value={Math.round(schools?.reduce((sum, s) => sum + s.overall_score, 0) / (schools?.length || 1)) || 0}
              icon={CheckCircle2}
              variant="default"
            />
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="schools" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="schools">Schools</TabsTrigger>
              <TabsTrigger value="needs">Manage Needs</TabsTrigger>
            </TabsList>

            {/* Schools Tab */}
            <TabsContent value="schools" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add School
                </Button>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-muted-foreground">School</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Score</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schoolsLoading ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                          </td>
                        </tr>
                      ) : filteredSchools?.map((school) => (
                        <tr key={school.id} className="border-t border-border hover:bg-muted/30">
                          <td className="p-4">
                            <p className="font-medium">{school.name}</p>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {school.lga}, {school.state}
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">
                              {school.school_type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className={cn(
                              'font-bold',
                              school.overall_score >= 60 ? 'text-primary' : 'text-neon-orange'
                            )}>
                              {school.overall_score}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Link to={`/schools/${school.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Needs Tab */}
            <TabsContent value="needs" className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">All School Needs</h3>
                <div className="space-y-3">
                  {schools?.[0]?.current_needs?.map((need, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{need.item}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{need.category}</Badge>
                          <Badge className={cn(
                            need.priority >= 5 ? 'bg-destructive' :
                            need.priority >= 4 ? 'bg-neon-orange' : 'bg-muted'
                          )}>
                            Priority {need.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-primary">
                          {new Intl.NumberFormat('en-NG', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 0,
                          }).format(need.cost)}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary mt-1"
                          onClick={() => handleMarkNeedFixed(`need-${i}`)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Mark Fixed
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
