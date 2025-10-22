"use client";

import { useEffect, useState } from "react";

export default function Error({ error }) {
  const [isDev, setIsDev] = useState(false);
  const [showStack, setShowStack] = useState(false);

  useEffect(() => {
    const devMode =
      typeof window !== "undefined" && window.location.hostname === "localhost";
    setIsDev(devMode);

    if (devMode) {
      console.error("Error details:", error);
    }
  }, [error]);

  const handleReset = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        .error-page {
          min-height: 100vh;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .error-content {
          max-width: 600px;
          width: 100%;
        }
        .error-icon {
          font-size: 48px;
          margin-bottom: 20px;
          color: #000;
        }
        .error-title {
          font-size: 24px;
          font-weight: 600;
          color: #000;
          margin-bottom: 10px;
        }
        .error-message {
          font-size: 16px;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.5;
        }
        .error-details {
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 20px;
        }
        .error-details h3 {
          font-size: 14px;
          font-weight: 600;
          color: #000;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .error-details p {
          font-size: 13px;
          color: #333;
          font-family: monospace;
          word-break: break-word;
          margin: 0;
        }
        .stack-toggle {
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 12px 15px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .stack-toggle:hover {
          background: #eee;
        }
        .stack-content {
          background: #1a1a1a;
          border: 1px solid #ddd;
          border-radius: 0 0 6px 6px;
          padding: 15px;
          margin-top: -20px;
          margin-bottom: 20px;
          max-height: 300px;
          overflow: auto;
        }
        .stack-content pre {
          color: #0f0;
          font-size: 12px;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .dev-notice {
          background: #fffbeb;
          border: 1px solid #fbbf24;
          border-radius: 6px;
          padding: 12px 15px;
          margin-bottom: 20px;
          font-size: 13px;
          color: #92400e;
        }
        .buttons {
          display: flex;
          gap: 10px;
          margin-top: 30px;
        }
        .btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-primary {
          background: #000;
          color: white;
        }
        .btn-primary:hover {
          background: #333;
        }
        .btn-secondary {
          background: white;
          color: #000;
        }
        .btn-secondary:hover {
          background: #f5f5f5;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 13px;
          color: #666;
        }
        .footer a {
          color: #000;
          text-decoration: underline;
        }
        .timestamp {
          font-family: monospace;
          font-size: 12px;
          color: #999;
          margin-top: 20px;
        }
        @media (max-width: 600px) {
          .buttons {
            flex-direction: column;
          }
          .error-title {
            font-size: 20px;
          }
          .error-icon {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="error-page">
        <div className="error-content">
          <div style={{ textAlign: "center" }}>
            <div className="error-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h1 className="error-title">
              {isDev ? "Development Error" : "Something went wrong"}
            </h1>
            <p className="error-message">
              {isDev
                ? "An error occurred during development. Details below:"
                : "We encountered an unexpected error. Please try again."}
            </p>
          </div>

          {isDev ? (
            <>
              <div className="error-details">
                <h3>
                  <i className="fas fa-bug"></i>
                  Error Message
                </h3>
                <p>{error?.message || "Unknown error occurred"}</p>
              </div>

              {error?.stack && (
                <>
                  <button
                    onClick={() => setShowStack(!showStack)}
                    className="stack-toggle"
                  >
                    <span>
                      <i className="fas fa-code"></i> Stack Trace
                    </span>
                    <i
                      className={`fas fa-chevron-${showStack ? "up" : "down"}`}
                    ></i>
                  </button>

                  {showStack && (
                    <div className="stack-content">
                      <pre>{error.stack}</pre>
                    </div>
                  )}
                </>
              )}

              <div className="dev-notice">
                <i className="fas fa-info-circle"></i> Development mode: Error
                details shown because you're on localhost.
              </div>
            </>
          ) : (
            <div className="timestamp" style={{ textAlign: "center" }}>
              Error ID: {new Date().toISOString()}
            </div>
          )}

          <div className="buttons">
            <button onClick={handleReset} className="btn btn-primary">
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <button onClick={handleHome} className="btn btn-secondary">
              <i className="fas fa-home"></i>
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
