import {
  Dialog,
  FormControl,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LoginBGPNG from "../../../assets/images/login-bg.png";
import styled from "styled-components";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconMobilePNG from "../../../assets/images/icon-mobile.png";
import IconInputVerifyCodePNG from "../../../assets/images/icon-input-verifycode.png";
import { AccountService } from "../../../api-services/services/AccountService";
import { useSnackbar } from "notistack";
import { accountAction } from "../../../api-services/actions/accountAction";

const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);

const Container = styled.div`
  background: url(${LoginBGPNG});
  background-attachment: fixed;
  background-position: center;
  min-height: 200px;
  padding: 40px 40px 20px 40px;
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

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);

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
      : `  background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);
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

const ButtonLogin = styled.div`
  margin-top: 24px;
  margin-bottom: 35px;
  color: #fff;
  font-size: 20px;
  width: 350px;
  height: 51px;
  border-radius: 6px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

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
const TitleContainer = styled.div`
  text-align: center;
  font-size: 42px;
  color: ${({ theme }) => theme.secondary};
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
  position: absolute;
  right: 10px;
  top: 20px;
`;

const ForcedVerification = ({ forcedverify }) => {
  const [areacode, setAreacode] = useState(config.features.PhonePrefix);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setOpen(forcedverify);
  }, [forcedverify]);

  const [open, setOpen] = useState(forcedverify);

  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(phone)) {
        enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "warning",
          }
        );
        return;
      }

      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areacode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          setSecurityKey(response.data.stepResponse);
          enqueueSnackbar(i18n.t("common.msgTokenSent"), {
            variant: "info",
          });
          setCountdown(60);
        } else {
          enqueueSnackbar(response.info, {
            variant: "warning",
          });
        }
      });

      // AccountService.Activation("", "", areacode, phone).then(
      //   async (response) => {
      //     if (response.IsSuccess) {
      //       setSecurityKey(response.data);
      //       enqueueSnackbar(i18n.t("common.msgTokenSent"), {
      //         variant: "info",
      //       });
      //       setCountdown(60);
      //     } else {
      // enqueueSnackbar(response.info, {
      //   variant: "warning",
      // });
      //     }
      //   }
      // );
    }
  };

  function smsVerification(securityKey, code) {
    AccountService.NewRegister("InitPhone", {
      input: "Valid",
      data: {
        securitykey: securityKey,
        validatecode: code,
      },
    }).then(async (response) => {
      if (response.IsSuccess) {
        enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
          variant: "success",
        });
        setOpen(false);
      } else {
        enqueueSnackbar(response.info, {
          variant: "warning",
        });
      }
      // this.props.getAccountInfo().then(async (response) => {

      // if (
      //   response.data.email === null &&
      //   !response.data.registercompleted
      // ) {
      //   AppHistory.push(
      //      "/account/profile/member_email"
      //   );
      // } else {
      //   this.props.handleCloseDialog();
      // }
      // });
    });
    // AccountService.VerifyActivation(securityKey, code).then(
    //   async (response) => {
    //     if (response.IsSuccess) {
    //       enqueueSnackbar(i18n.t("common.msgTokenVerified"), {
    //         variant: "success",
    //       });
    //       setOpen(false);
    //     } else {
    //       enqueueSnackbar(response.info, {
    //         variant: "warning",
    //       });
    //     }
    //   }
    // );
  }

  const handleActivationClick = async () => {
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (!expr.test(phone)) {
      enqueueSnackbar(
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
        enqueueSnackbar(i18n.t("common.msgEnterCode"), {
          variant: "warning",
        });
        return;
      }
    }

    if (config.features.SkipSMSVerification) {
      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areacode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          smsVerification(response.data, "123456");
        } else {
          enqueueSnackbar(response.info, {
            variant: "warning",
          });
        }
      });
    } else {
      smsVerification(securityKey, code);
    }
  };

  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);
  return (
    <StyledDialog open={open} onClose={() => {}}>
      <Container>
        {
          //    <CloseIconContainer
          //    viewBox="4 4 16 16"
          //    onClick={() => {
          //      setOpen(false);
          //    }}
          //  ></CloseIconContainer>
        }

        <TitleContainer>{i18n.t("web.register.activation")}</TitleContainer>
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
      </Container>
    </StyledDialog>
  );
};

export default ForcedVerification;
