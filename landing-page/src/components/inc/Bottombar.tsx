import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Links {
  name: string;
  href: string;
  icon: () => JSX.Element;
}

function Bottombar({ links }: { links: Links[] }) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
      <div className="flex justify-evenly w-full py-3">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <Link
              href={link.href}
              key={index}
              className={
                " focus:text-white hover:text-white justify-center flex text-center rounded-lg p-4 " +
                (link.href === path
                  ? "bg-primary/70 text-white"
                  : "bg-white text-primary")
              }
            >
              <div className="min-w-6 min-h-6">
                <Icon />
              </div>
              <span className="font-medium text-medium sr-only">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bottombar;
