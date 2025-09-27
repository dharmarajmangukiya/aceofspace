import GlobalLoader from "@/components/common/GlobalLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <GlobalLoader>{children}</GlobalLoader>
      {/* <Toaster position="top-right" richColors duration={4000} /> */}
    </QueryClientProvider>
  );
}
