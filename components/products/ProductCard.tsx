'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProductCard({ laptop }: any) {
  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="relative">
            <img
              src={laptop.image}
              alt={laptop.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {laptop.badge && (
              <Badge className="absolute top-2 right-2 bg-blue-500">
                {laptop.badge}
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-lg sm:text-xl">
            {laptop.name}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {laptop.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {/* <ul className="list-disc list-inside space-y-2">
                    {laptop.features.map((feature, index) => (
                      <li key={index} className="text-xs sm:text-sm text-gray-600">{feature}</li>
                    ))}
                  </ul> */}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            {laptop.price}
          </span>
          <Button className="w-full sm:w-auto">Learn More</Button>
        </CardFooter>
      </Card>
    </>
  );
}
