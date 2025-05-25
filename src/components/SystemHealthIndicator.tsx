
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Activity, AlertTriangle } from 'lucide-react';

interface SystemHealthProps {
  health: number;
  isActive: boolean;
}

export const SystemHealthIndicator = ({ health, isActive }: SystemHealthProps) => {
  const [pulseClass, setPulseClass] = useState('');

  useEffect(() => {
    if (health < 85) {
      setPulseClass('animate-pulse-red');
    } else if (health < 95) {
      setPulseClass('warning-glow');
    } else {
      setPulseClass('safe-glow animate-pulse-royal');
    }
  }, [health]);

  const getHealthStatus = () => {
    if (health >= 95) return { status: 'Optimal', color: 'bg-emerald-500', icon: Shield };
    if (health >= 85) return { status: 'Warning', color: 'bg-amber-500', icon: AlertTriangle };
    return { status: 'Critical', color: 'bg-red-500', icon: AlertTriangle };
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <Card className="glass-effect border-primary/20 royal-gradient">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <HealthIcon className="mr-2 h-5 w-5 text-primary" />
          System Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold text-primary">
            {health.toFixed(1)}%
          </div>
          <Badge className={`${healthStatus.color}/20 text-${healthStatus.color.split('-')[1]}-400 border-${healthStatus.color}/30`}>
            {healthStatus.status}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">AI Models Status:</span>
            <span className={`font-bold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isActive ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network Security:</span>
            <span className="text-primary font-bold">PROTECTED</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Threat Detection:</span>
            <span className="text-emerald-400 font-bold">OPERATIONAL</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="text-xs text-muted-foreground">System Performance</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${healthStatus.color} ${pulseClass}`}
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
