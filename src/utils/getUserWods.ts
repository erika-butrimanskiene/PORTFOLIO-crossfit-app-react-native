import {IuserWod, IWodState, IWodTime} from 'src/state/wods/wodsInterface';

export const getUserWods = (wods: IWodState[], userUid: string) => {
  let userWods: IuserWod[] = [];

  wods.map((wod: IWodState) => {
    userWods = findUserBetweenAttendeesAndUpdateArray(wod, userUid, userWods);
  });

  return userWods;
};

const findUserBetweenAttendeesAndUpdateArray = (
  wod: IWodState,
  userUid: string,
  userWods: IuserWod[],
) => {
  wod.data.times.map(time => {
    const filtered = time.attendees.filter(attendee => {
      return attendee.uid === userUid;
    });

    if (filtered.length > 0) {
      userWods = updateUserWodsListArray(wod, time, userWods);
    }
  });

  return userWods;
};

const updateUserWodsListArray = (
  wod: IWodState,
  time: IWodTime,
  userWods: IuserWod[],
) => {
  //check if date of wod exist at userwods list
  let indexOfExistingDate = userWods.findIndex(
    userWod => userWod.wodDate === wod.date,
  );

  if (indexOfExistingDate >= 0) {
    userWods[indexOfExistingDate].wodTimes = [
      ...userWods[indexOfExistingDate].wodTimes,
      time,
    ];
  } else {
    const object = {
      wodDate: wod.date,
      wodTimes: [time],
      workoutId: wod.data.workout.id,
      workoutName: wod.data.workout.data.name,
      workoutType: wod.data.workout.data.workoutType,
    };
    userWods.push(object);
  }
  return userWods;
};
