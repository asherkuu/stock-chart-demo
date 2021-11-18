import React, { useState } from "react";

import { last } from "react-stockcharts/lib/utils";
import { format } from "d3-format";
import { fitWidth } from "react-stockcharts/lib/helper";
import { BarSeries } from "react-stockcharts/lib/series";
import { timeFormat } from "d3-time-format";
import { OHLCTooltip, HoverTooltip } from "react-stockcharts/lib/tooltip";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import LineChart from "./LineChart";
import CandleChart from "./CandleChart";
import ToolBar from "./ToolBar";
import { tooltipContent } from "src/utils/chartUtils";

interface CandleStickChartState {
  data: any[];
  width?: number;
  ratio?: number;
  type?: "svg" | "hybrid";
}

const displayTextsFormat = {
  d: "Date: ",
  o: " 시가: ",
  h: " 고가: ",
  l: " 저가: ",
  c: " 종가: ",
  v: " 거래량: ",
  na: "n/a",
};

// grid
const width = 1000;
const height = 400;

const margin = { left: 0, right: 50, top: 10, bottom: -10 };
const gridWidth = width - margin.left - margin.right;
const gridHeight = height - margin.top - margin.bottom;

const showGrid = true;
const xGrid = showGrid
  ? {
      innerTickSize: -1 * gridHeight,
      tickStrokeDasharray: "ShortDot",
      tickStrokeOpacity: 0.1,
      tickStrokeWidth: 1,
    }
  : {};
const yGrid = showGrid
  ? {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: "ShortDot",
      tickStrokeOpacity: 0.1,
      tickStrokeWidth: 1,
    }
  : {};

const _renderChart = (chartSetting: string) => {
  return (
    <>
      {chartSetting === "candle" && <CandleChart />}
      {chartSetting === "line" && <LineChart isGradiant={false} />}
      {chartSetting === "area" && <LineChart isGradiant={true} />}
    </>
  );
};

function StockChart(props: CandleStickChartState) {
  const [suffix, setSuffix] = useState<number>(1);
  const [dateSetting, setDateSetting] = useState<number>(0);
  const [chartSetting, setChartSetting] = useState<string>("candle");

  const {
    type = "hybrid",
    data: initialData,
    width: propsWidth,
    ratio,
  } = props;
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(initialData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [start, end];

  const handleReset = () => {
    setSuffix(suffix + 1);
  };

  return (
    <div style={{ marginTop: 80 }}>
      <ToolBar
        state={{
          onReset: handleReset,
          dateSetting,
          setDateSetting,
          chartSetting,
          setChartSetting,
        }}
      />

      <ChartCanvas
        ratio={ratio}
        width={width}
        height={height}
        margin={margin}
        type={type}
        seriesName={`MSFT_${suffix}`}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        {/* 상단 차트 */}
        <Chart id={1} height={240} yExtents={(d) => [d.high, d.low]}>
          {/* 우측 Y 값 */}
          <YAxis axisAt="right" orient="right" ticks={10} {...yGrid} />
          {/* 하단 X 값 */}
          <XAxis axisAt="bottom" orient="bottom" showTicks={false} {...xGrid} />

          {/* 마우스 Hover시 Y값 출력 */}
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />

          {/* 차트 */}
          {_renderChart(chartSetting)}

          <ZoomButtons onReset={handleReset} />

          {/* Hover Tooltip */}
          <HoverTooltip
            tooltipContent={tooltipContent()}
            fontSize={15}
            bgOpacity={0}
            moreProps={{ height: 100 }}
            fill="#FFFFFF"
            stroke="#9B9BFF"
          />

          {/* 좌측 상단 tooltip display */}
          <OHLCTooltip origin={[30, 10]} displayTexts={displayTextsFormat} />
        </Chart>

        {/* 하단 거래량 차트 */}
        <Chart
          id={2}
          origin={(w, h) => [0, h - 150]}
          height={115}
          yExtents={(d) => d.volume}
        >
          {/* 우측 Y 값 */}
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
            tickFormat={format(".1s")}
          />
          {/* 하단 X 값 */}
          <XAxis axisAt="bottom" orient="bottom" ticks={20} />

          {/* 마우스 Hover시 X값 출력 */}
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />

          {/* 마우스 Hover시 Y값 출력 */}
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".4s")}
          />
          {/* 하단 거래량 데이터 */}
          <BarSeries
            yAccessor={(d) => d.volume}
            stroke={false}
            opacity={0.8}
            fill={(d) => (d.close > d.open ? "#2548e2" : "rgb(255, 0, 0)")}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </div>
  );
}

//@ts-ignore
StockChart = fitWidth(StockChart);

export default StockChart;
