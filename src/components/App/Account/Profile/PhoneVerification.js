import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CustomButton from "../../../Share/Button";
import TextField from "@material-ui/core/TextField";
import IconInputVerifyCodePNG from "../../../../assets/images/icon-input-verifycode.png";
import { withStyles } from "@material-ui/core/styles";
import { AccountService } from "../../../../api-services/services/AccountService";
import { accountAction } from "../../../../api-services/actions/accountAction";
import Select from "@material-ui/core/Select";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import { withSnackbar } from "notistack";
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
const Container = styled.div``;
const StyleButton = styled.div`
  width: 140px;
  height: 44px;
  border: solid 1px #b6b6b6;
  margin: 0;
  margin-top: 10px;
  margin-left: 5px;
  float: left;

  ${(props) =>
    props.disable === true
      ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
      : `  background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);
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

const Message = styled.div`
  color: red;
  float: left;
  font-size: 13px;
  margin: 10px 0 0 0;
  width: 100%;
  text-align: left;
`;
const FormControl = styled.div`
  margin-top: 10px;
  float: left;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
    background: "#fff",
    "&.MuiSelect-root": {
      paddingTop: "14px",
      paddingBottom: "15px",
    },
  },
}))(Select);
class PhoneVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: this.props.phone,
      code: "",
      step: 1,
      isNew:
        this.props.phone === "" || this.props.phone === null ? true : false,
      message: this.props.phone === "" ? i18n.t("profile.phone.phoneDesc") : "",
      prefix: "86",
      countdown: 0,
      securityKey: "",
      areacode: config.features.PhonePrefix,
    };
  }

  timer = null;
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  onhandlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  handlePrefixChange = (e) => {
    this.setState({ ...this.state, prefix: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  onhandleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  onhandleGetCodeClick = () => {
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );

    if (!expr.test(this.state.phone)) {
      this.props.enqueueSnackbar(
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
        {
          variant: "warning",
        }
      );
      return;
    }

    if (this.state.countdown <= 0) {
      AccountService.VerifyPhone(this.state.phone, this.state.areacode).then(
        (response) => {
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
          }

          this.checkCountdown();
        }
      );
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
      (config.features.Register_CustomFlow_IDR &&
        !this.props.account.registercompleted) ||
      config.features.InitPhone_WithoutVerify
    ) {
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(this.state.phone)) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "warning",
          }
        );
        return;
      }
      this.props.getRegisterStatus().then(async (response) => {
        if (response.IsSuccess) {
          var currentStepKey = response.data;
          if (currentStepKey === "SetPhoneDontCareDuplicate") {
            await this.props
              .newRegister("SetPhoneDontCareDuplicate", {
                areacode: this.state.areacode,
                phone: this.state.phone,
              })
              .then(async (response) => {
                this.props.getAccountInfo().then(async (response) => {
                  if (
                    response.data.email === null &&
                    !response.data.registercompleted
                  ) {
                    AppHistory.push("/account/profile/member_email");
                  } else {
                    this.props.handleCloseDialog();
                  }
                });
              });
          } else {
            this.props
              .newRegister("InitPhone", {
                input: "Init",
                data: {
                  areacode: this.state.areacode,
                  phone: this.state.phone,
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
                      this.props.getAccountInfo().then(async (response) => {
                        if (
                          response.data.email === null &&
                          !response.data.registercompleted
                        ) {
                          AppHistory.push("/account/profile/member_email");
                        } else {
                          this.props.handleCloseDialog();
                        }
                      });
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
          }
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
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(this.state.phone)) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "warning",
          }
        );
        return;
      }
      AccountService.UpdatePhone(this.state.securityKey, this.state.code).then(
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
                phone: "",
                securityKey: "",
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
          }
        }
      );
    }
  };

  render() {
    var ifNotEmpty = this.props.phone !== "" && this.props.phone !== null;

    const Disabled = () => {
      return (
        <Container>
          <FormControl>
            <CustomSelect
              native
              variant="outlined"
              value={this.state.areacode}
              displayEmpty
              onChange={(e) => {
                this.setState({ ...this.state, areacode: e.target.value });
              }}
            >
              <option value={config.features.PhonePrefix}>
                {config.features.PhonePrefix}
              </option>
            </CustomSelect>
          </FormControl>

          <CustomText
            placeholder={i18n.t("common.msgEnterPhone")}
            onChange={this.onhandlePhoneChange}
            value={this.state.phone}
            inputProps={{
              maxLength: config.features.MAX_PHONE_LENGTH || 10,
            }}
            style={{
              width: "268px",
              height: "46px",
              float: "right",
            }}
            variant="outlined"
            autoComplete="off"
            disabled
          ></CustomText>
          {(config.features.Profile_DisableEditPhone ||
            config.features.Profile_DisableVerifyPhone) && (
            <Content>
              {i18n.t("profile.phone.toEdit")}
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
        </Container>
      );
    };

    if (
      config.features.Profile_DisableVerifyPhone &&
      !config.features.InitPhone_WithoutVerify
    ) {
      return <Disabled />;
    }

    if (
      this.props.edit ||
      this.props.phone === null ||
      this.props.phone === ""
    ) {
      return (
        <Container>
          <FormControl>
            <CustomSelect
              native
              variant="outlined"
              value={this.state.areacode}
              displayEmpty
              onChange={(e) => {
                this.setState({ ...this.state, areacode: e.target.value });
              }}
            >
              <option value={config.features.PhonePrefix}>
                {config.features.PhonePrefix}
              </option>
            </CustomSelect>
          </FormControl>

          <CustomText
            placeholder={i18n.t("common.msgEnterPhone")}
            onChange={this.onhandlePhoneChange}
            value={this.state.phone}
            inputProps={{
              maxLength: config.features.MAX_PHONE_LENGTH || 10,
            }}
            style={{
              width: "268px",
              height: "46px",
              float: "right",
            }}
            variant="outlined"
            autoComplete="off"
            disabled={
              config.features.InitPhone_WithoutVerify &&
              this.state.isNew === false &&
              this.state.step === 1
            }
          ></CustomText>
          {!(
            config.features.Register_CustomFlow_IDR &&
            !this.props.account.registercompleted
          ) &&
            !config.features.InitPhone_WithoutVerify &&
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
                  variant="outlined"
                  autoComplete="off"
                  value={this.state.code}
                  type={"text"}
                  style={{
                    width: "208px",
                    height: "46px",
                  }}
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
                {i18n.t("profile.phone.toEdit")}
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
              marginTop={10}
            ></CustomButton>
          )}
        </Container>
      );
    } else {
      return <Disabled />;
    }
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
    getRegisterStatus: () => dispatch(accountAction.GetRegisterStatus()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(PhoneVerification));
