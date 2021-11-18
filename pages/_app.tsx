import type { AppProps } from "next/app";

import "styles/app.css";
import "styles/main.css";
import "styles/stockChart.css";
import "styles/orderbook.css";
import "styles/header.css";
import "styles/toolbar.css";
import "styles/marketTrade.css";

import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
