import {constants} from '../constants';
import {
  IWorkoutState,
  IgetWorkoutsList,
  IsetWorkoutsList,
} from './workoutsInterface';

const getWorkoutsList = (): IgetWorkoutsList => {
  return {
    type: constants.workouts.GET_WORKOUTS_LIST,
  };
};

const setWorkoutsList = (workoutsList: IWorkoutState[]): IsetWorkoutsList => {
  return {
    type: constants.workouts.SET_WORKOUTS_LIST,
    payload: workoutsList,
  };
};

export const workoutsActions = {
  getWorkoutsList,
  setWorkoutsList,
};

export type workoutsActionsType = IgetWorkoutsList | IsetWorkoutsList;
