import request from "./request";
import { BaseApi } from "../configs";

const baseApi = BaseApi + "/user";

export const registerApi = function(data = {}) {
  return request({
    url: `${baseApi}/register`,
    method: "post",
    data
  });
};
export const loginApi = function(data = {}) {
  return request({
    url: `${baseApi}/login`,
    method: "post",
    data
  });
};
export const getUserinfoApi = function() {
  return request({
    url: `${baseApi}/userinfo`,
    method: "get",
    data: {}
  });
};
