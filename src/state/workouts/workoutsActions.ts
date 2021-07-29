import {constants} from '../constants';

export interface IgetWorkoutsList {
  type: string;
  payload?: null;
}

export interface IsetWorkoutsList {
  type: string;
  payload: Array<object>;
}

const getWorkoutsList = (): IgetWorkoutsList => {
  return {
    type: constants.workouts.GET_WORKOUTS_LIST,
  };
};

const setWorkoutsList = (workoutsList: Array<object>): IsetWorkoutsList => {
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
