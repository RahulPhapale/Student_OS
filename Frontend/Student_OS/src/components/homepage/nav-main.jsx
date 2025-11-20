// import { ChevronRight } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar"

// export function NavMain({
//   items
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible">
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight
//                     className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
import {
  LayoutDashboard,
  FileEdit,
  BookOpen,
  Bot,
  CheckSquare,
  CalendarDays,
  PencilRuler,
  Bell,
  Settings,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/home" },
  { title: "Notes", icon: FileEdit, url: "/notes" },
  { title: "Materials", icon: BookOpen, url: "#" },
  { title: "Assistant", icon: Bot, url: "#" },
  { title: "Tasks", icon: CheckSquare, url: "#" },
  { title: "Calendar", icon: CalendarDays, url: "#" },
  { title: "Whiteboard", icon: PencilRuler, url: "/whiteboard" },
  { title: "Notifications", icon: Bell, url: "#" },
  { title: "Settings", icon: Settings, url: "#" },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>

      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a
                href={item.url}
                className="flex items-center gap-4 transition-all "
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
