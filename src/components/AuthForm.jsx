import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import authentication from "../services/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ pageType }) {
  const { login, signup, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const userData = {
      username: data.email,
      password: data.password,
    };

    try {
      const res = await authentication.login(userData);
      const user = { email: res.data.email, name: res.data.name };
      login(user, res.data.access_token);
      toast.success("Login successfull", { duration: 1500 });
      navigate("/");

    } catch (e) {
      console.log(e.response);
      toast.error("Login failed! " + e.response?.data?.detail || "Network Error");
      console.error("Login Failed: ", e.response?.data?.detail || e.message);
    }
  };

  const handleSignup = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await authentication.signup(userData);
      const user = { email: res.data.email, name: res.data.name };
      console.log(res)
      signup(user, res.data.access_token);
      toast.success("Signup successfull", { duration: 1500 });

      navigate("/");

    } catch (e) {
      console.log(e.response);
      console.log(e.message);
      toast.error("Signup failed! " + e.response?.data?.detail || "Network Error");
      console.error("Signup Failed: ", e.response?.data?.detail || e.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          pageType == "login" ? handleLogin : handleSignup,
        )}
        className="shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-box w-xs p-6 space-y-4"
      >
        {pageType == "signup" && (
          <div className=" space-y-2">
            <label className="label">Name</label>
            <input
              type="text"
              className="input bg-base-200/40"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name length must be atleast 3",
                },
              })}
            />
            {errors.name && <p className="text-error">{errors.name.message}</p>}
          </div>
        )}

        <div className=" space-y-2">
          <label className="label">Email</label>
          <input
            type="email"
            className="input bg-base-200/40"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="label">Password</label>
          <input
            type="password"
            className="input bg-base-200/40"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password length must be atleast 6",
              },
              maxLength: {
                value: 12,
                message: "Password length must be less than 12",
              },
            })}
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-secondary w-full text-white mt-4">
          {pageType == "signup" ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
}
