
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Settings, Key, RefreshCw } from 'lucide-react';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';

export const ApiStatusIndicator = () => {
  const { apiStatus, refreshApiStatus } = useRealTimeAPIs();
  const [showDetails, setShowDetails] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusIcon = () => {
    if (apiStatus.isConfigured) {
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    }
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusColor = () => {
    return apiStatus.isConfigured 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshApiStatus();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2">Real-time API Integration Status</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Details
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Threat Intelligence APIs:</span>
            <Badge className={getStatusColor()}>
              {apiStatus.isConfigured ? 'FULLY CONFIGURED' : 'SETUP REQUIRED'}
            </Badge>
          </div>

          {!apiStatus.isConfigured && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {apiStatus.missingKeys.length} API key(s) missing. The system is currently running in demonstration mode with simulated data. 
                Configure API keys in your .env.local file to enable real-time threat intelligence feeds.
              </AlertDescription>
            </Alert>
          )}

          {apiStatus.isConfigured && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                All API keys are configured. Real-time threat intelligence is active and operational.
              </AlertDescription>
            </Alert>
          )}

          {showDetails && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Required API Keys:</div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'VirusTotal', env: 'VITE_VIRUSTOTAL_API_KEY', status: !apiStatus.missingKeys.includes('VIRUSTOTAL'), description: 'Malware and URL scanning' },
                  { name: 'Shodan', env: 'VITE_SHODAN_API_KEY', status: !apiStatus.missingKeys.includes('SHODAN'), description: 'Internet-connected device search' },
                  { name: 'AbuseIPDB', env: 'VITE_ABUSEIPDB_API_KEY', status: !apiStatus.missingKeys.includes('ABUSEIPDB'), description: 'IP reputation checking' },
                  { name: 'IPInfo', env: 'VITE_IPINFO_API_KEY', status: !apiStatus.missingKeys.includes('IPINFO'), description: 'IP geolocation services' },
                  { name: 'OpenAI', env: 'VITE_OPENAI_API_KEY', status: !apiStatus.missingKeys.includes('OPENAI'), description: 'AI-powered threat analysis' },
                  { name: 'NVD (CVE Database)', env: 'VITE_NVD_API_KEY', status: !apiStatus.missingKeys.includes('NVD'), description: 'Vulnerability database access' }
                ].map((api) => (
                  <div key={api.name} className="flex items-center justify-between p-3 bg-muted/10 rounded border border-border/30">
                    <div className="flex items-center flex-1">
                      <Key className="h-4 w-4 mr-3 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{api.name}</div>
                        <div className="text-xs text-muted-foreground">{api.description}</div>
                        <div className="text-xs text-muted-foreground font-mono">{api.env}</div>
                      </div>
                    </div>
                    <Badge variant={api.status ? 'default' : 'destructive'} className="text-xs">
                      {api.status ? 'CONFIGURED' : 'MISSING'}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-muted/5 rounded border border-border/30">
                <div className="text-sm font-medium text-foreground mb-3">Setup Instructions:</div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>1. Create a <code className="bg-muted px-1 rounded">.env.local</code> file in your project root</div>
                  <div>2. Add your API keys using the environment variable names shown above</div>
                  <div>3. Restart your development server</div>
                  <div>4. Click "Refresh Status" to verify configuration</div>
                  <div className="mt-3 p-2 bg-blue-500/10 rounded text-xs">
                    <strong>Note:</strong> All APIs have free tiers. Check the API_SETUP_GUIDE.md for detailed instructions on obtaining free API keys.
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full"
              >
                {isRefreshing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Refresh Status
              </Button>
            </div>
          )}

          {apiStatus.lastCheck && (
            <div className="text-xs text-muted-foreground flex items-center justify-between">
              <span>Last checked: {new Date(apiStatus.lastCheck).toLocaleTimeString()}</span>
              <Badge variant="outline" className="text-xs">
                {apiStatus.isConfigured ? 'Production Ready' : 'Demo Mode'}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
