import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextField from "../../Share/TextField";
import Button from "../../Share/Button";
import { AccountService } from "../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
import { withSnackbar } from "notistack";
import i18n from "../../../utils/i18n";
import { AppHistory } from "../../../history/History";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 40px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;

  color: #818181;
  margin-top: 60px;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomButton = styled.div`
  width: 115px;
  margin-left: 5px;
  background-image: linear-gradient(to top, #f0ca83, #f0ca83);
  height: 35px;
  margin-top: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  ${({ disabled }) => {
    return (
      disabled &&
      ` background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);
      cursor: not-allowed;
      pointer-event: none;`
    );
  }}
`;

class EmailVerification extends Component {
  state = {
    email: "",
    countdownToken: 0,
    securityKey: "",
    code: "",
  };
  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };

  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleRequestCode = () => {
    AccountService.VerifyEmail(this.state.email)
      .then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            securityKey: response.data,
            countdownToken: 60,
          });
          this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
            variant: "info",
          });
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(response.msg),
            {
              variant: "error",
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmitClicked = () => {
    AccountService.UpdateEmail(this.state.securityKey, this.state.code)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.dispatch({
            type: UPDATE_INFO,
            payload: {
              member_email: this.state.email,
            },
          });
          AppHistory.replace("/account/withdrawal");
          this.setState({
            ...this.state,
            code: "",
            securityKey: "",
            countdownToken: 0,
            email: "",
          });
        } else {
          this.props.enqueueSnackbar(
            ErrorSwitcher.getTranslation(response.msg),
            {
              variant: "error",
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <SubTitle>{i18n.t("profile.email.addEmail")}</SubTitle>
        <TextFieldLabel>{i18n.t("profile.email.plsEnterEmail")}</TextFieldLabel>
        <TextFieldContainer>
          <TextField
            marginTop={10}
            placeholder={i18n.t("profile.email.plsEnterEmail")}
            width={275}
            height={38}
            float={"none"}
            value={this.state.email}
            handleTextFieldChange={this.handleChangeEmail}
          ></TextField>
          <CustomButton
            onClick={this.handleRequestCode}
            disabled={this.state.email === "" || this.state.countdownToken > 0}
          >
            {this.state.countdownToken <= 0
              ? i18n.t("common.msgSendToken")
              : i18n.t("common.btnTokenResendLabel") +
                "(" +
                this.state.countdownToken +
                "s)"}
          </CustomButton>
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            marginTop={10}
            placeholder={i18n.t("common.msgEnterEmailCode")}
            width={395}
            height={38}
            float={"none"}
            value={this.state.code}
            handleTextFieldChange={this.handleChangeCode}
          ></TextField>
        </TextFieldContainer>
        <TextFieldContainer>
          <Button
            name="下一步"
            width={255}
            disabled={this.state.code === "" && this.state.securityKey === ""}
            handleClick={this.handleSubmitClicked}
          ></Button>
        </TextFieldContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(EmailVerification));
