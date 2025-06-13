
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Shield, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: string;
  type: 'threat' | 'countermeasure' | 'system' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const NotificationButton = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initialize with sample notifications
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'threat',
        severity: 'critical',
        title: 'Critical Threat Detected',
        message: 'Advanced Persistent Threat targeting user credentials detected and neutralized.',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: '2',
        type: 'countermeasure',
        severity: 'high',
        title: 'Countermeasure Deployed',
        message: 'Firewall rules updated to block suspicious IP range.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: false
      },
      {
        id: '3',
        type: 'system',
        severity: 'medium',
        title: 'AI Model Updated',
        message: 'LSTM threat detection model retrained with improved accuracy.',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        read: true
      }
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.read).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['threat', 'countermeasure', 'system', 'info'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          title: getRandomTitle(),
          message: getRandomMessage(),
          timestamp: new Date().toISOString(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
        setUnreadCount(prev => prev + 1);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getRandomTitle = () => {
    const titles = [
      'New Threat Vector Identified',
      'Security Policy Updated',
      'Anomaly Detection Alert',
      'System Health Check Complete',
      'Vulnerability Assessment Update',
      'Incident Response Activated'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomMessage = () => {
    const messages = [
      'Suspicious network activity detected and analyzed.',
      'Automated response successfully neutralized potential threat.',
      'Machine learning model confidence increased to 97.8%.',
      'Regular security scan completed with no critical issues.',
      'New attack pattern added to threat intelligence database.',
      'Emergency protocols activated for infrastructure protection.'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'countermeasure': return <Shield className="h-4 w-4 text-green-400" />;
      case 'system': return <Info className="h-4 w-4 text-blue-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowPanel(!showPanel)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showPanel && (
        <div className="absolute right-0 top-12 z-50 w-96">
          <Card className="glass-effect border-primary/20 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center justify-between">
                <span className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">
                      {unreadCount} new
                    </Badge>
                  )}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPanel(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 bg-muted/10 rounded-lg border transition-all hover:border-primary/30 cursor-pointer ${
                        !notification.read ? 'border-primary/20 bg-primary/5' : 'border-border/30'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-foreground truncate">
                              {notification.title}
                            </h4>
                            <Badge className={getSeverityColor(notification.severity)}>
                              {notification.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
