
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, Bell, Clock, Search, Crown, Swords, Brain, Cpu } from 'lucide-react';
import { fetchThreatAnalysis, fetchCountermeasures } from '@/utils/threatDetection';
import { useRealTimeThreats } from '@/hooks/useRealTimeThreats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [countermeasures, setCountermeasures] = useState<any[]>([]);
  const { 
    isActive, 
    threatCount, 
    countermeasureCount, 
    systemHealth, 
    aiMetrics,
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
  const predictionAccuracy = aiMetrics.ensembleConfidence;

  const threatTrend = Array.from({ length: 12 }, (_, i) => ({
    hour: `${i}:00`,
    threats: Math.floor(Math.random() * 10) + 1,
    prevented: Math.floor(Math.random() * 15) + 5,
    aiConfidence: aiMetrics.ensembleConfidence + (Math.random() - 0.5) * 5
  }));

  const aiModelPerformance = [
    { name: 'Isolation Forest', accuracy: aiMetrics.isolationForestAccuracy, color: '#39FF14' },
    { name: 'LSTM Network', accuracy: aiMetrics.lstmAccuracy, color: '#9333EA' },
    { name: 'Random Forest', accuracy: aiMetrics.randomForestAccuracy, color: '#F59E0B' },
    { name: 'Ensemble', accuracy: aiMetrics.ensembleConfidence, color: '#DC2626' }
  ];

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
            AI Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Real-time AI-powered threat analysis with ensemble machine learning models
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
            {isActive ? 'Stop AI Analysis' : 'Start AI Analysis'}
          </Button>
        </div>
      </div>

      {/* AI Model Performance Section */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            AI Model Performance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="text-2xl font-bold text-primary">{aiMetrics.isolationForestAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Isolation Forest</div>
              <div className="text-xs text-muted-foreground">Anomaly Detection</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">{aiMetrics.lstmAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">LSTM Network</div>
              <div className="text-xs text-muted-foreground">Temporal Analysis</div>
            </div>
            <div className="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <div className="text-2xl font-bold text-amber-400">{aiMetrics.randomForestAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Random Forest</div>
              <div className="text-xs text-muted-foreground">Classification</div>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{aiMetrics.ensembleConfidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Ensemble Model</div>
              <div className="text-xs text-muted-foreground">Combined Confidence</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-bold text-primary">{aiMetrics.predictedThreats}</div>
              <div className="text-sm text-muted-foreground">Threats Predicted</div>
            </div>
            <div className="text-center p-3 bg-muted/10 rounded-lg">
              <div className="text-lg font-bold text-emerald-400">{aiMetrics.preventedAttacks}</div>
              <div className="text-sm text-muted-foreground">Attacks Prevented</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attack Simulation Controls */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Swords className="mr-2 h-5 w-5 text-primary" />
            AI-Powered Attack Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('ddos')}
              className="hover:border-red-500/50 hover:text-red-400"
            >
              AI DDoS Detection
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('portscan')}
              className="hover:border-amber-500/50 hover:text-amber-400"
            >
              ML Port Scan Analysis
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('malware')}
              className="hover:border-red-500/50 hover:text-red-400"
            >
              Deep Learning Malware
            </Button>
            <Button
              variant="outline"
              onClick={() => simulateAttackScenario('apt')}
              className="hover:border-purple-500/50 hover:text-purple-400"
            >
              Ensemble APT Detection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI-Detected Threats</CardTitle>
            <Brain className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalThreats + threatCount}</div>
            <p className="text-xs text-muted-foreground mt-1">ML ensemble analysis with {predictionAccuracy.toFixed(1)}% confidence</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Countermeasures</CardTitle>
            <Cpu className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{activeMeasures + countermeasureCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Autonomous AI-generated responses deployed</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ensemble Accuracy</CardTitle>
            <Search className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{predictionAccuracy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Combined ML model prediction confidence</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Response Time</CardTitle>
            <Zap className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">&lt;3ms</div>
            <p className="text-xs text-muted-foreground mt-1">ML inference and countermeasure generation</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              AI Model Performance Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={threatTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Line type="monotone" dataKey="threats" stroke="#DC2626" strokeWidth={3} name="Threats" />
                <Line type="monotone" dataKey="prevented" stroke="#9333EA" strokeWidth={3} name="Prevented" />
                <Line type="monotone" dataKey="aiConfidence" stroke="#39FF14" strokeWidth={2} name="AI Confidence" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              ML Model Accuracy Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiModelPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Bar dataKey="accuracy" fill="#39FF14" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">AI Threat Predictions & Analysis</CardTitle>
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
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        AI-POWERED
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{threat.threat_type}</p>
                    <p className="text-xs text-muted-foreground">{threat.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>AI Confidence: {threat.confidence}%</span>
                      {threat.isolation_forest_score && (
                        <span>IF: {threat.isolation_forest_score.toFixed(2)}</span>
                      )}
                      {threat.lstm_score && (
                        <span>LSTM: {threat.lstm_score.toFixed(2)}</span>
                      )}
                    </div>
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
            <CardTitle className="text-foreground">AI-Generated Countermeasures</CardTitle>
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
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        ML-GENERATED
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

export default Dashboard;
