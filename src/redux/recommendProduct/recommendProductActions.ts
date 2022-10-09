import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCT_START = "FETCH_RECOMMEND_PRODUCT_START";
export const FETCH_RECOMMEND_PRODUCT_SUCCESS =
  "FETCH_RECOMMEND_PRODUCT_SUCCESS";
export const FETCH_RECOMMEND_PRODUCT_FAIL = "FETCH_RECOMMEND_PRODUCT_FAIL";

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCT_START;
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCT_SUCCESS;
  payload: any;
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCT_FAIL;
  payload: any;
}

export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction;

export const fetchRecommendProductStartActionCreator =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCT_START,
    };
  };

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductFailActionCreator = (
  error
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCT_FAIL,
    payload: error,
  };
};

export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
    async (dispatch, getState) => {
      dispatch(fetchRecommendProductStartActionCreator());
      try {
        const { data } = await axios.get(
          // "http://123.56.149.216:8089/api/productCollections"
          "https://vue3-course-api.hexschool.io/api/matchakuma/products/all"
        );
        console.log('/products/all data:', data);
        dispatch(fetchRecommendProductSuccessActionCreator(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchRecommendProductFailActionCreator(err.message));
        }
      }
    };
