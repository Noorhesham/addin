import React, { useState, useEffect } from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Logo from "./Logo";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<"login" | "dashboard">("login");

  const navigate = (page: "login" | "dashboard") => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
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
