import { format } from "d3-format";
import { tsvParse, csvParse } from "d3-dsv";
import { timeParse, timeFormat } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");
const dateFormat = timeFormat("%Y-%m-%d");
const numberFormat = format(".2f");

export function getDateTime(targetDate) {
  const { hour, min, sec } = getMonthDayHour(targetDate);
  return hour + ":" + min + ":" + sec;
}

// 함수를 한번더 추상화 하여 재사용성을 높임
function getMonthDayHour(targetDate) {
  const date = new Date(targetDate);

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return {
    hour: hour >= 10 ? hour : "0" + hour,
    min: min >= 10 ? min : "0" + min,
    sec: sec >= 10 ? sec : "0" + sec,
  };
}

function parseData(parse) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

export function getData() {
  return fetch(
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT_full.tsv"
  )
    .then((response) => response.text())
    .then((data) => tsvParse(data, parseData(parseDate)));
}

export function tooltipContent() {
  return ({ currentItem, xAccessor }) => {
    return {
      x: dateFormat(xAccessor(currentItem)),
      y: [
        {
          label: "시가",
          value: currentItem.open && numberFormat(currentItem.open),
        },
        {
          label: "고가",
          value: currentItem.high && numberFormat(currentItem.high),
        },
        {
          label: "저가",
          value: currentItem.low && numberFormat(currentItem.low),
        },
        {
          label: "종가",
          value: currentItem.close && numberFormat(currentItem.close),
        },
      ],
    };
  };
}

export function getPercentage(cumulative: number, maxCumulative: number) {
  let fillPercentage = (maxCumulative ? cumulative / maxCumulative : 0) * 100;
  fillPercentage = Math.min(fillPercentage, 100); // Percentage can't be greater than 100%
  fillPercentage = Math.max(fillPercentage, 0); // Percentage can't be smaller than 0%
  return fillPercentage;
}
