import { request } from "@/plugins/request";

// 用户登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/api/users/login",
    data,
  });
};

// 用户注册
export const register = (data) => {
  return request({
    method: "POST",
    url: "/api/users",
    data,
  });
};

// 获取用户信息
export const getProfile = (username) => {
  return request({
    method: "GET",
    url: "/api/profiles/" + username,
  });
};

// {
//   "user":{
//     "email": "jake@jake.jake",
//     "bio": "I like to skateboard",
//     "image": "https://i.stack.imgur.com/xHWG8.jpg"
//   }
// }
// 修改用户信息
export const UpdateUser = (user) => {
  return request({
    method: "PUT",
    url: "/api/user",
    data: {
      user,
    },
  });
};
