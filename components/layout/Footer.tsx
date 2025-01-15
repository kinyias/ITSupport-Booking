import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">ITSUPPORT</h3>
            <p>Chuyên gia tận tâm, phục vụ khách hàng mọi lúc mọi nơi</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Đường dẫn</h4>
            <nav className="flex flex-col">
              <Link href="/" className="hover:text-gray-300 mb-1">
                Trang chủ
              </Link>
              <Link href="#services" className="hover:text-gray-300 mb-1">
                Dịch vụ
              </Link>
              <Link href="#contact" className="hover:text-gray-300 mb-1">
                Liên hệ
              </Link>
            </nav>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">
              Liên hệ với chúng tôi
            </h4>
            <p>123 Tech Street, IT City, 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: support@itsupport.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 ITSUPPORT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
