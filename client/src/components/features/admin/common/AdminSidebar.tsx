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
  SidebarFooter,
} from "@/src/shadcn/ui/sidebar";

import {
  Home,
  Users,
  FileText,
  VideoIcon,
  Layers,
  HelpCircle,
  List,
  UsersRound,
  ChartBarBig,
  BarChartBig,
  PieChart,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLogoutMutation } from "@/src/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

// Sidebar items config
interface SidebarSubItem {
  title: string;
  url?: string;
  icon: React.ReactNode;
  isLogout?: boolean;
}

interface SidebarItem {
  title: string;
  children: SidebarSubItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    // icon: <Video size={22} />,
    children: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: <Home size={18} />, // filled style
      },
    ],
  },
  {
    title: "Data",
    // icon: <Database size={22} />,
    children: [
      { title: "Users", url: "/admin/users", icon: <Users size={18} /> }, // outline
      {
        title: "Invoices",
        url: "/admin/invoices",
        icon: <FileText size={18} />,
      },
    ],
  },
  {
    title: "Content",
    // icon: <Video size={22} />,
    children: [
      {
        title: "Create Course",
        url: "/admin/create-course",
        icon: <VideoIcon size={18} />,
      },
      {
        title: "Live Courses",
        url: "/admin/courses",
        icon: <VideoIcon size={18} />,
      },
    ],
  },
  {
    title: "Customization",
    // icon: <LayoutDashboard size={22} />,
    children: [
      { title: "Hero", url: "/admin/hero", icon: <Layers size={18} /> },
      { title: "FAQs", url: "/admin/faq", icon: <HelpCircle size={18} /> },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: <List size={18} />,
      },
    ],
  },
  {
    title: "Controllers",
    // icon: <UserCog size={22} />,
    children: [
      {
        title: "Manage Team",
        url: "/admin/team",
        icon: <UsersRound size={18} />,
      },
    ],
  },
  {
    title: "Analytics",
    // icon: <ChartBarBig size={22} />,
    children: [
      {
        title: "Courses Analytics",
        url: "/admin/courses-analytics",
        icon: <BarChartBig size={18} />,
      },
      {
        title: "Orders Analytics",
        url: "/admin/orders-analytics",
        icon: <PieChart size={18} />,
      },
      {
        title: "Users Analytics",
        url: "/admin/users-analytics",
        icon: <ChartBarBig size={18} />,
      },
    ],
  },
  {
    title: "Extras",
    // icon: <MoreHorizontal size={22} />,
    children: [
      {
        title: "Logout",
        icon: <LogOut size={18} />,
        isLogout: true,
      },
    ],
  },
];

const AdminSidebar = () => {
  const router = useRouter();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const { user } = useSelector((state: any) => state.auth);

  const logoutHandler = async () => {
    try {
      router.push("/");
      await signOut({ redirect: false });
      await logout().unwrap(); // unwrap throws if request fails
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error("Logout failed");
      console.log(error);
    }
  };
  return (
    <Sidebar className=" border-0 border-r-2 dark:border-background-dark">
      <SidebarContent className="dark:bg-surface-dark bg-surface dark:text-text1-dark text-text1  border-0  ">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-8 mt-2">
            <Link href="/">
              <p className="text-3xl sm:text-4xl lg:text-3xl font-black text-primary ">
                Skill<span className="text-black dark:text-white">Stack</span>
              </p>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item, idx) => (
                <SidebarMenuItem key={idx} className="">
                  <SidebarMenuButton
                    asChild={!item.children}
                    className="   hover:bg-surface dark:hover:bg-surface-dark   dark:text-text2-dark text-text1 font-semibold"
                  >
                    {item.children ? (
                      <div className="flex items-center gap-2">
                        {/* {item.icon} */}
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <div>
                        <p className="flex items-center gap-2">
                          {/* {item.icon} */}
                          <span>{item.title}</span>
                        </p>
                      </div>
                    )}
                  </SidebarMenuButton>

                  {item.children && (
                    <SidebarMenuSub className="dark:border-text2-dark border-text2">
                      {item.children.map((subItem, subIdx) => (
                        <SidebarMenuSubItem key={subIdx} className="">
                          {subItem.isLogout ? (
                            <button
                              onClick={logoutHandler}
                              disabled={logoutLoading}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md dark:hover:bg-gray-700 hover:bg-gray-200 text-red-600 dark:text-red-400 disabled:opacity-50 transition-colors"
                            >
                              {logoutLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                  <span>Logging out...</span>
                                </>
                              ) : (
                                <>
                                  {subItem.icon}
                                  <span>{subItem.title}</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <SidebarMenuSubButton
                              asChild
                              className="dark:hover:bg-gray-700 hover:bg-gray-200"
                            >
                              <Link href={subItem.url || "#"}>
                                {subItem.icon}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          )}
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
      <SidebarFooter className="p-1.5 dark:bg-surface-dark bg-surface  border-t border-text2 dark:border-text2-dark ">
        <SidebarMenu className="w-full dark:hover:bg-gray-700 rounded-lg p-0.5">
          <SidebarMenuItem>
            <SidebarMenuButton className=" flex flex-row items-center gap-2  hover:bg-transparent dark:hover:bg-transparent h-10">
              <Link href="/profile">
                <div className="flex flex-row items-center gap-2 cursor-pointer">
                  <Image
                    src={user?.avatar?.url || "/images/user.webp"}
                    alt={user?.name || "user"}
                    width={36}
                    height={36}
                    className="rounded-full w-9 h-9 cursor-pointer border-2 border-primary"
                  />
                  <p className="text-sm font-semibold   text-text1 dark:text-text1-dark">
                    {user?.name}
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
