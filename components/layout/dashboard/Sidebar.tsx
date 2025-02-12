'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Bot, Calendar, Gauge, KeyRound, LogOut, MessageCircle, Settings } from 'lucide-react';
import LogoutDialog from '@/components/account/LogoutDialog';

const menuItems = [
  { name: 'Tổng quan', href: '/dashboard', icon: Gauge },
  { name: 'Quản lý lịch hẹn', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Quản lý dịch vụ', href: '/dashboard/services', icon: Bot },
  { name: 'Quản lý đăng nhập', href: '/dashboard/session', icon: KeyRound },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Cài đặt', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform',
        !isSidebarOpen && '-translate-x-full'
      )}
    >
      <nav className="space-y-1 p-4">
        {menuItems.map((item,index) => (
          <Link key={index} href={item.href}>
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start"
          >
            <item.icon/>
            {item.name}
          </Button>
          </Link>
        ))}
        <Button
            onClick={()=>setIsOpen(true)}
            variant="ghost"
            className="w-full justify-start"
          >
            <LogOut/>
            Đăng xuất
          </Button>
      </nav>
      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
    </aside>
  );
}
