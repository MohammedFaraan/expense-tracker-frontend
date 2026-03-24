import AuthForm from "../components/AuthForm";

function Login() {
  return (
    <div className="flex align-middle justify-center">
      <div className="mx-5 my-10 space-y-5">
        <h1 className="font-bold text-2xl text-center">Welcome Back</h1>
        <AuthForm pageType="login" />
      </div>
    </div>
  );
}

export default Login;
