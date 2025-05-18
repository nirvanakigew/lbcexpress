import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Download, Calendar, TrendingUp, Truck, Package, Clock, Map, Ship, Plane } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock data for analytics - this would be replaced with actual API calls
const performanceData = [
  { name: 'Jan', deliveries: 65, onTime: 60, delayed: 5 },
  { name: 'Feb', deliveries: 75, onTime: 65, delayed: 10 },
  { name: 'Mar', deliveries: 85, onTime: 80, delayed: 5 },
  { name: 'Apr', deliveries: 90, onTime: 85, delayed: 5 },
  { name: 'May', deliveries: 100, onTime: 92, delayed: 8 },
  { name: 'Jun', deliveries: 120, onTime: 110, delayed: 10 },
  { name: 'Jul', deliveries: 110, onTime: 100, delayed: 10 },
  { name: 'Aug', deliveries: 125, onTime: 115, delayed: 10 },
  { name: 'Sep', deliveries: 130, onTime: 120, delayed: 10 },
  { name: 'Oct', deliveries: 140, onTime: 130, delayed: 10 },
  { name: 'Nov', deliveries: 150, onTime: 145, delayed: 5 },
  { name: 'Dec', deliveries: 180, onTime: 170, delayed: 10 }
];

const shippingMethodData = [
  { name: 'Standard', value: 400 },
  { name: 'Express', value: 300 },
  { name: 'Same Day', value: 150 },
  { name: 'International', value: 100 }
];

const statusDistributionData = [
  { name: 'Delivered', value: 650, color: '#4ade80' },
  { name: 'In Transit', value: 250, color: '#60a5fa' },
  { name: 'Processing', value: 120, color: '#a78bfa' },
  { name: 'On Hold', value: 80, color: '#94a3b8' },
  { name: 'Cancelled', value: 30, color: '#f87171' }
];

const regionPerformanceData = [
  { region: 'Manila', deliveries: 350, onTimeRate: 92 },
  { region: 'Cebu', deliveries: 280, onTimeRate: 88 },
  { region: 'Davao', deliveries: 220, onTimeRate: 90 },
  { region: 'Baguio', deliveries: 150, onTimeRate: 85 },
  { region: 'Iloilo', deliveries: 120, onTimeRate: 89 },
  { region: 'Cagayan de Oro', deliveries: 110, onTimeRate: 87 },
  { region: 'Bacolod', deliveries: 100, onTimeRate: 86 },
  { region: 'Zamboanga', deliveries: 80, onTimeRate: 84 }
];

const operationalMetrics = [
  { metric: 'Average Delivery Time', value: '2.3 days', change: '-0.4', trend: 'down' },
  { metric: 'On-Time Delivery Rate', value: '91.2%', change: '+2.1', trend: 'up' },
  { metric: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up' },
  { metric: 'Operational Efficiency', value: '87%', change: '+3.4', trend: 'up' }
];

export default function Analytics() {
  const [timeFrame, setTimeFrame] = useState("month");
  const [logout, setLogout] = useState(false);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("lbc_admin");
    setLogout(true);
    window.location.href = "/admin";
  };
  
  // Function to get date range for filtering
  const getDateRange = () => {
    const today = new Date();
    switch (timeFrame) {
      case "week":
        return { start: subDays(today, 7), end: today };
      case "month":
        return { start: startOfMonth(today), end: endOfMonth(today) };
      case "year":
        return { start: startOfYear(today), end: endOfYear(today) };
      default:
        return { start: startOfMonth(today), end: endOfMonth(today) };
    }
  };
  
  const { start, end } = getDateRange();
  
  // Get orders data - would normally fetch from API
  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/orders"],
    retry: false,
    
    // We would normally filter on the backend, but using mock data here
    select: (data) => {
      return {
        orderCount: performanceData.reduce((sum, month) => sum + month.deliveries, 0),
        onTimeRate: (performanceData.reduce((sum, month) => sum + month.onTime, 0) / 
                     performanceData.reduce((sum, month) => sum + month.deliveries, 0) * 100).toFixed(1),
        orders: data || []
      };
    }
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Shipping Analytics & Reports</h1>
            <div className="flex items-center space-x-4">
              <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time frame" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                <Package className="h-4 w-4 text-lbc-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : orders?.orderCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {format(start, "MMM d, yyyy")} - {format(end, "MMM d, yyyy")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
                <Clock className="h-4 w-4 text-lbc-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : `${orders?.onTimeRate}%` || "0%"}</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from previous period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                <Truck className="h-4 w-4 text-lbc-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 days</div>
                <p className="text-xs text-muted-foreground">
                  -0.4 days from previous period
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
                <Map className="h-4 w-4 text-lbc-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  Across the Philippines
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="performance">Delivery Performance</TabsTrigger>
              <TabsTrigger value="methods">Shipping Methods</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
              <TabsTrigger value="operational">Operational Metrics</TabsTrigger>
            </TabsList>
            
            {/* Delivery Performance Dashboard */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Monthly Delivery Performance</CardTitle>
                    <CardDescription>
                      Analysis of on-time vs. delayed deliveries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => `${value} packages`} />
                          <Legend />
                          <Bar dataKey="onTime" name="On-Time Deliveries" fill="#4ade80" stackId="a" />
                          <Bar dataKey="delayed" name="Delayed Deliveries" fill="#f87171" stackId="a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Status Distribution</CardTitle>
                    <CardDescription>
                      Current order status breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Tooltip formatter={(value) => `${value} packages`} />
                          <Pie
                            data={statusDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Shipping Methods Analysis */}
            <TabsContent value="methods" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Shipping Method Distribution</CardTitle>
                    <CardDescription>
                      Analysis of shipping method usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Tooltip formatter={(value) => `${value} packages`} />
                          <Pie
                            data={shippingMethodData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#4ade80" />
                            <Cell fill="#60a5fa" />
                            <Cell fill="#a78bfa" />
                            <Cell fill="#f97316" />
                          </Pie>
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Transport Mode</CardTitle>
                    <CardDescription>
                      Breakdown by transportation method
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-lbc-red" />
                          <span>Road</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                            <div className="h-full bg-lbc-red rounded-full" style={{ width: '65%' }} />
                          </div>
                          <span className="text-sm">65%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Ship className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Sea</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }} />
                          </div>
                          <span className="text-sm">20%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Plane className="h-5 w-5 mr-2 text-indigo-500" />
                          <span>Air</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '15%' }} />
                          </div>
                          <span className="text-sm">15%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Regional Analysis */}
            <TabsContent value="regional" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Regional Delivery Performance</CardTitle>
                    <CardDescription>
                      Analysis by geographic region
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={regionPerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="region" width={150} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="deliveries" name="Total Deliveries" fill="#60a5fa" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>On-Time Rate by Region</CardTitle>
                    <CardDescription>
                      Percentage of on-time deliveries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={regionPerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis domain={[80, 100]} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Line
                            type="monotone"
                            dataKey="onTimeRate"
                            name="On-Time Rate"
                            stroke="#4ade80"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Operational Metrics */}
            <TabsContent value="operational" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Operational Metrics</CardTitle>
                    <CardDescription>
                      Performance indicators over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      {operationalMetrics.map((metric, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{metric.metric}</span>
                            <div className="flex items-center">
                              <span className="font-bold">{metric.value}</span>
                              <span className={`text-xs ml-2 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {metric.change}%
                                {metric.trend === 'up' ? 
                                  <TrendingUp className="h-3 w-3 inline-block ml-1" /> : 
                                  <TrendingUp className="h-3 w-3 inline-block ml-1 transform rotate-180" />
                                }
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                index === 0 ? 'bg-blue-500' : 
                                index === 1 ? 'bg-green-500' : 
                                index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                              }`} 
                              style={{ width: `${metric.value.includes('%') ? parseFloat(metric.value) : (parseFloat(metric.value) / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>
                      Year-over-year comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="deliveries" 
                            name="Total Deliveries" 
                            stroke="#60a5fa" 
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="onTime" 
                            name="On-Time Deliveries" 
                            stroke="#4ade80" 
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}