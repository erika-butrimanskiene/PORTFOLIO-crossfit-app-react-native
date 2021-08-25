import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {constants} from '../constants';
import {wodsActionsType} from './wodsActions';
import {InewWod, IWodsState, IWodState} from './wodsInterface';

const initialWodsState: IWodsState = {
  wods: [],
  newWod: {
    workoutId: '',
    wod: '',
    wodDate: '',
    wodTimes: [],
    wodTime: '',
    wodRoom: '',
    coachName: '',
    attendeesNumber: '',
  },
};

const wodsReducer = (
  state: IWodsState = initialWodsState,
  action: wodsActionsType,
) => {
  switch (action.type) {
    case constants.wods.SET_WODS_LIST:
      return {
        ...state,
        wods: [...(action.payload as IWodState[])],
      };

    case constants.wods.SET_NEW_WOD:
      return {
        ...state,
        newWod: {...(action.payload as InewWod)},
      };

    case constants.wods.CLEAR_NEW_WOD:
      return {
        ...state,
        newWod: {
          workoutId: '',
          wod: '',
          wodDate: '',
          wodTimes: [],
          wodTime: '',
          wodRoom: '',
          coachName: '',
          attendeesNumber: '',
        },
      };

    default:
      return state;
  }
};

const wodsPersistConfig = {
  key: 'wods',
  storage: AsyncStorage,
  blacklist: ['wods'],
};

export default persistReducer(wodsPersistConfig, wodsReducer);
