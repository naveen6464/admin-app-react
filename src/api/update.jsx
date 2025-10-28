import { putDataApi } from "./actions";
import { URL_CONSTANTS } from "./urls";



const updateBlogData = (data, id) => {
  return putDataApi(URL_CONSTANTS.blog, data, id);
};



export {

  updateBlogData,

};
