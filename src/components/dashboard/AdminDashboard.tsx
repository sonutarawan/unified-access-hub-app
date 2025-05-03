
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ShoppingBag, Store, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

// Sample data for demonstration
const platformStats = [
  { name: "Users", count: 4289, icon: Users, change: 12.5, changeType: "increase" },
  { name: "Products", count: 2150, icon: ShoppingBag, change: 8.2, changeType: "increase" },
  { name: "Sellers", count: 185, icon: Store, change: 5.1, changeType: "increase" },
  { name: "Issues", count: 23, icon: AlertCircle, change: 2.3, changeType: "decrease" },
];

const userGrowthData = [
  { name: "Jan", users: 1400 },
  { name: "Feb", users: 1800 },
  { name: "Mar", users: 2200 },
  { name: "Apr", users: 2400 },
  { name: "May", users: 2800 },
  { name: "Jun", users: 3200 },
  { name: "Jul", users: 3600 },
];

const revenueData = [
  { name: "Jan", buyers: 18400, sellers: 1400 },
  { name: "Feb", buyers: 21800, sellers: 1800 },
  { name: "Mar", buyers: 17200, sellers: 2200 },
  { name: "Apr", buyers: 24400, sellers: 2400 },
  { name: "May", buyers: 28800, sellers: 2800 },
  { name: "Jun", buyers: 32200, sellers: 3200 },
  { name: "Jul", buyers: 36600, sellers: 3600 },
];

const recentIssues = [
  {
    id: "ISS-5812",
    title: "Payment processing error on checkout",
    severity: "high",
    reported: "2 hours ago",
    status: "open",
  },
  {
    id: "ISS-5811",
    title: "Product images not loading properly",
    severity: "medium",
    reported: "5 hours ago",
    status: "investigating",
  },
  {
    id: "ISS-5810",
    title: "Seller unable to update inventory",
    severity: "medium",
    reported: "Yesterday",
    status: "in progress",
  },
  {
    id: "ISS-5809",
    title: "Search functionality returning incorrect results",
    severity: "low",
    reported: "2 days ago",
    status: "resolved",
  },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.name}. Here's an overview of the platform.
        </p>
      </div>
      
      {/* Platform Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span 
                  className={`${
                    stat.changeType === "increase" ? "text-emerald-500" : "text-red-500"
                  } font-medium inline-flex items-center`}
                >
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* User Growth & Revenue Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userGrowthData}
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
                    dataKey="users"
                    stroke="hsl(var(--admin))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
            <CardDescription>Buyers vs Sellers revenue contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
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
                  <Bar dataKey="buyers" fill="hsl(var(--buyer))" name="Buyers" />
                  <Bar dataKey="sellers" fill="hsl(var(--seller))" name="Sellers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Issues */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Platform issues that require attention</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div 
                key={issue.id}
                className="flex items-start justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {issue.id}
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        issue.severity === "high" ? "bg-red-100 text-red-800" :
                        issue.severity === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </p>
                  <p className="text-sm">{issue.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Reported {issue.reported}</p>
                </div>
                <div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      issue.status === "open" ? "bg-red-100 text-red-800" :
                      issue.status === "investigating" ? "bg-yellow-100 text-yellow-800" :
                      issue.status === "in progress" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
