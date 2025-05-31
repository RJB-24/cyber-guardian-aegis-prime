
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, Zap, Shield, AlertTriangle, Eye } from 'lucide-react';

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  count: number;
  lastSeen: Date;
}

export const ThreatIntelligenceMap = () => {
  const [threatLocations, setThreatLocations] = useState<ThreatLocation[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);
  const [mapMode, setMapMode] = useState<'threats' | 'heatmap' | 'live'>('threats');

  useEffect(() => {
    // Initialize threat locations data
    const locations: ThreatLocation[] = [
      {
        id: '1',
        country: 'China',
        city: 'Beijing',
        lat: 39.9042,
        lng: 116.4074,
        threatType: 'APT Attack',
        severity: 'critical',
        count: 23,
        lastSeen: new Date()
      },
      {
        id: '2',
        country: 'Russia',
        city: 'Moscow',
        lat: 55.7558,
        lng: 37.6176,
        threatType: 'Ransomware',
        severity: 'high',
        count: 18,
        lastSeen: new Date(Date.now() - 300000)
      },
      {
        id: '3',
        country: 'North Korea',
        city: 'Pyongyang',
        lat: 39.0392,
        lng: 125.7625,
        threatType: 'State Sponsored',
        severity: 'critical',
        count: 12,
        lastSeen: new Date(Date.now() - 600000)
      },
      {
        id: '4',
        country: 'Iran',
        city: 'Tehran',
        lat: 35.6892,
        lng: 51.3890,
        threatType: 'Infrastructure Attack',
        severity: 'high',
        count: 15,
        lastSeen: new Date(Date.now() - 900000)
      },
      {
        id: '5',
        country: 'Brazil',
        city: 'São Paulo',
        lat: -23.5505,
        lng: -46.6333,
        threatType: 'Banking Malware',
        severity: 'medium',
        count: 8,
        lastSeen: new Date(Date.now() - 1200000)
      },
      {
        id: '6',
        country: 'Nigeria',
        city: 'Lagos',
        lat: 6.5244,
        lng: 3.3792,
        threatType: 'Phishing Campaign',
        severity: 'medium',
        count: 27,
        lastSeen: new Date(Date.now() - 180000)
      },
      {
        id: '7',
        country: 'Ukraine',
        city: 'Kiev',
        lat: 50.4501,
        lng: 30.5234,
        threatType: 'Cyber Warfare',
        severity: 'critical',
        count: 34,
        lastSeen: new Date(Date.now() - 60000)
      }
    ];

    setThreatLocations(locations);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setThreatLocations(prev => prev.map(location => ({
        ...location,
        count: location.count + Math.floor(Math.random() * 3),
        lastSeen: Math.random() < 0.3 ? new Date() : location.lastSeen
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getThreatSize = (count: number) => {
    return Math.min(Math.max(count / 5 + 5, 8), 25);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-primary" />
            Global Threat Intelligence Map
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
              LIVE INTEL
            </Badge>
            <div className="flex space-x-1">
              {(['threats', 'heatmap', 'live'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={mapMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setMapMode(mode)}
                  className="h-6 px-2 text-xs"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Simulated World Map */}
          <div className="relative h-80 bg-slate-950/50 rounded-lg border border-primary/20 overflow-hidden">
            {/* Map background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23334155' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)' /%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Threat locations */}
            {threatLocations.map((location) => {
              // Convert lat/lng to screen coordinates (simplified)
              const x = ((location.lng + 180) / 360) * 100;
              const y = ((90 - location.lat) / 180) * 100;
              const size = getThreatSize(location.count);
              const color = getSeverityColor(location.severity);
              
              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  onClick={() => setSelectedThreat(location)}
                >
                  {/* Pulse rings for critical threats */}
                  {location.severity === 'critical' && (
                    <>
                      <div
                        className="absolute rounded-full animate-ping"
                        style={{
                          width: `${size * 2}px`,
                          height: `${size * 2}px`,
                          backgroundColor: color,
                          opacity: 0.3,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                      <div
                        className="absolute rounded-full animate-ping"
                        style={{
                          width: `${size * 1.5}px`,
                          height: `${size * 1.5}px`,
                          backgroundColor: color,
                          opacity: 0.5,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          animationDelay: '0.5s',
                        }}
                      />
                    </>
                  )}
                  
                  {/* Main threat marker */}
                  <div
                    className="rounded-full border-2 border-white/50 shadow-lg group-hover:scale-110 transition-transform"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                    }}
                  />
                  
                  {/* Threat count */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/70 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {location.count}
                  </div>
                </div>
              );
            })}
            
            {/* Connection lines for live mode */}
            {mapMode === 'live' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {threatLocations.map((location, index) => {
                  if (index === 0) return null;
                  const prevLocation = threatLocations[index - 1];
                  
                  const x1 = ((prevLocation.lng + 180) / 360) * 100;
                  const y1 = ((90 - prevLocation.lat) / 180) * 100;
                  const x2 = ((location.lng + 180) / 360) * 100;
                  const y2 = ((90 - location.lat) / 180) * 100;
                  
                  return (
                    <line
                      key={`line-${location.id}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#EF4444"
                      strokeWidth="1"
                      strokeOpacity="0.5"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            )}
          </div>

          {/* Threat Details Panel */}
          {selectedThreat && (
            <div className="p-4 bg-muted/10 rounded-lg border border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="font-semibold text-foreground">
                    {selectedThreat.city}, {selectedThreat.country}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedThreat(null)}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Threat Type</div>
                  <div className="font-medium text-foreground">{selectedThreat.threatType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Severity</div>
                  <Badge className={`${
                    selectedThreat.severity === 'critical' ? 'bg-red-600/20 text-red-300 border-red-600/30' :
                    selectedThreat.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    selectedThreat.severity === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {selectedThreat.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Attack Count</div>
                  <div className="font-bold text-red-400">{selectedThreat.count}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Seen</div>
                  <div className="font-medium text-foreground">{formatTimeAgo(selectedThreat.lastSeen)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-muted-foreground">High</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse"></div>
                <span className="text-muted-foreground">Critical</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              Total Active Threats: <span className="text-red-400 font-bold">
                {threatLocations.reduce((sum, loc) => sum + loc.count, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
