import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import profileImage from "../assets/user-profile.svg";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Profile() {
  const { profileData, isLoading, isError, updateProfile } = useProfile();
  const { updateUserInLocalStorage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // When profile data loads/refetches, sync into the form
  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name ?? "",
        email: profileData.email ?? "",
      });
    }
  }, [profileData, reset]);

  // Values to display in the header (live while editing)
  const currentName = watch("name");
  const currentEmail = watch("email");

  const displayName = useMemo(
    () => currentName || profileData?.name || "",
    [currentName, profileData],
  );
  const displayEmail = useMemo(
    () => currentEmail || profileData?.email || "",
    [currentEmail, profileData],
  );

  const discardChanges = () => {
    if (profileData) {
      reset({
        name: profileData.name ?? "",
        email: profileData.email ?? "",
      });
    }
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    if (!isEditing) return;

    // data = { name, email } – exactly what updateProfile expects
    updateProfile(
      { name: data.name, email: data.email },
      {
        onSuccess: (updatedUser) => {
          const mergedUser = updatedUser ?? {
            ...(profileData || {}),
            name: data.name,
            email: data.email,
          };

          // keep AuthContext + localStorage in sync
          updateUserInLocalStorage(mergedUser);

          // sync form with latest values
          reset({
            name: mergedUser.name ?? "",
            email: mergedUser.email ?? "",
          });

          setIsEditing(false);
          toast.success("Profile updated");
        },
      },
    );
  };

  if (isLoading && !profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity text-info w-24" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-error text-xl font-bold">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 mx-auto py-6 w-[95%]">
      <h1 className="text-4xl font-bold">Profile</h1>

      {/* Header card */}
      <div className="flex justify-between items-center bg-base-200/10 p-3 rounded-box shadow-sm hover:shadow-md w-full">
        <div className="flex flex-row items-center gap-4">
          <img src={profileImage} alt="user-profile" className="size-24" />
          <div>
            <h3 className="text-xl font-bold capitalize">{displayName}</h3>
            <p>{displayEmail}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            type="button"
            className="btn text-secondary"
            onClick={isEditing ? discardChanges : () => setIsEditing(true)}
          >
            {isEditing ? "Discard" : "Edit"}
          </button>
          <button
            type="submit"
            form="profile-form"
            className="btn btn-secondary"
            disabled={!isEditing || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      {/* Details form */}
      <div className="bg-white p-4 rounded-box shadow-sm hover:shadow-md w-full">
        <h3 className="text-xl font-bold capitalize">Account Details</h3>
        <hr className="border-t-2 border-gray-300 my-2" />

        <form
          id="profile-form"
          className="space-y-4 pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="label text-black font-medium">Full Name</label>
              <input
                type="text"
                className="input bg-base-200/40 font-medium w-full"
                disabled={!isEditing}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 1,
                    message: "Name must have at least 1 character",
                  },
                })}
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="label text-black font-medium">Email</label>
              <input
                type="email"
                className="input bg-base-200/40 font-medium w-full"
                disabled={!isEditing}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="label text-black font-medium">Contact</label>
            <input
              type="text"
              className="input bg-base-200/40 font-medium w-full"
              defaultValue="XXXXXXXXXX"
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
