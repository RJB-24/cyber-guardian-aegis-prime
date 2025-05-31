
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, Shield, AlertTriangle, Zap, Eye, RotateCcw } from 'lucide-react';

export const NetworkTopology3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [networkStats, setNetworkStats] = useState({
    totalNodes: 45,
    secureNodes: 42,
    vulnerableNodes: 2,
    compromisedNodes: 1,
    activeThreatPaths: 3
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Network nodes data
    const nodes = Array.from({ length: networkStats.totalNodes }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 6 + Math.random() * 4,
      status: i < networkStats.secureNodes ? 'secure' : 
              i < networkStats.secureNodes + networkStats.vulnerableNodes ? 'vulnerable' : 'compromised',
      connections: [],
      pulsePhase: Math.random() * Math.PI * 2,
      threatLevel: Math.random()
    }));

    // Generate connections
    nodes.forEach(node => {
      const connectionCount = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < connectionCount; i++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== node.id && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      if (!isAnimating) return;
      
      time += 0.02;
      
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodes[targetId];
          if (!target) return;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          
          // Color based on threat status
          if (node.status === 'compromised' || target.status === 'compromised') {
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.3 + 0.2 * Math.sin(time * 3)})`;
            ctx.lineWidth = 2;
          } else if (node.status === 'vulnerable' || target.status === 'vulnerable') {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
            ctx.lineWidth = 1.5;
          } else {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
          }
          
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        // Pulse effect for compromised nodes
        if (node.status === 'compromised') {
          const pulseRadius = node.radius + 10 * Math.sin(time * 4 + node.pulsePhase);
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
          ctx.fill();
        }

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        switch (node.status) {
          case 'secure':
            ctx.fillStyle = '#10B981';
            break;
          case 'vulnerable':
            ctx.fillStyle = '#F59E0B';
            break;
          case 'compromised':
            ctx.fillStyle = '#EF4444';
            break;
        }
        
        ctx.fill();
        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect
        const glowSize = node.radius * 2;
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        );
        gradient.addColorStop(0, `${node.status === 'secure' ? '#10B981' : 
                                  node.status === 'vulnerable' ? '#F59E0B' : '#EF4444'}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw threat paths
      if (time % 2 < 1) {
        for (let i = 0; i < networkStats.activeThreatPaths; i++) {
          const start = nodes[Math.floor(Math.random() * nodes.length)];
          const end = nodes[Math.floor(Math.random() * nodes.length)];
          
          if (start && end) {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.8 * Math.sin(time * 5)})`;
            ctx.lineWidth = 3;
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isAnimating, networkStats]);

  const handleToggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleSimulateThreat = () => {
    setNetworkStats(prev => ({
      ...prev,
      compromisedNodes: Math.min(prev.compromisedNodes + 1, 5),
      vulnerableNodes: Math.max(prev.vulnerableNodes - 1, 0),
      secureNodes: Math.max(prev.secureNodes - 1, 35),
      activeThreatPaths: Math.min(prev.activeThreatPaths + 2, 8)
    }));
  };

  const handleHealNetwork = () => {
    setNetworkStats({
      totalNodes: 45,
      secureNodes: 42,
      vulnerableNodes: 2,
      compromisedNodes: 1,
      activeThreatPaths: 1
    });
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Network className="mr-2 h-5 w-5 text-primary" />
            Real-time 3D Network Topology
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              LIVE 3D
            </Badge>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" onClick={handleToggleAnimation}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleSimulateThreat}>
                <AlertTriangle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleHealNetwork}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="text-center">
              <div className="text-emerald-400 font-bold text-lg">{networkStats.secureNodes}</div>
              <div className="text-muted-foreground">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-amber-400 font-bold text-lg">{networkStats.vulnerableNodes}</div>
              <div className="text-muted-foreground">Vulnerable</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg">{networkStats.compromisedNodes}</div>
              <div className="text-muted-foreground">Compromised</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold text-lg">{networkStats.activeThreatPaths}</div>
              <div className="text-muted-foreground">Threat Paths</div>
            </div>
            <div className="text-center">
              <div className="text-primary font-bold text-lg">{networkStats.totalNodes}</div>
              <div className="text-muted-foreground">Total Nodes</div>
            </div>
          </div>
          
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-80 bg-slate-950/50 rounded-lg border border-primary/20"
              style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))' }}
            />
            {!isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <Button onClick={handleToggleAnimation} className="bg-primary">
                  <Zap className="mr-2 h-4 w-4" />
                  Resume Animation
                </Button>
              </div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Real-time network visualization • Green: Secure • Yellow: Vulnerable • Red: Compromised
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
