import {
  FETCH_RECOMMEND_PRODUCT_FAIL,
  FETCH_RECOMMEND_PRODUCT_START,
  FETCH_RECOMMEND_PRODUCT_SUCCESS,
  RecommendProductAction,
} from "./recommendProductActions";

interface RecommendProductState {
  productList: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommendProductState = {
  productList: [],
  loading: true,
  error: null,
};

export default (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCT_START:
      return { ...state, loading: true };

    case FETCH_RECOMMEND_PRODUCT_SUCCESS:
      return { ...state, loading: false, productList: action.payload };

    case FETCH_RECOMMEND_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
