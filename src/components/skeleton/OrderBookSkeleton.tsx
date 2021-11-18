import React from "react";
import Skeleton from "react-loading-skeleton";

const OrderBookSkeleton = () => {
  return (
    <>
      <Skeleton height={200} />
      <Skeleton height={100} />
    </>
  );
};

export default OrderBookSkeleton;
