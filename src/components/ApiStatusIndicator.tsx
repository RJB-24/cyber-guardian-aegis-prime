
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Settings, Key } from 'lucide-react';
import { useRealTimeAPIs } from '@/hooks/useRealTimeAPIs';

export const ApiStatusIndicator = () => {
  const { apiStatus, refreshApiStatus } = useRealTimeAPIs();
  const [showDetails, setShowDetails] = useState(false);

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

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            {getStatusIcon()}
            <span className="ml-2">API Integration Status</span>
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
            <span className="text-sm text-muted-foreground">Real-time APIs:</span>
            <Badge className={getStatusColor()}>
              {apiStatus.isConfigured ? 'CONFIGURED' : 'NOT CONFIGURED'}
            </Badge>
          </div>

          {!apiStatus.isConfigured && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {apiStatus.missingKeys.length} API key(s) missing. Configure them in your environment variables to enable real-time threat intelligence.
              </AlertDescription>
            </Alert>
          )}

          {showDetails && (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">Required API Keys:</div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'VirusTotal', env: 'VITE_VIRUSTOTAL_API_KEY', status: !apiStatus.missingKeys.includes('VIRUSTOTAL') },
                  { name: 'Shodan', env: 'VITE_SHODAN_API_KEY', status: !apiStatus.missingKeys.includes('SHODAN') },
                  { name: 'AbuseIPDB', env: 'VITE_ABUSEIPDB_API_KEY', status: !apiStatus.missingKeys.includes('ABUSEIPDB') },
                  { name: 'IPInfo', env: 'VITE_IPINFO_API_KEY', status: !apiStatus.missingKeys.includes('IPINFO') },
                  { name: 'OpenAI', env: 'VITE_OPENAI_API_KEY', status: !apiStatus.missingKeys.includes('OPENAI') },
                  { name: 'NVD', env: 'VITE_NVD_API_KEY', status: !apiStatus.missingKeys.includes('NVD') }
                ].map((api) => (
                  <div key={api.name} className="flex items-center justify-between p-2 bg-muted/10 rounded">
                    <div className="flex items-center">
                      <Key className="h-3 w-3 mr-2 text-muted-foreground" />
                      <span className="text-xs">{api.name}</span>
                    </div>
                    <Badge variant={api.status ? 'default' : 'destructive'} className="text-xs">
                      {api.status ? 'OK' : 'MISSING'}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={refreshApiStatus}
                className="w-full"
              >
                Refresh Status
              </Button>
            </div>
          )}

          {apiStatus.lastCheck && (
            <div className="text-xs text-muted-foreground">
              Last checked: {new Date(apiStatus.lastCheck).toLocaleTimeString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
