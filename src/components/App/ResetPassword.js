import React, { Component } from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";
import i18n from "../../utils/i18n";
import TextField from "@material-ui/core/TextField";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";

const Container = styled.div`
  width: 506px;
  height: 360px;
  background: url(${LoginBGPNG});
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

  font-size: 28px;

  color: #000;
`;

const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "46px",
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
const ButtonStyle = styled.div`
  width: 170px;
  height: 46px;
  margin-top: 15px;
  color: #fff;
  font-size: 20px;
  border-radius: 6px;
  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, #f0bc5a, #f0ca83);
  text-align: center;
  padding-top: 8px;
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const ButtonSubmit = styled(ButtonStyle)`
  float: right;
`;
const ButtonBack = styled(ButtonStyle)`
  float: left;
`;
const LinkStyle = styled.a`
  font-size: 14px;

  margin-top: 5px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  text-align: center;
  display: inline-block;
  width: 100%;
  font-size: 14px;
  color: #000;
`;

const ContactUsLink = styled(LinkStyle)`
  font-size: 13px;
`;

class ResetPassword extends Component {
  state = {
    password: "",
    confirmpassword: "",
  };
  componentDidMount() {}
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleNewPasswordChange = (e) => {
    this.setState({ ...this.state, confirmpassword: e.target.value });
  };
  render() {
    return (
      <Container>
        <CloseIconContainer
          viewBox="4 4 16 16"
          onClick={this.props.onhandleClose}
        ></CloseIconContainer>
        <div className="clear"></div>
        <TitleContainer>{i18n.t("web.resetPassword.title")}</TitleContainer>

        <FormContainer>
          <CustomText
            placeholder={i18n.t("web.resetPassword.newPassword")}
            variant="outlined"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type={"password"}
          />
          <CustomText
            placeholder={i18n.t("web.resetPassword.confirmNewPassword")}
            variant="outlined"
            onChange={this.handleNewPasswordChange}
            value={this.state.confirmpassword}
            type={"password"}
          />
          <ButtonBack onClick={() => this.props.onhandleBackClick()}>
            {i18n.t("common.back")}
          </ButtonBack>
          <ButtonSubmit
            onClick={() =>
              this.props.onhandleSubmitClick(
                this.props.code,
                this.props.phone,
                this.props.securityKey,
                this.state.password,
                this.state.confirmpassword
              )
            }
          >
            {i18n.t("common.submit")}
          </ButtonSubmit>

          <Description>
            {i18n.t("common.support")}
            <ContactUsLink onClick={this.props.onhandleOnlineSupport}>
              {i18n.t("common.contactus")}
            </ContactUsLink>
          </Description>
        </FormContainer>
      </Container>
    );
  }
}

export default ResetPassword;
