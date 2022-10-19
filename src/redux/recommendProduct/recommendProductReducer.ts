import {
  FETCH_RECOMMEND_PRODUCT_FAIL,
  FETCH_RECOMMEND_PRODUCT_START,
  FETCH_RECOMMEND_PRODUCT_SUCCESS,
  RecommendProductAction,
} from "./recommendProductActions";
import { API_SOURCE, UDEMY } from "../../helpers/constants"
import categoryName from "../../assets/strings/category-zh_tw.json"

interface RecommendProductState {
  allProducts: any[];
  categoryList: any[];
  cateProducts: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommendProductState = {
  allProducts: [],
  categoryList: [],
  cateProducts: [],
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
        return;
      }

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


      return {
        ...state,
        loading: false,
        allProducts: allProducts,
        cateProducts: cateProductList,
        categoryList: categoryList,
      };

    case FETCH_RECOMMEND_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
