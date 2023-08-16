import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "../../api-services/actions/accountAction";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
import Password2IconPNG from "../../assets/images/password2-icon.png";
import IconInboxSelectedPNG from "../../assets/images/icon-inbox-selected.png";
import IconMobilePNG from "../../assets/images/icon-mobile.png";
import IconEmailPNG from "../../assets/images/icon-input-email.png";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import config from "../../config/config";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { generalAction } from "../../api-services/actions/generalAction";
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

  color: #404040;
`;
const SubTitleContainer = styled.div`
  text-align: center;

  font-size: 18px;

  color: #404040;
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

    margin: 0,

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

const DescriptionContainer = styled.div`
  padding: 12px 0 0 8px;
`;
const Description = styled.div`
  float: left;
  width: 310px;
  margin-left: 5px;
  font-size: 14px;

  line-height: 1.43;

  color: #404040;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2px",
    border: "solid #404040 1px",
  },
  formControl: {
    width: "78px",
    height: "46px",
    marginTop: "14px",
    marginRight: "10px",

    broder: "solid 2px #000",

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
  input: {
    fontSize: "14px",
  },
  checkboxRoot: {
    padding: "0",
    margin: "0",
    float: "left",
    "& .MuiIconButton-label": {
      borderRadius: "6px",
      border: "solid 1px #000",
    },
  },
  icon: {
    width: 20,
    height: 20,

    borderRadius: "5px",
    backgroundColor: "#fff",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconInboxSelectedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconInboxSelectedPNG + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      content: '""',
    },
    "input:hover ~ &": {},
  },
}));

const CustomInvitationContainer = styled.div`
  position: relative;
  box-shadow: 0px 3px 8px -2px rgb(0 0 0 / 75%);
`;

const CustomInvitationSelect = styled.select`
  position: absolute;
  right: 10px;
  bottom: 15px;
  border: none;
  outline: none;
`;

const CustomTextWrapper = styled.div`
  box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.75);
  border-radius: 6px;
  margin-top: 13px;
`;

function Register(props) {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [areacode, setAreacode] = React.useState(config.features.PhonePrefix);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [promotionId, setPromotionId] = React.useState(
    config.affiliateId !== ""
      ? config.affiliateId
      : localStorage.getItem("promotionId")
  );
  const [subid, setSubid] = React.useState(localStorage.getItem("subid"));

  const [upper, setUpper] = React.useState(localStorage.getItem("upper"));
  const [promoteType, setPromoteType] = React.useState(
    localStorage.getItem("invitationtype") === ""
      ? "a"
      : localStorage.getItem("invitationtype")
  );
  const [prefill, setPrefill] = React.useState(
    localStorage.getItem("promotionId") !== "" ||
      localStorage.getItem("upper") !== ""
      ? true
      : false
  );

  const [fromCustomDomain, setFromCustomDomain] = React.useState(false);

  useEffect(() => {
    if (props.general.brand.hasInvitationCode) {
      props.getInvitationCode().then((result) => {
        if (result.IsSuccess && result.data.invitationCode) {
          setPromoteType("a");
          setPromotionId(result.data.invitationCode);
          setPrefill(true);
          setFromCustomDomain(true);
        }
      });
    }
  }, []);

  const [tnc, setTnc] = React.useState(true);
  const handleRegisterClick = async () => {
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
    if (password !== password2) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (config.features.Register_ShowPhone) {
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
    }

    expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "warning",
        });
        return;
      }
    }

    if (tnc) {
      // user_account,
      // user_password,
      // pay_password,
      // mobile,
      // recommend_code,
      // mobile_code_id
      props
        .register(username, password, password2, promotionId, upper)
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
            props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
              variant: "warning",
            });
          } else if (response.IsSuccess) {
            // let urlParams = new URLSearchParams(props.location.search);
            // if (urlParams.has("return_url")) {
            //   const returnValue = urlParams.get("return_url");
            //   if (returnValue) {
            //     window.location.href =
            //       returnValue +
            //       "?token=" +
            //       BlowFishEncryption.Encrypt(response.data);
            //   }
            // }
            if (config.features.SMSVerification) {
              props.onRegisterSuccess(username, password);
            } else if (
              config.features.Register_ShowEmail &&
              config.features.Register_ShowPhone
            ) {
              props.doLoginWithHpEmail(username, password, phone, email);
            } else if (config.features.Register_ShowPhone) {
              props.doLoginWithHp(username, password, phone);
            } else {
              props.doLogin(username, password);
              // await props.getAccountInfo(response.data);
              // await props.getAccountProfile(response.data);
            }
          } else {
            props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
              variant: "warning",
            });
            // if (response.code === 206) {
            //   props.enqueueSnackbar(i18n.t("common.msgInvalidInvitationCode"), {
            //     variant: "warning",
            //   });
            // } else {
            //   props.enqueueSnackbar(response.info, {
            //     variant: "warning",
            //   });
            // }
          }
        });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
      return;
    }
  };

  const performNewRegister = async () => {
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
    if (password !== password2) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
      return;
    }
    expr = new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`);
    if (config.features.Register_ShowPhone) {
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
    }

    expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (config.features.Register_ShowEmail) {
      if (!expr.test(email)) {
        props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
          variant: "warning",
        });
        return;
      }
    }

    if (tnc) {
      props
        .newRegister("CreatePlayer", {
          username: username,
          pwd: password,
          upper: upper,
          invitationcode: promotionId,
        })
        .then(async (response) => {
          if (
            response.IsSuccess &&
            response.data.stepResponse.isnew === false
          ) {
            props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
              variant: "warning",
            });
          } else if (response.IsSuccess) {
            let setPhoneDontCareDuplicate =
              response.data.nextStepType === "SetPhoneDontCareDuplicate";

            if (config.features.SMSVerification) {
              props.onRegisterSuccess(username, password);
            } else if (
              config.features.Register_ShowEmail &&
              config.features.Register_ShowPhone
            ) {
              props.doLoginWithHpEmail(
                username,
                password,
                phone,
                email,
                setPhoneDontCareDuplicate
              );
            } else if (config.features.Register_ShowPhone) {
              props.doLoginWithHp(username, password, phone, setPhoneDontCareDuplicate);
            } else {
              props.doLogin(username, password);
            }

            // if (subid !== "") {
            //   let PAYOUT = "";
            //   let affiliateUrl = `http://ad.propellerads.com/conversion.php?aid=3508428&pid=&tid=100917&visitor_id=${subid}&payout=${PAYOUT}`;
            //   window.open(affiliateUrl, "_blank");
            // }
          } else {
            props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
              variant: "warning",
            });
          }
        });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
      return;
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePromoChange = (e) => {
    setPromotionId(e.target.value);
  };
  const handleUpperChange = (e) => {
    setUpper(e.target.value);
  };
  const handleTncClick = (e) => {
    setTnc(!tnc);
  };
  const handleSwitchType = (e) => {
    setPromoteType(e.target.value);
    setUpper("");
    setPromotionId("");
  };

  const classes = useStyles();
  return (
    <Container>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
      <SubTitleContainer>
        {i18n.t("web.register.registerTitleLine2")}
      </SubTitleContainer>
      <FormContainer>
        <CustomTextWrapper>
          <CustomText
            onChange={handleUsernameChange}
            id="username"
            value={username}
            placeholder={i18n.t("web.register.username")}
            variant="outlined"
            autoComplete="off"
            inputProps={{
              maxLength: 16,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "24px", width: "30px" }}
                >
                  <img src={UserIconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
        </CustomTextWrapper>

        <CustomTextWrapper>
          <CustomText
            onChange={handlePasswordChange}
            id="password"
            value={password}
            placeholder={i18n.t("web.register.password")}
            variant="outlined"
            type="password"
            autoComplete="off"
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "26px", width: "30px" }}
                >
                  <img src={Password1IconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
        </CustomTextWrapper>
        <CustomTextWrapper>
          <CustomText
            onChange={handlePassword2Change}
            id="password2"
            value={password2}
            placeholder={i18n.t("web.register.confirmPassword")}
            variant="outlined"
            type="password"
            autoComplete="off"
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "30px", width: "32px" }}
                >
                  <img src={Password2IconPNG} alt=""></img>
                </InputAdornment>
              ),
            }}
          />
        </CustomTextWrapper>

        {config.features.Register_ShowPhone && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        <div class="clear"></div>
        {config.features.Register_ShowEmail && (
          <CustomTextWrapper>
            <CustomText
              onChange={handleEmailChange}
              id="email"
              value={email}
              placeholder={i18n.t("web.register.email")}
              variant="outlined"
              type="email"
              autoComplete="off"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ height: "26px", width: "30px" }}
                  >
                    <img src={IconEmailPNG} alt=""></img>
                  </InputAdornment>
                ),
              }}
            />
          </CustomTextWrapper>
        )}

        {!(config.features.Register_HideInvitation && fromCustomDomain) && (
          <CustomTextWrapper>
            <CustomInvitationContainer>
              <CustomText
                onChange={
                  promoteType === "a" ? handlePromoChange : handleUpperChange
                }
                value={promoteType === "a" ? promotionId : upper}
                id="code"
                placeholder={i18n.t("web.register.promoteCode")}
                variant="outlined"
                inputProps={{ disabled: prefill }}
              />
              {props.general.haveAffiliate && (
                <CustomInvitationSelect
                  disabled={prefill}
                  value={promoteType}
                  selected={promoteType}
                  onChange={handleSwitchType}
                >
                  <option value="a">{i18n.t("usertype.agent")}</option>
                  <option value="p">{i18n.t("usertype.player")}</option>
                </CustomInvitationSelect>
              )}
            </CustomInvitationContainer>
          </CustomTextWrapper>
        )}
        <DescriptionContainer>
          <Checkbox
            checked={tnc}
            className={classes.checkboxRoot}
            onClick={handleTncClick}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
          />
          <Description>{i18n.t("web.register.contract")}</Description>
        </DescriptionContainer>

        <ButtonLogin onClick={performNewRegister}>
          <ButtonLoginLabel>
            {config.features.Register_CustomFlow_IDR
              ? i18n.t("common.nextStep")
              : i18n.t("web.register.btn")}
          </ButtonLoginLabel>
        </ButtonLogin>
      </FormContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInvitationCode: () => dispatch(generalAction.getInvitationCode()),
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode, upper) =>
      dispatch(
        accountAction.registerAccount(
          username,
          pwd,
          confirmpwd,
          invitationcode,
          upper
        )
      ),
    accountLogin: (username, password) =>
      dispatch(accountAction.accountLogin(username, password)),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Register))
);
