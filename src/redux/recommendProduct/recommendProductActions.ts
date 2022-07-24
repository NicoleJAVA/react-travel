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
