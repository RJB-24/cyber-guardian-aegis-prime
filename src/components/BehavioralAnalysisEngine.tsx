
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, User, Fingerprint, Eye, AlertTriangle, TrendingUp, Network, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

interface BehavioralProfile {
  userId: string;
  username: string;
  riskScore: number;
  anomalyPattern: string[];
  baselineBehavior: {
    avgLoginTime: string;
    commonLocations: string[];
    typicalDataAccess: string[];
    workingHours: string;
  };
  recentDeviations: {
    timestamp: string;
    deviation: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
  }[];
  psychologicalProfile: {
    stressIndicators: number;
    accessPatternChanges: number;
    socialEngVulnerability: number;
    privilegeEscalationRisk: number;
  };
}

export const BehavioralAnalysisEngine = () => {
  const [behavioralProfiles, setBehavioralProfiles] = useState<BehavioralProfile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<BehavioralProfile | null>(null);

  const behavioralTrends = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    normalBehavior: Math.sin(i * Math.PI / 12) * 30 + 50 + Math.random() * 10,
    anomalousActivity: Math.random() * 20 + (i > 18 || i < 6 ? 30 : 5),
    riskLevel: Math.max(0, Math.sin((i - 2) * Math.PI / 8) * 40 + 30 + Math.random() * 15)
  }));

  const userScatterData = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 20 + 5,
    risk: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)]
  }));

  useEffect(() => {
    const generateBehavioralProfiles = () => {
      const profiles: BehavioralProfile[] = [
        {
          userId: 'usr_001',
          username: 'sarah.chen@company.com',
          riskScore: 87.3,
          anomalyPattern: ['After-hours access', 'Unusual data transfers', 'Geographic anomaly'],
          baselineBehavior: {
            avgLoginTime: '08:30 AM',
            commonLocations: ['New York, NY', 'Home Office'],
            typicalDataAccess: ['CRM Database', 'Financial Reports', 'Customer Analytics'],
            workingHours: '8:00 AM - 6:00 PM EST'
          },
          recentDeviations: [
            {
              timestamp: '2025-01-13 23:45:00',
              deviation: 'Access to restricted financial data outside normal hours',
              severity: 'critical',
              confidence: 94.7
            },
            {
              timestamp: '2025-01-13 15:22:00',
              deviation: 'Login from unusual geographic location (Singapore)',
              severity: 'high',
              confidence: 89.3
            }
          ],
          psychologicalProfile: {
            stressIndicators: 76.4,
            accessPatternChanges: 82.1,
            socialEngVulnerability: 34.7,
            privilegeEscalationRisk: 91.2
          }
        },
        {
          userId: 'usr_002',
          username: 'michael.torres@company.com',
          riskScore: 34.6,
          anomalyPattern: ['Increased weekend activity', 'API usage spike'],
          baselineBehavior: {
            avgLoginTime: '09:15 AM',
            commonLocations: ['San Francisco, CA'],
            typicalDataAccess: ['Development Servers', 'Code Repositories', 'Testing Environments'],
            workingHours: '9:00 AM - 7:00 PM PST'
          },
          recentDeviations: [
            {
              timestamp: '2025-01-13 14:30:00',
              deviation: 'Unusual API call patterns to external services',
              severity: 'medium',
              confidence: 67.8
            }
          ],
          psychologicalProfile: {
            stressIndicators: 23.1,
            accessPatternChanges: 45.3,
            socialEngVulnerability: 12.7,
            privilegeEscalationRisk: 28.4
          }
        },
        {
          userId: 'usr_003',
          username: 'alexandra.kim@company.com',
          riskScore: 92.8,
          anomalyPattern: ['Privilege escalation attempts', 'Cross-department data access', 'Encrypted communications'],
          baselineBehavior: {
            avgLoginTime: '07:45 AM',
            commonLocations: ['Austin, TX'],
            typicalDataAccess: ['HR Systems', 'Employee Records', 'Payroll Data'],
            workingHours: '7:30 AM - 5:30 PM CST'
          },
          recentDeviations: [
            {
              timestamp: '2025-01-13 16:45:00',
              deviation: 'Attempted access to C-level executive communications',
              severity: 'critical',
              confidence: 97.2
            },
            {
              timestamp: '2025-01-13 11:20:00',
              deviation: 'Multiple failed authentication attempts on admin systems',
              severity: 'high',
              confidence: 88.9
            }
          ],
          psychologicalProfile: {
            stressIndicators: 89.7,
            accessPatternChanges: 94.3,
            socialEngVulnerability: 67.8,
            privilegeEscalationRisk: 96.1
          }
        }
      ];
      setBehavioralProfiles(profiles);
      setSelectedProfile(profiles[0]);
    };

    generateBehavioralProfiles();
  }, []);

  const runBehavioralAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate deep behavioral analysis
    for (let i = 0; i < 50; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setBehavioralProfiles(prev => prev.map(profile => ({
        ...profile,
        riskScore: Math.min(100, profile.riskScore + (Math.random() - 0.5) * 2)
      })));
    }
    
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string | number) => {
    if (typeof risk === 'string') {
      switch (risk) {
        case 'critical': return '#DC2626';
        case 'high': return '#EA580C';
        case 'medium': return '#D97706';
        case 'low': return '#16A34A';
        default: return '#6B7280';
      }
    } else {
      if (risk >= 80) return '#DC2626';
      if (risk >= 60) return '#EA580C';
      if (risk >= 40) return '#D97706';
      return '#16A34A';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-primary" />
              AI-Powered Behavioral Analysis Engine
            </span>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                NEURAL BEHAVIORAL MODELING
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={runBehavioralAnalysis}
                disabled={isAnalyzing}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                {isAnalyzing ? 'Analyzing...' : 'Deep Analysis'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Risk Profiles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">High-Risk Profiles</h3>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {behavioralProfiles
                    .sort((a, b) => b.riskScore - a.riskScore)
                    .map((profile) => (
                    <div 
                      key={profile.userId}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedProfile?.userId === profile.userId
                          ? 'border-primary/50 bg-primary/10'
                          : 'border-border/30 bg-muted/10 hover:border-primary/30'
                      }`}
                      onClick={() => setSelectedProfile(profile)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground text-sm">{profile.username}</span>
                        </div>
                        <Badge 
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${getRiskColor(profile.riskScore)}20`,
                            color: getRiskColor(profile.riskScore),
                            borderColor: `${getRiskColor(profile.riskScore)}30`
                          }}
                        >
                          {profile.riskScore.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {profile.anomalyPattern.slice(0, 2).map((pattern, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                            {pattern}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Detailed Profile Analysis */}
            <div className="space-y-4">
              {selectedProfile && (
                <>
                  <h3 className="text-lg font-semibold text-foreground">Profile Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/10 rounded-lg border border-border/30">
                      <h4 className="font-semibold text-primary mb-2 flex items-center">
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Baseline Behavior
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-muted-foreground">Login Time:</span> {selectedProfile.baselineBehavior.avgLoginTime}</div>
                        <div><span className="text-muted-foreground">Working Hours:</span> {selectedProfile.baselineBehavior.workingHours}</div>
                        <div><span className="text-muted-foreground">Locations:</span> {selectedProfile.baselineBehavior.commonLocations.join(', ')}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/10 rounded-lg border border-border/30">
                      <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Recent Deviations
                      </h4>
                      <div className="space-y-3">
                        {selectedProfile.recentDeviations.map((deviation, idx) => (
                          <div key={idx} className="border-l-2 border-red-500/50 pl-3">
                            <div className="flex items-center justify-between mb-1">
                              <Badge 
                                className={`text-xs ${
                                  deviation.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                  deviation.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                  'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                }`}
                              >
                                {deviation.severity.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{deviation.confidence}% confidence</span>
                            </div>
                            <div className="text-sm text-foreground">{deviation.deviation}</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {deviation.timestamp}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-muted/10 rounded-lg border border-border/30">
                      <h4 className="font-semibold text-purple-400 mb-2 flex items-center">
                        <Brain className="h-4 w-4 mr-2" />
                        Psychological Risk Profile
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedProfile.psychologicalProfile).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm capitalize text-muted-foreground">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full transition-all duration-300"
                                  style={{ 
                                    width: `${value}%`, 
                                    backgroundColor: getRiskColor(value) 
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium" style={{ color: getRiskColor(value) }}>
                                {value.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Behavioral Trends & Visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Behavioral Trends</h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={behavioralTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Area type="monotone" dataKey="normalBehavior" stackId="1" stroke="#16A34A" fill="#16A34A" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="anomalousActivity" stackId="2" stroke="#DC2626" fill="#DC2626" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="riskLevel" stackId="3" stroke="#D97706" fill="#D97706" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="h-64">
                <h4 className="text-sm font-semibold text-foreground mb-2">User Risk Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={userScatterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="x" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis dataKey="y" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Scatter dataKey="z">
                      {userScatterData.map((entry, index) => (
                        <Cell key={index} fill={getRiskColor(entry.risk)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
