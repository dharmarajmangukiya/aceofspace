"use client";
import { AuthContext } from "@/Layouts/AuthProvider";
import { getSidebarItems } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
const SidebarDashboard = () => {
  const pathname = usePathname();
  const { role } = useContext(AuthContext);
  const router = useRouter();
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    setSidebarItems(getSidebarItems(role));
  }, [role]);

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <a
                  href={"#"}
                  {...(item?.props ?? {})}
                  onClick={() => {
                    if (item?.href !== "#") {
                      router.push(item?.href);
                    }
                  }}
                  className={`items-center   ${
                    pathname === item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
