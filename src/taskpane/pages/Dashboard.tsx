import React from "react";
import Logo from "../components/Logo";
import ChatInterface from "../components/Chat";
import { Button } from "../components/ui/button";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <ChatInterface onLogout={onLogout} />
      </main>
    </div>
  );
};

export default Dashboard;
