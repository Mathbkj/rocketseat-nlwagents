import { useAudios } from "@/hooks/useAudios";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { FileAudioIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function SidebarAudios({ roomId }: { roomId: string }) {
  const { data, isLoading } = useAudios(roomId);
  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index.toString()}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }
  if (!data) throw new Error("No data found");
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Áudios
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
              {data?.map(({ id, audio }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton asChild>
                    <a>
                      <FileAudioIcon />
                      <span>{audio}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
