import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertAdminUserSchema, 
  insertOrderSchema, 
  insertTrackingHistorySchema 
} from "@shared/schema";
import { generateTrackingNumber } from "./utils";

// Helper function to generate a random tracking number
function generateTrackingNumber(): string {
  const prefix = "LBC";
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `${prefix}${randomDigits}`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Track package
  app.get("/api/track/:trackingNumber", async (req: Request, res: Response) => {
    try {
      const { trackingNumber } = req.params;
      
      const order = await storage.getOrderByTrackingNumber(trackingNumber);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const trackingHistory = await storage.getTrackingHistoryByOrderId(order.id);
      
      return res.json({
        order,
        trackingHistory
      });
    } catch (error: any) {
      console.error("Error tracking order:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  // Auth routes
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      const admin = await storage.validateAdminCredentials(email, password);
      
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real application, you would use a proper authentication system with JWT
      // For simplicity, we're just returning the admin user
      return res.json({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      });
    } catch (error: any) {
      console.error("Login error:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  // Admin users routes
  app.get("/api/admin/users", async (req: Request, res: Response) => {
    try {
      const users = await storage.getAdminUsers();
      return res.json(users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      })));
    } catch (error: any) {
      console.error("Error fetching admin users:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.post("/api/admin/users", async (req: Request, res: Response) => {
    try {
      const result = insertAdminUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }
      
      const existingUser = await storage.getAdminUserByEmail(result.data.email);
      
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
      
      const user = await storage.createAdminUser(result.data);
      
      return res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });
    } catch (error: any) {
      console.error("Error creating admin user:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.put("/api/admin/users/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, name, role, password } = req.body;
      
      const existingUser = await storage.getAdminUserById(id);
      
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (email && email !== existingUser.email) {
        const userWithEmail = await storage.getAdminUserByEmail(email);
        if (userWithEmail && userWithEmail.id !== id) {
          return res.status(409).json({ message: "Email already exists" });
        }
      }
      
      const updatedUser = await storage.updateAdminUser(id, { 
        email: email || existingUser.email,
        name: name || existingUser.name,
        role: role || existingUser.role,
        password: password || existingUser.password
      });
      
      return res.json({
        id: updatedUser!.id,
        email: updatedUser!.email,
        name: updatedUser!.name,
        role: updatedUser!.role
      });
    } catch (error: any) {
      console.error("Error updating admin user:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.delete("/api/admin/users/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const existingUser = await storage.getAdminUserById(id);
      
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      await storage.deleteAdminUser(id);
      
      return res.status(204).end();
    } catch (error: any) {
      console.error("Error deleting admin user:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  // Orders routes
  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      return res.json(orders);
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrderById(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const trackingHistory = await storage.getTrackingHistoryByOrderId(id);
      
      return res.json({
        order,
        trackingHistory
      });
    } catch (error: any) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Generate a tracking number if one is not provided
      const data = {
        ...req.body,
        trackingNumber: req.body.trackingNumber || generateTrackingNumber()
      };
      
      const result = insertOrderSchema.safeParse(data);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }
      
      // Check if tracking number already exists
      const existingOrder = await storage.getOrderByTrackingNumber(result.data.trackingNumber);
      
      if (existingOrder) {
        return res.status(409).json({ message: "Tracking number already exists" });
      }
      
      const order = await storage.createOrder(result.data);
      
      // Add initial tracking update
      await storage.addTrackingUpdate({
        orderId: order.id,
        status: order.status,
        location: order.senderAddress.split(",")[0].trim(), // Use the first part of the sender address as location
        description: "Order created and processing initiated"
      });
      
      return res.status(201).json(order);
    } catch (error: any) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.put("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const existingOrder = await storage.getOrderById(id);
      
      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // If tracking number is being updated, check if it already exists
      if (req.body.trackingNumber && req.body.trackingNumber !== existingOrder.trackingNumber) {
        const orderWithTrackingNumber = await storage.getOrderByTrackingNumber(req.body.trackingNumber);
        if (orderWithTrackingNumber && orderWithTrackingNumber.id !== id) {
          return res.status(409).json({ message: "Tracking number already exists" });
        }
      }
      
      const updatedOrder = await storage.updateOrder(id, req.body);
      
      // If status has changed, add a tracking update
      if (req.body.status && req.body.status !== existingOrder.status) {
        await storage.addTrackingUpdate({
          orderId: id,
          status: req.body.status,
          location: req.body.location || "N/A",
          description: req.body.statusDescription || `Status updated to ${req.body.status}`
        });
      }
      
      return res.json(updatedOrder);
    } catch (error: any) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  app.delete("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const existingOrder = await storage.getOrderById(id);
      
      if (!existingOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      await storage.deleteOrder(id);
      
      return res.status(204).end();
    } catch (error: any) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  // Tracking updates
  app.post("/api/tracking", async (req: Request, res: Response) => {
    try {
      const result = insertTrackingHistorySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }
      
      const order = await storage.getOrderById(result.data.orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      const tracking = await storage.addTrackingUpdate(result.data);
      
      // Update the order status
      await storage.updateOrder(order.id, { status: result.data.status });
      
      return res.status(201).json(tracking);
    } catch (error: any) {
      console.error("Error adding tracking update:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
  });
  
  const httpServer = createServer(app);
  
  return httpServer;
}
