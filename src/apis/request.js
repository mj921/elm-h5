import axios from "axios";
import router from "../router";
import ErrorCode from "@/enums/ErrorCode";
import { BaseUrl } from "../configs";
import Message from "../utils/message";

const requestUrls = {};
/**
 * 请求
 * @param {object} option
 * @param {boolean} repeatSubmitValidate 是否校验重复提交
 */
const request = (option, { repeatSubmitValidate = false } = {}) => {
  return new Promise((resolve, reject) => {
    option.headers = {
      Authorization: localStorage.getItem("token") || ""
    };
    option.method = option.method || "post";
    option.url = BaseUrl + option.url;
    let repeatCommitFlag = false; // 是否重复提交
    if (option.method.toLowerCase() === "get") {
      option.params = Object.assign({}, option.data);
      delete option.data;
    }
    if (repeatSubmitValidate) {
      if (requestUrls[option.url]) {
        repeatCommitFlag = true;
      } else {
        requestUrls[option.url] = true;
      }
    }
    if (!repeatCommitFlag) {
      axios(option)
        .then(res => {
          switch (res.data.code) {
            case ErrorCode.RequestSuccess:
              resolve(res.data);
              break;
            default:
              Message(res.data.message);
              reject(res.data);
          }
          setTimeout(() => {
            delete requestUrls[option.url];
          });
        })
        .catch(res => {
          let message = "error";
          switch (res.response.status) {
            case 400:
              message = "请求错误-400";
              break;
            case 401:
              message = "未授权，请登录-401";
              break;
            case 403:
              message = "拒绝访问-403";
              break;
            case 404:
              message = "请求地址出错-404";
              break;
            case 408:
              message = "请求超时-408";
              break;
            case 500:
              message = "服务器内部错误-500";
              break;
            case 501:
              message = "服务未实现-501";
              break;
            case 502:
              message = "网关错误-502";
              break;
            case 503:
              message = "服务不可用-503";
              break;
            case 504:
              message = "网关超时-504";
              break;
            case 505:
              message = "HTTP版本不受支持-505";
              router.push("/500");
              break;
            default:
              message = res.message || "error";
          }
          Message(message);
          setTimeout(() => {
            delete requestUrls[option.url];
          });
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ code: res.response.status, message });
        });
    } else {
      Message("请勿重复提交");
    }
  });
};
export default request;
