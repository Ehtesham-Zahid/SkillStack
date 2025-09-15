import Link from "next/link";

interface ProfileSidebarItemProps {
  item: {
    label: string;
    href?: string;
    icon: React.ReactNode;
  };
}

const ProfileSidebarItem = ({ item }: ProfileSidebarItemProps) => {
  return (
    <li className="flex items-center gap-2.5 cursor-pointer">
      {item.icon}
      <Link
        href={item.href || ""}
        className="text-text1 dark:text-text1-dark hover:text-primary dark:hover:text-primary font-medium text-lg"
      >
        {item.label}
      </Link>
    </li>
  );
};

export default ProfileSidebarItem;
