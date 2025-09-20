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
    title: "Overview",
    // icon: <Video size={22} />,
    children: [
      {
        title: "Dashboard",
        url: "#",
        icon: <Home size={18} />, // filled style
      },
    ],
  },
  {
    title: "Data",
    // icon: <Database size={22} />,
    children: [
      { title: "Users", url: "#", icon: <Users size={18} /> }, // outline
      { title: "Invoices", url: "#", icon: <FileText size={18} /> },
    ],
  },
  {
    title: "Content",
    // icon: <Video size={22} />,
    children: [
      { title: "Create Course", url: "#", icon: <VideoIcon size={18} /> },
      { title: "Live Courses", url: "#", icon: <VideoIcon size={18} /> },
    ],
  },
  {
    title: "Customization",
    // icon: <LayoutDashboard size={22} />,
    children: [
      { title: "Hero", url: "#", icon: <Layers size={18} /> },
      { title: "FAQs", url: "#", icon: <HelpCircle size={18} /> },
      { title: "Categories", url: "#", icon: <List size={18} /> },
    ],
  },
  {
    title: "Controllers",
    // icon: <UserCog size={22} />,
    children: [
      { title: "Manage Team", url: "#", icon: <UsersRound size={18} /> },
    ],
  },
  {
    title: "Analytics",
    // icon: <ChartBarBig size={22} />,
    children: [
      { title: "Courses Analytics", url: "#", icon: <BarChartBig size={18} /> },
      { title: "Orders Analytics", url: "#", icon: <PieChart size={18} /> },
      { title: "Users Analytics", url: "#", icon: <ChartBarBig size={18} /> },
    ],
  },
  {
    title: "Extras",
    // icon: <MoreHorizontal size={22} />,
    children: [
      { title: "Settings", url: "#", icon: <Settings size={18} /> },
      { title: "Logout", url: "#", icon: <LogOut size={18} /> },
    ],
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar className=" pt-20 border-0 border-r-2 dark:border-background-dark">
      <SidebarContent className="dark:bg-surface-dark bg-surface dark:text-text1-dark text-text1  border-0  ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item, idx) => (
                <SidebarMenuItem key={idx} className="">
                  <SidebarMenuButton
                    asChild={!item.children}
                    className="  hover:bg-surface dark:hover:bg-surface-dark   dark:text-text2-dark text-text2 font-semibold"
                  >
                    {item.children ? (
                      <div className="flex items-center gap-2">
                        {/* {item.icon} */}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <div>
                        <a href="#" className="flex items-center gap-2">
                          {/* {item.icon} */}
                          <span>{item.title}</span>
                        </a>
                      </div>
                    )}
                  </SidebarMenuButton>

                  {item.children && (
                    <SidebarMenuSub className="dark:border-text2-dark border-text2">
                      {item.children.map((subItem, subIdx) => (
                        <SidebarMenuSubItem key={subIdx} className="">
                          <SidebarMenuSubButton
                            asChild
                            className="dark:hover:bg-gray-700 hover:bg-gray-200  "
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
