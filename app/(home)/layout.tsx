import ChatPopup from '@/components/chat/chat-popup';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
      <ChatPopup />
      <Footer/>
    </>
  );
}
