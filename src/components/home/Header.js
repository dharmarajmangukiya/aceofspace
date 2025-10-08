"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import { AuthContext } from "@/Layouts/AuthProvider";
import { role_enum } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import LoginSignupModal from "../common/login-signup-modal";
const menuItems = [
  {
    title: "MANAGE ACCOUNT",
    items: [
      {
        icon: "flaticon-user",
        text: "My Profile",
        href: "/my-profile",
      },
      {
        icon: "flaticon-exit",
        text: "Logout",
        href: "#",
        props: {
          role: "button",
          id: "logoutButton",
          "data-bs-toggle": "modal",
          "data-bs-target": "#globalLogoutModal",
        },
      },
    ],
  },
];

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuth, role, userData } = useContext(AuthContext);

  const { firstName, lastName } = userData || {};
  const router = useRouter();
  const pathname = usePathname();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    setIsLoggedIn(isAuth);
  }, [isAuth]);

  useEffect(() => {
    // Set authentication status after component mounts

    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu  ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={138}
                        height={44}
                        // src="/images/header-logo.svg"
                        src="/images/settlewise-logo.jpg"
                        className="object-fit-contain"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
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

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {isLoggedIn ? (
                    <>
                      {role === role_enum.ADMIN ? (
                        <>
                          <li className=" user_setting">
                            <div className="dropdown">
                              <a
                                className="btn p-0 user-dropdown-trigger"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {(() => {
                                  const name = (
                                    (firstName || "") +
                                    " " +
                                    (lastName || "")
                                  ).trim();
                                  return name ? (
                                    <>
                                      <i className="far fa-user-circle fz16 me-1" />
                                      {name}
                                    </>
                                  ) : (
                                    <i className="far fa-user-circle fz16 me-1" />
                                  );
                                })()}
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
                                            pathname == item.href
                                              ? "-is-active"
                                              : ""
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
                          <Link
                            className="ud-btn btn-white add-property bdrs12 mx-2 mx-xl-4 border-0"
                            href="/dashboard"
                          >
                            Dashboard
                            <i className="fal fa-arrow-right-long" />
                          </Link>
                        </>
                      ) : (
                        <Link
                          className="ud-btn btn-white add-property bdrs12 mx-2 mx-xl-4 border-0"
                          href="/add-property"
                        >
                          Add Property
                          <i className="fal fa-arrow-right-long" />
                        </Link>
                      )}
                      <a
                        className="sidemenu-btn filter-btn-right"
                        href="#"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#LandingPageSidebarPanel"
                        aria-controls="LandingPageSidebarPanelLabel"
                      >
                        <Image
                          width={25}
                          height={9}
                          className="img-1"
                          src="/images/icon/nav-icon-white.svg"
                          alt="humberger menu"
                        />

                        <Image
                          width={25}
                          height={9}
                          className="img-2"
                          src="/images/icon/nav-icon-dark.svg"
                          alt="humberger menu"
                        />
                      </a>
                    </>
                  ) : (
                    <Link
                      href="#"
                      // href="/auth/login"
                      className="login-info d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">
                        Login / Register
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="LandingPageSidebarPanel"
        aria-labelledby="LandingPageSidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
