
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, Shield, AlertTriangle, Zap, Server, Smartphone, Laptop, Router, Database, Cloud } from 'lucide-react';

interface NetworkNode {
  id: string;
  type: 'server' | 'endpoint' | 'router' | 'database' | 'cloud' | 'mobile';
  name: string;
  x: number;
  y: number;
  status: 'secure' | 'warning' | 'compromised' | 'isolated';
  connections: string[];
  riskLevel: number;
  isUnderAttack: boolean;
  protectionLevel: number;
}

interface NetworkEdge {
  from: string;
  to: string;
  type: 'normal' | 'encrypted' | 'vpn' | 'suspicious' | 'attack';
  bandwidth: number;
  latency: number;
}

export const NetworkTopologyVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [edges, setEdges] = useState<NetworkEdge[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [attackWave, setAttackWave] = useState(0);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'server': return Server;
      case 'database': return Database;
      case 'cloud': return Cloud;
      case 'router': return Router;
      case 'mobile': return Smartphone;
      default: return Laptop;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return '#16A34A';
      case 'warning': return '#D97706';
      case 'compromised': return '#DC2626';
      case 'isolated': return '#9333EA';
      default: return '#6B7280';
    }
  };

  useEffect(() => {
    const initializeNetwork = () => {
      const initialNodes: NetworkNode[] = [
        {
          id: 'core-router',
          type: 'router',
          name: 'Core Router',
          x: 400,
          y: 300,
          status: 'secure',
          connections: ['web-server', 'db-server', 'firewall'],
          riskLevel: 15,
          isUnderAttack: false,
          protectionLevel: 95
        },
        {
          id: 'web-server',
          type: 'server',
          name: 'Web Server Cluster',
          x: 200,
          y: 150,
          status: 'secure',
          connections: ['core-router', 'load-balancer'],
          riskLevel: 25,
          isUnderAttack: false,
          protectionLevel: 88
        },
        {
          id: 'db-server',
          type: 'database',
          name: 'Database Server',
          x: 600,
          y: 150,
          status: 'secure',
          connections: ['core-router', 'backup-server'],
          riskLevel: 8,
          isUnderAttack: false,
          protectionLevel: 97
        },
        {
          id: 'firewall',
          type: 'router',
          name: 'Next-Gen Firewall',
          x: 400,
          y: 450,
          status: 'secure',
          connections: ['core-router', 'edge-router'],
          riskLevel: 5,
          isUnderAttack: false,
          protectionLevel: 99
        },
        {
          id: 'cloud-infra',
          type: 'cloud',
          name: 'Cloud Infrastructure',
          x: 100,
          y: 300,
          status: 'secure',
          connections: ['web-server'],
          riskLevel: 12,
          isUnderAttack: false,
          protectionLevel: 92
        },
        {
          id: 'endpoint-1',
          type: 'endpoint',
          name: 'Executive Workstation',
          x: 700,
          y: 300,
          status: 'secure',
          connections: ['core-router'],
          riskLevel: 45,
          isUnderAttack: false,
          protectionLevel: 75
        },
        {
          id: 'mobile-device',
          type: 'mobile',
          name: 'Mobile Devices',
          x: 500,
          y: 550,
          status: 'warning',
          connections: ['firewall'],
          riskLevel: 62,
          isUnderAttack: false,
          protectionLevel: 68
        }
      ];

      const initialEdges: NetworkEdge[] = [
        { from: 'core-router', to: 'web-server', type: 'encrypted', bandwidth: 10000, latency: 2 },
        { from: 'core-router', to: 'db-server', type: 'encrypted', bandwidth: 8000, latency: 1 },
        { from: 'core-router', to: 'firewall', type: 'normal', bandwidth: 15000, latency: 1 },
        { from: 'web-server', to: 'cloud-infra', type: 'vpn', bandwidth: 5000, latency: 8 },
        { from: 'core-router', to: 'endpoint-1', type: 'normal', bandwidth: 1000, latency: 5 },
        { from: 'firewall', to: 'mobile-device', type: 'vpn', bandwidth: 500, latency: 15 }
      ];

      setNodes(initialNodes);
      setEdges(initialEdges);
    };

    initializeNetwork();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges
      edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          switch (edge.type) {
            case 'encrypted':
              ctx.strokeStyle = '#16A34A';
              ctx.lineWidth = 3;
              ctx.setLineDash([]);
              break;
            case 'vpn':
              ctx.strokeStyle = '#9333EA';
              ctx.lineWidth = 2;
              ctx.setLineDash([5, 5]);
              break;
            case 'attack':
              ctx.strokeStyle = '#DC2626';
              ctx.lineWidth = 4;
              ctx.setLineDash([]);
              break;
            case 'suspicious':
              ctx.strokeStyle = '#D97706';
              ctx.lineWidth = 2;
              ctx.setLineDash([10, 3]);
              break;
            default:
              ctx.strokeStyle = '#6B7280';
              ctx.lineWidth = 1;
              ctx.setLineDash([]);
          }
          
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle = getStatusColor(node.status);
        ctx.fill();
        
        // Attack wave effect
        if (node.isUnderAttack) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 25 + attackWave * 2, 0, 2 * Math.PI);
          ctx.strokeStyle = '#DC2626';
          ctx.lineWidth = 3;
          ctx.globalAlpha = 1 - (attackWave / 15);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        
        // Protection shield
        if (node.protectionLevel > 80) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, 2 * Math.PI);
          ctx.strokeStyle = '#39FF14';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.6;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
        
        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + 45);
        
        // Risk indicator
        if (node.riskLevel > 30) {
          ctx.fillStyle = '#DC2626';
          ctx.beginPath();
          ctx.arc(node.x + 20, node.y - 20, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px Inter';
          ctx.fillText('!', node.x + 20, node.y - 16);
        }
      });
    };

    drawNetwork();
  }, [nodes, edges, attackWave]);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setAttackWave(prev => (prev + 1) % 15);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const simulateAttack = async () => {
    setIsSimulating(true);
    
    // Simulate attack progression
    const attackSequence = [
      'mobile-device',
      'firewall', 
      'core-router',
      'endpoint-1',
      'web-server'
    ];
    
    for (const nodeId of attackSequence) {
      setNodes(prev => prev.map(node => 
        node.id === nodeId 
          ? { ...node, isUnderAttack: true, status: 'compromised' as const }
          : node
      ));
      
      setEdges(prev => prev.map(edge => 
        edge.from === nodeId || edge.to === nodeId
          ? { ...edge, type: 'attack' as const }
          : edge
      ));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aegis Prime response
      setNodes(prev => prev.map(node => 
        node.id === nodeId 
          ? { ...node, isUnderAttack: false, status: 'isolated' as const, protectionLevel: 100 }
          : node
      ));
      
      setEdges(prev => prev.map(edge => 
        edge.from === nodeId || edge.to === nodeId
          ? { ...edge, type: 'encrypted' as const }
          : edge
      ));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Recovery phase
    setTimeout(() => {
      setNodes(prev => prev.map(node => ({ 
        ...node, 
        status: 'secure' as const,
        protectionLevel: Math.min(100, node.protectionLevel + 10)
      })));
      setIsSimulating(false);
    }, 3000);
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Network className="mr-2 h-6 w-6 text-primary" />
            Real-Time Network Topology & Attack Simulation
          </span>
          <div className="flex items-center space-x-2">
            <Badge className={isSimulating ? 
              'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' :
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }>
              {isSimulating ? 'UNDER ATTACK' : 'NETWORK SECURE'}
            </Badge>
            <Button
              onClick={simulateAttack}
              disabled={isSimulating}
              variant="outline"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-1" />
              {isSimulating ? 'Simulating...' : 'Simulate APT Attack'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="relative bg-slate-900/30 rounded-lg border border-primary/20 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto cursor-pointer"
                onClick={(e) => {
                  const rect = canvasRef.current?.getBoundingClientRect();
                  if (rect) {
                    const x = (e.clientX - rect.left) * (800 / rect.width);
                    const y = (e.clientY - rect.top) * (600 / rect.height);
                    
                    const clickedNode = nodes.find(node => {
                      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
                      return distance <= 25;
                    });
                    
                    setSelectedNode(clickedNode || null);
                  }
                }}
              />
              
              <div className="absolute top-4 left-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-400">Secure</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-amber-400">Warning</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-400">Compromised</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-400">Isolated</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Network Status</h3>
            
            <div className="space-y-3">
              {nodes.map(node => {
                const Icon = getNodeIcon(node.type);
                return (
                  <div 
                    key={node.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedNode?.id === node.id
                        ? 'border-primary/50 bg-primary/10'
                        : 'border-border/30 bg-muted/10 hover:border-primary/30'
                    }`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" style={{ color: getStatusColor(node.status) }} />
                        <span className="font-medium text-foreground text-sm">{node.name}</span>
                      </div>
                      {node.isUnderAttack && (
                        <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Risk:</span>
                        <span style={{ color: getStatusColor(node.status) }}>
                          {node.riskLevel}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Protection:</span>
                        <span className="text-emerald-400">{node.protectionLevel}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {selectedNode && (
              <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Node Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-muted-foreground">Type:</span> {selectedNode.type}</div>
                  <div><span className="text-muted-foreground">Status:</span> 
                    <Badge className="ml-2" style={{ 
                      backgroundColor: `${getStatusColor(selectedNode.status)}20`,
                      color: getStatusColor(selectedNode.status),
                      borderColor: `${getStatusColor(selectedNode.status)}30`
                    }}>
                      {selectedNode.status}
                    </Badge>
                  </div>
                  <div><span className="text-muted-foreground">Connections:</span> {selectedNode.connections.length}</div>
                  <div><span className="text-muted-foreground">Risk Level:</span> {selectedNode.riskLevel}%</div>
                  <div><span className="text-muted-foreground">Protection:</span> {selectedNode.protectionLevel}%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
