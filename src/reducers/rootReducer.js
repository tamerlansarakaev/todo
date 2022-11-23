import { DATA_LOADED } from './types';

const initialStore = {
  dataBase: {},
};

const rootReducer = (state = initialStore, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default rootReducer;
