
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, AlertTriangle, Globe, Bug } from 'lucide-react';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';

export const LiveThreatIntelligence = () => {
  const { latestCVEs, apiStatus } = useRealTimeAPIs();
  const [realTimeThreats, setRealTimeThreats] = useState([]);

  useEffect(() => {
    // Simulate real-time threat updates
    const interval = setInterval(() => {
      if (apiStatus.isConfigured) {
        // In a real implementation, this would come from your threat intel feeds
        const newThreat = {
          id: Date.now(),
          type: ['Botnet Activity', 'Phishing Campaign', 'Malware Signature', 'Zero-day Exploit'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          source: ['VirusTotal', 'Shodan', 'AbuseIPDB', 'Threat Feed'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          description: 'Real-time threat intelligence from integrated APIs'
        };

        setRealTimeThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [apiStatus.isConfigured]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30 animate-pulse';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Bug className="mr-2 h-5 w-5 text-primary" />
            Latest CVE Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {latestCVEs.length > 0 ? (
                latestCVEs.map((cve: any) => (
                  <div key={cve.id} className="p-3 bg-muted/10 rounded-lg border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-foreground">{cve.id}</div>
                      <Badge className={getSeverityColor(typeof cve.severity === 'number' ? 
                        cve.severity >= 9 ? 'critical' : 
                        cve.severity >= 7 ? 'high' : 
                        cve.severity >= 4 ? 'medium' : 'low' : 'medium')}>
                        CVSS: {cve.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {cve.description.length > 100 ? 
                        `${cve.description.substring(0, 100)}...` : 
                        cve.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Published: {new Date(cve.publishedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  {apiStatus.isConfigured ? 
                    'Loading latest vulnerabilities...' : 
                    'Configure NVD API key to view CVE data'}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="glass-effect border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center justify-between">
            <span className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Live Threat Intelligence
            </span>
            {apiStatus.isConfigured && (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400">LIVE</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {realTimeThreats.length > 0 ? (
                realTimeThreats.map((threat: any) => (
                  <div key={threat.id} className="p-3 bg-muted/10 rounded-lg border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-primary" />
                        <div className="text-sm font-semibold text-foreground">{threat.type}</div>
                      </div>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Source: {threat.source}</span>
                      <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  {apiStatus.isConfigured ? 
                    'Monitoring for real-time threats...' : 
                    'Configure API keys to enable live threat intelligence'}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
