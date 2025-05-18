interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export default function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <div className="relative">
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-lbc-red text-white font-bold text-xl">
        {number}
      </div>
      <div className="pl-16">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
