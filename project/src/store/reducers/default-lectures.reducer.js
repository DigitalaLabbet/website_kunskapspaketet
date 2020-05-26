import { GET_DEFAULT_LECTURES } from '../types/action.types';

const defaultLectures = (state = [], action) => {
  switch (action.type) {
    case GET_DEFAULT_LECTURES:
      return {
        ...state,
        ...[action],
      };
    default:
      return state;
  }
};
export default defaultLectures;
