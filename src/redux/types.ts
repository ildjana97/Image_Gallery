// import { FetchImagesFailureAction, FetchImagesSuccessAction } from "./actions";
import { FetchImagesFailureAction, FetchImagesSuccessAction } from './actions';
import  ImageState  from './reducers';

export interface RootState {
  images: ImageState;
}
// src/redux/types.ts
export interface Image {
    id: string;
    link: string;
    title: string;
    description: string;
    ups: number;
    downs: number;
    score: number;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  export interface ImageState {
    images: Image[];
    loading: boolean;
    error: string | null;
  }
  
  export type ImageActionTypes = FetchImagesSuccessAction | FetchImagesFailureAction;
  