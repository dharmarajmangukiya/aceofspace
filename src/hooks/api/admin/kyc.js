import { AuthContext } from "@/Layouts/AuthProvider";
import api from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

// kyc list
export const useKycList = () => {
  const { isAuth } = useContext(AuthContext);
  return useQuery({
    queryKey: ["kycList"],
    enabled: isAuth,
    meta: { globalLoader: true },
    queryFn: async () => {
      try {
        const response = await api.get("/admin/kyc/pending");
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};

// approve/reject kyc
export const useApproveRejectKyc = () => {
  return useMutation({
    meta: { globalLoader: true },
    mutationFn: async ({ kycId, status }) => {
      const response = await api.put(`/admin/kyc/update/${kycId}`, { status });
      return response.data;
    },
  });
};
