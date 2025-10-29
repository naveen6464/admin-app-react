/* 

Component : common

*/
/** *********************** Import Packages ****************** */
import "moment-timezone";
import moment from "moment";

const DEFAULT_TIMEZONE = "America/Los_Angeles";

const displayDate = (date, format = "MM/DD/YYYY") => {
  const timezone = DEFAULT_TIMEZONE;
  const formatted = moment.utc(date).tz(timezone);
  if (formatted.isValid()) {
    const tzFormat = format.replace(" z", "").replace("z", " ");
    return formatted.format(`${tzFormat}`);
  }
  return formatted;
};

const inputFormat = (date, format = "YYYY-MM-DD") => {
  const timezone = DEFAULT_TIMEZONE;
  const formatted = moment.utc(date).tz(timezone);
  if (formatted.isValid()) {
    const tzFormat = format.replace(" z", "").replace("z", " ");
    return formatted.format(`${tzFormat}`);
  }
  return formatted;
};

const inputTime = (date, format = "YYYY-MM-DD") => {
  const formatted = moment(date).format(format);
  const timestamp = moment(formatted).format("X");
  return timestamp * 1000;
};

const displayDateTime = (date, format = "YYYY-MM-DD h:m:s") => {
  const timezone = DEFAULT_TIMEZONE;
  const formatted = moment.utc(date).tz(timezone);
  if (formatted.isValid()) {
    const tzFormat = format.replace(" z", "").replace("z", " ");
    return formatted.format(`${tzFormat}`);
  }
  return formatted;
};

const displayAmountWithComma = amount => {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const displayAmount = amount => {
  if (amount || amount === 0) {
    const result = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const _amount = parseFloat(result).toFixed(2);
    return `$${_amount}`;
  }
};

const displayTime = (time, format = "H:m") => {
  const timezone = DEFAULT_TIMEZONE;
  const formatted = moment.utc(time).tz(timezone);
  if (formatted.isValid()) {
    const tzFormat = format.replace(" z", "").replace("z", " ");
    return formatted.format(`${tzFormat}`);
  }
  return formatted;
};

const displayAmountK = currentAmount => {
  if (currentAmount || currentAmount === 0) {
    const amount = parseFloat(currentAmount).toFixed(2)
    var K = Math.floor(amount / 1000);
    var M = Math.floor(amount / 1000000);
    var unit = "";
    var value = amount;

    if (K !== 0) {
      if (M !== 0) {
        unit = "M";
        value = M;
      }
      else {
        unit = "K";
        value = K;
      }
    }
    else {
      unit = "";
      value = amount;
    }
    return `$${value}${unit}`;
  }
};

const displayEin = ein => {
  let result = null;
  if (ein && ein.length === 9) {
    result = `${ein[0] + ein[1]}-${ein[2]}${ein[3]}${ein[4]}`;
    result += `${ein[5]}${ein[6]}${ein[7]}${ein[8]}`;
  } else if (ein && ein.length === 8) {
    result = `0${ein[0]}-${ein[1]}${ein[2]}${ein[3]}`;
    result += `${ein[4]}${ein[5]}${ein[6]}${ein[7]}`;
  }
  return result;
};

const displayDescription = description => {
  if (description) {
    return description.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/gi, "");
  }
};

const generatePromoCode = () => {
  let coupon = "";
  const possible = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 8; i++) {
    coupon += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return coupon;
}

const decryptData = (item) => {
  if (typeof (item) === "string") {
    var CryptoJS = require("crypto-js");
    var bytes = CryptoJS.AES.decrypt(item, "secret key 123");
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8).replace(/"/g, "");
    return decryptedData;
  } else {
    return item
  }

}

const convertBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    }
  });

const alphabetValidate = (e) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  const isAlphabet = /^[A-Za-z.]$/.test(keyValue);

  if (
    e.target.value.length === 0 &&
    keyValue === " " &&
    e.target.value[0] !== " "
  ) {
    e.preventDefault();
  } else if (
    isAlphabet ||
    (keyValue === " " && !e.target.value.endsWith(" "))
  ) {
    return;
  } else {
    e.preventDefault();
  }
};
const spaceValidate = (e) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  const inputValue = e.target.value + keyValue;

  if (inputValue.startsWith(" ")) {
    e.preventDefault();
  }
};

const alphanumericValidate = (e, value) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  const isAlphanumeric = /^[A-Za-z0-9 ]$/.test(keyValue);

  if (
    e.target.value.length < value &&
    (e.target.value.length === 0 ||
      (keyValue === " " || isAlphanumeric) &&
      e.target.value[0] !== " ")
  ) {
    return;
  } else if (
    isAlphanumeric &&
    (keyValue === " " && !e.target.value.endsWith(" "))
  ) {
    return;
  } else {
    e.preventDefault();
  }
};

const TimeStampDate = (timeValue) => {
  const date = new Date(timeValue);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day}/${month}/${year}`
}

function removeHTMLTags(input) {
  var div = document?.createElement("div");
  div.innerHTML = input;
  return div.textContent || div.innerText || "";
}

const capitalizeFirstLetter = (str) => {
  if (!str) return ""; // Handle empty or undefined input
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const handleKeyPress = (e, maxLength) => {
  const keyCode = e.keyCode || e.which;
  const keyValue = String.fromCharCode(keyCode);
  const numericRegex = /^[0-9\b]+$/;

  if (
    keyValue === " " ||
    !numericRegex.test(keyValue) ||
    e.target.value.length >= maxLength
  ) {
    e.preventDefault();
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export {
  alphabetValidate,
  spaceValidate,
  alphanumericValidate,
  DEFAULT_TIMEZONE,
  TimeStampDate,
  displayDate,
  displayDateTime,
  displayAmountWithComma,
  displayAmount,
  inputFormat,
  inputTime,
  displayEin,
  displayDescription,
  generatePromoCode,
  displayAmountK,
  displayTime,
  decryptData,
  convertBase64,
  removeHTMLTags,
  capitalizeFirstLetter,
  formatDate
};

