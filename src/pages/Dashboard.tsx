
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, Bell, Clock, Search, Crown, Swords } from 'lucide-react';
import { fetchThreatAnalysis, fetchCountermeasures } from '@/utils/threatDetection';
import { useRealTimeThreats } from '@/hooks/useRealTimeThreats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [countermeasures, setCountermeasures] = useState<any[]>([]);
  const { 
    isActive, 
    threatCount, 
    countermeasureCount, 
    systemHealth, 
    startMonitoring, 
    stopMonitoring,
    simulateAttackScenario 
  } = useRealTimeThreats();

  useEffect(() => {
    const loadData = async () => {
      const threatsData = await fetchThreatAnalysis();
      const countermeasuresData = await fetchCountermeasures();
      setThreats(threatsData);
      setCountermeasures(countermeasuresData);
    };

    loadData();
    
    // Refresh data every 10 seconds
    const interval = setInterval(loadData, 10000);
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
    { name: 'Low', value: threats.filter(t => t.severity === 'low').length, color: '#22C55E' },
    { name: 'Medium', value: threats.filter(t => t.severity === 'medium').length, color: '#F59E0B' },
    { name: 'High', value: threats.filter(t => t.severity === 'high').length, color: '#EF4444' },
    { name: 'Critical', value: threats.filter(t => t.severity === 'critical').length, color: '#DC2626' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30 threat-glow';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neutralized': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'investigating': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'detected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'predicted': return 'bg-primary/20 text-primary border-primary/30 safe-glow';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold royal-text flex items-center gap-3">
            <Crown className="h-10 w-10" />
            Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Real-time threat monitoring and autonomous defense coordination
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`h-4 w-4 rounded-full ${
            systemHealth > 95 ? 'bg-emerald-500 safe-glow animate-pulse-royal' : 
            systemHealth > 85 ? 'bg-amber-500 warning-glow' : 
            'bg-red-500 threat-glow'
          }`}></div>
          <span className="text-primary font-bold text-lg tracking-wide">
            {systemHealth.toFixed(1)}% OPERATIONAL
          </span>
          <Button
            onClick={isActive ? stopMonitoring : startMonitoring}
            className={isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/80'}
          >
            {isActive ? 'Stop Monitoring' : 'Start Monitoring'}
          </Button>
        </div>
      </div>

      {/* Attack Simulation Controls */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Swords className="mr-2 h-5 w-5 text-primary" />
            Attack Simulation Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('ddos')}
              className="hover:border-red-500/50 hover:text-red-400"
            >
              Simulate DDoS Attack
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('portscan')}
              className="hover:border-amber-500/50 hover:text-amber-400"
            >
              Port Scan Attack
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('malware')}
              className="hover:border-red-500/50 hover:text-red-400"
            >
              Malware Infiltration
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('apt')}
              className="hover:border-purple-500/50 hover:text-purple-400"
            >
              APT Campaign
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Threats</CardTitle>
            <Bell className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalThreats + threatCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Critical severity requiring immediate response</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Countermeasures Deployed</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{activeMeasures + countermeasureCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Autonomous responses currently active</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prediction Accuracy</CardTitle>
            <Search className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{predictionAccuracy}%</div>
            <p className="text-xs text-muted-foreground mt-1">AI model confidence in threat predictions</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
            <Zap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">&lt;6ms</div>
            <p className="text-xs text-muted-foreground mt-1">Average autonomous response latency</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
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
                <Line type="monotone" dataKey="threats" stroke="#DC2626" strokeWidth={3} />
                <Line type="monotone" dataKey="prevented" stroke="#9333EA" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
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
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Threat Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {threats.slice(0, 5).map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{threat.threat_type}</p>
                    <p className="text-xs text-muted-foreground">{threat.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Confidence: {threat.confidence}%</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(threat.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Active Countermeasures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {countermeasures.slice(0, 5).map((measure) => (
                <div key={measure.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={measure.status === 'successful' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                                      measure.status === 'deployed' ? 'bg-primary/20 text-primary border-primary/30' :
                                      measure.status === 'failed' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                      'bg-amber-500/20 text-amber-400 border-amber-500/30'}>
                        {measure.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{measure.action}</p>
                    <p className="text-xs text-muted-foreground">{measure.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Impact: {measure.impact}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(measure.created_at).toLocaleTimeString()}
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
