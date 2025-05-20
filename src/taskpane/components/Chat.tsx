import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navLinks = [
    { name: "Review", action: "Document Review" },
    { name: "Compliance", action: "Run Compliance Check" },
    { name: "Ask AI", action: "Ask Question" },
    { name: "Insights", action: "View Insights" },
  ];

  const sendMessage = () => {
    // Add your send logic here
    console.log("Sending:", message);
    setMessage("");
  };

  return (
    <div style={{ height: "80vh" }} className="flex relative flex-col">
      <motion.nav
        className="bg-rose-700 py-3 px-4 cursor-pointer rounded-t-md shadow-sm flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
        animate={{ backgroundColor: isOpen ? "#be123c" : "#e11d48" }}
      >
        <span className="text-white font-semibold text-lg">Bridge</span>
        <div className="ml-auto">
          <motion.span className="text-white" animate={{ rotate: isOpen ? 180 : 0 }}>
            {isOpen ? "▲" : "▼"}
          </motion.span>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white h-44 w-full absolute top-10 z-40 left-0 overflow-y-scroll shadow-md overflow-hidden"
          >
            <div className="p-3">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block p-3 hover:bg-rose-50 rounded-lg transition-colors text-rose-800 mb-2 cursor-pointer flex items-center"
                >
                  <span className="font-medium">{link.name}</span>
                  <span className="ml-2 text-xs text-rose-600 opacity-80">- {link.action}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{ height: "90%" }}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-rose-50 min-h-[200px]"
      >
        <div className="flex justify-center items-center h-full opacity-60">
          <p className="text-rose-800 text-sm">Your conversation will appear here</p>
        </div>
      </div>

      <div className="border-t border-rose-100 flex flex-col p-4 h-full bg-white rounded-b-md shadow-sm">
        <div className="flex flex-col mt-auto">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about your document..."
              className="flex-1 p-2.5 border border-rose-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/30 text-sm"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2.5 bg-rose-600 text-rose-400 rounded-full hover:bg-rose-700 transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          <p className="text-xs text-gray-500 mt-2 italic text-center">
            AI-Generated content may be inaccurate and requires human review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
