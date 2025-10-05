"use client";
import { useEffect, useRef, useState } from "react";
import OtpVerification from "./OtpVerification";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginSignupModalComponent = () => {
  const closeModal = useRef(null);
  const loginTabButton = useRef(null);
  const signUpTabButton = useRef(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [signUpData, setSignUpData] = useState({});

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">
          Welcome to Settle Wise
        </h5>
        <button
          type="button"
          ref={closeModal}
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      {/* End header */}

      <div className="modal-body">
        <div className="log-reg-form">
          {isOtpSent ? (
            <OtpVerification
              signUpData={signUpData}
              setSignUpData={setSignUpData}
              setIsOtpSent={setIsOtpSent}
              loginTabButton={loginTabButton}
            />
          ) : (
            <div className="navtab-style2">
              <nav>
                <div className="nav nav-tabs mb20" id="nav-tab" role="tablist">
                  <button
                    ref={loginTabButton}
                    className="nav-link active fw600"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Sign In
                  </button>
                  <button
                    ref={signUpTabButton}
                    className="nav-link fw600"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    New Account
                  </button>
                </div>
              </nav>
              {/* End nav tab items */}

              <div className="tab-content" id="nav-tabContent2">
                <div
                  className="tab-pane fade show active fz15"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <SignIn
                    closeModal={closeModal}
                    setIsOtpSent={setIsOtpSent}
                    signUpTabButton={signUpTabButton}
                  />
                </div>
                {/* End signin content */}

                <div
                  className="tab-pane fade fz15"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <SignUp
                    setIsOtpSent={setIsOtpSent}
                    setSignUpData={setSignUpData}
                    loginTabButton={loginTabButton}
                  />
                </div>
                {/* End signup content */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginSignupModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Bootstrap event listeners for modal show/hide
    const modalEl = document.getElementById("loginSignupModal");
    const handleShow = () => setIsModalOpen(true);
    const handleHide = () => setIsModalOpen(false);

    modalEl.addEventListener("show.bs.modal", handleShow);
    modalEl.addEventListener("hidden.bs.modal", handleHide);

    return () => {
      modalEl.removeEventListener("show.bs.modal", handleShow);
      modalEl.removeEventListener("hidden.bs.modal", handleHide);
    };
  }, []);

  if (!isModalOpen) return null;

  return <LoginSignupModalComponent />;
};

export default LoginSignupModal;
