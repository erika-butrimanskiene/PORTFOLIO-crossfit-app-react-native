import {constants} from '../constants';
import {workoutsActionsType} from './workoutsActions';

export interface IWorkoutsState {
  workouts: object[];
}

const initialWorkoutsState: IWorkoutsState = {
  workouts: [],
};

const workoutsReducer = (
  state: IWorkoutsState = initialWorkoutsState,
  action: workoutsActionsType,
) => {
  switch (action.type) {
    case constants.workouts.SET_WORKOUTS_LIST:
      return {
        ...state,
        workouts: [...action.payload],
      };
    default:
      return state;
  }
};

export default workoutsReducer;
