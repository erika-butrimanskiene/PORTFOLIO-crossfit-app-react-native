import {constants} from '../constants';
import {wodsActionsType} from './wodsActions';
import {IWodsState} from './wodsInterface';

const initialWodsState: IWodsState = {
  wods: [],
};

const wodsReducer = (
  state: IWodsState = initialWodsState,
  action: wodsActionsType,
) => {
  switch (action.type) {
    case constants.wods.SET_WODS_LIST:
      return {
        ...state,
        wods: [...action.payload],
      };

    default:
      return state;
  }
};

export default wodsReducer;
