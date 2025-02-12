import type { Metadata } from 'next';
// import { Be_Vietnam_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import QueryProvider from '@/context/query-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-provider';

// const beVietnamPro = Be_Vietnam_Pro({
//   subsets: ['vietnamese'],
//   weight: ['400', '500', '700'],
//   variable: '--font-be-vietnam-pro',
// });
const beVietnamPro = localFont({
  src: [
    {
      path: './fonts/BeVietnamPro-Bold.ttf',
      weight: '700',
    },
    {
      path: './fonts/BeVietnamPro-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/BeVietnamPro-Regular.ttf',
      weight: '400',
    },
  ],
});
export const metadata: Metadata = {
  title: 'IT support',
  description: 'Hỗ trợ kĩ thuật',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.className} antialiased flex flex-col min-h-screen bg-secondary`}
      >
        <QueryProvider>
          
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
