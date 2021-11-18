import React, { useState, useEffect, useCallback } from "react";
import { timeFormat } from "d3-time-format";
import { getDateTime } from "src/utils/chartUtils";
import TradeItem from "./TradeList";

const MarketTrade = () => {
  const [tradeList, setTradeList] = useState([]);
  const currencyPair = "XBTUSD";
  const currency = "XBT";
  const unit = "USD";

  useEffect(() => {
    const ws = new WebSocket(
      `wss://www.bitmex.com/realtime?subscribe=trade:${currency + unit}`
    );

    ws.onopen = () => {
      ws.send(null);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (!data.data) {
        return;
      }
      let newData = data.data[0];
      handleTradeList(newData);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPair]);

  useEffect(() => {
    handleLimitTradeList();
  }, [tradeList]);

  const handleLimitTradeList = useCallback(() => {
    tradeList.length > 19 && tradeList.shift();
  }, [tradeList]);

  const handleTradeList = useCallback(
    (newData) => {
      setTradeList((prev) => [...prev, newData]);
    },
    [tradeList]
  );

  /*
    foreignNotional: homeNotional을 달러화 한것
    grossValue: homeNotional 과 관련됨
    homeNotional: 비트코인 체결 가격
    price: 체결 가격
    side: 체결 구분
    size: 달러 사이즈
    symbol: 코인 티커
    tickDirection: 가격변동이 그대로인지 상승인지 하락인지
    timestamp: 체결 시간
    trdMatchID: 트레이드 아이디
  */

  return (
    <div className="marketTrade">
      <div style={{ display: "flex" }}>
        <h1 className="instrument">{currencyPair}</h1>
        <span>Market Trade</span>
      </div>
      <table className="trades__table">
        <thead>
          <tr>
            <th className="col left">Price({unit})</th>
            <th className="col right">Amount({currency})</th>
            <th className="col right">Time</th>
          </tr>
        </thead>
        <tbody>
          <TradeItem list={tradeList} />
        </tbody>
      </table>
    </div>
  );
};

export default MarketTrade;
