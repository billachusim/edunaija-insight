import { Link } from 'react-router-dom';
import { School, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <School className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg tracking-tight">
                  SCHOOL<span className="text-primary">INTEL</span>
                </h2>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] -mt-1">
                  Nigeria
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Comprehensive school intelligence platform for Nigeria. Empowering education through data.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/schools" className="hover:text-primary transition-colors">All Schools</Link></li>
              <li><Link to="/support" className="hover:text-primary transition-colors">How to Help</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Data Sources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reports</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 SchoolIntel Nigeria. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
