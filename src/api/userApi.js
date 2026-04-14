import api from "./client";

export const getProfile = () => {
  return api.get("/user/profile");
};

export const updateUserProfile = (data) => {
  return api.patch("/user/profile", data);
};
