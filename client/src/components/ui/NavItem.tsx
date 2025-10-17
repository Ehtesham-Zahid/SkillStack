import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, label, onClick }: NavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="text-text1 dark:text-text1-dark hover:text-primary dark:hover:text-primary font-medium"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
