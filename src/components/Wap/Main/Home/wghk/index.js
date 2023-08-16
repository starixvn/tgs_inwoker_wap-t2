import React from "react";
import { connect } from "react-redux";
import GamePage from "./game";
import Landing from "./landing";
const WGHK = (props) => {
  return props.token ? <GamePage /> : <Landing />;
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(WGHK);
