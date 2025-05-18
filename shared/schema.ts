import { pgTable, text, serial, integer, boolean, timestamp, uuid, doublePrecision, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users Table
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login"),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  email: true,
  password: true,
  name: true,
  role: true,
});

// Orders Table
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  trackingNumber: text("tracking_number").notNull().unique(),
  status: text("status").notNull().default("Pending"),
  productName: text("product_name").notNull(),
  weight: doublePrecision("weight").notNull(),
  dimensions: text("dimensions"),
  packageValue: doublePrecision("package_value"),
  packageDescription: text("package_description"),
  
  // Shipping Information
  shippingCompany: text("shipping_company").notNull(),
  shippingMethod: text("shipping_method").notNull(),
  deliveryDate: date("delivery_date"),
  
  // Recipient Information
  recipientName: text("recipient_name").notNull(),
  recipientPhone: text("recipient_phone").notNull(),
  recipientAddress: text("recipient_address").notNull(),
  
  // Sender Information
  senderName: text("sender_name").notNull(),
  senderPhone: text("sender_phone").notNull(),
  senderAddress: text("sender_address").notNull(),
  
  // Officer Details
  officerName: text("officer_name"),
  officerId: text("officer_id"),
  
  // Order Amount
  currency: text("currency").notNull().default("PHP"),
  shippingCost: doublePrecision("shipping_cost").notNull(),
  totalAmount: doublePrecision("total_amount").notNull(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Tracking History Table
export const trackingHistory = pgTable("tracking_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").notNull().references(() => orders.id),
  status: text("status").notNull(),
  location: text("location"),
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertTrackingHistorySchema = createInsertSchema(trackingHistory).omit({
  id: true,
  timestamp: true,
});

// Types
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type TrackingHistory = typeof trackingHistory.$inferSelect;
export type InsertTrackingHistory = z.infer<typeof insertTrackingHistorySchema>;

// Users table (previously defined)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
