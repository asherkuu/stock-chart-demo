import React from "react";
import Layout from "src/components/share/Layout";

const Main = () => {
  return (
    <Layout>
      <div className="app__main">
        <div className="left">
          <div className="main__chart"></div>
        </div>
        <div className="right"></div>
      </div>
    </Layout>
  );
};

export default Main;
