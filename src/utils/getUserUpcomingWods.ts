import {IuserWod} from 'src/state/wods/wodsInterface';
import {formatDateToDate, formatDateToTime} from './dateFormating';

export const getUserUpcomingWods = (userWods: IuserWod[]) => {
  const today = new Date();
  const todayDate = formatDateToDate(today);
  const todayTime = formatDateToTime(today);

  const sortedWodsByDate = userWods.sort((a, b) => {
    return a.wodDate < b.wodDate ? -1 : 1;
  });
  const todayWod = userWods.filter(wod => wod.wodDate.includes(todayDate));

  const todayWodIndex = sortedWodsByDate.indexOf(todayWod[0]);

  const wodsListCopy = [...sortedWodsByDate];
  //all wods from today
  const filteredWodsList = wodsListCopy.splice(todayWodIndex);

  //if the workout has passed not to show its time
  if (filteredWodsList[0].wodDate === todayDate) {
    filteredWodsList[0].wodTimes = filteredWodsList[0].wodTimes.filter(time => {
      return time.wodTime + 1 > todayTime;
    });
  }

  return filteredWodsList;
};
