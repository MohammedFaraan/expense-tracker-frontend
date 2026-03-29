import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <PublicNavbar />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}