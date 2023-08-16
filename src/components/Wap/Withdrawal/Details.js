import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-lazy-load-image-component/src/effects/blur.css";

import Button from "../Share/Button";

import Loading from "../Share/Loading";
import i18n from "../../../utils/i18n";
import {walletAction} from "../../../api-services/actions/walletAction";
import {RESET_WALLETRESULT} from "../../../api-services/constant/actionType";

import Slide from "@material-ui/core/Slide";
const Container = styled.div``;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ContentBg = styled.div`
  background: #fff;
  width: 100%;

  padding: 60px 60px 30px 60px;
  margin-bottom: 30px;
`;
const BalanceLabel = styled.div`
  font-size: 30px;

  color: #979797;
`;
const DepositAmount = styled.div`
  font-size: 80px;
  font-weight: bold;

  color: ${({ theme }) => theme.secondary};
`;
const SplitLine = styled.div`
  height: 2px;
  background-color: #f1f1f1;
  margin: 50px 0;
`;
const LeftLabel = styled.div`
  font-size: 24px;
  color: #979797;
  float: left;
`;
const RightLabel = styled.div`
  font-size: 24px;
  color: #333333;
  float: right;
  font-weight: bold;
`;
const SplitBoth = styled.div`
  clear: both;
  margin: 30px 0;
`;

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;

const OTPContainer = styled.div`
  position: relative;
  text-align: center;
  margin: 50px 0;
  &:after {
    content: "___   ___   ___   ___   ___   ___";
    display: block;
    position: absolute;
    top: 28px;
    left: 64px;
    white-space: pre;
  }
`;
const OTPTextBox = styled.input`
  position: relative;
  font-size: 50px;
  z-index: 2;
  border: none;
  background: transparent;
  width: 500px;
  text-indent: 9px;
  padding-left: 64px;
  color: ${({ theme }) => theme.secondary};
  -webkit-letter-spacing: 25.6px;
  -moz-letter-spacing: 25.6px;
  -ms-letter-spacing: 25.6px;
  letter-spacing: 42.6px;
  font-family: Courier;
`;
class Details extends Component {
  state = {
    loading: false,
    openPopup: false,
    password: "",
  };
  componentDidMount() {
    if (this.props.order == null) {
      this.props.appHistory.replace("/" + i18n.language + "/withdrawal");
    } else {
      this.props.addBilling(this.props.order.id, this.props.order.amount);
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.appHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.alert("", this.props.wallet.withdrawalResult.info);
      }
    }
  }
  handleWithdrawalConfirmClick = (e) => {
    if (this.props.wallet.addBillingResult !== null) {
      this.setState({ ...this.state, otp: true, password: "" });
    }
  };

  handleWithdrawalCancelClick = (e) => {
    this.setState({ ...this.state, loading: true });
    this.props.appHistory.replace("/" + i18n.language + "/withdrawal");
  };
  handleConfirmOTP = () => {
    this.setState({ ...this.state, otp: false });
    this.props.doWithdrawal(
      this.props.wallet.addBillingResult.data.amount,
      this.state.password,
      this.props.order.id
    );
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
    let form = document.getElementById("form");
    form.submit();
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
  };
  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleWithdrawalCancelClick}
          title={i18n.t("withdrawal.title")}
        ></Header>
        {(() => {
          if (this.props.wallet.addBillingResult !== null) {
            return (
              <React.Fragment>
                <ContentBg>
                  <BalanceLabel>{i18n.t("common.amount")}</BalanceLabel>
                  <DepositAmount>
                    {this.props.wallet.mainSymbol}{" "}
                    {this.props.wallet.addBillingResult.data.amount}
                  </DepositAmount>
                  <SplitLine></SplitLine>
                  <LeftLabel>{i18n.t("withdrawal.receiverAcc")}</LeftLabel>
                  <RightLabel>
                    {this.props.wallet.addBillingResult.data.card}
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.receiverName")}</LeftLabel>
                  <RightLabel>
                    {this.props.wallet.addBillingResult.data.name}
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.fee")}</LeftLabel>
                  <RightLabel>
                    {this.props.wallet.addBillingResult.data.fee}
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.receiverAmount")}</LeftLabel>
                  <RightLabel>
                    {this.props.wallet.addBillingResult.data.bill}
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                </ContentBg>
                <Button
                  style={{
                    width: "300px",
                    float: "left",
                    marginLeft: "50px",
                    backgroundImage: "none",
                    backgroundColor: "#b7b7b7",
                  }}
                  labelStyle={{ color: "#fff" }}
                  label={i18n.t("common.cancel")}
                  onClick={this.handleWithdrawalCancelClick}
                ></Button>
                <Button
                  style={{
                    width: "300px",
                    float: "right",
                    marginRight: "50px",
                  }}
                  labelStyle={{ color: "#fff" }}
                  label={i18n.t("common.confirm")}
                  onClick={this.handleWithdrawalConfirmClick}
                ></Button>
              </React.Fragment>
            );
          }
        })()}
        <StyledModalPopup
          onClose={() => this.setState({ ...this.state, otp: false })}
          open={this.state.otp}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialoTitle>{i18n.t("common.withdrawalPassword")}</DialoTitle>
          <OTPContainer>
            <OTPTextBox
              type={"password"}
              inputmode="numeric"
              minLength={6}
              maxLength={6}
              size={6}
              onChange={this.handlePasswordChange}
              value={this.state.password}
            ></OTPTextBox>
          </OTPContainer>
          <Button
            style={{
              width: "250px",
              float: "left",

              backgroundImage: "none",
              backgroundColor: "#b7b7b7",
            }}
            labelStyle={{ color: "#fff" }}
            label={i18n.t("common.cancel")}
            onClick={() => this.setState({ ...this.state, otp: false })}
          ></Button>
          <Button
            style={{
              width: "250px",
              float: "right",
            }}
            disabled={this.state.password.length < 6}
            label={i18n.t("common.confirm")}
            onClick={this.handleConfirmOTP}
          ></Button>
        </StyledModalPopup>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    wallet: state.wallet,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBilling: (card_id, amount) =>
      dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    doWithdrawal: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdrawal(amount, password, user_account_id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
