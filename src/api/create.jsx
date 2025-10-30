import { postDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

export const addBlogData = (params) => {
  return postDataApi(URL_CONSTANTS.blog, params);
};
export const addWhitepaperData = (params) => {
  return postDataApi(URL_CONSTANTS.whitepaper, params);
};

export const addAdminUserData = (params) => {
  return postDataApi(URL_CONSTANTS.admin, params);
};
