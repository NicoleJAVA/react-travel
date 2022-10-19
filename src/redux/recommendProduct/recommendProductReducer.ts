import {
  FETCH_RECOMMEND_PRODUCT_FAIL,
  FETCH_RECOMMEND_PRODUCT_START,
  FETCH_RECOMMEND_PRODUCT_SUCCESS,
  RecommendProductAction,
} from "./recommendProductActions";
import { API_SOURCE, UDEMY } from "../../helpers/constants"
import categoryName from "../../assets/strings/category-zh_tw.json"

interface RecommendProductState {
  productList: any[];
  categoryList: any[]; // todo
  cateProducts: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommendProductState = {
  productList: [],
  categoryList: [], // todo
  cateProducts: [],
  loading: true,
  error: null,
};

const reducer = (state = defaultState, action: RecommendProductAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_PRODUCT_START:
      return { ...state, loading: true };

    case FETCH_RECOMMEND_PRODUCT_SUCCESS:

      let productData;
      let cateProductList: any[] = [];
      let categoryList: string[] = []; // todo
      if (API_SOURCE === UDEMY) {
        productData = action.payload
      } else {
        console.log("\n -. -. 查看 payload", action.payload)// todo
        productData = action.payload.products
        productData.forEach(item => {
          console.log("------------\n類別 ", item.category);  //todo
          if (!(categoryList.includes(item.category))) {
            categoryList.push(item.category);
            const cateName = categoryName[item.category];
            console.log("對照 ", item.category, cateName);// todo
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
          console.log("目前資料", cateProductList)// todo
        });
      }
      // BEGIN
      //   productData.forEach(item => {
      //     if (!(item.category in cateProductList)) {
      //       cateProductList[item.category] = {};
      //       cateProductList[item.category].data = []
      //       // categoryList.push(item.category); // todo
      //       const name = categoryName[item.category];
      //       console.log("對照 ", item.category, name);// todo
      //       cateProductList[item.category].name = name;
      //     }
      //     cateProductList[item.category].data.push(item);
      //   });
      // }
      // END
      return {
        ...state, loading: false,
        productList:
          productData,
        cateProducts: cateProductList,
        categoryList: categoryList,// todo
      };

    case FETCH_RECOMMEND_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reducer;
