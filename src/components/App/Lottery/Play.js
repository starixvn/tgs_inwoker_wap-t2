import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { GameService } from "../../../api-services/services/GameService";
import Maintenance from "../../Share/Maintenance";
import { withSnackbar } from "notistack";
const Container = styled.iframe`
  width: 100%;
`;
// const channel = new BroadcastChannel('refreshBalance');

class Play extends Component {
  constructor(props) {
    this.state = { width: 0, height: 0, url: "", maintenance: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    window.scrollTo(0, 0);
    this.JoinGame(this.props.match.params.params);
  }

  componentDidUpdate(preProps) {
    if (
      preProps.match.params.params !== this.props.match.params.params ||
      preProps.token !== this.props.token
    ) {
      this.JoinGame(this.props.match.params.params);
    }
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.overflow = "";
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  JoinGame = (kind) => {
    GameService.JoinGame(JSON.parse(kind)).then((response) => {
      if (response.IsSuccess) {
        // channel.postMessage({action: "refresh", target:"*"});
        this.setState({ ...this.state, maintenance: false });
        if (this.myRef.current) this.myRef.current.src = response.data.web_url;
      } else {
        document.getElementsByTagName("body")[0].style.overflow = "";
        window.removeEventListener("resize", this.updateWindowDimensions);
        this.setState({ ...this.state, maintenance: true });
      }
    });
  };
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    if (this.state.maintenance === true) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else {
      return (
        <Container
          ref={this.myRef}
          style={{ height: this.state.height - 154 + "px" }}
          scrolling="no"
          frameBorder="0"
          id="iframe"
        ></Container>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(withSnackbar(Play));
