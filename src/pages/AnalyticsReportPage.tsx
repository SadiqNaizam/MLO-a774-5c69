import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';


const salesByProductData = [
  { product: 'Product A', sales: 4000, units: 240 },
  { product: 'Product B', sales: 3000, units: 139 },
  { product: 'Product C', sales: 2000, units: 980 },
  { product: 'Product D', sales: 2780, units: 390 },
  { product: 'Product E', sales: 1890, units: 480 },
];

const trafficSourceData = [
  { name: 'Organic Search', value: 400, fill: 'var(--color-organic)' },
  { name: 'Direct', value: 300, fill: 'var(--color-direct)' },
  { name: 'Referral', value: 200, fill: 'var(--color-referral)' },
  { name: 'Social Media', value: 278, fill: 'var(--color-social)' },
];
const chartConfigTraffic = {
  organic: { label: "Organic", color: "hsl(var(--chart-1))" },
  direct: { label: "Direct", color: "hsl(var(--chart-2))" },
  referral: { label: "Referral", color: "hsl(var(--chart-3))" },
  social: { label: "Social", color: "hsl(var(--chart-4))" },
};
const chartConfigSales = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
  units: { label: "Units", color: "hsl(var(--chart-2))" },
};


const AnalyticsReportPage = () => {
  console.log('AnalyticsReportPage loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 1, 20),
  });
  const [reportType, setReportType] = useState('sales-by-product');
  const handleToggleSidebar = () => console.log("Toggle sidebar clicked");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} appName="Analytics & Reports" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <Card>
            <CardHeader>
              <CardTitle>Data Analytics</CardTitle>
              <CardDescription>Explore detailed reports and gain insights into your business performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full sm:w-[250px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales-by-product">Sales by Product</SelectItem>
                    <SelectItem value="traffic-sources">Traffic Sources</SelectItem>
                    <SelectItem value="customer-demographics">Customer Demographics (Placeholder)</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[300px] justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button>Generate Report</Button>
                <Button variant="outline" className="ml-auto">
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
              </div>

              {reportType === 'sales-by-product' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Product</CardTitle>
                    <CardDescription>Showing sales performance for top products.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfigSales} className="h-[350px] w-full mb-6">
                       <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesByProductData} margin={{ top: 5, right: 20, bottom: 5, left: -10 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                          <XAxis dataKey="product" tickLine={false} axisLine={false} tickMargin={8} />
                          <YAxis yAxisId="left" orientation="left" stroke="var(--color-sales)" tickLine={false} axisLine={false} tickMargin={8}/>
                          <YAxis yAxisId="right" orientation="right" stroke="var(--color-units)" tickLine={false} axisLine={false} tickMargin={8}/>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                          <Bar dataKey="sales" yAxisId="left" fill="var(--color-sales)" radius={4} />
                          <Bar dataKey="units" yAxisId="right" fill="var(--color-units)" radius={4} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Units Sold</TableHead>
                          <TableHead className="text-right">Total Sales</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {salesByProductData.map((item) => (
                          <TableRow key={item.product}>
                            <TableCell className="font-medium">{item.product}</TableCell>
                            <TableCell className="text-right">{item.units}</TableCell>
                            <TableCell className="text-right">${item.sales.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {reportType === 'traffic-sources' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Breakdown of website traffic by source.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <ChartContainer config={chartConfigTraffic} className="mx-auto aspect-square h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                          <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label >
                             {trafficSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
               {reportType === 'customer-demographics' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Demographics</CardTitle>
                    <CardDescription>Placeholder for customer demographics data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Customer demographics chart and table would be displayed here.</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsReportPage;