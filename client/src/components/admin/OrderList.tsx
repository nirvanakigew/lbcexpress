import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, User, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  trackingNumber: string;
  status: string;
  productName: string;
  recipientName: string;
  recipientAddress: string;
  shippingMethod: string;
  deliveryDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface OrderListProps {
  onCreateOrder: () => void;
  onEditOrder: (order: Order) => void;
}

export default function OrderList({ onCreateOrder, onEditOrder }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['/api/orders'],
  });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "On Hold":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Filter orders based on search term
  const filteredOrders = orders?.filter((order: Order) => {
    const searchValue = searchTerm.toLowerCase();
    return (
      order.trackingNumber.toLowerCase().includes(searchValue) ||
      order.recipientName.toLowerCase().includes(searchValue) ||
      order.status.toLowerCase().includes(searchValue) ||
      order.productName.toLowerCase().includes(searchValue)
    );
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-lbc-red animate-spin" />
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-4">
        <p>Error loading orders. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Orders</CardTitle>
        <Button onClick={onCreateOrder} className="bg-lbc-red hover:bg-lbc-dark-red">
          Create Order
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            placeholder="Search orders..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Shipping Method</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders?.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-lbc-blue">
                      <Link href={`/track?number=${order.trackingNumber}`}>
                        <a>{order.trackingNumber}</a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{order.recipientName}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {order.recipientAddress.split(',')[0]}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.shippingMethod}</TableCell>
                    <TableCell>
                      {order.deliveryDate ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {format(new Date(order.deliveryDate), "MMM d, yyyy")}
                        </div>
                      ) : (
                        <span className="text-gray-500">Not scheduled</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        onClick={() => onEditOrder(order)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Edit</span>
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
