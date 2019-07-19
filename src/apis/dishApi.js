import request from "./request";
import { BaseApi } from "../configs";

const baseApi = BaseApi + "/dish";

export const getDishAllApi = function(data) {
  return request({
    url: `${baseApi}/all`,
    method: "get",
    data
  });
};
