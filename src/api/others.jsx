import { postDataApi } from "./actions";
import { OTHER_CONSTANTS } from "./urls";


const loginUser = params => {
  return postDataApi(OTHER_CONSTANTS.login, params);
}

const getToken = () => {
  const params = {};
  params.domain = "https://admin.tecosoft.org";
  return postDataApi(OTHER_CONSTANTS.get_token, params);
}



export {
  getToken,
  loginUser,

}