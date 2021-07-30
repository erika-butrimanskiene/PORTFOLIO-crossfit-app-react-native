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
}

export interface IgetWorkoutsList {
  type: string;
  payload?: null;
}

export interface IsetWorkoutsList {
  type: string;
  payload: IWorkoutState[];
}
