import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className="text-text1 dark:text-text1-dark hover:text-primary dark:hover:text-primary font-medium"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
