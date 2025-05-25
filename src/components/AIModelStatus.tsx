
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Cpu, Activity, Zap } from 'lucide-react';

interface AIModelMetrics {
  isolationForestAccuracy: number;
  lstmAccuracy: number;
  randomForestAccuracy: number;
  ensembleConfidence: number;
  predictedThreats: number;
  preventedAttacks: number;
}

interface AIModelStatusProps {
  metrics: AIModelMetrics;
  isActive: boolean;
}

export const AIModelStatus = ({ metrics, isActive }: AIModelStatusProps) => {
  const [animatedMetrics, setAnimatedMetrics] = useState(metrics);

  useEffect(() => {
    // Animate metrics changes
    const interval = setInterval(() => {
      setAnimatedMetrics(prev => ({
        ...prev,
        isolationForestAccuracy: Math.min(99.9, prev.isolationForestAccuracy + (Math.random() - 0.5) * 0.1),
        lstmAccuracy: Math.min(99.9, prev.lstmAccuracy + (Math.random() - 0.5) * 0.15),
        randomForestAccuracy: Math.min(99.9, prev.randomForestAccuracy + (Math.random() - 0.5) * 0.05),
        ensembleConfidence: Math.min(99.9, prev.ensembleConfidence + (Math.random() - 0.5) * 0.08)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const models = [
    {
      name: 'Isolation Forest',
      accuracy: animatedMetrics.isolationForestAccuracy,
      description: 'Anomaly Detection',
      icon: Brain,
      color: 'primary'
    },
    {
      name: 'LSTM Network',
      accuracy: animatedMetrics.lstmAccuracy,
      description: 'Temporal Analysis',
      icon: Activity,
      color: 'purple-500'
    },
    {
      name: 'Random Forest',
      accuracy: animatedMetrics.randomForestAccuracy,
      description: 'Classification',
      icon: Cpu,
      color: 'amber-500'
    },
    {
      name: 'Ensemble Model',
      accuracy: animatedMetrics.ensembleConfidence,
      description: 'Combined Intelligence',
      icon: Zap,
      color: 'red-500'
    }
  ];

  return (
    <Card className="glass-effect border-primary/20 royal-gradient">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          AI Model Performance Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {models.map((model) => {
            const ModelIcon = model.icon;
            return (
              <div 
                key={model.name}
                className={`text-center p-4 bg-${model.color}/10 rounded-lg border border-${model.color}/30`}
              >
                <div className="flex items-center justify-center mb-2">
                  <ModelIcon className={`h-5 w-5 text-${model.color === 'primary' ? 'primary' : model.color.replace('-500', '-400')}`} />
                  <div className={`ml-2 h-2 w-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`}></div>
                </div>
                <div className={`text-xl font-bold text-${model.color === 'primary' ? 'primary' : model.color.replace('-500', '-400')}`}>
                  {model.accuracy.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">{model.name}</div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
                <Progress 
                  value={model.accuracy} 
                  className="mt-2 h-1"
                />
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-bold text-primary">{metrics.predictedThreats}</div>
            <div className="text-sm text-muted-foreground">Threats Predicted</div>
          </div>
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-bold text-emerald-400">{metrics.preventedAttacks}</div>
            <div className="text-sm text-muted-foreground">Attacks Prevented</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
