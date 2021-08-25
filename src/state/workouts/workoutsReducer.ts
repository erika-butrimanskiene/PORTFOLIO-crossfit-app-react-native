import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {constants} from '../constants';
import {workoutsActionsType} from './workoutsActions';
import {InewWorkout, IWorkoutsState, IWorkoutState} from './workoutsInterface';

const initialWorkoutsState: IWorkoutsState = {
  workouts: [],
  initSelection: false,
  newWorkout: {
    workoutName: '',
    workoutType: '',
    countResultOf: '',
    workoutWeights: '',
    exercises: [' '],
  },
};

const workoutsReducer = (
  state: IWorkoutsState = initialWorkoutsState,
  action: workoutsActionsType,
) => {
  switch (action.type) {
    case constants.workouts.SET_WORKOUTS_LIST:
      return {
        ...state,
        workouts: [...(action.payload as IWorkoutState[])],
      };

    case constants.workouts.INIT_WORKOUT_SELECTION:
      return {
        ...state,
        initSelection: action.payload as boolean,
      };

    case constants.workouts.SET_NEW_WORKOUT:
      return {
        ...state,
        newWorkout: {...(action.payload as InewWorkout)},
      };
    case constants.workouts.CLEAR_NEW_WORKOUT:
      return {
        ...state,
        newWorkout: {
          workoutName: '',
          workoutType: '',
          countResultOf: '',
          workoutWeights: '',
          exercises: [''],
        },
      };

    default:
      return state;
  }
};

const workoutsPersistConfig = {
  key: 'workouts',
  storage: AsyncStorage,
  blacklist: ['workouts', 'initSelection'],
};

export default persistReducer(workoutsPersistConfig, workoutsReducer);
