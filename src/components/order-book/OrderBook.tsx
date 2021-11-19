import React, { useCallback, useState } from "react";

import { InputAdornment, TextField } from "@mui/material";

import AskOrder from "./AskOrder";
import BidOrder from "./BidOrder";

interface OrderBookProps {
  askOrders: [];
  bidOrders: [];
}

const OrderBook: React.FC<OrderBookProps> = ({ askOrders, bidOrders }) => {
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  const handlePriceClick = (price: number) => {
    setOrderPrice(price);
  };

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
      order.handlePriceClick = handlePriceClick;
      return <ComponentClass key={index} {...order} />;
    });
  }, []);

  return (
    <div className="orderbook">
      <div>
        <table className="orderbook__table">
          <tbody>{renderOrders(AskOrder, newAskOrders).reverse()}</tbody>
          <tbody>{renderOrders(BidOrder, newBidOrders).reverse()}</tbody>
        </table>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label=""
          id="outlined-start-adornment"
          sx={{ m: 1, width: "30ch" }}
          value={orderPrice}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">구매가격</InputAdornment>
            ),
          }}
        />
        <TextField
          label=""
          id="outlined-start-adornment"
          sx={{ m: 1, width: "30ch" }}
          value={orderQuantity}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">주문수량</InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default OrderBook;
