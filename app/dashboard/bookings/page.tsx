"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const bookings = [
    {
      id: 1,
      requester: "John Doe",
      department: "Marketing",
      issue: "Network Connectivity",
      status: "pending",
      priority: "high",
      date: "2024-03-20",
      assignedTo: "Tech Team A",
    },
    {
      id: 2,
      requester: "Jane Smith",
      department: "Sales",
      issue: "Software Installation",
      status: "in-progress",
      priority: "medium",
      date: "2024-03-19",
      assignedTo: "Tech Team B",
    },
    {
      id: 3,
      requester: "Mike Johnson",
      department: "HR",
      issue: "Hardware Repair",
      status: "completed",
      priority: "low",
      date: "2024-03-18",
      assignedTo: "Tech Team C",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Requester Name</Label>
                <Input id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue">Issue Description</Label>
                <Input id="issue" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Submit Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.requester}</TableCell>
                  <TableCell>{booking.department}</TableCell>
                  <TableCell>{booking.issue}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "completed"
                          ? "success"
                          : booking.status === "in-progress"
                          ? "warning"
                          : "default"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.priority === "high"
                          ? "destructive"
                          : booking.priority === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {booking.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.assignedTo}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}