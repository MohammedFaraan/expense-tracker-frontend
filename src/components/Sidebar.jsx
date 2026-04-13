import {
  MdAccountBalanceWallet,
  MdOutlineDashboard,
  MdReceiptLong,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}

      <ul className="menu w-full grow">
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
        {/* <li>
          <Link
            to="/profile"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Profile"
          >
            <FaRegUser />

            <span className="is-drawer-close:hidden">Profile</span>
          </Link>
        </li> */}
        {/* List item */}
        <li>
          <button
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Settings"
          >
            {/* Settings icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M20 7h-9"></path>
              <path d="M14 17H5"></path>
              <circle cx="17" cy="17" r="3"></circle>
              <circle cx="7" cy="7" r="3"></circle>
            </svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
