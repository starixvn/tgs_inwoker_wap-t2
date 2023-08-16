import React, { Component } from "react";

import { connect } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router";
import { AppHistory } from "../../history/History";
import { withRouter } from "react-router-dom";

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

import config from "../../config/config";

// import NameVerification from "./Card/NameVerification";
// import PassSetting from "./Card/PassSetting";

import ErrorSwitcher from "../../utils/ErrorSwitcher";

// import CustomerService from "./CustomerService/index";

import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import styled from "styled-components";
import i18n from "../../utils/i18n";
import BlowFishEncryption from "../../utils/BlowFishEncryption";
import Common from "../../utils/Common";
import PopupAnnouncement from "../Share/PopupAnnouncement";
import Login from "./Login/index";
import Main from "./Main/index";
import Profile from "./Profile/index";
import NameVerify from "./Profile/id-verification";
import WeChat from "./Profile/WeChat";
import QQ from "./Profile/QQ";
import FacebookMessenger from "./Profile/FacebookMessenger";
import Telegram from "./Profile/Telegram";
import Line from "./Profile/Line";
import Viber from "./Profile/Viber";
import Whatsapp from "./Profile/Whatsapp";
import Email from "./Profile/Email";
import ChangeEmail from "./Profile/ChangeEmail";
import ChangePhone from "./Profile/ChangePhone";
import Phone from "./Profile/Phone";
import ChangePassword from "./Profile/ChangePassword";
import WithdrawalPassword from "./Profile/WithdrawalPassword";
import ChangeWithdrawalPassword from "./Profile/ChangeWithdrawalPassword";
import ResetWithdrawalPassword from "./Profile/ResetWithdrawalPassword";
import Slot from "./Slot";
import Promotion from "./Promotion/index";
import PromotionDetails from "./Promotion/Details";

import Inbox from "./Inbox/index";
import InboxDetails from "./Inbox/Details";
import Transfer from "./Transfer/index";
import Withdrawal from "./Withdrawal/index";

import WithdrawalDetails from "./Withdrawal/Details";
import Deposit from "./Deposit/index";
import DepositPayment from "./Deposit/Payment";
import DepositDetails from "./Deposit/Details";
import DepositManual from "./Deposit/Manual";
import Card from "./Card/index";
import AddCard from "./Card/AddCard";
import Report from "./Report/index";
import ForgotPassword from "./ForgotPassword/index";
import SettingLanguage from "./Setting/Language";
import CustomerServiceChat from "./CustomerService/index";
import Maintenance from "./Maintenance";
import VIP from "./VIP";
import Banned from "./Banned";
import Loading from "./Share/Loading";
import Affiliate from "./Affiliate";
import Birthdate from "./Profile/Birthdate";
import CustomSportPage from "./CustomSportPage";
import ForcedVerification from "./ForcedVerification";
import LiveChat from "../Share/live-chat";

const baseRouteUrl = Common.baseRouteUrl;

const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "500px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 20px 45px;
  color: #4a4a4a;
`;
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;
const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;
const ButtonCancel = styled(ButtonConfirm)``;
const RouteMapping = [
  {
    path: "/",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/main",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/main/:page",
    component: Main,
    alert: true,
    popup: true,
    navigate: true,
  },
  {
    path: "/login",
    component: Login,
    alert: true,
  },
  {
    path: "/a/:promotionid",
    component: Login,
    alert: true,
  },
  {
    path: "/t/:promotionid",
    component: Login,
    alert: true,
  },
  {
    path: "/f/:promotionid",
    component: Login,
    alert: true,
  },
  {
    path: "/p/:playername",
    component: Login,
    alert: true,
  },
  {
    path: "/register&visitor_id=:subid",
    component: Login,
    alert: true,
  },
  {
    path: "/profile",
    component: Profile,
    alert: true,
  },
  {
    path: "/profile/name",
    component: NameVerify,
    alert: true,
  },
  {
    path: "/profile/wechat",
    component: WeChat,
    alert: true,
  },
  {
    path: "/profile/birthdate",
    component: Birthdate,
    alert: true,
  },
  {
    path: "/profile/qq",
    component: QQ,
    alert: true,
  },
  {
    path: "/profile/fb",
    component: FacebookMessenger,
    alert: true,
  },
  {
    path: "/profile/telegram",
    component: Telegram,
    alert: true,
  },
  {
    path: "/profile/line",
    component: Line,
    alert: true,
  },
  {
    path: "/profile/viber",
    component: Viber,
    alert: true,
  },
  {
    path: "/profile/whatsapp",
    component: Whatsapp,
    alert: true,
  },
  {
    path: "/profile/email",
    component: Email,
    alert: true,
  },
  {
    path: "/profile/changeemail",
    component: ChangeEmail,
    alert: true,
  },
  {
    path: "/profile/changephone",
    component: ChangePhone,
    alert: true,
  },
  {
    path: "/profile/phone",
    component: Phone,
    alert: true,
  },
  {
    path: "/profile/changepassword",
    component: ChangePassword,
    alert: true,
  },
  {
    path: "/profile/withdrawalpassword",
    component: WithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/resetwithdrawalpassword",
    component: ResetWithdrawalPassword,
    alert: true,
  },
  {
    path: "/profile/changewithdrawalpassword",
    component: ChangeWithdrawalPassword,
    alert: true,
  },

  {
    path: "/slots/:platform?/:type?",
    component: Slot,
    alert: true,
    navigate: true,
  },
  {
    path: "/promotion-list",
    component: Promotion,
    alert: true,
    navigate: true,
  },
  {
    path: "/promotion/:id?",
    component: PromotionDetails,
    alert: true,
    navigate: true,
    promoProps: true,
  },

  {
    path: "/inbox",
    component: Inbox,
    alert: true,
    navigate: true,
  },
  {
    path: "/inbox/details/:id",
    component: InboxDetails,
    alert: true,
    navigate: true,
    screenHeight: true,
  },
  !config.features.NewTransferUI && {
    path: "/transfer",
    component: Transfer,
    alert: true,
    navigate: true,
  },
  {
    path: "/withdrawal",
    component: Withdrawal,
    alert: true,
    navigate: true,
  },
  {
    path: "/withdrawal/details",
    component: WithdrawalDetails,
    alert: true,
    navigate: true,
  },

  {
    path: "/deposit/:promotionid?",
    component: Deposit,
    alert: true,
    navigate: true,
  },
  {
    path: "/manual/:paymentId?",
    component: Deposit,
    alert: true,
    navigate: true,
  },
  {
    path: "/deposit/payment/:id/:bank/:amount/:bonus?",
    component: DepositPayment,
    alert: true,
    navigate: true,
  },
  {
    path: "/deposit/details",
    component: DepositDetails,
    alert: true,
  },
  {
    path: "/deposit/manual",
    component: DepositManual,
    alert: true,
  },
  {
    path: "/card",
    component: Card,
    alert: true,
    navigate: true,
  },
  {
    path: "/card/add",
    component: AddCard,
    alert: true,
    navigate: true,
  },
  {
    path: "/maintenance",
    component: Maintenance,
    navigate: true,
    alert: true,
    GetSupportUrl: true,
    brandComm: true,
  },
  // {
  //   path: "/card/name",
  //   component: NameVerification,
  //   alert: true,
  //   navigate: true,
  // },
  // {
  //   path: "/card/pass",
  //   component: PassSetting,
  //   alert: true,
  //   navigate: true,
  // },

  {
    path: "/report/:tab?",
    component: Report,
    alert: true,
    navigate: true,
  },
  // {
  //   path: "/customer-service",
  //   component: CustomerService,
  //   alert: true,
  //   navigate: true,
  //   popup: true,
  // },
  {
    path: "/chat/:userid?/:name?/:question?",
    component: CustomerServiceChat,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    alert: true,
  },
  // {
  //   path: "/forgot-password/option",
  //   component: ForgotPasswordStep2,
  //   alert: true,
  // },
  // {
  //   path: "/forgot-password/reset",
  //   component: ForgotPasswordReset,
  //   alert: true,
  // },

  {
    path: "/affiliate",
    component: Affiliate,
    navigate: true,
  },
  //{
  //  path: "/affiliate/member",
  //  component: AffiliateMember,
  //  screenHeight: true,
  //},
  //{
  //  path: "/affiliate/report",
  //  component: AffiliateReport,
  //  screenHeight: true,
  //},
  //{
  //  path: "/affiliate/guide",
  //  component: AffiliateGuide,
  //  screenHeight: true,
  //},
  {
    path: "/setting/language",
    component: SettingLanguage,
    screenHeight: true,
  },
  {
    path: "/banned",
    component: Banned,
    navigate: true,
  },
  {
    path: "/vip",
    component: VIP,
    navigate: true,
  },
  {
    path: "/sports/:platform",
    component: CustomSportPage,
    alert: true,
    navigate: true,
  },
];
class Wap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCS: false,
      isIpRestrict: false,
      open: false,
      openPopup: false,
      popupUrl: "",
      title: "",
      message: "",
      loading: true,
      openAnnouncement: false,
      showPromotion: false,
      action: "",
    };
  }

  GetSupportUrl = (userid, name, question, email) => {
    if (config.features.LiveChatVendor.brand === "zendesk") {
      window.zE("webWidget", "open");
      return;
    } else if (config.features.LiveChatVendor.brand === "livechat") {
      window.LiveChatWidget.call("maximize");
      return;
    }
    var newURL = this.props.general.livechat
      ? this.props.general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (newURL.length) {
      window.open(newURL, "_blank");
    } else {
    }
  };
  updateScreenSize = () => {
    var w = window.screen.width;
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    const scale = w / 750;

    this.props.updateScreenSize(w, h, scale);
  };
  async componentDidMount() {
    Common.loadScript("/js/config.js", () => {
      Common.loadScript("/js/iovation.js", () => {});
    });

    const urlpath = this.props.location.pathname.split("/");

    if (urlpath.length === 4) {
      if (urlpath[2] === "a") {
        localStorage.setItem("promotionId", urlpath[3] || "");
        localStorage.setItem("upper", ""); //reset
        localStorage.setItem("invitationtype", "a");
      }
      if (urlpath[2] === "p") {
        localStorage.setItem("upper", urlpath[3] || "");
        localStorage.setItem("promotionId", ""); //reset
        localStorage.setItem("invitationtype", "p");
      }
    } else {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", ""); //reset
      localStorage.setItem("promotionId", ""); //reset
    }

    window.addEventListener("resize", () => {
      this.updateScreenSize();
    });

    // const response = await GeneralService.CheckIPRestrict();

    // if (response.code === 50000) {
    //   AppHistory.replace({
    //     pathname: "/" + i18n.language + "/ip-restrict-mobile",
    //     search: "?query=error",
    //     state: { ip: response.data.ip },
    //   });
    //   this.setState({ ...this.state, isIpRestrict: true, loading: false });
    // } else {
    if (this.props.general.token == "") {
      this.props.getSiteToken();
    } else {
      this.props.getBrandLanguage();
      this.props.getMarquee(i18n.language);
      this.props.getAnnouncement(i18n.language);
      this.props.getBanner();
      this.props.getBrand();
      this.props.getBrandCommunicationList();
      this.props.getLiveChatURL();
      this.props.getPromotion();
      this.props.getDepositMethod();
      this.props.getWithdrawalChannel();
      this.props.getAffiliateStatus();
    }

    // this.props.getMobilePrefix();
    //this.props.getMarquee();
    // this.props.getBanner();
    // this.props.getBankList();
    //this.props.getHomePageGameList();
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
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
          localStorage.removeItem("token1");
          break;
        case "login_token":
          const decryptedToken = BlowFishEncryption.Decrypt(
            urlParams.get("token")
          );

          localStorage.setItem("token1", decryptedToken);
          AppHistory.replace("/");
          break;
        default:
          return "";
      }
    }
    const localStorageToken = localStorage.getItem("token1");
    if (
      localStorageToken != null &&
      this.props.account.token == null &&
      this.props.account.info.token === ""
    ) {
      const responseToken = await this.props.checkTokenIsValid(
        localStorageToken
      );
      if (responseToken.IsSuccess) {
        // document
        //   .getElementById("ioBB")
        //   .parentNode.removeChild(document.getElementById("ioBB"));
        // this.props.checkGame();
        var bankInfoAuthentication = null;
        var isPhoneNull = null;
        var isEmailNull = null;
        var isRegisterCompleted = null;
        await this.props.getAccountProfile(true).then((response) => {
          bankInfoAuthentication = response.data.bankinfoauthentication;
          isPhoneNull = response.data.phone === null;
          isEmailNull = response.data.email === null;
          isRegisterCompleted = response.data.registercompleted;
        });
        if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
          this.setState({ ...this.state, loading: false });
          if (isPhoneNull) {
            this.props.history.push({
              pathname: "/" + i18n.language + "/profile/phone",
              state: { forced: true },
            });
          } else if (isEmailNull) {
            this.props.history.push({
              pathname: "/" + i18n.language + "/profile/email",
              state: { forced: true },
            });
          } else if (!isRegisterCompleted) {
            this.props.history.push("/" + i18n.language + "/card/add");
          }
          return;
        }
        // const responseVIP = await this.props.getVIPInfo(
        //   responseToken.data.token
        // );
        this.props.getBalanceList();
        this.props.game.providerList
          .filter((item) => item.status === 0 && item.transferwallet === true)
          .filter(
            (item) =>
              item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
          )
          .map((a) => {
            this.props.getGameBalance(a.abbreviation);
          });
        this.props.getMessageList(i18n.language, 1, 99);
        this.props.getBankCardList();
        this.props.getAutoTransferStatus();
        this.props.getDepositMethod();
        this.props.getWithdrawalChannel();
        this.props.getPromotionRouletteCount();
        // this.props.getIDCardNo();
        //this.props.getDepositChannel();

        // this.props.getInviteLink();
      }
    }
    this.setState({ ...this.state, loading: false });
    //}
    window.addEventListener("focus", this.onFocus);
    // let GAScript = `<script  async  src="https://www.googletagmanager.com/gtag/js?id=UA-156359717-1"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag() {
    //     dataLayer.push(arguments);
    //   }
    //   gtag("js", new Date());

    //   gtag("config", "UA-156359717-1");
    // </script>`;

    // if (process.env.REACT_APP_CUSTOM_NODE_ENV != "development") {
    //   var e = document.createElement("div");
    //   e.innerHTML = GAScript;
    //   document.body.appendChild(e);
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.onFocus);
  }
  onFocus = () => {
    if (this.props.account.token !== null) {
      this.props.getBalanceList();
    }
  };
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
        isInHomePage &&
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

    if (preProps.general.token !== this.props.general.token) {
      if (this.props.general.token == null || this.props.general.token == "") {
        this.props.getSiteToken();
      } else {
        localStorage.setItem("client-token", this.props.general.token);
        //this.props.getMarquee(i18n.language);

        GeneralService.GetLocalization().then((response) => {
          if (response.IsSuccess) {
            ErrorSwitcher.setTranslation(response.data);
          }
        });
        this.props.getHomePageGameList();
        this.props.getBrandLanguage();
        this.props.getMarquee(i18n.language);
        this.props.getAnnouncement(i18n.language);
        this.props.getBanner();
        this.props.getBrand();
        this.props.getBrandCommunicationList();
        this.props.getLiveChatURL();
        this.props.getPromotion();
        this.props.getAffiliateStatus();
      }
    }
    if (
      preProps.account.token !== this.props.account.token &&
      (this.props.account.token === null || this.props.account.token === "")
    ) {
      this.props.getPromotion();
    }
    if (
      preProps.game.providerList.length !==
        this.props.game.providerList.length &&
      this.props.account.token !== null
    ) {
      if (
        config.features.ForceRedirectAddCard &&
        !this.props.account.info.bankInfoAuthentication
      ) {
        return;
      }
      this.props.game.providerList
        .filter((item) => item.status === 0 && item.transferwallet === true)
        .filter(
          (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
        )
        .map((a) => {
          this.props.getGameBalance(a.abbreviation);
        });
    }
    // will cause blacklist issue on when registering ref:TGS-823
    // if (
    //   preProps.account.token !== this.props.account.token &&
    //   this.props.account.token !== null
    // ) {
    //   this.props.game.providerList
    //     .filter((item) => item.status === 0 && item.transferwallet === true)
    //     .map((a) => {
    //       this.props.getGameBalance(a.abbreviation);
    //     });
    // }
    if (
      preProps.general.isMaintenance !== this.props.general.isMaintenance &&
      this.props.general.isMaintenance === true
    ) {
      this.props.history.push("/" + i18n.language + "/maintenance");
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
        window.location.href = window.location.pathname.replace(
          i18n.language,
          this.props.general.brandLanguage[0].culturecode
        );
      }
    }

    if (
      preProps.account.registercompleted !==
      this.props.account.registercompleted
    ) {
      if (
        this.props.account.registercompleted === false &&
        config.features.Register_ShowPhone &&
        config.features.ForcedVerification
      ) {
        this.props.history.push({
          pathname: "/" + i18n.language + "/profile/phone",
          state: { forced: true },
        });
      }
    }
  }
  handleNavigate = (page) => {
    if (
      page.indexOf("/promotion") > -1 ||
      page.indexOf("/customer-service") > -1 ||
      page.indexOf("/main/home") > -1 ||
      page.indexOf("/slot") > -1
    ) {
      page = "/" + i18n.language + page;
    } else {
      if (this.props.account.token == null) {
        page = "/" + i18n.language + "/";
      } else {
        page = "/" + i18n.language + page;
      }
    }

    AppHistory.push(page);
  };
  handleAlert = (title, message, action) => {
    this.setState({
      ...this.state,
      title: title,
      message: message,
      open: true,
      action: action,
    });
  };
  handlePopup = (url) => {
    this.setState({
      ...this.state,
      popupUrl: url,
      openPopup: true,
    });
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
    window.open(this.state.popupUrl, "_blank");
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
  };

  render() {
    const scale = this.props.screenWidth / 750;

    const assumingAllDevicesHaveSameWidth = () => {
      // original code, don't change unless you want to make your life miserable
      // too much module being affected, so just leave it as it is
      document
        .getElementById("viewport")
        .setAttribute(
          "content",
          "width=750, initial-scale=" +
            scale +
            ", minimum-scale=" +
            scale +
            ", maximum-scale=" +
            scale +
            ", user-scalable=no"
        );
    };

    var chatWidget = window.__lc;

    if (chatWidget && typeof window.__lc) {
      function onReady(initialData) {
        if (chatWidget && window.LiveChatWidget) {
          var widgetState = window.LiveChatWidget.get("state");

          if (widgetState.visibility === "maximized") {
            document
              .getElementById("viewport")
              .setAttribute(
                "content",
                "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
              );
          } else {
            assumingAllDevicesHaveSameWidth();
          }
        }
      }

      window.LiveChatWidget.on("ready", onReady);
    } else {
      assumingAllDevicesHaveSameWidth();
    }

    if (
      (this.state.loading === true ||
        this.props.general.token === "" ||
        this.props.general.token === null) &&
      this.props.general.isMaintenance === false
    ) {
      return <Loading show={this.state.loading}></Loading>;
    } else {
      return (
        <>
          <Router history={AppHistory}>
            <Switch>
              {RouteMapping.map((row, index) => {
                let propsObj = {};
                if (row.alert === true) {
                  propsObj["alert"] = this.handleAlert;
                }
                if (row.navigate === true) {
                  propsObj["navigate"] = this.handleNavigate;
                }
                if (row.popup === true) {
                  propsObj["popup"] = this.handlePopup;
                }
                if (row.screenHeight === true) {
                  propsObj["screenHeight"] = this.props.screenHeight;
                }
                propsObj["GetSupportUrl"] = this.GetSupportUrl;
                propsObj["appHistory"] = AppHistory;
                propsObj["brandComm"] = this.props.getBrandCommunicationList;
                return (
                  <Route
                    exact
                    key={index}
                    path={baseRouteUrl + row.path}
                    render={(props) => {
                      if (row.path === "/deposit/manual") {
                        propsObj["order"] = props.location.state;
                      }
                      if (row.path === "/ip-restrict-mobile") {
                        propsObj["ip"] =
                          props.location.state != null
                            ? props.location.state.ip
                            : null;
                      }
                      if (row.path === "/promotion/:activityId?") {
                        propsObj["promo"] =
                          props.location.state != null
                            ? props.location.state.promo
                            : null;
                      }
                      if (row.path === "/deposit/details") {
                        propsObj["order"] = props.location.state;
                      }
                      if (row.path === "/withdrawal/details") {
                        propsObj["order"] =
                          props.location.state != null
                            ? props.location.state.order
                            : null;
                      }
                      if (row.path === "/chat/:userid?/:name?/:question?") {
                        propsObj["login"] =
                          props.location.state != null
                            ? props.location.state.login
                            : null;
                      }
                      if (row.path === "/forgot-password/option") {
                        propsObj["details"] =
                          props.location.state != null
                            ? props.location.state.details
                            : null;
                      }
                      if (row.path === "/forgot-password/reset") {
                        propsObj["forget_token"] =
                          props.location.state != null
                            ? props.location.state.forget_token
                            : null;
                      }
                      if (row.path === "/card/name") {
                        propsObj["from"] =
                          props.location.state != null
                            ? props.location.state.from
                            : null;
                      }
                      return (
                        <row.component
                          {...propsObj}
                          {...this.props.general}
                        ></row.component>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </Router>
          {(() => {
            const matchingpath =
              this.props.location.pathname === "/" + i18n.language ||
              this.props.location.pathname === "/" + i18n.language + "/" ||
              this.props.location.pathname ===
                "/" + i18n.language + "/main/home";
            if (
              config.features.PopupAnnouncement &&
              this.props.ui.mains &&
              this.props.ui.mains.length > 0 &&
              matchingpath
            ) {
              var row = this.props.ui.mains[0];

              return (
                <PopupAnnouncement
                  open={this.state.openAnnouncement}
                  onClose={() => {
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

          {(() => {
            if (
              config.features.LiveChatVendor.brand &&
              config.features.LiveChatVendor.license
            ) {
              return (
                <LiveChat
                  license={config.features.LiveChatVendor.license}
                  vendor={config.features.LiveChatVendor.brand}
                  group={
                    config.features.LiveChatVendor.group
                      ? config.features.LiveChatVendor.group
                      : 0
                  }
                />
              );
            }
          })()}

          {config.features.SMSVerification &&
            this.props.account.registercompleted === false &&
            config.features.ForcedVerification && (
              <>
                <ForcedVerification
                  forcedverify={true}
                  alert={this.handleAlert}
                />
              </>
            )}

          <StyledModal onClose={this.handleClose} open={this.state.open}>
            <DialoTitle>{this.state.title}</DialoTitle>
            <DialoMessage>{this.state.message}</DialoMessage>
            {(() => {
              if (this.state.message === "无法连接，请检查您的网络") {
                return (
                  <ButtonConfirm onClick={() => window.location.reload()}>
                    {i18n.t("common.reload")}
                  </ButtonConfirm>
                );
              } else {
                return (
                  <div>
                    <ButtonConfirm
                      onClick={() =>
                        this.setState({ ...this.state, open: false })
                      }
                    >
                      {i18n.t("common.confirm")}
                    </ButtonConfirm>
                    {this.state.action && (
                      <div
                        onClick={() =>
                          this.setState({ ...this.state, open: false })
                        }
                      >
                        {this.state.action}
                      </div>
                    )}
                  </div>
                );
              }
            })()}
          </StyledModal>
          <StyledModalPopup
            onClose={this.handleClosePopup}
            open={this.state.openPopup}
          >
            <DialoMessage>{i18n.t("common.msgPopupBlocker")}</DialoMessage>
            <ButtonCancel
              onClick={this.handleOpenPopupUrl}
              style={{ float: "left" }}
            >
              {i18n.t("common.confirm")}
            </ButtonCancel>
            <ButtonCancel
              onClick={this.handleClosePopup}
              style={{ float: "right" }}
            >
              {i18n.t("common.cancel")}
            </ButtonCancel>
          </StyledModalPopup>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
    ui: state.ui,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateScreenSize: (width, height) => {
      dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },

    getAccountProfile: (showVip) =>
      dispatch(accountAction.getAccountProfile(showVip)),
    // checkGame: () => dispatch(accountAction.checkGame()),
    getMobilePrefix: () => dispatch(generalAction.getMobilePrefix()),
    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getBrand: () => dispatch(generalAction.getBrand()),
    // getBanner: () => dispatch(uiAction.getBanner()),
    // getBankList: () => dispatch(walletAction.getBankList()),
    // getDepositChannel: () => dispatch(walletAction.getDepositChannel()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    // getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getSiteToken: () => dispatch(generalAction.getSiteToken()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
    getBrandLanguage: () => dispatch(generalAction.getBrandLanguage()),

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
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getPromotion: () => dispatch(generalAction.getPromotion()),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
    getAffiliateStatus: () => dispatch(generalAction.getAffiliateStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wap));
