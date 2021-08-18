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
