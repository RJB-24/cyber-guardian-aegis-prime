
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Globe, Shield, Zap, Brain, Cpu, Target, TrendingUp, Users, DollarSign, Building, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const BusinessModel = () => {
  const marketData = [
    { segment: 'Financial Services', value: 35, revenue: '$2.1B', color: '#39FF14' },
    { segment: 'Healthcare', value: 25, revenue: '$1.5B', color: '#9333EA' },
    { segment: 'Critical Infrastructure', value: 20, revenue: '$1.2B', color: '#F59E0B' },
    { segment: 'Government & Defense', value: 20, revenue: '$1.2B', color: '#DC2626' }
  ];

  const revenueProjection = Array.from({ length: 5 }, (_, i) => ({
    year: 2024 + i,
    sentinel: (i + 1) * 15,
    guardian: (i + 1) * 45,
    sovereign: (i + 1) * 80,
    services: (i + 1) * 25
  }));

  const competitiveAdvantage = [
    { feature: 'Predictive Capability', aegis: 95, competitors: 45 },
    { feature: 'Response Time', aegis: 98, competitors: 35 },
    { feature: 'Automation Level', aegis: 92, competitors: 25 },
    { feature: 'False Positive Rate', aegis: 97, competitors: 55 },
    { feature: 'Self-Evolution', aegis: 90, competitors: 15 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-primary">AEGIS PRIME</span>
          <span className="text-amber-400 ml-2">BUSINESS MODEL</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Digital Immunity as a Service (DIaaS) • Transforming Cybersecurity from Cost Center to Revenue Protector
        </p>
      </div>

      {/* Value Proposition */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Crown className="mr-3 h-8 w-8 text-amber-400" />
            Core Value Proposition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card/30 rounded-xl">
              <TrendingUp className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Revenue Protection</h3>
              <p className="text-sm text-muted-foreground">
                Prevent $2.4M+ in annual damages per deployment through proactive threat neutralization
              </p>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-xl">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Strategic Advantage</h3>
              <p className="text-sm text-muted-foreground">
                Superior protection against nation-state threats and industrial espionage
              </p>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-xl">
              <Cpu className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Operational Excellence</h3>
              <p className="text-sm text-muted-foreground">
                99.8% uptime with autonomous operations requiring minimal human intervention
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-emerald-400">Aegis Prime | Sentinel</span>
              <Shield className="h-6 w-6 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400 mb-4">$50K+</div>
            <p className="text-sm text-muted-foreground mb-4">
              Entry-level enterprise cognitive threat anticipation with real-time alerts and basic automated recommendations.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Core Oracle Prime predictions</li>
              <li>• Basic threat intelligence fusion</li>
              <li>• Standard reporting dashboard</li>
              <li>• 1,000 endpoints included</li>
            </ul>
            <Badge className="mt-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Mid-Market Focus
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all relative">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-2">
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-primary">Aegis Prime | Guardian</span>
              <Crown className="h-6 w-6 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-4">$200K+</div>
            <p className="text-sm text-muted-foreground mb-4">
              Advanced multi-modal analysis with limited autonomous polymorphic defense and enhanced threat intelligence fusion.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Full Oracle Prime + Strategist Prime</li>
              <li>• Limited autonomous countermeasures</li>
              <li>• Advanced threat intelligence</li>
              <li>• Custom integrations</li>
            </ul>
            <Badge className="mt-4 bg-primary/20 text-primary border-primary/30">
              Enterprise Standard
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass-effect border-amber-500/20 hover:border-amber-500/40 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-amber-400">Aegis Prime | Sovereign</span>
              <Globe className="h-6 w-6 text-amber-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-400 mb-4">$1M+</div>
            <p className="text-sm text-muted-foreground mb-4">
              Full autonomous polymorphic defense with quantum computing allocation and breach prevention guarantees.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Complete cognitive defense suite</li>
              <li>• Quantum-ready cryptography</li>
              <li>• Performance guarantees</li>
              <li>• Dedicated support team</li>
            </ul>
            <Badge className="mt-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
              Fortune 100 / Gov
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Target Market Segmentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ segment, value }) => `${segment}: ${value}%`}
                >
                  {marketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              5-Year Revenue Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Bar dataKey="sentinel" stackId="a" fill="#39FF14" />
                <Bar dataKey="guardian" stackId="a" fill="#9333EA" />
                <Bar dataKey="sovereign" stackId="a" fill="#F59E0B" />
                <Bar dataKey="services" stackId="a" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Advantage */}
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Competitive Advantage Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={competitiveAdvantage} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Bar dataKey="aegis" fill="#39FF14" name="Aegis Prime" />
              <Bar dataKey="competitors" fill="#DC2626" name="Traditional Solutions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">IP Licensing</h3>
            <p className="text-sm text-muted-foreground mb-3">
              License Oracle Prime algorithms to existing security vendors
            </p>
            <div className="text-xl font-bold text-primary">$10M+</div>
            <div className="text-xs text-muted-foreground">Annual recurring</div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Consulting Services</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Bespoke threat intelligence and cognitive security consulting
            </p>
            <div className="text-xl font-bold text-amber-400">$5M+</div>
            <div className="text-xs text-muted-foreground">Professional services</div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-6 text-center">
            <Building className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Hardware Appliances</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Quantum-resistant hardware for air-gapped environments
            </p>
            <div className="text-xl font-bold text-purple-400">$50M+</div>
            <div className="text-xs text-muted-foreground">Government contracts</div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50 hover:border-primary/30 transition-all">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Threat Intelligence</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Global federated threat intelligence marketplace
            </p>
            <div className="text-xl font-bold text-emerald-400">$15M+</div>
            <div className="text-xs text-muted-foreground">Subscription model</div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Strategy */}
      <Card className="glass-effect border-primary/20 royal-gradient">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Target className="mr-3 h-8 w-8 text-primary" />
            Go-to-Market Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Phase 1: Market Entry</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Target Fortune 500 financial services</li>
                <li>• Pilot deployments with key customers</li>
                <li>• Establish proof-of-value metrics</li>
                <li>• Build strategic partnerships</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-amber-400">Phase 2: Scale & Expand</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Healthcare and critical infrastructure</li>
                <li>• MSSP partnership program</li>
                <li>• International market expansion</li>
                <li>• Advanced feature rollout</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">Phase 3: Dominate</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Government and defense contracts</li>
                <li>• Quantum computing integration</li>
                <li>• Global threat intelligence leadership</li>
                <li>• IPO or strategic acquisition</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModel;
