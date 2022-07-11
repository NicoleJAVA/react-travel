import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  let params = useParams<"touristRouteId">();

  return <h1>詳細 路線 id: {params.touristRouteId}</h1>;
};
