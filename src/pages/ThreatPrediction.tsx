import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Shield, Zap, Clock, Bell, Brain, Cpu, Activity } from 'lucide-react';
import { generateMockThreats, ThreatData } from '@/utils/mockData';
import { useRealTimeThreats } from '@/hooks/useRealTimeThreats';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ThreatPrediction = () => {
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);
  const { aiMetrics, isActive } = useRealTimeThreats();

  useEffect(() => {
    setThreats(generateMockThreats());
    
    // Simulate real-time AI-powered threat detection
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const aiModels = ['Isolation Forest', 'LSTM Network', 'Random Forest', 'Ensemble Model'];
        const threatTypes = ['Zero-Day Exploit', 'APT Activity', 'Malware Signature', 'Anomalous Behavior', 'ML-Detected Pattern'];
        
        const newThreat: ThreatData = {
          id: `ai-threat-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          severity: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)] as ThreatData['severity'],
          confidence: Math.floor(Math.random() * 20) + 80,
          source: `AI Model: ${aiModels[Math.floor(Math.random() * aiModels.length)]}`,
          description: `AI-detected anomaly with ensemble confidence ${(Math.random() * 20 + 80).toFixed(1)}% - Pattern recognition indicates potential threat vector`,
          status: Math.random() > 0.7 ? 'predicted' : 'detected'
        };
        setThreats(prev => [newThreat, ...prev].slice(0, 20));
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const runManualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Add AI-powered threat detection result
      const newThreat: ThreatData = {
        id: `ai-scan-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'Deep Learning Analysis',
        severity: 'high',
        confidence: Math.floor(aiMetrics.ensembleConfidence),
        source: `Ensemble AI Models (IF: ${aiMetrics.isolationForestAccuracy.toFixed(1)}%, LSTM: ${aiMetrics.lstmAccuracy.toFixed(1)}%, RF: ${aiMetrics.randomForestAccuracy.toFixed(1)}%)`,
        description: `Manual deep scan completed with ${aiMetrics.ensembleConfidence.toFixed(1)}% ensemble confidence. Multiple ML models analyzed network patterns and behavioral anomalies.`,
        status: 'detected'
      };
      setThreats(prev => [newThreat, ...prev]);
    }, 3000);
  };

  const confidenceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    confidence: aiMetrics.ensembleConfidence + (Math.random() - 0.5) * 10,
    threats: Math.floor(Math.random() * 5) + 1,
    isolationForest: aiMetrics.isolationForestAccuracy + (Math.random() - 0.5) * 5,
    lstm: aiMetrics.lstmAccuracy + (Math.random() - 0.5) * 5,
    randomForest: aiMetrics.randomForestAccuracy + (Math.random() - 0.5) * 5
  }));

  const predictionAccuracy = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    accuracy: Math.floor(Math.random() * 10) + 90,
    predictions: Math.floor(Math.random() * 20) + 10,
    aiConfidence: aiMetrics.ensembleConfidence + (Math.random() - 0.5) * 8
  }));

  const aiModelRadarData = [
    { subject: 'Accuracy', isolationForest: aiMetrics.isolationForestAccuracy, lstm: aiMetrics.lstmAccuracy, randomForest: aiMetrics.randomForestAccuracy, fullMark: 100 },
    { subject: 'Speed', isolationForest: 95, lstm: 88, randomForest: 92, fullMark: 100 },
    { subject: 'Precision', isolationForest: 94, lstm: 91, randomForest: 96, fullMark: 100 },
    { subject: 'Recall', isolationForest: 92, lstm: 94, randomForest: 89, fullMark: 100 },
    { subject: 'F1-Score', isolationForest: 93, lstm: 92, randomForest: 92, fullMark: 100 }
  ];

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
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            AI Threat Prediction & Analysis
          </h1>
          <p className="text-muted-foreground">Ensemble machine learning models for predictive threat intelligence and early warning</p>
        </div>
        <Button 
          onClick={runManualScan} 
          disabled={isScanning}
          className="bg-primary hover:bg-primary/80 text-black font-bold safe-glow"
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              AI Analyzing...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Run AI Deep Scan
            </>
          )}
        </Button>
      </div>

      {/* AI Model Status */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Cpu className="mr-2 h-5 w-5 text-primary" />
            AI Model Status & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
              <div className="text-xl font-bold text-primary">{aiMetrics.isolationForestAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Isolation Forest</div>
              <div className="text-xs text-muted-foreground">Anomaly Detection</div>
              <div className={`mt-2 h-2 w-2 rounded-full mx-auto ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-xl font-bold text-purple-400">{aiMetrics.lstmAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">LSTM Network</div>
              <div className="text-xs text-muted-foreground">Sequential Analysis</div>
              <div className={`mt-2 h-2 w-2 rounded-full mx-auto ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            </div>
            <div className="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <div className="text-xl font-bold text-amber-400">{aiMetrics.randomForestAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Random Forest</div>
              <div className="text-xs text-muted-foreground">Classification</div>
              <div className={`mt-2 h-2 w-2 rounded-full mx-auto ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="text-xl font-bold text-red-400">{aiMetrics.ensembleConfidence.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Ensemble Model</div>
              <div className="text-xs text-muted-foreground">Combined Prediction</div>
              <div className={`mt-2 h-2 w-2 rounded-full mx-auto ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ensemble Confidence</CardTitle>
            <Brain className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{aiMetrics.ensembleConfidence.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Combined ML model prediction confidence</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Predicted Threats</CardTitle>
            <Bell className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{threats.filter(t => t.status === 'predicted').length + aiMetrics.predictedThreats}</div>
            <p className="text-xs text-muted-foreground">Threats predicted by AI models before execution</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prevention Rate</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">99.4%</div>
            <p className="text-xs text-muted-foreground">AI successfully prevented predicted threats</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ML Inference Time</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2.8ms</div>
            <p className="text-xs text-muted-foreground">Average AI model prediction latency</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">AI Model Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={confidenceData.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Line type="monotone" dataKey="isolationForest" stroke="#39FF14" strokeWidth={2} name="Isolation Forest" />
                <Line type="monotone" dataKey="lstm" stroke="#9333EA" strokeWidth={2} name="LSTM" />
                <Line type="monotone" dataKey="randomForest" stroke="#F59E0B" strokeWidth={2} name="Random Forest" />
                <Line type="monotone" dataKey="confidence" stroke="#DC2626" strokeWidth={3} name="Ensemble" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">ML Model Radar Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={aiModelRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Isolation Forest" dataKey="isolationForest" stroke="#39FF14" fill="#39FF14" fillOpacity={0.1} />
                <Radar name="LSTM" dataKey="lstm" stroke="#9333EA" fill="#9333EA" fillOpacity={0.1} />
                <Radar name="Random Forest" dataKey="randomForest" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Threat Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">AI-Powered Threat Intelligence Feed</CardTitle>
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
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          AI-DETECTED
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
                      <span>AI Confidence: {threat.confidence}%</span>
                      <span className="text-primary">ML-Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">AI Analysis Details</CardTitle>
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
                    <span className="text-sm text-muted-foreground">AI Confidence:</span>
                    <span className="text-sm text-foreground font-bold">{selectedThreat.confidence}%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ML Source:</span>
                    <span className="text-sm text-foreground">{selectedThreat.source}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(selectedThreat.status)}>
                      {selectedThreat.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground mb-2">AI Model Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Isolation Forest Score:</span>
                      <span className="text-primary font-mono">{(Math.random() * 0.5 + 0.5).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">LSTM Reconstruction Error:</span>
                      <span className="text-purple-400 font-mono">{(Math.random() * 0.3).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Random Forest Probability:</span>
                      <span className="text-amber-400 font-mono">{(selectedThreat.confidence / 100).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Ensemble Score:</span>
                      <span className="text-red-400 font-mono font-bold">{(selectedThreat.confidence / 100).toFixed(3)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Predicted Impact</h4>
                  <p className="text-xs text-muted-foreground">
                    AI ensemble analysis suggests this threat could affect {Math.floor(Math.random() * 15) + 5} network nodes. 
                    Machine learning models predict {selectedThreat.severity} impact with {selectedThreat.confidence}% confidence.
                    Recommended countermeasures have been automatically generated based on historical ML training data.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a threat to view detailed AI analysis</p>
                <p className="text-xs text-muted-foreground mt-2">AI models: Isolation Forest, LSTM, Random Forest, Ensemble</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatPrediction;
