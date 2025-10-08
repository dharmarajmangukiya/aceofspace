import { blogItems, pageItems, propertyItems } from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if ("home" == pathname.split("/")[1]) {
      setTopMenu("home");
    }

    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    if ("listing" == pathname.split("/")[1]) {
      setTopMenu("listing");
    }
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  const menuItems = [
    {
      href: "/",
      label: "Home",
      className: "megamenu_style",
      activeKey: "home",
    },
    {
      href: "/listing",
      label: "Listing",
      className: "megamenu_style",
      activeKey: "listing",
    },
  ];

  return (
    <ul className="ace-responsive-menu">
      {menuItems.map((item, idx) => (
        <li key={idx} className={item.className}>
          <Link className="list-item" href={item.href}>
            <span
              className={
                topMenu === item.activeKey ? "title menuActive" : "title"
              }
            >
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MainMenu;

// <ul className="ace-responsive-menu">
//       <li className="visible_list dropitem">
//         <Link className="list-item" href="/">
//           <span className={topMenu == "home" ? "title menuActive" : "title"}>
//             Home
//           </span>
//         </Link>
//         {/* Level Two*/}
//         {/* <ul className="sub-menu">
//           {homeItems.map((item, index) => (
//             <li key={index}>
//               <Link className={`${handleActive(item.href)}`} href={item.href}>
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul> */}
//       </li>
//       {/* End homeItems */}

//       {/* Listing menu */}
//       <li className="megamenu_style ">
//         <Link className="list-item" href="/listing">
//           <span className={topMenu == "listing" ? "title menuActive" : "title"}>
//             Listing
//           </span>
//           {/* <span className="arrow"></span> */}
//         </Link>
//         {/* <ul className="row dropdown-megamenu sub-menu">
//           {listingItems.map((item, index) => (
//             <li className="col mega_menu_list" key={index}>
//               <h4 className="title">{item.title}</h4>
//               <ul className="sub-menu">
//                 {item.submenu.map((submenuItem, subIndex) => (
//                   <li key={subIndex}>
//                     <Link
//                       className={`${handleActive(submenuItem.href)}`}
//                       href={submenuItem.href}
//                     >
//                       {submenuItem.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul> */}
//       </li>
//       {/* End listings */}

//       {/* <li className="visible_list dropitem">
//         <a className="list-item" href="#">
//           <span
//             className={topMenu == "property" ? "title menuActive" : "title"}
//           >
//             Property
//           </span>
//           <span className="arrow"></span>
//         </a>
//         <ul className="sub-menu">
//           {propertyItems.map((item, index) => (
//             <li key={index} className="dropitem">
//               <a href="#">
//                 <span
//                   className={
//                     submenu == item.label ? "title menuActive" : "title"
//                   }
//                 >
//                   {item.label}
//                 </span>
//                 <span className="arrow"></span>
//               </a>
//               <ul className="sub-menu">
//                 {item.subMenuItems.map((subMenuItem, subIndex) => (
//                   <li key={subIndex}>
//                     <Link
//                       className={`${handleActive(subMenuItem.href)}`}
//                       href={subMenuItem.href}
//                     >
//                       {subMenuItem.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </li> */}
//       {/* End property Items */}

//       {/* <li className="visible_list dropitem">
//         <a className="list-item" href="#">
//           <span className={topMenu == "blog" ? "title menuActive" : "title"}>
//             Blog
//           </span>
//           <span className="arrow"></span>
//         </a>
//         <ul className="sub-menu">
//           {blogItems.map((item, index) => (
//             <li key={index}>
//               <Link className={`${handleActive(item.href)}`} href={item.href}>
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </li> */}
//       {/* End blog Items */}

//       {/* <li className="visible_list dropitem">
//         <a className="list-item" href="#">
//           <span className={topMenu == "pages" ? "title menuActive" : "title"}>
//             Pages
//           </span>
//           <span className="arrow"></span>
//         </a>
//         <ul className="sub-menu">
//           {pageItems.map((item, index) => (
//             <li key={index}>
//               <Link className={`${handleActive(item.href)}`} href={item.href}>
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </li> */}
//       {/* End pages Items */}
//     </ul>
