// Month Representation Array
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatTime(date, format, type) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (format === "24") {
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    if (type) {
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}`;
  }
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

// What Code for? Formatting Date in One Format
const formatDate = (value, props) => {
  let timeFormat = "";
  let dateFormat = "";
  if (props) {
    timeFormat = props.timeFormat;
    dateFormat = props.dateFormat;
  }
  const date = new Date(value);
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  // const currentTime = date.getHours();
  let time;
  if (timeFormat === "24") {
    time = formatTime(date, "24");
  } else {
    time = formatTime(date);
  }

  if (dateFormat === "MM DD YYY|| TIME") {
    const dateOrderArray = dateFormat.split(":");
    // let beggining;
    // let middle;
    let end;

    if (dateOrderArray[0] === "MM") {
      // beggining = monthString;
      if (dateOrderArray[1] === "DD") {
        // middle = dateString;
        end = date.getFullYear();
      }
    } else if (dateOrderArray[0] === "YYYY") {
      // beggining = date.getFullYear();
      if (dateOrderArray[1] === "MM") {
        // middle = monthString;
        end = dateString;
      }
    } else {
      // beggining = dateString;
      // middle = monthString;
      end = date.getFullYear();
    }
    return `${monthArray[currentMonth]} ${dateString}, ${end} | ${time}`;
  }

  if (dateFormat ==="DateANDTime")
  {
    time = formatTime(date, "24", true);
    let beggining = "";
    let middle = "";
    let end = "";
    beggining = date.getFullYear();
    middle = monthString;
    end = dateString;

    return `${beggining}-${middle}-${end} ${time}`;
  }


  if (
    dateFormat === "MM:DD:YYYY" ||
    dateFormat === "YYYY:MM:DD" ||
    dateFormat === "DD:MM:YYYY"
  ) {
    const dateOrderArray = dateFormat.split(":");
    let beggining = "";
    let middle = "";
    let end = "";

    if (dateOrderArray[0] === "MM") {
      beggining = monthString;
      if (dateOrderArray[1] === "DD") {
        middle = dateString;
        end = date.getFullYear();
      }
    } else if (dateOrderArray[0] === "YYYY") {
      beggining = date.getFullYear();
      if (dateOrderArray[1] === "MM") {
        middle = monthString;
        end = dateString;
      }
    } else {
      beggining = dateString;
      middle = monthString;
      end = date.getFullYear();
    }
    return `${beggining}/${middle}/${end}`;
  }
  if (
    dateFormat === "MM:DD:YYYY:HH:MM" ||
    dateFormat === "YYYY:MM:DD:HH:MM" ||
    dateFormat === "DD:MM:YYYY:HH:MM"
  ) {
    const dateOrderArray = dateFormat.split(":");
    let beggining = "";
    let middle = "";
    let end = "";

    if (dateOrderArray[0] === "MM") {
      beggining = monthString;
      if (dateOrderArray[1] === "DD") {
        middle = dateString;
        end = date.getFullYear();
      }
    } else if (dateOrderArray[0] === "YYYY") {
      beggining = date.getFullYear();
      if (dateOrderArray[1] === "MM") {
        middle = monthString;
        end = dateString;
      }
    } else {
      beggining = dateString;
      middle = monthString;
      end = date.getFullYear();
    }
    return `${beggining}/${middle}/${end} ${time}`;
    // return `${dateString}/${monthString}/${date.getFullYear()} ${time}`;
  }
  return `${dateString}/${monthString}/${date.getFullYear()} ${time}`;
};

export default formatDate;
