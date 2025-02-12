import ChatPopup from '@/components/chat/chat-popup';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/context/auth-provider';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <> 
    <AuthProvider>
      <Header />
      <main className="">{children}</main>
      <ChatPopup />
      <Footer />
    </AuthProvider>
    </> 
  );
}
