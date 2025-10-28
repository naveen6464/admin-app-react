/* 

Component : auth

*/
/** ****************************** Import Packages *************************** */
import { hostConfig } from "../config";
const KARMA_USER = hostConfig.USERNAME;
import CryptoJS from "crypto-js";

const saveLocalUser = data => {
  return localStorage.setItem(KARMA_USER, data);
  // return localStorage.setItem(KARMA_USER, data);
} 

const getLocalUser = () => {
  const data = localStorage.getItem(KARMA_USER);
  if (data){
    const decryptedData = CryptoJS.AES.decrypt(
      data,
      "trueKarmaApi"
    );
    const userDetails = decryptedData.toString(CryptoJS.enc.Utf8);
    return JSON.parse(userDetails);
  }
};

const deleteLocalUser = () => {
  localStorage.removeItem(KARMA_USER);
}

export { saveLocalUser, getLocalUser, deleteLocalUser };
