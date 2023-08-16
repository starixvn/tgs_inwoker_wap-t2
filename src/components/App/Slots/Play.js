import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import LoadingGIF from "../../../assets/images/loading.gif";

import BGJPG from "../../../assets/images/bg.jpg";
import IconRefreshLargePNG from "../../../assets/images/icon-refresh-large.png";
import IconLeftArrowPNG from "../../../assets/images/left-arrow-thicc.png";
import IconFavPNG from "../../../assets/images/icon-fav.png";

import Maintenance from "../../Share/Maintenance";
import { withSnackbar } from "notistack";
import i18n from "../../../utils/i18n";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
import config from "../../../config/config";
import { AppHistory } from "../../../history/History";
// const channel = new BroadcastChannel('refreshBalance');

const Container = styled.div`
  width: 100%;
  background: url(${BGJPG});
  min-height: 800px;
`;
const InnerContainer = styled.div`
  margin: 35px auto;
  width: 1280px;
  height: 837px;
  overflow: hidden;
  background-color: #eaeaea;
  padding-bottom: 15px;
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
  height: 746px;
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

const FavButtonButton = styled.div`
  width: 20px;
  height: 20px;

  background: ${({ active }) => {
    return active ? "white" : "red";
  }};
  -webkit-mask: url(${IconFavPNG}) no-repeat center / contain;
  background-size: 100%;
`;

const FavButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      maintenance: false,
      fullScreen: false,
      isFav: false,
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.token != null) {
      this.DoJoinGame();
    }
    GameService.GetFavoriteGame(this.getType()).then((e) => {
      if (e.IsSuccess) {
        if (e.data.indexOf(this.params) > -1) {
          this.setState({
            ...this.state,
            isFav: true,
          });
        } else {
          this.setState({
            ...this.state,
            isFav: false,
          });
        }
      }
    });
  }

  params = parseInt(this.props.match.params.params);

  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : this.props.match.url.indexOf("fish") >= 0
        ? GameTypeEnum.FISH
        : GameTypeEnum.SLOT;
    return type;
  }

  handleRefreshClick = () => {
    this.setState({ ...this.state, loading: true });
    this.myRef.current.src = "";
    this.DoJoinGame();
  };

  handleGoBack = () => {
    AppHistory.goBack();
  };
  componentWillUpdate() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token == null && this.props.token != null) {
      this.DoJoinGame();
    }
  }
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
  // handleTestPlayClick = () => {
  //   let test =
  //     this.state.test == SlotGameIsTest.Yes
  //       ? SlotGameIsTest.No
  //       : SlotGameIsTest.Yes;

  //   this.setState({
  //     ...this.state,
  //     test: test,
  //     loading: true,
  //   });
  //   this.DoJoinGame(test);
  // };
  DoJoinGame = () => {
    const params = parseInt(this.props.match.params.params);
    const type = this.props.match.params.type;
    GameService.JoinGame(params, type).then((response) => {
      if (response.IsSuccess) {
        // channel.postMessage({action: "refresh", target:"*"});
        if (response.data.url != null && this.myRef.current != null) {
          this.myRef.current.src = response.data.url;
          this.setState({ ...this.state, loading: false });
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(response.info),
            {
              variant: "error",
            }
          );
        }
      } else {
        this.setState({ ...this.state, maintenance: true });
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(response.info),
          {
            variant: "error",
          }
        );
      }
    });
  };

  handleToggleFavorite = () => {
    if (this.state.isFav) {
      this.props.removeFavoriteGame(this.params);
      this.setState({
        ...this.state,
        isFav: false,
      });
    } else {
      this.props.setFavoriteGame(this.params);
      this.setState({
        ...this.state,
        isFav: true,
      });
    }
  };

  render() {
    if (this.state.maintenance === true) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else
      return (
        <Container id={this.props.match.params.params}>
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
              <div>
                <FavButton onClick={this.handleToggleFavorite}>
                  <FavButtonButton active={!this.state.isFav}></FavButtonButton>
                </FavButton>
              </div>
            </GameFrameHeader>
            <GameFrame
              ref={this.myRef}
              scrolling="yes"
              frameBorder="0"
            ></GameFrame>
          </InnerContainer>
        </Container>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
  };
};
const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    general: state.general,
    token: state.account.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Play));
