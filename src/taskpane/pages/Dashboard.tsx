import React from "react";
import Logo from "../components/Logo";
import ChatInterface from "../components/Chat";
import { Button } from "../components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col h-full bg-rose-50">
      <header className="bg-white border-b border-rose-100 px-4 py-2.5 flex items-center justify-between shadow-sm">
        <Logo />
        <div className="flex items-center gap-3">
          <button
            className="text-sm text-gray-500 hover:text-rose-600 transition-colors"
            onClick={() => console.log("Settings clicked")}
          >
            Settings
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-rose-200 hover:bg-rose-50 text-rose-700"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden p-3">
        <div className="h-full rounded-md overflow-hidden shadow-sm border h-[80vh] border-rose-100">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
