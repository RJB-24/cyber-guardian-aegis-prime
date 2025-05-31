
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Shield, Bot, Zap, CheckCircle, Clock, AlertTriangle, Settings, Play } from 'lucide-react';

interface IncidentResponse {
  id: string;
  incidentType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'triggered' | 'analyzing' | 'responding' | 'contained' | 'resolved';
  confidence: number;
  responseTime: number;
  automatedActions: string[];
  aiDecision: string;
  impactAssessment: string;
  timestamp: string;
}

export const IncidentResponseSystem = () => {
  const [activeIncidents, setActiveIncidents] = useState<IncidentResponse[]>([]);
  const [responseStats, setResponseStats] = useState({
    totalIncidents: 47,
    autoResolved: 42,
    avgResponseTime: 2.3,
    successRate: 97.8,
    activeIncidents: 0
  });

  useEffect(() => {
    // Initialize with some active incidents
    const initialIncidents: IncidentResponse[] = [
      {
        id: '1',
        incidentType: 'DDoS Attack Detected',
        severity: 'critical',
        status: 'responding',
        confidence: 96,
        responseTime: 1.8,
        automatedActions: [
          'Rate limiting activated',
          'Blacklisted attacking IPs',
          'Scaled infrastructure',
          'Activated CDN protection'
        ],
        aiDecision: 'Implement multi-layer DDoS mitigation with geographic filtering',
        impactAssessment: 'Service availability maintained at 99.2%',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        incidentType: 'Malware Injection Attempt',
        severity: 'high',
        status: 'contained',
        confidence: 94,
        responseTime: 0.9,
        automatedActions: [
          'Quarantined suspicious files',
          'Isolated affected systems',
          'Updated security signatures',
          'Initiated deep scan'
        ],
        aiDecision: 'Contain spread and perform forensic analysis',
        impactAssessment: 'Zero data compromise, 3 systems isolated',
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: '3',
        incidentType: 'Unauthorized Access Attempt',
        severity: 'medium',
        status: 'analyzing',
        confidence: 78,
        responseTime: 0.5,
        automatedActions: [
          'Account temporarily suspended',
          'Multi-factor authentication enforced',
          'Access logs captured',
          'Security team alerted'
        ],
        aiDecision: 'Monitor behavior patterns and verify identity',
        impactAssessment: 'No unauthorized access granted',
        timestamp: new Date(Date.now() - 120000).toISOString()
      }
    ];

    setActiveIncidents(initialIncidents);
    setResponseStats(prev => ({
      ...prev,
      activeIncidents: initialIncidents.filter(i => i.status !== 'resolved').length
    }));

    // Simulate real-time incident progression
    const interval = setInterval(() => {
      setActiveIncidents(prev => prev.map(incident => {
        if (incident.status === 'resolved') return incident;

        const progressStages = ['triggered', 'analyzing', 'responding', 'contained', 'resolved'];
        const currentStageIndex = progressStages.indexOf(incident.status);
        
        // Random chance to progress to next stage
        if (Math.random() < 0.3 && currentStageIndex < progressStages.length - 1) {
          const nextStatus = progressStages[currentStageIndex + 1] as IncidentResponse['status'];
          const newResponseTime = incident.responseTime + Math.random() * 0.5;
          
          return {
            ...incident,
            status: nextStatus,
            responseTime: Number(newResponseTime.toFixed(1)),
            confidence: Math.min(99, incident.confidence + Math.random() * 3)
          };
        }

        return {
          ...incident,
          responseTime: Number((incident.responseTime + Math.random() * 0.1).toFixed(1))
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30 animate-pulse';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'triggered': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'analyzing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'responding': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'contained': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'triggered': return <AlertTriangle className="h-4 w-4" />;
      case 'analyzing': return <Settings className="h-4 w-4 animate-spin" />;
      case 'responding': return <Zap className="h-4 w-4" />;
      case 'contained': return <Shield className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const simulateNewIncident = () => {
    const incidentTypes = [
      'SQL Injection Attempt',
      'Brute Force Attack',
      'Data Exfiltration Alert',
      'Privilege Escalation',
      'Suspicious Network Traffic'
    ];

    const severities: IncidentResponse['severity'][] = ['low', 'medium', 'high', 'critical'];

    const newIncident: IncidentResponse = {
      id: Date.now().toString(),
      incidentType: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: 'triggered',
      confidence: Math.floor(Math.random() * 20) + 80,
      responseTime: 0,
      automatedActions: [
        'Alert triggered',
        'Initial assessment started',
        'Security protocols activated'
      ],
      aiDecision: 'Analyzing threat patterns and determining response strategy',
      impactAssessment: 'Assessment in progress...',
      timestamp: new Date().toISOString()
    };

    setActiveIncidents(prev => [newIncident, ...prev]);
    setResponseStats(prev => ({
      ...prev,
      totalIncidents: prev.totalIncidents + 1,
      activeIncidents: prev.activeIncidents + 1
    }));
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            Autonomous Incident Response System
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              AI-POWERED
            </Badge>
            <Button variant="outline" size="sm" onClick={simulateNewIncident}>
              <Play className="h-4 w-4 mr-1" />
              Simulate Incident
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Response Statistics */}
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{responseStats.totalIncidents}</div>
              <div className="text-xs text-muted-foreground">Total Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{responseStats.autoResolved}</div>
              <div className="text-xs text-muted-foreground">Auto-Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{responseStats.avgResponseTime}s</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{responseStats.successRate}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{responseStats.activeIncidents}</div>
              <div className="text-xs text-muted-foreground">Active Now</div>
            </div>
          </div>

          {/* Active Incidents */}
          <ScrollArea className="h-80">
            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <div key={incident.id} className="p-4 bg-muted/10 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(incident.status)}
                      <div className="font-semibold text-foreground">{incident.incidentType}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Response Time</div>
                      <div className="text-primary font-bold">{incident.responseTime}s</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">AI Confidence</div>
                      <div className="flex items-center space-x-2">
                        <Progress value={incident.confidence} className="flex-1 h-2" />
                        <span className="text-primary font-bold text-sm">{incident.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">AI Decision</div>
                      <div className="text-sm text-foreground bg-muted/20 p-2 rounded">
                        {incident.aiDecision}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Automated Actions</div>
                      <div className="space-y-1">
                        {incident.automatedActions.map((action, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="h-3 w-3 text-emerald-400" />
                            <span className="text-foreground">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Impact Assessment</div>
                      <div className="text-sm text-emerald-400">{incident.impactAssessment}</div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Detected: {new Date(incident.timestamp).toLocaleTimeString()}
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
