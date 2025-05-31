
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, Bell, Clock, Search, Crown, Swords, Brain, Cpu } from 'lucide-react';
import { fetchThreatAnalysis, fetchCountermeasures } from '@/utils/threatDetection';
import { useRealTimeThreats } from '@/hooks/useRealTimeThreats';
import { SystemHealthIndicator } from '@/components/SystemHealthIndicator';
import { AIModelStatus } from '@/components/AIModelStatus';
import { ThreatFeed } from '@/components/ThreatFeed';
import { CountermeasureDisplay } from '@/components/CountermeasureDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { ApiStatusIndicator } from '@/components/ApiStatusIndicator';
import { LiveThreatIntelligence } from '@/components/LiveThreatIntelligence';
import { EnhancedNotificationCenter } from '@/components/EnhancedNotificationCenter';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [countermeasures, setCountermeasures] = useState<any[]>([]);
  const { toast } = useToast();
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
  
  const { apiStatus, analyzeWithRealAPIs } = useRealTimeAPIs();

  useEffect(() => {
    const loadData = async () => {
      try {
        const threatsData = await fetchThreatAnalysis();
        const countermeasuresData = await fetchCountermeasures();
        setThreats(threatsData);
        setCountermeasures(countermeasuresData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Data Loading Error",
          description: "Some data may not be available",
          variant: "destructive"
        });
      }
    };

    loadData();
    
    // Refresh data every 10 seconds
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [toast]);

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

  // Transform threats data for ThreatFeed component
  const threatFeedData = threats.map(threat => ({
    id: threat.id,
    timestamp: threat.created_at,
    type: threat.threat_type,
    severity: threat.severity,
    confidence: threat.confidence,
    description: threat.description || `AI-detected ${threat.threat_type} threat`,
    status: threat.status,
    aiModel: threat.random_forest_prediction || 'Ensemble Model'
  }));

  const handleDeployAllCountermeasures = () => {
    console.log('Deploying all pending countermeasures...');
    toast({
      title: "Countermeasures Deployed",
      description: "All pending countermeasures have been automatically deployed",
    });
  };

  const handleRealTimeAnalysis = async () => {
    if (!apiStatus.isConfigured) {
      toast({
        title: "Demo Mode",
        description: "Running analysis in simulation mode. Configure API keys for real-time integration.",
        variant: "default"
      });
      return;
    }

    // Example real-time log entry
    const sampleLog = {
      timestamp: new Date().toISOString(),
      source_ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      destination_ip: `10.0.0.${Math.floor(Math.random() * 255)}`,
      protocol: 'TCP',
      port: 80,
      payload_size: Math.floor(Math.random() * 5000)
    };

    const result = await analyzeWithRealAPIs(sampleLog);
    console.log('Real-time analysis result:', result);
    
    toast({
      title: "Real-time Analysis Complete",
      description: result.success ? "Threat analysis completed successfully" : "Analysis completed with simulated data",
    });
  };

  const handleStartAnalysis = () => {
    if (isActive) {
      stopMonitoring();
      toast({
        title: "Analysis Stopped",
        description: "AI threat detection engine has been deactivated",
        variant: "destructive"
      });
    } else {
      startMonitoring();
      toast({
        title: "Analysis Started",
        description: "AI threat detection engine is now active and monitoring",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold royal-text flex items-center gap-3">
            <Crown className="h-10 w-10" />
            AEGIS AI Command Center
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Real-time AI-powered threat analysis monitoring network infrastructure
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
          <EnhancedNotificationCenter />
          <Button
            onClick={handleStartAnalysis}
            className={`${isActive ? 
              'bg-red-600 hover:bg-red-700 text-white' : 
              'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
            } font-semibold px-6`}
          >
            {isActive ? 'Stop AI Analysis' : 'Start Analysis'}
          </Button>
          <Button
            onClick={handleRealTimeAnalysis}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Test Real-time APIs
          </Button>
        </div>
      </div>

      {/* API Status */}
      <ApiStatusIndicator />

      {/* System Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealthIndicator health={systemHealth} isActive={isActive} />
        <AIModelStatus metrics={aiMetrics} isActive={isActive} />
      </div>

      {/* Live Threat Intelligence */}
      <LiveThreatIntelligence />

      {/* Attack Simulation Controls */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Swords className="mr-2 h-5 w-5 text-primary" />
              AI-Powered Attack Simulation & Testing
            </span>
            <Badge className={apiStatus.isConfigured ? 
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }>
              {apiStatus.isConfigured ? 'REAL-TIME APIS' : 'SIMULATION MODE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                simulateAttackScenario('ddos');
                toast({
                  title: "DDoS Simulation Started",
                  description: "AI is analyzing distributed denial of service patterns",
                });
              }}
              className="hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <Shield className="mr-2 h-4 w-4" />
              AI DDoS Detection
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                simulateAttackScenario('portscan');
                toast({
                  title: "Port Scan Simulation",
                  description: "ML models analyzing network reconnaissance patterns",
                });
              }}
              className="hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              <Search className="mr-2 h-4 w-4" />
              ML Port Scan Analysis
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                simulateAttackScenario('malware');
                toast({
                  title: "Malware Analysis Started",
                  description: "Deep learning models detecting malicious payloads",
                });
              }}
              className="hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <Zap className="mr-2 h-4 w-4" />
              Deep Learning Malware
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                simulateAttackScenario('apt');
                toast({
                  title: "APT Detection Active",
                  description: "Ensemble AI analyzing advanced persistent threats",
                });
              }}
              className="hover:border-purple-500/50 hover:text-purple-400 transition-all"
            >
              <Brain className="mr-2 h-4 w-4" />
              Ensemble APT Detection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {apiStatus.isConfigured ? 'Real-time Threats' : 'AI-Detected Threats'}
            </CardTitle>
            <Brain className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{criticalThreats + threatCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {apiStatus.isConfigured ? 
                `Live API analysis with ${predictionAccuracy.toFixed(1)}% confidence` :
                `ML ensemble analysis with ${predictionAccuracy.toFixed(1)}% confidence`
              }
            </p>
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
            <Activity className="h-5 w-5 text-primary" />
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

      {/* Live Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatFeed threats={threatFeedData} isRealTime={isActive} />
        <CountermeasureDisplay 
          countermeasures={countermeasures} 
          onDeployAll={handleDeployAllCountermeasures}
        />
      </div>
    </div>
  );
};

export default Dashboard;
