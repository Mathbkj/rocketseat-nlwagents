import { lazy } from "react";
import { useAudios } from "@/hooks/useAudios";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarItemSkeleton,
} from "./ui/sidebar";

const SidebarItemPreview = lazy(() => import("@/components/ui/sidebar"));

import { FileAudioIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Suspense } from "react";

export function SidebarAudios({ roomId }: { roomId: string }) {
  const { data, isLoading } = useAudios(roomId);
  if (isLoading) {
    return;
  }
  if (!data) throw new Error("No data found");
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Áudios Anteriores
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="ml-auto">
                  {data.length}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="">Quantidade</TooltipContent>
            </Tooltip>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {data &&
                typeof data !== "string" &&
                data.map(({ id, audio }) => (
                  <Suspense fallback={<SidebarItemSkeleton />}>
                    <SidebarItemPreview key={id}>
                      <SidebarMenuButton asChild>
                        <a>
                          <FileAudioIcon />
                          <span>{audio}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarItemPreview>
                  </Suspense>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
