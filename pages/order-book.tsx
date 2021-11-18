import React from "react";
import Header from "src/components/share/Header";
import OrderBook from "src/components/order-book";
import Layout from "src/components/share/Layout";

const OrderBookPage = () => {
  return (
    <Layout>
      <OrderBook />
    </Layout>
  );
};

export default OrderBookPage;
