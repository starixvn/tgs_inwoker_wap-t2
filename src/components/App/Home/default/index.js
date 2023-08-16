import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Common from "../../../../utils/Common";

import Slider from "../Slider";
import { withRouter } from "react-router-dom";

import HomeAGBgJPG from "../../../../assets/images/home-ag-bg.png";
import AGBGPNG from "../../../../assets/images/ag-bg.png";
import HomeSportSabaPNG from "../../../../assets/images/home-sport-saba.png";
import HomeSportSboPNG from "../../../../assets/images/home-sport-sbo.png";
import HomeSportImesPNG from "../../../../assets/images/home-sport-imes.png";
import HomeSportBCPNG from "../../../../assets/images/home-sport-bc.png";

import KYContentPNG from "../../../../assets/images/ky-content.png";
import KYContentModelPNG from "../../../../assets/images/ky-content-model.png";
import KYContentCardPNG from "../../../../assets/images/ky-content-card.png";

import Recommend from "../Recommend";
import Marquee from "../Marquee";

import {
  SHOW_MODAL,
  SHOW_LOGIN,
} from "../../../../api-services/constant/actionType";
import { GameTypeEnum, GameEnum } from "../../../../api-services/utils/Enum";

import i18n from "../../../../utils/i18n";
import SlotSection from "../SlotSection";
import ScrollAnimation from "react-animate-on-scroll";
import KySlider from "../KySlider";
import AGSlider from "../AgSlider";

import config from "../../../../config/config";
import PopupAnnouncement from "../PopupAnnouncement";
export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  bottom: 50px;
`;
const AGContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: visible;
`;
const AGImgBGContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: -75px;
  overflow: hidden;
  width: 100%;
`;
const AGImageBGFlex = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;
const AGImgBG = styled.img`
  width: 100%;
  min-width: 1920px;
`;

const AGTitle = styled.div`

background: url(${({ language }) => {
  return (
    process.env.PUBLIC_URL + "/assets/images/" + language + "/sport-event.png"
  );
}}) no-repeat 10px center;


width: 100%;
  height: 100px;
  display: inline-block;
  margin: 0 auto;
  margin-top: 40px;
}
`;
const AGText = styled.div`
  width: 500px;
  color: #fff;
  padding-left: 15px;
`;
const AGGameIconBar = styled.div`
  width: 500px;
  height: 100px;
  margin-top: 40px;
  padding-left: 15px;
  overflow: visible;
`;

const AGGameLeftContent = styled.div`
  float: left;
  width: 700px;
`;
const AGGameRightContent = styled.div`
  width: 550px;
  height: 535px;
  margin-top: 28px;
  float: right;
  position: relative;
`;

const ItemContainer = styled.div`
  width: 100%;
  position: relative
  z-index: 4;
`;
const AGContent = styled.div`
  width: 1280px;
  height: 535px;
  margin: 55px auto 0 auto;
  background: url(${AGBGPNG}) no-repeat;
  background-size: 100%;
`;
const NewIcon = styled.div`
  height: 20px;
  width: 120px;
  position: absolute;
  top: 4px;
  right: 50%;
  margin-right: 225px;
  gap: 8px;
  display: flex;
  color: #cb2226;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
`;

const KYContainer = styled.div`
  width: 100%;
  height: 530px;
  margin-top: 30px;
`;
const KYContent = styled.div`
  width: 1280px;
  height: 519px;

  margin: 38px auto 0 auto;
  position: relative;
`;
const KYButtonTitle = styled.div`
  color: #fff;
  font-size: 54px;
  text-align: center;
  border-bottom: 1px solid #fff;
  margin: 100px 74px 0 74px;
  font-weight: 500;
  transition: margin 2s;
`;
const KYButtonText = styled.div`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 6px 0px 0 0px;
  font-weight: 500;
`;
const KYButton = styled.div`
  width: 500px;
  height: 85px;

  background: url(${({ language }) => {
      return (
        process.env.PUBLIC_URL + "/assets/images/" + language + "/card-game.png"
      );
    }})
    no-repeat center;
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  background-size: auto 70px;
  background-color: #292828c7;
  transition: height 2s;
`;
const KyModel = styled.img`
  width: 300px;
  height: 380px;
  margin-left: 130px;
  margin-top: 28px;
`;
const KyCard = styled.img`
  width: 240px;
  position: absolute;
  bottom: 160px;
  left: 140px
  animation: ${floatKeyframe} 3s linear 0s infinite;
`;
const KYMainCharacter = styled.div`
  width: 500px;
  height: 408px;
  background: url(${KYContentPNG}) no-repeat bottom;
  float:left;
  background-size: 100%;
  position: relative;
  overflow:visible;
  margin-top:49px;
  &:hover ${KyCard} {
    animation: none;
  }
  &:hover ${KyModel} {
    animation: ${floatKeyframe} 3s linear 0s infinite;
  }
  &:hover ${KYButton} {
    height: 100%;
  }
  &:hover ${KYButtonTitle} {
    margin: 250px 74px 0 74px;
  }
}
`;

const KYHotgameContainer = styled.div`
  float: left;
  width: 780px;
  height: 500px;
`;

const GameIcon = styled.img`
  height: 30px;
  float: left;
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in;
  &:hover {
    transform: scale(1.2);
    transform-origin: center;
    cursor: pointer;
  }
`;
class Default extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();

    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
      openAnnouncement: false,
      showPromotion: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params) {
      let subid = this.props.match.params.subid || "";
      localStorage.setItem("subid", subid);
    }
    //  let promotionId = "";
    //  let promotionChannelId = "";
    //  if (this.props.match.params) {
    //    promotionId = this.props.match.params.promotionid || "";
    //    promotionChannelId = this.props.match.params.promotionchannelid || "";
    //  }
    //  localStorage.setItem("promotionId", promotionId);
    //  localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentWillUnmount() {
    localStorage.removeItem("subid");
  }
  componentDidUpdate(preProps) {
    var isInHomePage =
      this.props.ui.mains &&
      this.props.ui.mains !== preProps.ui.mains &&
      this.props.ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    if (config.features.PopupPromotion) {
      if (
        this.props.general.promotionList.items !==
          preProps.general.promotionList.items &&
        this.props.general.promotionList.items.length > 0
      ) {
        if (!this.state.openAnnouncement) {
          this.setState({
            showPromotion: true,
          });
        }
      }
    }
    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      Common.closePreviousPopup();
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType === GameTypeEnum.SPORTS ||
          gameType === GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(`/sports/play/${gameCode}/${gameType}`);
          }
        } else {
          this.props.history.push(`/${path}/${gameCode}`);
        }
      } else {
        // Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  qipaiGameHandler = () => {
    if (this.props.token !== "" && this.props.token !== null) {
      this.handleNavigateClick(`/chess`);
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    const containGameType = (gametype) => {
      return this.props.game.homePageGameList.filter((game) => {
        return game.type === gametype;
      });
    };

    var containQipai = containGameType(GameTypeEnum.QIPAI);
    var containSport = containGameType(GameTypeEnum.SPORTS);
    var containESport = containGameType(GameTypeEnum.ESPORTS);

    const GameBrandArray = [
      {
        icon: HomeSportBCPNG,
        gameType: GameTypeEnum.SPORTS,
        path: "",
        gameCode: "BC",
        url: "/joingame/" + GameTypeEnum.SPORTS + "/" + "BC",
      },
      {
        icon: HomeSportSboPNG,
        gameType: GameTypeEnum.SPORTS,
        path: "",
        gameCode: GameEnum.SBO,
        url: "/joingame/" + GameTypeEnum.SPORTS + "/" + GameEnum.SBO,
      },
      {
        icon: HomeSportSabaPNG,
        gameType: GameTypeEnum.SPORTS,
        path: "",
        gameCode: GameEnum.Sabah,
        url: "/joingame/" + GameTypeEnum.SPORTS + "/" + GameEnum.Sabah,
      },
      {
        icon: HomeSportImesPNG,
        gameType: GameTypeEnum.ESPORTS,
        path: "",
        gameCode: GameEnum.IMES,
        url: "/joingame/" + GameTypeEnum.ESPORTS + "/" + GameEnum.IMES,
      },
    ];

    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
          {
            //     <AnotherFloatPanel
            //      onhandleDepositClick={this.props.onhandleDepositClick}
            //    onhandleShowCSClick={this.props.onhandleShowCSClick}
            //   onDownloadClick={() =>
            //     this.handleNavigateClick( "/download")
            //   }
            // ></AnotherFloatPanel>
          }
        </SliderContainer>
        <AGContainer>
          <AGImgBGContainer>
            <AGImageBGFlex>
              <NewIcon language={i18n.language}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/wapp/hot.png"}
                  alt=""
                />

                <div>{i18n.t("T2.marquee")}</div>
              </NewIcon>
              <AGImgBG src={HomeAGBgJPG}></AGImgBG>
            </AGImageBGFlex>
          </AGImgBGContainer>
          <ItemContainer>
            {containSport.length > 0 && (
              <ScrollAnimation
                animateIn="bounce"
                duration={1}
                animateOnce={true}
                style={{ overflow: "visible" }}
              >
                <AGContent>
                  <AGGameLeftContent>
                    <AGSlider
                      handleJoinGameClick={this.handleJoinGameClick}
                      containSport={containSport}
                    ></AGSlider>
                  </AGGameLeftContent>
                  <AGGameRightContent>
                    <AGTitle language={i18n.language} />
                    <AGText>
                      {i18n
                        .t("sports.bunnydesc")
                        .replace(
                          "{brand}",
                          (config.brandName || config.brand) === "KING8"
                            ? "Game of King"
                            : config.brandName || config.brand
                        )}
                    </AGText>
                    <AGGameIconBar>
                      <div></div>

                      {GameBrandArray.filter((a) =>
                        containSport.some((b) => a.gameCode === b.abbreviation)
                      ).map((data, index) => {
                        return (
                          <GameIcon
                            key={index}
                            src={data.icon}
                            onClick={() =>
                              this.handleJoinGameClick(
                                data.gameType,
                                data.path,
                                data.gameCode,
                                data.url
                              )
                            }
                          />
                        );
                      })}
                    </AGGameIconBar>
                  </AGGameRightContent>
                </AGContent>
              </ScrollAnimation>
            )}
            {containQipai.length > 0 && (
              <KYContainer>
                <KYContent>
                  <KYHotgameContainer>
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      duration={1}
                      animateOnce={true}
                      style={{ overflow: "visible" }}
                    >
                      <KySlider
                        handleJoinGameClick={this.qipaiGameHandler}
                      ></KySlider>
                    </ScrollAnimation>
                  </KYHotgameContainer>
                  <KYMainCharacter>
                    <ScrollAnimation
                      animateIn="fadeInRight"
                      duration={1}
                      animateOnce={true}
                      style={{ overflow: "visible" }}
                    >
                      <KyModel src={KYContentModelPNG}></KyModel>
                    </ScrollAnimation>
                    <KyCard src={KYContentCardPNG}></KyCard>
                    <KYButton
                      onClick={this.qipaiGameHandler}
                      language={i18n.language}
                    >
                      <KYButtonTitle>GO</KYButtonTitle>
                      <KYButtonText>{i18n.t("common.startGame")}</KYButtonText>
                    </KYButton>
                  </KYMainCharacter>
                </KYContent>
              </KYContainer>
            )}
          </ItemContainer>
        </AGContainer>
        {containESport.length > 0 && (
          <SlotSection containESport={containESport}></SlotSection>
        )}

        <Recommend></Recommend>
        {(() => {
          if (
            config.features.PopupAnnouncement &&
            this.props.ui.mains &&
            this.props.ui.mains.length > 0
          ) {
            var row = this.props.ui.mains[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  if (document.getElementById("audio") != null)
                    document.getElementById("audio").play();
                  this.setState({
                    ...this.state,
                    openAnnouncement: false,
                    showPromotion: true,
                  });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}

        {config.features.PopupPromotion &&
          this.props.general.promotionList.items.length > 0 && (
            <PopupAnnouncement
              open={this.state.showPromotion}
              type="promo"
              onClose={() => {
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").play();
                this.setState({ ...this.state, showPromotion: false });
              }}
              content={this.props.general.promotionList.items}
              header={i18n.t("promotion.title")}
            ></PopupAnnouncement>
          )}
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
    general: state.general,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Default));
