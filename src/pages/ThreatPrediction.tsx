
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Shield, Zap, Clock, Bell } from 'lucide-react';
import { generateMockThreats, ThreatData } from '@/utils/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ThreatPrediction = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);

  useEffect(() => {
    setThreats(generateMockThreats());
    
    // Simulate real-time threat detection
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat: ThreatData = {
          id: `threat-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: ['Zero-Day Exploit', 'APT Activity', 'Malware Signature'][Math.floor(Math.random() * 3)],
          severity: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)] as ThreatData['severity'],
          confidence: Math.floor(Math.random() * 20) + 80,
          source: 'AI Prediction Model',
          description: `Real-time anomaly detected with ${Math.floor(Math.random() * 20) + 80}% confidence`,
          status: 'predicted'
        };
        setThreats(prev => [newThreat, ...prev].slice(0, 20));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const runManualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Add a new predicted threat
      const newThreat: ThreatData = {
        id: `manual-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'Manual Scan Detection',
        severity: 'high',
        confidence: 94,
        source: 'Deep Scan Analysis',
        description: 'Manually triggered threat analysis detected potential vulnerability',
        status: 'detected'
      };
      setThreats(prev => [newThreat, ...prev]);
    }, 3000);
  };

  const confidenceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    confidence: Math.floor(Math.random() * 20) + 80,
    threats: Math.floor(Math.random() * 5) + 1
  }));

  const predictionAccuracy = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    accuracy: Math.floor(Math.random() * 10) + 90,
    predictions: Math.floor(Math.random() * 20) + 10
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse-red';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neutralized': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'detected': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'predicted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Threat Prediction & Analysis</h1>
          <p className="text-muted-foreground">AI-powered predictive threat intelligence and early warning system</p>
        </div>
        <Button 
          onClick={runManualScan} 
          disabled={isScanning}
          className="bg-primary hover:bg-primary/80 text-black font-bold safe-glow"
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Scanning...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Run Deep Scan
            </>
          )}
        </Button>
      </div>

      {/* Prediction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prediction Confidence</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">96.8%</div>
            <p className="text-xs text-muted-foreground">Average confidence in threat predictions</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Predicted Threats</CardTitle>
            <Bell className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{threats.filter(t => t.status === 'predicted').length}</div>
            <p className="text-xs text-muted-foreground">Threats predicted before execution</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prevention Rate</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">99.2%</div>
            <p className="text-xs text-muted-foreground">Successfully prevented predicted threats</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prediction Horizon</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">4.2h</div>
            <p className="text-xs text-muted-foreground">Average prediction lead time</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Prediction Confidence Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Area type="monotone" dataKey="confidence" stroke="#39FF14" fill="#39FF14" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Weekly Prediction Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={predictionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Bar dataKey="accuracy" fill="#39FF14" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Threat Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Predicted Threat Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {threats.map((threat) => (
                  <div 
                    key={threat.id} 
                    className={`p-4 bg-muted/20 rounded-lg border border-border/30 cursor-pointer transition-all duration-300 hover:border-primary/30 ${
                      selectedThreat?.id === threat.id ? 'border-primary/50 safe-glow' : ''
                    }`}
                    onClick={() => setSelectedThreat(threat)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(threat.status)}>
                          {threat.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(threat.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{threat.type}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Source: {threat.source}</span>
                      <span>Confidence: {threat.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Threat Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedThreat ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{selectedThreat.type}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{selectedThreat.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Severity:</span>
                    <Badge className={getSeverityColor(selectedThreat.severity)}>
                      {selectedThreat.severity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span className="text-sm text-foreground font-bold">{selectedThreat.confidence}%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Source:</span>
                    <span className="text-sm text-foreground">{selectedThreat.source}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedThreat.status)}>
                      {selectedThreat.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Detection Time:</span>
                    <span className="text-sm text-foreground">{new Date(selectedThreat.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Predicted Impact</h4>
                  <p className="text-xs text-muted-foreground">
                    Based on historical analysis and current system state, this threat could potentially 
                    affect {Math.floor(Math.random() * 15) + 5} network nodes with an estimated 
                    impact severity of {selectedThreat.severity}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a threat to view detailed analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatPrediction;
