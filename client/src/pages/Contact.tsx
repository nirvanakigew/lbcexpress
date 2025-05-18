import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Building, Instagram, Facebook, Twitter } from "lucide-react";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(7, { message: "Please enter a valid phone number" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lbc-red to-lbc-dark-red text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Have questions about our services? Contact our customer support team.
          </p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="flex text-base text-gray-500">
                    <MapPin className="flex-shrink-0 h-6 w-6 text-gray-400" />
                    <span className="ml-3">
                      LBC Plaza Building<br />
                      6083 Paseo de Roxas cor. Ayala Avenue<br />
                      Makati City, Philippines 1226
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex text-base text-gray-500">
                    <Phone className="flex-shrink-0 h-6 w-6 text-gray-400" />
                    <span className="ml-3">+63 2 8858 5999</span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="flex text-base text-gray-500">
                    <Mail className="flex-shrink-0 h-6 w-6 text-gray-400" />
                    <span className="ml-3">support@lbcexpress.com</span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Business Hours</dt>
                  <dd className="flex text-base text-gray-500">
                    <Clock className="flex-shrink-0 h-6 w-6 text-gray-400" />
                    <span className="ml-3">
                      Monday - Friday: 8:00 AM - 7:00 PM<br />
                      Saturday: 8:00 AM - 5:00 PM<br />
                      Sunday: 9:00 AM - 3:00 PM
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Branches</dt>
                  <dd className="flex text-base text-gray-500">
                    <Building className="flex-shrink-0 h-6 w-6 text-gray-400" />
                    <span className="ml-3">
                      Over 1,000 branches nationwide.<br />
                      <a 
                        href="#" 
                        className="text-lbc-red hover:underline"
                      >
                        Find the nearest branch
                      </a>
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="mt-12 lg:mt-0 lg:col-span-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="sm:col-span-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-lbc-red hover:bg-lbc-dark-red"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Visit Our Main Office</h2>
            <p className="mt-2 text-gray-600">
              Find us at our headquarters in Makati City, Manila
            </p>
          </div>
          
          <div className="h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7745866731823!2d121.0230923!3d14.5577118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90264d0b223%3A0x1c825f01b4daa886!2sLBC%20Express!5e0!3m2!1sen!2sph!4v1609307200000!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="LBC Express Headquarters"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about contacting us
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "What information should I provide when reporting a lost package?",
                  answer: "When reporting a lost package, please provide your tracking number, the date of shipment, sender and recipient details, and any other relevant information about the package contents.",
                },
                {
                  question: "How can I file a claim for a damaged shipment?",
                  answer: "To file a claim for a damaged shipment, please visit your nearest LBC branch with your tracking number, proof of value (receipt), and photos of the damaged items. You can also initiate the process by contacting our customer service.",
                },
                {
                  question: "How long does it take to get a response to my inquiry?",
                  answer: "We typically respond to email inquiries within 24-48 hours during business days. For urgent matters, we recommend calling our customer service hotline for immediate assistance.",
                },
                {
                  question: "Can I schedule a pickup for my package?",
                  answer: "Yes, you can schedule a pickup through our website, mobile app, or by calling our customer service. Pickups can be scheduled at least 4 hours in advance during business days.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
