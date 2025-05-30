
import { useState, useEffect } from 'react';
import { RealTimeThreatDetector } from '@/utils/realTimeThreatDetection';
import { VulnerabilityAPI } from '@/utils/realTimeAPIs';
import { validateApiKeys } from '@/utils/apiConfig';

export function useRealTimeAPIs() {
  const [apiStatus, setApiStatus] = useState({
    isConfigured: false,
    missingKeys: [],
    lastCheck: null
  });
  const [latestCVEs, setLatestCVEs] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

    // Load latest CVEs if APIs are configured
    if (validation.isValid) {
      loadLatestCVEs();
    }
  }, []);

  const loadLatestCVEs = async () => {
    try {
      const cveData = await vulnAPI.getLatestCVEs(10);
      if (cveData && cveData.vulnerabilities) {
        setLatestCVEs(cveData.vulnerabilities.map((vuln: any) => ({
          id: vuln.cve.id,
          description: vuln.cve.descriptions[0]?.value || 'No description available',
          severity: vuln.cve.metrics?.cvssMetricV31?.[0]?.baseScore || 'Unknown',
          publishedDate: vuln.cve.published
        })));
      }
    } catch (error) {
      console.error('Error loading CVEs:', error);
    }
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
    analyzeWithRealAPIs,
    refreshApiStatus: () => {
      const validation = validateApiKeys();
      setApiStatus({
        isConfigured: validation.isValid,
        missingKeys: validation.missingKeys,
        lastCheck: new Date().toISOString()
      });
    }
  };
}
