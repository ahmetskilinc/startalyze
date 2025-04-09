"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/providers/breadcrumb";
import { SidebarTrigger } from "./sidebar";
import { Separator } from "./separator";
import React from "react";

const Header = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <header className="border-accent flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbItem>{breadcrumb.label}</BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
