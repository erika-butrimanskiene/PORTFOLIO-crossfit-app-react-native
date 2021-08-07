import {IWorkoutState} from '../workouts/workoutsInterface';

export interface IAttendee {
  uid: string;
  name: string;
  surname: string;
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
}

export interface IsetWodsList {
  type: string;
  payload: IWodState[];
}

export interface IuserWod {
  wodDate: string;
  wodTimes: IWodTime[];
  workoutId: string;
  workoutName: string;
  workoutType: string;
}
