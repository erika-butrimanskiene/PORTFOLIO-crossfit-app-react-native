import {IWodsState} from 'src/state/wods/wodsInterface';
import {
  IWorkoutsState,
  IWorkoutState,
} from 'src/state/workouts/workoutsInterface';
import ROUTES from './Routes';

export type RootStackParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Landing]: undefined;
  [ROUTES.Login]: undefined;
  [ROUTES.Password]: undefined;
  [ROUTES.Profile]: undefined;
  [ROUTES.Register]: undefined;
  [ROUTES.CreateWorkout]: undefined;
  [ROUTES.WorkoutsList]: undefined;
  [ROUTES.CreateWod]: undefined;
  [ROUTES.WodsList]: undefined;
  [ROUTES.WodDetail]: {workout: IWorkoutState; date: string; image: string};
  [ROUTES.ActivityBoard]: undefined;
};
