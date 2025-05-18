import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const trackingSchema = z.object({
  trackingNumber: z.string()
    .min(8, { message: "Tracking number must be at least 8 characters" })
    .max(20, { message: "Tracking number must not exceed 20 characters" })
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

type TrackingFormProps = {
  onTrackingSuccess: (data: any) => void;
  className?: string;
  showLabel?: boolean;
};

export default function TrackingForm({ onTrackingSuccess, className = "", showLabel = true }: TrackingFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      trackingNumber: ""
    }
  });
  
  async function onSubmit(data: TrackingFormValues) {
    setIsLoading(true);
    
    try {
      const response = await apiRequest("GET", `/api/track/${data.trackingNumber}`, undefined);
      const responseData = await response.json();
      onTrackingSuccess(responseData);
    } catch (error) {
      console.error("Tracking error:", error);
      toast({
        title: "Error",
        description: "Could not find package with that tracking number. Please verify and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              {showLabel && (
                <FormLabel className="text-sm font-medium text-gray-700 mb-1">
                  Tracking Number
                </FormLabel>
              )}
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your tracking number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-lbc-red focus:ring-lbc-red py-2 px-3 border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-lbc-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tracking...
            </>
          ) : (
            "Track Package"
          )}
        </Button>
      </form>
    </Form>
  );
}
