import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Router, Route, Switch, Redirect } from "react-router";
import { AppHistory } from "../../history/History";
import { withSnackbar } from "notistack";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import {
  SHOW_LOGIN,
  UPDATING_SCREEN_SIZE,
} from "../../api-services/constant/actionType";
import { uiAction } from "../../api-services/actions/uiAction";
import { gameAction } from "../../api-services/actions/gameAction";
import { generalAction } from "../../api-services/actions/generalAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { accountAction } from "../../api-services/actions/accountAction";
import { inboxAction } from "../../api-services/actions/inboxAction";
import { GeneralService } from "../../api-services/services/GeneralService";

import BlowFishEncryption from "../../utils/BlowFishEncryption";
import LiveGame from "./LiveGame/index";
import Slots from "./Slots/index";
import SlotPlay from "./Slots/Play";
import Qipai from "./Qipai/index";
import Sports from "./Sports/index";
import ESports from "./eSports/index";
import SportsPlay from "./Sports/Play";
import Lottery from "./Lottery/index";
import LotteryPlay from "./Lottery/Play";
import Promotion from "./Promotion/index";
import PromotionDetails from "./Promotion/Details";
import Cockfight from "./Cockfight/index";
// import Maintenance from "./Maintenance";
import Account from "./Account/index";

import Header from "./Header";
import Common from "../../utils/Common";
import Footer from "./Footer";
import Loading from "./Loading";
// import RegisterSuccess from "./RegisterSuccess";
import Download from "./Download/index";
import LiveChat from "../Share/live-chat";
import VIP from "./VIP/index";

import i18n from "../../utils/i18n";
import Banned from "./Banned";
import AnotherFloatPanel from "./Home/AnotherFloatPanel";
import PromotionRoulette from "./Home/PromotionRoulette";
import config from "../../config/config";
import CustomLibrary from "./Sports/CustomLibrary";
import ForcedVerification from "./ForcedVerification";
import Home from "./Home";
// const bc = new BroadcastChannel("refreshBalance");

const Main = styled.div`
  min-height: 600px;
`;
const EmptyHeader = styled.div`
  height: 105px;
  background: #000103;
  @media (max-width: 1100px) {
    height: ${config.brand === "WGHK" ? "105px" : "187px"};
  }
`;
const RouletteFloatingPanel = styled.div`
  position: fixed;
  z-index: 1300;

  ${({ position }) => {
    //for each item in position object, map accordingly
    return position !== undefined
      ? Object.keys(position).map((key) => {
          return `${key}: ${position[key]}px;`;
        })
      : `  top: 0;
    left: 0;
    padding-top: 16%;
    padding-left: 2%;`;
  }}

  display: flex;
  flex-direction: ${({ orientation }) => {
    return orientation ? orientation : "column";
  }};
`;
let csWindowTab = null;
class App extends Component {
  state = {
    showCS: false,
    isIpRestrict: false,
  };
  async componentDidMount() {
    // bc.onmessage = (eventMessage) => {
    //   this.performBalanceRefresh();
    // };

    if (this.props.general.token === "") {
      this.props.getSiteToken();
    } else {
      this.props.getBrandCommunicationList();
      this.props.getBrandLanguage();
      this.props.getMarquee(i18n.language);
      this.props.getAnnouncement(i18n.language);
      this.props.getBanner();
      this.props.getBrand();
      this.props.getLiveChatURL();
      this.props.getPromotion();
      this.props.getAffiliateStatus();
      // this.props.getVIP();
    }
    // if (response.IsSuccess) {
    //   localStorage.setItem("client-token", response.data.token);
    // }
    // this.props.getMobilePrefix();
    //this.props.getMarquee();
    // this.props.getBanner();
    // this.props.getGamePlatformList();
    //this.props.getHomePageGameList();
    const urlpath = this.props.location.pathname.split("/");

    if (urlpath.length === 3) {
      if (urlpath[1] === "a") {
        localStorage.setItem("promotionId", urlpath[2] || "");
        localStorage.setItem("upper", ""); //reset
        localStorage.setItem("invitationtype", "a");
      }
      if (urlpath[1] === "p") {
        localStorage.setItem("upper", urlpath[2] || "");
        localStorage.setItem("promotionId", ""); //reset
        localStorage.setItem("invitationtype", "p");
      }
    } else {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", ""); //reset
      localStorage.setItem("promotionId", ""); //reset
    }

    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
      }
    }
    if (urlParams.has("open")) {
      const openValue = urlParams.get("open");
      if (openValue) {
        AppHistory.replace("/" + openValue);
      }
    }
    if (urlParams.has("do")) {
      const doValue = urlParams.get("do");

      switch (doValue) {
        case "login":
        case "logout":
        case "register":
        case "login_auth":
        case "register_auth":
          localStorage.removeItem("token0");
          break;
        case "login_token":
          // const decryptedToken = BlowFishEncryption.Decrypt(
          //   urlParams.get("token")
          // );

          // localStorage.setItem("token0", decryptedToken);
          // AppHistory.replace("/");
          break;
        default:
          break;
      }
    } else {
      //  this.props.getWalletBalance();
    }
  }
  async componentDidUpdate(preProps) {
    if (preProps.general.token !== this.props.general.token) {
      if (
        this.props.general.token === null ||
        this.props.general.token === ""
      ) {
        this.props.getSiteToken();
      } else {
        localStorage.setItem("client-token", this.props.general.token);

        const localStorageToken = localStorage.getItem("token0");
        if (
          localStorageToken != null &&
          this.props.account.token === null &&
          this.props.account.info.token === ""
        ) {
          const responseToken = await this.props.checkTokenIsValid();
          if (responseToken.IsSuccess) {
            var bankInfoAuthentication = null;
            var isPhoneNull = null;
            var isEmailNull = null;
            var isRegisterCompleted = null;
            await this.props.getAccountInfo().then((response) => {
              bankInfoAuthentication = response.data.bankinfoauthentication;
              isPhoneNull = response.data.phone === null;
              isEmailNull = response.data.email === null;
              isRegisterCompleted = response.data.registercompleted;
            });
            if (
              config.features.ForceRedirectAddCard &&
              !bankInfoAuthentication
            ) {
              if (isPhoneNull) {
                AppHistory.push("/account/profile/member_phone");
              } else {
                if (isEmailNull) {
                  AppHistory.push("/account/profile/member_email");
                } else {
                  if (!isRegisterCompleted) {
                    AppHistory.push("/account/withdrawal?do=addCard");
                  }
                }
              }
              return;
            }
            // this.props.checkGame();
            // this.props.getBankList();
            this.props.getBalanceList();
            this.props.getMessageList(i18n.language, 0, 99);
            this.props.getBankCardList();
            this.props.getAutoTransferStatus();
            this.props.getPromotion();
            this.props.getPromotionRouletteCount();
            this.props.getWithdrawalChannel();
            // if (inbox.IsSuccess) {
            //   this.setState({ inbox: inbox.data });
            // }
            // this.props.getIDCardNo();
            // this.props.getInviteLink();
            // this.props.getDepositChannel();
          }
        }
        //this.props.getMarquee();
        GeneralService.GetLocalization().then((response) => {
          if (response.IsSuccess) {
            ErrorSwitcher.setTranslation(response.data);
          }
        });
        this.props.getHomePageGameList();
        this.props.getBrandCommunicationList();
        this.props.getMarquee(i18n.language);
        this.props.getAnnouncement(i18n.language);
        this.props.getLiveChatURL();
        this.props.getBrandLanguage();
        this.props.getBanner();
        this.props.getBrand();
        this.props.getPromotion();
        this.props.getAffiliateStatus();
        // this.props.getVIP();
      }
    }
    if (
      preProps.account.token !== this.props.account.token &&
      (this.props.account.token === null || this.props.account.token === "")
    ) {
      this.props.getPromotion();
    }
    if (config.features.ForceRedirectAddCard) {
      if (
        this.props.general.token !== null &&
        this.props.account.token !== null &&
        this.props.account.info.member_phone !== null &&
        this.props.account.info.member_email !== null &&
        this.props.account.info.bankInfoAuthentication !== undefined &&
        !this.props.account.info.bankInfoAuthentication &&
        this.props.location.pathname !== `/account/withdrawal`
      ) {
        if (this.props.location.pathname !== `/account/withdrawal`) {
          AppHistory.push("/account/withdrawal?do=addCard");
          return;
        }
      }
    }
    if (
      preProps.game.providerList.length !==
        this.props.game.providerList.length &&
      this.props.account.token !== null
    ) {
      this.props.game.providerList
        .filter((item) => item.status === 0 && item.transferwallet === true)
        .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
        .map((a) => {
          this.props.getGameBalance(a.gpcode);
        });
    }
    if (
      preProps.general.isMaintenance !== this.props.general.isMaintenance &&
      this.props.general.isMaintenance === true
    ) {
      this.props.history.push("/maintenance");
    }
    if (
      preProps.general.brandLanguage !== this.props.general.brandLanguage &&
      this.props.general.brandLanguage.length > 0
    ) {
      if (
        this.props.general.brandLanguage.filter(
          (a) => a.culturecode === i18n.language
        ).length <= 0
      ) {
        if (
          this.props.general.brandLanguage.filter((a) => {
            return a.culturecode === i18n.language;
          })
        ) {
          i18n.changeLanguage(this.props.general.brandLanguage[0].culturecode);

          window.location.reload();
        }
      } else {
        if (
          this.props.general.brandLanguage.filter(
            (a) => a.culturecode === i18n.language
          )
        ) {
          if (
            window.location.pathname.split("/")[1] !== i18n.language ||
            window.location.pathname.split("/").length > 3
          ) {
            i18n.changeLanguage(i18n.language);
          }
        }
      }
    }
  }
  GetSupportUrl = (userid, name, question, email) => {
    var newURL = this.props.general.livechat
      ? this.props.general.livechat.setting.url
          .replace("{name}", name)
          .replace("{email}", email || "")
          .replace("{lang}", i18n.language)
      : "";

    if (newURL.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    } else {
    }
  };

  handleShowCSClick = () => {
    this.GetSupportUrl(
      this.props.account.info.member_id,
      this.props.account.info.member_username,
      "",
      this.props.account.info.member_email
    );
  };

  handleDepositClick = () => {
    if (this.props.account.token == null) {
      this.props.showLogin(true);
    } else {
      this.props.history.push("/account/deposit");
    }
  };

  isRouletteAvailable = () => {
    return (
      this.props.general.promotionList.items &&
      this.props.general.promotionList.items.length > 0 &&
      this.props.general.promotionList.items.findIndex(
        (item) => item.promotionType.toUpperCase() === "ROULETTE"
      ) >= 0
    );
  };

  isInHomePage = () => {
    const path = this.props.location.pathname;
    const pathArray = path.split("/");
    if (pathArray[2] !== "account") {
      return true;
    } else {
      return false;
    }
  };

  path = window.location.pathname.split("/");
  maintenance = this.path[2] == "maintenance";

  performBalanceRefresh = () => {
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };

  render() {
    const languageDetector =
      i18n.language ||
      localStorage.getItem("i18nextLng") ||
      config.defaultLanguage;
    return (
      <Router history={AppHistory}>
        {(() => {
          if (
            (this.state.isIpRestrict ||
              this.props.general.token == "" ||
              this.props.general.token == null) &&
            this.props.general.isMaintenance === false
          ) {
            return <Loading show={true} opacity={1}></Loading>;
          } else {
            return (
              <>
                <Header onhandleShowCSClick={this.handleShowCSClick}></Header>
                <EmptyHeader></EmptyHeader>
                <Main>
                  <Switch>
                    <Route
                      exact
                      path={[
                        "/",
                        "/a/:promotionid",
                        "/t/:promotionid",
                        "/f/:promotionid",
                        "/p/:playername",
                        "/register&visitor_id=:subid",
                      ]}
                      render={(props) => (
                        <Home
                          onhandleShowCSClick={this.handleShowCSClick}
                          onhandleDepositClick={this.handleDepositClick}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/live"}
                      render={(props) => (
                        <LiveGame
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/chess"}
                      render={(props) => (
                        <Qipai
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/sports"}
                      render={(props) => (
                        <Sports
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/esports"}
                      render={(props) => (
                        <ESports
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/sports/play/:params/:type"}
                      component={SportsPlay}
                    />
                    <Route
                      exact
                      path={"/sports/:platform"}
                      render={(props) => (
                        <CustomLibrary
                          {...props}
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/sports/c/:type/:params"}
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={"/lottery"}
                      render={(props) => (
                        <Lottery
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={"/lottery/play/:params?"}
                      component={LotteryPlay}
                    />
                    <Route
                      exact
                      path={[
                        "/slots/:platform?",
                        "/electron/:platform?",
                        "/fish/:platform?",
                      ]}
                      render={(props) => (
                        <Slots
                          {...props}
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Route
                      exact
                      path={[
                        "/slots/play/:type/:params",
                        "/electron/play/:type/:params",
                        "/fish/play/:type/:params",
                      ]}
                      component={SlotPlay}
                    />
                    <Route
                      exact
                      path={"/promotion"}
                      render={(props) => (
                        <Promotion token={this.props.account.token} />
                      )}
                    />
                    <Route
                      exact
                      path={"/promotion/:id"}
                      render={(props) => <PromotionDetails />}
                    />
                    {config.features.HaveVIPFeature && (
                      <Route exact path={"/vip"} render={(props) => <VIP />} />
                    )}
                    {/* <Route
                      exact
                      path={"/maintenance"}
                      render={(props) => <Maintenance />}
                    />
                    <Route
                      exact
                      path={"/registersuccess/:username"}
                      component={RegisterSuccess}
                    />{" "} */}
                    <Route
                      exact
                      path={"/banned"}
                      render={(props) => (
                        <Banned onhandleCSClick={this.GetSupportUrl} />
                      )}
                    />
                    <Route
                      exact
                      path={"/account/:tab/:popup?"}
                      render={(props) => (
                        <Account
                          token={this.props.account.token}
                          onhandleCSClick={this.GetSupportUrl}
                        />
                      )}
                    />
                    {config.features.HaveDownloadFeature && (
                      <Route
                        exact
                        path={"/download"}
                        component={Download}
                      />
                    )}
                    <Route
                      exact
                      path={"/cockfight"}
                      render={(props) => (
                        <Cockfight
                          performBalanceRefresh={this.performBalanceRefresh}
                        />
                      )}
                    />
                    <Redirect to={"/"} />
                  </Switch>
                </Main>

                <AnotherFloatPanel
                  onhandleShowCSClick={this.handleShowCSClick}
                ></AnotherFloatPanel>

                {config.features.LiveChatVendor.brand &&
                  config.features.LiveChatVendor.license && (
                    <LiveChat
                      license={config.features.LiveChatVendor.license}
                      vendor={config.features.LiveChatVendor.brand}
                      group={
                        config.features.LiveChatVendor.group
                          ? config.features.LiveChatVendor.group
                          : 0
                      }
                    />
                  )}

                <ForcedVerification
                  forcedverify={
                    config.features.SMSVerification &&
                    this.props.account.registercompleted === false &&
                    config.features.ForcedVerification
                    // this.props.account.info.identityformstatus === 0 &&
                    // (this.props.account.info.identityformid === "" ||
                    //   this.props.account.info.identityformid === null)
                  }
                />
                {this.props.account.registercompleted === false &&
                  config.features.Register_ShowPhone &&
                  config.features.ForcedVerification && (
                    <Redirect
                      to={{
                        pathname: "/account/profile/member_phone",
                        state: { forced: true },
                      }}
                    />
                  )}

                {config.features.HomePage_PromoRoulette &&
                  this.isInHomePage() && (
                    <RouletteFloatingPanel
                      position={
                        config.features.RouletteSetting &&
                        config.features.RouletteSetting.web &&
                        config.features.RouletteSetting.web.position
                      }
                      orientation={
                        config.features.RouletteSetting &&
                        config.features.RouletteSetting.web &&
                        config.features.RouletteSetting.web.orientation
                      }
                    >
                      {this.props.general.rouletteCount.length > 0 &&
                        this.props.general.rouletteCount
                          .filter((item) => {
                            return (
                              item.promotiontype.toUpperCase() ===
                              "DEPOSITACCUMULATEROULETTE"
                            );
                          })
                          .map((roulette, index) => {
                            return roulette.roulettecount >= 0 &&
                              index === 0 ? (
                              <PromotionRoulette
                                rouletteType={roulette.promotiontype.toUpperCase()}
                                promotionDetail={{ id: roulette.promotionid }}
                              ></PromotionRoulette>
                            ) : (
                              <React.Fragment></React.Fragment>
                            );
                          })}
                      {config.features.HomePage_PromoRoulette &&
                        !config.features.RouletteNewFlow &&
                        this.isRouletteAvailable() && (
                          <PromotionRoulette
                            rouletteType="ROULETTE"
                            promotionDetail={
                              this.props.general.promotionList.items.filter(
                                (item) =>
                                  item.promotionType.toUpperCase() ===
                                  "ROULETTE"
                              )[0]
                            }
                          ></PromotionRoulette>
                        )}
                    </RouletteFloatingPanel>
                  )}

                <Footer target={"_blank"}></Footer>
              </>
            );
          }
        })()}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },

    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),

    getBankCardList: () => dispatch(walletAction.getBankCardList()),

    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),

    getSiteToken: () => dispatch(generalAction.getSiteToken()),

    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
    getMarquee: (language) => {
      dispatch(uiAction.getMarquee(language));
    },
    getAnnouncement: (language) => {
      dispatch(uiAction.getAnnouncement(language));
    },
    getBrandLanguage: () => dispatch(generalAction.getBrandLanguage()),
    getBrand: () => dispatch(generalAction.getBrand()),
    getBanner: () => {
      dispatch(generalAction.getBanner());
    },
    getLiveChatURL: () => dispatch(generalAction.getLiveChatURL()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    //TODO: Revert the 4th param to true after testing.
    getPromotionList: (language) =>
      dispatch(
        generalAction.getPromotionList(language, 1, 99, false, "", true)
      ),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    getPromotion: () => dispatch(generalAction.getPromotion()),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
    getAffiliateStatus: () => dispatch(generalAction.getAffiliateStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(App)));
