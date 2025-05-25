
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ThreatDetectionEngine, CountermeasureGenerator, insertNetworkLog, insertThreatAnalysis, insertCountermeasure } from '@/utils/threatDetection';
import { SyntheticDataGenerator } from '@/utils/syntheticDataGenerator';

export function useRealTimeThreats() {
  const [isActive, setIsActive] = useState(false);
  const [threatCount, setThreatCount] = useState(0);
  const [countermeasureCount, setCountermeasureCount] = useState(0);
  const [systemHealth, setSystemHealth] = useState(98.5);

  const detectionEngine = new ThreatDetectionEngine();
  const countermeasureGenerator = new CountermeasureGenerator();
  const dataGenerator = new SyntheticDataGenerator();

  useEffect(() => {
    if (!isActive) return;

    const processRealTimeData = async () => {
      try {
        // Generate synthetic network log
        const networkLog = dataGenerator.generateRealTimeLog();
        
        // Insert into database
        const logId = await insertNetworkLog(networkLog);
        if (!logId) return;

        // Analyze for threats
        const threats = await detectionEngine.analyzeNetworkLogs([{ ...networkLog, id: logId }]);
        
        if (threats.length > 0) {
          const threat = threats[0];
          threat.log_id = logId;
          
          // Insert threat analysis
          const threatId = await insertThreatAnalysis(threat);
          if (threatId) {
            setThreatCount(prev => prev + 1);
            
            // Generate and deploy countermeasures
            const countermeasures = countermeasureGenerator.generateCountermeasures({ ...threat, id: threatId });
            
            for (const countermeasure of countermeasures) {
              await insertCountermeasure({
                ...countermeasure,
                threat_id: threatId,
                status: 'deployed',
                deployment_time: new Date().toISOString()
              });
              setCountermeasureCount(prev => prev + 1);
            }
            
            // Update system health based on threat severity
            setSystemHealth(prev => {
              const healthImpact = threat.severity === 'critical' ? 2 : 
                                   threat.severity === 'high' ? 1 : 
                                   threat.severity === 'medium' ? 0.5 : 0.1;
              return Math.max(85, prev - healthImpact + 0.5); // Gradual recovery
            });
          }
        } else {
          // Gradual system health recovery when no threats
          setSystemHealth(prev => Math.min(99.5, prev + 0.1));
        }
      } catch (error) {
        console.error('Error processing real-time data:', error);
      }
    };

    // Process data every 5-10 seconds
    const interval = setInterval(processRealTimeData, 5000 + Math.random() * 5000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Listen to real-time database changes
  useEffect(() => {
    const channel = supabase
      .channel('threat-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'threat_analysis'
        },
        (payload) => {
          console.log('New threat detected:', payload.new);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'countermeasures'
        },
        (payload) => {
          console.log('Countermeasure deployed:', payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const startMonitoring = () => setIsActive(true);
  const stopMonitoring = () => setIsActive(false);

  const simulateAttackScenario = async (scenarioType: 'ddos' | 'portscan' | 'malware' | 'apt') => {
    try {
      const attackLogs = dataGenerator.generateAttackScenario(scenarioType);
      
      for (const log of attackLogs) {
        const logId = await insertNetworkLog(log);
        if (logId) {
          const threats = await detectionEngine.analyzeNetworkLogs([{ ...log, id: logId }]);
          
          if (threats.length > 0) {
            const threat = threats[0];
            threat.log_id = logId;
            
            const threatId = await insertThreatAnalysis(threat);
            if (threatId) {
              const countermeasures = countermeasureGenerator.generateCountermeasures({ ...threat, id: threatId });
              
              for (const countermeasure of countermeasures) {
                await insertCountermeasure({
                  ...countermeasure,
                  threat_id: threatId,
                  status: 'deployed',
                  deployment_time: new Date().toISOString()
                });
              }
            }
          }
        }
      }
      
      setThreatCount(prev => prev + attackLogs.length);
      setCountermeasureCount(prev => prev + attackLogs.length * 2);
      
    } catch (error) {
      console.error('Error simulating attack scenario:', error);
    }
  };

  return {
    isActive,
    threatCount,
    countermeasureCount,
    systemHealth,
    startMonitoring,
    stopMonitoring,
    simulateAttackScenario
  };
}
