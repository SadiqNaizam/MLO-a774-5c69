import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Basic usage, not full react-hook-form setup
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Search, PlusCircle, Edit, Trash2, Filter } from 'lucide-react';

const sampleProducts = [
  { id: 'PROD001', name: 'Wireless Headphones', category: 'Electronics', price: '$99.99', stock: 150, status: true },
  { id: 'PROD002', name: 'Organic Green Tea', category: 'Groceries', price: '$12.50', stock: 50, status: true },
  { id: 'PROD003', name: 'Leather Backpack', category: 'Fashion', price: '$75.00', stock: 0, status: false },
  { id: 'PROD004', name: 'Smart Thermostat', category: 'Home Goods', price: '$129.00', stock: 75, status: true },
];

type Product = typeof sampleProducts[0];

const ProductManagementPage = () => {
  console.log('ProductManagementPage loaded');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const handleToggleSidebar = () => console.log("Toggle sidebar clicked");

  const openAddProductSheet = () => {
    setEditingProduct(null);
    setIsSheetOpen(true);
  };

  const openEditProductSheet = (product: Product) => {
    setEditingProduct(product);
    setIsSheetOpen(true);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} appName="Product Management" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Products</CardTitle>
                  <CardDescription>Add, edit, and manage your product catalog.</CardDescription>
                </div>
                <Button onClick={openAddProductSheet}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products by name, SKU..." className="pl-8 w-full sm:w-[300px]" />
                </div>
                <Select defaultValue="all-categories">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="home-goods">Home Goods</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Apply Filters</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.stock > 0 ? product.stock : <Badge variant="destructive">Out of Stock</Badge>}</TableCell>
                      <TableCell><Badge variant={product.status ? 'default' : 'secondary'}>{product.status ? 'Active' : 'Inactive'}</Badge></TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => openEditProductSheet(product)}>
                          <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
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
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
            </CardFooter>
          </Card>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</SheetTitle>
                <SheetDescription>
                  {editingProduct ? 'Update details for the existing product.' : 'Fill in the form to add a new product to your catalog.'}
                </SheetDescription>
              </SheetHeader>
              {/* Basic form structure; full react-hook-form setup is more involved */}
              <div className="grid gap-4 py-4">
                <Form> {/* Shadcn Form component, actual logic with useForm would be here */}
                  <FormField name="productName" render={() => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl><Input defaultValue={editingProduct?.name || ''} placeholder="e.g., Wireless Mouse" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="category" render={() => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                       <Select defaultValue={editingProduct?.category || ''}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="groceries">Groceries</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="home-goods">Home Goods</SelectItem>
                        </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField name="price" render={() => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl><Input type="number" defaultValue={editingProduct?.price.replace('$', '') || ''} placeholder="e.g., 29.99" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="stock" render={() => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl><Input type="number" defaultValue={editingProduct?.stock || 0} placeholder="e.g., 100" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="description" render={() => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Textarea defaultValue={editingProduct ? 'Description for ' + editingProduct.name : ''} placeholder="Detailed product description..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="status" render={() => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
                       <div className="space-y-0.5">
                          <FormLabel>Active Status</FormLabel>
                       </div>
                      <FormControl><Switch defaultChecked={editingProduct?.status || true} /></FormControl>
                    </FormItem>
                  )} />
                </Form>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" onClick={() => setIsSheetOpen(false)}>Save Product</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </main>
      </div>
    </div>
  );
};

export default ProductManagementPage;