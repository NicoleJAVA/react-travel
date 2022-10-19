import {
  FETCH_RECOMMEND_PRODUCT_FAIL,
  FETCH_RECOMMEND_PRODUCT_START,
  FETCH_RECOMMEND_PRODUCT_SUCCESS,
  CHANGE_CATEGORY,
  RecommendProductAction,
} from "./recommendProductActions";
import { API_SOURCE, UDEMY } from "../../helpers/constants"
import categoryName from "../../assets/strings/category-zh_tw.json"

interface RecommendProductState {
  allProducts: any[];
  categoryList: any[];
  cateProducts: any[];
  currProducts: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommendProductState = {
  allProducts: [],
  categoryList: [],
  cateProducts: [],
  currProducts: [],
  loading: true,
  error: null,
};

const reducer = (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCT_START:
      return { ...state, loading: true };

    case FETCH_RECOMMEND_PRODUCT_SUCCESS:

      let allProducts;
      let cateProductList: any[] = [];
      let categoryList: string[] = [];

      if (API_SOURCE === UDEMY) {
        allProducts = action.payload

      } else {
        allProducts = action.payload.products
        allProducts.forEach(item => {
          if (!(categoryList.includes(item.category))) {
            categoryList.push(item.category);
            const cateName = categoryName[item.category];
            const newData = {
              name: cateName,
              category: item.category,
              data: [item]
            };
            cateProductList.push(newData);
          } else {
            cateProductList.find(x => x.category === item.category)
              .data.push(item);
          }
        });
      }

      return {
        ...state,
        loading: false,
        allProducts: allProducts,
        cateProducts: cateProductList,
        categoryList: categoryList,
        currProducts: allProducts,
      };

    case FETCH_RECOMMEND_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHANGE_CATEGORY:
      const data = state.cateProducts
        .find(x => x.category === action.payload).data;

      return {
        ...state,
        currProducts: data,
      };

    default:
      return state;
  }
};

export default reducer;
