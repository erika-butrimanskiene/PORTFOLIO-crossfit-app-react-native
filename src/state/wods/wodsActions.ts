import {constants} from '../constants';
import {
  IWodState,
  IsetWodsList,
  InewWod,
  IsetNewWod,
  IclearNewWod,
} from './wodsInterface';

const setWodsList = (wodsList: IWodState[]): IsetWodsList => {
  return {
    type: constants.wods.SET_WODS_LIST,
    payload: wodsList,
  };
};
const setNewWod = (newWod: InewWod): IsetNewWod => {
  return {
    type: constants.wods.SET_NEW_WOD,
    payload: newWod,
  };
};

const clearNewWod = (): IclearNewWod => {
  return {
    type: constants.wods.CLEAR_NEW_WOD,
  };
};

export const wodsActions = {
  setWodsList,
  setNewWod,
  clearNewWod,
};

export type wodsActionsType = IsetWodsList | IsetNewWod | IclearNewWod;
