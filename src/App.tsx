import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import existing NotFound page (assumed)
import NotFound from "./pages/NotFound";

// Import new dashboard pages
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import OrdersManagementPage from "./pages/OrdersManagementPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import CustomerManagementPage from "./pages/CustomerManagementPage";
import AnalyticsReportPage from "./pages/AnalyticsReportPage";

// Placeholder for a potential login page (not generated in this task, but good for context)
// import LoginPage from "./pages/LoginPage"; 
// Placeholder for a potential main landing page if the app is not just a dashboard
// import Homepage from "./pages/Homepage"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Assuming a login page might be the very first route if not authenticated */}
          {/* <Route path="/login" element={<LoginPage />} /> */}

          {/* If there's a general homepage, it would be here */}
          {/* <Route path="/" element={<Homepage />} /> */}

          {/* Dashboard Routes */}
          {/* Set DashboardOverviewPage as the main route for /dashboard */}
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/dashboard/orders" element={<OrdersManagementPage />} />
          <Route path="/dashboard/products" element={<ProductManagementPage />} />
          <Route path="/dashboard/customers" element={<CustomerManagementPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsReportPage />} />
          
          {/* Example other routes if they existed - e.g. Account Settings from Header */}
          {/* <Route path="/account-settings" element={<AccountSettingsPage />} /> */}


          {/* Fallback/NotFound Route - should always be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;