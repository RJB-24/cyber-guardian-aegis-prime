
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Search, Target, Brain, Zap, Eye, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface ThreatHunt {
  id: string;
  name: string;
  type: 'behavioral' | 'signature' | 'anomaly' | 'ml_detection';
  status: 'hunting' | 'found' | 'investigating' | 'resolved';
  confidence: number;
  timeElapsed: number;
  indicators: string[];
  aiModel: string;
  findings: number;
}

export const ThreatHuntingDashboard = () => {
  const [activeHunts, setActiveHunts] = useState<ThreatHunt[]>([]);
  const [huntingStats, setHuntingStats] = useState({
    totalHunts: 0,
    activeHunts: 0,
    threatsFound: 0,
    averageTime: 0,
    successRate: 0
  });

  useEffect(() => {
    // Initialize threat hunts
    const initialHunts: ThreatHunt[] = [
      {
        id: '1',
        name: 'Advanced Persistent Threat Detection',
        type: 'behavioral',
        status: 'hunting',
        confidence: 87,
        timeElapsed: 45,
        indicators: ['Unusual network traffic patterns', 'Elevated privilege usage', 'Suspicious file modifications'],
        aiModel: 'LSTM + Isolation Forest',
        findings: 3
      },
      {
        id: '2',
        name: 'Zero-Day Exploit Analysis',
        type: 'ml_detection',
        status: 'found',
        confidence: 94,
        timeElapsed: 12,
        indicators: ['Unknown payload signature', 'Memory corruption patterns', 'Syscall anomalies'],
        aiModel: 'Ensemble Neural Network',
        findings: 7
      },
      {
        id: '3',
        name: 'Cryptocurrency Mining Detection',
        type: 'anomaly',
        status: 'investigating',
        confidence: 76,
        timeElapsed: 78,
        indicators: ['High CPU usage patterns', 'Network mining pool connections', 'Process masquerading'],
        aiModel: 'Random Forest + SVM',
        findings: 2
      },
      {
        id: '4',
        name: 'Insider Threat Behavioral Analysis',
        type: 'behavioral',
        status: 'hunting',
        confidence: 65,
        timeElapsed: 156,
        indicators: ['After-hours access patterns', 'Unusual data transfers', 'Privilege escalation attempts'],
        aiModel: 'Deep Learning RNN',
        findings: 1
      }
    ];

    setActiveHunts(initialHunts);
    setHuntingStats({
      totalHunts: 24,
      activeHunts: initialHunts.filter(h => h.status === 'hunting' || h.status === 'investigating').length,
      threatsFound: 18,
      averageTime: 67,
      successRate: 92.3
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveHunts(prev => prev.map(hunt => {
        if (hunt.status === 'hunting' || hunt.status === 'investigating') {
          const newTimeElapsed = hunt.timeElapsed + Math.floor(Math.random() * 5) + 1;
          let newStatus: 'hunting' | 'found' | 'investigating' | 'resolved' = hunt.status;
          let newConfidence = hunt.confidence;
          let newFindings = hunt.findings;

          // Randomly update status based on time and confidence
          if (hunt.status === 'hunting' && Math.random() < 0.1) {
            if (hunt.confidence > 80) {
              newStatus = 'found';
              newFindings += Math.floor(Math.random() * 3) + 1;
            } else if (hunt.confidence > 60) {
              newStatus = 'investigating';
            }
          }

          // Update confidence
          if (hunt.status === 'hunting') {
            newConfidence = Math.min(95, hunt.confidence + Math.random() * 2);
          }

          return {
            ...hunt,
            timeElapsed: newTimeElapsed,
            status: newStatus,
            confidence: Math.round(newConfidence),
            findings: newFindings
          };
        }
        return hunt;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hunting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'found': return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
      case 'investigating': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'behavioral': return <Activity className="h-4 w-4" />;
      case 'signature': return <Search className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'ml_detection': return <Brain className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const startNewHunt = () => {
    const huntTypes = ['behavioral', 'signature', 'anomaly', 'ml_detection'] as const;
    const huntNames = [
      'Ransomware Pattern Detection',
      'Lateral Movement Analysis',
      'Data Exfiltration Hunt',
      'Command & Control Detection',
      'Privilege Escalation Hunt'
    ];

    const newHunt: ThreatHunt = {
      id: Date.now().toString(),
      name: huntNames[Math.floor(Math.random() * huntNames.length)],
      type: huntTypes[Math.floor(Math.random() * huntTypes.length)],
      status: 'hunting',
      confidence: Math.floor(Math.random() * 30) + 40,
      timeElapsed: 0,
      indicators: [
        'Analyzing network patterns...',
        'Processing system logs...',
        'Running ML models...'
      ],
      aiModel: 'Ensemble AI',
      findings: 0
    };

    setActiveHunts(prev => [newHunt, ...prev]);
    setHuntingStats(prev => ({
      ...prev,
      activeHunts: prev.activeHunts + 1
    }));
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            AI Threat Hunting Operations
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
              ACTIVE HUNTS: {huntingStats.activeHunts}
            </Badge>
            <Button variant="outline" size="sm" onClick={startNewHunt}>
              <Zap className="h-4 w-4 mr-1" />
              New Hunt
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Hunt Statistics */}
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{huntingStats.totalHunts}</div>
              <div className="text-xs text-muted-foreground">Total Hunts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{huntingStats.activeHunts}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{huntingStats.threatsFound}</div>
              <div className="text-xs text-muted-foreground">Threats Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{huntingStats.averageTime}s</div>
              <div className="text-xs text-muted-foreground">Avg Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{huntingStats.successRate}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Active Hunts */}
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {activeHunts.map((hunt) => (
                <div key={hunt.id} className="p-4 bg-muted/10 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(hunt.type)}
                      <div className="font-semibold text-foreground">{hunt.name}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(hunt.status)}>
                        {hunt.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {hunt.findings} findings
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">AI Model:</span>
                      <span className="text-primary font-medium">{hunt.aiModel}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={hunt.confidence} className="w-20 h-2" />
                        <span className="text-primary font-medium">{hunt.confidence}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time Elapsed:</span>
                      <span className="text-foreground">{hunt.timeElapsed}s</span>
                    </div>

                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Indicators:</div>
                      <div className="space-y-1">
                        {hunt.indicators.map((indicator, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground pl-2 border-l-2 border-primary/30">
                            {indicator}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
