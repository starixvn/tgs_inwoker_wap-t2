import React, { Component } from "react";

import styled from "styled-components";

import LoginBGPNG from "../../assets/images/login-bg.png";
import i18n from "../../utils/i18n";
import CloseIcon from "@material-ui/icons/Close";
import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
const Container = styled.div`
  width: 506px;

  background: url(${LoginBGPNG});
  display: table;
`;
const CloseIconContainer = styled(CloseIcon)`
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
const ButtonStyle = styled.div`
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
const Button = styled(ButtonStyle)`
  width: 347px;
  height: 46px;
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

  color: #ffffff;
`;

const ContactUsLink = styled(LinkStyle)`
  font-size: 13px;
`;

class ResetPasswordSuccess extends Component {
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
        <TitleContainer>
          {i18n.t("web.resetPassword.resetSuccess")}
        </TitleContainer>

        <FormContainer>
          <Button onClick={this.props.onhandleSubmitClick}>
            {i18n.t("common.confirm")}
          </Button>

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

export default ResetPasswordSuccess;
