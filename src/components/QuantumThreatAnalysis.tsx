
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Atom, Cpu, Zap, Brain, Shield, AlertTriangle, Target, Layers } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface QuantumThreat {
  id: string;
  threatVector: string;
  quantumResistance: number;
  cryptographicVulnerability: number;
  probabilityMatrix: number[][];
  quantumSupremacyRisk: number;
  mitigation: string;
  timeToQuantumBreak: string;
}

export const QuantumThreatAnalysis = () => {
  const [quantumThreats, setQuantumThreats] = useState<QuantumThreat[]>([]);
  const [quantumReadiness, setQuantumReadiness] = useState(94.7);
  const [cryptoAgility, setCryptoAgility] = useState(98.2);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const quantumMetrics = [
    { subject: 'RSA Resistance', current: 15.2, quantum: 98.7, fullMark: 100 },
    { subject: 'ECC Hardening', current: 42.8, quantum: 99.1, fullMark: 100 },
    { subject: 'Lattice Crypto', current: 96.3, quantum: 99.8, fullMark: 100 },
    { subject: 'Hash Functions', current: 89.4, quantum: 97.5, fullMark: 100 },
    { subject: 'Key Exchange', current: 76.1, quantum: 99.9, fullMark: 100 },
    { subject: 'Digital Signatures', current: 68.9, quantum: 98.4, fullMark: 100 }
  ];

  const quantumTimeline = Array.from({ length: 10 }, (_, i) => ({
    year: 2025 + i,
    riskLevel: Math.max(0, 100 - (i * 8) - Math.random() * 15),
    protection: Math.min(100, 60 + (i * 4) + Math.random() * 10),
    quantumAdvantage: Math.min(100, i * 12 + Math.random() * 8)
  }));

  useEffect(() => {
    const generateQuantumThreats = () => {
      const threats: QuantumThreat[] = [
        {
          id: '1',
          threatVector: 'Shor\'s Algorithm Exploitation',
          quantumResistance: 12.3,
          cryptographicVulnerability: 94.7,
          probabilityMatrix: [[0.94, 0.06], [0.12, 0.88]],
          quantumSupremacyRisk: 89.2,
          mitigation: 'Post-Quantum CRYSTALS-Kyber Implementation',
          timeToQuantumBreak: '2029-2031'
        },
        {
          id: '2',
          threatVector: 'Grover\'s Algorithm Acceleration',
          quantumResistance: 34.8,
          cryptographicVulnerability: 76.3,
          probabilityMatrix: [[0.76, 0.24], [0.18, 0.82]],
          quantumSupremacyRisk: 67.4,
          mitigation: 'Symmetric Key Length Doubling + Lattice-Based Crypto',
          timeToQuantumBreak: '2032-2035'
        },
        {
          id: '3',
          threatVector: 'Quantum Error Correction Breakthrough',
          quantumResistance: 8.9,
          cryptographicVulnerability: 98.1,
          probabilityMatrix: [[0.98, 0.02], [0.05, 0.95]],
          quantumSupremacyRisk: 95.7,
          mitigation: 'Quantum Key Distribution + Multi-Variable Cryptography',
          timeToQuantumBreak: '2027-2029'
        }
      ];
      setQuantumThreats(threats);
    };

    generateQuantumThreats();
    const interval = setInterval(() => {
      setQuantumReadiness(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 0.3));
      setCryptoAgility(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 0.2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const runQuantumSimulation = async () => {
    setIsAnalyzing(true);
    
    // Simulate quantum threat analysis
    for (let i = 0; i < 100; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setQuantumReadiness(prev => Math.min(99.9, prev + 0.1));
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Atom className="mr-2 h-6 w-6 text-purple-400" />
              Quantum Cryptographic Threat Analysis
            </span>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse">
              QUANTUM INTELLIGENCE ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-3xl font-bold text-purple-400">{quantumReadiness.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Quantum Readiness</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-3xl font-bold text-blue-400">{cryptoAgility.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Crypto Agility</div>
                </div>
              </div>
              
              <Button 
                onClick={runQuantumSimulation}
                disabled={isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="mr-2 h-4 w-4" />
                {isAnalyzing ? 'Analyzing Quantum Vectors...' : 'Run Quantum Resistance Test'}
              </Button>
              
              <div className="space-y-3">
                {quantumThreats.map((threat) => (
                  <div key={threat.id} className="p-3 bg-muted/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-purple-300">{threat.threatVector}</h4>
                      <Badge className={
                        threat.quantumSupremacyRisk > 85 ? 
                        'bg-red-500/20 text-red-400 border-red-500/30' :
                        'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }>
                        {threat.quantumSupremacyRisk}% Risk
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Time to Break: {threat.timeToQuantumBreak}
                    </div>
                    <Progress value={threat.quantumResistance} className="h-2 mb-2" />
                    <div className="text-xs text-purple-300">
                      Mitigation: {threat.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={quantumMetrics}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    <Radar name="Current" dataKey="current" stroke="#DC2626" fill="#DC2626" fillOpacity={0.3} />
                    <Radar name="Quantum-Ready" dataKey="quantum" stroke="#9333EA" fill="#9333EA" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-muted/5 p-4 rounded-lg border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Quantum Timeline Projection</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={quantumTimeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <Line type="monotone" dataKey="riskLevel" stroke="#DC2626" strokeWidth={2} />
                    <Line type="monotone" dataKey="protection" stroke="#9333EA" strokeWidth={2} />
                    <Line type="monotone" dataKey="quantumAdvantage" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
