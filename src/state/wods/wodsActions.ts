import {constants} from '../constants';
import {IWodState, IsetWodsList} from './wodsInterface';

const setWodsList = (wodsList: IWodState[]): IsetWodsList => {
  return {
    type: constants.wods.SET_WODS_LIST,
    payload: wodsList,
  };
};

export const wodsActions = {
  setWodsList,
};

export type wodsActionsType = IsetWodsList;
