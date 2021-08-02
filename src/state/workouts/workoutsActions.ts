import {constants} from '../constants';
import {
  IWorkoutState,
  IgetWorkoutsList,
  IsetWorkoutsList,
  IselectWorkout,
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

const initWorkoutSelection = (boolean: boolean) => {
  return {
    type: constants.workouts.INIT_WORKOUT_SELECTION,
    payload: boolean,
  };
};

const selectWorkout = (selectedWorkout: IWorkoutState): IselectWorkout => {
  return {
    type: constants.workouts.SELECT_WORKOUT,
    payload: selectedWorkout,
  };
};

const clearSelectedWorkout = () => {
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

export type workoutsActionsType = IgetWorkoutsList | IsetWorkoutsList;
