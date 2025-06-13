
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Brain, Zap, Globe, ArrowRight, Play, Activity, Cpu, Layers, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    {
      icon: Brain,
      title: "Cognitive Intent Inferencing",
      description: "Advanced neuro-linguistic threat modeling predicts attacker psychology and strategic objectives",
      metrics: "95%+ zero-day prediction accuracy"
    },
    {
      icon: Zap,
      title: "Adaptive Threat-Surface Morphing",
      description: "Autonomous network reconfiguration and polymorphic encryption key rotation in real-time",
      metrics: "2.3ms median response time"
    },
    {
      icon: RefreshCw,
      title: "Self-Synthesizing Defense Protocols",
      description: "Generates bespoke defense logic and code patches without human intervention",
      metrics: "99.999% attack surface reduction"
    },
    {
      icon: Globe,
      title: "Hyper-Scale Distributed Computing",
      description: "Global hybrid cloud and edge computing for near-zero latency threat response",
      metrics: "<0.1% false positive rate"
    }
  ];

  const threatIntelFeatures = [
    "Real-time dark web intelligence fusion",
    "Multi-modal deep learning analysis",
    "Quantum-resistant cryptography integration",
    "Autonomous incident remediation",
    "Self-evolving neural networks",
    "Causal AI threat attribution"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse-slow"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="relative">
                <Shield className="h-16 w-16 text-primary animate-pulse" />
                <div className="absolute inset-0 h-16 w-16 border-2 border-primary rounded-full animate-spin opacity-30"></div>
              </div>
              <div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AEGIS PRIME
                </h1>
                <p className="text-xl text-muted-foreground tracking-wider">
                  CYBERNETIC SELF-GOVERNANCE PLATFORM
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Autonomous Digital Sentinel with 
                <span className="text-primary"> Cognitive Threat Intelligence</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolutionary cybersecurity platform that predicts attacker intent, morphs attack surfaces in real-time, 
                and maintains absolute digital sovereignty through self-evolving AI defense protocols.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 text-lg">
                99.999% CVE Prevention Rate
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2 text-lg">
                2.3ms Response Time
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 text-lg">
                Zero-Day Immune
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Launch Command Center
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Technical Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Advanced Cybernetic Defense Capabilities
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by breakthrough AI technologies that establish true digital immunity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <Card 
              key={index} 
              className={`glass-effect border-primary/20 hover:border-primary/40 transition-all duration-500 ${
                animationPhase === index ? 'ring-2 ring-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <capability.icon className="h-8 w-8 text-primary" />
                    {animationPhase === index && (
                      <div className="absolute inset-0 h-8 w-8 border-2 border-primary rounded-full animate-ping"></div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{capability.title}</CardTitle>
                    <Badge className="bg-primary/20 text-primary border-primary/30 mt-2">
                      {capability.metrics}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Threat Intelligence Features */}
      <div className="bg-muted/5 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Multi-Modal Threat Intelligence Fusion
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Integrates hundreds of real-time intelligence feeds with advanced AI models 
                to achieve unprecedented threat anticipation and autonomous response capabilities.
              </p>
              <ul className="space-y-3">
                {threatIntelFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">Oracle Prime</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Cognitive Intent Inferencing</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">Strategist Prime</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Adaptive Defense Morphing</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">Innovator Prime</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Self-Evolving Protocols</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">Conduit Interface</span>
                    </div>
                    <p className="text-muted-foreground text-xs">Human-AI Symbiosis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Enterprise-Grade Performance
          </h3>
          <p className="text-xl text-muted-foreground">
            Designed for critical infrastructure and high-stakes digital environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-effect border-primary/20 text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary mb-2">99.999%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Prevention Rate</div>
              <p className="text-sm text-muted-foreground">Known CVE protection with quantum-resistant protocols</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20 text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary mb-2">2.3ms</div>
              <div className="text-lg font-semibold text-foreground mb-2">Response Time</div>
              <p className="text-sm text-muted-foreground">Median autonomous countermeasure deployment</p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20 text-center">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary mb-2">87.4%</div>
              <div className="text-lg font-semibold text-foreground mb-2">Zero-Day Accuracy</div>
              <p className="text-sm text-muted-foreground">Unknown threat prediction with intent analysis</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Experience the Future of Cybersecurity
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the select organizations utilizing Aegis Prime's cognitive defense capabilities 
            to achieve true digital sovereignty.
          </p>
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-semibold px-12 py-4 text-lg"
            >
              <Shield className="mr-2 h-5 w-5" />
              Access Command Center
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
