import React from "react";
import { CandlestickSeries } from "react-stockcharts/lib/series";

const candlesAppearance = {
  wickStroke: (d) => (d.close > d.open ? "#FF0000" : "#002fff"),
  fill: function fill(d) {
    return d.close > d.open ? "#FF0000" : "#002fff";
  },
  stroke: (d) => (d.close > d.open ? "#FF0000" : "#002fff"),
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 1,
};

const Candle = () => {
  return <CandlestickSeries {...candlesAppearance} />;
};

export default Candle;
