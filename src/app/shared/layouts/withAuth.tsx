import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/shared/stores/useAuthStore";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const isHydrated = useAuthStore((state) => state.isHydrated);

    useEffect(() => {
      if (isHydrated && !isLoggedIn()) {
        router.push("/login");
      }
    }, [isHydrated, isLoggedIn, router]);

    if (!isHydrated) {
      return <div>Loading...</div>;
    }

    if (!isLoggedIn()) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
