import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, X } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Shipping companies options
const shippingCompanies = [
  { value: "LBC Express", label: "LBC Express" },
  { value: "DHL", label: "DHL" },
  { value: "FedEx", label: "FedEx" },
  { value: "UPS", label: "UPS" },
  { value: "USPS", label: "USPS" },
  { value: "J&T Express", label: "J&T Express" },
  { value: "Ninja Van", label: "Ninja Van" },
  { value: "Other", label: "Other" },
];

// Shipping methods options
const shippingMethods = [
  { value: "Standard", label: "Standard Delivery" },
  { value: "Express", label: "Express Delivery" },
  { value: "Same Day", label: "Same Day Delivery" },
  { value: "International", label: "International Shipping" },
];

// Status options
const statusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "In Transit", label: "In Transit" },
  { value: "Out for Delivery", label: "Out for Delivery" },
  { value: "Delivered", label: "Delivered" },
  { value: "On Hold", label: "On Hold" },
  { value: "Cancelled", label: "Cancelled" },
];

// Currency options
const currencyOptions = [
  { value: "PHP", label: "Philippine Peso (₱) - PHP" },
  { value: "USD", label: "US Dollar ($) - USD" },
  { value: "EUR", label: "Euro (€) - EUR" },
  { value: "GBP", label: "British Pound (£) - GBP" },
  { value: "JPY", label: "Japanese Yen (¥) - JPY" },
  { value: "AUD", label: "Australian Dollar (A$) - AUD" },
  { value: "SGD", label: "Singapore Dollar (S$) - SGD" },
  { value: "CAD", label: "Canadian Dollar (C$) - CAD" },
];

// Define the form schema
const orderFormSchema = z.object({
  // Package Information
  trackingNumber: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  weight: z.coerce.number().min(0.01, "Weight must be greater than 0"),
  dimensions: z.string().optional(),
  packageValue: z.coerce.number().optional(),
  packageDescription: z.string().optional(),
  
  // Shipping Information
  shippingCompany: z.string().min(1, "Shipping company is required"),
  shippingMethod: z.string().min(1, "Shipping method is required"),
  status: z.string().min(1, "Status is required"),
  deliveryDate: z.string().optional().nullable(),
  
  // Recipient Information
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(1, "Recipient phone is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  
  // Sender Information
  senderName: z.string().min(1, "Sender name is required"),
  senderPhone: z.string().min(1, "Sender phone is required"),
  senderAddress: z.string().min(1, "Sender address is required"),
  
  // Officer Details
  officerName: z.string().optional(),
  officerId: z.string().optional(),
  
  // Order Amount
  currency: z.string().min(1, "Currency is required"),
  shippingCost: z.coerce.number().min(0, "Shipping cost cannot be negative"),
  totalAmount: z.coerce.number().min(0, "Total amount cannot be negative"),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

interface CreateOrderFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function CreateOrderForm({ open, onClose, initialData }: CreateOrderFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default values
  const defaultValues: OrderFormValues = {
    trackingNumber: initialData?.trackingNumber || "",
    productName: initialData?.productName || "",
    weight: initialData?.weight || 0,
    dimensions: initialData?.dimensions || "",
    packageValue: initialData?.packageValue || 0,
    packageDescription: initialData?.packageDescription || "",
    
    shippingCompany: initialData?.shippingCompany || "LBC Express",
    shippingMethod: initialData?.shippingMethod || "Standard",
    status: initialData?.status || "Pending",
    deliveryDate: initialData?.deliveryDate || null,
    
    recipientName: initialData?.recipientName || "",
    recipientPhone: initialData?.recipientPhone || "",
    recipientAddress: initialData?.recipientAddress || "",
    
    senderName: initialData?.senderName || "",
    senderPhone: initialData?.senderPhone || "",
    senderAddress: initialData?.senderAddress || "",
    
    officerName: initialData?.officerName || "",
    officerId: initialData?.officerId || "",
    
    currency: initialData?.currency || "PHP",
    shippingCost: initialData?.shippingCost || 0,
    totalAmount: initialData?.totalAmount || 0,
  };
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues,
  });
  
  // Create mutation
  const createOrderMutation = useMutation({
    mutationFn: async (data: OrderFormValues) => {
      return await apiRequest("POST", "/api/orders", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Success",
        description: "Order created successfully",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Update mutation
  const updateOrderMutation = useMutation({
    mutationFn: async (data: { id: string; values: OrderFormValues }) => {
      return await apiRequest("PUT", `/api/orders/${data.id}`, data.values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  async function onSubmit(values: OrderFormValues) {
    setIsSubmitting(true);
    
    try {
      if (initialData?.id) {
        // Update existing order
        await updateOrderMutation.mutateAsync({ id: initialData.id, values });
      } else {
        // Create new order
        await createOrderMutation.mutateAsync(values);
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? "Edit Order" : "Create New Order"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Update the order details below"
              : "Fill in all the required fields to create a new shipping order."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lbc-red"
          >
            <span className="sr-only">Close</span>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Package Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Package Information</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Electronics, Documents, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)*</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="0.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dimensions (cm)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="L x W x H" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="packageValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Value</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {initialData?.id && (
                  <FormField
                    control={form.control}
                    name="trackingNumber"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Tracking Number</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormDescription>
                          Tracking number cannot be changed after creation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <FormField
                control={form.control}
                name="packageDescription"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Package Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={2}
                        placeholder="Brief description of package contents"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Shipping Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Shipping Information</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="shippingCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Company*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select shipping company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shippingCompanies.map((company) => (
                            <SelectItem key={company.value} value={company.value}>
                              {company.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Method*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select shipping method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shippingMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Recipient Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Recipient Information</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Phone*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+63 XXX XXX XXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="recipientAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Recipient Address*</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        placeholder="Full shipping address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Sender Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Sender Information</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="senderPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Phone*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+63 XXX XXX XXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="senderAddress"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Sender Address*</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        placeholder="Full sender address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Officer Details */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Officer Details</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="officerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Officer Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Officer's Full Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="officerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Officer ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ID Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Order Amount */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-base font-medium text-gray-900 mb-3">Order Amount</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencyOptions.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="shippingCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Cost*</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount*</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-lbc-red hover:bg-lbc-dark-red">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {initialData?.id ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  initialData?.id ? "Update Order" : "Create Order"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
