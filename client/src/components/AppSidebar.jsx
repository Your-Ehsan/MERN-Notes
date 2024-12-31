import { NotebookPen, NotebookTabsIcon, Settings2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-menu";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./teams";

// This is sample data.
const data = {
  teams: [
    {
      name: "Your Notes",
      logo: NotebookPen,
      plan: "free",
      link: "/",
    },
  ],
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: NotebookTabsIcon,
      isActive: true,
      items: [
        {
          title: "Create",
          url: "/create",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />{" "}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
