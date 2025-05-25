
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Zap, Search, Bell, Clock, Crown } from 'lucide-react';

const navigation = [
  { name: 'Command Center', href: '/dashboard', icon: Activity },
  { name: 'Threat Analysis', href: '/threats', icon: Search },
  { name: 'Defense Matrix', href: '/countermeasures', icon: Shield },
  { name: 'Intelligence', href: '/analytics', icon: Zap },
  { name: 'System Info', href: '/about', icon: Clock },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 glass-effect sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Crown className="h-8 w-8 text-primary royal-text" />
              <div className="absolute inset-0 animate-pulse-royal rounded-full"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold royal-text">AEGIS PRIME</h1>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">
                AUTONOMOUS GUARDIAN PROTOCOL
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white animate-pulse">
                  {notifications}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 px-3 py-1 rounded-full glass-effect">
              <div className="status-indicator active">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
              </div>
              <span className="text-primary font-medium text-sm tracking-wide">SENTINEL ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-72 glass-effect border-r border-border/30 min-h-[calc(100vh-4rem)]">
          <div className="p-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 safe-glow royal-gradient'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-primary/20 border border-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span className="font-medium tracking-wide">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 bg-primary rounded-full animate-pulse-royal"></div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* System Status Panel */}
          <div className="mx-6 mt-8 p-4 rounded-xl royal-gradient border border-primary/20">
            <h3 className="text-sm font-semibold text-foreground mb-3 tracking-wide">SYSTEM STATUS</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threat Level</span>
                <span className="text-warning font-medium">MODERATE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Defense Grid</span>
                <span className="text-primary font-medium">OPERATIONAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Sentinels</span>
                <span className="text-primary font-medium">ACTIVE</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
