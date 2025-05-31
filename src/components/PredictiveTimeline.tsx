
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, AlertTriangle, Brain, Zap, Target } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'prediction' | 'precursor' | 'attack' | 'mitigation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  confidence: number;
  aiModel: string;
  status: 'predicted' | 'occurring' | 'mitigated' | 'prevented';
}

export const PredictiveTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('24h');

  useEffect(() => {
    // Generate predictive timeline events
    const now = new Date();
    const events: TimelineEvent[] = [
      {
        id: '1',
        timestamp: new Date(now.getTime() + 2 * 60 * 60 * 1000), // +2 hours
        type: 'prediction',
        severity: 'critical',
        title: 'Advanced Persistent Threat Predicted',
        description: 'AI models predict 94% likelihood of APT attack targeting financial data systems',
        confidence: 94,
        aiModel: 'Ensemble LSTM + Transformer',
        status: 'predicted'
      },
      {
        id: '2',
        timestamp: new Date(now.getTime() + 4 * 60 * 60 * 1000), // +4 hours
        type: 'precursor',
        severity: 'high',
        title: 'Reconnaissance Activity Expected',
        description: 'Network scanning and vulnerability probing anticipated based on dark web intelligence',
        confidence: 87,
        aiModel: 'Behavioral Analysis AI',
        status: 'predicted'
      },
      {
        id: '3',
        timestamp: new Date(now.getTime() + 8 * 60 * 60 * 1000), // +8 hours
        type: 'attack',
        severity: 'critical',
        title: 'Zero-Day Exploit Deployment',
        description: 'ML models forecast zero-day exploit targeting authentication systems',
        confidence: 91,
        aiModel: 'Deep Learning Classifier',
        status: 'predicted'
      },
      {
        id: '4',
        timestamp: new Date(now.getTime() + 12 * 60 * 60 * 1000), // +12 hours
        type: 'mitigation',
        severity: 'medium',
        title: 'Automated Countermeasures Scheduled',
        description: 'AI-generated defense protocols will be automatically deployed',
        confidence: 98,
        aiModel: 'Countermeasure Generator',
        status: 'predicted'
      },
      {
        id: '5',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000), // -1 hour (past)
        type: 'precursor',
        severity: 'medium',
        title: 'Suspicious Network Patterns',
        description: 'Anomalous traffic patterns detected and analyzed',
        confidence: 78,
        aiModel: 'Isolation Forest',
        status: 'mitigated'
      },
      {
        id: '6',
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // -3 hours (past)
        type: 'attack',
        severity: 'high',
        title: 'DDoS Attack Attempt',
        description: 'Distributed denial of service attack successfully prevented',
        confidence: 96,
        aiModel: 'Real-time ML Engine',
        status: 'prevented'
      }
    ];

    setTimelineEvents(events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
  }, []);

  const getEventColor = (type: string, status: string) => {
    if (status === 'prevented' || status === 'mitigated') {
      return 'border-emerald-500 bg-emerald-500/10';
    }
    
    switch (type) {
      case 'prediction': return 'border-blue-500 bg-blue-500/10';
      case 'precursor': return 'border-amber-500 bg-amber-500/10';
      case 'attack': return 'border-red-500 bg-red-500/10';
      case 'mitigation': return 'border-emerald-500 bg-emerald-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <Brain className="h-4 w-4" />;
      case 'precursor': return <TrendingUp className="h-4 w-4" />;
      case 'attack': return <AlertTriangle className="h-4 w-4" />;
      case 'mitigation': return <Zap className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30 animate-pulse';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTimeDistance = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.abs(diffMs) / (1000 * 60 * 60);
    
    if (diffMs < 0) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return `in ${Math.floor(diffHours)}h`;
    }
  };

  const isPastEvent = (date: Date) => {
    return date.getTime() < new Date().getTime();
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            Predictive Attack Timeline
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              AI PREDICTIONS
            </Badge>
            <div className="flex space-x-1">
              {(['1h', '6h', '24h', '7d'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="h-6 px-2 text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-muted/30"></div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const isNow = Math.abs(event.timestamp.getTime() - new Date().getTime()) < 30 * 60 * 1000; // Within 30 minutes
              const isPast = isPastEvent(event.timestamp);
              
              return (
                <div key={event.id} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-4 w-4 h-4 rounded-full border-2 ${
                    isNow ? 'bg-primary border-primary animate-pulse' :
                    isPast ? 'bg-emerald-500 border-emerald-500' :
                    'bg-blue-500 border-blue-500'
                  } flex items-center justify-center`}>
                    {isNow && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                  </div>
                  
                  {/* Event card */}
                  <div className={`ml-12 p-4 rounded-lg border ${getEventColor(event.type, event.status)} transition-all hover:border-primary/40`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(event.type)}
                        <div className="font-semibold text-foreground">{event.title}</div>
                        {isNow && (
                          <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                            NOW
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.confidence}%
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">
                          AI Model: <span className="text-primary">{event.aiModel}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Status: <span className={`${
                            event.status === 'prevented' || event.status === 'mitigated' ? 'text-emerald-400' :
                            event.status === 'predicted' ? 'text-blue-400' :
                            'text-amber-400'
                          }`}>{event.status}</span>
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {formatTimeDistance(event.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Now indicator */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs text-primary font-semibold">NOW</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
