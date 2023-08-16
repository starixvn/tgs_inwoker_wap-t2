import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import IconPhonePNG from "../../assets/images/icon-mobile.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";
import Slider from "react-slick";
import OnlineUserDisplayer from "../Share/online-user-displayer";
import { AppHistory } from "../../history/History";
import { GeneralService } from "../../api-services/services/GeneralService";
import { generalAction } from "../../api-services/actions/generalAction";
import { uiAction } from "../../api-services/actions/uiAction";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { SortedMenuList } from "../../utils/HeaderSorting";
import { GameService } from "../../api-services/services/GameService";

import ReactDynamicFont from "react-dynamic-font";

const moment = require("moment");

const InnerWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
`;
const TopContainer = styled.div`
  height: 25px;
  background-color: #8a7f73;
`;
const TimerContainer = styled.div`
  font-family: Roboto;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 260px) {
    display: none;
  }
`;

const LinkContainer = styled.div`
  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: #f6f6f6;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;
const CustomExternalLink = styled.a`
  ${(props) =>
    props.selected === true
      ? `
 color:#c7a87c; 
font-weight:bold;
pointer-event:none;
`
      : `
color:#f6f6f6; 

&:hover {
 cursor:pointer;
 color: #fff;
 
 }
`}
`;
const LinkList = styled.div`
  display: flex;
`;
const LinkListItem = styled.div`
  padding: 0px 7.5px;
`;

const RightContainer = styled.div`
  float: right;
  height: 80px;
  display: flex;
  align-items: center;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  margin: 0 auto;
  max-width: 1280px;
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  width: 160px;
  margin-right: 20px;
  height: 80px;
  background-position: left center;
  float: left;
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1261px) {
    display: none;
  }
  @media (max-width: 1100px) {
    display: block;
  }
`;

const RightMenuContainer = styled.div`
  float: left;
`;
const RightMenuUL = styled.ul`
  float: left;
  list-style: none;
  padding: 0;
  margin: 0 0 0 10px;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => (i18n.language === "ta-IN" ? "11px" : "16px")};
  margin: 0 auto;
  display: ${(props) => (i18n.language === "ta-IN" ? "flex" : "block")};
  color: #8a7f73;
  padding-top: 6px;
  text-align: center;
  ${(props) =>
    i18n.language === "ta-IN"
      ? `
    height: 100%;
    width: 60px;
    white-space: normal;
    word-break: break-word;
    align-items: center;
  `
      : ``}
`;

const RightMenuTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
`;
const MouseOverContainer = styled.div`
  width: 100%;
  height: 0px;
  position: fixed;
  left: 0;
  top: 156px;
  z-index: 1;
  cursor: default;
  transition: height 0.5s;
  @media (max-width: 1261px) {
    top: 185px !important;
  }
`;
const MouseOverBackground = styled.div`
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
  height: 160px;
  position: absolute;
  bottom: 30px;
`;

const RightMenuImg = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) => `background-image:url(${props.img});`}

  ${(props) =>
    props.active
      ? `

  background-image:url(${props.hoverimg});
  `
      : `
  
  `}
`;
const MouseOverInner = styled.div`
  width: 1280px;
  height: 161px;
  margin: 0 auto;
`;

const GameImg = styled.img`
  height: 130px;
  float: right;
  position: absolute;

  padding-bottom: 10px;
  transition: transform 0.6s;
  bottom: 0;
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuBottomLine = styled.div`
  height: 10px;
  background-color: transparent;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
const RightMenuLI = styled.li`
  display: inline-block;
  padding: 0 8px;
  height: 95%;
  color: #f6f6f6;

  &:hover {
    color: #c7a87c;

    cursor: pointer;
  }
  &:hover ${MouseOverContainer} {
    height: 190px;
  }
  &:hover ${RightMenuBottomLine} {
    background-color: #c7a87c;
  }
  &:hover ${RightMenuImg} {
    ${(props) => `background-image:url(${props.hoverimg});`}
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  &:hover ${RightMenuTextSpan} {
    color: #c7a87c;
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
      color: #c7a87c;
      ${RightMenuBottomLine} {
        background-color: #c7a87c;
      }
      ${RightMenuTextSpan} {
        color: #c7a87c;
      }


  `
      : `
  
  `}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  background: ${({ theme }) => theme.pcAppBar ? theme.pcAppBar : "#fff"};
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: not-allowed;
  pointer-event: none;
  color: white;

  text-transform: capitalize;

  font-weight: bold;
  font-size: 18px;
  user-select: none;
  cursor: not-allowed;
`;

const GameFrame = styled.div`
  max-width: 290px;
  float: left;
  min-height: 160px;
  position: relative;
  transition: transform 0.6s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameImg}{
        filter: brightness(40%) grayscale(200%);
      }

      ${Maintenance}{

        display: flex;
      }

    
    
    
    `
      : ``;
  }}
`;

const CustomCsButton = styled(CustomExternalLink)`
  display: flex;
`;

const IconPhone = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  float: left;
  width: 20px;
  height: 20px;
`;

const CustomPhoneHolder = styled.div`
  float: left;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-top: 2px;
`;

const Icon = styled.div`
  width: 12px;
  height: 12x;
  margin-right: 5px;

  background-color: #f6f6f6;
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/wapp/support.png"
    }) no-repeat center /
    contain;`;
  }};

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "80px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });

    this.FireTimerToUpdateBalance();
  }

  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          if (!config.features.Register_CustomFlow_IDR)
            this.props.getBalanceList(false);
          else if (
            config.features.Register_CustomFlow_IDR &&
            this.props.wallet.bankCardList.length > 0
          )
            this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleDialogChange = (dialog) => {
    this.setState({ ...this.state, dialog: dialog });
  };
  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/");
  };
  onhandleTransfer = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/transfer");
  };
  onhandleDeposit = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/deposit");
  };
  handleInboxClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/inbox");
  };
  handleProfileClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/profile");
  };
  handleWithdrawClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/withdrawal");
  };
  handleRefreshBalanceClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.setState({ ...this.state, selected: path });
    this.props.history.push(`/${path}`);
  };

  RightMenuItem = (to, label, subMenuImg) => {
    const { classes } = this.props;
    return (
      <RightMenuLI
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
        // hoverimg={imageHover}
      >
        <RightMenuTextContainer>
          <RightMenuTextSpan
            className={`${
              this.state.shouldShow === null
                ? classes.maxLabel
                : this.state.shouldShow
                ? classes.maxLabel
                : classes.minLabel
            }`}
          >
            {label}
          </RightMenuTextSpan>
        </RightMenuTextContainer>
        <RightMenuBottomLine></RightMenuBottomLine>
        {(() => {
          if (subMenuImg != null) {
            return (
              <MouseOverContainer
                onClick={(e) => e.stopPropagation()}
                style={
                  this.state.shouldShow === null
                    ? { top: "135px" }
                    : this.state.shouldShow
                    ? { top: "135px" }
                    : { top: "114px" }
                }
              >
                <MouseOverBackground>{subMenuImg}</MouseOverBackground>
              </MouseOverContainer>
            );
          } else {
            return null;
          }
        })()}
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    Common.closePreviousPopup();
    if (this.props.account.token != null) {
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
      GameTypeEnum.RNGSPORTS,
    ];
    Common.closePreviousPopup();
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (
        gameType === GameTypeEnum.SPORTS ||
        gameType === GameTypeEnum.ESPORTS ||
        gameType === GameTypeEnum.RNGSPORTS
      ) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameType === GameTypeEnum.RNGSPORTS) {
            this.props.history.push("/sports/" + gameCode);
          } else if (gameCode === "WGFM" || gameCode === "WGVIA") {
            window.open(`/joinlobbygame/${gameType}/${gameCode}`, "_blank");
          } else {
            this.props.history.push(
              "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      Common.PopupCenter(url, gameCode, 1280, 720);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") != -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };
  handleCockfight = (item) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      if (item.include.indexOf("SM01") >= 0) {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      }
    }
  };

  handleOtherCockfightGame = (game) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      AppHistory.push("/sports/play/" + game.name + "/" + GameTypeEnum.SPORTS);
    }
  };

  consolidateJoinGame = (game, item) => {
    if (game.type === GameTypeEnum.COCKFIGHT) {
      if (game.name === "SM01") {
        this.handleCockfight(item);
      } else {
        this.handleOtherCockfightGame(game);
      }
    } else if (
      game.type === GameTypeEnum.LOTTERYLOBBY ||
      game.type === GameTypeEnum.LOBBY
    ) {
      this.handleJoinLotteryGame(game.gpcode);
    } else {
      this.handleJoinGameClick(
        game.type,
        item.path,
        game.gpcode,
        "/joingame/" + game.type + "/" + game.gpcode
      );
    }
  };

  filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      this.props.game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return this.props.game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  render() {
    const { classes } = this.props;
    const settings = {
      className: "headerSubmenu",
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap>
          <TopContainer>
            <TimerContainer>
              <AlignCenter>
                <LinkContainer style={{ float: "left" }}>
                  <LinkList>
                    <LinkListItem style={{ lineHeight: "1.7em" }}>
                      GMT+8 {this.state.systemDateTime}
                    </LinkListItem>
                  </LinkList>
                </LinkContainer>
                {config.features.OnlineUser && (
                  <OnlineUserDisplayer color="#fff" size="12px" />
                )}
                {config.features.DisplayPhone && (
                  <CustomPhoneHolder>
                    <IconPhone img={IconPhonePNG}></IconPhone>
                    <div>
                      {this.props.general.brandsSupport &&
                        this.props.general.brandsSupport.length >= 1 &&
                        this.props.general.brandsSupport[0].phone}
                    </div>
                  </CustomPhoneHolder>
                )}
              </AlignCenter>
              <LinkContainer style={{ float: "right" }}>
                <LinkList>
                  <LinkListItem>
                    {this.props.general.brandLanguage.map((lang, index) => {
                      return this.props.general.brandLanguage.length <= 1 ? (
                        ""
                      ) : (
                        <>
                          <CustomExternalLink
                            selected={i18n.language === lang.culturecode}
                            onClick={() => {
                              i18n.changeLanguage(lang.culturecode);
                              window.location.reload();
                            }}
                          >
                            {i18n.t("lang." + lang.culturecode)}
                          </CustomExternalLink>
                          {this.props.general.brandLanguage.length - 1 !== index
                            ? " | "
                            : ""}
                        </>
                      );
                    })}

                    {/* <CustomExternalLink
                      selected={i18n.language === "zh-CN"}
                      onClick={() => {
                        window.location.href = "/zh-CN";
                      }}
                    >
                      简体
                    </CustomExternalLink>
                    {" | "}
                    <CustomExternalLink
                      selected={i18n.language === "zh-TW"}
                      onClick={() => {
                        window.location.href = "/zh-TW";
                      }}
                    >
                      繁体
                    </CustomExternalLink>
                    {" | "}
                    <CustomExternalLink
                      selected={i18n.language === "en-US"}
                      onClick={() => {
                        window.location.href = "/en-US";
                      }}
                    >
                      English
                    </CustomExternalLink> */}
                  </LinkListItem>
                  <LinkListItem>
                    {this.props.general.livechat.setting && (
                      <CustomCsButton onClick={this.props.onhandleShowCSClick}>
                        <Icon></Icon>
                        <div>{i18n.t("common.cs")}</div>
                      </CustomCsButton>
                    )}
                  </LinkListItem>
                </LinkList>
              </LinkContainer>
            </TimerContainer>
          </TopContainer>
          <BottomContainer>
            <LogoContainer
              img={
                this.props.general.brand &&
                this.props.general.brand.desktopLogoUrl
              }
              onClick={this.onhandleLogoClick}
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            ></LogoContainer>
            <RightMenuContainer></RightMenuContainer>
            <RightContainer>
              {(() => {
                if (!this.props.general.isMaintenance) {
                  if (
                    this.props.account.token !== this.props.account.info.token
                  ) {
                    return (
                      <GuestContainer
                        onhandleShowCSClick={this.props.onhandleShowCSClick}
                        onhandleContactUsClick={this.handleContactUsClick}
                        onDialogChange={this.handleDialogChange}
                      ></GuestContainer>
                    );
                  } else {
                    return (
                      <MemberContainer
                        onhandleLogout={this.onhandleLogout}
                        onhandleTransfer={this.onhandleTransfer}
                        onhandleDeposit={this.onhandleDeposit}
                        onhandleInboxClick={this.handleInboxClick}
                        onhandleRefreshBalanceClick={
                          this.handleRefreshBalanceClick
                        }
                        wallet={this.props.wallet}
                        game={this.props.game}
                        account={this.props.account}
                      ></MemberContainer>
                    );
                  }
                }
              })()}
            </RightContainer>
            <RightMenuUL
              className={`top-menu ${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            >
              {!config.features.WGHK_Setup &&
                SortedMenuList.map((item, index) => {
                  var list = this.filterGameList(item).sort((a, b) => {
                    if (config.features.LiveGame_Sorting_SKY) {
                      var sortDGFirst = ["DG"];
                      return (
                        sortDGFirst.indexOf(b.abbreviation) -
                        sortDGFirst.indexOf(a.abbreviation)
                      );
                    } else return b - a;
                  });
                  if (list.length > 0) {
                    return (
                      <RightMenuLI
                        key={index}
                        active={this.state.selected === `${item.path}`}
                        onClick={() => this.handleClickMenu(item.path)}
                        onMouseOver={() => this.handleMenuMouseOver(item.path)}
                        onMouseLeave={this.handleMenuMouseLeave}
                        hoverimg={item.hoverImg}
                      >
                        <RightMenuTextContainer>
                          <RightMenuTextSpan
                            className={`${
                              this.state.shouldShow === null
                                ? classes.maxLabel
                                : this.state.shouldShow
                                ? classes.maxLabel
                                : classes.minLabel
                            }`}
                          >
                            {i18n.t(item.title)}
                          </RightMenuTextSpan>
                        </RightMenuTextContainer>
                        <RightMenuBottomLine></RightMenuBottomLine>
                        <MouseOverContainer
                          onClick={(e) => e.stopPropagation()}
                          style={
                            this.state.shouldShow === null
                              ? { top: "105px" }
                              : this.state.shouldShow
                              ? { top: "105px" }
                              : { top: "100px" }
                          }
                        >
                          <MouseOverBackground>
                            <MouseOverInner>
                              {(() => {
                                var list =
                                  this.props.game.homePageGameList.filter(
                                    (game) =>
                                      item.gameType.indexOf(game.type) >= 0
                                  );
                                return list.length <= 5 ? (
                                  list.map((game, index) => {
                                    return (
                                      <GameFrame
                                        key={index}
                                        style={{
                                          width: `calc(1264px / ${list.length})`,
                                        }}
                                        //TODO: To remove
                                        maintenance={game.status !== 0}
                                      >
                                        <GameFrameWrapper>
                                          <Maintenance>
                                            {i18n.t("transfer.maintenance")}
                                          </Maintenance>

                                          <GameImg
                                            index={index}
                                            src={`${
                                              process.env.PUBLIC_URL
                                            }/assets/images/pcHeaderMenu/${
                                              item.path
                                            }/${game.abbreviation.toLowerCase()}${
                                              config.features.SportsHideLogo &
                                              (game.abbreviation.toLowerCase() ===
                                                "wgvia" ||
                                                game.abbreviation.toLowerCase() ===
                                                  "wgfm")
                                                ? "-HKJP"
                                                : ""
                                            }.png`}
                                            alt=""
                                            onClick={() => {
                                              this.consolidateJoinGame(
                                                game,
                                                item
                                              );
                                            }}
                                          ></GameImg>
                                        </GameFrameWrapper>
                                      </GameFrame>
                                    );
                                  })
                                ) : (
                                  <Slider {...settings}>
                                    {list.map((game, index) => {
                                      return (
                                        <GameFrame
                                          key={index}
                                          style={{
                                            width: `calc(1264px / ${list.length})`,
                                          }}
                                          //TODO: To remove
                                          maintenance={game.status != 0}
                                        >
                                          <GameFrameWrapper>
                                            <Maintenance>
                                              {i18n.t("transfer.maintenance")}
                                            </Maintenance>

                                            <GameImg
                                              index={index}
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/pcHeaderMenu/${
                                                item.path
                                              }/${game.abbreviation.toLowerCase()}${
                                                config.features.SportsHideLogo &
                                                (game.abbreviation.toLowerCase() ===
                                                  "wgvia" ||
                                                  game.abbreviation.toLowerCase() ===
                                                    "wgfm")
                                                  ? "-HKJP"
                                                  : ""
                                              }.png`}
                                              alt=""
                                              onClick={() => {
                                                this.consolidateJoinGame(
                                                  game,
                                                  item
                                                );
                                              }}
                                            ></GameImg>
                                          </GameFrameWrapper>
                                        </GameFrame>
                                      );
                                    })}
                                  </Slider>
                                );
                              })()}
                            </MouseOverInner>
                          </MouseOverBackground>
                        </MouseOverContainer>
                      </RightMenuLI>
                    );
                  }
                })}
              {config.features.WGHK_Setup &&
                this.RightMenuItem("/", i18n.t("common.sportsonly"), null)}
              {this.RightMenuItem(
                "promotion",
                i18n.t("common.promotion"),
                null
              )}

              {config.features.HaveVIPFeature &&
                config.features.HomePage_DisplayVIP &&
                this.RightMenuItem("vip", "VIP", null)}
            </RightMenuUL>
          </BottomContainer>
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    general: state.general,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(Header)))
);
