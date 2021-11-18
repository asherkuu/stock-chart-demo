import React, { useState, useEffect } from "react";

const Channel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<any>([]);
  const currencyPair = "btcusd";

  useEffect(() => {
    setLoading(true);

    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `detail_order_book_${currencyPair}`,
      },
    };
    const ws = new WebSocket("wss://ws.bitstamp.net");

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setOrders(response.data);
      setLoading(false);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPair]);

  return (
    <div style={{ display: "flex" }}>
      {loading ? <div>loading</div> : <span>channel</span>}
    </div>
  );
};

export default Channel;
