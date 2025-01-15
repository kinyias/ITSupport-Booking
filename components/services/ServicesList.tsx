'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Laptop,
  Shield,
  Cloud,
  Headphones,
  Server,
  Smartphone,
} from 'lucide-react';
import ServicesCard from './ServicesCard';
import Container from '../layout/Container';

const services = [
  {
    title: 'Sửa chữa & nâng cấp',
    description:
      'Thay RAM, thay màn hình, thay ổ cứng và nhiều dịch vụ khác. Mang lại hiệu suất tối ưu cho thiết bị của bạn.',
    icon: Laptop,
  },
  {
    title: 'Cài đặt Phần mềm',
    description:
      '"Cài đặt mọi loại phần mềm từ cơ bản đến nâng cao. Hỗ trợ tận tình, đảm bảo hoạt động ổn định.',
    icon: Headphones,
  },
  {
    title: 'Sửa chữa máy in',
    description:
      'Máy in bị lỗi, kẹt giấy, in mờ? Chúng tôi cung cấp dịch vụ sửa chữa chuyên nghiệp, nhanh chóng và hiệu quả.',
    icon: Shield,
  },
  {
    title: 'Nạp Mực Máy in',
    description:
      'Nạp mực máy in chất lượng cao, giá rẻ. Đảm bảo bản in sắc nét, không lem mực, không làm hỏng máy.',
    icon: Cloud,
  },
  {
    title: 'Lắp đặt Camera Giám sát',
    description:
      'Lắp đặt hệ thống camera giám sát chất lượng cao, giúp bạn theo dõi và bảo vệ ngôi nhà hoặc doanh nghiệp của mình 24/7.',
    icon: Server,
  },
  {
    title: 'Khôi phục Dữ liệu',
    description:
      'Khôi phục dữ liệu bị mất do xóa nhầm, hỏng ổ cứng, virus tấn công hoặc các sự cố khác. Cam kết tỷ lệ thành công cao.',
    icon: Smartphone,
  },
];

export default function Services() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <Container>
        <div className="text-center">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Các dịch vụ của chúng tôi
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Đảm bảo sự hài lòng của khách hàng
          </motion.p>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServicesCard service={service} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
