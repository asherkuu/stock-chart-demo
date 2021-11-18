import React from "react";

import { getPercentage } from "src/utils/chartUtils";

interface BidOrderProps {
  quantity: number;
  price: number;
  maxCumulative: number;
  cumulative: number;
}

// bid : 구매
const BidOrder: React.FC<BidOrderProps> = (props) => {
  const { cumulative, price, quantity, maxCumulative } = props;
  return (
    <tr className="orderbook__bid">
      <td className="orderbook__quantity__bid">{quantity}</td>
      <td className="orderbook__price__bid">{price}</td>
      <td
        className="orderbook__fill__bid"
        style={{
          backgroundSize: getPercentage(cumulative, maxCumulative) + "% 100%",
        }}
      >
        {cumulative}
      </td>
    </tr>
  );
};

export default React.memo(BidOrder);
