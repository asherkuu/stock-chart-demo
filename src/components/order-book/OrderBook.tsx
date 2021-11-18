import React, { useCallback } from "react";
import AskOrder from "./AskOrder";
import BidOrder from "./BidOrder";

interface OrderBookProps {
  askOrders: [];
  bidOrders: [];
}

const OrderBook: React.FC<OrderBookProps> = ({ askOrders, bidOrders }) => {
  function sumQuantities(orders) {
    return orders.reduce((total, order) => total + order.quantity, 0);
  }

  let totalAsks = sumQuantities(askOrders);
  let totalBids = sumQuantities(bidOrders);
  let maxCumulative = Math.max(totalAsks, totalBids);

  let deepCopyArrayOfObj = (arr) =>
    arr.map((order) => Object.assign({}, order));

  let newAskOrders = deepCopyArrayOfObj(askOrders).sort(
    (a, b) => a.price > b.price
  );
  let newBidOrders = deepCopyArrayOfObj(bidOrders).sort(
    (a, b) => a.price < b.price
  );

  const renderOrders = useCallback((ComponentClass, orders) => {
    let cumulative = 0;
    return orders.map((order, index) => {
      order.cumulative = cumulative += order.quantity;
      order.maxCumulative = maxCumulative;
      return <ComponentClass key={index} {...order} />;
    });
  }, []);

  return (
    <div className="orderBook">
      <table className="orderbook__table">
        <tbody>{renderOrders(AskOrder, newAskOrders).reverse()}</tbody>
        <tbody>{renderOrders(BidOrder, newBidOrders).reverse()}</tbody>
      </table>
    </div>
  );
};

export default OrderBook;
