import {ChevronsUpDown,LogOut,} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user
}) {
  const { isMobile } = useSidebar()

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
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-64 rounded-2xl p-6 
             bg-white/10 dark:bg-black/20 
             backdrop-blur-xl border border-white/20 
             shadow-[0_8px_30px_rgba(0,0,0,0.2)]
             animate-in fade-in-0 zoom-in-95 slide-in-from-right-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            {/* Profile Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-lg bg-blue-500/40"></div>
                <Avatar className="h-20 w-20 rounded-full border-2 border-white shadow-xl relative">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full">U</AvatarFallback>
                </Avatar>
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold tracking-tight text-center italic">
                {user.name}
              </h3>

              {/* Email */}
              <p className="text-sm text-muted-foreground text-center">
                {user.email}
              </p>
            </div>

            <DropdownMenuSeparator className="my-4" />

            {/* Logout Button */}
            <DropdownMenuItem
              className="w-full mt-1 flex justify-center gap-2  py-2 text-red-500 font-semiboldrounded cursor-pointer bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 focus:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
