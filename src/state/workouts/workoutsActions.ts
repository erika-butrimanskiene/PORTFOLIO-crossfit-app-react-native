import {constants} from '../constants';
import {
  IWorkoutState,
  IgetWorkoutsList,
  IsetWorkoutsList,
  IselectWorkout,
  IinitWorkoutSelection,
  IclearSelectedWorkout,
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

const selectWorkout = (selectedWorkout: IWorkoutState): IselectWorkout => {
  return {
    type: constants.workouts.SELECT_WORKOUT,
    payload: selectedWorkout,
  };
};

const clearSelectedWorkout = (): IclearSelectedWorkout => {
  return {
    type: constants.workouts.CLEAR_SELECTED_WORKOUT,
  };
};

export const workoutsActions = {
  getWorkoutsList,
  setWorkoutsList,
  initWorkoutSelection,
  selectWorkout,
  clearSelectedWorkout,
};

export type workoutsActionsType =
  | IgetWorkoutsList
  | IsetWorkoutsList
  | IinitWorkoutSelection
  | IselectWorkout
  | IclearSelectedWorkout;
