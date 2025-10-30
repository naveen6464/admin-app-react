import { getListByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";



const getBlogList = (params) => {
  return getListByApi(URL_CONSTANTS.blog, params);
};

const getWhitePaperList = (params) => {
  return getListByApi(URL_CONSTANTS.whitepaper, params);
};

const getAdminUserList = (params) => {
  return getListByApi(URL_CONSTANTS.admin, params);
};



export {
  getBlogList,
  getWhitePaperList,
  getAdminUserList
};
