"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";

import MainLayout from "@/Layouts/MainLayout";
import { GOOGLE_MAPS_API_KEY } from "@/utils/config";
import { APIProvider } from "@vis.gl/react-google-maps";
import "aos/dist/aos.css";
import { DM_Sans, Poppins } from "next/font/google";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import "../../public/scss/main.scss";

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap");
    }
  }, []);
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`body  ${poppins.variable} ${dmSans.variable}`}
        cz-shortcut-listen="false"
      >
        <div className="wrapper ovh">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <MainLayout>{children}</MainLayout>
          </APIProvider>
        </div>

        <ScrollToTop />
      </body>
    </html>
  );
}
