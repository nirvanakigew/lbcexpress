import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { 
  Package, 
  Globe, 
  FileText, 
  Truck, 
  ShoppingBag, 
  DollarSign, 
  CreditCard,
  Home,
  Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Services() {
  // All services with their details
  const services = [
    {
      id: "express",
      title: "Express Shipping",
      description: "Next-day delivery for your urgent packages. Available nationwide with priority handling.",
      icon: Package,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10",
      features: [
        "Priority handling for faster delivery",
        "Next-day delivery for select locations",
        "Real-time tracking and updates",
        "Delivery confirmation",
        "Insurance coverage up to ₱10,000",
      ],
      pricing: "From ₱150",
    },
    {
      id: "international",
      title: "International Shipping",
      description: "Reliable delivery to over 200 countries worldwide with tracking and customs support.",
      icon: Globe,
      color: "text-lbc-blue",
      bgColor: "bg-lbc-blue bg-opacity-10",
      features: [
        "Door-to-door delivery worldwide",
        "Customs clearance assistance",
        "Packaging services available",
        "Multiple delivery speeds available",
        "Online tracking across borders",
      ],
      pricing: "From ₱1,500",
    },
    {
      id: "document",
      title: "Document Delivery",
      description: "Secure and confidential delivery of important documents with signature confirmation.",
      icon: FileText,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10",
      features: [
        "Secure handling of sensitive documents",
        "Signature confirmation on delivery",
        "Specialized envelopes provided",
        "Express and same-day options available",
        "Recipient verification process",
      ],
      pricing: "From ₱100",
    },
    {
      id: "ecommerce",
      title: "E-Commerce Solutions",
      description: "Integrated shipping solutions for online sellers with order fulfillment options.",
      icon: ShoppingBag,
      color: "text-lbc-blue",
      bgColor: "bg-lbc-blue bg-opacity-10",
      features: [
        "Integration with major e-commerce platforms",
        "Bulk shipment processing",
        "Cash on Delivery (COD) service",
        "Return management solutions",
        "Seller portal for order management",
      ],
      pricing: "Custom packages available",
    },
    {
      id: "cargo",
      title: "Cargo Services",
      description: "Transport for large shipments and bulk goods with nationwide coverage.",
      icon: Truck,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10",
      features: [
        "Handling of large or heavy items",
        "Full container and less-than-container options",
        "Loading and unloading assistance",
        "Scheduled delivery times",
        "Special handling for fragile items",
      ],
      pricing: "From ₱1,000",
    },
    {
      id: "money",
      title: "Money Transfer",
      description: "Fast and secure domestic and international money transfer services.",
      icon: DollarSign,
      color: "text-lbc-blue",
      bgColor: "bg-lbc-blue bg-opacity-10",
      features: [
        "Send money nationwide within minutes",
        "Competitive exchange rates",
        "No bank account needed",
        "Multiple payout options",
        "Mobile app for transfers on the go",
      ],
      pricing: "From ₱50 + 1% of amount",
    },
    {
      id: "bills",
      title: "Bills Payment",
      description: "Convenient payment services for utilities, loans, and government fees.",
      icon: CreditCard,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10",
      features: [
        "Pay over 200 billers nationwide",
        "Instant posting for major utilities",
        "Official receipt provided",
        "No additional processing fees",
        "Available at all LBC branches",
      ],
      pricing: "Service fee varies by biller",
    },
    {
      id: "pickup",
      title: "Home Pickup Service",
      description: "Convenient door-to-door collection of packages for shipping.",
      icon: Home,
      color: "text-lbc-blue",
      bgColor: "bg-lbc-blue bg-opacity-10",
      features: [
        "Scheduled pickup at your convenience",
        "Available for both regular and express shipments",
        "Professional handling by trained personnel",
        "Packaging assistance available",
        "Can be booked online or via mobile app",
      ],
      pricing: "Additional ₱50-150 based on location",
    },
    {
      id: "corporate",
      title: "Corporate Logistics",
      description: "Comprehensive business logistics solutions tailored to your company's needs.",
      icon: Scale,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10",
      features: [
        "Dedicated account manager",
        "Customized shipping schedules",
        "Volume discounts available",
        "Regular performance reports",
        "Integrated supply chain solutions",
      ],
      pricing: "Contact for custom quote",
    },
  ];

  // Categories for the tabs
  const categories = [
    { id: "all", label: "All Services" },
    { id: "shipping", label: "Shipping", services: ["express", "international", "document", "cargo", "pickup"] },
    { id: "business", label: "Business Solutions", services: ["ecommerce", "corporate"] },
    { id: "financial", label: "Financial Services", services: ["money", "bills"] },
  ];

  // Filter services based on category
  const getFilteredServices = (categoryId: string) => {
    if (categoryId === "all") return services;
    
    const category = categories.find(cat => cat.id === categoryId);
    if (!category || !category.services) return [];
    
    return services.filter(service => category.services!.includes(service.id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lbc-red to-lbc-dark-red text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Reliable shipping, logistics, and financial services to meet all your needs
          </p>
        </div>
      </section>
      
      {/* Services Section with Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="px-4 py-2"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {getFilteredServices(category.id).map((service) => (
                    <ServiceCard
                      key={service.id}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      color={service.color}
                      bgColor={service.bgColor}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      {/* Service Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Detailed Service Information</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of services designed to meet your specific needs
            </p>
          </div>

          <div className="space-y-12">
            {services.map((service) => (
              <Card key={service.id} id={service.id} className="overflow-hidden">
                <div className={`h-2 ${service.color === 'text-lbc-red' ? 'bg-lbc-red' : 'bg-lbc-blue'}`}></div>
                <CardContent className="p-6">
                  <div className="md:flex md:items-start">
                    <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${service.bgColor} mb-4 md:mb-0`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <div className="md:ml-6">
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="mt-2 text-gray-600">{service.description}</p>
                      
                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-gray-900">Features</h4>
                          <ul className="mt-2 space-y-2">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className={`flex-shrink-0 h-5 w-5 ${service.color}`}>•</span>
                                <span className="ml-2 text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Pricing</h4>
                          <p className="mt-2 text-gray-600">{service.pricing}</p>
                          <div className="mt-4">
                            <Button 
                              className={service.color === 'text-lbc-red' 
                                ? 'bg-lbc-red hover:bg-lbc-dark-red' 
                                : 'bg-lbc-blue hover:bg-blue-700'
                              }
                            >
                              Get a Quote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Request Custom Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lbc-red rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
              <div className="text-center md:text-left md:max-w-2xl">
                <h2 className="text-2xl font-bold text-white">Need a Custom Solution?</h2>
                <p className="mt-3 text-white text-opacity-90">
                  Our team of experts can help design a tailored service package specifically for your business needs.
                </p>
              </div>
              <div className="mt-8 md:mt-0 flex flex-col md:flex-row md:items-center gap-4 justify-center">
                <Button variant="secondary" className="bg-white text-lbc-red hover:bg-gray-100">
                  Request a Consultation
                </Button>
                <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
                  View Business Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "How long does international shipping take?",
                  answer: "International shipping delivery times vary depending on the destination country. Typically, it ranges from 3-5 business days for neighboring Asian countries, 5-7 business days for Australia and the Middle East, and 7-14 business days for Europe and the Americas."
                },
                {
                  question: "Can I track my package in real-time?",
                  answer: "Yes, all LBC Express shipments come with real-time tracking. You can track your package through our website, mobile app, or by sending your tracking number via SMS to 2256."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept cash, credit/debit cards, mobile wallets (GCash, PayMaya), and bank transfers for all our services. Some branches also accept checks for specific services."
                },
                {
                  question: "Do you offer packaging supplies?",
                  answer: "Yes, LBC Express offers various packaging supplies including boxes, padded envelopes, bubble wrap, and tape. These can be purchased at any LBC branch to ensure your items are properly protected during shipping."
                },
                {
                  question: "What's the maximum weight for regular shipping?",
                  answer: "For regular shipping, the maximum weight is 30kg per package. For items exceeding this weight, we recommend our cargo services which can accommodate heavier shipments."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
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
