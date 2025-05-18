import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Track from "@/pages/Track";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Orders from "@/pages/admin/Orders";
import Users from "@/pages/admin/Users";
import Analytics from "@/pages/admin/Analytics";
import { useState, useEffect } from "react";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const admin = localStorage.getItem("lbc_admin");
    if (admin) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/track" component={Track} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        {() => <Login setIsAuthenticated={setIsAuthenticated} />}
      </Route>
      
      <Route path="/admin/dashboard">
        {() => isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </Route>
      
      <Route path="/admin/orders">
        {() => isAuthenticated ? <Orders /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </Route>
      
      <Route path="/admin/users">
        {() => isAuthenticated ? <Users /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </Route>
      
      <Route path="/admin/analytics">
        {() => isAuthenticated ? <Analytics /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
