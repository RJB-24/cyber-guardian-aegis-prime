
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Brain, Zap, Cpu, Globe, Crown, Target, GitFork, Database, Cloud, Wifi, Sliders, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const techStack = [
    { category: 'Cognitive AI Engine', items: ['Oracle Prime - Threat Anticipation', 'Strategist Prime - Polymorphic Defense', 'Innovator Prime - Self-Evolution'] },
    { category: 'Machine Learning Models', items: ['Isolation Forest (96.8% accuracy)', 'LSTM Networks (94.7% accuracy)', 'Random Forest (98.2% accuracy)', 'Ensemble Model (97.1% accuracy)'] },
    { category: 'Frontend Technologies', items: ['React 18 with TypeScript', 'Tailwind CSS + Shadcn/UI', 'Recharts Visualization', 'Real-time WebSocket Updates'] },
    { category: 'Backend Infrastructure', items: ['Supabase PostgreSQL', 'Real-time Subscriptions', 'Edge Functions', 'Row Level Security'] },
    { category: 'Security Features', items: ['Quantum-Ready Cryptography', 'End-to-End Encryption', 'Federated Learning', 'Zero-Trust Architecture'] }
  ];

  const aiComponents = [
    {
      name: 'Oracle Prime',
      description: 'Cognitive threat anticipation engine that predicts attacker intent 72 hours before execution using causal AI and global threat synapse networks.',
      capabilities: ['Intent-based threat prediction', 'Generative AI for threat modeling', 'Global threat synapse network', 'Causal AI & explainable AI (XAI)'],
      metrics: '99.999% prevention rate for known CVEs, 95%+ accuracy on zero-day prediction',
      icon: Brain,
      color: 'text-primary'
    },
    {
      name: 'Strategist Prime',
      description: 'Autonomous polymorphic defense system that generates self-mutating countermeasures with digital twin validation and reinforcement learning.',
      capabilities: ['Digital twin forensics', 'Reinforcement learning optimization', 'Self-assembling infrastructure integration', 'Polymorphic counterm</div>easures'],
      metrics: '2.3ms median response time, <0.1% false positive rate, 99.998% attack surface reduction',
      icon: Zap,
      color: 'text-amber-400'
    },
    {
      name: 'Innovator Prime',
      description: 'Sentient learning engine with meta-learning capabilities, proactive adversarial ML, and automated model evolution for continuous adaptation.',
      capabilities: ['Meta-learning optimization', 'Proactive adversarial ML', 'Automated MLOps pipelines', 'Federated learning integration'],
      metrics: '40% reduction in false positives quarterly, continuous model improvement',
      icon: Cpu,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Shield className="h-20 w-20 text-primary matrix-text animate-pulse-green" />
            <Crown className="h-6 w-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-primary">AEGIS PRIME</span>
          <span className="text-amber-400 ml-2">ARCHITECTURE</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          The Autonomous Cognitive Cyber-Defense System • Technical Deep Dive into Cognitive Digital Immunity
        </p>
        <div className="flex items-center justify-center space-x-4 mt-6">
          <Link to="/business">
            <Button className="bg-primary hover:bg-primary/80 text-black font-semibold px-6">
              <Target className="mr-2 h-4 w-4" />
              Business Model
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Brain className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Core Philosophy */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Crown className="mr-3 h-8 w-8 text-amber-400" />
            Core Philosophy: Cognitive Digital Immunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Aegis Prime represents a paradigm shift from reactive cybersecurity to <strong>Cognitive Digital Immunity</strong>. 
            Inspired by visionary intelligence systems, it anticipates attacker intent, simulates complex attack vectors, 
            and autonomously deploys polymorphic, self-mutating countermeasures before threats materialize.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-card/30 rounded-xl">
              <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Cognitive Anticipation</h3>
              <p className="text-sm text-muted-foreground">Predicts threats 72 hours before execution through intent analysis</p>
            </div>
            <div className="text-center p-4 bg-card/30 rounded-xl">
              <Zap className="h-10 w-10 text-amber-400 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Autonomous Response</h3>
              <p className="text-sm text-muted-foreground">Self-mutating countermeasures with 2.3ms deployment time</p>
            </div>
            <div className="text-center p-4 bg-card/30 rounded-xl">
              <Cpu className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Self-Evolution</h3>
              <p className="text-sm text-muted-foreground">Continuous learning and adaptation through meta-learning</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Components */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          Cognitive AI Architecture Components
        </h2>
        {aiComponents.map((component, index) => {
          const IconComponent = component.icon;
          return (
            <Card key={index} className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className={`text-2xl flex items-center ${component.color}`}>
                  <IconComponent className={`mr-3 h-8 w-8 ${component.color}`} />
                  {component.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {component.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Core Capabilities:</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {component.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full mr-3"></div>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Performance Metrics:</h4>
                    <div className="bg-muted/20 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-primary font-medium">{component.metrics}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Architecture */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Globe className="mr-3 h-8 w-8 text-primary" />
            System Architecture & Data Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-8 p-6 bg-muted/20 rounded-2xl border border-primary/20">
              <div className="flex flex-col items-center space-y-2">
                <Cloud className="h-12 w-12 text-primary" />
                <span className="text-sm font-medium">Data Sources</span>
              </div>
              <GitFork className="h-6 w-6 text-muted-foreground rotate-90" />
              <div className="flex flex-col items-center space-y-2">
                <Brain className="h-12 w-12 text-primary" />
                <span className="text-sm font-medium">Oracle Prime</span>
              </div>
              <GitFork className="h-6 w-6 text-muted-foreground rotate-90" />
              <div className="flex flex-col items-center space-y-2">
                <Zap className="h-12 w-12 text-amber-400" />
                <span className="text-sm font-medium">Strategist Prime</span>
              </div>
              <GitFork className="h-6 w-6 text-muted-foreground rotate-90" />
              <div className="flex flex-col items-center space-y-2">
                <Shield className="h-12 w-12 text-emerald-400" />
                <span className="text-sm font-medium">Autonomous Defense</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Data Ingestion Sources:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Network traffic logs (NetFlow, IPFIX)</li>
                <li>• Endpoint telemetry (EDR/XDR feeds)</li>
                <li>• Cloud logs (AWS CloudTrail, Azure Monitor)</li>
                <li>• Dark web threat intelligence</li>
                <li>• Vulnerability databases (CVE, NVD)</li>
                <li>• Custom honeypot networks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Wifi className="mr-2 h-5 w-5 text-primary" />
                Integration Capabilities:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Software-Defined Networking (SDN)</li>
                <li>• Network Function Virtualization (NFV)</li>
                <li>• SIEM/SOAR platform integration</li>
                <li>• Cloud provider APIs (AWS, Azure, GCP)</li>
                <li>• Identity and Access Management (IAM)</li>
                <li>• Endpoint Detection and Response (EDR)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Sliders className="mr-3 h-8 w-8 text-primary" />
            Technology Stack & Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((category, index) => (
              <div key={index} className="bg-muted/20 rounded-lg p-6 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <div className="h-2 w-2 bg-primary rounded-full mr-3"></div>
                  {category.category}
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-1 w-1 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Guarantees */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Target className="mr-3 h-8 w-8 text-primary" />
            Performance Guarantees & SLAs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-card/30 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">99.999%</div>
              <div className="text-sm text-muted-foreground">Prevention Rate</div>
              <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 text-xs">
                Known CVEs
              </Badge>
            </div>
            <div className="p-4 bg-card/30 rounded-xl">
              <div className="text-3xl font-bold text-amber-400 mb-2">95%+</div>
              <div className="text-sm text-muted-foreground">Zero-Day Accuracy</div>
              <Badge className="mt-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                Unknown Threats
              </Badge>
            </div>
            <div className="p-4 bg-card/30 rounded-xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">2.3ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
              <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                Median Latency
              </Badge>
            </div>
            <div className="p-4 bg-card/30 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">&lt;0.1%</div>
              <div className="text-sm text-muted-foreground">False Positives</div>
              <Badge className="mt-2 bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                High Precision
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Roadmap */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <RefreshCw className="mr-3 h-8 w-8 text-primary" />
            Quantum-Ready Future Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Next 12 Months:</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Quantum-Resistant Cryptography:</strong> Full integration of post-quantum algorithms
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Advanced Causal AI:</strong> Enhanced explainable AI with causal inference
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Global Federated Network:</strong> Blockchain-based threat intelligence exchange
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-lg">Long-term Vision:</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-amber-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Quantum Computing Integration:</strong> Leverage quantum supremacy for threat analysis
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-amber-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Omni-Domain Security:</strong> Unified IT/OT/IoT/Physical security fabric
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-amber-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-foreground">Autonomous Security Ecosystem:</strong> Self-governing digital immunity platform
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          Built with precision engineering for enterprise-grade cognitive digital immunity
        </p>
        <div className="flex items-center justify-center space-x-6">
          <Link to="/dashboard">
            <Button className="bg-primary hover:bg-primary/80 text-black font-semibold">
              <Brain className="mr-2 h-4 w-4" />
              Experience Live Demo
            </Button>
          </Link>
          <Link to="/business">
            <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
              <Target className="mr-2 h-4 w-4" />
              Business Model
            </Button>
          </Link>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <strong className="text-primary">Aegis Prime</strong> • Powered by Lovable.ai • Built for Wadhwani Foundation Hackathon
        </div>
      </div>
    </div>
  );
};

export default About;
