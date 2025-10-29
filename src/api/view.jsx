import { viewDataByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

const getBlogData = (dataId) => {
  return viewDataByApi(URL_CONSTANTS.blog, dataId);
};

const getWhitePaperData = (dataId) => {
  return viewDataByApi(URL_CONSTANTS.whitepaper, dataId);
};

export { getBlogData, getWhitePaperData };
