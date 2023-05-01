import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-primary">
      <div className="container mx-auto flex justify-between items-center h-24 px-5">
        <h1 className="text-xl md:text-5xl font-semibold text-white">SignMeIn</h1>
        <div className="flex gap-4">
          <Button size="lg">Sign in</Button>
          <Button color="light" size="lg">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
