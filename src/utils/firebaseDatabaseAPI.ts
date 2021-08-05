import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
import {IWodState, IAttendee, IWodTime} from '../state/wods/wodsInterface';
import {database} from './database';

export const convertWorkoutsObjectToArray = (
  dataFromDatabase: any,
): IWorkoutState[] => {
  return Object.keys(dataFromDatabase).map(key => ({
    id: key,
    data: dataFromDatabase[key],
  }));
};

export const getWorkouts = async (): Promise<any> => {
  let dataArray: IWorkoutState[] = [];
  await database
    .ref('/workouts')
    .once('value')
    .then(snapshot => {
      let dataFromDatabase = snapshot.val();
      dataArray = convertWorkoutsObjectToArray(dataFromDatabase);
      console.log(dataArray);
    });

  return dataArray;
};

export const deleteWorkout = async (id: string): Promise<any> => {
  database.ref(`/workouts/${id}`).remove();
};

export const createWorkout = async (
  workoutName: string,
  workoutType: string,
  countResultOf: string,
  workoutWeights: string,
  exercises: string[],
): Promise<any> => {
  const newReference = database.ref('/workouts').push();
  newReference
    .set({
      name: workoutName,
      workoutType: workoutType,
      countResultOf: countResultOf,
      workoutWeights: workoutWeights,
      exercises: exercises,
    })
    .then(() => console.log('Data updated.'));
};

export const createWod = async (
  date: string,
  times: object[],
  workout: IWorkoutState,
): Promise<any> => {
  database
    .ref(`/WODs/${date}/crossfit`)
    .set({
      workout,
      times,
    })
    .then(() => console.log('Data set.'));
};

export const convertWodsObjectToArray = (
  dataFromDatabase: any,
): IWodState[] => {
  return Object.keys(dataFromDatabase).map(date => {
    let wodType: string = Object.keys(dataFromDatabase[date])[0];
    return {
      date: date,
      data: {
        type: wodType,
        times: convertWodsTimesAttendeesObjectToArray(
          dataFromDatabase[date][wodType].times,
        ), //add
        workout: dataFromDatabase[date][wodType].workout, //change
      },
    };
  });
};

const convertWodsTimesAttendeesObjectToArray = (times: any[]): IWodTime[] => {
  return times.map(time => {
    if (time.attendees) {
      return {
        ...time,
        attendees: Object.keys(time.attendees).map(attendee => {
          return {
            ...time.attendees[attendee],
            attendeeId: attendee,
          };
        }),
      };
    } else {
      return {
        ...time,
        attendees: [],
      };
    }
  });
};

export const getWods = async (): Promise<any> => {
  let dataArray: IWodState[] = [];
  await database
    .ref('/WODs')
    .once('value')
    .then(snapshot => {
      let dataFromDatabase = snapshot.val();
      console.log(dataFromDatabase);
      dataArray = convertWodsObjectToArray(dataFromDatabase);
      console.log(dataArray);
    });

  return dataArray;
};

export const addAttendee = async (
  url: string,
  attendee: IAttendee,
): Promise<any> => {
  const newReference = database.ref(`${url}`).push();

  newReference.set(attendee).then(() => console.log('Data updated.'));
};
