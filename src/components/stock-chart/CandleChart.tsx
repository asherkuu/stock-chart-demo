import React from "react";
import { CandlestickSeries } from "react-stockcharts/lib/series";

const candlesAppearance = {
  wickStroke: (d) => (d.close > d.open ? "#002fff" : "#FF0000"),
  fill: function fill(d) {
    return d.close > d.open ? "#002fff" : "#FF0000";
  },
  stroke: (d) => (d.close > d.open ? "#002fff" : "#FF0000"),
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 1,
};

const Candle = () => {
  return <CandlestickSeries {...candlesAppearance} />;
};

export default Candle;
