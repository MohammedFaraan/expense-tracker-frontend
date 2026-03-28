import AuthForm from "../components/AuthForm";

function Signup() {
  return (
    <div className="flex align-middle justify-center">
      <div className="mx-5 my-10 space-y-5">
        <h1 className="font-bold text-2xl text-center">Create an account</h1>
        <AuthForm pageType="signup" />
      </div>
    </div>
  );
}

export default Signup;
