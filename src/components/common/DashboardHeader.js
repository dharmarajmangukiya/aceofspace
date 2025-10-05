"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          icon: "flaticon-user",
          text: "My Profile",
          href: "/dashboard-my-profile",
        },
        {
          icon: "flaticon-exit",
          text: "Logout",
          href: "#",
          props: {
            role: "button",
            id: "logoutButton",
            "data-bs-toggle": "modal",
            "data-bs-target": "#logoutModal",
          },
        },
      ],
    },
    {
      title: "MAIN",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Message",
          href: "/dashboard-message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Add New Property",
          href: "/dashboard-add-property",
        },
        {
          icon: "flaticon-home",
          text: "My Properties",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-like",
          text: "My Favorites",
          href: "/dashboard-my-favourites",
        },
        {
          icon: "flaticon-search-2",
          text: "Saved Search",
          href: "/dashboard-saved-search",
        },
        { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
      ],
    },
  ];

  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" href="/">
                      <Image
                        width={138}
                        height={44}
                        // src="/images/header-logo2.svg"
                        src="/images/settlewise-logo.jpg"
                        className="object-fit-contain"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    <li className="d-none d-sm-block">
                      <Link className="text-center mr15" href="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li>
                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li>
                    {/* End notification icon */}

                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <Image
                            width={44}
                            height={44}
                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>
                        <div className="dropdown-menu">
                          <div className="user_setting_content">
                            {menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    sectionIndex === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <a
                                    key={itemIndex}
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    href={"#"}
                                    {...(item?.props ?? {})}
                                    onClick={() => {
                                      if (item?.href !== "#") {
                                        router.push(item?.href);
                                      }
                                    }}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
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
                  // ref={cancelButtonRef}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-white px-4 py-2"
                  // onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DashboardHeader;
