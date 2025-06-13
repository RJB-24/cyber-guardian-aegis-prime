
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, RefreshCw, Cpu, Shield, Activity, Layers, Globe, Lock, Sparkles } from 'lucide-react';

const About = () => {
  const architectureComponents = [
    {
      icon: Brain,
      name: "Oracle Prime",
      subtitle: "Cognitive Intent Inferencing Engine",
      description: "Advanced neuro-linguistic threat modeling utilizing transformer networks and graph neural networks to predict attacker psychology, strategic objectives, and zero-day exploits with 95%+ accuracy.",
      technologies: ["Transformer Networks", "Graph Neural Networks", "Causal AI", "Explainable AI (XAI)", "Multi-Modal Analysis"],
      performance: "72-hour threat anticipation window"
    },
    {
      icon: Zap,
      name: "Strategist Prime",
      subtitle: "Adaptive Threat-Surface Morphing System",
      description: "Autonomous defense orchestration that dynamically reconfigures network topology, deploys polymorphic encryption, and generates self-mutating countermeasures in real-time to eliminate attack surfaces.",
      technologies: ["Reinforcement Learning", "Digital Twin Simulation", "SDN/NFV Integration", "Polymorphic Defense", "Micro-Segmentation"],
      performance: "2.3ms median response time"
    },
    {
      icon: RefreshCw,
      name: "Innovator Prime",
      subtitle: "Self-Synthesizing Defense Evolution",
      description: "Meta-learning system that autonomously generates new defense protocols, adapts to emerging threats, and continuously evolves its capabilities through federated learning and adversarial validation.",
      technologies: ["Meta-Learning", "Federated Learning", "Adversarial ML", "Automated MLOps", "Self-Healing Code"],
      performance: "40% quarterly false positive reduction"
    },
    {
      icon: Cpu,
      name: "Conduit Interface",
      subtitle: "Human-AI Symbiosis Platform",
      description: "Intuitive command center providing real-time visibility into cognitive threat analysis, autonomous countermeasure deployment, and explainable AI insights for strategic security oversight.",
      technologies: ["Real-Time Visualization", "Explainable AI", "Interactive Analytics", "Quantum Dashboard", "Cognitive UX"],
      performance: "Real-time threat visualization"
    }
  ];

  const technicalCapabilities = [
    {
      category: "Threat Intelligence Fusion",
      features: [
        "Real-time dark web intelligence monitoring",
        "OSINT social media threat actor analysis",
        "Custom honeypot network integration",
        "Vulnerability research database correlation",
        "Nation-state campaign attribution"
      ]
    },
    {
      category: "Advanced AI/ML Models",
      features: [
        "Generative Adversarial Networks for threat simulation",
        "LSTM networks for temporal anomaly detection",
        "Isolation Forest for unsupervised threat detection",
        "Transformer models for unstructured data analysis",
        "Causal inference for root cause analysis"
      ]
    },
    {
      category: "Autonomous Defense Systems",
      features: [
        "Dynamic network re-segmentation",
        "Polymorphic encryption key rotation",
        "Identity-aware micro-segmentation",
        "Automated vulnerability patching",
        "Self-assembling infrastructure defense"
      ]
    },
    {
      category: "Quantum-Ready Security",
      features: [
        "Post-quantum cryptographic algorithms",
        "Quantum-resistant communication protocols",
        "Future-proof security architecture",
        "Quantum computing threat modeling",
        "Cryptographic agility framework"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Aegis Prime Technical Architecture
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Revolutionary cybernetic self-governance platform leveraging breakthrough AI technologies 
          to establish autonomous digital immunity and cognitive threat intelligence.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
            <Lock className="mr-2 h-4 w-4" />
            Quantum-Resistant
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
            <Sparkles className="mr-2 h-4 w-4" />
            Self-Evolving AI
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
            <Activity className="mr-2 h-4 w-4" />
            Real-Time Morphing
          </Badge>
        </div>
      </div>

      {/* Core Architecture Components */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Core Architecture Components
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {architectureComponents.map((component, index) => (
            <Card key={index} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-lg">
                    <component.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground">{component.name}</CardTitle>
                    <p className="text-primary font-medium">{component.subtitle}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mt-2">
                      {component.performance}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {component.description}
                </p>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Core Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {component.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} className="bg-muted/20 text-muted-foreground border-muted/30 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Capabilities */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Advanced Technical Capabilities
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {technicalCapabilities.map((capability, index) => (
            <Card key={index} className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  {capability.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground text-center text-2xl">
            Enterprise Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">99.999%</div>
              <div className="text-sm font-medium text-foreground">CVE Prevention Rate</div>
              <p className="text-xs text-muted-foreground">Known vulnerability protection</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">87.4%</div>
              <div className="text-sm font-medium text-foreground">Zero-Day Accuracy</div>
              <p className="text-xs text-muted-foreground">Unknown threat prediction</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">2.3ms</div>
              <div className="text-sm font-medium text-foreground">Response Time</div>
              <p className="text-xs text-muted-foreground">Median countermeasure deployment</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">&lt;0.1%</div>
              <div className="text-sm font-medium text-foreground">False Positive Rate</div>
              <p className="text-xs text-muted-foreground">Continuous validation accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Architecture Diagram */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground text-center text-2xl flex items-center justify-center">
            <Globe className="mr-2 h-6 w-6 text-primary" />
            System Topology & Data Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center text-muted-foreground mb-6">
              Global threat intelligence flows through Oracle Prime for cognitive analysis, 
              triggering Strategist Prime's adaptive defense morphing, while Innovator Prime 
              continuously evolves the system's capabilities.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <Activity className="h-8 w-8 text-blue-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-foreground">Data Ingestion</h4>
                <p className="text-sm text-muted-foreground">
                  Multi-source threat intelligence, network telemetry, and behavioral analytics
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-primary/20 p-4 rounded-lg">
                  <Brain className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h4 className="font-semibold text-foreground">Cognitive Processing</h4>
                <p className="text-sm text-muted-foreground">
                  AI-powered intent inference, causal analysis, and predictive modeling
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-emerald-500/20 p-4 rounded-lg">
                  <Shield className="h-8 w-8 text-emerald-400 mx-auto" />
                </div>
                <h4 className="font-semibold text-foreground">Autonomous Defense</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time countermeasure deployment and adaptive security morphing
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
