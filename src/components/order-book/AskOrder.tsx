import React from "react";

import { getPercentage } from "src/utils/chartUtils";

// ask : 판매
interface AskOrderProps {
  quantity: number;
  price: number;
  maxCumulative: number;
  cumulative: number;
  handlePriceClick: (e: number) => void;
}

const AskOrder: React.FC<AskOrderProps> = (props) => {
  const { cumulative, price, quantity, maxCumulative, handlePriceClick } =
    props;

  return (
    <tr className="orderbook__ask">
      <td
        className="orderbook__fill__ask"
        style={{
          backgroundSize: getPercentage(cumulative, maxCumulative) + "% 100%",
        }}
      >
        {cumulative}
      </td>
      <td
        className="orderbook__price__ask"
        onClick={() => handlePriceClick(Number(price))}
      >
        {price}
      </td>
      <td className="orderbook__quantity__ask">{quantity}</td>
    </tr>
  );
};

export default React.memo(AskOrder);
