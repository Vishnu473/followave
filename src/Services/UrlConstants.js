export const APIEndPoints = {
  login: "/users/login",
  logout: "/users/logout",
  updateProfile: "/users/update-profile",
  changePassword: "/users/change-password",//TODO
  register: "/users/register",
  refreshToken: "/users/refreshToken",
  getUserProfile: "/users/get-user-profile",
  getProfileById: (id) =>`/users/get-user-profile/${id}`,
  searchUsersByWord: (search) => `/users/search-users?query=${search}`,

  // Upload API EndPoints
  uploadSingleProfilePic: "/upload/single/image",
  uploadSingleVideo: "/upload/single/image", //TODO
  uploadMultipleImages:"/upload/multiple/image",
  uploadMultipleVideos:"/upload/multiple/video",
  deleteMedia:"/upload/delete/media",

  //Post API endPoints
  addPost:"posts/add-post",
  getUserposts: (userId) => `/posts/get-user-posts/${userId}`
};
