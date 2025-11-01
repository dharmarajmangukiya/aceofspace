import Image from "next/image";
import ChatBoxForm from "./ChatBoxForm";
import UserChatBoxContent from "./UserChatBoxContent";

const MessageContainer = () => {
  return (
    <div className="message_container mt30-md">
      <div className="user_heading px-0 mx30">
        <div className="wrap">
          <span className="contact-status online" />
          <Image
            width={50}
            height={50}
            className="img-fluid mr10"
            src="/images/inbox/ms3.png"
            alt="ms3.png"
          />
          <div className="meta d-sm-flex justify-content-sm-between align-items-center">
            <div className="authors">
              <h6 className="name mb-0">Arlene McCoy</h6>
              <p className="preview">Active</p>
            </div>
            <div>
              <a
                className="text-decoration-underline fz14 fw600 dark-color ff-heading"
                href="#"
              >
                Delete Conversation
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* End .user_heading */}
      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          <UserChatBoxContent />
        </ul>
      </div>
      {/* End inbox-chatting */}
      <div className="mi_text">
        <div className="message_input">
          <ChatBoxForm />
        </div>
      </div>
      {/* End button */}
    </div>
  );
};

export default MessageContainer;
