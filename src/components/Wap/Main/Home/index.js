import React from "react";
import config from "../../../../config/config";
import Default from "./default";
import WGHK from "./wghk";

const Home = (props) => {
  const homepageSwitcher = (brand, props) => {
    switch (brand) {
      case "WGHK":
        return <WGHK />;
      default:
        return (
          <Default navigate={props.navigate} appHistory={props.appHistory} />
        );
    }
  };
  return (
    <React.Fragment>{homepageSwitcher(config.brand, props)}</React.Fragment>
  );
};

export default Home;
