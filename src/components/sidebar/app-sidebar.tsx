import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import * as React from "react";
import { GetProPlanCard } from "@/components/sidebar/get-pro-plan-card";

export function AppSidebar({
  proPlan,
  ...props
}: React.ComponentProps<typeof Sidebar> & { proPlan: boolean }) {
  return (
    <Sidebar {...props} className="!bg-accent border-none">
      <SidebarHeader className="bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="flex flex-row items-center gap-2 p-2">
              <div className="flex items-center">
                <span className="text-xl font-bold">Startalyze</span>
              </div>
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        {!proPlan && <GetProPlanCard />}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
