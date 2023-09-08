exports.ConvertToTime = (datetime) => {
  const plus = datetime.indexOf("+");
  let newDateTime = datetime;
  if (plus !== -1) newDateTime = datetime.substring(0, plus);
  let date = new Date(newDateTime);
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  let prefixHour = "";
  if (hour < 10) {
    prefixHour = "0";
    // dt = "0" + dt;
  }
  let prefixMinute = "";
  if (minute < 10) {
    prefixMinute = "0";
    // month = "0" + month;
  }

  let prefixSecond = "";
  if (second < 10) {
    prefixSecond = "0";
    // month = "0" + month;
  }

  return prefixHour + hour + ":" + prefixMinute + minute;
};
