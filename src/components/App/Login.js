import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
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

const ButtonLogin = styled.div`
  margin-top: 35px;
  width: 350px;
  height: 51px;
  color: #fff;
  font-size: 20px;

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
const LinkStyle = styled.a`
  margin-top: 5px;
  text-decoration: underline;

  font-size: ${(props)=> i18n.language === "ta-IN" ? "12px" : "15px"};

  color: #404040;

  &:hover {
    cursor: pointer;
  }
`;
const LinkRegister = styled(LinkStyle)`
  float: left;
`;
const LinkForgotPassword = styled(LinkStyle)`
  float: right;
`;
const EmptyBlock = styled.div`
  clear: both;
  height: 30px;
`;
const Description = styled.p`
  text-align: center;

  font-size: 14px;

  line-height: 1.43;

  color: #404040;
`;
const OnlineSupportLink = styled(LinkStyle)`
  font-size: 13px;
`;

class Login extends Component {
  local_props = {
    rememberChecked: false,
    username: "",
    password: "",
  };
  handleTextFieldChange = (e) => {
    this.local_props[e.target.id] = e.target.value;
  };

  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("web.login.loginTitle")}</TitleContainer>
        <SubTitleContainer>
          {i18n.t("web.login.loginTitleLine2")}
        </SubTitleContainer>
        <FormContainer>
          <CustomText
            onChange={this.handleTextFieldChange}
            id="username"
            placeholder={i18n.t("common.username")}
            variant="outlined"
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
          <CustomText
            onChange={this.handleTextFieldChange}
            id="password"
            placeholder={i18n.t("common.password")}
            variant="outlined"
            type="password"
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
          <ButtonLogin
            onClick={() =>
              this.props.onhandleLoginClick(
                this.local_props.username,
                this.local_props.password
              )
            }
          >
            <ButtonLoginLabel>{i18n.t("web.login.login")}</ButtonLoginLabel>
          </ButtonLogin>
          <LinkRegister onClick={this.props.onhandleRegister}>
            {i18n.t("web.login.newRegister")}
          </LinkRegister>
          <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
            {i18n.t("web.login.forgetPass")}
          </LinkForgotPassword>
          {/* {(() => {
            var brand = ["HK28", "21GEN", "21gen", "MESS8", "PISO", "BUNNY"];
            if (brand.indexOf(config.brand) <= 0) {
              return (
                <LinkForgotPassword onClick={this.props.onhandleForgotPassword}>
                  {i18n.t("web.login.forgetPass")}
                </LinkForgotPassword>
              );
            }
          })()} */}

          <EmptyBlock></EmptyBlock>
        </FormContainer>
        <Description>
          {i18n.t("web.login.cs")}
          <OnlineSupportLink onClick={this.props.onhandleOnlineSupport}>
            {i18n.t("web.login.contactus")}
          </OnlineSupportLink>

          <br></br>
          {i18n.t("web.login.footerDesc")}
        </Description>
      </Container>
    );
  }
}

export default Login;
