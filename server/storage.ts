import { 
  users, 
  adminUsers, 
  orders, 
  trackingHistory, 
  type User, 
  type InsertUser,
  type AdminUser,
  type InsertAdminUser,
  type Order,
  type InsertOrder,
  type TrackingHistory,
  type InsertTrackingHistory
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin user methods
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUserById(id: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: string, user: Partial<AdminUser>): Promise<AdminUser | undefined>;
  deleteAdminUser(id: string): Promise<boolean>;
  validateAdminCredentials(email: string, password: string): Promise<AdminUser | undefined>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrderByTrackingNumber(trackingNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;
  
  // Tracking methods
  getTrackingHistoryByOrderId(orderId: string): Promise<TrackingHistory[]>;
  addTrackingUpdate(tracking: InsertTrackingHistory): Promise<TrackingHistory>;
}

export class DatabaseStorage implements IStorage {
  private db;
  
  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is required");
    }
    
    try {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      this.db = drizzle(pool);
      console.log("Database connection initialized successfully with PostgreSQL");
    } catch (error) {
      console.error("Error initializing database connection:", error);
      throw error;
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(users.id === id).limit(1);
    return result[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(users.username === username).limit(1);
    return result[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }
  
  // Admin user methods
  async getAdminUsers(): Promise<AdminUser[]> {
    return await this.db.select().from(adminUsers);
  }
  
  async getAdminUserById(id: string): Promise<AdminUser | undefined> {
    const result = await this.db.select().from(adminUsers).where(adminUsers.id === id).limit(1);
    return result[0];
  }
  
  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const result = await this.db.select().from(adminUsers).where(adminUsers.email === email).limit(1);
    return result[0];
  }
  
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const result = await this.db.insert(adminUsers).values(user).returning();
    return result[0];
  }
  
  async updateAdminUser(id: string, user: Partial<AdminUser>): Promise<AdminUser | undefined> {
    const result = await this.db.update(adminUsers)
      .set({...user, updatedAt: new Date()})
      .where(adminUsers.id === id)
      .returning();
    return result[0];
  }
  
  async deleteAdminUser(id: string): Promise<boolean> {
    const result = await this.db.delete(adminUsers).where(adminUsers.id === id).returning();
    return result.length > 0;
  }
  
  async validateAdminCredentials(email: string, password: string): Promise<AdminUser | undefined> {
    const user = await this.getAdminUserByEmail(email);
    
    if (user && user.password === password) {
      // In a production environment, you would use a proper password hashing library
      // This is a simplified example for demo purposes
      await this.db.update(adminUsers)
        .set({ lastLogin: new Date() })
        .where(adminUsers.id === user.id);
      
      return user;
    }
    
    return undefined;
  }
  
  // Order methods
  async getOrders(): Promise<Order[]> {
    return await this.db.select().from(orders);
  }
  
  async getOrderById(id: string): Promise<Order | undefined> {
    const result = await this.db.select().from(orders).where(orders.id === id).limit(1);
    return result[0];
  }
  
  async getOrderByTrackingNumber(trackingNumber: string): Promise<Order | undefined> {
    const result = await this.db.select().from(orders).where(orders.trackingNumber === trackingNumber).limit(1);
    return result[0];
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await this.db.insert(orders).values(order).returning();
    return result[0];
  }
  
  async updateOrder(id: string, order: Partial<Order>): Promise<Order | undefined> {
    const result = await this.db.update(orders)
      .set({...order, updatedAt: new Date()})
      .where(orders.id === id)
      .returning();
    return result[0];
  }
  
  async deleteOrder(id: string): Promise<boolean> {
    const result = await this.db.delete(orders).where(orders.id === id).returning();
    return result.length > 0;
  }
  
  // Tracking methods
  async getTrackingHistoryByOrderId(orderId: string): Promise<TrackingHistory[]> {
    return await this.db.select()
      .from(trackingHistory)
      .where(trackingHistory.orderId === orderId)
      .orderBy(trackingHistory.timestamp);
  }
  
  async addTrackingUpdate(tracking: InsertTrackingHistory): Promise<TrackingHistory> {
    const result = await this.db.insert(trackingHistory).values(tracking).returning();
    return result[0];
  }
}

// Memory storage for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminUsers: Map<string, AdminUser>;
  private orders: Map<string, Order>;
  private tracking: Map<string, TrackingHistory[]>;
  private userCounter: number;
  
  constructor() {
    this.users = new Map();
    this.adminUsers = new Map();
    this.orders = new Map();
    this.tracking = new Map();
    this.userCounter = 1;
    
    // Add default admin user
    const defaultAdmin: AdminUser = {
      id: "1",
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "super_admin",
      createdAt: new Date(),
      lastLogin: null
    };
    
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);
    
    // Add some mock orders
    const mockOrder1: Order = {
      id: "1",
      trackingNumber: "LBC12345678",
      status: "Delivered",
      productName: "Electronics",
      weight: 1.5,
      dimensions: "30x20x10",
      packageValue: 5000,
      packageDescription: "Smartphone and accessories",
      shippingCompany: "LBC Express",
      shippingMethod: "Express",
      deliveryDate: new Date("2023-01-15"),
      recipientName: "John Doe",
      recipientPhone: "+639123456789",
      recipientAddress: "123 Main St, Manila, Philippines",
      senderName: "Jane Smith",
      senderPhone: "+639876543210",
      senderAddress: "456 Oak Ave, Cebu, Philippines",
      officerName: "Officer One",
      officerId: "OFF-001",
      currency: "PHP",
      shippingCost: 250,
      totalAmount: 5250,
      createdAt: new Date("2023-01-12"),
      updatedAt: new Date("2023-01-15")
    };
    
    const mockOrder2: Order = {
      id: "2",
      trackingNumber: "LBC87654321",
      status: "In Transit",
      productName: "Documents",
      weight: 0.5,
      dimensions: "20x15x5",
      packageValue: 1000,
      packageDescription: "Legal documents",
      shippingCompany: "LBC Express",
      shippingMethod: "Standard",
      deliveryDate: new Date("2023-01-20"),
      recipientName: "Robert Chen",
      recipientPhone: "+639555555555",
      recipientAddress: "789 Pine St, Davao, Philippines",
      senderName: "Maria Santos",
      senderPhone: "+639111111111",
      senderAddress: "321 Cedar St, Quezon City, Philippines",
      officerName: "Officer Two",
      officerId: "OFF-002",
      currency: "PHP",
      shippingCost: 150,
      totalAmount: 1150,
      createdAt: new Date("2023-01-14"),
      updatedAt: new Date("2023-01-14")
    };
    
    const mockOrder3: Order = {
      id: "3",
      trackingNumber: "LBC13579246",
      status: "On Hold",
      productName: "Clothing",
      weight: 2.0,
      dimensions: "40x30x20",
      packageValue: 3000,
      packageDescription: "Winter clothing",
      shippingCompany: "LBC Express",
      shippingMethod: "International",
      deliveryDate: null,
      recipientName: "Alex Johnson",
      recipientPhone: "+16123456789",
      recipientAddress: "555 Maple Ave, New York, USA",
      senderName: "Paul Garcia",
      senderPhone: "+639222222222",
      senderAddress: "888 Elm St, Makati, Philippines",
      officerName: "Officer Three",
      officerId: "OFF-003",
      currency: "USD",
      shippingCost: 50,
      totalAmount: 3050,
      createdAt: new Date("2023-01-13"),
      updatedAt: new Date("2023-01-14")
    };
    
    this.orders.set(mockOrder1.id, mockOrder1);
    this.orders.set(mockOrder2.id, mockOrder2);
    this.orders.set(mockOrder3.id, mockOrder3);
    
    // Add tracking history
    const tracking1: TrackingHistory[] = [
      {
        id: "1",
        orderId: "1",
        status: "Package processed",
        location: "Manila facility",
        description: "Package received and processed",
        timestamp: new Date("2023-01-12T15:30:00")
      },
      {
        id: "2",
        orderId: "1",
        status: "In transit",
        location: "Manila to Cebu",
        description: "Package is in transit to destination",
        timestamp: new Date("2023-01-13T10:45:00")
      },
      {
        id: "3",
        orderId: "1",
        status: "Arrived at destination facility",
        location: "Cebu Distribution Center",
        description: "Package arrived at destination facility",
        timestamp: new Date("2023-01-14T18:20:00")
      },
      {
        id: "4",
        orderId: "1",
        status: "Out for delivery",
        location: "Cebu City",
        description: "Package is out for delivery",
        timestamp: new Date("2023-01-15T09:15:00")
      },
      {
        id: "5",
        orderId: "1",
        status: "Delivered",
        location: "Recipient's address",
        description: "Package delivered. Received by: John Doe",
        timestamp: new Date("2023-01-15T14:30:00")
      }
    ];
    
    const tracking2: TrackingHistory[] = [
      {
        id: "6",
        orderId: "2",
        status: "Package processed",
        location: "Quezon City facility",
        description: "Package received and processed",
        timestamp: new Date("2023-01-14T11:20:00")
      },
      {
        id: "7",
        orderId: "2",
        status: "In transit",
        location: "Quezon City to Davao",
        description: "Package is in transit to destination",
        timestamp: new Date("2023-01-14T16:45:00")
      }
    ];
    
    const tracking3: TrackingHistory[] = [
      {
        id: "8",
        orderId: "3",
        status: "Package processed",
        location: "Makati facility",
        description: "Package received and processed",
        timestamp: new Date("2023-01-13T09:10:00")
      },
      {
        id: "9",
        orderId: "3",
        status: "On Hold",
        location: "Customs clearance",
        description: "Package is held for customs inspection",
        timestamp: new Date("2023-01-14T13:25:00")
      }
    ];
    
    this.tracking.set("1", tracking1);
    this.tracking.set("2", tracking2);
    this.tracking.set("3", tracking3);
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Admin user methods
  async getAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }
  
  async getAdminUserById(id: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }
  
  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.email === email
    );
  }
  
  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const id = crypto.randomUUID();
    const adminUser: AdminUser = { 
      ...user, 
      id, 
      createdAt: new Date(),
      lastLogin: null
    };
    
    this.adminUsers.set(id, adminUser);
    return adminUser;
  }
  
  async updateAdminUser(id: string, user: Partial<AdminUser>): Promise<AdminUser | undefined> {
    const existingUser = this.adminUsers.get(id);
    
    if (!existingUser) {
      return undefined;
    }
    
    const updatedUser = { ...existingUser, ...user };
    this.adminUsers.set(id, updatedUser);
    
    return updatedUser;
  }
  
  async deleteAdminUser(id: string): Promise<boolean> {
    return this.adminUsers.delete(id);
  }
  
  async validateAdminCredentials(email: string, password: string): Promise<AdminUser | undefined> {
    const user = Array.from(this.adminUsers.values()).find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      // Update last login
      this.adminUsers.set(user.id, {
        ...user,
        lastLogin: new Date()
      });
    }
    
    return user;
  }
  
  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrderByTrackingNumber(trackingNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(
      (order) => order.trackingNumber === trackingNumber
    );
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = crypto.randomUUID();
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.set(id, newOrder);
    return newOrder;
  }
  
  async updateOrder(id: string, orderUpdate: Partial<Order>): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    
    if (!existingOrder) {
      return undefined;
    }
    
    const updatedOrder = { 
      ...existingOrder, 
      ...orderUpdate,
      updatedAt: new Date()
    };
    
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  async deleteOrder(id: string): Promise<boolean> {
    const deleted = this.orders.delete(id);
    if (deleted) {
      this.tracking.delete(id);
    }
    return deleted;
  }
  
  // Tracking methods
  async getTrackingHistoryByOrderId(orderId: string): Promise<TrackingHistory[]> {
    return this.tracking.get(orderId) || [];
  }
  
  async addTrackingUpdate(tracking: InsertTrackingHistory): Promise<TrackingHistory> {
    const id = crypto.randomUUID();
    const newTracking: TrackingHistory = {
      ...tracking,
      id,
      timestamp: new Date()
    };
    
    const existingTracking = this.tracking.get(tracking.orderId) || [];
    existingTracking.push(newTracking);
    this.tracking.set(tracking.orderId, existingTracking);
    
    // Update the order status
    const order = this.orders.get(tracking.orderId);
    if (order) {
      this.orders.set(tracking.orderId, {
        ...order,
        status: tracking.status,
        updatedAt: new Date()
      });
    }
    
    return newTracking;
  }
}

// Choose the appropriate storage implementation based on environment
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
