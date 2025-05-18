import { format } from "date-fns";
import { CheckCircle, Circle, Loader2, MapPin, Package, Check, Truck, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TrackingHistoryItem {
  id: string;
  orderId: string;
  status: string;
  location: string;
  description: string;
  timestamp: string;
}

interface Order {
  id: string;
  trackingNumber: string;
  status: string;
  productName: string;
  weight: number;
  dimensions: string;
  packageValue: number;
  packageDescription: string;
  shippingCompany: string;
  shippingMethod: string;
  deliveryDate: string | null;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  officerName: string | null;
  officerId: string | null;
  currency: string;
  shippingCost: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

interface TrackingResultProps {
  data: {
    order: Order;
    trackingHistory: TrackingHistoryItem[];
  };
}

export default function TrackingResult({ data }: TrackingResultProps) {
  const { order, trackingHistory } = data;
  
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Circle className="h-5 w-5 text-yellow-500" />;
      case "Processing":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "Out for Delivery":
        return <Truck className="h-5 w-5 text-indigo-500" />;
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "On Hold":
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      case "Cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Sort tracking history by timestamp (newest first for display)
  const sortedHistory = [...trackingHistory].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Original timeline order (oldest first)
  const timelineHistory = [...trackingHistory].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-lbc-red text-white">
          <CardTitle>Package Information</CardTitle>
          <p className="text-sm text-white/80">Tracking details and shipping status.</p>
        </CardHeader>
        <CardContent className="pt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Tracking Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.trackingNumber}</dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Shipping Company</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingCompany}</dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Shipping Method</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.shippingMethod}</dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Shipped From</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.senderAddress}</dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Destination</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{order.recipientAddress}</dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Delivery Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.deliveryDate 
                  ? format(new Date(order.deliveryDate), "MMMM d, yyyy")
                  : "Not yet scheduled"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Shipping Updates</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {timelineHistory.map((item, index) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  {index !== timelineHistory.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                        item.status === "Delivered" 
                          ? "bg-green-500" 
                          : item.status === "On Hold"
                            ? "bg-gray-400"
                            : "bg-blue-500"
                      }`}>
                        {item.status === "Delivered" ? (
                          <Check className="h-5 w-5 text-white" />
                        ) : item.status === "Package processed" ? (
                          <Package className="h-5 w-5 text-white" />
                        ) : item.status === "On Hold" ? (
                          <AlertCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Truck className="h-5 w-5 text-white" />
                        )}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900">{item.status}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        {item.location && (
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={new Date(item.timestamp).toISOString()}>
                          {format(new Date(item.timestamp), "MMM d, yyyy, h:mm a")}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
