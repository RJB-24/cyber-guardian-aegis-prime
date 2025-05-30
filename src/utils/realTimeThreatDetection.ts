
import { ThreatIntelligenceAPI, VulnerabilityAPI, NetworkMonitoringAPI, AIAnalysisAPI } from './realTimeAPIs';
import { insertNetworkLog, insertThreatAnalysis, insertCountermeasure } from './threatDetection';

export class RealTimeThreatDetector {
  private threatIntel = new ThreatIntelligenceAPI();
  private vulnAPI = new VulnerabilityAPI();
  private networkAPI = new NetworkMonitoringAPI();
  private aiAPI = new AIAnalysisAPI();
  
  async analyzeRealTimeLog(logEntry: any) {
    try {
      console.log('Real-time analysis starting for:', logEntry);
      
      // Step 1: Store the log entry
      const logId = await insertNetworkLog(logEntry);
      if (!logId) throw new Error('Failed to store log entry');

      // Step 2: Extract IP addresses for reputation checking
      const sourceIP = logEntry.source_ip;
      const destIP = logEntry.destination_ip;
      
      // Step 3: Parallel API calls for comprehensive analysis
      const [
        sourceReputation,
        destReputation,
        sourceGeo,
        destGeo,
        aiAnalysis,
        portScan
      ] = await Promise.allSettled([
        this.threatIntel.checkIPReputation(sourceIP),
        this.threatIntel.checkIPReputation(destIP),
        this.networkAPI.getIPGeolocation(sourceIP),
        this.networkAPI.getIPGeolocation(destIP),
        this.aiAPI.analyzeLogEntry(logEntry),
        logEntry.port ? this.networkAPI.scanPort(sourceIP, logEntry.port) : Promise.resolve(null)
      ]);

      // Step 4: Aggregate analysis results
      const threatAnalysis = this.aggregateAnalysis({
        logEntry,
        sourceReputation: sourceReputation.status === 'fulfilled' ? sourceReputation.value : null,
        destReputation: destReputation.status === 'fulfilled' ? destReputation.value : null,
        sourceGeo: sourceGeo.status === 'fulfilled' ? sourceGeo.value : null,
        destGeo: destGeo.status === 'fulfilled' ? destGeo.value : null,
        aiAnalysis: aiAnalysis.status === 'fulfilled' ? aiAnalysis.value : null,
        portScan: portScan.status === 'fulfilled' ? portScan.value : null
      });

      // Step 5: Store threat analysis if significant
      if (threatAnalysis.confidence > 0.3) {
        const threatId = await insertThreatAnalysis({
          log_id: logId,
          threat_type: threatAnalysis.threat_type,
          severity: threatAnalysis.severity,
          confidence: Math.round(threatAnalysis.confidence * 100),
          anomaly_score: threatAnalysis.anomaly_score,
          status: threatAnalysis.confidence > 0.7 ? 'predicted' : 'detected',
          description: threatAnalysis.description
        });

        // Step 6: Generate and deploy countermeasures for high-confidence threats
        if (threatId && threatAnalysis.confidence > 0.6) {
          const countermeasures = await this.aiAPI.generateCountermeasure(threatAnalysis);
          
          if (countermeasures) {
            await this.deployCountermeasures(threatId, countermeasures);
          }
        }

        return {
          success: true,
          threatDetected: true,
          threatLevel: threatAnalysis.severity,
          confidence: threatAnalysis.confidence,
          details: threatAnalysis
        };
      }

      return {
        success: true,
        threatDetected: false,
        message: 'No significant threats detected'
      };

    } catch (error) {
      console.error('Real-time analysis error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  private aggregateAnalysis(data: any) {
    const {
      logEntry,
      sourceReputation,
      destReputation,
      sourceGeo,
      destGeo,
      aiAnalysis,
      portScan
    } = data;

    let threatScore = 0;
    let confidenceFactors = [];
    let threatType = 'unknown';
    let description = '';

    // Analyze IP reputation
    if (sourceReputation?.reputation?.threatScore > 0.5) {
      threatScore += 0.4;
      confidenceFactors.push('Malicious source IP detected');
      threatType = 'malicious_ip';
    }

    if (destReputation?.reputation?.threatScore > 0.5) {
      threatScore += 0.3;
      confidenceFactors.push('Suspicious destination IP');
    }

    // Analyze geolocation anomalies
    if (sourceGeo && this.isHighRiskLocation(sourceGeo)) {
      threatScore += 0.2;
      confidenceFactors.push(`High-risk location: ${sourceGeo.country}`);
      threatType = threatType === 'unknown' ? 'geo_anomaly' : threatType;
    }

    // Port analysis
    if (portScan && this.isSuspiciousPort(logEntry.port)) {
      threatScore += 0.3;
      confidenceFactors.push(`Suspicious port activity: ${logEntry.port}`);
      threatType = threatType === 'unknown' ? 'port_scan' : threatType;
    }

    // AI analysis integration
    if (aiAnalysis && aiAnalysis.threatLevel > 0.5) {
      threatScore += aiAnalysis.threatLevel * 0.4;
      confidenceFactors.push(`AI detected: ${aiAnalysis.category}`);
      threatType = aiAnalysis.category;
      description += aiAnalysis.description + ' ';
    }

    // Payload size analysis
    if (logEntry.payload_size > 10000) {
      threatScore += 0.2;
      confidenceFactors.push('Large payload detected');
      threatType = threatType === 'unknown' ? 'ddos' : threatType;
    }

    description += confidenceFactors.join('; ');

    return {
      threat_type: threatType,
      severity: this.calculateSeverity(threatScore),
      confidence: Math.min(threatScore, 1.0),
      anomaly_score: threatScore,
      description: description || 'Automated threat analysis completed',
      raw_analysis: {
        sourceReputation,
        destReputation,
        sourceGeo,
        destGeo,
        aiAnalysis,
        portScan
      }
    };
  }

  private isHighRiskLocation(geo: any): boolean {
    const highRiskCountries = ['CN', 'RU', 'KP', 'IR'];
    return highRiskCountries.includes(geo.country);
  }

  private isSuspiciousPort(port: number): boolean {
    const suspiciousPorts = [22, 23, 135, 139, 445, 1433, 3306, 3389, 5432, 6379];
    return suspiciousPorts.includes(port);
  }

  private calculateSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 0.9) return 'critical';
    if (score >= 0.7) return 'high';
    if (score >= 0.5) return 'medium';
    return 'low';
  }

  private async deployCountermeasures(threatId: string, countermeasures: any) {
    try {
      for (const action of countermeasures.actions) {
        await insertCountermeasure({
          threat_id: threatId,
          action: action,
          description: `AI-Generated: ${action} (Priority: ${countermeasures.priority})`,
          status: countermeasures.automation ? 'deployed' : 'pending',
          impact: countermeasures.impact,
          deployment_time: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error deploying countermeasures:', error);
    }
  }
}
