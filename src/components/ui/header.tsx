'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumb } from '@/providers/breadcrumb';
import { SidebarTrigger } from './sidebar';
import { Separator } from './separator';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { breadcrumbs } = useBreadcrumb();

  const hasBreadcrumbs = breadcrumbs.length > 0;

  return (
    <header
      className={`border-accent z-10 flex h-16 shrink-0 items-center gap-2 ${hasBreadcrumbs ? 'border-b' : 'absolute border-transparent'}`}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        {hasBreadcrumbs && (
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        )}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {!breadcrumb.href ? (
                  <BreadcrumbItem>{breadcrumb.label}</BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href} asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="block" />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
