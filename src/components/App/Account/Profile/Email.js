import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CustomButton from "../../../Share/Button";
import IconInputEmailPNG from "../../../../assets/images/icon-input-email.png";
import IconInputVerifyCodePNG from "../../../../assets/images/icon-input-verifycode.png";
import { withSnackbar } from "notistack";
import { AccountService } from "../../../../api-services/services/AccountService";
import { accountAction } from "../../../../api-services/actions/accountAction";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import { Link } from "react-router-dom";
import config from "../../../../config/config";
import { AppHistory } from "../../../../history/History";
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 90px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
const CustomText = withStyles({
  root: {
    marginTop: "10px",
    float: "left",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      color: "#b6b6b6",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);
const Container = styled.div``;

const StyleButton = styled.div`
  width: 130px;
  height: 44px;
  border: solid 1px #b6b6b6;
  margin: 0;
  margin-top: 10px;
  margin-left: 5px;
  float: left;

  ${(props) =>
    props.disable === true
      ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
      : `  background-image: linear-gradient(to top, #f0ca83, #f0ca83);
`}

  border-radius: 5px;
  font-size: ${(props)=> i18n.language === "ta-IN" ? "12px" : "16px"};
  color: #fff;

  &:hover {
    cursor: pointer;

    ${(props) =>
      props.disable === true
        ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
        : `      background-blend-mode: screen, normal;
        box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);
        }
  `}
  }
`;
const ButtonLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: ${(props)=> i18n.language === "ta-IN" ? "5px" : "10px"};
`;
const Message = styled.div`
  color: red;
  float: left;
  font-size: 13px;
  margin: 10px 0 0 0;
  width: 100%;
  text-align: left;
`;
class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNew:
        this.props.email === "" || this.props.email === null ? true : false,
      step: 1,
      message:
        this.props.email === ""
          ? "请放心，我们不会泄露任何用户信息，以及发送骚扰信息。"
          : "",
      email: this.props.email,
      code: "",
      countdown: 0,
      securityKey: "",
    };
  }

  timer = null;
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  onhandleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  onhandleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  onhandleGetCodeClick = () => {
    if (this.state.countdown <= 0) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.state.email
        ) === false
      ) {
        this.props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "error",
        });
        return;
      }
      AccountService.VerifyEmail(this.state.email).then((response) => {
        if (response.IsSuccess) {
          this.setState({
            securityKey: response.data,
          });
          this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
            variant: "info",
          });
          this.setState({ ...this.state, countdown: 60 });
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(response.info),
            {
              variant: "error",
            }
          );
          // if (response.code === 402) {
          //   this.props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          //     variant: "error",
          //   });
          // } else {
          //   this.props.enqueueSnackbar(response.info, {
          //     variant: "error",
          //   });
          // }
        }

        this.checkCountdown();
      });
    }
  };
  checkCountdown = () => {
    if (this.state.countdown > 0) {
      this.timer = setTimeout(() => {
        this.setState({ ...this.state, countdown: this.state.countdown - 1 });
        this.checkCountdown();
      }, 1000);
    }
  };
  onhandleClick = () => {
    if (
      config.features.Register_CustomFlow_IDR &&
      !this.props.account.registercompleted
    ) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.state.email
        ) === false
      ) {
        this.props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "error",
        });
        return;
      }
      this.props
        .newRegister("InitMail", {
          input: "Init",
          data: {
            email: this.state.email,
          },
        })
        .then(async (response) => {
          if (response.IsSuccess) {
            this.props
              .newRegister("InitMail", {
                input: "Valid",
                data: {
                  securitykey: response.data.stepResponse,
                  validatecode: "123456",
                },
              })
              .then(async (response) => {
                if (response.IsSuccess) {
                  this.props.getAccountInfo().then(async (response) => {
                    if (
                      !response.data.bankinfoauthentication &&
                      !response.data.registercompleted
                    ) {
                      AppHistory.push("/account/withdrawal?do=addCard");
                    }
                  });
                } else {
                  this.props.enqueueSnackbar(
                    ErrorSwitcher.getTranslation(response.info),
                    {
                      variant: "error",
                    }
                  );
                }
              });
          } else {
            this.props.enqueueSnackbar(
              ErrorSwitcher.getTranslation(response.info),
              {
                variant: "error",
              }
            );
          }
        });
    } else {
      if (this.state.code.length < 6) {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
          variant: "error",
        });
        return;
      }
      AccountService.UpdateEmail(this.state.securityKey, this.state.code).then(
        (response) => {
          if (response.IsSuccess) {
            this.props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
              variant: "info",
            });
            if (this.state.isNew || this.state.step === 2) {
              this.props.getAccountInfo();
              this.props.handleCloseDialog();
            } else {
              this.setState({
                ...this.state,
                code: "",
                securityKey: "",
                email: "",
                step: 2,
                message: i18n.t("common.msgTokenVerified"),
                countdown: 0,
              });
            }
          } else {
            this.props.enqueueSnackbar(
              ErrorSwitcher.getTranslation(response.info),
              {
                variant: "error",
              }
            );
            // if (response.code === 405) {
            //   this.props.enqueueSnackbar(i18n.t("common.msgInvalidPhoneCode"), {
            //     variant: "error",
            //   });
            // } else if (response.code === 900) {
            //   this.props.enqueueSnackbar(i18n.t("common.msgEmailExist"), {
            //     variant: "error",
            //   });
            // } else {
            //   this.props.enqueueSnackbar(response.info, {
            //     variant: "error",
            //   });
            // }
          }
        }
      );
    }
  };

  render() {
    var ifNotEmpty = this.props.email !== "" && this.props.email !== null;
    return (
      <Container>
        <CustomText
          placeholder={i18n.t("common.msgEnterEmail")}
          adornment={IconInputEmailPNG}
          onChange={this.onhandleEmailChange}
          inputProps={{
            maxLength: 50,
          }}
          style={{
            width: "340px",
            height: "46px",
          }}
          value={this.state.email}
          variant="outlined"
          autoComplete="off"
          disabled={this.state.isNew === false && this.state.step === 1}
        ></CustomText>
        {!(
          config.features.Register_CustomFlow_IDR &&
          !this.props.account.registercompleted
        ) &&
          !(
            ifNotEmpty &&
            (config.features.ChangesNotAllowed ||
              config.features.Profile_ExistingDetails_ViewOnly)
          ) && (
            <>
              <CustomText
                placeholder={i18n.t("common.msgEnterCode")}
                adornment={IconInputVerifyCodePNG}
                onChange={this.onhandleCodeChange}
                value={this.state.code}
                style={{
                  width: "210px",
                  height: "46px",
                }}
                variant="outlined"
                autoComplete="off"
                type={"text"}
              ></CustomText>
              <StyleButton
                onClick={this.onhandleGetCodeClick}
                disable={this.state.countdown > 0}
              >
                <ButtonLabel>
                  {this.state.countdown <= 0
                    ? i18n.t("common.msgSendToken")
                    : i18n.t("common.btnTokenResendLabel") +
                      "(" +
                      this.state.countdown +
                      "s)"}
                </ButtonLabel>
              </StyleButton>
              <Message>{this.state.message}</Message>
            </>
          )}

        {ifNotEmpty &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly) && (
            <Content>
              {i18n.t("profile.email.toEdit")}
              {
                <LabelLink
                  onClick={() =>
                    this.props.handleCSClick(
                      this.props.account.info.member_username,
                      this.props.account.info.member_username
                    )
                  }
                >
                  {i18n.t("common.customerService")}
                </LabelLink>
              }
            </Content>
          )}

        {!(
          ifNotEmpty &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) && (
          <CustomButton
            name={
              this.props.isForWithdrawalPassword
                ? i18n.t("common.nextStep")
                : i18n.t("common.submit")
            }
            handleClick={this.onhandleClick}
            marginTop={15}
          ></CustomButton>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    dispatchFunction: (json) => dispatch(json),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Address));
