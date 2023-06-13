import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Button } from "../base";
import { signIn } from "next-auth/react";

const Navbar = ({ main = false }: { main?: boolean }) => {
  const pathname = usePathname();
  const home = pathname === "/";
  const login = pathname === "/login";
  const signup = pathname === "/signup";

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
            <Button
              size={{ initial: "md", md: "lg" }}
              outline={true}
              onClick={() => signIn()}
            >
              Sign in
            </Button>
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
