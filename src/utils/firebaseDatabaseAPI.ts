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
