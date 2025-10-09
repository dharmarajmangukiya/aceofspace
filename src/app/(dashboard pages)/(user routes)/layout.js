import ClientOnly from "@/components/common/ClientOnly";
import UserRoute from "@/Layouts/authWrappers/UserRoute";

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
      <UserRoute>{children}</UserRoute>
    </ClientOnly>
  );
};

export default AdminLayout;
