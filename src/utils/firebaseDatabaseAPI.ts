import {database} from './database';

export const getWorkouts = async (): Promise<any> => {
  let dataArray: object[] = [];
  await database
    .ref('/workouts')
    .once('value')
    .then(snapshot => {
      let dataFromDatabase = snapshot.val();
      dataArray = Object.keys(dataFromDatabase).map(key => ({
        id: key,
        data: dataFromDatabase[key],
      }));
      console.log(dataArray);
    });

  return dataArray;
};
