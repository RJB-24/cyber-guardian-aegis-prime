
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, BellRing, Check, X, AlertTriangle, Shield, Zap, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'threat' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable?: boolean;
}

export const EnhancedNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with some notifications
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'threat',
        title: 'Critical Threat Detected',
        message: 'Advanced persistent threat identified targeting network infrastructure. Immediate action required.',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'critical',
        actionable: true
      },
      {
        id: '2',
        type: 'success',
        title: 'Countermeasure Deployed',
        message: 'AI-generated firewall rules successfully deployed to block malicious traffic.',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'warning',
        title: 'API Rate Limit Warning',
        message: 'Approaching rate limit for threat intelligence APIs. Consider upgrading plan.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: true,
        priority: 'medium'
      }
    ];
    setNotifications(initialNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['threat', 'success', 'warning', 'info'][Math.floor(Math.random() * 4)] as any,
        title: generateNotificationTitle(),
        message: generateNotificationMessage(),
        timestamp: new Date().toISOString(),
        read: false,
        priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
        actionable: Math.random() > 0.7
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      
      // Show toast for high priority notifications
      if (newNotification.priority === 'critical' || newNotification.priority === 'high') {
        toast({
          title: newNotification.title,
          description: newNotification.message,
          variant: newNotification.type === 'threat' ? 'destructive' : 'default'
        });
      }
    }, 15000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const generateNotificationTitle = () => {
    const titles = [
      'Malware Signature Updated',
      'Network Anomaly Detected', 
      'Threat Model Updated',
      'Security Patch Available',
      'Suspicious Activity Blocked',
      'AI Model Retrained',
      'Zero-Day Vulnerability Detected'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const generateNotificationMessage = () => {
    const messages = [
      'AI ensemble detected unusual network patterns requiring investigation.',
      'Machine learning models identified potential security breach attempt.',
      'Automated countermeasures successfully neutralized incoming threat.',
      'Real-time threat intelligence updated with latest IOCs.',
      'Behavioral analysis detected anomalous user activity patterns.',
      'Predictive algorithms identified potential future attack vector.',
      'System health metrics indicate optimal defensive posture.'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'threat': return AlertTriangle;
      case 'success': return Shield;
      case 'warning': return Zap;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'critical') return 'bg-red-600/20 text-red-300 border-red-600/30';
    switch (type) {
      case 'threat': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'success': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'warning': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs p-0 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-96 z-50 glass-effect border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center justify-between">
              <span className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Notifications
              </span>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{unreadCount} unread</Badge>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          notification.read
                            ? 'bg-muted/5 border-border/20'
                            : 'bg-muted/10 border-border/40 hover:border-primary/30'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <Badge className={getNotificationColor(notification.type, notification.priority)}>
                              {notification.priority.toUpperCase()}
                            </Badge>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(notification.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </span>
                          {notification.actionable && (
                            <Button variant="outline" size="sm" className="text-xs">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
