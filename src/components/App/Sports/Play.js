import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GameService } from "../../../api-services/services/GameService";

import Maintenance from "../../Share/Maintenance";
import SportsBGNewPNG from "../../../assets/images/sportsbook/sports-bg2.jpg";

import IconRefreshLargePNG from "../../../assets/images/icon-refresh-large.png";
import IconLeftArrowPNG from "../../../assets/images/left-arrow-thicc.png";

import i18n from "../../../utils/i18n";
import LoadingGIF from "../../../assets/images/loading.gif";
import { AppHistory } from "../../../history/History";
// const channel = new BroadcastChannel('refreshBalance');

const Container = styled.div`
  width: 100%;
  border: none;
  height: 100%;
  background: url(${SportsBGNewPNG}) no-repeat center;
  background-size: cover;
`;

const InnerContainer = styled.div`
  margin: 35px auto;
  width: 1280px;
  height: 837px;
  overflow: hidden;
  background-color: #eaeaea;

  position: relative;
  border: solid #eaeaea 15px;
`;
const LoadingContainer = styled.div`
  width: 100%;

  top: 0;
  left: 0;
  position: absolute;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  background-color: #eaeaea;
  opacity: 1;
  height: 100%;
`;
const LoadingInner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoadingLogoImg = styled.img`
  margin: 0 auto;
  display: block;
  width: 150px;
`;
const LoadingLogoImg2 = styled.img`
  margin: 0 auto;
  display: block;
`;
const GameFrameHeader = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 0 10px 0;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
`;
const RefreshButton = styled.div`
  width: 48px;
  height: 50px;
  background-image: url(${IconRefreshLargePNG});
  background-repeat: no-repeat;
  background-position: center;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;

const BackButton = styled(RefreshButton)`
  background-image: url(${IconLeftArrowPNG});
  background-size: 20px;
`;

const Spliter = styled.div`
  width: 1px;
  height: 38px;
  background-color: #355460;
  float: left;
  margin-top: 6px;
`;
const GameFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;
const GameName = styled.div`
  font-size: 16px;
  float: left;
  color: #ffffff;
  margin: 14px 0 0 20px;
`;
const StyleButton = styled.div`
  border-radius: 4px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }

  width: 96px;
  height: 32px;
  margin: 9px 0 0 20px;

  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  float: left;
`;
const ButtonLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 4px;
`;

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      url: "",
      maintenance: false,
      loading: true,
      fullscreen: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateIframeLanguage = this.updateIframeLanguage.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.addEventListener("message", this.updateIframeLanguage);
    // document.getElementsByTagName("body")[0].style.overflow = "hidden";
    window.scrollTo(0, 0);
    this.JoinGame(this.props.match.params.params);
    if (document.getElementById("audio") != null)
      document.getElementById("audio").volume = 0.0;
  }

  componentDidUpdate(preProps) {
    if (
      preProps.match.params.params !== this.props.match.params.params ||
      preProps.match.params.type !== this.props.match.params.type ||
      preProps.token !== this.props.token
    ) {
      this.setState({
        ...this.state,
        loading: true,
      });
      this.JoinGame(this.props);
    }
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.overflow = "";
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener("message", this.updateIframeLanguage);
    if (document.getElementById("audio") != null)
      document.getElementById("audio").volume = 1.0;
  }
  JoinGame = (gameCode) => {
    if (gameCode === "BC") {
      GameService.JoinBetConstruct(this.props.match.params.type, gameCode).then(
        (response) => {
          if (typeof response.data === "string") {
            // channel.postMessage({action: "refresh", target:"*"});
            this.setState({ ...this.state, maintenance: false });
            var ifrm = this.myRef.current;
            ifrm =
              ifrm.contentWindow ||
              ifrm.contentDocument.document ||
              ifrm.contentDocument;

            ifrm.document.open();
            ifrm.document.write(response.data);
            ifrm.document.close();
            this.setState({
              ...this.state,
              loading: false,
            });
          } else {
            document.getElementsByTagName("body")[0].style.overflow = "";
            window.removeEventListener("resize", this.updateWindowDimensions);
            this.setState({ ...this.state, maintenance: true });
          }
        }
      );
    } else
      GameService.JoinLobbyGame(this.props.match.params.type, gameCode).then(
        (response) => {
          if (response.IsSuccess) {
            // channel.postMessage({action: "refresh", target:"*"});
            this.setState({
              ...this.state,
              maintenance: false,
              loading: false,
            });
            if (this.myRef.current) {
              var url =
                (response.data.url.indexOf("http") <= -1 ? "https:" : "") +
                response.data.url;

              this.myRef.current.src = url;
            }
          } else {
            document.getElementsByTagName("body")[0].style.overflow = "";
            window.removeEventListener("resize", this.updateWindowDimensions);
            this.setState({ ...this.state, maintenance: true });
          }
        }
      );
  };
  updateIframeLanguage(event) {
    // use these param to control change accordingly
    console.log(event.data.module); // Sport.SetLanguage
    console.log(event.data.params); // { language: 'language-code') // en, zh-cn, th-th, id-id, jp, ko-kr, vi-vn
    if (event.data.module && event.data.params) {
      if (
        event.data.module === "Sport.SetLanguage" &&
        event.data.params.language
      ) {
        const url = new URL(this.myRef.current.src);
        const searchParams = url.searchParams;
        searchParams.set("lang", event.data.params.language);
        this.myRef.current.src = url.href;
      }
    }
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleRefreshClick = () => {
    this.setState({ ...this.state, loading: true });
    this.myRef.current.src = "";
    this.JoinGame(this.props.match.params.params);
  };

  handleGoBack = () => {
    AppHistory.goBack();
  };

  handleFullScreenClick = () => {
    var elem = this.myRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  render() {
    if (this.state.maintenance === true) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else {
      return (
        <Container>
          <InnerContainer>
            {(() => {
              if (this.state.loading === true) {
                return (
                  <LoadingContainer>
                    <LoadingInner>
                      <LoadingLogoImg
                        src={
                          this.props.general.brand &&
                          this.props.general.brand.loadingUrl
                        }
                      />
                      <div className="clear"></div>
                      <LoadingLogoImg2 src={LoadingGIF} />
                    </LoadingInner>
                  </LoadingContainer>
                );
              } else {
                return null;
              }
            })()}
            <GameFrameHeader>
              <div>
                <BackButton onClick={this.handleGoBack}></BackButton>
                <Spliter></Spliter>
                <RefreshButton
                  onClick={this.handleRefreshClick}
                ></RefreshButton>
                <Spliter></Spliter>
                <GameName>{this.props.match.params.name}</GameName>
                <StyleButton onClick={this.handleFullScreenClick}>
                  <ButtonLabel>{i18n.t("slot.fullscreen")}</ButtonLabel>
                </StyleButton>
              </div>
              <div></div>
            </GameFrameHeader>
            <GameFrame
              ref={this.myRef}
              style={{ width: "1250px", height: "750px" }}
              scrolling="yes"
              frameBorder="0"
            ></GameFrame>
          </InnerContainer>
        </Container>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Play);
