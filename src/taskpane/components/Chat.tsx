import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";

// Helper to safely access Office object
const updateOfficeSettings = (isLoggedIn: boolean) => {
  try {
    // @ts-ignore - Office is available at runtime but TypeScript doesn't know about it
    if (typeof Office !== "undefined" && Office?.context?.document?.settings) {
      // @ts-ignore
      Office.context.document.settings.set("isLoggedIn", isLoggedIn);
      // @ts-ignore
      Office.context.document.settings.saveAsync();
    }
  } catch (error) {
    console.error("Error updating Office settings:", error);
  }
};

const ChatInterface = ({ onLogout }: { onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navLinks = [
    { name: "Review", action: "Document Review" },
    { name: "Compliance", action: "Run Compliance Check" },
    { name: "Ask AI", action: "Ask Question" },
    { name: "Insights", action: "View Insights" },
  ];

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    // Notify Word add-in that user is logged out
    updateOfficeSettings(false);

    // Call the parent's onLogout function
    onLogout();
  };

  const sendMessage = () => {
    // Add your send logic here
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-rose-50">
      {/* Animated Sidebar */}
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between">
        <Logo />
        <button
          className="rounded-md py-1 px-2"
          style={{ backgroundColor: "#FF0000", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white shadow-lg p-4"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="block p-2 hover:bg-rose-50 rounded-lg transition-colors text-rose-800 mb-2 cursor-pointer"
              >
                {link.name} - {link.action}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rose-50">
        {/* Add your chat messages here */}
      </div>

      {/* Message Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question about your document..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            aria-label="Send message"
            title="Send message"
            className="p-2 bg-rose-600 text-rose-500 rounded-lg hover:bg-rose-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
