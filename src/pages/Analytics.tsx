import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Download, Calendar, Filter, BarChart3, PieChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

  const exportToCsv = (data: any[], filename: string) => {
    try {
      let csvContent = '';
      
      if (reportType === 'overview') {
        // Export comprehensive overview data
        csvContent = 'Report Type,Metric,Value,Period\n';
        csvContent += `Overview,Total Threats Detected,1247,${timeRange}\n`;
        csvContent += `Overview,Prevention Rate,99.4%,${timeRange}\n`;
        csvContent += `Overview,False Positive Rate,0.6%,${timeRange}\n`;
        csvContent += `Overview,Average Response Time,6.8ms,${timeRange}\n`;
        
        // Add threat distribution
        csvContent += '\nThreat Distribution\n';
        csvContent += 'Category,Count,Percentage\n';
        threatDistribution.forEach(item => {
          csvContent += `${item.category},${item.count},${item.percentage}%\n`;
        });
        
        // Add threat trends
        csvContent += '\nThreat Trends\n';
        csvContent += 'Date,Threats Detected,Threats Prevented,Threats Neutralized\n';
        threatTrends.slice(-14).forEach(item => {
          csvContent += `${item.date},${item.threats},${item.prevented},${item.neutralized}\n`;
        });
        
      } else if (reportType === 'threats') {
        csvContent = 'Date,Threats Detected,Threats Prevented,Threats Neutralized\n';
        threatTrends.forEach(item => {
          csvContent += `${item.date},${item.threats},${item.prevented},${item.neutralized}\n`;
        });
      } else if (reportType === 'performance') {
        csvContent = 'Hour,Response Time (ms),Accuracy (%),Throughput\n';
        performanceMetrics.forEach(item => {
          csvContent += `${item.hour},${item.responseTime},${item.accuracy},${item.throughput}\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Successful",
        description: `${filename} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export CSV file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const exportToPdf = (format: string) => {
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>AEGIS Analytics Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
            .chart-section { margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .summary { background: #e8f4fd; padding: 15px; margin: 20px 0; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AEGIS Cybersecurity Analytics Report</h1>
            <p>Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} | Period: ${timeRange}</p>
            <p>Generated: ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="summary">
            <h2>Key Performance Indicators</h2>
            <div class="metric"><strong>Total Threats Detected:</strong> 1,247 (↑ 12% improvement)</div>
            <div class="metric"><strong>Prevention Rate:</strong> 99.4% (↑ 0.3% improvement)</div>
            <div class="metric"><strong>False Positive Rate:</strong> 0.6% (↓ 40% reduction)</div>
            <div class="metric"><strong>Average Response Time:</strong> 6.8ms (↓ 15% faster)</div>
          </div>

          <div class="chart-section">
            <h2>Threat Category Distribution</h2>
            <table>
              <tr><th>Category</th><th>Count</th><th>Percentage</th></tr>
              ${threatDistribution.map(item => `<tr><td>${item.category}</td><td>${item.count}</td><td>${item.percentage}%</td></tr>`).join('')}
            </table>
          </div>

          <div class="chart-section">
            <h2>Recent Threat Trends (Last 14 Days)</h2>
            <table>
              <tr><th>Date</th><th>Threats Detected</th><th>Prevented</th><th>Neutralized</th></tr>
              ${threatTrends.slice(-14).map(item => `<tr><td>${item.date}</td><td>${item.threats}</td><td>${item.prevented}</td><td>${item.neutralized}</td></tr>`).join('')}
            </table>
          </div>

          <div class="summary">
            <h2>Executive Summary</h2>
            <h3>Threat Landscape</h3>
            <ul>
              <li>247% increase in advanced persistent threats</li>
              <li>Zero-day exploits detected 4.2 hours before execution</li>
              <li>99.4% successful threat neutralization rate</li>
              <li>40% reduction in false positives this quarter</li>
            </ul>
            
            <h3>System Performance</h3>
            <ul>
              <li>Average response time: 6.8ms (15% improvement)</li>
              <li>99.8% system uptime maintained</li>
              <li>Processing 2.3M events per second</li>
              <li>96.8% prediction accuracy achieved</li>
            </ul>
            
            <h3>Key Achievements</h3>
            <ul>
              <li>Prevented $2.4M in potential damages</li>
              <li>Deployed 1,247 autonomous countermeasures</li>
              <li>Detected 15 novel attack vectors</li>
              <li>Enhanced ML models with 99.2% accuracy</li>
            </ul>
          </div>
        </body>
        </html>
      `;

      // Create and download PDF using print functionality
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for content to load then trigger print
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
        
        toast({
          title: "PDF Export Initiated",
          description: "PDF report is being generated. Use your browser's print dialog to save as PDF.",
        });
      } else {
        throw new Error("Failed to open print window");
      }
    } catch (error) {
      toast({
        title: "PDF Export Failed",
        description: "Failed to generate PDF report. Please ensure pop-ups are allowed and try again.",
        variant: "destructive"
      });
    }
  };

  const exportReport = (format: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `aegis-${reportType}-report-${timeRange}-${timestamp}`;
    
    if (format === 'csv') {
      exportToCsv([], `${filename}.csv`);
    } else if (format === 'pdf') {
      exportToPdf(format);
    }
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
