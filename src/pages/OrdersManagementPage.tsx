import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, MoreHorizontal, Eye, FileText } from 'lucide-react';

const sampleOrders = [
  { id: 'ORD001', customer: 'Liam Johnson', email: 'liam@example.com', date: '2024-07-20', status: 'Delivered', total: '$150.00', items: [{name: 'Product A', qty: 2}, {name: 'Product B', qty: 1}]},
  { id: 'ORD002', customer: 'Olivia Smith', email: 'olivia@example.com', date: '2024-07-21', status: 'Processing', total: '$75.50', items: [{name: 'Product C', qty: 1}]},
  { id: 'ORD003', customer: 'Noah Brown', email: 'noah@example.com', date: '2024-07-22', status: 'Shipped', total: '$220.00', items: [{name: 'Product D', qty: 3}]},
  { id: 'ORD004', customer: 'Emma Davis', email: 'emma@example.com', date: '2024-07-23', status: 'Pending', total: '$45.99', items: [{name: 'Product E', qty: 1}]},
  { id: 'ORD005', customer: 'Ava Wilson', email: 'ava@example.com', date: '2024-07-24', status: 'Cancelled', total: '$99.00', items: [{name: 'Product F', qty: 2}]},
];

type Order = typeof sampleOrders[0];

const OrdersManagementPage = () => {
  console.log('OrdersManagementPage loaded');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const handleToggleSidebar = () => console.log("Toggle sidebar clicked");

  const statusVariant = (status: string) => {
    switch (status) {
      case 'Delivered': return 'default'; // Default is often green-ish or primary
      case 'Processing': return 'secondary'; // Secondary is often blue/yellow
      case 'Shipped': return 'outline'; // Outline for neutral-positive
      case 'Pending': return 'secondary'; // Orange/yellow for pending
      case 'Cancelled': return 'destructive'; // Red for destructive/cancelled
      default: return 'default';
    }
  };


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} appName="Order Management" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
              <CardDescription>View, search, and manage all customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders by ID, customer..." className="pl-8 w-full sm:w-[300px]" />
                </div>
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Apply Filters</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell><Badge variant={statusVariant(order.status)}>{order.status}</Badge></TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                      <TableCell className="text-center">
                        <DialogTrigger asChild onClick={() => setSelectedOrder(order)}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Order</span>
                          </Button>
                        </DialogTrigger>
                         <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Invoice</span>
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
               <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationEllipsis /></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>

          {selectedOrder && (
            <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                  <DialogDescription>Customer: {selectedOrder.customer} ({selectedOrder.email})</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Status:</strong> <Badge variant={statusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
                  <p><strong>Total:</strong> {selectedOrder.total}</p>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {selectedOrder.items.map(item => <li key={item.name}>{item.name} (Qty: {item.qty})</li>)}
                    </ul>
                  </div>
                   {/* Add more order details here */}
                </div>
                <DialogFooter>
                  <Select defaultValue={selectedOrder.status.toLowerCase()}>
                    <SelectTrigger className="w-[180px]">
                       <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={() => alert('Status update logic here')}>Update Status</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrdersManagementPage;