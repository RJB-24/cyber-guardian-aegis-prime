
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Activity, Zap, Bell, Clock, Search } from 'lucide-react';
import { generateMockThreats, generateMockCountermeasures, ThreatData, CountermeasureData } from '@/utils/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [countermeasures, setCountermeasures] = useState<CountermeasureData[]>([]);
  const [systemHealth, setSystemHealth] = useState(98);

  useEffect(() => {
    const threatData = generateMockThreats();
    const countermeasureData = generateMockCountermeasures(threatData);
    setThreats(threatData);
    setCountermeasures(countermeasureData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemHealth(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const criticalThreats = threats.filter(t => t.severity === 'critical').length;
  const activeMeasures = countermeasures.filter(c => c.status === 'deployed').length;
  const predictionAccuracy = 96.8;

  const threatTrend = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i}:00`,
    threats: Math.floor(Math.random() * 10) + 1,
    prevented: Math.floor(Math.random() * 15) + 5
  }));

  const severityData = [
    { name: 'Low', value: threats.filter(t => t.severity === 'low').length, color: '#39FF14' },
    { name: 'Medium', value: threats.filter(t => t.severity === 'medium').length, color: '#FBB036' },
    { name: 'High', value: threats.filter(t => t.severity === 'high').length, color: '#FF6B6B' },
    { name: 'Critical', value: threats.filter(t => t.severity === 'critical').length, color: '#FF0000' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neutralized': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'detected': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'predicted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Command Center</h1>
          <p className="text-muted-foreground">Real-time threat monitoring and autonomous defense coordination</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${systemHealth > 95 ? 'bg-green-500 animate-pulse-green' : systemHealth > 85 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse-red'}`}></div>
          <span className="text-primary font-mono">{systemHealth.toFixed(1)}% OPERATIONAL</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Threats</CardTitle>
            <Bell className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalThreats}</div>
            <p className="text-xs text-muted-foreground">Critical severity requiring immediate response</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Countermeasures Deployed</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeMeasures}</div>
            <p className="text-xs text-muted-foreground">Autonomous responses currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prediction Accuracy</CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{predictionAccuracy}%</div>
            <p className="text-xs text-muted-foreground">AI model confidence in threat predictions</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">&lt;12ms</div>
            <p className="text-xs text-muted-foreground">Average autonomous response latency</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Threat Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Line type="monotone" dataKey="threats" stroke="#FF0000" strokeWidth={2} />
                <Line type="monotone" dataKey="prevented" stroke="#39FF14" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Threat Severity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Threat Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {threats.slice(0, 5).map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{threat.type}</p>
                    <p className="text-xs text-muted-foreground">{threat.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Confidence: {threat.confidence}%</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Active Countermeasures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {countermeasures.slice(0, 5).map((measure) => (
                <div key={measure.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={measure.status === 'successful' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                                      measure.status === 'deployed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                      measure.status === 'failed' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}>
                        {measure.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{measure.action}</p>
                    <p className="text-xs text-muted-foreground">{measure.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Impact: {measure.impact}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(measure.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
