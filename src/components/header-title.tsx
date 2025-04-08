"use client";

import { Breadcrumb, useBreadcrumb } from "@/providers/breadcrumb";
import { useEffect } from "react";

export function HeaderTitle({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const { setBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbs([...breadcrumbs]);
  }, [setBreadcrumbs, breadcrumbs]);

  return null;
}
