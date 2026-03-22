import AuthForm from "../components/AuthForm";

function Login() {
  return (
    <main className="flex align-middle justify-center min-h-full">
      <div className="mx-5 my-10 space-y-5">
        <h2 className="font-bold text-center">Welcome Back</h2>
        <AuthForm />
      </div>
    </main>
  );
}

export default Login;
