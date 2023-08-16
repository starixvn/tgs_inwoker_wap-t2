import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import Button from "../../Wap/Share/Button";
import i18n from "../../../utils/i18n";
import Step from "../Share/Step";

class ResetResetWithdrawalPassword extends Component {
  state = {
    selectedTab: 0,
    answer: "",
    phone: "",
    username: "",
    sessionId: "",
    email: "",
    code: "",
    step: 1,
    countdownToken: 0,
    password: "",
    confirmPassword: "",
    securityKey: "",
    getCodeClicked: false,
  };
  componentDidMount() {}

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleConfirmPassword = (e) => {
    this.setState({ ...this.state, confirmPassword: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 1) return;

    AccountService.GetChangeWithdrawalPasswordVerificationCode().then(
      (response) => {
        this.getCodeResponse(response);
      }
    );
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.setState({
        securityKey: response.data,
        countdownToken: 60,
        getCodeClicked: true,
      });
      this.showInfoMessage(i18n.t("common.msgTokenSent"));
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.showInfoMessage(response.info);
    }
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleNextClick = () => {
    if (this.state.code !== "") {
      this.setState({ ...this.state, step: 2 });
    }
  };
  handleBackClick = () => {
    if (this.state.code !== "") {
      this.setState({ ...this.state, step: 1 });
    }
  };
  handleSubmitClicked = (e) => {
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    if (password !== confirmPassword) {
      this.props.alert("", i18n.t("common.msgInvalidConfirmPass"));
      return;
    }
    AccountService.ChangeWithdrawalPassword(
      password,
      this.state.code,
      this.state.securityKey
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.alert(
          "",
          i18n.t("profile.resetResetWithdrawalPassword.resetSuccess")
        );
        this.props.appHistory.goBack();
      } else {
        this.props.alert("", response.info);
        // if (response.code === 405) {
        //   this.props.alert('', i18n.t('common.msgInvalidPhoneCode'))
        // } else {
        //   this.props.alert('', response.info)
        // }
      }
    });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   variant: "info"
    // });
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   variant: "error"
    // });
  };
  checkCountdown = () => {
    if (this.state.countdownToken > 0) {
      this.timer = setTimeout(() => {
        this.setState({
          ...this.state,
          countdownToken: this.state.countdownToken - 1,
        });
        this.checkCountdown();
      }, 1000);
    }
  };
  handleCSClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/chat");
  };
  render() {
    return (
      <React.Fragment>
        <Step
          steps={[
            {
              label: i18n.t(
                "profile.resetResetWithdrawalPassword.verifiedEmail"
              ),
            },
            { label: i18n.t("common.reset") },
          ]}
          currentStep={this.state.step}
        ></Step>
        {this.state.step === 1 ? (
          <React.Fragment>
            <Textbox
              style={{ margin: "100px auto 20px auto" }}
              value={this.props.account.info.member_email}
              placeholder={i18n.t("common.msgEnterEmail")}
              type={"text"}
              disabled={true}
              label={i18n.t("common.emailAddress")}
            ></Textbox>
            <TextboxWithButton
              buttonlabel={
                this.state.countdownToken <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    this.state.countdownToken +
                    "s)"
              }
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.code}
              onChange={this.handleCodeChange}
              placeholder={i18n.t("common.msgEnterEmailCode")}
              label={i18n.t("common.token")}
              onClick={this.handleGetCodeClick}
              maxLength={6}
              type={"text"}
            ></TextboxWithButton>
            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.nextStep")}
              onClick={this.handleNextClick}
              disabled={
                !this.state.getCodeClicked || this.state.code.length < 6
              }
            ></Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Textbox
              type={"password"}
              style={{ margin: "100px auto 20px auto" }}
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder={i18n.t("common.msgEnterNewPass")}
              label={i18n.t("common.NewPass")}
            ></Textbox>
            <Textbox
              type={"password"}
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPassword}
              placeholder={i18n.t("common.msgEnterConfirmPass")}
              label={i18n.t("common.ConfirmPass")}
            ></Textbox>

            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.submit")}
              onClick={this.handleSubmitClicked}
            ></Button>
            <Button
              style={{ margin: "20px auto 0 auto" }}
              label={i18n.t("common.back")}
              onClick={this.handleBackClick}
            ></Button>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetResetWithdrawalPassword));
