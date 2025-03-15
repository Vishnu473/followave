export const APIEndPoints = {
  login: "/users/login",
  logout: "/users/logout",
  updateProfile: "/users/update-profile",
  changePassword: "/users/change-password",
  register: "/users/register",
  refreshToken: "/users/refreshToken",
  getUserProfile: "/users/get-user-profile",
  getProfileById: (id) =>`/users/get-user-profile/${id}`,
  searchUsersByWord: (search) => `/users/search-users?query=${search}`,
  uploadProfilePic: `/upload/single/image`
};
