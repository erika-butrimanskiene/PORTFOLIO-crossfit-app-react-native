export const formatDateToDate = (date: Date) => {
  let d = new Date(date),
    month = makeDoubleDigit('' + (d.getMonth() + 1)),
    day = makeDoubleDigit('' + d.getDate()),
    year = d.getFullYear();
  return [year, month, day].join('-');
};

export const formatDateToTime = (date: Date) => {
  let d = new Date(date),
    hours = makeDoubleDigit('' + d.getHours()),
    minutes = makeDoubleDigit('' + d.getMinutes());

  return [hours, minutes].join(':');
};

export const formatDate = (date: Date) => {
  return formatDateToDate(date) + ' ' + formatDateToTime(date);
};

const makeDoubleDigit = (num: string) => {
  if (num.length < 2) return '0' + num;
  return num;
};
