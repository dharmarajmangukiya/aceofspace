import MobileMenu from "@/components/common/mobile-menu";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";

const Layout = ({ children }) => {
  return (
    <>
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      {children}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Layout;
