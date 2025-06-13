
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, Clock, CheckCircle, XCircle, Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface IncidentPlaybook {
  id: string;
  name: string;
  triggerCondition: string;
  automationLevel: number;
  steps: PlaybookStep[];
  estimatedTime: number;
  successRate: number;
}

interface PlaybookStep {
  id: string;
  name: string;
  description: string;
  type: 'automated' | 'manual' | 'hybrid';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration: number;
  dependencies: string[];
  aiConfidence: number;
}

interface ActiveIncident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  status: 'detected' | 'investigating' | 'containing' | 'recovering' | 'resolved';
  startTime: Date;
  affectedSystems: string[];
  playbook: IncidentPlaybook;
  currentStep: number;
  aiRecommendations: string[];
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  event: string;
  type: 'detection' | 'action' | 'escalation' | 'resolution';
  automated: boolean;
}

export const AdvancedIncidentResponse = () => {
  const [activeIncidents, setActiveIncidents] = useState<ActiveIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<ActiveIncident | null>(null);
  const [isExecutingPlaybook, setIsExecutingPlaybook] = useState(false);

  const samplePlaybooks: IncidentPlaybook[] = [
    {
      id: 'apt-response',
      name: 'Advanced Persistent Threat Response',
      triggerCondition: 'Multi-stage attack detected with persistence indicators',
      automationLevel: 85,
      estimatedTime: 45,
      successRate: 97.3,
      steps: [
        {
          id: 'isolation',
          name: 'Network Isolation',
          description: 'Isolate affected systems from the network',
          type: 'automated',
          status: 'pending',
          duration: 2,
          dependencies: [],
          aiConfidence: 99.2
        },
        {
          id: 'analysis',
          name: 'Malware Analysis',
          description: 'Deep analysis of malicious artifacts',
          type: 'hybrid',
          status: 'pending',
          duration: 15,
          dependencies: ['isolation'],
          aiConfidence: 94.7
        },
        {
          id: 'eradication',
          name: 'Threat Eradication',
          description: 'Remove all traces of the threat',
          type: 'automated',
          status: 'pending',
          duration: 8,
          dependencies: ['analysis'],
          aiConfidence: 91.8
        },
        {
          id: 'recovery',
          name: 'System Recovery',
          description: 'Restore systems to operational state',
          type: 'hybrid',
          status: 'pending',
          duration: 20,
          dependencies: ['eradication'],
          aiConfidence: 88.4
        }
      ]
    },
    {
      id: 'ransomware-response',
      name: 'Ransomware Incident Response',
      triggerCondition: 'Encryption activity and ransom note detected',
      automationLevel: 92,
      estimatedTime: 30,
      successRate: 98.7,
      steps: [
        {
          id: 'immediate-isolation',
          name: 'Immediate Isolation',
          description: 'Instantly isolate affected systems',
          type: 'automated',
          status: 'pending',
          duration: 1,
          dependencies: [],
          aiConfidence: 99.8
        },
        {
          id: 'backup-verification',
          name: 'Backup Verification',
          description: 'Verify integrity of backup systems',
          type: 'automated',
          status: 'pending',
          duration: 5,
          dependencies: ['immediate-isolation'],
          aiConfidence: 96.3
        },
        {
          id: 'decryption-attempt',
          name: 'Decryption Analysis',
          description: 'Attempt automated decryption',
          type: 'automated',
          status: 'pending',
          duration: 10,
          dependencies: ['backup-verification'],
          aiConfidence: 76.2
        },
        {
          id: 'system-restoration',
          name: 'System Restoration',
          description: 'Restore from clean backups',
          type: 'hybrid',
          status: 'pending',
          duration: 14,
          dependencies: ['decryption-attempt'],
          aiConfidence: 93.1
        }
      ]
    }
  ];

  useEffect(() => {
    const generateActiveIncidents = () => {
      const incidents: ActiveIncident[] = [
        {
          id: 'inc-001',
          title: 'Suspected APT Activity - Executive Compromise',
          severity: 'critical',
          category: 'Advanced Persistent Threat',
          status: 'investigating',
          startTime: new Date(Date.now() - 1800000), // 30 minutes ago
          affectedSystems: ['Executive Workstations', 'Email Servers', 'Domain Controllers'],
          playbook: samplePlaybooks[0],
          currentStep: 1,
          aiRecommendations: [
            'Immediate privilege revocation for affected accounts',
            'Enhanced monitoring of lateral movement attempts',
            'Activate quantum-resistant encryption protocols',
            'Deploy honey tokens to track attacker behavior'
          ],
          timeline: [
            {
              id: 'event-1',
              timestamp: new Date(Date.now() - 1800000),
              event: 'Anomalous authentication patterns detected',
              type: 'detection',
              automated: true
            },
            {
              id: 'event-2',
              timestamp: new Date(Date.now() - 1620000),
              event: 'Network isolation initiated for suspicious endpoints',
              type: 'action',
              automated: true
            },
            {
              id: 'event-3',
              timestamp: new Date(Date.now() - 1440000),
              event: 'Malware signatures identified - APT29 indicators',
              type: 'detection',
              automated: true
            },
            {
              id: 'event-4',
              timestamp: new Date(Date.now() - 1260000),
              event: 'Incident escalated to CISO',
              type: 'escalation',
              automated: false
            }
          ]
        },
        {
          id: 'inc-002',
          title: 'Ransomware Detection - Financial Systems',
          severity: 'critical',
          category: 'Ransomware',
          status: 'containing',
          startTime: new Date(Date.now() - 900000), // 15 minutes ago
          affectedSystems: ['Financial Database', 'Accounting Servers', 'Backup Systems'],
          playbook: samplePlaybooks[1],
          currentStep: 2,
          aiRecommendations: [
            'Verify offline backup integrity immediately',
            'Analyze encryption algorithm for potential weaknesses',
            'Check for exfiltration before encryption',
            'Implement network segmentation to prevent spread'
          ],
          timeline: [
            {
              id: 'event-5',
              timestamp: new Date(Date.now() - 900000),
              event: 'Mass file encryption detected',
              type: 'detection',
              automated: true
            },
            {
              id: 'event-6',
              timestamp: new Date(Date.now() - 840000),
              event: 'Emergency network isolation executed',
              type: 'action',
              automated: true
            },
            {
              id: 'event-7',
              timestamp: new Date(Date.now() - 720000),
              event: 'Ransom note analyzed - BlackCat variant identified',
              type: 'detection',
              automated: true
            }
          ]
        }
      ];
      
      setActiveIncidents(incidents);
      setSelectedIncident(incidents[0]);
    };

    generateActiveIncidents();
  }, []);

  const executePlaybookStep = async (stepId: string) => {
    if (!selectedIncident) return;
    
    setIsExecutingPlaybook(true);
    
    // Update step status to running
    setSelectedIncident(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        playbook: {
          ...prev.playbook,
          steps: prev.playbook.steps.map(step =>
            step.id === stepId ? { ...step, status: 'running' } : step
          )
        }
      };
    });

    // Simulate step execution
    const step = selectedIncident.playbook.steps.find(s => s.id === stepId);
    if (step) {
      await new Promise(resolve => setTimeout(resolve, step.duration * 200)); // Accelerated for demo
      
      // Update step status to completed
      setSelectedIncident(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          playbook: {
            ...prev.playbook,
            steps: prev.playbook.steps.map(s =>
              s.id === stepId ? { ...s, status: 'completed' } : s
            )
          },
          timeline: [
            ...prev.timeline,
            {
              id: `event-${Date.now()}`,
              timestamp: new Date(),
              event: `Completed: ${step.name}`,
              type: 'action',
              automated: step.type === 'automated'
            }
          ]
        };
      });
    }
    
    setIsExecutingPlaybook(false);
  };

  const executeFullPlaybook = async () => {
    if (!selectedIncident) return;
    
    for (const step of selectedIncident.playbook.steps) {
      if (step.status === 'pending') {
        await executePlaybookStep(step.id);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'containing': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'investigating': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'running': return <Play className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending': return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Shield className="mr-2 h-6 w-6 text-primary" />
              AI-Powered Incident Response & Orchestration
            </span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                {activeIncidents.length} ACTIVE INCIDENTS
              </Badge>
              <Button
                onClick={executeFullPlaybook}
                disabled={isExecutingPlaybook || !selectedIncident}
                variant="outline"
                size="sm"
              >
                <Zap className="h-4 w-4 mr-1" />
                Execute Full Playbook
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Incidents List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Active Incidents</h3>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {activeIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedIncident?.id === incident.id
                          ? 'border-primary/50 bg-primary/10'
                          : 'border-border/30 bg-muted/10 hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold text-foreground text-sm mb-2">{incident.title}</h4>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center text-muted-foreground">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {incident.category}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Started: {incident.startTime.toLocaleTimeString()}
                        </div>
                        <div className="text-muted-foreground">
                          Affected: {incident.affectedSystems.length} systems
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Playbook Progress</span>
                          <span className="text-primary">
                            {incident.playbook.steps.filter(s => s.status === 'completed').length}/
                            {incident.playbook.steps.length}
                          </span>
                        </div>
                        <Progress 
                          value={(incident.playbook.steps.filter(s => s.status === 'completed').length / incident.playbook.steps.length) * 100} 
                          className="h-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Incident Details & Playbook */}
            <div className="space-y-4">
              {selectedIncident && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Incident Playbook</h3>
                    <div className="p-3 bg-muted/10 rounded-lg border border-border/30 mb-4">
                      <h4 className="font-semibold text-primary">{selectedIncident.playbook.name}</h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        Automation: {selectedIncident.playbook.automationLevel}% | 
                        Success Rate: {selectedIncident.playbook.successRate}%
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="h-80">
                    <div className="space-y-3">
                      {selectedIncident.playbook.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`p-3 rounded-lg border ${
                            step.status === 'running' ? 'border-blue-500/50 bg-blue-500/10' :
                            step.status === 'completed' ? 'border-emerald-500/50 bg-emerald-500/10' :
                            step.status === 'failed' ? 'border-red-500/50 bg-red-500/10' :
                            'border-border/30 bg-muted/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStepStatusIcon(step.status)}
                              <span className="font-medium text-foreground text-sm">
                                {index + 1}. {step.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {step.type}
                              </Badge>
                              {step.status === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => executePlaybookStep(step.id)}
                                  disabled={isExecutingPlaybook}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                          
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              Duration: {step.duration}min
                            </span>
                            <span className="text-primary">
                              AI Confidence: {step.aiConfidence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </div>

            {/* AI Recommendations & Timeline */}
            <div className="space-y-4">
              {selectedIncident && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">AI Recommendations</h3>
                    <div className="space-y-2">
                      {selectedIncident.aiRecommendations.map((rec, index) => (
                        <div key={index} className="p-2 bg-blue-500/10 rounded border border-blue-500/30">
                          <div className="text-xs text-blue-300">{rec}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Timeline</h3>
                    <ScrollArea className="h-64">
                      <div className="space-y-2">
                        {selectedIncident.timeline
                          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                          .map((event) => (
                          <div key={event.id} className="p-2 bg-muted/10 rounded border-l-2 border-primary/50">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-foreground">{event.event}</span>
                              <Badge variant="outline" className="text-xs">
                                {event.automated ? 'AUTO' : 'MANUAL'}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
