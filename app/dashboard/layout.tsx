'use client';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import Header from '@/components/layout/dashboard/Header';
import Sidebar from '@/components/layout/dashboard/Sidebar';
import Container from '@/components/layout/Container';
import { useState } from 'react';
import ChatPopup from '@/components/chat/chat-popup';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  console.log(isSidebarOpen);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {/* Main Content */}
        <main
          className={cn(
            'flex-1 transition-all pt-4',
            isSidebarOpen ? 'ml-64' : 'ml-0'
          )}
        >
          <Container>{children}</Container>
        </main>
        <ChatPopup/>
      </div>
    </div>
  );
}
