import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import { AccountService } from "../../../api-services/services/AccountService";

import Textbox from "../../Wap/Share/Textbox";
import TextboxWithButton from "../../Wap/Share/TextboxWithButton";
import Button from "../../Wap/Share/Button";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";

const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;

  background-color: #ffffff;
`;
const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: #000;
  font-size: 30px;
  background-color: #fff;
  border-radius: 16px;
`;
const CustomInput = styled.input`
  height: 50px;
  width: 405px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 8px;
  padding: 16px 32px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;

const CustomText = styled.div`
  width: 700px;
  height: 170px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div``;

class ForgotPassword extends Component {
  state = {
    email: "",
    code: "",
    step: 1,
    countdownToken: 0,
    loading: false,
    password: "",
    password2: "",
    securityKey: "",
    phone: "",
    areaCode: config.features.PhonePrefix,
  };
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;

    if (config.features.SMSVerification) {
      if (
        this.state.phone.length < 8 ||
        this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }
      AccountService.VerifyForgotPassword(
        "",
        this.state.areaCode,
        this.state.phone
      ).then((response) => {
        this.getCodeResponse(response);
      });
    } else {
      if (this.state.email.length > 0) {
        AccountService.VerifyForgotPassword(this.state.email).then(
          (response) => {
            this.getCodeResponse(response);
          }
        );
      } else {
        this.props.alert("", i18n.t("common.msgEnterEmail"));
      }
    }
  };

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handlePassword2Change = (e) => {
    this.setState({ ...this.state, password2: e.target.value });
  };
  getCodeResponse = (response) => {
    if (response.IsSuccess) {
      this.props.alert("", i18n.t("common.msgTokenSent"));

      this.setState({
        ...this.state,
        securityKey: response.data,
        loading: true,
      });
    } else {
      // if (response.code === 201) {
      //   this.props.alert('', i18n.t('error.ERR201'))
      // } else {
      //   this.props.alert('', response.info)
      // }
      this.props.alert("", response.info);
    }
  };
  handleNextClick = () => {
    if (this.state.step === 1) {
      if (config.features.SMSVerification) {
        if (
          this.state.phone.length < 8 ||
          this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
        ) {
          this.props.alert(
            "",
            i18n
              .t("common.noReachMin")
              .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
          );
          return;
        }
      }
      if (this.state.code.length === 6) {
        this.setState({ ...this.state, step: 2 });
      }
    } else {
      if (this.state.password !== this.state.password2) {
        this.props.alert("", i18n.t("forgotPassword.invalidConfirmPass"));
      } else {
        AccountService.ResetPassword(
          this.state.securityKey,
          this.state.code,
          this.state.password
        ).then((response) => {
          if (response.IsSuccess) {
            this.props.alert("", i18n.t("forgotPassword.updateSuccess"));
            this.props.appHistory.replace("/" + i18n.language + "/login");
          } else {
            this.props.alert("", response.info);
          }
        });
      }
    }
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
    this.props.GetSupportUrl("", "", "", "");
  };

  handleBackClick = () => {
    if (this.state.step === 2) {
      this.setState({ ...this.state, step: 1 });
    } else {
      this.props.appHistory.goBack();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("forgotPassword.title")}
        ></Header>
        <Wrapper>
          {(() => {
            if (this.state.step === 1) {
              return config.features.SMSVerification ? (
                <React.Fragment>
                  <CustomText>
                    <CustomLabel>{i18n.t("common.phoneNumber")}</CustomLabel>
                    <Container
                      style={{
                        margin: "18px 5px 0 0",
                        width: "180px",
                        float: "left",
                        padding: "10px",
                      }}
                    >
                      <SelectContainer
                        value={this.state.areaCode}
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            areaCode: e.target.value,
                          });
                        }}
                      >
                        <option value={config.features.PhonePrefix}>
                          {config.features.PhonePrefix}
                        </option>
                      </SelectContainer>
                    </Container>
                    <CustomInput
                      value={this.state.phone}
                      onChange={this.handlePhoneChange}
                      placeholder={i18n.t("common.msgEnterPhone")}
                      type={"text"}
                      maxLength={config.features.MAX_PHONE_LENGTH || 10}
                      label={i18n.t("common.msgEnterPhone")}
                    ></CustomInput>
                  </CustomText>

                  <TextboxWithButton
                    buttonlabel={i18n.t("common.msgSendToken")}
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                    placeholder={i18n.t("common.msgEnterCode")}
                    label={i18n.t("common.token")}
                    onClick={this.handleGetCodeClick}
                    type={"text"}
                  ></TextboxWithButton>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder={i18n.t("common.msgEnterEmail")}
                    type={"text"}
                    label={i18n.t("common.emailAddress")}
                  ></Textbox>
                  <TextboxWithButton
                    buttonlabel={i18n.t("common.msgSendToken")}
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                    placeholder={i18n.t("common.msgEnterCodeEmail")}
                    label={i18n.t("common.token")}
                    onClick={this.handleGetCodeClick}
                    type={"text"}
                  ></TextboxWithButton>
                </React.Fragment>
              );
            } else if (this.state.step === 2) {
              return (
                <React.Fragment>
                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    placeholder={i18n.t("wap.register.password")}
                    type={"password"}
                    label={i18n.t("common.NewPass")}
                  ></Textbox>

                  <Textbox
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.password2}
                    onChange={this.handlePassword2Change}
                    placeholder={i18n.t("common.msgEnterConfirmPass")}
                    type={"password"}
                    label={i18n.t("common.ConfirmPass")}
                  ></Textbox>
                </React.Fragment>
              );
            }
          })()}

          <Button
            style={{ margin: "40px auto 0 auto" }}
            disabled={
              this.state.step === 1
                ? (config.features.SMSVerification
                    ? this.state.phone.length < 1
                    : this.state.email.length < 1) || this.state.code.length < 6
                : this.state.password.length < 6 ||
                  this.state.password2.length < 6
            }
            label={
              this.state.step === 1
                ? i18n.t("common.nextStep")
                : i18n.t("common.confirm")
            }
            onClick={this.handleNextClick}
          ></Button>
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(withRouter(ForgotPassword));
