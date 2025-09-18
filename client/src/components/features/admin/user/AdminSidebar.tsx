import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/src/shadcn/ui/sidebar";

import {
  Home,
  Database,
  Users,
  FileText,
  Video,
  VideoIcon,
  LayoutDashboard,
  Layers,
  HelpCircle,
  List,
  UserCog,
  UsersRound,
  ChartBarBig,
  BarChartBig,
  PieChart,
  MoreHorizontal,
  Settings,
  LogOut,
} from "lucide-react";

// Sidebar items config
const sidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: <Home size={22} />, // filled style
  },
  {
    title: "Data",
    icon: <Database size={22} />,
    children: [
      { title: "Users", url: "#", icon: <Users size={18} /> }, // outline
      { title: "Invoices", url: "#", icon: <FileText size={18} /> },
    ],
  },
  {
    title: "Content",
    icon: <Video size={22} />,
    children: [
      { title: "Create Course", url: "#", icon: <VideoIcon size={18} /> },
      { title: "Live Courses", url: "#", icon: <VideoIcon size={18} /> },
    ],
  },
  {
    title: "Customization",
    icon: <LayoutDashboard size={22} />,
    children: [
      { title: "Hero", url: "#", icon: <Layers size={18} /> },
      { title: "FAQs", url: "#", icon: <HelpCircle size={18} /> },
      { title: "Categories", url: "#", icon: <List size={18} /> },
    ],
  },
  {
    title: "Controllers",
    icon: <UserCog size={22} />,
    children: [
      { title: "Manage Team", url: "#", icon: <UsersRound size={18} /> },
    ],
  },
  {
    title: "Analytics",
    icon: <ChartBarBig size={22} />,
    children: [
      { title: "Courses Analytics", url: "#", icon: <BarChartBig size={18} /> },
      { title: "Orders Analytics", url: "#", icon: <PieChart size={18} /> },
      { title: "Users Analytics", url: "#", icon: <ChartBarBig size={18} /> },
    ],
  },
  {
    title: "Extras",
    icon: <MoreHorizontal size={22} />,
    children: [
      { title: "Settings", url: "#", icon: <Settings size={18} /> },
      { title: "Logout", url: "#", icon: <LogOut size={18} /> },
    ],
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar className="">
      <SidebarContent className="dark:bg-background-dark bg-background dark:text-text1-dark text-text1 ">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-5">
            <p className="text-3xl sm:text-4xl font-black text-primary">
              Skill<span className="text-black dark:text-white">Stack</span>
            </p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton
                    asChild={!item.children}
                    className="dark:hover:bg-surface-dark hover:bg-surface"
                  >
                    {item.children ? (
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <div>
                        <a href={item.url} className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </div>
                    )}
                  </SidebarMenuButton>

                  {item.children && (
                    <SidebarMenuSub>
                      {item.children.map((subItem, subIdx) => (
                        <SidebarMenuSubItem key={subIdx}>
                          <SidebarMenuSubButton
                            asChild
                            className="dark:hover:bg-surface-dark hover:bg-surface"
                          >
                            <a href={subItem.url}>
                              {subItem.icon}
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
