import GlobalLoader from "@/components/common/GlobalLoader";
import GlobalLogoutModal from "@/components/common/GlobalLogoutModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthProvider";

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
        <GlobalLoader>{children}</GlobalLoader>
        <GlobalLogoutModal />
      </AuthProvider>
      <Toaster duration={4000} />
    </QueryClientProvider>
  );
}
