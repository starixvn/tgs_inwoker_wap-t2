import React, { Component } from "react";
import { AccountService } from "../../api-services/services/AccountService";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconMobilePNG from "../../assets/images/icon-mobile.png";

import IconInputVerifyCodePNG from "../../assets/images/icon-input-verifycode.png";

import { withSnackbar } from "notistack";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import config from "../../config/config";
const Container = styled.div`
  width: 506px;
  background: url(${LoginBGPNG});
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;

const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    background: "white",

    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(TextField);
const CustomText2 = withStyles({
  root: {
    marginLeft: "8px",
    width: "240px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    background: "white",

    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(CustomText);
const ButtonLogin = styled.div`
  margin-top: 24px;
  margin-bottom: 35px;
  color: #fff;
  font-size: 20px;
  width: 350px;
  height: 51px;
  border-radius: 6px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, #f0bc5a, #f0ca83);
  &:hover {
    cursor: pointer;

    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "100px",
    height: "51px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    marginTop: "13px",
    marginBottom: "13px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
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
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const StyleButton = styled.div`
  width: 140px;
  height: 51px;
  border: solid 1px #b6b6b6;
  margin: 0;

  margin-left: 5px;
  float: right;

  ${(props) =>
    props.disable === true
      ? `  background-image: linear-gradient(90deg, rgba(89,89,89,1) 0%, rgba(126,126,126,1) 100%);`
      : `  background-image: linear-gradient(to top,#f0bc5a,#f0ca83);
`}

  border-radius: 5px;
  font-size: 16px;
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
  margin-top: 12px;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);
class ForgotPasswordPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.phone,
      code: this.props.code,
      areaCode: this.props.areaCode,
      countdown: 0,
      securityKey: this.props.securityKey,
    };
  }

  timer = null;
  componentDidMount() {}
  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
  }
  handleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };
  onhandleGetCodeClick = () => {
    if (this.state.countdown <= 0) {
      if (
        this.state.phone.length < 8 ||
        this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
      } else {
        AccountService.VerifyForgotPassword(
          "",
          this.state.areaCode,
          this.state.phone
        ).then((response) => {
          if (response.IsSuccess) {
            this.setState({ securityKey: response.data });
            this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
              variant: "info",
            });
            this.setState({ ...this.state, countdown: 60 });
            this.checkCountdown();
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
      // AccountService.GetPhoneVerificationCode(
      //   "",
      //   this.state.phone,
      //   "resetPassword"
      // ).then(response => {
      //   // this.setState({ ...this.state, message: response.msg });
      //   if (response.IsSuccess) {
      //     this.props.enqueueSnackbar(response.msg, {
      //       variant: "info"
      //     });
      //   } else {
      //     this.props.enqueueSnackbar(response.msg, {
      //       variant: "error"
      //     });
      //   }
      //   this.setState({ ...this.state, countdown: response.data });
      //   this.checkCountdown();
      // });
    }
  };
  onhandleNextClick = () => {
    if (this.state.code.length > 0 && this.state.securityKey.length > 0) {
      this.props.onhandleNextClick(
        this.state.code,
        this.state.phone,
        this.state.securityKey
      );
    } else {
      this.props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
        variant: "error",
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
  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>

        <FormContainer>
          <CustomFormControl>
            <CustomSelect
              native
              variant="outlined"
              value={this.state.areaCode}
              displayEmpty
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
            </CustomSelect>
          </CustomFormControl>
          <CustomText2
            id="phone"
            value={this.state.phone}
            placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
            onChange={this.handlePhoneChange}
            variant="outlined"
            type="text"
            autoComplete="off"
            inputProps={{
              maxLength: config.features.MAX_PHONE_LENGTH || 10,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "26px", width: "30px" }}
                >
                  <img src={IconMobilePNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
          <div class="clear"></div>
          <CustomText
            placeholder={i18n.t("common.msgEnterCode")}
            adornment={IconInputVerifyCodePNG}
            onChange={this.handleCodeChange}
            variant="outlined"
            autoComplete="off"
            value={this.state.code}
            type={"text"}
            style={{
              width: "200px",
              height: "51px",
              marginTop: "0",
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
          <ButtonLogin onClick={this.onhandleNextClick}>
            <ButtonLoginLabel>{i18n.t("common.nextStep")}</ButtonLoginLabel>
          </ButtonLogin>
        </FormContainer>
      </Container>
    );
  }
}

export default withSnackbar(ForgotPasswordPhone);
