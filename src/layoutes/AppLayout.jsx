import Sidebar from "../components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import ProtectedNavbar from "../components/ProtectedNavbar";
import { MdAccountBalanceWallet } from "react-icons/md";

export default function AppLayout() {
  return (
    // <div className="flex h-screen">

    //   {/* Sidebar */}
    //   <Sidebar />

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col">

    //     {/* Navbar */}
    //     <ProtectedNavbar />

    //     {/* Page Content */}
    //     <div className="p-6 overflow-y-auto">
    //       <Outlet />
    //     </div>

    //   </div>
    // </div>
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <ProtectedNavbar />
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </div>
  );
}
