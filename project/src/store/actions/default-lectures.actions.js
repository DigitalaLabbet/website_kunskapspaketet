import { GET_DEFAULT_LECTURES } from '../types/action.types';

export const getDefaultLectures = (lectures) => ({
  type: GET_DEFAULT_LECTURES,
  lectures,
});
