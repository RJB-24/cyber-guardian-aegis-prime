
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Zap, Search, Bell, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Threat Prediction', href: '/threats', icon: Search },
  { name: 'Countermeasures', href: '/countermeasures', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: Zap },
  { name: 'About', href: '/about', icon: Clock },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary matrix-text" />
            <h1 className="text-2xl font-bold text-primary matrix-text">AEGIS</h1>
            <span className="text-sm text-muted-foreground">Autonomous Predictive Cyber-Defense</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                  {notifications}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse-green"></div>
              <span className="text-primary">SYSTEM ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-card/30 backdrop-blur-sm border-r border-border/50 min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 safe-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
