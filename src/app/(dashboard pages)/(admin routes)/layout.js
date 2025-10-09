import AdminRoute from "@/components/common/AdminRoute";
import ClientOnly from "@/components/common/ClientOnly";

const AdminLayout = ({ children }) => {
  return (
    <ClientOnly
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <AdminRoute>{children}</AdminRoute>
    </ClientOnly>
  );
};

export default AdminLayout;
