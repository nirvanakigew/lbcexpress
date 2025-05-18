import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function ServiceCard({ title, description, icon: Icon, color, bgColor }: ServiceCardProps) {
  return (
    <Card className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition duration-300">
      <CardContent className="p-0">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor} mb-4`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <Button variant="link" className={`mt-4 inline-flex items-center text-sm font-medium ${color} hover:opacity-80 p-0`}>
          Learn more
          <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
}
