import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";
import { API_SOURCE, UDEMY } from "../../helpers/constants";
import { API_BASE } from "../helper/apiHelper";

export const FETCH_RECOMMEND_PRODUCT_START = "FETCH_RECOMMEND_PRODUCT_START";
export const FETCH_RECOMMEND_PRODUCT_SUCCESS =
  "FETCH_RECOMMEND_PRODUCT_SUCCESS";
export const FETCH_RECOMMEND_PRODUCT_FAIL = "FETCH_RECOMMEND_PRODUCT_FAIL";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";

const isUdemy = API_SOURCE === UDEMY;

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

interface ChangeCategoryAction {
  type: typeof CHANGE_CATEGORY;
  payload: any;
}

export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction
  | ChangeCategoryAction;

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
        const api = isUdemy ? API_BASE + "/api/productCollections"
          : API_BASE + "/products/all";
        const { data } = await axios.get(api);
        dispatch(fetchRecommendProductSuccessActionCreator(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchRecommendProductFailActionCreator(err.message));
        }
      }
    };

export const ChangeCategoryActionCreator = (
  data
): ChangeCategoryAction => {
  return {
    type: CHANGE_CATEGORY,
    payload: data,
  };
};