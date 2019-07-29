import request from "./request";
import { BaseApi } from "../configs";

const baseApi = BaseApi + "/address";

export const addAddressApi = function(data) {
  return request({
    url: baseApi,
    method: "post",
    data
  });
};
export const getAddressListApi = function(data) {
  return request({
    url: `${baseApi}/user`,
    method: "get",
    data
  });
};
