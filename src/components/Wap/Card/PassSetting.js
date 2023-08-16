import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";

import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../..api-services/constant/actionType";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../Wap/Share/Header";

import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import Modal from "@material-ui/core/Dialog";

import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  padding-top: 170px;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "170px",

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${
        process.env.PUBLIC_URL + `/assets/images/wapp/bg-profile.png`
      })`,
    display: "block",
  },
}))(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #ffffff;
  margin: 0 auto 20px auto;
`;
const SubTitle = styled.div`
  font-size: 34px;
  font-weight: 550;
  margin: 40px 0 0 50px;
  color: #4a4a4a;
`;

const BottomInfo = styled.div`
  font-size: 22px;
  font-weight: 600;
  height: 30px;
  color: #e23a3f;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-red-info.png`})
    no-repeat left center;
  padding-left: 40px;
  display: table;
  margin: 0 auto;
`;
const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "690px",
    maxWidth: "690px",
    height: "370px",
    display: "block",
  },
}))(Modal);
const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 20px 45px;
  color: #4a4a4a;
`;
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 0 45px;
  color: #4a4a4a;
  line-height: 1.8em;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(to top, ${({ theme }) =>
    theme.primaryGradient},
      ${({ theme }) => theme.primary}));
  color: #ffffff;
`;

class NameVerification extends Component {
  state = {
    bank: "",
    open: true,
    password: "",
    confirmPassword: "",
    loading: false,
  };
  componentDidMount() {}
  handleLogoutClick = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/");
      }
    });
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleConfirmClick = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.props.alert("", i18n.t("card.passSetting.msgInvalidConfirmPass"));
      // this.props.enqueueSnackbar("两次输入的密码不一致", {
      //   variant: "error"
      // });
      return;
    }
    this.setState({ ...this.state, loading: true });
    AccountService.UpdateWithdrawalPassword(
      this.props.token,

      this.state.password,
      this.state.confirmPassword
    ).then((response) => {
      if (response.IsSuccess) {
        this.props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_safe_password: "set",
          },
        });

        this.props.appHistory.replace("/" + i18n.language + "/card");
        this.setState({ ...this.state, loading: false });
      } else {
        this.props.alert("", response.info);
      }
    });
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ ...this.state, confirmPassword: e.target.value });
  };
  render() {
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={i18n.t("card.passSetting.title")}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
          <BalanceLabel>￥{this.props.balance}</BalanceLabel>
        </StyledAppBar>
        <SubTitle>{i18n.t("card.passSetting.settingWithdrawalPass")}</SubTitle>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          type={"password"}
          placeholder={i18n.t("card.passSetting.withdrawalPassPlaceholder")}
          label={i18n.t("card.passSetting.withdrawalPass")}
        ></Textbox>
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPasswordChange}
          type={"password"}
          placeholder={i18n.t("card.passSetting.confirmWithdrawalPass")}
          label={i18n.t("card.passSetting.reEnterWithdrawalPass")}
        ></Textbox>
        <BottomInfo>{i18n.t("card.passSetting.withdrawalPassDesc")}</BottomInfo>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.confirm")}
          onClick={this.handleConfirmClick}
        ></Button>

        <StyledModal onClose={this.handleClose} open={this.state.open}>
          <DialoTitle>{i18n.t("card.passSetting.dialogTitle")}</DialoTitle>
          <DialoMessage>{i18n.t("card.passSetting.dialogMsg")}</DialoMessage>
          <ButtonConfirm
            onClick={() => this.setState({ ...this.state, open: false })}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
        </StyledModal>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    token: state.account.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NameVerification);
