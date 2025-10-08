"use client";
import { useRouter } from "next/navigation";

const MenuItems = ({ sideBarPanelCloseRef }) => {
  const menuItems = [
    { title: "Profile", path: "/my-profile" },
    { title: "Apartments" },
    { title: "Bungalow" },
    { title: "Houses" },
    { title: "Loft" },
    { title: "Office" },
    { title: "Townhome" },
    { title: "Villa" },
  ];

  const router = useRouter();

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
            data-bs-target="#globalLogoutModal"
          >
            Logout
          </a>
        </li>
      </ul>
    </>
  );
};

export default MenuItems;
