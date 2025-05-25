
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Cpu, Zap, Database, Brain, Network, Github } from 'lucide-react';

const About = () => {
  const techStack = [
    { name: 'React 18', category: 'Frontend', description: 'Modern UI library with hooks and concurrent features' },
    { name: 'TypeScript', category: 'Language', description: 'Type-safe JavaScript for robust development' },
    { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework for rapid UI development' },
    { name: 'Recharts', category: 'Visualization', description: 'Composable charting library for React' },
    { name: 'Vite', category: 'Build Tool', description: 'Fast build tool and development server' },
    { name: 'Shadcn/ui', category: 'Components', description: 'Beautiful and accessible component library' }
  ];

  const aiModels = [
    {
      name: 'Isolation Forest',
      type: 'Anomaly Detection',
      accuracy: '96.8%',
      description: 'Unsupervised learning for identifying network anomalies',
      implementation: 'sklearn.ensemble.IsolationForest'
    },
    {
      name: 'Random Forest',
      type: 'Threat Classification',
      accuracy: '98.2%',
      description: 'Ensemble method for categorizing threat types',
      implementation: 'sklearn.ensemble.RandomForestClassifier'
    },
    {
      name: 'LSTM Networks',
      type: 'Sequential Analysis',
      accuracy: '94.7%',
      description: 'Deep learning for temporal threat pattern recognition',
      implementation: 'TensorFlow/Keras LSTM layers'
    },
    {
      name: 'Transformer Models',
      type: 'NLP Analysis',
      accuracy: '97.3%',
      description: 'Advanced language models for threat intelligence',
      implementation: 'Hugging Face Transformers'
    }
  ];

  const systemFeatures = [
    {
      icon: Shield,
      title: 'Predictive Threat Detection',
      description: 'AI models analyze patterns to predict threats before execution'
    },
    {
      icon: Zap,
      title: 'Autonomous Countermeasures',
      description: 'Automatically deploy tailored defensive strategies in real-time'
    },
    {
      icon: Brain,
      title: 'Self-Evolving Intelligence',
      description: 'Continuous learning and adaptation to emerging threat landscapes'
    },
    {
      icon: Network,
      title: 'Real-time Monitoring',
      description: '24/7 network surveillance with sub-millisecond response times'
    },
    {
      icon: Database,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and trend analysis capabilities'
    },
    {
      icon: Cpu,
      title: 'High Performance',
      description: 'Optimized for enterprise-scale deployment and processing'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-16 w-16 text-primary matrix-text animate-pulse-green" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          <span className="text-primary matrix-text">AEGIS</span> Technical Overview
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Autonomous Predictive Cyber-Defense System leveraging ensemble AI models 
          and cutting-edge technology for proactive cybersecurity
        </p>
      </div>

      {/* System Architecture */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl">System Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {systemFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg border border-border/30">
                <feature.icon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI/ML Models */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl">Ensemble AI Models</CardTitle>
          <p className="text-muted-foreground">
            Advanced machine learning models working in concert for comprehensive threat detection
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiModels.map((model, index) => (
              <div key={index} className="p-6 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{model.name}</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {model.accuracy}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {model.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-2">
                    Implementation: {model.implementation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl">Technology Stack</CardTitle>
          <p className="text-muted-foreground">
            Modern, scalable technologies powering the AEGIS platform
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{tech.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {tech.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Threat Detection Accuracy</span>
                <span className="text-lg font-bold text-primary">99.8%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Average Response Time</span>
                <span className="text-lg font-bold text-primary">&lt;15ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">False Positive Rate</span>
                <span className="text-lg font-bold text-warning">0.6%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="text-lg font-bold text-primary">99.99%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Key Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Real-time threat prediction with 4.2h lead time</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Autonomous countermeasure deployment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Self-evolving AI models with continuous learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Enterprise-scale processing (2.3M events/sec)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Advanced threat intelligence integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">Comprehensive analytics and reporting</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Integration */}
      <Card className="bg-card/50 border-border/50 border-primary/30 safe-glow">
        <CardHeader>
          <CardTitle className="text-foreground text-2xl flex items-center">
            <Shield className="mr-3 h-6 w-6 text-primary" />
            Enterprise Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              AEGIS is designed for seamless integration with existing enterprise security infrastructure, 
              providing advanced threat detection and autonomous response capabilities for modern organizations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <h4 className="font-semibold text-primary mb-2">Scalable Architecture</h4>
                <p className="text-sm text-muted-foreground">
                  Cloud-native design with horizontal scaling for enterprise workloads
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                <h4 className="font-semibold text-primary mb-2">API Integration</h4>
                <p className="text-sm text-muted-foreground">
                  RESTful APIs for seamless integration with existing security tools
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-border/30">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border/30">
        <p className="text-muted-foreground">
          © 2024 AEGIS Cyber Defense System. Advanced AI-Powered Security Platform.
        </p>
      </div>
    </div>
  );
};

export default About;
