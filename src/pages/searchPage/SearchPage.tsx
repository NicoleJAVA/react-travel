import React, { useEffect } from "react";
import styles from "./SearchPage.module.scss";
import theme from "../../Theme.module.scss";
import { Header, Footer, ProductList, FilterArea } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { searchProduct } from "../../redux/search/slice";
import { useSelector, useAppDispatch } from "../../redux/hooks";
import { use } from "i18next";

type MatchParams = {
  keyword: string;
};

export const SearchPage: React.FC = () => {
  const { keyword } = useParams<MatchParams>();
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  const pagination = useSelector((state) => state.search.pagination);
  const productList = useSelector((state) => state.search.data);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (keyword) {
      dispatch(
        searchProduct({
          nextPage: 1,
          pageSize: 10,
          keyword,
        })
      );
    }
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    if (keyword) {
      dispatch(searchProduct({ pageSize, nextPage, keyword }));
    }
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }

  if (error) {
    return <div>網站發生錯誤： {error}</div>;
  }

  return (
    <>
      <Header />
      <div className={styles["page-content"]}>
        {/* category filter */}
        <div className={styles["product-list-container"]}>
          <FilterArea />
        </div>
        {/* product list */}
        <div className={styles["product-list-container"]}>
          {productList && (
            <ProductList
              data={productList}
              paging={pagination}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
