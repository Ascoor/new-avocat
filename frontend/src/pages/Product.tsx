import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import {
  Scale,
  Gavel,
  Users,
} from 'lucide-react';

const slides = [
  {
    image: '/splash-image.jpg',
    title: 'Powering modern law firms',
    subtitle: 'All your cases and clients in one platform',
    cta: 'Get Started',
  },
  {
    image: '/intro-app-mobile.png',
    title: 'Streamline your workflow',
    subtitle: 'Manage tasks and schedules with ease',
    cta: 'Explore Features',
  },
  {
    image: '/placeholder.svg',
    title: 'Built for Egyptian lawyers',
    subtitle: 'Arabic and English interface with RTL support',
    cta: 'Join Now',
  },
];

const features = [
  {
    icon: Gavel,
    title: 'Case Management',
    description: 'Track case status, deadlines and documents securely.',
  },
  {
    icon: Users,
    title: 'Client Portal',
    description: 'Share updates and communicate with your clients easily.',
  },
  {
    icon: Scale,
    title: 'Analytics',
    description: 'Get insights about your firm performance and workflow.',
  },
];

export const Product = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative">
        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem key={idx} className="relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-96 w-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 rounded-xl">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 mb-6 max-w-md">
                    {slide.subtitle}
                  </p>
                  <Button>{slide.cta}</Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </Carousel>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="text-center shadow-lg">
                <CardContent className="p-6">
                  <Icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Product;
