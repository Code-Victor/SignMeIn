import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Button from "./base/Button";

const Navbar = ({ main = false }: { main?: boolean }) => {
  const pathname = usePathname();
  const home = pathname === "/";
  const login = pathname === "/login";
  const signup = pathname === "/signup";
  console.log(pathname);

  return (
    <nav
      className={"flex justify-between " + (main ? "bg-primary" : "bg-white")}
    >
      <div className="container mx-auto flex justify-between items-center h-24 px-5">
        <h1
          className={
            "text-xl md:text-5xl font-semibold " +
            (main ? "text-white" : "text-primary")
          }
        >
          SignMeIn
        </h1>
        <div className="flex gap-4">
          {login ? (
            ""
          ) : (
            <Link href="/signin">
              <Button size={{ initial: "md", md: "lg" }} outline={true}>
                Sign in
              </Button>
            </Link>
          )}
          {signup ? (
            ""
          ) : (
            <Link href="/signup">
              <Button
                size={{ initial: "md", md: "lg" }}
                color={main ? "light" : "primary"}
              >
                Sign up
              </Button>
            </Link>
          )}{" "}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
