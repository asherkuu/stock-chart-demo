import React from "react";
import { getDateTime } from "src/utils/chartUtils";

const TradeItem = ({ list }) => {
  return (
    <>
      {list
        .map((item, index) => (
          <tr
            key={item.trdMatchID}
            className={`tr-${Number.isInteger(index / 2) ? "even" : "odd"} ${
              item.tickDirection.includes("Minus") ? "down" : "up"
            }`}
          >
            <td className="price left">{item.price}</td>
            <td className="ammount right">{item.homeNotional}</td>
            <td className="time right">{getDateTime(item.timestamp)}</td>
          </tr>
        ))
        .reverse()}
    </>
  );
};

export default React.memo(TradeItem);
