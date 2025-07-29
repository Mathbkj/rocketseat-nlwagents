import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/*Componente para renderizar cada item do sidebar*/
export default function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}