import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
      if (!isLoggedIn()) {
        router.push("/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn()) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
