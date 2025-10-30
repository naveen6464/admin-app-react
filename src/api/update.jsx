import { putDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";

const updateBlogData = (data, id) => {
  return putDataApi(URL_CONSTANTS.blog, data, id);
};

const updateWhitePaperData = (data, id) => {
  return putDataApi(URL_CONSTANTS.whitepaper, data, id);
};

const updateAdminUserData = (data, id) => {
  return putDataApi(URL_CONSTANTS.admin, data, id);
};

export { updateBlogData, updateWhitePaperData, updateAdminUserData };
