import AuthForm from "../common/AuthForm";

function Login() {

  const login = async (userData) => {
    const data = {
      username: userData.email,
      password: userData.password,
    };

    try {
      const res = await axios.post("http://localhost:8000/auth/login", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("currentUserEmail", userData.email);
      localStorage.setItem("token", res.data.access_token);
      setUser({ email: userData.email });
      toast.success("Login successfull");
      navigate("/");
    } catch (e) {
      toast.error("Login failed! " + e.response?.data?.detail);
      console.error("Login Failed:", e.response?.data || e.message);
    }
  };
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
