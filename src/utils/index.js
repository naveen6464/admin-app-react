// What Code for ? Camelize String
const camelize = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");

const letterFirstUpperCase = (str3) => {
  if (str3 !== "") {
    const str = str3;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
  }
  return "-/--/---";
};

const leadingZeros = (num, digits) => {
  const str = num.toString();
  const newNum = str.padStart(digits, "0");
  return newNum;
};

const formatedDate = (dateInput) => {
  // DD-MM-YYYY
  const date = new Date(dateInput);
  const day = leadingZeros(date.getDate(), 2);
  const month = leadingZeros(date.getMonth() + 1, 2);
  const year = leadingZeros(date.getFullYear(), 4);
  const foramtedDate = `${day}-${month}-${year}`;
  return foramtedDate;
};

const round = (num, digits = 2) => {
  if (!num || typeof num !== "number") {
    num = 0;
  }
  return Number(num).toFixed(digits);
};

const formatTime = (date, format) => {
  const data = new Date(date);
  let hours = data.getHours();
  let minutes = data.getMinutes();
  if (format === "24") {
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  }
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

const round1 = (num, format) => {
  if (format === "decimal") {
    if (num % 1 !== 0) {
      return Number(num).toFixed(2);
    }
    return num;
  }
  return Number(num).toFixed(2);
};

const ordinalSuffix_Of = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
};

// Time Format Program
const timeformat = (dateInput) => {
  if (dateInput) {
    const date = new Date(dateInput);
    const hour = leadingZeros(date.getHours(), 2);
    const minute = leadingZeros(date.getMinutes(), 2);
    const timeformated = `${hour}:${minute}`;
    return timeformated;
  } else {
    const timeformated = "00:00";
    return timeformated;
  }
};

// Checking median Value from
// Game Settings api
const median = (range) => {
  // TODO: Check median Value for 0,3 and 1,3
  if (range) {
    let medianValue;
    if (range.max % 2 === 0) {
      medianValue = Number(range.max) / 2;
      return medianValue;
    } else {
      medianValue = (Number(range.max) + 1) / 2;
      return medianValue;
    }
  } else {
    return 18;
  }
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
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
};

const toSnakeCase = (str) => {
  if (str !== undefined || str !== null) {
    return str
      .replace(/[\w]([A-Z])/g, function (match) {
        return match[0] + "_" + match[1].toLowerCase();
      })
      .replace(/\s+/g, "_")
      .toLowerCase();
  } else {
    return str;
  }
  // if (str !== undefined || str !== null) {
  //   return str.toLowerCase().replace(/\s+/g, "_");
  // } else {
  //   return str;
  // }
};

function convertToNameSpaces(str) {
  if (str !== undefined || str !== null) {
    const words = str.split(/[\s_]+/); // Split string into words
    const snakeCaseWords = words.map((word) => {
      const pattern = /(?=[A-Z])/;
      const subWords = word.split(pattern);
      return subWords
        .map((subWord) => {
          const firstLetter = subWord.charAt(0).toUpperCase();
          const restOfWord = subWord.slice(1).toLowerCase();
          return firstLetter + restOfWord;
        })
        .join(" ");
    }); // Capitalize first letter of each word and convert to snake case
    return snakeCaseWords.join(" ");
  } else {
    return str;
  }
}

const sub = (a, b) => {
  if (a && b) {
    const c = parseFloat(a) - parseFloat(b);
    return c;
  }
};

// Debouncing in Javascript
export const debounce = (func, expTime) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, expTime);
  };
};

function capitalize(str) {
  if (str) {
    const words = str.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
  } else {
    return str;
  }
}

function isNegative(number) {
  if (number) {
    return number < 0;
  } else {
    return number;
  }
}
function removeEFromNumber(input) {
  if (input !== "") {
    let originalString = input.toString();
    let newString = originalString.replace(/e(\d+)/gi, "$1").replace(/e$/i, "");
    let newNumber = parseFloat(newString);
    return newNumber;
  }
  return input;
}

function convertToTitleCase(str) {
  if (str) {
    // Split the input string into an array of words.
    var words = str.split("-");

    // Loop through each word in the array and capitalize the first letter.
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back together with a space between them.
    var result = words.join(" ");

    // Return the result string.
    return result;
  } else {
    return str;
  }
}
function cleanPhoneNumber(phoneNumber) {
  if (phoneNumber) {
    // Remove all non-digit characters from the input string
    const cleaned = phoneNumber.replace(/\D/g, "");
    // Prepend the plus sign and country code to the cleaned string
    return `+${cleaned}`;
  } else {
    return phoneNumber;
  }
}
const floorFunction = (item) => {
  if (item !== undefined && item !== null) {
    const truncatedNumber = Math.floor(parseFloat(item) * 100) / 100;
    return truncatedNumber;
  } else {
    return 0;
  }
};
export {
  camelize,
  formatedDate,
  leadingZeros,
  round,
  letterFirstUpperCase,
  formatTime,
  round1,
  ordinalSuffix_Of,
  median,
  timeformat,
  sub,
  toSnakeCase,
  convertToNameSpaces,
  capitalize,
  isNegative,
  floorFunction,
  removeEFromNumber,
  convertToTitleCase,
  cleanPhoneNumber,
};
