import GlobalLoader from "@/components/common/GlobalLoader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

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
      <Toaster
        position="top-right"
        richColors
        expand
        duration={4000}
        // toastOptions={{
        //   style: {
        //     background: "var(--bs-body-bg)",
        //     color: "var(--bs-body-color)",
        //     border: "1px solid var(--bs-border-color)",
        //     borderRadius: "8px",
        //     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        //   },
        //   className: "custom-toast",
        // }}
      />
    </QueryClientProvider>
  );
}
