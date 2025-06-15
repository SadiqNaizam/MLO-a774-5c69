import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPIStatCard from '@/components/KPIStatCard';
import ActivityFeedListItem from '@/components/ActivityFeedListItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, LineChart, Line } from 'recharts'; // Assuming recharts for Chart
import { DollarSign, ShoppingCart, Users, Activity, TrendingUp, CreditCard } from 'lucide-react';

const salesData = [
  { date: 'Jan', sales: 4000 },
  { date: 'Feb', sales: 3000 },
  { date: 'Mar', sales: 5000 },
  { date: 'Apr', sales: 4500 },
  { date: 'May', sales: 6000 },
  { date: 'Jun', sales: 5500 },
];

const activityFeedItems = [
  { id: 1, user: { name: 'Olivia Martin', avatarUrl: 'https://via.placeholder.com/40?text=OM' }, action: 'placed a new order', target: '#12346', timestamp: '5m ago', icon: ShoppingCart },
  { id: 2, user: { name: 'Jackson Lee', avatarUrl: 'https://via.placeholder.com/40?text=JL' }, action: 'updated product stock', target: 'Eco-friendly Water Bottle', timestamp: '30m ago' },
  { id: 3, action: 'System Notification: Low stock warning for', target: 'Wireless Headphones', timestamp: '1h ago', icon: Activity },
  { id: 4, user: { name: 'Isabella Nguyen', avatarUrl: 'https://via.placeholder.com/40?text=IN' }, action: 'registered a new account', timestamp: '2h ago', icon: Users },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
};

const DashboardOverviewPage = () => {
  console.log('DashboardOverviewPage loaded');
  // Dummy handler for onToggleSidebar, actual implementation would involve state
  const handleToggleSidebar = () => console.log("Toggle sidebar clicked");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} appName="Dashboard Overview" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPIStatCard
              title="Total Revenue"
              value="$45,231.89"
              icon={DollarSign}
              description="+20.1% from last month"
              trend="up"
              trendValue="+20.1%"
            />
            <KPIStatCard
              title="New Orders"
              value="2,350"
              icon={ShoppingCart}
              description="+180.1% from last month"
              trend="up"
              trendValue="+180.1%"
            />
            <KPIStatCard
              title="Average Order Value"
              value="$125.50"
              icon={CreditCard}
              description="-2.5% from last month"
              trend="down"
              trendValue="-2.5%"
            />
            <KPIStatCard
              title="Active Users"
              value="850"
              icon={Users}
              description="+5% from last week"
              trend="up"
              trendValue="+5%"
            />
          </section>

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Line dataKey="sales" type="monotone" stroke="var(--color-sales)" strokeWidth={2} dot={true} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {activityFeedItems.map((item) => (
                      <ActivityFeedListItem
                        key={item.id}
                        id={item.id}
                        user={item.user}
                        action={item.action}
                        target={item.target}
                        timestamp={item.timestamp}
                        icon={item.icon}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;