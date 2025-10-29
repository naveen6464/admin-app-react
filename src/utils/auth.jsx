/* 

Component : auth

*/
/** ****************************** Import Packages *************************** */
import { hostConfig } from "../config";
const KARMA_USER = hostConfig.USERNAME;
// import CryptoJS from "crypto-js";

// const saveLocalUser = data => {
//   return localStorage.setItem(KARMA_USER, data);
//   // return localStorage.setItem(KARMA_USER, data);
// }

const saveLocalUser = (data) => {
  localStorage.setItem(KARMA_USER, JSON.stringify(data));
};

const getLocalUser = () => {
  const data = localStorage.getItem(KARMA_USER);
  // if (data){
  //   const decryptedData = CryptoJS.AES.decrypt(
  //     data,
  //     "secret key 123",
  //     
  //   );
  //   const userDetails = decryptedData.toString(CryptoJS.enc.Utf8);
  // return JSON.parse(userDetails);
  return JSON.parse(data);
};

const deleteLocalUser = () => {
  localStorage.removeItem(KARMA_USER);
};

export { saveLocalUser, getLocalUser, deleteLocalUser };
