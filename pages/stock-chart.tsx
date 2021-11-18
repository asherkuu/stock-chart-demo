import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const StockChart = dynamic(() => import("src/components/stock-chart"), {
  ssr: false,
  loading: () => null,
});

import { getData } from "src/utils/chartUtils";
import Layout from "src/components/share/Layout";

// field
// 0: "date"
// 1: "open"
// 2: "high"
// 3: "low"
// 4: "close"
// 5: "volume"
// 6: "split"
// 7: "dividend"
// 8: "absoluteChange"
// 9: "percentChange"

// data
// absoluteChange: ""
// close: 25.710416
// date: Mon Jan 04 2010 00:00:00 GMT+0900 (한국 표준시) {}
// dividend: ""
// high: 25.835021381744056
// low: 25.411360259406774
// open: 25.436282332605284
// percentChange: ""
// split: ""
// volume: 38409100

interface CandleDataState {
  absoluteChange: string;
  close: number;
  date: Date;
  dividend: string;
  high: number;
  low: number;
  open: number;
  percentChange: string;
  split: string;
  volume: number;
}

function StockChartPage() {
  const [candleData, setCandleData] = useState<CandleDataState[]>(null);

  const currencyPair = "XBTUSD";

  useEffect(() => {
    getData().then((data: CandleDataState[]) => {
      setCandleData(data);
    });
    return () => clearTimeout();
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <h1>{currencyPair}</h1>
        <span>Stock Chart</span>
      </div>
      {candleData === null ? (
        <span>Loading...</span>
      ) : (
        <StockChart data={candleData} />
      )}
    </Layout>
  );
}

export default StockChartPage;
