'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Bot, Calendar, Gauge, MessageCircle, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Gauge },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Services', href: '/dashboard/services', icon: Bot },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
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
      </nav>
    </aside>
  );
}
