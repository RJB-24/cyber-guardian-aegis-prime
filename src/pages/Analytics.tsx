
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Download, Calendar, Filter, BarChart3, PieChart } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [reportType, setReportType] = useState('overview');

  // Mock data generation
  const threatTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    threats: Math.floor(Math.random() * 50) + 10,
    prevented: Math.floor(Math.random() * 45) + 15,
    neutralized: Math.floor(Math.random() * 40) + 20
  }));

  const performanceMetrics = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    responseTime: Math.floor(Math.random() * 10) + 5,
    accuracy: Math.floor(Math.random() * 5) + 95,
    throughput: Math.floor(Math.random() * 1000) + 500
  }));

  const threatDistribution = [
    { category: 'Malware', count: 145, percentage: 35 },
    { category: 'Phishing', count: 98, percentage: 24 },
    { category: 'DDoS', count: 76, percentage: 18 },
    { category: 'Zero-Day', count: 45, percentage: 11 },
    { category: 'Insider Threat', count: 32, percentage: 8 },
    { category: 'APT', count: 18, percentage: 4 }
  ];

  const predictiveAccuracy = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    accuracy: Math.floor(Math.random() * 5) + 94,
    falsePositives: Math.floor(Math.random() * 3) + 1,
    predictions: Math.floor(Math.random() * 200) + 100
  }));

  const exportReport = (format: string) => {
    console.log(`Exporting ${reportType} report in ${format} format for ${timeRange} period`);
    // Simulate export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground">Comprehensive system performance and threat intelligence analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 p-4 bg-card/30 rounded-lg border border-border/50">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Time Range:</span>
          <div className="flex space-x-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'outline'}
                onClick={() => setTimeRange(range)}
                className={timeRange === range ? 'bg-primary text-black' : ''}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Report Type:</span>
          <div className="flex space-x-1">
            {['overview', 'threats', 'performance'].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={reportType === type ? 'default' : 'outline'}
                onClick={() => setReportType(type)}
                className={reportType === type ? 'bg-primary text-black' : ''}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Threats Detected</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">↑ 12%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prevention Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">99.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">↑ 0.3%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">False Positive Rate</CardTitle>
            <PieChart className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">0.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">↓ 40%</span> reduction achieved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">6.8ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">↓ 15%</span> faster response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Threat Detection Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatTrends.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Area type="monotone" dataKey="threats" stackId="1" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
                <Area type="monotone" dataKey="prevented" stackId="1" stroke="#39FF14" fill="#39FF14" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">System Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Line type="monotone" dataKey="responseTime" stroke="#FBB036" strokeWidth={2} />
                <Line type="monotone" dataKey="accuracy" stroke="#39FF14" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Threat Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {threatDistribution.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#FF6B6B', '#FBB036', '#39FF14', '#00BFFF', '#FF1493', '#9370DB'][index] }}></div>
                    <span className="text-sm text-foreground">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Predictive Model Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={predictiveAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Scatter dataKey="accuracy" fill="#39FF14" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Summary */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Threat Landscape</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 247% increase in advanced persistent threats</li>
                <li>• Zero-day exploits detected 4.2 hours before execution</li>
                <li>• 99.4% successful threat neutralization rate</li>
                <li>• 40% reduction in false positives this quarter</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">System Performance</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Average response time: 6.8ms (15% improvement)</li>
                <li>• 99.8% system uptime maintained</li>
                <li>• Processing 2.3M events per second</li>
                <li>• 96.8% prediction accuracy achieved</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Key Achievements</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Prevented $2.4M in potential damages</li>
                <li>• Deployed 1,247 autonomous countermeasures</li>
                <li>• Detected 15 novel attack vectors</li>
                <li>• Enhanced ML models with 99.2% accuracy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
