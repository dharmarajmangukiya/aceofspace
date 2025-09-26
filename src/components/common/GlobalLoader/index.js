"use client";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * GlobalLoader will show a full-screen loading indicator whenever there are
 * active queries or mutations with `meta.globalLoader === true`.
 *
 * Example:
 * useQuery({
 *   queryKey: ['users'],
 *   queryFn: fetchUsers,
 *   meta: { globalLoader: true }
 * })
 *
 * useMutation({
 *   mutationFn: updateUser,
 *   meta: { globalLoader: true }
 * })
 */
export default function GlobalLoader({ children }) {
  // active queries marked with meta.globalLoader === true
  const isFetching = useIsFetching({
    predicate: (query) => query.meta?.globalLoader === true,
  });

  // active mutations marked with meta.globalLoader === true
  const isMutating = useIsMutating({
    predicate: (mutation) => mutation.meta?.globalLoader === true,
  });

  const loading = isFetching > 0 || isMutating > 0;

  // lock/unlock body scroll
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {loading && (
        <div className="global-loader">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#EB6753"
                stroke="#EB6753"
                strokeWidth="15"
                r="15"
                cx="40"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="1.3"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4"
                ></animate>
              </circle>
              <circle
                fill="#EB6753"
                stroke="#EB6753"
                strokeWidth="15"
                r="15"
                cx="100"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="1.3"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2"
                ></animate>
              </circle>
              <circle
                fill="#EB6753"
                stroke="#EB6753"
                strokeWidth="15"
                r="15"
                cx="160"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="1.3"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
            </svg>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
