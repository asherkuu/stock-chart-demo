import React from "react";

import { AreaSeries } from "react-stockcharts/lib/series";
import { curveMonotoneX } from "d3-shape";
import {
  createVerticalLinearGradient,
  hexToRGBA,
} from "react-stockcharts/lib/utils";

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
  { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
  { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

const gradiantAppearance = {
  fill: "url(#MyGradient)",
  interpolation: curveMonotoneX,
  canvasGradient: canvasGradient,
};

const LineChart = ({ isGradiant }: { isGradiant: boolean }) => {
  return (
    <>
      {isGradiant && (
        <defs>
          <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
            <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
            <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      )}
      <AreaSeries
        yAccessor={(d) => d.close}
        {...(isGradiant && { ...gradiantAppearance })}
        strokeWidth={2}
        opacity={0}
      />
    </>
  );
};

export default LineChart;
