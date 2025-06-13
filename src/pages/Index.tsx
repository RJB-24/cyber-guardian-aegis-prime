
import { Link } from 'react-router-dom';
import { Shield, Zap, Activity, Search, Brain, Crown, Cpu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjE5IDIwJSAyNSUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Shield className="h-24 w-24 text-primary matrix-text animate-pulse-green" />
                <Crown className="h-8 w-8 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-7xl font-bold mb-4">
              <span className="text-primary matrix-text">AEGIS</span>
              <span className="text-amber-400 ml-2">PRIME</span>
            </h1>
            
            <h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
              The Autonomous Cognitive Cyber-Defense System
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Experience the future of <strong>Cognitive Digital Immunity</strong>. Aegis Prime anticipates attacker intent, 
              deploys polymorphic countermeasures, and evolves autonomously to create unbreakable digital sovereignty 
              for Fortune 100 enterprises and critical infrastructure.
            </p>

            <div className="flex items-center justify-center space-x-2 mb-8">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
                99.999% Prevention Rate
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                72-Hour Threat Prediction
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-2">
                2.3ms Response Time
              </Badge>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mb-16">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-black font-bold px-12 py-6 text-xl safe-glow">
                  <Brain className="mr-3 h-6 w-6" />
                  Activate Cognitive Defense
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-12 py-6 text-xl border-primary/30 hover:bg-primary/10">
                  <Search className="mr-3 h-6 w-6" />
                  Technical Architecture
                </Button>
              </Link>
            </div>

            {/* Business Value Proposition */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold mb-4 text-primary">Digital Immunity as a Service (DIaaS)</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transform cybersecurity from a cost center to a revenue protector. Aegis Prime's cognitive AI 
                eliminates reactive defense cycles, ensuring uninterrupted operations and strategic advantage 
                against nation-state threats and industrial espionage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6 text-foreground">
            Cognitive Digital Immunity Platform
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powered by ensemble AI, quantum-ready cryptography, and autonomous polymorphic defense
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow group">
            <CardContent className="p-8 text-center">
              <Brain className="h-16 w-16 text-primary mx-auto mb-6 group-hover:animate-pulse" />
              <h4 className="text-2xl font-semibold mb-4 text-foreground">
                Oracle Prime
              </h4>
              <p className="text-muted-foreground mb-4">
                Cognitive threat anticipation engine that predicts attacker intent 72 hours before execution 
                using causal AI and global threat synapse networks.
              </p>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                95%+ Zero-Day Accuracy
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow group">
            <CardContent className="p-8 text-center">
              <Zap className="h-16 w-16 text-amber-400 mx-auto mb-6 group-hover:animate-pulse" />
              <h4 className="text-2xl font-semibold mb-4 text-foreground">
                Strategist Prime
              </h4>
              <p className="text-muted-foreground mb-4">
                Autonomous polymorphic defense system that generates self-mutating countermeasures 
                with digital twin validation and reinforcement learning optimization.
              </p>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                2.3ms Response Time
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow group">
            <CardContent className="p-8 text-center">
              <Cpu className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:animate-pulse" />
              <h4 className="text-2xl font-semibold mb-4 text-foreground">
                Innovator Prime
              </h4>
              <p className="text-muted-foreground mb-4">
                Sentient learning engine with meta-learning capabilities, proactive adversarial ML, 
                and automated model evolution for continuous adaptation.
              </p>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Self-Evolving AI
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Business Model Section */}
        <div className="bg-gradient-to-r from-card/30 to-muted/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-primary">Enterprise Business Model</h3>
            <p className="text-xl text-muted-foreground">Scalable SaaS tiers for Fortune 100 enterprises and critical infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/30">
              <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-3 text-emerald-400">Aegis Prime | Sentinel</h4>
              <p className="text-sm text-muted-foreground mb-4">Entry-level enterprise cognitive threat anticipation with real-time alerts and basic automated recommendations.</p>
              <div className="text-2xl font-bold text-primary mb-2">$50K+</div>
              <div className="text-sm text-muted-foreground">Per 1,000 endpoints annually</div>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl border border-primary/30 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black px-3 py-1">
                Most Popular
              </Badge>
              <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-3 text-primary">Aegis Prime | Guardian</h4>
              <p className="text-sm text-muted-foreground mb-4">Advanced multi-modal analysis with limited autonomous polymorphic defense and enhanced threat intelligence fusion.</p>
              <div className="text-2xl font-bold text-primary mb-2">$200K+</div>
              <div className="text-sm text-muted-foreground">Per enterprise annually</div>
            </div>

            <div className="text-center p-6 bg-card/50 rounded-xl border border-border/30">
              <Globe className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-3 text-amber-400">Aegis Prime | Sovereign</h4>
              <p className="text-sm text-muted-foreground mb-4">Full autonomous polymorphic defense with quantum computing allocation and breach prevention guarantees.</p>
              <div className="text-2xl font-bold text-primary mb-2">$1M+</div>
              <div className="text-sm text-muted-foreground">Custom enterprise contracts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-primary">Proven Enterprise Performance</h3>
            <p className="text-lg text-muted-foreground">Delivering measurable ROI and unmatched digital immunity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary matrix-text mb-3">99.999%</div>
              <div className="text-sm text-muted-foreground mb-1">Threat Prevention Rate</div>
              <div className="text-xs text-primary">vs 70% industry average</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary matrix-text mb-3">2.3ms</div>
              <div className="text-sm text-muted-foreground mb-1">Median Response Time</div>
              <div className="text-xs text-primary">vs 200+ min industry standard</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary matrix-text mb-3">$2.4M</div>
              <div className="text-sm text-muted-foreground mb-1">Prevented Damages</div>
              <div className="text-xs text-primary">Per deployment annually</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary matrix-text mb-3">72hr</div>
              <div className="text-sm text-muted-foreground mb-1">Advance Prediction</div>
              <div className="text-xs text-primary">Attacker intent analysis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Market */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-foreground">Target Market & Applications</h3>
          <p className="text-lg text-muted-foreground">Serving Fortune 100/Global 2000 enterprises and critical national infrastructure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Financial Services", desc: "Banks, trading firms, fintech platforms", icon: "💰" },
            { title: "Healthcare", desc: "Hospitals, pharmaceutical, medical devices", icon: "🏥" },
            { title: "Critical Infrastructure", desc: "Energy, telecom, transportation", icon: "⚡" },
            { title: "Government & Defense", desc: "National security, military, agencies", icon: "🛡️" }
          ].map((market, idx) => (
            <Card key={idx} className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{market.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{market.title}</h4>
                <p className="text-sm text-muted-foreground">{market.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-primary font-bold text-xl">AEGIS PRIME</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The future of cognitive digital immunity. Autonomous, predictive, unbreakable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Enterprise Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Fortune 100 Deployments</li>
                <li>Critical Infrastructure Protection</li>
                <li>Government & Defense</li>
                <li>Managed Security Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Cognitive AI Architecture</li>
                <li>Quantum-Ready Cryptography</li>
                <li>Polymorphic Defense Systems</li>
                <li>Self-Evolving Intelligence</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              © 2024 Aegis Prime. Enterprise Cognitive Cyber-Defense Platform.
            </div>
            <div className="text-sm text-primary font-medium">
              Powered by Lovable.ai | Built for Wadhwani Foundation Hackathon
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
