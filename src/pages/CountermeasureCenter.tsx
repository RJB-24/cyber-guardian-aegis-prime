
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Play, Pause, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { generateMockCountermeasures, CountermeasureData } from '@/utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CountermeasureCenter = () => {
  const [countermeasures, setCountermeasures] = useState<CountermeasureData[]>([]);
  const [selectedMeasure, setSelectedMeasure] = useState<CountermeasureData | null>(null);

  useEffect(() => {
    setCountermeasures(generateMockCountermeasures([]));
    
    // Simulate real-time countermeasure updates
    const interval = setInterval(() => {
      const newMeasure: CountermeasureData = {
        id: `measure-${Date.now()}`,
        timestamp: new Date().toISOString(),
        threatId: `threat-${Math.floor(Math.random() * 1000)}`,
        action: ['Isolate Network Segment', 'Block Malicious IPs', 'Deploy Honeypot'][Math.floor(Math.random() * 3)],
        description: `Autonomous response deployed with ${Math.floor(Math.random() * 20) + 80}% effectiveness`,
        status: ['deployed', 'successful', 'pending'][Math.floor(Math.random() * 3)] as CountermeasureData['status'],
        impact: ['High Risk Mitigation', 'Medium Risk Reduction', 'Low Impact Prevention'][Math.floor(Math.random() * 3)]
      };
      setCountermeasures(prev => [newMeasure, ...prev].slice(0, 15));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const deployMeasure = (id: string) => {
    setCountermeasures(prev => 
      prev.map(measure => 
        measure.id === id 
          ? { ...measure, status: 'deployed' as CountermeasureData['status'] }
          : measure
      )
    );
  };

  const effectivenessData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    success: Math.floor(Math.random() * 20) + 80,
    deployed: Math.floor(Math.random() * 30) + 20
  }));

  const statusData = [
    { name: 'Deployed', value: countermeasures.filter(c => c.status === 'deployed').length, color: '#39FF14' },
    { name: 'Successful', value: countermeasures.filter(c => c.status === 'successful').length, color: '#00FF7F' },
    { name: 'Pending', value: countermeasures.filter(c => c.status === 'pending').length, color: '#FBB036' },
    { name: 'Failed', value: countermeasures.filter(c => c.status === 'failed').length, color: '#FF6B6B' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'deployed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Countermeasure Center</h1>
          <p className="text-muted-foreground">Autonomous defense deployment and management system</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse-green"></div>
          <span className="text-primary font-mono">AUTO-DEPLOY ACTIVE</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Countermeasures</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{countermeasures.filter(c => c.status === 'deployed').length}</div>
            <p className="text-xs text-muted-foreground">Currently protecting network</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">98.7%</div>
            <p className="text-xs text-muted-foreground">Successful threat neutralization</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">&lt;8ms</div>
            <p className="text-xs text-muted-foreground">Average deployment latency</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Autonomous Actions</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">247</div>
            <p className="text-xs text-muted-foreground">Deployed in last 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Bar dataKey="success" fill="#39FF14" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Countermeasures List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Deployed Countermeasures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {countermeasures.map((measure) => (
                  <div 
                    key={measure.id} 
                    className={`p-4 bg-muted/20 rounded-lg border border-border/30 cursor-pointer transition-all duration-300 hover:border-primary/30 ${
                      selectedMeasure?.id === measure.id ? 'border-primary/50 safe-glow' : ''
                    }`}
                    onClick={() => setSelectedMeasure(measure)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getStatusColor(measure.status)}>
                        {measure.status.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {new Date(measure.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{measure.action}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{measure.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Impact: {measure.impact}</span>
                      {measure.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deployMeasure(measure.id);
                          }}
                          className="bg-primary hover:bg-primary/80 text-black"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Deploy
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Countermeasure Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMeasure ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{selectedMeasure.action}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedMeasure.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedMeasure.status)}>
                      {selectedMeasure.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Threat ID:</span>
                    <span className="text-sm text-foreground font-mono">{selectedMeasure.threatId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Impact:</span>
                    <span className="text-sm text-foreground">{selectedMeasure.impact}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deployment Time:</span>
                    <span className="text-sm text-foreground">{new Date(selectedMeasure.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Effectiveness Analysis</h4>
                  <p className="text-xs text-muted-foreground">
                    This countermeasure has successfully neutralized similar threats with a 
                    {Math.floor(Math.random() * 10) + 90}% success rate based on historical data.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a countermeasure to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountermeasureCenter;
