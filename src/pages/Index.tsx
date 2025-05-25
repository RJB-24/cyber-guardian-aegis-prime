
import { Link } from 'react-router-dom';
import { Shield, Zap, Activity, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Shield className="h-20 w-20 text-primary matrix-text animate-pulse-green" />
            </div>
            
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-primary matrix-text">AEGIS</span>
            </h1>
            
            <h2 className="text-3xl font-semibold mb-4 text-foreground">
              Autonomous Predictive Cyber-Defense System
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A revolutionary AI-powered cybersecurity platform that proactively predicts, 
              detects, and neutralizes digital threats in real time. Experience the future 
              of autonomous cyber defense.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-black font-bold px-8 py-4 text-lg safe-glow">
                  <Activity className="mr-2 h-5 w-5" />
                  Start Analysis
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-primary/30 hover:bg-primary/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-foreground">
            Next-Generation Cyber Defense
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powered by ensemble AI models and autonomous decision-making capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                Predictive Threat Detection
              </h4>
              <p className="text-muted-foreground">
                Advanced AI models analyze patterns to predict and identify threats 
                before they can execute, providing unprecedented proactive defense.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                Autonomous Countermeasures
              </h4>
              <p className="text-muted-foreground">
                Automatically generates and deploys tailored defensive strategies 
                based on real-time threat analysis and impact simulation.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:safe-glow">
            <CardContent className="p-8 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3 text-foreground">
                Self-Evolving Intelligence
              </h4>
              <p className="text-muted-foreground">
                Continuous learning from threat landscapes and defense outcomes 
                to improve accuracy and adapt to emerging attack vectors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary matrix-text mb-2">99.8%</div>
              <div className="text-sm text-muted-foreground">Threat Prevention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary matrix-text mb-2">&lt;15ms</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary matrix-text mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Reduction in False Positives</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary matrix-text mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Autonomous Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-primary font-bold">AEGIS</span>
              <span className="text-muted-foreground">- Powered by Lovable.ai</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 AEGIS Cyber Defense. Advanced AI Integration.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
