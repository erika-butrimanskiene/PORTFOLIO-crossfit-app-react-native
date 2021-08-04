import {constants} from '../constants';
import {IWodState, IgetWodsList, IsetWodsList} from './wodsInterface';

const getWodsList = (): IgetWodsList => {
  return {
    type: constants.wods.GET_WODS_LIST,
  };
};

const setWodsList = (wodsList: IWodState[]): IsetWodsList => {
  return {
    type: constants.wods.SET_WODS_LIST,
    payload: wodsList,
  };
};

export const wodsActions = {
  getWodsList,
  setWodsList,
};

export type wodsActionsType = IgetWodsList | IsetWodsList;
