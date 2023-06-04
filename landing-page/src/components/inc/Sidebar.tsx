import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface SidebarLinks {
  name: string;
  href: string;
  icon: () => JSX.Element;
}

const Sidebar = ({ links }: { links: SidebarLinks[] }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const path = router.pathname;
  return (
    <div
      className={
        "hidden h-screen sticky top-0 shadow-md duration-300  md:flex flex-col gap-12 " +
        (open ? "w-56" : "w-16")
      }
    >
      <div
        className={
          "flex items-center py-4 px-2 " +
          (open ? "justify-start gap-2" : "justify-center ")
        }
      >
        <Image
          src="/logo.svg"
          width={360}
          height={360}
          style={{ width: 40 }}
          alt="signmein logo"
        />
        {open && <h1 className="text-primary text-2xl font-bold">SignMeIn</h1>}
      </div>
      <button
        className=" cursor-pointer absolute rounded-full -right-3 top-24 w-7 border-2 border-primary"
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="flex-1">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              href={link.href}
              key={index}
              className={
                "flex items-center gap-2 py-4 pl-2 border-l-4 " +
                (link.href === path
                  ? "bg-primary/30  border-primary "
                  : "border-transparent ") +
                (open ? "justify-start gap-2" : "justify-center ")
              }
            >
              <div className="min-w-6 min-h-6">
                <Icon />
              </div>
              {open && (
                <span className="font-medium text-medium">{link.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
