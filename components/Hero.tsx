'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';

const banners = [
  {
    title: 'Dịch vụ tận nơi',
    subtitle: 'Tiện lợi, nhanh chóng, chuyên nghiệp',
    description:
      'Chúng tôi cung cấp dịch vụ cài đặt phần mềm, thay RAM, màn hình, ổ cứng ngay tại nhà hoặc văn phòng của bạn trong TP HCM. Không cần di chuyển!',
    cta: 'Đặt lịch ngay',
  },
  {
    title: 'Cài đặt phần mềm',
    subtitle: 'Làm việc hiệu quả hơn',
    description:
      'Cài đặt Microsoft Office, Google Workspace và các phần mềm văn phòng khác. Hỗ trợ kích hoạt bản quyền.',
    cta: 'Liên hệ ngay',
  },
  {
    title: 'Cài đặt phần mềm tùy chỉnh',
    subtitle: 'Đáp ứng mọi nhu cầu của bạn',
    description:
      'Cài đặt bất kỳ phần mềm nào bạn cần, từ phần mềm làm việc đến giải trí. Hỗ trợ tận tâm.',
    cta: 'Explore Services',
  },
];

export default function BannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleMouseEnter = React.useCallback(() => autoplay.stop(), [autoplay]);
  const handleMouseLeave = React.useCallback(() => autoplay.play(), [autoplay]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      plugins={[autoplay]}
      opts={{
        loop: true,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-card bg-opacity-50" />
              <Card className="absolute inset-0 bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-blue-600">
                    {banner.title}
                  </h2>
                  <p className="text-xl sm:text-2xl md:text-3xl mb-2 font-bold">
                    {banner.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg mb-4 max-w-2xl text-gray-500">
                    {banner.description}
                  </p>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {banner.cta}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
      <CarouselPrevious className="left-4 hidden md:flex" />
      <CarouselNext className="right-4 hidden md:flex" />
    </Carousel>
  );
}
