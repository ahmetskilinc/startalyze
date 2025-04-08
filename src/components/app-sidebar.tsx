"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import { NavMain } from '@/components/nav-main';
import { NavUser } from "@/components/nav-user";
import * as React from "react";

// const data = [
//   {
//     isActive: true,
//     items: [
//       {
//         title: 'Chats',
//         url: '/chats',
//       },
//     ],
//   },
// ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="flex flex-row items-center gap-2 p-2">
              <div className="grid flex-1 text-left text-lg leading-tight">
                <span className="font- truncate">Startalyze</span>
              </div>
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{/* <NavMain items={data} /> */}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
