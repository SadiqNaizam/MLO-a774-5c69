import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Search, UserPlus, Eye } from 'lucide-react';

const sampleCustomers = [
  { id: 'CUST001', name: 'Alice Wonderland', email: 'alice@example.com', joinDate: '2023-01-15', totalOrders: 5, totalSpent: '$350.00', avatarUrl: 'https://via.placeholder.com/40?text=AW' },
  { id: 'CUST002', name: 'Bob The Builder', email: 'bob@example.com', joinDate: '2023-03-22', totalOrders: 2, totalSpent: '$120.50', avatarUrl: 'https://via.placeholder.com/40?text=BB' },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2023-05-10', totalOrders: 8, totalSpent: '$780.00', avatarUrl: 'https://via.placeholder.com/40?text=CB' },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana@example.com', joinDate: '2023-07-01', totalOrders: 3, totalSpent: '$210.75', avatarUrl: 'https://via.placeholder.com/40?text=DP' },
];
type Customer = typeof sampleCustomers[0];

const CustomerManagementPage = () => {
  console.log('CustomerManagementPage loaded');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const handleToggleSidebar = () => console.log("Toggle sidebar clicked");

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} appName="Customer Management" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Customers</CardTitle>
                  <CardDescription>View and manage your customer base.</CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add Customer
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                 <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search customers by name, email..." className="pl-8 w-full" />
                </div>
                <Button variant="outline">Search</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">{customer.totalSpent}</TableCell>
                      <TableCell className="text-center">
                        <DialogTrigger asChild onClick={() => setSelectedCustomer(customer)}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </DialogTrigger>
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
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
            </CardFooter>
          </Card>

          {selectedCustomer && (
            <Dialog open={!!selectedCustomer} onOpenChange={(isOpen) => !isOpen && setSelectedCustomer(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Customer Details</DialogTitle>
                  <DialogDescription>Information for {selectedCustomer.name}.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} />
                      <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-lg">{selectedCustomer.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <p><strong>Customer ID:</strong> {selectedCustomer.id}</p>
                  <p><strong>Join Date:</strong> {selectedCustomer.joinDate}</p>
                  <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                  <p><strong>Total Spent:</strong> {selectedCustomer.totalSpent}</p>
                  <p className="font-semibold mt-2">Purchase History (Placeholder):</p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Order #ORDXYZ - $50.00</li>
                    <li>Order #ORDABC - $120.75</li>
                  </ul>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
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

export default CustomerManagementPage;