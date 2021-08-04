import {constants} from '../constants';
import {workoutsActionsType} from './workoutsActions';
import {IWorkoutsState, IWorkoutState} from './workoutsInterface';

const initialWorkoutsState: IWorkoutsState = {
  workouts: [],
  initSelection: false,
  selectedWorkout: {
    id: '',
    data: {
      name: '',
      countOfResult: '',
      workoutType: '',
      workoutWeights: '',
      exercises: [],
    },
  },
};

const workoutsReducer = (
  state: IWorkoutsState = initialWorkoutsState,
  action: workoutsActionsType,
) => {
  switch (action.type) {
    case constants.workouts.SET_WORKOUTS_LIST:
      return {
        ...state,
        workouts: [...(action.payload as IWorkoutState[])],
      };

    case constants.workouts.INIT_WORKOUT_SELECTION:
      return {
        ...state,
        initSelection: action.payload as boolean,
      };

    case constants.workouts.SELECT_WORKOUT:
      return {
        ...state,
        initSelection: false,
        selectedWorkout: action.payload as IWorkoutState,
      };

    case constants.workouts.CLEAR_SELECTED_WORKOUT:
      return {
        ...state,
        selectedWorkout: {...initialWorkoutsState.selectedWorkout},
      };

    default:
      return state;
  }
};

export default workoutsReducer;
