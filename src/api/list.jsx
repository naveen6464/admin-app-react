import { getListByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";



const getBlogList = (params) => {
  return getListByApi(URL_CONSTANTS.blog, params);
};

const getWhitePaperList = (params) => {
  return getListByApi(URL_CONSTANTS.whitepaper, params);
};



export {
  getBlogList,
  getWhitePaperList
};
