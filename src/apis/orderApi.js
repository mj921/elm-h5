import request from "./request";
import { BaseApi } from "../configs";

const baseApi = BaseApi + "/order";

export const addOrderApi = function(data) {
  return request({
    url: baseApi,
    method: "post",
    data
  });
};
export const getOrdersApi = function(data) {
  return request({
    url: baseApi,
    method: "get",
    data
  });
};
export const getOrderApi = function(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: "get",
    data: {}
  });
};
