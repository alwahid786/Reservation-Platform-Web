exports.CompareByDateWithToday = (date, current) => {
  const currentDate = new Date(current);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const compareDate = new Date(date);
  const day = compareDate.getDate();
  const month = compareDate.getMonth();
  const year = compareDate.getFullYear();

  if (year > currentYear) return true;
  else if (year < currentYear) return false;

  if (month > currentMonth) return true;
  else if (month < currentMonth) return false;

  if (day > currentDay) return true;
  else if (day < currentDay) return false;

  return true;
};
