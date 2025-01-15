'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ServicesCard({ service }: any) {
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <service.icon className="h-10 w-10 text-blue-500 mb-4" />
          <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <Button variant="outline" className="w-full mt-4">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
