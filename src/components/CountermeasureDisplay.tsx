
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Zap, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Countermeasure {
  id: string;
  action: string;
  description: string;
  status: 'pending' | 'deployed' | 'successful' | 'failed';
  impact: string;
  threat_id?: string;
  deployment_time?: string;
  created_at: string;
}

interface CountermeasureDisplayProps {
  countermeasures: Countermeasure[];
  onDeployAll?: () => void;
}

export const CountermeasureDisplay = ({ countermeasures, onDeployAll }: CountermeasureDisplayProps) => {
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate new countermeasures
    const newMeasures = countermeasures.filter(cm => 
      new Date(cm.created_at).getTime() > Date.now() - 5000
    );
    
    if (newMeasures.length > 0) {
      const newIds = new Set(newMeasures.map(cm => cm.id));
      setAnimatingIds(newIds);
      setTimeout(() => setAnimatingIds(new Set()), 2000);
    }
  }, [countermeasures]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'deployed': return 'bg-primary/20 text-primary border-primary/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful': return CheckCircle;
      case 'deployed': return Zap;
      case 'failed': return AlertTriangle;
      case 'pending': return Clock;
      default: return Shield;
    }
  };

  const pendingCount = countermeasures.filter(cm => cm.status === 'pending').length;
  const successfulCount = countermeasures.filter(cm => cm.status === 'successful').length;

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            AI-Generated Countermeasures
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {successfulCount} Deployed
            </Badge>
            {pendingCount > 0 && (
              <Button 
                size="sm" 
                onClick={onDeployAll}
                className="bg-primary hover:bg-primary/80 text-black"
              >
                Deploy All ({pendingCount})
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {countermeasures.slice(0, 10).map((measure) => {
              const StatusIcon = getStatusIcon(measure.status);
              const isAnimating = animatingIds.has(measure.id);
              
              return (
                <div 
                  key={measure.id} 
                  className={`p-4 bg-muted/10 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300 ${
                    isAnimating ? 'animate-fade-in safe-glow' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="h-4 w-4 text-primary" />
                      <Badge className={getStatusColor(measure.status)}>
                        {measure.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        ML-GENERATED
                      </Badge>
                      {isAnimating && (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(measure.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-foreground mb-2">{measure.action}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{measure.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Impact: <span className="text-primary font-medium">{measure.impact}</span>
                    </div>
                    {measure.deployment_time && (
                      <div className="text-xs text-muted-foreground">
                        Deployed: {new Date(measure.deployment_time).toLocaleTimeString()}
                      </div>
                    )}
                  </div>

                  {measure.status === 'pending' && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <Button 
                        size="sm" 
                        className="w-full bg-primary hover:bg-primary/80 text-black"
                        onClick={() => console.log(`Deploying countermeasure: ${measure.id}`)}
                      >
                        Deploy Countermeasure
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
