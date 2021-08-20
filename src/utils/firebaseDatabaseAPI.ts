import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
import {IWodState, IAttendee, IWodTime} from '../state/wods/wodsInterface';
import {database} from './database';

export const editUserProfilePhoto = (userUid: string, photoUrl: string) => {
  database
    .ref(`/users/${userUid}/imageUrl`)
    .set(photoUrl)
    .then(() => console.log('Data set.'));
};

export const editUserInfo = (
  userUid: string,
  userName: string,
  userSurname: string,
) => {
  database
    .ref(`/users/${userUid}`)
    .once('value')
    .then(async snapshot => {
      let dataFromDatabase = snapshot.val();

      database
        .ref(`/users/${userUid}`)
        .set({
          admin: dataFromDatabase.admin,
          email: dataFromDatabase.email,
          imageUrl: dataFromDatabase.imageUrl,
          name: userName,
          surname: userSurname,
        })
        .then(() => console.log('Data set.'));
    });
};

export const convertWorkoutsObjectToArray = (
  dataFromDatabase: any,
): IWorkoutState[] => {
  return Object.keys(dataFromDatabase).map(key => {
    return {
      id: key,
      data: dataFromDatabase[key],
    };
  });
};

// export const getWorkouts = async (): Promise<any> => {
//   let dataArray: IWorkoutState[] = [];
//   await database
//     .ref('/workouts')
//     .once('value')
//     .then(snapshot => {
//       let dataFromDatabase = snapshot.val();
//       dataArray = convertWorkoutsObjectToArray(dataFromDatabase);
//       console.log(dataArray);
//     });

//   return dataArray;
// };

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
  workout: {id: string},
): Promise<any> => {
  await database
    .ref(`/WODs/${date}/crossfit`)
    .set({
      workout,
      times,
    })
    .then(() => console.log('Data set.'));
};

export const convertWodsObjectToArray = async (
  dataFromDatabase: any,
): Promise<IWodState[]> => {
  return await Promise.all(
    Object.keys(dataFromDatabase).map(async date => {
      let wodType: string = Object.keys(dataFromDatabase[date])[0];
      return {
        date: date,
        data: {
          type: wodType,
          times: dataFromDatabase[date][wodType].times,
          workout: await getWorkoutById(
            dataFromDatabase[date][wodType].workout.id,
          ),
        },
      };
    }),
  );
};

export const getWods = async (): Promise<any> => {
  let dataArray: IWodState[] = [];
  await database
    .ref('/WODs')
    .once('value')
    .then(async snapshot => {
      let dataFromDatabase = snapshot.val();
      console.log(dataFromDatabase);
      dataArray = await convertWodsObjectToArray(dataFromDatabase);
      console.log(dataArray);
    });

  return dataArray;
};

export const getWorkoutById = async (id: string): Promise<IWorkoutState> => {
  let wodById;
  await database
    .ref(`/workouts/${id}`)
    .once('value')
    .then(snapshot => {
      wodById = snapshot.val();
    });
  return {id: id, data: wodById};
};

export const addAttendee = async (
  url: string,
  attendee: IAttendee,
): Promise<any> => {
  const newReference = database.ref(`${url}`);
  await newReference.transaction((currentAttendeesArr: IAttendee[]) => {
    if (currentAttendeesArr === null) {
      return {0: attendee};
    } else {
      currentAttendeesArr.push(attendee);
      return currentAttendeesArr;
    }
  });
};

export const removeAattendee = async (
  url: string,
  userUid: string,
): Promise<any> => {
  const newReference = database.ref(`${url}`);
  await newReference.transaction((currentAttendeesArr: IAttendee[]) => {
    const newAttendeesArr = currentAttendeesArr.filter(
      item => item.uid !== userUid,
    );
    return newAttendeesArr;
  });
};

export const addResult = async (
  url: string,
  result: {attendeeId: string; result: string},
): Promise<any> => {
  const newReference = database.ref(`${url}`);
  await newReference.transaction(
    (currentResultsArr: {attendeeId: string; result: string}[]) => {
      if (currentResultsArr === null) {
        return {0: result};
      } else {
        currentResultsArr.push(result);
        return currentResultsArr;
      }
    },
  );
};
