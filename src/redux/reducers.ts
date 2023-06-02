// src/redux/reducers.ts
import { combineReducers } from 'redux';
import { ImageState, ImageActionTypes } from './types';

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
};

const imageReducer = (state = initialState, action: ImageActionTypes): ImageState => {
  switch (action.type) {
    case 'FETCH_IMAGES_SUCCESS':
      return {
        ...state,
        images: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_IMAGES_FAILURE':
      return {
        ...state,
        images: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  images: imageReducer,
});

export default rootReducer;
