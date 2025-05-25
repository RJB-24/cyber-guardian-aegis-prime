
import { NetworkLog } from './threatDetection';

export class SyntheticDataGenerator {
  private protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'FTP', 'SSH', 'ICMP'];
  private commonPorts = [80, 443, 22, 21, 25, 53, 110, 143, 993, 995];
  private suspiciousPorts = [1337, 31337, 4444, 6666, 1234, 12345];
  private normalIPs = ['192.168.1.', '10.0.0.', '172.16.0.'];
  private suspiciousIPs = ['45.32.123.', '185.220.101.', '91.219.237.'];

  generateNetworkLogs(count: number, anomalyRate: number = 0.1): NetworkLog[] {
    const logs: NetworkLog[] = [];
    const anomalyCount = Math.floor(count * anomalyRate);
    
    // Generate normal logs
    for (let i = 0; i < count - anomalyCount; i++) {
      logs.push(this.generateNormalLog());
    }
    
    // Generate anomalous logs
    for (let i = 0; i < anomalyCount; i++) {
      logs.push(this.generateAnomalousLog());
    }
    
    // Shuffle the logs to mix normal and anomalous
    return this.shuffleArray(logs).map((log, index) => ({
      ...log,
      timestamp: new Date(Date.now() - (count - index) * 1000 * Math.random() * 60).toISOString()
    }));
  }

  private generateNormalLog(): NetworkLog {
    const sourceIP = this.getRandomNormalIP();
    const destIP = this.getRandomNormalIP();
    const protocol = this.getRandomElement(this.protocols.slice(0, 4)); // More common protocols
    const port = this.getRandomElement(this.commonPorts);
    const payloadSize = Math.floor(Math.random() * 1000) + 64; // Normal payload sizes
    
    return {
      timestamp: new Date().toISOString(),
      source_ip: sourceIP,
      destination_ip: destIP,
      protocol,
      port,
      payload_size: payloadSize,
      raw_data: {
        flags: this.generateNormalFlags(protocol),
        connection_state: 'ESTABLISHED',
        bytes_in: payloadSize,
        bytes_out: Math.floor(payloadSize * 0.8)
      }
    };
  }

  private generateAnomalousLog(): NetworkLog {
    const anomalyType = Math.random();
    
    if (anomalyType < 0.3) {
      // DDoS-like traffic
      return this.generateDDoSLog();
    } else if (anomalyType < 0.6) {
      // Port scanning activity
      return this.generatePortScanLog();
    } else if (anomalyType < 0.8) {
      // Suspicious payload
      return this.generateSuspiciousPayloadLog();
    } else {
      // Unknown/exotic protocol
      return this.generateExoticProtocolLog();
    }
  }

  private generateDDoSLog(): NetworkLog {
    const sourceIP = this.getRandomSuspiciousIP();
    const destIP = this.getRandomNormalIP();
    const protocol = 'UDP'; // Common for DDoS
    const port = this.getRandomElement(this.commonPorts);
    const payloadSize = Math.floor(Math.random() * 64) + 1; // Small payloads for DDoS
    
    return {
      timestamp: new Date().toISOString(),
      source_ip: sourceIP,
      destination_ip: destIP,
      protocol,
      port,
      payload_size: payloadSize,
      raw_data: {
        flags: ['SYN'],
        connection_state: 'SYN_SENT',
        bytes_in: payloadSize,
        bytes_out: 0,
        attack_signature: 'high_frequency_requests'
      }
    };
  }

  private generatePortScanLog(): NetworkLog {
    const sourceIP = this.getRandomSuspiciousIP();
    const destIP = this.getRandomNormalIP();
    const protocol = 'TCP';
    const port = this.getRandomElement([...this.commonPorts, ...this.suspiciousPorts]);
    const payloadSize = 0; // Port scans typically have no payload
    
    return {
      timestamp: new Date().toISOString(),
      source_ip: sourceIP,
      destination_ip: destIP,
      protocol,
      port,
      payload_size: payloadSize,
      raw_data: {
        flags: ['SYN'],
        connection_state: 'SYN_SENT',
        bytes_in: 0,
        bytes_out: 0,
        scan_type: 'tcp_connect'
      }
    };
  }

  private generateSuspiciousPayloadLog(): NetworkLog {
    const sourceIP = this.getRandomElement([...this.normalIPs, ...this.suspiciousIPs]) + Math.floor(Math.random() * 255);
    const destIP = this.getRandomNormalIP();
    const protocol = this.getRandomElement(this.protocols);
    const port = this.getRandomElement(this.suspiciousPorts);
    const payloadSize = Math.floor(Math.random() * 5000) + 2000; // Large suspicious payload
    
    return {
      timestamp: new Date().toISOString(),
      source_ip: sourceIP,
      destination_ip: destIP,
      protocol,
      port,
      payload_size: payloadSize,
      raw_data: {
        flags: this.generateSuspiciousFlags(),
        connection_state: 'ESTABLISHED',
        bytes_in: payloadSize,
        bytes_out: Math.floor(payloadSize * 0.1),
        payload_entropy: 7.8, // High entropy indicates encryption/compression
        malware_indicators: ['base64_encoded_content', 'shell_commands']
      }
    };
  }

  private generateExoticProtocolLog(): NetworkLog {
    const sourceIP = this.getRandomSuspiciousIP();
    const destIP = this.getRandomNormalIP();
    const protocol = this.getRandomElement(['EXOTIC', 'UNKNOWN', 'CUSTOM', 'P2P']);
    const port = Math.floor(Math.random() * 65535) + 1024; // Random high port
    const payloadSize = Math.floor(Math.random() * 3000) + 500;
    
    return {
      timestamp: new Date().toISOString(),
      source_ip: sourceIP,
      destination_ip: destIP,
      protocol,
      port,
      payload_size: payloadSize,
      raw_data: {
        flags: ['UNKNOWN'],
        connection_state: 'UNKNOWN',
        bytes_in: payloadSize,
        bytes_out: Math.floor(payloadSize * 0.5),
        protocol_anomaly: true,
        custom_headers: true
      }
    };
  }

  private getRandomNormalIP(): string {
    const subnet = this.getRandomElement(this.normalIPs);
    return subnet + Math.floor(Math.random() * 254 + 1);
  }

  private getRandomSuspiciousIP(): string {
    const subnet = this.getRandomElement(this.suspiciousIPs);
    return subnet + Math.floor(Math.random() * 254 + 1);
  }

  private generateNormalFlags(protocol: string): string[] {
    switch (protocol) {
      case 'TCP':
        return this.getRandomElement([['SYN', 'ACK'], ['ACK'], ['FIN', 'ACK']]);
      case 'UDP':
        return [];
      default:
        return ['NORMAL'];
    }
  }

  private generateSuspiciousFlags(): string[] {
    return this.getRandomElement([
      ['SYN', 'FIN'], // Invalid combination
      ['RST', 'SYN'], // Suspicious combination
      ['URG', 'PSH', 'SYN'], // Too many flags
      ['XMAS'] // Christmas tree packet
    ]);
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Generate real-time streaming data
  generateRealTimeLog(): NetworkLog {
    const isAnomalous = Math.random() < 0.05; // 5% anomaly rate for real-time
    return isAnomalous ? this.generateAnomalousLog() : this.generateNormalLog();
  }

  // Generate specific attack scenarios for demo
  generateAttackScenario(scenarioType: 'ddos' | 'portscan' | 'malware' | 'apt'): NetworkLog[] {
    switch (scenarioType) {
      case 'ddos':
        return this.generateDDoSScenario();
      case 'portscan':
        return this.generatePortScanScenario();
      case 'malware':
        return this.generateMalwareScenario();
      case 'apt':
        return this.generateAPTScenario();
      default:
        return [];
    }
  }

  private generateDDoSScenario(): NetworkLog[] {
    const logs: NetworkLog[] = [];
    const attackerIPs = [
      '185.220.101.5',
      '185.220.101.17',
      '185.220.101.23',
      '91.219.237.45',
      '45.32.123.67'
    ];
    const targetIP = '192.168.1.100';
    
    attackerIPs.forEach(attackerIP => {
      for (let i = 0; i < 50; i++) {
        logs.push({
          timestamp: new Date(Date.now() - Math.random() * 60000).toISOString(),
          source_ip: attackerIP,
          destination_ip: targetIP,
          protocol: 'UDP',
          port: 80,
          payload_size: 32,
          raw_data: {
            attack_type: 'volumetric_ddos',
            packets_per_second: 10000 + Math.random() * 5000
          }
        });
      }
    });
    
    return logs;
  }

  private generatePortScanScenario(): NetworkLog[] {
    const logs: NetworkLog[] = [];
    const attackerIP = '45.32.123.100';
    const targetIP = '192.168.1.50';
    const ports = Array.from({ length: 1000 }, (_, i) => i + 1);
    
    ports.forEach(port => {
      logs.push({
        timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(),
        source_ip: attackerIP,
        destination_ip: targetIP,
        protocol: 'TCP',
        port,
        payload_size: 0,
        raw_data: {
          attack_type: 'port_scan',
          scan_technique: 'tcp_syn'
        }
      });
    });
    
    return logs;
  }

  private generateMalwareScenario(): NetworkLog[] {
    const logs: NetworkLog[] = [];
    const infectedIP = '192.168.1.75';
    const c2Servers = ['91.219.237.88', '185.220.101.44'];
    
    c2Servers.forEach(c2IP => {
      for (let i = 0; i < 20; i++) {
        logs.push({
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          source_ip: infectedIP,
          destination_ip: c2IP,
          protocol: 'HTTPS',
          port: 443,
          payload_size: 1024 + Math.random() * 2048,
          raw_data: {
            attack_type: 'c2_communication',
            malware_family: 'TrojanX',
            encrypted_payload: true
          }
        });
      }
    });
    
    return logs;
  }

  private generateAPTScenario(): NetworkLog[] {
    const logs: NetworkLog[] = [];
    const phases = ['reconnaissance', 'initial_access', 'persistence', 'lateral_movement', 'exfiltration'];
    
    phases.forEach((phase, phaseIndex) => {
      for (let i = 0; i < 10; i++) {
        logs.push({
          timestamp: new Date(Date.now() - (phases.length - phaseIndex) * 3600000 - Math.random() * 3600000).toISOString(),
          source_ip: `10.0.${phaseIndex}.${100 + i}`,
          destination_ip: `192.168.1.${10 + phaseIndex * 10}`,
          protocol: this.getRandomElement(['TCP', 'HTTPS', 'SSH']),
          port: this.getRandomElement([22, 443, 3389, 5985]),
          payload_size: 512 + Math.random() * 1536,
          raw_data: {
            attack_type: 'apt',
            phase,
            persistence_mechanism: phase === 'persistence' ? 'registry_modification' : undefined,
            lateral_movement: phase === 'lateral_movement' ? 'wmi_execution' : undefined
          }
        });
      }
    });
    
    return logs;
  }
}
