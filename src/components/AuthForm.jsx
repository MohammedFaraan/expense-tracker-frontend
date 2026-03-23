import axios from "axios";
import { useForm } from "react-hook-form";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    console.log(data);
    const userData = {
      username: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        userData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );
      console.log(res.data);
    } catch (e) {
      console.error("Login Failed:", e.response?.data || e.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(login)}
        className="shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-box w-xs p-6 space-y-4"
      >
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
                message: "Password length must be atleast 12",
              },
            })}
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-secondary w-full text-white mt-4">
          Login
        </button>
      </form>
    </div>
  );
}
