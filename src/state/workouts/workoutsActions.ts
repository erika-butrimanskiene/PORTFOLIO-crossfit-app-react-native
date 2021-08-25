import {constants} from '../constants';
import {
  IWorkoutState,
  IgetWorkoutsList,
  IsetWorkoutsList,
  IinitWorkoutSelection,
  InewWorkout,
  IsetNewWorkout,
  IclearNewWorkout,
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

const initWorkoutSelection = (
  workoutSelection: boolean,
): IinitWorkoutSelection => {
  return {
    type: constants.workouts.INIT_WORKOUT_SELECTION,
    payload: workoutSelection,
  };
};

const setNewWorkout = (newWorkout: InewWorkout): IsetNewWorkout => {
  return {
    type: constants.workouts.SET_NEW_WORKOUT,
    payload: newWorkout,
  };
};

const clearNewWorkout = (): IclearNewWorkout => {
  return {
    type: constants.workouts.CLEAR_NEW_WORKOUT,
  };
};

export const workoutsActions = {
  getWorkoutsList,
  setWorkoutsList,
  initWorkoutSelection,
  setNewWorkout,
  clearNewWorkout,
};

export type workoutsActionsType =
  | IgetWorkoutsList
  | IsetWorkoutsList
  | IinitWorkoutSelection
  | IsetNewWorkout
  | IclearNewWorkout;
