import {
  MdAccountBalanceWallet,
  MdOutlineDashboard,
  MdReceiptLong,
  MdOutlineLogout,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}

      <ul className="menu w-full grow font-semibold">
        {/* List item */}
        <li className="pb-2 border-b-2 border-b-base-300 w-full">
          <Link
            to="/"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          >
            <div className="w-7 rounded p-1 bg-blue-500 mx-auto">
              <MdAccountBalanceWallet className="text-white text-xl" />
            </div>
            <span className="text-black font-bold text-xl is-drawer-close:hidden">
              Finance Intel
            </span>
          </Link>
        </li>
       
        <li className="">
          <Link
            to="/dashboard"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Dashboard"
          >
            <MdOutlineDashboard className="my-1.5" />
            <span className="is-drawer-close:hidden">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Expenses"
          >
            <MdReceiptLong className="my-1.5" />
            <span className="is-drawer-close:hidden">Expenses</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Profile"
          >
            <FaRegUser />

            <span className="is-drawer-close:hidden">Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-red-600 mt-5"
            data-tip="Logout"
          >
            <MdOutlineLogout />

            <span className="is-drawer-close:hidden" onClick={logout}>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
