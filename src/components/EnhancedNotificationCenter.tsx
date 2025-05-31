
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, AlertTriangle, Shield, Info, CheckCircle, X, Settings } from 'lucide-react';

interface Notification {
  id: string;
  type: 'threat' | 'countermeasure' | 'system' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

export const EnhancedNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread' | 'threats' | 'system'>('all');

  useEffect(() => {
    // Initialize with sample notifications
    const initialNotifications: Notification[] = [
      {
        id: '1',
        type: 'threat',
        severity: 'critical',
        title: 'Critical Threat Detected',
        message: 'Advanced Persistent Threat detected targeting user credentials. Immediate action required.',
        timestamp: new Date().toISOString(),
        read: false,
        actionRequired: true
      },
      {
        id: '2',
        type: 'countermeasure',
        severity: 'high',
        title: 'Countermeasure Deployed',
        message: 'Firewall rules updated to block suspicious IP range 192.168.100.0/24',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        read: false,
        actionRequired: false
      },
      {
        id: '3',
        type: 'system',
        severity: 'medium',
        title: 'AI Model Updated',
        message: 'LSTM threat detection model retrained with 99.2% accuracy improvement',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        read: true,
        actionRequired: false
      }
    ];

    setNotifications(initialNotifications);
    setUnreadCount(initialNotifications.filter(n => !n.read).length);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance of new notification
        const notificationTypes = ['threat', 'countermeasure', 'system', 'info'] as const;
        const severities = ['low', 'medium', 'high', 'critical'] as const;
        
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          title: getRandomTitle(),
          message: getRandomMessage(),
          timestamp: new Date().toISOString(),
          read: false,
          actionRequired: Math.random() < 0.3
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
        setUnreadCount(prev => prev + 1);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const getRandomTitle = () => {
    const titles = [
      'New Threat Vector Identified',
      'Security Policy Updated',
      'Anomaly Detection Alert',
      'System Health Check',
      'Vulnerability Assessment Complete',
      'Incident Response Activated',
      'AI Model Performance Update'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getRandomMessage = () => {
    const messages = [
      'Suspicious network activity detected from external source',
      'Automated response successfully neutralized potential threat',
      'Machine learning model confidence increased to 97.8%',
      'Regular security scan completed with no issues found',
      'New attack pattern added to threat intelligence database',
      'Emergency protocols initiated for critical infrastructure protection',
      'Predictive analysis identified potential zero-day exploit'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'countermeasure': return <Shield className="h-4 w-4 text-green-400" />;
      case 'system': return <Settings className="h-4 w-4 text-blue-400" />;
      case 'info': return <Info className="h-4 w-4 text-gray-400" />;
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

  const removeNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'threats': return notification.type === 'threat';
      case 'system': return notification.type === 'system';
      default: return true;
    }
  });

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            Security Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                {unreadCount} new
              </Badge>
            )}
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'threats', label: 'Threats' },
              { key: 'system', label: 'System' }
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.key as any)}
              >
                {filterOption.label}
              </Button>
            ))}
          </div>

          {/* Notifications List */}
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications match your filter</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 bg-muted/10 rounded-lg border transition-all hover:border-primary/30 ${
                      !notification.read ? 'border-primary/20 bg-primary/5' : 'border-border/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getTypeIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-foreground truncate">
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2 ml-2">
                              <Badge className={getSeverityColor(notification.severity)}>
                                {notification.severity.toUpperCase()}
                              </Badge>
                              {notification.actionRequired && (
                                <Badge variant="destructive" className="text-xs">
                                  ACTION REQUIRED
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 px-2 text-xs"
                                >
                                  Mark Read
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeNotification(notification.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
