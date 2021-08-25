export interface IWorkoutState {
  id: string;
  data: {
    name: string;
    countResultOf: string;
    workoutType: string;
    workoutWeights: string;
    exercises: string[];
    results: IWorkoutDateResults;
  };
}

export interface IWorkoutFromDatabase {}
export interface IWorkoutDateResults {
  [key: string]: {
    attendeeId: string;
    attendeeName: string;
    attendeeSurname: string;
    result: string;
  }[];
}

export interface IWorkoutsState {
  workouts: IWorkoutState[];
  initSelection: boolean;
  newWorkout: InewWorkout;
}

export interface IgetWorkoutsList {
  type: string;
  payload?: null;
}

export interface IinitWorkoutSelection {
  type: string;
  payload: boolean;
}

export interface IsetWorkoutsList {
  type: string;
  payload: IWorkoutState[];
}

export interface InewWorkout {
  workoutName: string;
  workoutType: string;
  countResultOf: string;
  workoutWeights: string;
  exercises: string[];
}
export interface IsetNewWorkout {
  type: string;
  payload: InewWorkout;
}

export interface IclearNewWorkout {
  type: string;
  payload?: null;
}
