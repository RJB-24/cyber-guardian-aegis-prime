
import { supabase } from '@/integrations/supabase/client';

export interface NetworkLog {
  id?: string;
  timestamp: string;
  source_ip: string;
  destination_ip: string;
  protocol: string;
  payload_size?: number;
  port?: number;
  raw_data?: any;
}

export interface ThreatAnalysis {
  id?: string;
  log_id?: string;
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  anomaly_score?: number;
  isolation_forest_score?: number;
  lstm_score?: number;
  random_forest_prediction?: string;
  status: 'detected' | 'investigating' | 'neutralized' | 'predicted';
  description?: string;
}

export interface Countermeasure {
  id?: string;
  threat_id?: string;
  action: string;
  description?: string;
  status: 'pending' | 'deployed' | 'successful' | 'failed';
  impact?: string;
  deployment_time?: string;
}

// ML Model Simulation Functions
export class IsolationForestDetector {
  private contamination = 0.01;
  private threshold = 0.1;

  detect(data: NetworkLog[]): number[] {
    // Simulate Isolation Forest anomaly detection
    return data.map(() => {
      const score = Math.random() * 2 - 1; // Range -1 to 1
      return score > this.threshold ? 1 : -1; // 1 = anomaly, -1 = normal
    });
  }

  getAnomalyScore(log: NetworkLog): number {
    // Simulate anomaly scoring based on features
    const features = this.extractFeatures(log);
    const baseScore = Math.random() * 0.2; // Base random component
    
    // Add feature-based scoring
    let score = baseScore;
    if (features.payloadSize > 1000) score += 0.3;
    if (features.isUnusualPort) score += 0.2;
    if (features.protocolRisk > 0.5) score += 0.4;
    
    return Math.min(score, 1.0);
  }

  private extractFeatures(log: NetworkLog) {
    return {
      payloadSize: log.payload_size || 0,
      isUnusualPort: log.port ? (log.port > 1024 && log.port < 5000) : false,
      protocolRisk: log.protocol === 'TCP' ? 0.3 : log.protocol === 'UDP' ? 0.5 : 0.7
    };
  }
}

export class LSTMDetector {
  private sequenceLength = 30;
  private threshold = 0.5;

  detect(data: NetworkLog[]): number[] {
    // Simulate LSTM temporal anomaly detection
    return data.map((_, index) => {
      const temporalScore = this.calculateTemporalScore(data, index);
      return temporalScore > this.threshold ? 1 : 0;
    });
  }

  private calculateTemporalScore(data: NetworkLog[], currentIndex: number): number {
    const startIndex = Math.max(0, currentIndex - this.sequenceLength);
    const sequence = data.slice(startIndex, currentIndex + 1);
    
    // Simulate reconstruction error
    let reconstructionError = 0;
    sequence.forEach((log, i) => {
      const expected = this.predictNext(sequence.slice(0, i));
      const actual = this.logToVector(log);
      reconstructionError += this.calculateMSE(expected, actual);
    });
    
    return reconstructionError / sequence.length;
  }

  private predictNext(sequence: NetworkLog[]): number[] {
    // Simulate LSTM prediction
    if (sequence.length === 0) return [0, 0, 0];
    const lastLog = sequence[sequence.length - 1];
    return this.logToVector(lastLog).map(v => v + (Math.random() - 0.5) * 0.1);
  }

  private logToVector(log: NetworkLog): number[] {
    return [
      log.payload_size || 0,
      log.port || 0,
      log.protocol === 'TCP' ? 1 : log.protocol === 'UDP' ? 2 : 3
    ];
  }

  private calculateMSE(predicted: number[], actual: number[]): number {
    const sum = predicted.reduce((acc, val, i) => acc + Math.pow(val - actual[i], 2), 0);
    return sum / predicted.length;
  }
}

export class RandomForestClassifier {
  private threatTypes = ['DDoS', 'Port Scan', 'Malware', 'Phishing', 'Intrusion', 'Data Exfiltration'];

  classify(log: NetworkLog): { prediction: string; confidence: number } {
    const features = this.extractFeatures(log);
    const threatScores = this.threatTypes.map(type => ({
      type,
      score: this.calculateThreatScore(features, type)
    }));
    
    threatScores.sort((a, b) => b.score - a.score);
    return {
      prediction: threatScores[0].type,
      confidence: threatScores[0].score * 100
    };
  }

  private extractFeatures(log: NetworkLog) {
    return {
      payloadSize: log.payload_size || 0,
      port: log.port || 0,
      protocol: log.protocol,
      sourceIP: log.source_ip,
      destIP: log.destination_ip,
      isHighPort: (log.port || 0) > 1024,
      isCommonProtocol: ['TCP', 'UDP', 'HTTP'].includes(log.protocol)
    };
  }

  private calculateThreatScore(features: any, threatType: string): number {
    let score = Math.random() * 0.3; // Base randomness
    
    switch (threatType) {
      case 'DDoS':
        if (features.payloadSize > 500) score += 0.4;
        if (features.protocol === 'UDP') score += 0.3;
        break;
      case 'Port Scan':
        if (features.isHighPort) score += 0.5;
        if (features.protocol === 'TCP') score += 0.2;
        break;
      case 'Malware':
        if (features.payloadSize > 1000) score += 0.3;
        if (!features.isCommonProtocol) score += 0.4;
        break;
      // Add more threat type logic here
    }
    
    return Math.min(score, 1.0);
  }
}

export class ThreatDetectionEngine {
  private isolationForest = new IsolationForestDetector();
  private lstmDetector = new LSTMDetector();
  private randomForest = new RandomForestClassifier();

  async analyzeNetworkLogs(logs: NetworkLog[]): Promise<ThreatAnalysis[]> {
    const analyses: ThreatAnalysis[] = [];
    
    // Get predictions from all models
    const isolationScores = this.isolationForest.detect(logs);
    const lstmScores = this.lstmDetector.detect(logs);
    
    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      const isolationScore = this.isolationForest.getAnomalyScore(log);
      const lstmScore = lstmScores[i];
      const rfPrediction = this.randomForest.classify(log);
      
      // Ensemble scoring
      const ensembleScore = this.calculateEnsembleScore(isolationScore, lstmScore, rfPrediction.confidence / 100);
      
      if (ensembleScore > 0.5) { // Threshold for threat detection
        const analysis: ThreatAnalysis = {
          log_id: log.id,
          threat_type: rfPrediction.prediction,
          severity: this.calculateSeverity(ensembleScore),
          confidence: Math.round(ensembleScore * 100),
          anomaly_score: ensembleScore,
          isolation_forest_score: isolationScore,
          lstm_score: lstmScore,
          random_forest_prediction: rfPrediction.prediction,
          status: ensembleScore > 0.8 ? 'predicted' : 'detected',
          description: this.generateDescription(rfPrediction.prediction, ensembleScore)
        };
        
        analyses.push(analysis);
      }
    }
    
    return analyses;
  }

  private calculateEnsembleScore(isolationScore: number, lstmScore: number, rfScore: number): number {
    // Weighted ensemble: 40% Isolation Forest, 35% LSTM, 25% Random Forest
    return (isolationScore * 0.4) + (lstmScore * 0.35) + (rfScore * 0.25);
  }

  private calculateSeverity(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 0.9) return 'critical';
    if (score >= 0.7) return 'high';
    if (score >= 0.5) return 'medium';
    return 'low';
  }

  private generateDescription(threatType: string, confidence: number): string {
    const confidenceLevel = confidence > 0.8 ? 'High' : confidence > 0.6 ? 'Medium' : 'Low';
    return `${confidenceLevel} confidence ${threatType} threat detected through AI ensemble analysis`;
  }
}

// Countermeasure Generation
export class CountermeasureGenerator {
  generateCountermeasures(threat: ThreatAnalysis): Countermeasure[] {
    const measures: Countermeasure[] = [];
    
    switch (threat.threat_type) {
      case 'DDoS':
        measures.push({
          action: 'Rate Limiting Activation',
          description: 'Deploy adaptive rate limiting based on source IP patterns',
          status: 'pending',
          impact: 'High - Reduces attack traffic by 85%'
        });
        measures.push({
          action: 'Traffic Diversion',
          description: 'Redirect suspicious traffic through scrubbing centers',
          status: 'pending',
          impact: 'Medium - Filters malicious requests'
        });
        break;
        
      case 'Port Scan':
        measures.push({
          action: 'IP Blacklisting',
          description: 'Add source IP to dynamic blacklist for 24 hours',
          status: 'pending',
          impact: 'High - Blocks reconnaissance attempts'
        });
        measures.push({
          action: 'Stealth Mode Activation',
          description: 'Hide unused ports and services from scanner',
          status: 'pending',
          impact: 'Medium - Reduces attack surface visibility'
        });
        break;
        
      case 'Malware':
        measures.push({
          action: 'Network Quarantine',
          description: 'Isolate affected network segment immediately',
          status: 'pending',
          impact: 'Critical - Prevents lateral movement'
        });
        measures.push({
          action: 'Deep Packet Inspection',
          description: 'Enhanced scanning of all traffic from source',
          status: 'pending',
          impact: 'High - Detects payload variants'
        });
        break;
        
      default:
        measures.push({
          action: 'Enhanced Monitoring',
          description: 'Increase logging and alerting for this threat vector',
          status: 'pending',
          impact: 'Medium - Improves detection accuracy'
        });
    }
    
    return measures.map(measure => ({
      ...measure,
      threat_id: threat.id
    }));
  }
}

// Database Operations
export async function insertNetworkLog(log: Omit<NetworkLog, 'id'>): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('network_logs')
      .insert(log)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error inserting network log:', error);
      return null;
    }
    
    return data.id;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export async function insertThreatAnalysis(analysis: Omit<ThreatAnalysis, 'id'>): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('threat_analysis')
      .insert(analysis)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error inserting threat analysis:', error);
      return null;
    }
    
    return data.id;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export async function insertCountermeasure(countermeasure: Omit<Countermeasure, 'id'>): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('countermeasures')
      .insert(countermeasure)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error inserting countermeasure:', error);
      return null;
    }
    
    return data.id;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export async function fetchThreatAnalysis(): Promise<ThreatAnalysis[]> {
  try {
    const { data, error } = await supabase
      .from('threat_analysis')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching threat analysis:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function fetchCountermeasures(): Promise<Countermeasure[]> {
  try {
    const { data, error } = await supabase
      .from('countermeasures')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching countermeasures:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}
