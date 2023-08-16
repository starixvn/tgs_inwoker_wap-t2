import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";

import "react-lazy-load-image-component/src/effects/blur.css";

import { walletAction } from "../../../api-services/actions/walletAction";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";
import Button from "../../Wap/Share/Button";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";

const Container = styled.div``;
const ContentBg = styled.div`
  background: #fff;
  width: 100%;

  padding: 60px 60px 30px 60px;
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
const QRImage = styled.img`
  width: 300px;
  display: block;
  margin: 20px auto;
`;

class Manual extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      expired_time: 0,
      loading: false,
      openPopup: false,
    };
  }

  componentDidMount() {
    if (this.props.order == null) {
      this.props.appHistory.replace("/" + i18n.language + "/deposit");
    } else {
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositUploadResult === null &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.props.alert("", i18n.t("deposit.uploadSuccess"));
        this.props.appHistory.goBack();
      } else {
        this.props.alert("", this.props.wallet.depositUploadResult.info);
      }
    }
    if (
      preProps.wallet.cancelDepositResult !==
        this.props.wallet.cancelDepositResult &&
      this.props.wallet.cancelDepositResult !== null
    ) {
      this.props.resetDeposit();
      if (this.props.wallet.cancelDepositResult.IsSuccess) {
        this.props.alert("", i18n.t("deposit.cancelDeposit"));
        this.props.appHistory.goBack();
      } else {
        this.props.alert("", this.props.wallet.cancelDepositResult.info);
      }
    }
  }
  handleDepositConfirmClick = (e) => {
    if (!this.myRef.current.files[0]) {
      this.props.alert("", i18n.t("deposit.msgPlsSelectFile"));
      return;
    }
    this.props.doDepositUpload(
      this.myRef.current.files[0],
      "image",
      this.props.order.depositResult.data.order_id
    );
  };

  handleDepositCancelClick = (e) => {
    this.props.cancelDeposit(
      this.props.order.depositResult.data.order_id,
      this.props.order.depositResult.data.notice_id
    );
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
    if (this.props.order == null) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <Container>
        <ContentBg>
          <BalanceLabel>{i18n.t("deposit.depositAmount")}：</BalanceLabel>
          <DepositAmount>{this.props.order.amount}</DepositAmount>
          <SplitLine></SplitLine>
          <LeftLabel>{i18n.t("deposit.depositMethod")}</LeftLabel>
          <RightLabel>{this.props.order.selectedType.title}</RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositTunnel")}</LeftLabel>
          <RightLabel>{this.props.order.selectedChannel.title}</RightLabel>
          <SplitBoth></SplitBoth>

          <LeftLabel>{i18n.t("deposit.uploadReceipt")}</LeftLabel>
          <RightLabel>
            <input type="file" ref={this.myRef} accept="image/*"></input>
          </RightLabel>
          <SplitBoth></SplitBoth>
          {(() => {
            if (this.props.order.selectedChannel.is_transfer === true) {
              return (
                <React.Fragment>
                  <LeftLabel>{i18n.t("deposit.receiverBank")}</LeftLabel>
                  <RightLabel>{this.props.order.bankInfo.bank_name}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverAccount")}</LeftLabel>
                  <RightLabel>{this.props.order.bankInfo.user_name}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverNumber")}</LeftLabel>
                  <RightLabel>{this.props.order.bankInfo.account}</RightLabel>
                  <SplitBoth></SplitBoth>
                </React.Fragment>
              );
            } else {
              return null;
            }
          })()}
          {(() => {
            if (this.props.order.selectedChannel.is_qr === true) {
              return (
                <QRImage
                  src={
                    this.props.order.depositResult
                      ? this.props.order.depositResult.data.pic_url
                      : ""
                  }
                ></QRImage>
              );
            } else {
              return null;
            }
          })()}
        </ContentBg>

        <Button
          style={{ margin: "20px auto" }}
          labelStyle={{ color: "#fff" }}
          label={i18n.t("deposit.upload")}
          onClick={this.handleDepositConfirmClick}
        ></Button>

        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    cancelDeposit: (id, notice_id) =>
      dispatch(walletAction.cancelDeposit(id, notice_id)),
    resetDeposit: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Manual));
