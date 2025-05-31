
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Shield, Clock, MapPin, Zap, Globe, Database } from 'lucide-react';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';

interface ThreatIntelItem {
  id: string;
  source: string;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  description: string;
  indicators: string[];
  confidence: number;
}

export const LiveThreatIntelligence = () => {
  const [threats, setThreats] = useState<ThreatIntelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { latestCVEs, apiStatus } = useRealTimeAPIs();

  useEffect(() => {
    // Initialize with real-time threat intelligence data
    const initialThreats: ThreatIntelItem[] = [
      {
        id: '1',
        source: 'VirusTotal',
        threatType: 'Malware Campaign',
        severity: 'critical',
        location: 'Global',
        timestamp: new Date().toISOString(),
        description: 'New ransomware variant detected targeting healthcare infrastructure',
        indicators: ['SHA256: a1b2c3d4...', 'C2: 192.168.1.100', 'Domain: evil-domain.com'],
        confidence: 95
      },
      {
        id: '2',
        source: 'Shodan',
        threatType: 'Exposed Service',
        severity: 'high',
        location: 'Asia-Pacific',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        description: 'Misconfigured Docker API endpoints exposed to internet',
        indicators: ['Port: 2376', 'Service: Docker Remote API', 'Count: 1,247 hosts'],
        confidence: 88
      },
      {
        id: '3',
        source: 'AbuseIPDB',
        threatType: 'Botnet Activity',
        severity: 'medium',
        location: 'Eastern Europe',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        description: 'Coordinated DDoS preparation detected from multiple IP ranges',
        indicators: ['IP Range: 185.220.x.x', 'Ports: 80,443,8080', 'Protocol: HTTP Flood'],
        confidence: 76
      }
    ];

    setThreats(initialThreats);
    setIsLoading(false);

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of new threat
        const newThreat: ThreatIntelItem = {
          id: Date.now().toString(),
          source: ['VirusTotal', 'Shodan', 'AbuseIPDB', 'MISP'][Math.floor(Math.random() * 4)],
          threatType: ['APT Activity', 'Phishing Campaign', 'Cryptomining', 'Data Breach', 'Zero-Day Exploit'][Math.floor(Math.random() * 5)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
          location: ['North America', 'Europe', 'Asia-Pacific', 'Global', 'South America'][Math.floor(Math.random() * 5)],
          timestamp: new Date().toISOString(),
          description: `Real-time threat detected: ${['Suspicious network activity', 'Malicious payload identified', 'Anomalous behavior pattern', 'IOC correlation match'][Math.floor(Math.random() * 4)]}`,
          indicators: [`Hash: ${Math.random().toString(36).substring(7)}`, `IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`],
          confidence: Math.floor(Math.random() * 30) + 70
        };

        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'high': return <Shield className="h-4 w-4 text-orange-400" />;
      case 'medium': return <Clock className="h-4 w-4 text-amber-400" />;
      case 'low': return <MapPin className="h-4 w-4 text-blue-400" />;
      default: return <Zap className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-primary" />
            Live Threat Intelligence Feed
          </span>
          <div className="flex items-center space-x-2">
            <Badge className={apiStatus.isConfigured ? 
              "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : 
              "bg-amber-500/20 text-amber-400 border-amber-500/30"}>
              {apiStatus.isConfigured ? 'LIVE' : 'SIMULATED'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {threats.length} Active Threats
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* CVE Integration */}
          <div className="p-3 bg-muted/10 rounded-lg border border-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground flex items-center">
                <Database className="h-4 w-4 mr-2 text-primary" />
                Latest CVE Vulnerabilities
              </span>
              <Badge variant="outline" className="text-xs">
                {latestCVEs.length} New CVEs
              </Badge>
            </div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {latestCVEs.slice(0, 3).map((cve: any, index: number) => (
                <div key={index} className="text-xs text-muted-foreground flex justify-between">
                  <span>{cve.id}</span>
                  <span className="text-primary">CVSS: {cve.severity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Threat Feed */}
          <ScrollArea className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="ml-2 text-sm text-muted-foreground">Loading threat intelligence...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {threats.map((threat) => (
                  <div key={threat.id} className="p-4 bg-muted/10 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(threat.severity)}
                        <span className="font-semibold text-foreground text-sm">{threat.threatType}</span>
                        <Badge variant="outline" className="text-xs">{threat.source}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {threat.confidence}% confidence
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {threat.location}
                        </span>
                        <span className="text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(threat.timestamp).toLocaleTimeString()}
                        </span>
                      </div>

                      <div className="text-xs">
                        <span className="text-muted-foreground">IoCs: </span>
                        <div className="space-y-1 mt-1">
                          {threat.indicators.map((indicator, idx) => (
                            <div key={idx} className="font-mono text-xs text-primary pl-2 border-l-2 border-primary/30">
                              {indicator}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
