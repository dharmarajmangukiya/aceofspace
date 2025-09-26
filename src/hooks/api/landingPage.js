import api from "@/utilis/axiosInstance";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

// Hero Section - Get Hero Images
export const useGetHeroImages = () => {
  return useQuery({
    queryKey: ["heroImages"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/hero-images");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Discover Our Featured Listings
export const useGetFeaturedListings = (params) => {
  return useQuery({
    queryKey: ["featuredListings", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/featured-listings", {
          params,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// People Love Living - Testimonials
export const useGetTestimonials = (params) => {
  return useQuery({
    queryKey: ["testimonials", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/testimonials", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Discover Our Best Deals
export const useGetBestDeals = (params) => {
  return useQuery({
    queryKey: ["bestDeals", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/best-deals", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Trusted by the world's best (companies who trust us)
export const useGetTrustedCompanies = () => {
  return useQuery({
    queryKey: ["trustedCompanies"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/trusted-companies");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Statistics/Counters
export const useGetStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/statistics");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Get Blog Posts for Landing
export const useGetBlogPosts = (params) => {
  return useQuery({
    queryKey: ["blogPosts", params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get("/landing/blog-posts", { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Newsletter Subscription
export const useNewsletterSubscription = () => {
  return useMutation({
    mutationKey: ["newsletterSubscription"],
    mutationFn: async (email) => {
      try {
        const response = await api.post("/landing/newsletter", { email });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Contact Form Submission
export const useContactForm = () => {
  return useMutation({
    mutationKey: ["contactForm"],
    mutationFn: async (formData) => {
      try {
        const response = await api.post("/landing/contact", formData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Generic GET hook for reusable queries
export const useGet = (key, url, params) => {
  return useQuery({
    queryKey: [key, params],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await api.get(url, { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// Generic infinite GET hook for paginated data
export const useGetInfinite = (key, url, params) => {
  return useInfiniteQuery({
    queryKey: [key, params],
    enabled: true,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get(url, {
          params: { ...params, page: pageParam },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination?.isNextPage) return undefined;
      return allPages.length + 1;
    },
  });
};
