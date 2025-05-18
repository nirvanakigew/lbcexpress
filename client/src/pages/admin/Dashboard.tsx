import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CreateOrderForm from "@/components/admin/CreateOrderForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, Clock, Truck, Ban, Calendar, DollarSign, User, ChevronRight, ScrollText } from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("lbc_admin");
    setLocation("/admin");
  };

  // Get admin user from localStorage
  const adminUser = JSON.parse(localStorage.getItem("lbc_admin") || "{}");

  // Query for fetching orders data
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['/api/orders'],
  });

  // Calculate dashboard metrics
  const calculateMetrics = () => {
    if (!orders) return {
      total: 0,
      pending: 0,
      inTransit: 0,
      delivered: 0,
      onHold: 0
    };

    const total = orders.length;
    const pending = orders.filter((order: any) => order.status === "Pending").length;
    const inTransit = orders.filter((order: any) => 
      order.status === "In Transit" || order.status === "Out for Delivery"
    ).length;
    const delivered = orders.filter((order: any) => order.status === "Delivered").length;
    const onHold = orders.filter((order: any) => order.status === "On Hold").length;

    return { total, pending, inTransit, delivered, onHold };
  };

  const metrics = calculateMetrics();

  // Chart data
  const orderStatusData = [
    { name: 'Pending', value: metrics.pending, color: '#f59e0b' },
    { name: 'In Transit', value: metrics.inTransit, color: '#3b82f6' },
    { name: 'Delivered', value: metrics.delivered, color: '#10b981' },
    { name: 'On Hold', value: metrics.onHold, color: '#6b7280' },
  ];

  const weeklyActivityData = [
    { name: 'Mon', orders: 12, deliveries: 8 },
    { name: 'Tue', orders: 19, deliveries: 10 },
    { name: 'Wed', orders: 15, deliveries: 12 },
    { name: 'Thu', orders: 25, deliveries: 18 },
    { name: 'Fri', orders: 32, deliveries: 24 },
    { name: 'Sat', orders: 18, deliveries: 16 },
    { name: 'Sun', orders: 10, deliveries: 8 },
  ];

  const shippingMethodsData = [
    { name: 'Express', count: 62 },
    { name: 'Standard', count: 85 },
    { name: 'International', count: 32 },
    { name: 'Same Day', count: 24 },
  ];

  // Recent orders for the dashboard
  const recentOrders = orders?.slice(0, 5) || [];

  if (isOrdersLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 text-lbc-red animate-spin" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {adminUser.name}</p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setIsCreateOrderOpen(true)}
                className="bg-lbc-red hover:bg-lbc-dark-red"
              >
                Create Order
              </Button>
              <div className="md:hidden">
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.total}</div>
                    <p className="text-xs text-muted-foreground">
                      Lifetime orders processed
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.inTransit}</div>
                    <p className="text-xs text-muted-foreground">
                      Packages currently in transit
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.delivered}</div>
                    <p className="text-xs text-muted-foreground">
                      Successfully delivered packages
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">On Hold</CardTitle>
                    <Ban className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.onHold}</div>
                    <p className="text-xs text-muted-foreground">
                      Packages awaiting clearance
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts & Recent Orders Section */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Status Pie Chart */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Order Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={orderStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {orderStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                          No recent orders to display
                        </div>
                      ) : (
                        recentOrders.map((order: any) => (
                          <div key={order.id} className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <p className="text-sm font-medium">{order.recipientName}</p>
                                <p className="text-xs text-gray-500">{order.trackingNumber}</p>
                              </div>
                            </div>
                            <div>
                              <Badge className={
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "In Transit" || order.status === "Out for Delivery"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "On Hold"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-red-100 text-red-800"
                              }>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => setLocation("/admin/orders")}
                      >
                        View All Orders
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
                    <ScrollText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₱328,540</div>
                    <p className="text-xs text-muted-foreground">
                      +8.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground">
                      +22 in the last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">
                      Scheduled for today
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Weekly Activity Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={weeklyActivityData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="orders" stroke="#c9093b" name="New Orders" />
                          <Line type="monotone" dataKey="deliveries" stroke="#0095da" name="Deliveries" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Methods Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={shippingMethodsData}
                          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#0095da" name="Orders" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Create Order Modal */}
      <CreateOrderForm
        open={isCreateOrderOpen}
        onClose={() => setIsCreateOrderOpen(false)}
      />
    </div>
  );
}
