import React, { useState, useEffect } from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Logo from "./Logo";

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

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<"login" | "dashboard">("login");

  const navigate = (page: "login" | "dashboard") => {
    setCurrentPage(page);
  };

  // Check login state when app loads
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is already logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        setCurrentPage("dashboard");

        // Make sure Word ribbon is updated
        updateOfficeSettings(true);
      }

      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  console.log(isLoading);
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center !bg-rose-50">
        <div className="flex flex-col items-center animate-pulse">
          <Logo />
          <p className="text-rose-500 text-sm mt-2">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center !bg-rose-50">
      {currentPage === "login" && <Login onLogin={() => navigate("dashboard")} />}
      {currentPage === "dashboard" && <Dashboard onLogout={() => navigate("login")} />}
    </div>
  );
};

export default App;
