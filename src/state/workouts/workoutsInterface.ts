import {StringLocale} from 'yup/lib/locale';

export interface IWorkoutState {
  id: string;
  data: {
    name: string;
    countOfResult: string;
    workoutType: string;
    workoutWeights: string;
    exercises: string[];
  };
}
export interface IWorkoutsState {
  workouts: IWorkoutState[];
  initSelection: boolean;
  selectedWorkout: IWorkoutState;
}

export interface IgetWorkoutsList {
  type: string;
  payload?: null;
}

export interface IsetWorkoutsList {
  type: string;
  payload: IWorkoutState[];
}

export interface IselectWorkout {
  type: string;
  payload: IWorkoutState;
}