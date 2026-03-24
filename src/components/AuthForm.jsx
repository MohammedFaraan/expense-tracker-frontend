import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function AuthForm({ pageType }) {
  const { login, signup, user } = useAuth();
  // const pageType = useLocation().pathname.slice(1);
  console.log(pageType);

  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    if (pageType == "login") {
      login(data);
    } else {
      signup(data);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
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
