import ForgotPassword from "@/components/common/login-signup-modal/ForgotPassword";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password  || Settle Wise - Real Estate NextJS Template",
};

const Login = () => {
  return (
    <>
      {/* Our Compare Area */}
      <section className="our-compare pt60 pb60">
        <Image
          width={1012}
          height={519}
          src="/images/icon/login-page-icon.svg"
          alt="logo"
          className="login-bg-icon contain"
          data-aos="fade-right"
          data-aos-delay="300"
        />
        <div className="container">
          <div className="row" data-aos="fade-left" data-aos-delay="300">
            <div className="col-lg-6">
              <div className="log-reg-form signup-modal form-style1 bgc-white p50 p30-sm default-box-shadow2 bdrs12">
                <div className="text-center mb40">
                  <Link href="/">
                    <Image
                      width={138}
                      height={44}
                      className="mb25 object-fit-contain"
                      // src="/images/header-logo2.svg"
                      src="/images/settlewise-logo.jpg"
                      alt="logo"
                    />
                  </Link>
                  <h2>Forgot your password?</h2>
                  <p className="text">
                    Enter your email to reset your password.
                  </p>
                </div>
                <ForgotPassword />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
