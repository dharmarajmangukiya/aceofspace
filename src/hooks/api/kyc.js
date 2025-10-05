import api from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// kyc upload
export const useKycUpload = () => {
  return useMutation({
    mutationKey: ["kycUpload"],
    mutationFn: async (payload) => {
      try {
        const response = await api.post("/kyc/upload", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
