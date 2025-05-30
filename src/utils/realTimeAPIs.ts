
import { API_CONFIG } from './apiConfig';

// Real-time Threat Intelligence Integration
export class ThreatIntelligenceAPI {
  async checkIPReputation(ip: string) {
    const results = await Promise.allSettled([
      this.checkVirusTotal(ip),
      this.checkAbuseIPDB(ip),
      this.checkShodan(ip)
    ]);

    return {
      ip,
      reputation: this.aggregateReputationScores(results),
      sources: results.map((result, index) => ({
        source: ['VirusTotal', 'AbuseIPDB', 'Shodan'][index],
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : null
      }))
    };
  }

  private async checkVirusTotal(ip: string) {
    const response = await fetch(
      `${API_CONFIG.VIRUSTOTAL.baseUrl}/ip-address/report?apikey=${API_CONFIG.VIRUSTOTAL.key}&ip=${ip}`
    );
    
    if (!response.ok) throw new Error('VirusTotal API error');
    return await response.json();
  }

  private async checkAbuseIPDB(ip: string) {
    const response = await fetch(
      `${API_CONFIG.ABUSEIPDB.baseUrl}/check?ipAddress=${ip}&maxAgeInDays=90&verbose`,
      {
        headers: {
          'Key': API_CONFIG.ABUSEIPDB.key,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) throw new Error('AbuseIPDB API error');
    return await response.json();
  }

  private async checkShodan(ip: string) {
    const response = await fetch(
      `${API_CONFIG.SHODAN.baseUrl}/shodan/host/${ip}?key=${API_CONFIG.SHODAN.key}`
    );
    
    if (!response.ok) throw new Error('Shodan API error');
    return await response.json();
  }

  private aggregateReputationScores(results: PromiseSettledResult<any>[]) {
    let totalScore = 0;
    let validSources = 0;

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        validSources++;
        // Simplified scoring logic - adjust based on actual API responses
        if (result.value.positives > 0 || result.value.abuseConfidencePercentage > 50) {
          totalScore += 1;
        }
      }
    });

    return {
      threatScore: validSources > 0 ? totalScore / validSources : 0,
      confidence: validSources / results.length
    };
  }
}

// Vulnerability Database Integration
export class VulnerabilityAPI {
  async getLatestCVEs(limit = 20) {
    try {
      const response = await fetch(
        `${API_CONFIG.NVD.baseUrl}/cves/2.0?resultsPerPage=${limit}&startIndex=0`,
        {
          headers: {
            'apiKey': API_CONFIG.NVD.key
          }
        }
      );
      
      if (!response.ok) throw new Error('NVD API error');
      return await response.json();
    } catch (error) {
      console.error('Error fetching CVEs:', error);
      return null;
    }
  }

  async searchCVE(keyword: string) {
    try {
      const response = await fetch(
        `${API_CONFIG.NVD.baseUrl}/cves/2.0?keywordSearch=${encodeURIComponent(keyword)}`,
        {
          headers: {
            'apiKey': API_CONFIG.NVD.key
          }
        }
      );
      
      if (!response.ok) throw new Error('NVD API error');
      return await response.json();
    } catch (error) {
      console.error('Error searching CVEs:', error);
      return null;
    }
  }
}

// Network Monitoring Integration
export class NetworkMonitoringAPI {
  async getIPGeolocation(ip: string) {
    try {
      const response = await fetch(
        `${API_CONFIG.IPINFO.baseUrl}/${ip}?token=${API_CONFIG.IPINFO.key}`
      );
      
      if (!response.ok) throw new Error('IPInfo API error');
      return await response.json();
    } catch (error) {
      console.error('Error getting IP geolocation:', error);
      return null;
    }
  }

  async scanPort(ip: string, port: number) {
    // This would integrate with Shodan for port scanning data
    try {
      const response = await fetch(
        `${API_CONFIG.SHODAN.baseUrl}/shodan/host/${ip}?key=${API_CONFIG.SHODAN.key}`
      );
      
      if (!response.ok) throw new Error('Shodan API error');
      const data = await response.json();
      
      return {
        ip,
        port,
        isOpen: data.ports?.includes(port) || false,
        services: data.data?.filter((service: any) => service.port === port) || []
      };
    } catch (error) {
      console.error('Error scanning port:', error);
      return null;
    }
  }
}

// AI-Powered Analysis
export class AIAnalysisAPI {
  async analyzeLogEntry(logEntry: any) {
    try {
      const response = await fetch(`${API_CONFIG.OPENAI.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.OPENAI.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity expert. Analyze this network log entry and determine if it represents a security threat. Respond with a JSON object containing: threatLevel (0-1), category (malware, ddos, intrusion, etc), description, and recommendations.'
            },
            {
              role: 'user',
              content: `Analyze this log entry: ${JSON.stringify(logEntry)}`
            }
          ],
          max_tokens: 500,
          temperature: 0.1
        })
      });

      if (!response.ok) throw new Error('OpenAI API error');
      const data = await response.json();
      
      try {
        return JSON.parse(data.choices[0].message.content);
      } catch {
        return {
          threatLevel: 0.5,
          category: 'unknown',
          description: data.choices[0].message.content,
          recommendations: ['Further analysis required']
        };
      }
    } catch (error) {
      console.error('Error in AI analysis:', error);
      return null;
    }
  }

  async generateCountermeasure(threatData: any) {
    try {
      const response = await fetch(`${API_CONFIG.OPENAI.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.OPENAI.key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity automation expert. Generate specific countermeasures for the given threat. Respond with a JSON object containing: actions (array of specific actions), priority (high/medium/low), automation (true/false), and impact (description of expected impact).'
            },
            {
              role: 'user',
              content: `Generate countermeasures for this threat: ${JSON.stringify(threatData)}`
            }
          ],
          max_tokens: 400,
          temperature: 0.2
        })
      });

      if (!response.ok) throw new Error('OpenAI API error');
      const data = await response.json();
      
      try {
        return JSON.parse(data.choices[0].message.content);
      } catch {
        return {
          actions: ['Manual investigation required'],
          priority: 'medium',
          automation: false,
          impact: 'Requires human review'
        };
      }
    } catch (error) {
      console.error('Error generating countermeasure:', error);
      return null;
    }
  }
}
