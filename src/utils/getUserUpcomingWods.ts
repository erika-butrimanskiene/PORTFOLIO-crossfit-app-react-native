import {IuserWod} from 'src/state/user/userInterface';
import {formatDateToDate, formatDateToTime} from './dateFormating';

export const getUserUpcomingWods = (userWods: IuserWod[]) => {
  const today = new Date();
  const todayDate = formatDateToDate(today);
  const todayTime = formatDateToTime(today);

  const sortedWodsByDate = userWods.sort((a, b) => {
    return a.wodDate < b.wodDate ? -1 : 1;
  });

  const sortedWodsByDateCopy = [...sortedWodsByDate];

  const filteredWodsList = sortedWodsByDateCopy.filter(
    item => item.wodDate >= todayDate,
  );

  //if the workout has passed not to show its time
  if (filteredWodsList.length > 0) {
    if (filteredWodsList[0].wodDate === todayDate) {
      filteredWodsList[0].wodTimes = filteredWodsList[0].wodTimes.filter(
        time => {
          return time.wodTime + 1 > todayTime;
        },
      );
    }
  }

  return filteredWodsList;
};
