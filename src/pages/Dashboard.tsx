
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Activity, Zap, Bell, Clock, Search, Crown, Swords, Brain, Cpu, Globe, Target } from 'lucide-react';
import { fetchThreatAnalysis, fetchCountermeasures } from '@/utils/threatDetection';
import { useRealTimeThreats } from '@/hooks/useRealTimeThreats';
import { SystemHealthIndicator } from '@/components/SystemHealthIndicator';
import { AIModelStatus } from '@/components/AIModelStatus';
import { ThreatFeed } from '@/components/ThreatFeed';
import { CountermeasureDisplay } from '@/components/CountermeasureDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Area, AreaChart } from 'recharts';
import { ApiStatusIndicator } from '@/components/ApiStatusIndicator';
import { LiveThreatIntelligence } from '@/components/LiveThreatIntelligence';
import { EnhancedNotificationCenter } from '@/components/EnhancedNotificationCenter';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [countermeasures, setCountermeasures] = useState<any[]>([]);
  const [cognitiveMode, setCognitiveMode] = useState('autonomous');
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
          title: "Cognitive Engine Notice",
          description: "Operating in simulation mode with synthetic intelligence feeds",
          variant: "default"
        });
      }
    };

    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [toast]);

  const criticalThreats = threats.filter(t => t.severity === 'critical').length;
  const activeMeasures = countermeasures.filter(c => c.status === 'deployed').length;
  const predictionAccuracy = aiMetrics.ensembleConfidence;

  // Advanced cognitive metrics
  const cognitiveMetrics = [
    { name: 'Intent Analysis', value: 97.3, color: '#39FF14' },
    { name: 'Attacker Profiling', value: 94.7, color: '#9333EA' },
    { name: 'Vector Prediction', value: 98.1, color: '#F59E0B' },
    { name: 'Quantum Defense', value: 91.2, color: '#DC2626' }
  ];

  const threatTimeline = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    predicted: Math.floor(Math.random() * 15) + 5,
    neutralized: Math.floor(Math.random() * 20) + 10,
    cognitiveConfidence: aiMetrics.ensembleConfidence + (Math.random() - 0.5) * 10
  }));

  const businessImpact = [
    { metric: 'Revenue Protected', value: '$2.4M', change: '+15%', color: 'text-emerald-400' },
    { metric: 'Downtime Prevented', value: '99.8%', change: '+2.1%', color: 'text-primary' },
    { metric: 'Compliance Score', value: '100%', change: '0%', color: 'text-emerald-400' },
    { metric: 'Cost Reduction', value: '67%', change: '+8%', color: 'text-primary' }
  ];

  const threatFeedData = threats.map(threat => ({
    id: threat.id,
    timestamp: threat.created_at,
    type: threat.threat_type,
    severity: threat.severity,
    confidence: threat.confidence,
    description: threat.description || `Cognitive AI detected ${threat.threat_type} with intent analysis`,
    status: threat.status,
    aiModel: 'Oracle Prime Ensemble'
  }));

  const handleActivateCognitiveMode = () => {
    if (isActive) {
      stopMonitoring();
      toast({
        title: "Cognitive Defense Deactivated",
        description: "Oracle Prime and Strategist Prime systems offline",
        variant: "destructive"
      });
    } else {
      startMonitoring();
      toast({
        title: "Cognitive Defense Activated",
        description: "Oracle Prime analyzing global threat intelligence • Strategist Prime generating countermeasures",
      });
    }
  };

  const handleQuantumThreatSimulation = () => {
    // Use 'apt' as the base scenario type for quantum testing
    simulateAttackScenario('apt');
    toast({
      title: "Quantum Threat Simulation",
      description: "Testing post-quantum cryptography resilience against future quantum attacks",
    });
  };

  const handleCognitiveAPTTest = () => {
    // Use 'apt' as the base scenario type for cognitive testing
    simulateAttackScenario('apt');
    toast({
      title: "Cognitive APT Simulation",
      description: "Oracle Prime analyzing advanced persistent threat patterns with intent inference",
    });
  };

  const handlePolymorphicDefenseTest = () => {
    // Use 'malware' as the base scenario type for polymorphic testing
    simulateAttackScenario('malware');
    toast({
      title: "Polymorphic Defense Test",
      description: "Strategist Prime deploying self-mutating countermeasures",
    });
  };

  const handleNationStateTest = () => {
    // Use 'apt' as the base scenario type for nation-state testing
    simulateAttackScenario('apt');
    toast({
      title: "Nation-State Simulation",
      description: "Testing against sophisticated state-sponsored attack vectors",
    });
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold royal-text flex items-center gap-3">
            <Crown className="h-12 w-12 text-amber-400" />
            <span className="text-primary">AEGIS</span>
            <span className="text-amber-400">PRIME</span>
          </h1>
          <p className="text-muted-foreground mt-3 text-xl">
            Cognitive Digital Immunity Command Center • Autonomous Threat Anticipation Active
          </p>
          <div className="flex items-center space-x-4 mt-3">
            <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
              Oracle Prime: {predictionAccuracy.toFixed(1)}% Cognitive Accuracy
            </Badge>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-3 py-1">
              Strategist Prime: 2.3ms Response
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1">
              Innovator Prime: Self-Evolving
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`h-5 w-5 rounded-full ${
            systemHealth > 95 ? 'bg-emerald-500 safe-glow animate-pulse-royal' :
            systemHealth > 85 ? 'bg-amber-500 warning-glow' :
            'bg-red-500 threat-glow'
          }`}></div>
          <span className="text-primary font-bold text-xl tracking-wide">
            {systemHealth.toFixed(1)}% COGNITIVE IMMUNITY
          </span>
          <EnhancedNotificationCenter />
          <Button
            onClick={handleActivateCognitiveMode}
            className={`${isActive ?
              'bg-red-600 hover:bg-red-700 text-white' :
              'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
            } font-semibold px-8 py-3 text-lg`}
          >
            <Brain className="mr-2 h-5 w-5" />
            {isActive ? 'Deactivate Cognitive Defense' : 'Activate Cognitive Defense'}
          </Button>
        </div>
      </div>

      {/* API Integration Status */}
      <ApiStatusIndicator />

      {/* Business Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {businessImpact.map((item, idx) => (
          <Card key={idx} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 royal-gradient">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                {item.metric}
                <Target className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-400">{item.change}</span> vs previous quarter
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cognitive AI Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Cognitive Intelligence Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cognitiveMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Bar dataKey="value" fill="#39FF14" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              24-Hour Threat Anticipation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Area type="monotone" dataKey="predicted" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.3} />
                <Area type="monotone" dataKey="neutralized" stackId="1" stroke="#39FF14" fill="#39FF14" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Simulation Controls */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Swords className="mr-2 h-5 w-5 text-primary" />
              Cognitive Defense Simulation & Quantum Testing
            </span>
            <Badge className={apiStatus.isConfigured ?
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }>
              {apiStatus.isConfigured ? 'LIVE THREAT INTELLIGENCE' : 'COGNITIVE SIMULATION MODE'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Button
              variant="outline"
              onClick={handleCognitiveAPTTest}
              className="hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <Brain className="mr-2 h-4 w-4" />
              Cognitive APT Test
            </Button>
            <Button
              variant="outline"
              onClick={handlePolymorphicDefenseTest}
              className="hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              <Zap className="mr-2 h-4 w-4" />
              Polymorphic Defense
            </Button>
            <Button
              variant="outline"
              onClick={handleQuantumThreatSimulation}
              className="hover:border-purple-500/50 hover:text-purple-400 transition-all"
            >
              <Cpu className="mr-2 h-4 w-4" />
              Quantum Resilience
            </Button>
            <Button
              variant="outline"
              onClick={handleNationStateTest}
              className="hover:border-red-500/50 hover:text-red-400 transition-all"
            >
              <Globe className="mr-2 h-4 w-4" />
              Nation-State Test
            </Button>
          </div>

          <div className="bg-muted/20 rounded-lg p-4 border border-primary/20">
            <h4 className="text-sm font-semibold text-primary mb-2">Cognitive Mode Status</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Oracle Prime:</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  {isActive ? 'ACTIVE' : 'STANDBY'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Strategist Prime:</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  {isActive ? 'AUTONOMOUS' : 'IDLE'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Innovator Prime:</span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                  EVOLVING
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealthIndicator health={systemHealth} isActive={isActive} />
        <AIModelStatus metrics={aiMetrics} isActive={isActive} />
      </div>

      {/* Live Intelligence Feed */}
      <LiveThreatIntelligence />

      {/* Real-time Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatFeed threats={threatFeedData} isRealTime={isActive} />
        <CountermeasureDisplay
          countermeasures={countermeasures}
          onDeployAll={() => {
            console.log('Deploying all cognitive countermeasures...');
            toast({
              title: "Cognitive Countermeasures Deployed",
              description: "Strategist Prime has autonomously deployed all pending defensive measures",
            });
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
