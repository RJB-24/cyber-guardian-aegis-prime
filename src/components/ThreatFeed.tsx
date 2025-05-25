
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, Shield, Zap, Clock } from 'lucide-react';

interface Threat {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  status: 'detected' | 'investigating' | 'neutralized' | 'predicted';
  aiModel: string;
}

interface ThreatFeedProps {
  threats: Threat[];
  isRealTime?: boolean;
}

export const ThreatFeed = ({ threats, isRealTime = true }: ThreatFeedProps) => {
  const [displayThreats, setDisplayThreats] = useState<Threat[]>(threats);
  const [newThreatCount, setNewThreatCount] = useState(0);

  useEffect(() => {
    setDisplayThreats(threats);
    if (threats.length > displayThreats.length) {
      setNewThreatCount(threats.length - displayThreats.length);
      setTimeout(() => setNewThreatCount(0), 3000);
    }
  }, [threats]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30 threat-glow animate-pulse';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neutralized': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'investigating': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'predicted': return 'bg-primary/20 text-primary border-primary/30 safe-glow';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return Alert;
      case 'high': return Shield;
      case 'medium': return Zap;
      default: return Clock;
    }
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Alert className="mr-2 h-5 w-5 text-primary" />
            AI Threat Intelligence Feed
          </span>
          {isRealTime && (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400">LIVE</span>
              {newThreatCount > 0 && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                  +{newThreatCount} New
                </Badge>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {displayThreats.slice(0, 10).map((threat) => {
              const SeverityIcon = getSeverityIcon(threat.severity);
              return (
                <div 
                  key={threat.id} 
                  className="p-4 bg-muted/10 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:safe-glow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <SeverityIcon className="h-4 w-4 text-primary" />
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        AI-POWERED
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(threat.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-foreground mb-2">{threat.type}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{threat.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <span>AI Model: {threat.aiModel}</span>
                      <span>Confidence: {threat.confidence}%</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      ML-VERIFIED
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
