
// src/redux/actions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types';
import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

export interface Image {
  id: string;
  link: string;
  title: string;
  description: string;
  ups: number;
  downs: number;
  score: number;
}

export interface FetchImagesSuccessAction {
  type: 'FETCH_IMAGES_SUCCESS';
  payload: Image[];
}

export interface FetchImagesFailureAction {
  type: 'FETCH_IMAGES_FAILURE';
  payload: string;
}

export type ImageActionTypes = FetchImagesSuccessAction | FetchImagesFailureAction;

// Configure Axios with exponential backoff retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: any) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) && error.response?.status === 429;
  },
});

export const fetchImages = (
  section: string,
  showViral: boolean,
  sort: string,
  window: string
): ThunkAction<void, RootState, null, ImageActionTypes> => {
  return async (dispatch: Dispatch<ImageActionTypes>, getState: () => RootState) => {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {

      try {
        // Fetch images from the API
        //client id 38cb1691b93d90b
        //client secret 063f1ae9dda18b466e005a24e6e17644498de15a
        //https://apidocs.imgur.com/#intro
        const response: AxiosResponse = await axios.get('https://api.imgur.com/3/gallery', {
          headers: {
            // eslint-disable-next-line no-template-curly-in-string
            Authorization: 'Client-ID ${b8ecb3442b5cb20}',
          },
          params: {
            section,
            showViral,
            sort,
            window,
          },
        });

        // Process the response data and extract image details
        const images: Image[] = response.data.data.map((item: any) => ({
          id: item.id,
          link: item.link,
          title: item.title,
          description: item.description,
          ups: item.ups,
          downs: item.downs,
          score: item.score,
        }));

        // Dispatch the success action with the fetched images
        dispatch({
          type: 'FETCH_IMAGES_SUCCESS',
          payload: images,
        });

        break; 
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
          // Rate limit exceeded, retry after a delay using exponential backoff

          const delay = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));

          retries++;
        } else {
          // Handle other errors...
          break; // Exit the retry loop for non-rate limit errors
        }
      }
    }
  };
};