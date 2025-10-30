import GlobalLoader from "@/components/common/GlobalLoader";
import GlobalLogoutModal from "@/components/common/GlobalLogoutModal";
import { useGetProfile } from "@/hooks/api/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext, AuthProvider } from "./AuthProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // do not retry failed queries automatically
      retry: false,
      // data considered fresh forever until you manually refetch
      staleTime: Infinity,
      // do not auto-refetch on focus or reconnect
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

export default function MainLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalLoader>
          <AppInitializer>{children}</AppInitializer>
        </GlobalLoader>
        <GlobalLogoutModal />
      </AuthProvider>
      <Toaster duration={4000} />
    </QueryClientProvider>
  );
}

// AppInitializer is a component that will initialize the app when the user is logged in
const AppInitializer = ({ children }) => {
  const { isLoading } = useGetProfile();
  const { userData, isAuth } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth || isLoading || !userData) return;
    setTimeout(() => {
      // Enforce KYC: if missing or not approved, allow only /my-profile route
      const isKycApproved = userData?.kyc?.status === "approved";
      const onMyProfileRoute = pathname?.startsWith("/my-profile");
      if (!isKycApproved && !onMyProfileRoute) {
        const message =
          userData?.kyc?.status === "pending"
            ? "Your KYC is under review."
            : "Please update your KYC";
        toast.error(message);
        router.replace("/my-profile?scrollTo=kyc-update");
        return;
      }
    }, 1000);
  }, [userData, pathname, isAuth, isLoading, router]);

  if (isLoading) {
    return <GlobalLoader />;
  }
  return children;
};
