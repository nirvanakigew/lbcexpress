import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingForm from "@/components/TrackingForm";
import TrackingResult from "@/components/TrackingResult";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Track() {
  const [location, setLocation] = useLocation();
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Check for tracking number in URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const number = params.get("number");
    if (number) {
      setTrackingNumber(number);
      handleTrackNumber(number);
    }
  }, []);

  // Function to handle tracking a specific number
  const handleTrackNumber = async (number: string) => {
    if (!number) return;
    
    setIsLoading(true);
    try {
      const response = await apiRequest("GET", `/api/track/${number}`, undefined);
      const data = await response.json();
      setTrackingResult(data);
    } catch (error) {
      console.error("Tracking error:", error);
      toast({
        title: "Error",
        description: "Could not find package with that tracking number. Please verify and try again.",
        variant: "destructive"
      });
      setTrackingResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for successful tracking form submission
  const handleTrackingSuccess = (data: any) => {
    setTrackingResult(data);
    // Update URL with tracking number for sharing
    const params = new URLSearchParams();
    params.set("number", data.order.trackingNumber);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Track Your Package</h1>
            <p className="mt-2 text-gray-600">
              Enter your tracking number to check the current status of your shipment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    <Search className="h-5 w-5 inline-block mr-2 text-lbc-red" />
                    Track a Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TrackingForm
                    onTrackingSuccess={handleTrackingSuccess}
                    showLabel={false}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500 mt-4">
                    <p>Enter your complete tracking number to get detailed shipping updates.</p>
                    <p className="mt-2">Need help? Contact our customer support at <span className="text-lbc-red">+63 2 8858 5999</span>.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 bg-lbc-red/10 p-6 rounded-lg border border-lbc-red/20">
                <h3 className="font-semibold text-lbc-red">Tracking Tips</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li>• Tracking numbers typically start with "LBC" followed by 8-12 digits</li>
                  <li>• For international shipments, check both origin and destination tracking systems</li>
                  <li>• If your package doesn't show up, wait 24 hours after dropping it off</li>
                  <li>• You can also track via SMS by texting your tracking number to 2256</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-8">
              {isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow p-6">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lbc-red"></div>
                  <span className="ml-3 text-gray-600">Tracking your package...</span>
                </div>
              ) : trackingResult ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <TrackingResult data={trackingResult} />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow p-6 text-center">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/4839/4839049.png" 
                    alt="Tracking" 
                    className="w-20 h-20 mb-4 opacity-25"
                  />
                  <h3 className="text-lg font-medium text-gray-700">No tracking information to display</h3>
                  <p className="text-gray-500 mt-2">Enter a tracking number to see your delivery status</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Need Additional Help?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our customer service team is ready to assist you with any inquiries about your shipment.
            </p>
            <div className="mt-6">
              <Button className="bg-lbc-red hover:bg-lbc-dark-red">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
