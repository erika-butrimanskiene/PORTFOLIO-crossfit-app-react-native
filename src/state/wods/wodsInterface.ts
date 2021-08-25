import {IWorkoutState} from '../workouts/workoutsInterface';

export interface IAttendee {
  uid: string;
  attendeeId?: string;
}

export interface IWodTime {
  attendees?: IAttendee[];
  attendeesNumber: string;
  coachName: string;
  wodRoom: string;
  wodTime: string;
}

export interface IWodState {
  date: string;
  data: {
    type: string;
    times: IWodTime[];
    workout: IWorkoutState;
  };
}
export interface IWodsState {
  wods: IWodState[];
  newWod: InewWod;
}

export interface IsetWodsList {
  type: string;
  payload: IWodState[];
}

export interface InewWod {
  workoutId: string;
  wod: string;
  wodDate: string;
  wodTimes: IWodTime[];
  wodTime: string;
  wodRoom: string;
  coachName: string;
  attendeesNumber: string;
}
export interface IsetNewWod {
  type: string;
  payload: InewWod;
}

export interface IclearNewWod {
  type: string;
  payload?: null;
}
