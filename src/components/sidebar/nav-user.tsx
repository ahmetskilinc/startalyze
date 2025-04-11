"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  HandCoins,
  LogOut,
  MonitorCog,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/server/auth/client";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export function NavUser() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button variant="ghost" size="lg" className="w-full justify-start">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="ml-3 grid flex-1 text-left">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium flex items-center">
                  {user.name}
                  <Badge className="bg-blue-500 text-white ml-1 text-[10px]">
                   {user.plan}
                  </Badge>
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name?.slice(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleNavigate("/account")}>
                <User className="mr-2 size-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/account/settings")}>
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigate("/account/settings")}>
                <CreditCard className="mr-2 size-4" />
                <span>Plan</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => handleNavigate('/billing')}>
                <CreditCard className="mr-2 size-4" />
                <span>Billing</span>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => handleNavigate('/notifications')}>
                <Bell className="mr-2 size-4" />
                <span>Notifications</span>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <span className="mt-2 block w-full">
              <Tabs defaultValue={theme} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
                    <Moon
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                  </TabsTrigger>
                  <TabsTrigger value="light" onClick={() => setTheme("light")}>
                    <Sun
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                  </TabsTrigger>
                  <TabsTrigger value="system" onClick={() => setTheme("system")}>
                    <MonitorCog
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </span>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
