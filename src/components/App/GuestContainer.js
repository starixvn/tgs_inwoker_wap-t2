import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Login from "./Login";
import { AppHistory } from "../../history/History";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import Activation from "./Activation";
import ResetPassword from "./ResetPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import config from "../../config/config";
import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { gameAction } from "../../api-services/actions/gameAction";
import { inboxAction } from "../../api-services/actions/inboxAction";
import { generalAction } from "../../api-services/actions/generalAction";
import { AccountService } from "../../api-services/services/AccountService";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";

import Register from "./Register";
import { withSnackbar } from "notistack";
import ForgotPasswordPhone from "./ForgotPasswordPhone";
import i18n from "../../utils/i18n";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
const Container = styled.div``;
const BtnLoginRegister = styled.div`
  float: right;
  font-size: 17px;
  text-align: center;
  color: #f6f6f6;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  height: 29px;
  margin-left: 5px;

  padding: 0px 10px;
`;
const BtnRegister = styled(BtnLoginRegister)`
  background-color: #c7a87c;
  color: #6d5d41;

  &:hover {
    color: #fdf8f0;
    cursor: pointer;
  }
`;

const BtnLogin = styled(BtnLoginRegister)`
  background-color: transparent;
  color: #c7a87c;
  border-width: 2px;
  border-style: solid;
  border-color: #c7a87c;
  height: 29px;
  &:hover {
    color: #8a7f73;
    cursor: pointer;
  }
`;

const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);

class GuestContainer extends Component {
  state = {
    openDialog: false,
    openDialogName: "",
    forgotToken: "",
    emailCheck: -1,
    phoneCheck: -1,
    questionCheck: -1,
    openSelfControlDialog: false,
    code: "",
    phone: "",
    email: "",
    securityKey: "",
    username: "",
    pass: "",
    areaCode: config.features.PhonePrefix,
  };
  componentDidMount() {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (
      localStorage.getItem("subid") !== "" &&
      config.features.CustomBunnyAffiliate
    ) {
      this.onhandleRegister();
    }
    if (urlParams.has("do")) {
      const doValue = urlParams.get("do");
      switch (doValue) {
        case "login":
        case "login_auth":
          this.handleClickOpenDialog("login");
          break;
        case "register":
        case "register_auth":
          this.onhandleRegister();
          break;
        default:
          break;
      }
    }
  }
  componentWillUnmount() {
    this.setState({
      ...this.state,
      openDialog: false,
      openDialogName: "",
    });
    this.props.showLogin(false);
    this.props.showDialog(false);
  }
  handleClickOpenDialog = (dialogName) => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: dialogName,
    });
    this.props.onDialogChange(dialogName);
    this.props.showLogin(true);
  };

  onhandleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
    this.props.onDialogChange("");
  };

  onhandleRegister = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "register",
    });
    this.props.onDialogChange("register");
    this.props.showLogin(false);
  };
  onhandleActivation = (username = "", pass = "") => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "activation",
      username: username,
      pass: pass,
    });
    this.props.onDialogChange("activation");
    this.props.showLogin(false);
  };
  onhandleForgotPassword = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpassword",
    });

    this.props.showLogin(false);
  };

  onhandleOptionClick = (method) => {
    let dialogName = "";

    if (method === "question") {
      dialogName = "forgotpasswordsecurityquestion";
      if (this.state.questionCheck !== 1) {
        return;
      }
    } else if (method === "phone") {
      dialogName = "forgotpasswordphone";
      if (this.state.phoneCheck !== 1) {
        return;
      }
    } else if (method === "email") {
      dialogName = "forgotpasswordemail";
      if (this.state.emailCheck !== 1) {
        return;
      }
    }
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: dialogName,
    });
  };
  onhandleResetPasswordSuccessClick = () => {
    this.setState({
      ...this.state,
      openDialog: false,
      openDialogName: "",
    });
  };
  onhandleResetPasswordClick = (
    code,
    phone,
    securityKey,
    password,
    confirmPassword
  ) => {
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      this.props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    if (password !== confirmPassword) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidConfirmPass"), {
        variant: "error",
      });
      return;
    }
    AccountService.ResetPassword(securityKey, code, password).then(
      (response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            openDialog: true,
            openDialogName: "resetpasswordsuccess",
          });
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(response.info),
            {
              variant: "error",
            }
          );
        }
      }
    );
  };
  onhandleForgotPasswordBackClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpasswordoption",
    });
  };

  onhandleResetPasswordBackClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "forgotpassword",
    });
  };
  onhandleForgotPasswordPhoneClick = (code, phone, securityKey) => {
    if (code !== "") {
      this.setState({
        ...this.state,
        code: code,
        phone: phone,
        securityKey: securityKey,
        openDialog: true,
        openDialogName: "resetpassword",
      });
    }
  };

  onhandleForgotPasswordEmailClick = (code, email, securityKey) => {
    if (code !== "") {
      this.setState({
        ...this.state,
        code: code,
        email: email,
        securityKey: securityKey,
        openDialog: true,
        openDialogName: "resetpassword",
      });
    }
  };

  onhandleActivation = (username = "", pass = "") => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "activation",
      username: username,
      pass: pass,
    });
    this.props.showLogin(false);
  };

  handleLoginClick = async (username, password) => {
    if (username === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyUsername"), {
        variant: "warning",
      });
      return;
    }
    if (password === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyPassword"), {
        variant: "warning",
      });
      return;
    }
    const result = await this.props.accountLogin(username, password);

    if (result.code === 101 && result.IsSuccess === false) {
      this.props.showLogin(true);
    } else if (result.code === 210) {
      this.onhandleCloseDialog();
      AppHistory.replace("/banned");
    } else {
    }
    if (result.IsSuccess) {
      this.handleLoginSuccess(result.data);
    } else {
      this.props.enqueueSnackbar(ErrorSwitcher.getTranslation(result.info), {
        variant: "warning",
      });
    }
  };
  handleLoginClickWithHp = async (
    username,
    password,
    phone,
    setPhoneDontCareDuplicate
  ) => {
    if (username === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyUsername"), {
        variant: "warning",
      });
      return;
    }
    if (password === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyPassword"), {
        variant: "warning",
      });
      return;
    }

    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: this.state.areaCode,
            phone: phone,
          })
          .then(async (response) => {
            this.handleLoginSuccess(result.data);
          });
      } else {
        this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: this.state.areaCode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  this.handleLoginSuccess(result.data);
                });
            } else {
              this.handleLoginSuccess(result.data);
            }
          });
      }
    }
  };
  handleLoginClickWithHpEmail = async (username, password, phone, email) => {
    if (username === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyUsername"), {
        variant: "warning",
      });
      return;
    }
    if (password === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyPassword"), {
        variant: "warning",
      });
      return;
    }
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      this.props
        .newRegister("InitPhone", {
          input: "Init",
          data: {
            areacode: this.state.areaCode,
            phone: phone,
          },
        })

        .then(async (response) => {
          if (response.IsSuccess) {
            this.state.securityKey = response.data;

            AccountService.NewRegister("InitPhone", {
              input: "Valid",
              data: {
                securitykey: this.state.securityKey,
                validatecode: "123456",
              },
            });
          }
        });

      this.props
        .newRegister("InitMail", {
          input: "Init",
          data: {
            email: email,
          },
        })
        .then(async (response) => {
          if (response.IsSuccess) {
            this.state.securityKey = response.data;

            this.props.newRegister("InitMail", {
              input: "Valid",
              data: {
                securitykey: this.state.securityKey,
                validatecode: "123456",
              },
            });
          }
        });
      this.handleLoginSuccess(result.data);
    }
  };

  performLoginWithPhoneAndEmail = async (
    username,
    password,
    phone,
    email,
    setPhoneDontCareDuplicate
  ) => {
    if (username === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyUsername"), {
        variant: "warning",
      });
      return;
    }
    if (password === "") {
      this.props.enqueueSnackbar(i18n.t("web.login.errorMsg.emptyPassword"), {
        variant: "warning",
      });
      return;
    }
    const result = await this.props.accountLogin(username, password);
    if (result.IsSuccess) {
      if (setPhoneDontCareDuplicate) {
        await this.props
          .newRegister("SetPhoneDontCareDuplicate", {
            areacode: this.state.areaCode,
            phone: phone,
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              if (response.data.nextStepType === "SetEmailDontCareDuplicate")
                await this.props.newRegister("SetEmailDontCareDuplicate", {
                  email: email,
                });
            }
          });
      } else {
        await this.props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: this.state.areaCode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              await this.props
                .newRegister("InitPhone", {
                  input: "Valid",
                  data: {
                    securitykey: response.data.stepResponse,
                    validatecode: "123456",
                  },
                })
                .then(async (response) => {
                  if (response.IsSuccess) {
                    await this.props
                      .newRegister("InitMail", {
                        input: "Init",
                        data: {
                          email: email,
                        },
                      })
                      .then(async (response) => {
                        if (response.IsSuccess) {
                          await this.props.newRegister("InitMail", {
                            input: "Valid",
                            data: {
                              securitykey: response.data.stepResponse,
                              validatecode: "123456",
                            },
                          });
                        }
                      });
                  }
                });
            }
          });
      }

      this.handleLoginSuccess(result.data);
    }
  };

  handleCloseSelfControlDialog = (token) => {
    this.setState({ ...this.state, openSelfControlDialog: false });
  };
  handleLoginSuccess = async (token) => {
    let urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("return_url")) {
      // const returnValue = urlParams.get("return_url");
      // if (returnValue) {
      //   window.location.href =
      //     returnValue + "?token=" + BlowFishEncryption.Encrypt(token);
      // }
    } else {
      if (config.features.HomePage_PromoRoulette) {
        //  this.props.getPromotionRouletteStatus(
        //    "18fa2258-8101-0000-0001-0000c19227bd"
        //  );
      }
      // this.props.checkGame();
      var bankInfoAuthentication = null;
      var isPhoneNull = null;
      var isEmailNull = null;
      var isRegisterCompleted = null;

      await this.props.getAccountInfo().then((response) => {
        if (response.IsSuccess) {
          bankInfoAuthentication = response.data.bankinfoauthentication;
          isPhoneNull = response.data.phone === null;
          isEmailNull = response.data.email === null;
          isRegisterCompleted = response.data.registercompleted;
        }
      });
      if (
        !config.features.Register_CustomFlow_IDR ||
        (config.features.Register_CustomFlow_IDR && bankInfoAuthentication)
      ) {
        this.props.getBankCardList();
        this.props.getMessageList(i18n.language, 0, 99);
        this.props.getBalanceList();
        this.props.getAutoTransferStatus();
        this.props.getWithdrawalChannel();
        this.props.game.providerList
          .filter((item) => item.status === 0 && item.transferwallet === true)
          .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
          .map((a) => {
            this.props.getGameBalance(a.gpcode);
          });
        this.props.getPromotion();
        this.props.getPromotionRouletteCount();
      }
      // this.props.getIDCardNo();
      // this.props.getInviteLink();
      // this.props.getDepositChannel();

      if (
        this.state.openDialogName === "activation" ||
        this.state.openDialogName === "register" ||
        (config.features.Register_CustomFlow_IDR && !bankInfoAuthentication)
      ) {
        if (config.features.NavigateToAddCard) {
          if (isPhoneNull) {
            this.props.history.push("/account/profile/member_phone");
          } else {
            if (isEmailNull) {
              this.props.history.push("/account/profile/member_email");
            } else {
              if (!isRegisterCompleted) {
                this.props.history.push("/account/withdrawal?do=addCard");
              }
            }
          }
          // this.props.history.push(
          //    "/account/withdrawal?do=addCard"
          // );
        }
      }
    }
  };
  onhandleOnlineSupport = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
    this.props.onhandleShowCSClick();
  };
  onhandleContactUs = () => {
    this.setState({ ...this.state, openDialog: false });
    this.props.showLogin(false);
    this.props.onhandleContactUsClick();
  };
  onhandleActivation = (username = "", pass = "") => {
    this.setState({
      ...this.state,
      openDialog: true,
      openDialogName: "activation",
      username: username,
      pass: pass,
    });
    this.props.showLogin(false);
  };

  handleRegisterSuccess = (username, pass) => {
    this.onhandleActivation(username, pass);
  };
  render() {
    return (
      <Container>
        {
          //   config.features.SMSVerification && (
          //     <React.Fragment>
          //       <BtnRegister onClick={() => this.onhandleActivation()}>
          //         {i18n.t("web.register.activation")}
          //       </BtnRegister>
          //     </React.Fragment>
          //   )
        }

        <BtnRegister onClick={() => this.onhandleRegister()}>
          {i18n.t("common.register")}
        </BtnRegister>
        <BtnLogin onClick={() => this.handleClickOpenDialog("login")}>
          {i18n.t("common.login")}
        </BtnLogin>
        <StyledDialog
          open={this.state.openDialog || this.props.ui.showLogin}
          onClose={this.onhandleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          {(() => {
            if (
              this.state.openDialogName === "login" ||
              this.props.ui.showLogin === true
            ) {
              return (
                <Login
                  onhandleClose={this.onhandleCloseDialog}
                  onhandleLogin={this.onhandleLogin}
                  onhandleRegister={this.onhandleRegister}
                  onhandleForgotPassword={this.onhandleForgotPassword}
                  onhandleOnlineSupport={this.onhandleOnlineSupport}
                  onhandleContactUs={this.onhandleContactUs}
                  onhandleLoginClick={this.handleLoginClick}
                ></Login>
              );
            } else {
              if (this.state.openDialogName === "register") {
                return (
                  <Register
                    onhandleClose={this.onhandleCloseDialog}
                    onRegisterSuccess={this.handleRegisterSuccess}
                    doLogin={this.handleLoginClick}
                    doLoginWithHp={this.handleLoginClickWithHp}
                    doLoginWithHpEmail={this.performLoginWithPhoneAndEmail}
                  ></Register>
                );
              } else if (this.state.openDialogName === "activation") {
                return (
                  <Activation
                    username={this.state.username}
                    pass={this.state.pass}
                    onhandleClose={this.onhandleCloseDialog}
                    doLogin={this.handleLoginClick}
                    doLoginSuccess={this.handleLoginSuccess}
                  ></Activation>
                );
              } else if (this.state.openDialogName === "forgotpassword") {
                return config.features.EmailVerification ? (
                  <ForgotPasswordEmail
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleNextClick={this.onhandleForgotPasswordEmailClick}
                    onhandleBackClick={this.onhandleForgotPasswordBackClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                    code={this.state.code}
                    email={this.state.email}
                  ></ForgotPasswordEmail>
                ) : (
                  <ForgotPasswordPhone
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleNextClick={this.onhandleForgotPasswordPhoneClick}
                    onhandleBackClick={this.onhandleForgotPasswordBackClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                    code={this.state.code}
                    phone={this.state.phone}
                    areaCode={this.state.areaCode}
                  ></ForgotPasswordPhone>
                );
              } else if (this.state.openDialogName === "resetpassword") {
                return (
                  <ResetPassword
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleSubmitClick={this.onhandleResetPasswordClick}
                    onhandleBackClick={this.onhandleResetPasswordBackClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                    code={this.state.code}
                    phone={this.state.phone}
                    securityKey={this.state.securityKey}
                  ></ResetPassword>
                );
              } else if (this.state.openDialogName === "resetpasswordsuccess") {
                return (
                  <ResetPasswordSuccess
                    onhandleClose={this.onhandleCloseDialog}
                    onhandleSubmitClick={this.onhandleResetPasswordSuccessClick}
                    onhandleOnlineSupport={this.onhandleOnlineSupport}
                  ></ResetPasswordSuccess>
                );
              } else {
                return <></>;
              }
            }
          })()}
        </StyledDialog>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    checkGame: () => dispatch(accountAction.checkGame()),
    getAccountProfile: (showVip) =>
      dispatch(accountAction.getAccountProfile(showVip)),

    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),

    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    getInviteLink: () => dispatch(accountAction.getInviteLink()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),

    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getPromotionRouletteStatus: (id) =>
      dispatch(generalAction.getPromotionRouletteStatus(id)),
    getPromotion: () => dispatch(generalAction.getPromotion()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
  };
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    game: state.game,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withRouter(GuestContainer)));
