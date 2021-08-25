import {IuserWod} from 'src/state/user/userInterface';
import {formatDateToDate, formatDateToTime} from './dateFormating';

//GLOBAL VARIABLES
const today = new Date();
const todayDate = formatDateToDate(today);
const todayTime = formatDateToTime(today);

export const getUserUpcomingWods = (userWods: IuserWod[]): IuserWod[] => {
  const userWodsCopyToUpcomingWods: IuserWod[] = JSON.parse(
    JSON.stringify(userWods),
  );

  const sortedserWodsCopyToUpcomingWods = userWodsCopyToUpcomingWods.sort(
    (a, b) => {
      return a.wodDate < b.wodDate ? -1 : 1;
    },
  );

  const filteredUpcomingWodsList = sortedserWodsCopyToUpcomingWods.filter(
    item => item.wodDate >= todayDate,
  );

  //if today workout has passed not to show its time for upcomingWods list
  if (filteredUpcomingWodsList.length > 0) {
    if (filteredUpcomingWodsList[0].wodDate === todayDate) {
      filteredUpcomingWodsList[0].wodTimes =
        filteredUpcomingWodsList[0].wodTimes.filter(time => {
          return time.wodTime + 1 > todayTime;
        });
    }
  }
  return filteredUpcomingWodsList;
};

export const getUserPreviousWods = (userWods: IuserWod[]): IuserWod[] => {
  const userWodsCopyToPreviousWods: IuserWod[] = JSON.parse(
    JSON.stringify(userWods),
  );

  const sortedserWodsCopyToPreviousWods = userWodsCopyToPreviousWods.sort(
    (a, b) => {
      return a.wodDate > b.wodDate ? -1 : 1;
    },
  );

  let filteredPreviousWodsList = sortedserWodsCopyToPreviousWods.filter(
    item => item.wodDate <= todayDate,
  );

  //if today workout has passed show its time for previousWods list
  if (filteredPreviousWodsList.length > 0) {
    if (filteredPreviousWodsList[0].wodDate === todayDate) {
      filteredPreviousWodsList[0].wodTimes =
        filteredPreviousWodsList[0].wodTimes.filter(time => {
          return time.wodTime + 1 < todayTime;
        });
    }
  }
  filteredPreviousWodsList = filteredPreviousWodsList.filter(
    item => item.wodTimes.length > 0,
  );
  return filteredPreviousWodsList;
};

export const getThisYearFromAnyMonthWodsLenght = (
  userWods: IuserWod[],
  month: string,
) => {
  const previousWods = getUserPreviousWods(userWods);
  const thisYear = today.getFullYear();

  if (month.length === 1) {
    month = `0${month}`;
  }
  let thisYearOrMonthWods = previousWods.filter(wod => {
    return wod.wodDate >= `${thisYear}-${month}-01`;
  });
  return thisYearOrMonthWods.length;
};

export const getAnyMonthStartDate = (monthsBefore: number) => {
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;
  let month;
  let year;

  if (thisMonth + monthsBefore > 0) {
    year = thisYear;
    month = `${thisMonth + monthsBefore}`;
  } else {
    year = thisYear - 1;
    month = `${thisMonth + monthsBefore + 12}`;
  }

  if (month.length === 1) {
    month = `0${month}`;
  }
  return `${year}-${month}-01`;
};

export const getLastTwelveEveryMonthDateRange = () => {
  let lastTwelveEveryMonthDateRange = [
    {start: getAnyMonthStartDate(-11), end: getAnyMonthStartDate(-10)},
    {start: getAnyMonthStartDate(-10), end: getAnyMonthStartDate(-9)},
    {start: getAnyMonthStartDate(-9), end: getAnyMonthStartDate(-8)},
    {start: getAnyMonthStartDate(-8), end: getAnyMonthStartDate(-7)},
    {start: getAnyMonthStartDate(-7), end: getAnyMonthStartDate(-6)},
    {start: getAnyMonthStartDate(-6), end: getAnyMonthStartDate(-5)},
    {start: getAnyMonthStartDate(-5), end: getAnyMonthStartDate(-4)},
    {start: getAnyMonthStartDate(-4), end: getAnyMonthStartDate(-3)},
    {start: getAnyMonthStartDate(-3), end: getAnyMonthStartDate(-2)},
    {start: getAnyMonthStartDate(-2), end: getAnyMonthStartDate(-1)},
    {start: getAnyMonthStartDate(-1), end: getAnyMonthStartDate(0)},
    {start: getAnyMonthStartDate(0), end: getAnyMonthStartDate(1)},
  ];
  return lastTwelveEveryMonthDateRange;
};

export const getLastTwelveEveryMonthWodsLenght = (userWods: IuserWod[]) => {
  let lastTwelveEveryMonthDateRange = getLastTwelveEveryMonthDateRange();
  let wodsLenghtMonthly: number[] = [];
  lastTwelveEveryMonthDateRange.forEach(item => {
    let length = getLengthOfOneAnyMonthWods(userWods, item.start, item.end);
    wodsLenghtMonthly.push(length);
  });

  return wodsLenghtMonthly;
};

export const getLengthOfOneAnyMonthWods = (
  userWods: IuserWod[],
  startDate: string,
  endDate: string,
) => {
  const previousWods = getUserPreviousWods(userWods);
  let monthWods = previousWods.filter(wod => {
    return wod.wodDate >= startDate && wod.wodDate < endDate;
  });

  return monthWods.length;
};
