
export interface ThreatData {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  source: string;
  description: string;
  status: 'detected' | 'predicted' | 'neutralized' | 'investigating';
}

export interface CountermeasureData {
  id: string;
  threatId: string;
  action: string;
  status: 'pending' | 'deployed' | 'successful' | 'failed';
  timestamp: string;
  impact: string;
  description: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'server' | 'workstation' | 'router' | 'firewall';
  status: 'healthy' | 'warning' | 'threat' | 'protected';
  connections: string[];
}

export const generateMockThreats = (): ThreatData[] => {
  const threatTypes = [
    'Advanced Persistent Threat',
    'DDoS Attack',
    'Malware Infiltration',
    'Data Exfiltration',
    'Privilege Escalation',
    'SQL Injection',
    'Zero-Day Exploit',
    'Phishing Campaign',
    'Ransomware',
    'DNS Poisoning'
  ];

  const sources = [
    'Network Traffic Analysis',
    'Endpoint Detection',
    'Dark Web Intelligence',
    'Behavioral Analytics',
    'Vulnerability Scanner',
    'Log Correlation',
    'Threat Feed',
    'AI Prediction Model'
  ];

  return Array.from({ length: 15 }, (_, i) => {
    const severity = ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as ThreatData['severity'];
    const status = ['detected', 'predicted', 'neutralized', 'investigating'][Math.floor(Math.random() * 4)] as ThreatData['status'];
    
    return {
      id: `threat-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity,
      confidence: Math.floor(Math.random() * 30) + 70,
      source: sources[Math.floor(Math.random() * sources.length)],
      description: `Anomalous behavior detected with ${Math.floor(Math.random() * 30) + 70}% confidence`,
      status
    };
  });
};

export const generateMockCountermeasures = (threats: ThreatData[]): CountermeasureData[] => {
  const actions = [
    'Isolate Network Segment',
    'Block IP Address',
    'Quarantine Endpoint',
    'Deploy Honeypot',
    'Update Firewall Rules',
    'Revoke Certificates',
    'Activate DDoS Protection',
    'Deploy Security Patch',
    'Enable Enhanced Monitoring',
    'Initiate Incident Response'
  ];

  return threats.map((threat, i) => ({
    id: `countermeasure-${i + 1}`,
    threatId: threat.id,
    action: actions[Math.floor(Math.random() * actions.length)],
    status: ['pending', 'deployed', 'successful', 'failed'][Math.floor(Math.random() * 4)] as CountermeasureData['status'],
    timestamp: new Date(new Date(threat.timestamp).getTime() + Math.random() * 60 * 60 * 1000).toISOString(),
    impact: `${Math.floor(Math.random() * 5) + 1}% CPU impact, ${Math.floor(Math.random() * 10) + 5}ms latency`,
    description: `Automated response to ${threat.type.toLowerCase()}`
  }));
};

export const generateNetworkTopology = (): NetworkNode[] => {
  return [
    { id: 'fw-1', name: 'Main Firewall', type: 'firewall', status: 'healthy', connections: ['rt-1', 'rt-2'] },
    { id: 'rt-1', name: 'Core Router A', type: 'router', status: 'healthy', connections: ['srv-1', 'srv-2', 'ws-1'] },
    { id: 'rt-2', name: 'Core Router B', type: 'router', status: 'warning', connections: ['srv-3', 'ws-2', 'ws-3'] },
    { id: 'srv-1', name: 'Web Server', type: 'server', status: 'protected', connections: ['rt-1'] },
    { id: 'srv-2', name: 'Database Server', type: 'server', status: 'healthy', connections: ['rt-1'] },
    { id: 'srv-3', name: 'Email Server', type: 'server', status: 'threat', connections: ['rt-2'] },
    { id: 'ws-1', name: 'Admin Workstation', type: 'workstation', status: 'healthy', connections: ['rt-1'] },
    { id: 'ws-2', name: 'User Workstation A', type: 'workstation', status: 'warning', connections: ['rt-2'] },
    { id: 'ws-3', name: 'User Workstation B', type: 'workstation', status: 'healthy', connections: ['rt-2'] }
  ];
};
