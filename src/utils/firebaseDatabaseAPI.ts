import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
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
  couch: string,
  numberOfAttendees: string,
  room: string,
  time: string,
  workout: IWorkoutState,
): Promise<any> => {
  const newReference = database.ref(`/WODs/${date}`).push();
  newReference
    .set({
      couch,
      numberOfAttendees,
      room,
      time,
      workout,
    })
    .then(() => console.log('Data updated.'));
};
