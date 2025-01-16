"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MessageSquare } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isAgent: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      content: "Hi, I'm having issues with my network connection.",
      timestamp: "10:30 AM",
      isAgent: false,
    },
    {
      id: 2,
      sender: "Support Agent",
      content: "Hello John, I'll be happy to help you with that. Can you describe the issue in more detail?",
      timestamp: "10:31 AM",
      isAgent: true,
    },
    {
      id: 3,
      sender: "John Doe",
      content: "I can't connect to the company VPN. It keeps timing out.",
      timestamp: "10:32 AM",
      isAgent: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "I can't connect to the company VPN",
      time: "10:32 AM",
      unread: 2,
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Printer not working",
      time: "10:15 AM",
      unread: 0,
      status: "idle",
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Software installation request",
      time: "9:45 AM",
      unread: 1,
      status: "offline",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Support Agent",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAgent: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
        <Badge variant="secondary" className="px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </div>
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Chats</CardTitle>
              <Badge>{activeChats.length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {activeChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="destructive">{chat.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John%20Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>John Doe</CardTitle>
                <p className="text-sm text-muted-foreground">Network Issue</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-400px)] mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isAgent ? "justify-end" : "justify-start"
                    }  ${
                      message.isAgent ? "mr-4" : "ml-0"
                    } `}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        message.isAgent
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.sender}
                        </span>
                        <span className="text-xs opacity-70">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-4">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}