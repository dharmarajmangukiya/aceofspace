"use client";

const ChatBoxForm = () => {
  return (
    <form
      className="d-flex align-items-center gap-2"
      style={{
        padding: "16px 20px",
        backgroundColor: "#ffffff",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission here
      }}
    >
      <input
        type="text"
        placeholder="Type a message..."
        aria-label="Type a message"
        required
        style={{
          flex: 1,
          border: "1px solid #e0e0e0",
          borderRadius: "24px",
          padding: "12px 20px",
          fontSize: "14px",
          outline: "none",
          transition: "all 0.2s ease",
          backgroundColor: "#f8f9fa",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#007bff";
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e0e0e0";
          e.target.style.backgroundColor = "#f8f9fa";
          e.target.style.boxShadow = "none";
        }}
      />
      <button
        type="submit"
        className=" ud-btn btn-thm"
        style={{
          borderRadius: "24px",
          padding: "12px 24px",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <span>Send</span>
        <i
          className="fas fa-paper-plane"
          style={{
            fontSize: "12px",
            marginLeft: 0,
            transform: "rotate(0deg)",
            WebkitTransform: "rotate(0deg)",
          }}
        />
      </button>
    </form>
  );
};

export default ChatBoxForm;
