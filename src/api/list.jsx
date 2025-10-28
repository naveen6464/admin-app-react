import { getListByApi } from "./actions";
import { URL_CONSTANTS } from "./urls";



const getBlogList = (params) => {
  return getListByApi(URL_CONSTANTS.blog, params);
};


const getOpenTickets = (params) => {
  params.status = "open";
  return getListByApi(URL_CONSTANTS.support, params);
};


export {
  getBlogList,
  getOpenTickets,
};
