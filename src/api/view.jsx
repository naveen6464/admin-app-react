

import { viewDataByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";



const getBlogData = dataId => {
  return viewDataByApi(URL_CONSTANTS.blog, dataId);
}


export {
  getBlogData,
}