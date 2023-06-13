import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    return <p>Redirecting...</p>;
  }
  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }

  return <div>Redirecting...</div>;
};

export default App;
