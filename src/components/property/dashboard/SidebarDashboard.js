"use client";
import { getUserData } from "@/hooks/api/auth";
import { sidebarItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const SidebarDashboard = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setMounted(true);
    const userRole = getUserData()?.role?.name || null;
    setRole(userRole);
  }, []);

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {!mounted
          ? null
          : sidebarItems(role).map((section, sectionIndex) => (
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
                    <Link
                      href={item.href}
                      className={`items-center   ${
                        pathname == item.href ? "-is-active" : ""
                      } `}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.text}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
