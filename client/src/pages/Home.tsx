import { useState } from "react";
import { Link } from "wouter";
import { Package, Globe, FileText, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingForm from "@/components/TrackingForm";
import TrackingResult from "@/components/TrackingResult";
import ServiceCard from "@/components/ServiceCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [trackingResult, setTrackingResult] = useState<any | null>(null);

  // Handler for successful tracking
  const handleTrackingSuccess = (data: any) => {
    setTrackingResult(data);
    // Scroll to tracking result
    setTimeout(() => {
      document.getElementById("tracking-result")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Service cards data
  const services = [
    {
      title: "Express Shipping",
      description: "Next-day delivery for your urgent packages. Available nationwide with priority handling.",
      icon: Package,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10"
    },
    {
      title: "International Shipping",
      description: "Reliable delivery to over 200 countries worldwide with tracking and customs support.",
      icon: Globe,
      color: "text-lbc-blue",
      bgColor: "bg-lbc-blue bg-opacity-10"
    },
    {
      title: "Document Delivery",
      description: "Secure and confidential delivery of important documents with signature confirmation.",
      icon: FileText,
      color: "text-lbc-red",
      bgColor: "bg-lbc-red bg-opacity-10"
    }
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: 1,
      title: "Pack Your Item",
      description: "Securely package your item and prepare all necessary documentation."
    },
    {
      number: 2,
      title: "Visit a Branch",
      description: "Drop off your package at any of our conveniently located branches."
    },
    {
      number: 3,
      title: "Get Tracking Number",
      description: "Receive your unique tracking number for real-time updates."
    },
    {
      number: 4,
      title: "Track & Receive",
      description: "Monitor your shipment and receive confirmation upon delivery."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "LBC Express has been our trusted shipping partner for over 5 years. Their reliability and efficiency have helped our business grow tremendously.",
      author: "Maria Santos",
      role: "Business Owner"
    },
    {
      quote: "I've been using LBC Express for all my international shipments, and their service has always been top-notch. Great customer support too!",
      author: "John Rivera",
      role: "Online Seller"
    },
    {
      quote: "As someone who frequently ships documents overseas, I appreciate LBC's secure and timely delivery. They've never let me down.",
      author: "Angela Cruz",
      role: "Legal Professional"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lbc-red to-lbc-dark-red text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Ship and Track with Confidence
              </h1>
              <p className="mt-3 max-w-md text-lg">
                Reliable shipping and package tracking services for personal and business deliveries.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:gap-3">
                <Button
                  asChild
                  variant="secondary"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-lbc-red shadow-sm hover:bg-gray-100 mb-3 sm:mb-0"
                >
                  <Link href="#services">
                    <a>Explore Services</a>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-md border border-white px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/10"
                >
                  <a href="#contact">Find a Branch</a>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white rounded-lg shadow-xl p-6" id="track">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Track Your Package</h2>
              <TrackingForm 
                onTrackingSuccess={handleTrackingSuccess} 
                showLabel={true}
              />
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  For bulk tracking and other services, please{" "}
                  <a href="#" className="text-lbc-blue hover:underline">
                    log in
                  </a>{" "}
                  to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Result Section (conditionally rendered) */}
      {trackingResult && (
        <section className="py-12 bg-gray-50" id="tracking-result">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrackingResult data={trackingResult} />
          </div>
        </section>
      )}

      {/* Services Section */}
      <section className="py-16 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From standard delivery to express shipping, we offer a range of options to meet your needs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                color={service.color}
                bgColor={service.bgColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to ship and track your package
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-3 text-lg font-medium text-gray-900">
                  Follow these steps
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howItWorksSteps.map((step) => (
                <HowItWorksStep 
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Customer Testimonials</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              What our customers say about our shipping and delivery services
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lbc-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Ready to Ship?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Visit your nearest LBC Express branch today or contact our customer service for assistance.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center sm:flex-row sm:gap-4">
              <Button
                variant="secondary"
                className="bg-white text-lbc-blue hover:bg-gray-100 mb-4 sm:mb-0"
              >
                Find a Branch Near You
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Contact Customer Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
