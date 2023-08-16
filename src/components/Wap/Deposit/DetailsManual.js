import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import "react-lazy-load-image-component/src/effects/blur.css";

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
const BankImg = styled.img`
  margin: 0 auto;
  display: block;
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

class DetailsManual extends Component {
  state = {
    expired_time: 0,
    loading: false,
    files: [],
  };

  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileType"));
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 10240) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileSize"));
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handleUploadClick = () => {
    this.props.performUploadImage(this.state.files[0]);
  };

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  render() {
    return (
      <Container>
        <ContentBg>
          <BalanceLabel>{i18n.t("deposit.depositAmount")}：</BalanceLabel>
          <DepositAmount>{this.props.amount}</DepositAmount>
          <SplitLine></SplitLine>
          <LeftLabel>{i18n.t("deposit.orderNumber")}</LeftLabel>
          <RightLabel>
            {this.props.depositResult
              ? this.props.depositResult.data
              : this.props.paymentId}
          </RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositMethod")}</LeftLabel>
          <RightLabel>{i18n.t(this.props.methodcode)}</RightLabel>
          <SplitBoth></SplitBoth>
          <LeftLabel>{i18n.t("deposit.depositTunnel")}</LeftLabel>
          <RightLabel>{this.props.channelname}</RightLabel>
          <SplitBoth></SplitBoth>
          {(() => {
            if (
              this.props.isManual === true &&
              this.props.methodcode === "BankTransfer"
            ) {
              return (
                <React.Fragment>
                  <BankImg src={this.props.extended.logo}></BankImg>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverBank")}</LeftLabel>
                  <RightLabel>{this.props.extended.name}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("deposit.receiverAccount")}</LeftLabel>
                  <RightLabel>{this.props.extended.bankAccount}</RightLabel>
                  <SplitBoth></SplitBoth>
                </React.Fragment>
              );
            }
          })()}

          {(() => {
            if (this.props.isManual === true) {
              return (
                <React.Fragment>
                  <LeftLabel>{i18n.t("deposit.uploadReceipt")}</LeftLabel>
                  <RightLabel>
                    <input
                      type="file"
                      onChange={this.handleFileChange}
                      accept="image/jpg, image/jpeg, image/png, image/tiff"
                    ></input>
                  </RightLabel>
                  <SplitBoth></SplitBoth>
                </React.Fragment>
              );
            }
          })()}
        </ContentBg>
        {(() => {
          if (this.props.isManual === true) {
            return (
              <Button
                style={{ margin: "20px auto" }}
                labelStyle={{ color: "#fff" }}
                label={i18n.t("deposit.uploadReceipt")}
                onClick={this.handleUploadClick}
                disabled={this.state.files.length <= 0}
              ></Button>
            );
          }
        })()}
        <Button
          style={{ margin: "20px auto" }}
          labelStyle={{ color: "#fff" }}
          label={
            this.props.isManual === true
              ? i18n.t("common.back")
              : i18n.t("common.complete")
          }
          onClick={this.props.handleRestartClick}
        ></Button>
        ;<Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,

    balance: state.account.info.balance,
    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(withRouter(DetailsManual));
