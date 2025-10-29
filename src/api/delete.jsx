

import { deleteDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";


const deleteBlogData = id => {
  return deleteDataApi(URL_CONSTANTS.blog, id);
}

const deleteWhitePaperData = id => {
  return deleteDataApi(URL_CONSTANTS.whitepaper, id);
}


export {
  deleteBlogData,
  deleteWhitePaperData
};