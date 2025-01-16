'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  DollarSign,
  CreditCard,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import BookingsTable from '@/components/bookings/BookingsTable';
import RevenueChart from '@/components/dashboard/RevenueChart';
import SupportCategories from '@/components/dashboard/SupportCategories';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Số lịch hẹn',
      value: '245',
      icon: Users,
      trend: '+12.5%',
    },
    {
      title: 'Đang chờ',
      value: '15',
      icon: Clock,
      trend: '-2.3%',
    },
    {
      title: 'Hoàn thành',
      value: '182',
      icon: CheckCircle2,
      trend: '+8.4%',
    },
    {
      title: 'Không hoàn thành',
      value: '48',
      icon: AlertCircle,
      trend: '-5.1%',
    },
  ];

  const revenueStats = [
    {
      title: 'Doanh thu',
      value: '$72,000',
      icon: DollarSign,
      trend: '+14.2%',
      description: 'Doanh thu hằng tháng',
    },
    {
      title: 'Chi phí',
      value: '$45,000',
      icon: CreditCard,
      trend: '+5.4%',
      description: 'Chi phí hằng tháng',
    },
    {
      title: 'Lợi nhuận',
      value: '37.5%',
      icon: TrendingUp,
      trend: '+2.8%',
      description: 'Lợi nhuận hằng tháng',
    },
  ];

  const recentBookings = [
    {
      id: 1,
      requester: 'John Doe',
      issue: 'Network Connectivity',
      status: 'pending',
      priority: 'high',
      date: '2024-03-20',
    },
    {
      id: 2,
      requester: 'Jane Smith',
      issue: 'Software Installation',
      status: 'in-progress',
      priority: 'medium',
      date: '2024-03-19',
    },
    {
      id: 3,
      requester: 'Mike Johnson',
      issue: 'Hardware Repair',
      status: 'completed',
      priority: 'low',
      date: '2024-03-18',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {revenueStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend} so với tháng trước
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />

        <SupportCategories />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách lịch hẹn gần đây</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="w-full">
        <ScrollArea className="w-full rounded-md border">
          <BookingsTable bookings={recentBookings} />
          <ScrollBar orientation="horizontal" />
          </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
