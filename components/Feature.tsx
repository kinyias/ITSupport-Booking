'use client';

import { motion } from 'framer-motion';
import { Laptop, Shield, Clock, HeadphonesIcon, MapPin } from 'lucide-react';

const features = [
  {
    name: 'Hỗ trợ tận nơi',
    description:
      'Dịch vụ tới tận nơi tại nhà hoặc văn phòng của bạn trong TP HCM , chỉ cần 30 phút mặt ngay.',
    icon: MapPin,
  },
  {
    name: 'An toàn',
    description: 'Đảm bảo an toàn dữ liệu và thông tin khách hàng.',
    icon: Shield,
  },
  {
    name: 'Hỗ trợ 24/7',
    description:
      'Nhóm hỗ trợ của chúng tôi luôn sẵn sàng hỗ trợ bạn suốt ngày đêm',
    icon: Clock,
  },
  {
    name: 'Chuyên gia',
    description:
      'Đội ngũ của chúng tôi bao gồm các chuyên gia giàu kinh nghiệm.',
    icon: HeadphonesIcon,
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Tại sao lại chọn chúng tôi?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Chúng tôi cung cấp nhiều dịch vụ hỗ trợ để thoã mãn nhu cầu khách
            hàng
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flow-root h-full rounded-lg  px-6 pb-8 bg-card">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center text-white justify-center rounded-md bg-blue-500 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 " aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight ">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
