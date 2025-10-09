import ClientOnly from "@/components/common/ClientOnly";
import SharedRoute from "@/Layouts/authWrappers/SharedRoute";

const SharedLayout = ({ children }) => {
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
      <SharedRoute>{children}</SharedRoute>
    </ClientOnly>
  );
};

export default SharedLayout;
