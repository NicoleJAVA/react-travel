import {
  FETCH_RECOMMEND_PRODUCT_FAIL,
  FETCH_RECOMMEND_PRODUCT_START,
  FETCH_RECOMMEND_PRODUCT_SUCCESS,
  RecommendProductAction,
} from "./recommendProductActions";
import { API_SOURCE, UDEMY } from "../../helpers/constants"

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

const reducer = (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCT_START:
      return { ...state, loading: true };

    case FETCH_RECOMMEND_PRODUCT_SUCCESS:

      let productData;
      if (API_SOURCE === UDEMY) {
        productData = action.payload
      } else {
        productData = action.payload.products
      }
      return {
        ...state, loading: false,
        productList:
          productData
      };

    case FETCH_RECOMMEND_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
