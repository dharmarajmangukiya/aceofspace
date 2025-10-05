"use client";
import { AuthContext } from "@/Layouts/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import toast from "react-hot-toast";

const MenuItems = ({ sideBarPanelCloseRef }) => {
  const menuItems = [
    { title: "Profile", path: "/dashboard-my-profile" },
    { title: "Apartments" },
    { title: "Bungalow" },
    { title: "Houses" },
    { title: "Loft" },
    { title: "Office" },
    { title: "Townhome" },
    { title: "Villa" },
  ];

  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  return (
    <>
      <ul className="navbar-nav">
        {menuItems.map((item, index) => (
          <li className="nav-item" key={index + 1}>
            <a
              className="nav-link"
              href="#"
              role="button"
              onClick={() => {
                sideBarPanelCloseRef?.current?.click();
                router.push(item?.path);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
          >
            Logout
          </a>
        </li>
      </ul>
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-body p-4">
              <div className="text-center mb-4">
                <h4 className="mb-2 text-dark fw-bold">Confirm Logout</h4>
                <p className="text-muted mb-0">
                  Are you sure you want to logout? You'll need to sign in again
                  to access your account.
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary  px-4 py-2"
                  data-bs-dismiss="modal"
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-white px-4 py-2"
                  onClick={() => {
                    logout(
                      {},
                      {
                        onSuccess: () => {
                          toast.success("Logged out successfully");
                          cancelButtonRef?.current?.click();
                          sideBarPanelCloseRef?.current?.click();
                        },
                        onError: () => {
                          toast.error("Failed to logout");
                          cancelButtonRef?.current?.click();
                          sideBarPanelCloseRef?.current?.click();
                        },
                      }
                    );
                  }}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
