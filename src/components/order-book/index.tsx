import React, { useState, useEffect } from "react";
import OrderBook from "./OrderBook";

const App = () => {
  const [askOrders, setAskOrders] = useState<[]>([]);
  const [bidOrders, setBidOrders] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currencyPair = "XBTUSD";

  useEffect(() => {
    const ws = new WebSocket(
      "wss://www.bitmex.com/realtime?subscribe=orderBook10:XBTUSD"
    );

    ws.onopen = () => {
      ws.send(null);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (!data.data) {
        return;
      }
      let orderData = data.data[0];

      setAskOrders(
        orderData.asks.map((ask) => ({
          price: ask[0],
          quantity: ask[1],
        }))
      );

      setBidOrders(
        orderData.bids.map((bid) => ({
          price: bid[0],
          quantity: bid[1],
        }))
      );
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPair]);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <h1 className="instrument">{currencyPair}</h1>
        <span>Order Book</span>
      </div>
      <div>
        {askOrders.length <= 0 || bidOrders.length <= 0 ? (
          <span>Loading...</span>
        ) : (
          <OrderBook askOrders={askOrders} bidOrders={bidOrders} />
        )}
      </div>
    </div>
  );
};

export default App;
