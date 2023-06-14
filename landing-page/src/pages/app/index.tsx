import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Ring } from "@uiball/loaders";

const App = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (session?.user.role === "is_organization") {
    router.push("/app/organizations");
  }
  if (session?.user.role === "is_worker") {
    router.push("/app/workers");
  }
  if (status === "loading") {
    return (
      <div className="h-screen w-screen grid place-items-center">
        <Ring size={50} color="#663ed6" />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return (
    <div className="min-h-screen min-w-screen grid place-items-center">
      <Ring size={50} color="#663ed6" />
    </div>
  );
};

export default App;
