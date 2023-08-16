import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "../../api-services/actions/accountAction";
import { AccountService } from "../../api-services/services/AccountService";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import IconMobilePNG from "../../assets/images/icon-mobile.png";
import IconInboxSelectedPNG from "../../assets/images/icon-inbox-selected.png";
import IconInputVerifyCodePNG from "../../assets/images/icon-input-verifycode.png";

import { makeStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";

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
      : ` background-image: linear-gradient(to top, #f0bc5a, #f0ca83);
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
function Activation(props) {
  const [username, setUsername] = React.useState(props.username);

  const [password, setPassword] = React.useState(props.pass);
  const [areacode, setAreacode] = React.useState(config.features.PhonePrefix);
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function smsVerification(securityKey, code) {
    props
      .newRegister("InitPhone", {
        input: "Valid",
        data: {
          securitykey: securityKey,
          validatecode: code,
        },
      })
      .then(async (response) => {
        if (response.IsSuccess) {
          props.enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
            variant: "success",
          });
          props.doLogin(username, password);

          props.history.push("/registersuccess/" + username);
        } else {
          props.enqueueSnackbar(response.info, {
            variant: "warning",
          });
        }
      });
  }

  const handleActivationClick = async () => {
    var expr = /^[a-zA-Z0-9]{6,16}$/;
    if (!expr.test(username)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterUserNameInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (!expr.test(phone)) {
      props.enqueueSnackbar(
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH),
        {
          variant: "warning",
        }
      );
      return;
    }

    if (!config.features.SkipSMSVerification) {
      expr = /^[a-zA-Z0-9]{6}$/;
      if (!expr.test(code)) {
        props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
          variant: "warning",
        });
        return;
      }
    }

    if (config.features.SkipSMSVerification) {
      var result = await AccountService.Login(username, password);
      if (result.IsSuccess) {
        props.getAccountInfo();

        props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })
          .then(async (response) => {
            if (response.IsSuccess) {
              smsVerification(response.data, "123456");
            } else {
              props.enqueueSnackbar(response.info, {
                variant: "warning",
              });
            }
          });
      }
    } else {
      smsVerification(securityKey, code);
    }
  };
  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = /^[a-zA-Z0-9]{6,16}$/;
      if (!expr.test(username)) {
        props.enqueueSnackbar(i18n.t("common.msgRegisterUserNameInvalid"), {
          variant: "warning",
        });
        return;
      }
      var expr = /^.{6,20}$/;
      if (!expr.test(password)) {
        props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
          variant: "warning",
        });
        return;
      }
      expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
      if (!expr.test(phone)) {
        props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "warning",
          }
        );
        return;
      }
      var result = null;
      if (!isLoggedIn) {
        result = await AccountService.Login(username, password);
      }
      if ((result !== null && result.IsSuccess) || isLoggedIn) {
        setIsLoggedIn(true);

        props
          .newRegister("InitPhone", {
            input: "Init",
            data: {
              areacode: areacode,
              phone: phone,
            },
          })

          .then(async (response) => {
            if (response.IsSuccess) {
              setSecurityKey(response.data.stepResponse);
              props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
                variant: "info",
              });
              setCountdown(60);
            } else {
              props.enqueueSnackbar(response.info, {
                variant: "warning",
              });
            }
          });
      }
    }
  };
  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return (
    <Container>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.activation")}</TitleContainer>

      <FormContainer>
        {
          //       <CustomText
          //       onChange={handleUsernameChange}
          //       id="username"
          //       value={username}
          //       placeholder={i18n.t("web.register.username")}
          //       variant="outlined"
          //       autoComplete="off"
          //       inputProps={{
          //         maxLength: 32,
          //       }}
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment
          //             position="start"
          //             style={{ height: "24px", width: "30px" }}
          //           >
          //             <img src={UserIconPNG} alt=""></img>
          //           </InputAdornment>
          //         ),
          //       }}
          //     />
          //
          //     <CustomText
          //       onChange={handlePasswordChange}
          //       id="password"
          //       value={password}
          //       placeholder={i18n.t("web.register.password")}
          //       variant="outlined"
          //       type="password"
          //       autoComplete="off"
          //       inputProps={{
          //         maxLength: 20,
          //       }}
          //       InputProps={{
          //         startAdornment: (
          //           <InputAdornment
          //             position="start"
          //             style={{ height: "26px", width: "30px" }}
          //           >
          //             <img src={Password1IconPNG} alt=""></img>
          //           </InputAdornment>
          //         ),
          //       }}
          //     />
        }

        <CustomFormControl>
          <CustomSelect
            native
            variant="outlined"
            value={areacode}
            displayEmpty
            onChange={(e) => {
              setAreacode(e.target.value);
            }}
          >
            <option value={config.features.PhonePrefix}>
              {config.features.PhonePrefix}
            </option>
          </CustomSelect>
        </CustomFormControl>
        <CustomText2
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          id="phone"
          value={phone}
          placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
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
        {!config.features.SkipSMSVerification && (
          <>
            <div class="clear"></div>
            <CustomText
              placeholder={i18n.t("common.msgEnterCode")}
              adornment={IconInputVerifyCodePNG}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              variant="outlined"
              autoComplete="off"
              value={code}
              type={"text"}
              style={{
                width: "200px",
                height: "51px",
                marginTop: "0",
              }}
            ></CustomText>
            <StyleButton onClick={handleGetCodeClick} disable={countdown > 0}>
              <ButtonLabel>
                {countdown <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    countdown +
                    "s)"}
              </ButtonLabel>
            </StyleButton>
          </>
        )}
        <ButtonLogin onClick={handleActivationClick}>
          <ButtonLoginLabel>{i18n.t("common.submit")}</ButtonLoginLabel>
        </ButtonLogin>
      </FormContainer>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode) =>
      dispatch(
        accountAction.registerAccount(username, pwd, confirmpwd, invitationcode)
      ),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),

    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
  };
};
export default withRouter(
  connect(null, mapDispatchToProps)(withSnackbar(Activation))
);
