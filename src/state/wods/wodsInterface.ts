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
}

export interface IsetWodsList {
  type: string;
  payload: IWodState[];
}
