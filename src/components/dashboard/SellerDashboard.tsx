
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Eye } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Sample data for demonstration
const salesData = [
  { name: "Jan", sales: 1400 },
  { name: "Feb", sales: 1800 },
  { name: "Mar", sales: 1200 },
  { name: "Apr", sales: 2400 },
  { name: "May", sales: 1800 },
  { name: "Jun", sales: 2400 },
  { name: "Jul", sales: 3000 },
];

const topProducts = [
  {
    id: 1,
    name: "Smart Watch Pro",
    price: 199.99,
    sold: 28,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=watch1"
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 89.99,
    sold: 24,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=speaker"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 129.99,
    sold: 22,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=earbuds"
  }
];

const recentOrders = [
  {
    id: "ORD-7291",
    customer: "John Doe",
    amount: 289.99,
    status: "completed",
    date: "Today, 2:30 PM"
  },
  {
    id: "ORD-7290",
    customer: "Jane Smith",
    amount: 129.99,
    status: "processing",
    date: "Today, 11:20 AM"
  },
  {
    id: "ORD-7289",
    customer: "Alex Johnson",
    amount: 199.99,
    status: "completed",
    date: "Yesterday, 3:15 PM"
  },
  {
    id: "ORD-7288",
    customer: "Emma Wilson",
    amount: 349.99,
    status: "shipped",
    date: "Yesterday, 10:45 AM"
  },
];

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name}. Here's what's happening with your store.
        </p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,458.90</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+82</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +9.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" /> +3
              </span>{" "}
              new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shop Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium inline-flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" /> -4.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Your sales performance over the past few months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="hsl(var(--seller))"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Orders and Top Products */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Products */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Your best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center p-4 border-b last:border-0"
                >
                  <div className="h-12 w-12 rounded bg-gray-100 mr-4 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-8 w-8 object-contain" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">${product.price}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{product.sold} sold</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50">
            <Button variant="ghost" className="w-full text-seller">
              View all products
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Orders */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-4 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.amount}</p>
                    <Badge 
                      variant={
                        order.status === "completed" ? "default" : 
                        order.status === "processing" ? "outline" : 
                        "secondary"
                      }
                      className={
                        order.status === "completed" ? "bg-green-500" : 
                        order.status === "processing" ? "border-yellow-500 text-yellow-500" :
                        ""
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50">
            <Button variant="ghost" className="w-full text-seller">
              View all orders
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
