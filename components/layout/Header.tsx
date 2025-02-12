'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { Monitor } from 'lucide-react';
import { ModeToggle } from '../theme-toggle';
import Container from './Container';
import { useAuthContext } from '@/context/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const services = [
  { title: 'Remote Support', href: '/services/remote-support' },
  { title: 'On-Site Support', href: '/services/on-site-support' },
];

export default function Header() {
  const { isLoading, user } = useAuthContext();
  console.log(user);
  return (
    <header className="bg-secondary shadow-sm sticky top-0 border border-b-primary/10 z-50">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">ITSupport</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Dịch vụ</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Monitor className="h-6 w-6 text-white" />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              IT Support
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Đảm bảo sự hài lòng của khách hàng
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {services.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={service.href}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Về chúng tôi
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Liên hệ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-4 hidden md:block">
            <ModeToggle />
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
              {/* <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/account">Tài khoản</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Cài đặt</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/logout">Đăng xuất</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Đăng nhập</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Đăng kí</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { title: string }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
