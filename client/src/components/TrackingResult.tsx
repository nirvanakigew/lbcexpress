import { format } from "date-fns";
import { 
  CheckCircle, 
  Circle, 
  Loader2, 
  MapPin, 
  Package, 
  Check, 
  Truck, 
  AlertCircle, 
  Info, 
  Ship, 
  Plane, 
  Train, 
  Scale, 
  Box, 
  Ruler, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  const getTransportIcon = (method: string) => {
    const method_lower = method.toLowerCase();
    if (method_lower.includes("express") || method_lower.includes("same day")) {
      return <Truck className="h-5 w-5 animate-pulse" />;
    } else if (method_lower.includes("air") || method_lower.includes("international")) {
      return <Plane className="h-5 w-5" />;
    } else if (method_lower.includes("sea") || method_lower.includes("ship")) {
      return <Ship className="h-5 w-5" />;
    } else if (method_lower.includes("rail") || method_lower.includes("train")) {
      return <Train className="h-5 w-5" />;
    } else {
      return <Truck className="h-5 w-5" />;
    }
  };
  
  const formatCurrency = (value: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      PHP: "₱",
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      SGD: "S$",
      CAD: "C$"
    };
    
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${value.toFixed(2)}`;
  };
  
  // Sort tracking history by timestamp (newest first for display)
  const sortedHistory = [...trackingHistory].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Original timeline order (oldest first)
  const timelineHistory = [...trackingHistory].sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });
  
  // Calculate progress percentage based on status
  const getProgressPercentage = (status: string): number => {
    switch (status) {
      case "Pending": return 10;
      case "Processing": return 25;
      case "In Transit": return 50;
      case "Out for Delivery": return 75;
      case "Delivered": return 100;
      case "On Hold": return -1; // Special case
      case "Cancelled": return -2; // Special case
      default: return 0;
    }
  };
  
  const progress = getProgressPercentage(order.status);
  
  return (
    <div className="space-y-8">
      {/* Status Animation Card */}
      <Card>
        <CardHeader className="bg-lbc-red text-white pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Shipping Status</span>
            <Badge className={getStatusColor(order.status)} variant="outline">
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {progress === -1 ? (
            /* On Hold Animation */
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-md">
              <AlertCircle className="h-16 w-16 text-gray-500 animate-pulse mb-2" />
              <p className="font-medium text-gray-700">Package is currently on hold</p>
              <p className="text-sm text-gray-500">Waiting for documentation or clearance</p>
            </div>
          ) : progress === -2 ? (
            /* Cancelled Animation */
            <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-md">
              <AlertCircle className="h-16 w-16 text-red-500 mb-2" />
              <p className="font-medium text-red-700">Shipment has been cancelled</p>
              <p className="text-sm text-red-500">Please contact customer service for more information</p>
            </div>
          ) : (
            /* Progress Animation */
            <div className="space-y-2">
              <div className="relative pt-4">
                <div className="flex mb-2 items-center justify-between">
                  <div className="flex space-x-2 items-center">
                    <Package className="h-5 w-5 text-lbc-red" />
                    <span className="text-xs font-semibold text-gray-700">Dispatch</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <span className="text-xs font-semibold text-gray-700">Delivery</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div 
                    style={{ width: `${progress}%` }} 
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ease-in-out ${
                      progress === 100 ? 'bg-green-500' : 'bg-lbc-red'
                    }`}>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <div className="flex items-center">
                    {progress >= 25 && (
                      <div className="relative">
                        {progress === 25 && <Loader2 className="absolute h-4 w-4 text-blue-500 animate-spin" />}
                        <Circle className={`h-4 w-4 ${progress > 25 ? 'text-blue-500' : 'text-gray-300'}`} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {progress >= 50 && (
                      <div className="relative">
                        {progress === 50 && <Truck className="absolute h-4 w-4 text-blue-500 animate-pulse" />}
                        <Circle className={`h-4 w-4 ${progress > 50 ? 'text-blue-500' : 'text-gray-300'}`} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {progress >= 75 && (
                      <div className="relative">
                        {progress === 75 && <Truck className="absolute h-4 w-4 text-indigo-500 animate-pulse" />}
                        <Circle className={`h-4 w-4 ${progress > 75 ? 'text-indigo-500' : 'text-gray-300'}`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 text-xs text-gray-500 text-center mt-2">
                <div>Processing</div>
                <div>In Transit</div>
                <div>Out for Delivery</div>
                <div>Delivered</div>
              </div>
              
              {/* Transportation Method Icon */}
              <div className="flex justify-center mt-4 mb-2">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {getTransportIcon(order.shippingMethod)}
                  </div>
                  <span className="text-xs mt-2 text-gray-500">
                    {order.shippingMethod} via {order.shippingCompany}
                  </span>
                </div>
              </div>
              
              {/* Estimated Delivery */}
              {order.deliveryDate && (
                <div className="flex justify-center mt-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-lbc-red" />
                    <span>
                      Expected Delivery: <strong>{format(new Date(order.deliveryDate), "MMMM d, yyyy")}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Package Details and Information */}
      <Tabs defaultValue="package" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="package">Package Details</TabsTrigger>
          <TabsTrigger value="sender">Sender Information</TabsTrigger>
          <TabsTrigger value="recipient">Recipient Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="package" className="border rounded-md p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Box className="h-5 w-5 mr-2 text-lbc-red" />
                <h3 className="text-lg font-medium">Package Information</h3>
              </div>
              {order.officerName && (
                <Badge variant="outline" className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  Processed by: {order.officerName}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center border-b pb-2">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Product:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.productName}</span>
                </div>
                
                <div className="flex items-center border-b pb-2">
                  <Scale className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Weight:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.weight} kg</span>
                </div>
                
                <div className="flex items-center border-b pb-2">
                  <Ruler className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Dimensions:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.dimensions} cm</span>
                </div>
                
                <div className="flex items-center border-b pb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Declared Value:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatCurrency(order.packageValue, order.currency)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center border-b pb-2">
                  <Truck className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Shipping Method:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.shippingMethod}</span>
                </div>
                
                <div className="flex items-center border-b pb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Shipping Cost:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {formatCurrency(order.shippingCost, order.currency)}
                  </span>
                </div>
                
                <div className="flex items-center border-b pb-2">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Created On:</span>
                  <span className="ml-2 text-sm text-gray-900">
                    {format(new Date(order.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
                
                {order.officerId && (
                  <div className="flex items-center border-b pb-2">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Officer ID:</span>
                    <span className="ml-2 text-sm text-gray-900">{order.officerId}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Package Description</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{order.packageDescription}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sender" className="border rounded-md p-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-lbc-red" />
              <h3 className="text-lg font-medium">Sender Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.senderName}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Phone:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.senderPhone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Address:</span>
                    <p className="text-sm text-gray-900">{order.senderAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recipient" className="border rounded-md p-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-lbc-red" />
              <h3 className="text-lg font-medium">Recipient Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.recipientName}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Phone:</span>
                  <span className="ml-2 text-sm text-gray-900">{order.recipientPhone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Address:</span>
                    <p className="text-sm text-gray-900">{order.recipientAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Tracking Timeline */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-lbc-red" />
          <h3 className="text-lg font-medium">Shipment History</h3>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="flow-root p-4 sm:p-6">
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
                                : item.status === "In Transit"
                                  ? "bg-blue-500"
                                  : item.status === "Package received"
                                    ? "bg-purple-500"
                                    : "bg-blue-500"
                          }`}>
                            {item.status === "Delivered" ? (
                              <Check className="h-5 w-5 text-white" />
                            ) : item.status === "Package received" ? (
                              <Package className="h-5 w-5 text-white" />
                            ) : item.status === "On Hold" ? (
                              <AlertCircle className="h-5 w-5 text-white" />
                            ) : item.status === "In Transit" ? (
                              <Truck className="h-5 w-5 text-white animate-pulse" />
                            ) : item.status === "Processing" ? (
                              <Loader2 className="h-5 w-5 text-white animate-spin" />
                            ) : (
                              <Truck className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.status}</p>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
