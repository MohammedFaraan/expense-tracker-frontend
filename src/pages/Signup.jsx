import { MdAccountBalanceWallet } from "react-icons/md";
import AuthForm from "../components/AuthForm";

function Signup() {
  return (
    <div className="flex align-middle justify-center">
      <div className="mx-5 my-10 space-y-5">
        <div className="w-7 rounded p-1 bg-blue-500 mx-auto">
          <MdAccountBalanceWallet className="text-white text-xl" />
        </div>
        <h2 className="font-bold text-center">Create an account</h2>
        <AuthForm pageType="signup" />
      </div>
    </div>
  );
}

export default Signup;
