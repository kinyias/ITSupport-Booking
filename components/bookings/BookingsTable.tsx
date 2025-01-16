import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
export default function BookingsTable({ bookings }: { bookings: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Người yêu cầu</TableHead>
          <TableHead>Vấn đề</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ưu tiên</TableHead>
          <TableHead>Ngày đặt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking: any) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.requester}</TableCell>
            <TableCell>{booking.issue}</TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === 'completed'
                    ? 'success'
                    : booking.status === 'in-progress'
                    ? 'warning'
                    : 'default'
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.priority === 'high'
                    ? 'destructive'
                    : booking.priority === 'medium'
                    ? 'warning'
                    : 'default'
                }
              >
                {booking.priority}
              </Badge>
            </TableCell>
            <TableCell>{booking.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
