
import { useState, useEffect } from 'react';
import { RealTimeThreatDetector } from '@/utils/realTimeThreatDetection';
import { VulnerabilityAPI } from '@/utils/realTimeAPIs';
import { validateApiKeys } from '@/utils/apiConfig';
import { useToast } from '@/hooks/use-toast';

export function useRealTimeAPIs() {
  const [apiStatus, setApiStatus] = useState({
    isConfigured: false,
    missingKeys: [],
    lastCheck: null
  });
  const [latestCVEs, setLatestCVEs] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detector = new RealTimeThreatDetector();
  const vulnAPI = new VulnerabilityAPI();

  useEffect(() => {
    // Check API configuration
    const validation = validateApiKeys();
    setApiStatus({
      isConfigured: validation.isValid,
      missingKeys: validation.missingKeys,
      lastCheck: new Date().toISOString()
    });

    // Load latest CVEs if APIs are configured or use fallback data
    loadLatestCVEs();
  }, []);

  const loadLatestCVEs = async () => {
    setIsLoading(true);
    try {
      if (apiStatus.isConfigured) {
        const cveData = await vulnAPI.getLatestCVEs(10);
        if (cveData && cveData.vulnerabilities) {
          setLatestCVEs(cveData.vulnerabilities.map((vuln: any) => ({
            id: vuln.cve.id,
            description: vuln.cve.descriptions[0]?.value || 'No description available',
            severity: vuln.cve.metrics?.cvssMetricV31?.[0]?.baseScore || 'Unknown',
            publishedDate: vuln.cve.published
          })));
        } else {
          // Fallback to simulated data if API fails
          loadFallbackCVEs();
        }
      } else {
        // Use simulated data when APIs not configured
        loadFallbackCVEs();
      }
    } catch (error) {
      console.error('Error loading CVEs:', error);
      toast({
        title: "CVE Loading Error",
        description: "Using simulated data for demonstration",
        variant: "destructive"
      });
      loadFallbackCVEs();
    } finally {
      setIsLoading(false);
    }
  };

  const loadFallbackCVEs = () => {
    const simulatedCVEs = [
      {
        id: 'CVE-2024-0001',
        description: 'Critical buffer overflow vulnerability in network protocol handler allowing remote code execution',
        severity: 9.8,
        publishedDate: new Date().toISOString()
      },
      {
        id: 'CVE-2024-0002',
        description: 'SQL injection vulnerability in web application authentication module',
        severity: 8.5,
        publishedDate: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'CVE-2024-0003',
        description: 'Cross-site scripting (XSS) vulnerability in user input validation',
        severity: 7.2,
        publishedDate: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 'CVE-2024-0004',
        description: 'Privilege escalation vulnerability in system service configuration',
        severity: 8.8,
        publishedDate: new Date(Date.now() - 259200000).toISOString()
      },
      {
        id: 'CVE-2024-0005',
        description: 'Denial of service vulnerability in network packet processing',
        severity: 6.5,
        publishedDate: new Date(Date.now() - 345600000).toISOString()
      }
    ];
    setLatestCVEs(simulatedCVEs);
  };

  const analyzeWithRealAPIs = async (logEntry: any) => {
    if (!apiStatus.isConfigured) {
      console.warn('APIs not configured, using simulation');
      return { success: false, error: 'APIs not configured' };
    }

    setIsAnalyzing(true);
    try {
      const result = await detector.analyzeRealTimeLog(logEntry);
      return result;
    } catch (error) {
      console.error('Real-time analysis error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    apiStatus,
    latestCVEs,
    isAnalyzing,
    isLoading,
    analyzeWithRealAPIs,
    refreshApiStatus: () => {
      const validation = validateApiKeys();
      setApiStatus({
        isConfigured: validation.isValid,
        missingKeys: validation.missingKeys,
        lastCheck: new Date().toISOString()
      });
      loadLatestCVEs();
    }
  };
}
