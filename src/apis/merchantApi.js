import request from "./request";
import { BaseApi } from "../configs";

const baseApi = BaseApi + "/merchant";

export const searchMerchantsApi = function(data = {}) {
  return request({
    url: baseApi,
    method: "get",
    data
  });
};
export const getMerchantApi = function(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: "get",
    data: {}
  });
};
export const getTypesApi = function(id) {
  return request({
    url: `${baseApi}/types`,
    method: "get",
    data: { id }
  });
};
