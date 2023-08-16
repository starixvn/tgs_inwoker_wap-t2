import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Web from "./components/App/index";
import Wap from "./components/Wap/index";
import * as serviceWorker from "./utils/serviceWorker";
import { isMobileOnly } from "react-device-detect";
import { Provider } from "react-redux";
//import store from "./store/index";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import InterceptorService from "./api-services/services/InterceptorService";
import JoinGame from "./components/Share/JoinGame";

import JoinLobbyGame from "./components/Share/JoinLobbyGame";
// import IPRestrict from "./components/App/IPRestrict";
// import CS from "./components/App/CS";
// import AboutUs from "./components/AboutUs/index";
// import GameRules from "./components/GameRules/index";
import { AppHistory } from "./history/History";
import { SnackbarProvider } from "notistack";
import styled from "styled-components";
import Config from "./config/config";
import {
  createMuiTheme,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles";
import DangerPNG from "../src/assets/images/warning.png";
import InfoPNG from "../src/assets/images/info.png";
import SuccessPNG from "../src/assets/images/success.png";
import { makeStyles } from "@material-ui/core";
import i18n from "./utils/i18n";
import rootReducer from "./api-services/reducers/rootReducer";
import JoinLotteryGame from "./components/Share/JoinLotteryGame";
import Common from "./utils/Common";
import { ThemeProvider } from "styled-components";
import { themeList } from "./theme";
import { GlobalStyles } from "./global";
import Deposit from "./components/Share/Deposit";
import FeatureGetter from "./components/Share/feature-getter";
import Maintenance from "./components/Share/Maintenance";
import config from "./config/config";

require("es6-promise").polyfill();
const store = createStore(rootReducer, applyMiddleware(thunk));
InterceptorService.setupInterceptors(store);
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: "#fff", color: "#000" },
  error: { backgroundColor: "#fff", color: "#000" },
  warning: { backgroundColor: "#fff", color: "#000" },
  info: { backgroundColor: "#fff", color: "#000" },
}));

const Dismiss = styled.a`
  margin-right: 12px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;

Config.from = isMobileOnly ? "h5" : "h5";
Config.isPC = isMobileOnly ? 1 : 0;

document.getElementById("favicon").href =
  process.env.PUBLIC_URL + `/assets/images/logo/${Config.brand}.ico`;

var fontFamily = "Tahoma, Helvetica, Arial, sans-serif";
if (i18n.language === "zh-CN") {
  fontFamily =
    "'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'";
} else if (i18n.language === "zh-TW") {
  fontFamily =
    "'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'";
} else if (i18n.language === "th-TH") {
  fontFamily = "'Sarabun', sans-serif";
}
document.getElementById("root").style.fontFamily = fontFamily;

const muiThemeMode = themeList[Config.theme] || themeList["default"];
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: muiThemeMode.primary,
      mainRgb: muiThemeMode.primaryRgb,
      contrastText: muiThemeMode.primaryText,
      mainGradient: muiThemeMode.primaryGradient,
      mainGradientRgb: muiThemeMode.primaryGradientRgb,
    },
    secondary: {
      main: muiThemeMode.secondary,
      contrastText: muiThemeMode.secondaryText,
    },
    tertiary: {
      main: muiThemeMode.tertiary,
      contrastText: muiThemeMode.tertiaryText,
    },
    type: "light",
  },
  typography: {
    //  fontFamily: "PingFangTC-Medium",

    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {
    MuiSelect: {
      root: {
        color: muiThemeMode.secondary,
      },
    },
    MuiTabs: {
      // Name of the rule
      root: {
        backgroundColor: muiThemeMode.secondary,
        height: "74px",
        overflow: "visible",
        "& .MuiTabs-indicator": {
          backgroundColor: "#FDE740",
          height: "5px",
        },
        "& .MuiTabs-indicator:before": {
          content: "'\\A'",
          borderStyle: "solid",
          borderWidth: "0 10px 10px 10px",
          borderColor: "transparent transparent #FDE740 transparent",
          position: "absolute",
          left: "50%",
          top: "-6px",
          transform: "translateX(-50%)",
        },
        "& .MuiTabs-flexContainer": {
          overflow: "visible",
        },
        "& .MuiTabs-scrollButtons": {
          display: "none",
        },
      },
    },
    MuiTab: {
      root: {
        fontSize: "24px",
        maxWidth: "375px",
        color: "#ffffff !important",
        minWidth: "210px",
        height: "64px",
        "&.Mui-selected": {
          color: "#FDE740  !important",
        },
      },
    },
  },
});
const AppWrapper = () => {
  const classes = useStyles();

  const languageDetector =
    i18n.language ||
    localStorage.getItem("i18nextLng") ||
    config.defaultLanguage;

  const [isReady, setIsReady] = React.useState(false);
  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      document.getElementById("title").innerHTML = i18n
        .t("common.title")
        .replace(/{brand}/g, Config.brandName);
      document
        .getElementById("description")
        .setAttribute(
          "content",
          i18n.t("common.title").replace(/{brand}/g, Config.brandName)
        );
    });
    i18n.on("loaded", function (options) {
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    var languages = "zh-CN|zh-TW|en-US|id-ID|th-TH|vi-VN|hi-IN|ta-IN".split("|");
    var pathname = window.location.pathname;
    var isfoundLanguage = "";
    for (var i = 0; i < languages.length; i++) {
      if (pathname.indexOf(languages[i]) >= 0) {
        isfoundLanguage = languages[i];
        break;
      }
    }
    if (isfoundLanguage != "") {
      pathname = pathname.replace("/" + isfoundLanguage, "/");
      pathname = pathname.replace("//", "/");
      window.location.href = pathname + window.location.search;
    }
  }, []);

  if (isReady) {
    return (
      <Provider store={store}>
        <FeatureGetter />
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={muiThemeMode}>
              <GlobalStyles />
              <SnackbarProvider
                classes={{
                  variantSuccess: classes.success,
                  variantError: classes.error,
                  variantWarning: classes.warning,
                  variantInfo: classes.info,
                }}
                iconVariant={{
                  success: <Icon src={SuccessPNG}></Icon>,
                  error: <Icon src={DangerPNG}></Icon>,
                  warning: <Icon src={DangerPNG}></Icon>,
                  info: <Icon src={InfoPNG}></Icon>,
                }}
                action={(key) => (
                  <Dismiss onClick={onClickDismiss(key)}>x</Dismiss>
                )}
                maxSnack={3}
                autoHideDuration={1000}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                ref={notistackRef}
              >
                <Router history={AppHistory}>
                  <Switch>
                    <Route
                      exact
                      path={
                        "/deposit/:paymentcode/:methodcode/:channelid/:amount/:promotion/:name:account?"
                      }
                      component={Deposit}
                    />
                    <Route
                      exact
                      path={"/joingame/:type/:params/:params2?"}
                      component={JoinGame}
                    />
                    <Route
                      exact
                      path={"/joinlottery/:brand"}
                      component={JoinLotteryGame}
                    />
                    <Route
                      exact
                      path={"/joinlobbygame/:type/:params/:replaceUrl?"}
                      component={JoinLobbyGame}
                    />
                    {(() => {
                      if (!isMobileOnly) {
                        return (
                          <Route
                            exact
                            path={"/maintenance"}
                            render={(props) => <Maintenance />}
                          />
                        );
                      }
                    })()}
                    <Route
                      path={"/"}
                      render={(props) => (isMobileOnly ? <Wap /> : <Web />)}
                    />
                    <Redirect to={`/`} />
                  </Switch>
                </Router>
              </SnackbarProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

ReactDOM.render(<AppWrapper></AppWrapper>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
