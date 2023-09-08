exports.ConvertToDate = (datetime) => {
  let date = new Date(datetime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  let prefixDay = "";
  if (dt < 10) {
    prefixDay = "0";
    // dt = "0" + dt;
  }
  let prefixMonth = "";
  if (month < 10) {
    prefixMonth = "0";
    // month = "0" + month;
  }

  return prefixDay + dt + "/" + prefixMonth + month + "/" + year;
};
