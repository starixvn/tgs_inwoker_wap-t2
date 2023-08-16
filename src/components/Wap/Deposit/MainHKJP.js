import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { withRouter } from "react-router-dom";
import Common from "../../../utils/Common";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "react-lazy-load-image-component/src/effects/blur.css";
import Textbox from "../Share/Textbox";
import Button from "../Share/Button";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";

const CustomSelect = withStyles((theme) => ({
  root: {
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
  select: {
    padding: "18.5px 0px",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:disabled": {
      color: "#c3c3c3",
    },
  },
}))(Select);

const CustomCustomSelect = styled(CustomSelect)`
  font-size: 28px;
  height: 78px;
  border: none;
  .MuiSelect-root {
    color: black;
  }
`;

const CustomText = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    background: "white",
    padding: "16px 32px",
    borderRadius: "16px",
    height: "101px",
    border: "none",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: 28px;
  padding: 0px 20px 20px 48px;
`;

const Remark = styled.div`
  font-size: 20px;
  padding: 0px 50px;
  color: ${({ theme }) => theme.secondary};
  opacity: 0.75;
`;

const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

const FeeSpot = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;

  span {
    font-weight: bold;
  }
`;
class MainHKJP extends Component {
  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

  render() {
    var isEwallet =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "EWALLET";

    var isPulsa =
      this.props.wallet.depositTypeList[this.props.selectedPaymentIndex].method[
        this.props.selectedMethodIndex
      ].methodcode.toUpperCase() === "PULSA";
    return (
      <React.Fragment>
        {this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
          .paymentcode === "ZeroNineNinePay" && (
          <CustomLabel style={{ padding: "32px" }}>
            <HintText>{i18n.t("hint._099")}</HintText>
          </CustomLabel>
        )}
        <CustomText>
          <CustomLabel>{i18n.t("deposit.msgPlsSelectPayment")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.selectedMethodIndex}
              onChange={(e) => this.props.handleMethodChange(e)}
            >
              <option value={""} disabled>
                {i18n.t("deposit.msgPlsSelectPayment")}
              </option>
              {this.props.wallet.depositTypeList.length > 0 &&
                this.props.wallet.depositTypeList[
                  this.props.selectedPaymentIndex
                ].method.map((item, index) => {
                  return (
                    <option value={index}>{i18n.t(item.methodcode)}</option>
                  );
                })}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        {!config.features.Deposit_HideDepositChannel && (
          <CustomText>
            <CustomLabel>{i18n.t("deposit.msgPlsSelectMethod")}</CustomLabel>
            <CustomFormControl variant="outlined">
              <CustomCustomSelect
                native
                id="customSelect"
                value={this.props.selectedChannelIndex}
                onChange={(e) => this.props.handleChannelChange(e)}
              >
                {this.props.wallet.depositTypeList.length > 0 &&
                  this.props.wallet.depositTypeList[
                    this.props.selectedPaymentIndex
                  ].method[this.props.selectedMethodIndex].channel.map(
                    (item, index) => {
                      return <option value={index}>{item.channelname}</option>;
                    }
                  )}
              </CustomCustomSelect>
            </CustomFormControl>
          </CustomText>
        )}

        {(() => {
          if (
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "MANUAL" ||
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "APPLEPAY"
          ) {
            return (
              !config.features.Deposit_RemoveName && (
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  type={"text"}
                  placeholder={
                    config.features.Deposit_CustomBankNameTranslation
                      ? i18n.t("mgm.msgPlsEnterAccount")
                      : config.features.Deposit_EnglishName
                      ? i18n.t("bet28.msgEnterBankAccountName")
                      : i18n.t("deposit.msgPlsEnterAccount")
                  }
                  label={
                    (config.features.Deposit_CustomBankNameTranslation
                      ? i18n.t("mgm.msgPlsEnterAccount")
                      : config.features.Deposit_EnglishName
                      ? i18n.t("bet28.BankAccountName")
                      : i18n.t("deposit.msgPlsEnterAccount")) +
                    (config.features.Deposit_AddTips
                      ? " *" + i18n.t("mgm.accountDepositTips")
                      : "")
                  }
                  value={this.props.account}
                  onChange={(e) => this.props.handleAccountChange(e)}
                ></Textbox>
              )
            );
          }
        })()}
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.props.amount}
          onChange={this.props.handleAmountChange}
          type={"number"}
          placeholder={
            i18n.t("deposit.msgPleaseEnter") +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.from
            ) +
            "-" +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.to
            ) +
            i18n.t("deposit.dollor")
          }
          label={i18n.t("deposit.depositAmount")}
          custom={
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].channel[
              this.props.selectedChannelIndex
            ].fees > 0 && (
              <>
                <FeeSpot>
                  {i18n.t("fees.deposit")}:{" "}
                  <span>
                    {
                      this.props.wallet.depositTypeList[
                        this.props.selectedPaymentIndex
                      ].method[this.props.selectedMethodIndex].channel[
                        this.props.selectedChannelIndex
                      ].fees
                    }
                    %
                  </span>
                </FeeSpot>
              </>
            )
          }
        ></Textbox>
        {this.props.wallet.depositTypeList[
          this.props.selectedPaymentIndex
        ].paymentcode.toUpperCase() === "UMPAY" && (
          <Remark>{i18n.t("deposit.ppRemark")}</Remark>
        )}
        {(() => {
          if (
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].methodcode === "Crypto"
          ) {
            if (
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .paymentcode === "LeePay"
            ) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                  <LimitAmount>{` ${this.props.exchangeRate.buyprice}`}</LimitAmount>
                  <LimitLabel style={{ marginLeft: "26px" }}>
                    {i18n.t("deposit.expectedPayment")}
                  </LimitLabel>{" "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? (
                          this.props.amount / this.props.exchangeRate.buyprice
                        ).toFixed(2)
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            } else {
              return Object.keys(this.props.exchangeRate).map((key) => {
                return Object.keys(this.props.exchangeRate[key]).map((key2) => {
                  if (key2 === "HKD") {
                    return (
                      <ExchangeRateContainer style={{ marginTop: "4px" }}>
                        <LimitLabel>
                          {i18n.t("deposit.exchangeRate")}:{" "}
                        </LimitLabel>
                        <LimitAmount>{` ${this.props.exchangeRate[key][key2].rate}`}</LimitAmount>
                        <LimitLabel style={{ marginLeft: "26px" }}>
                          {i18n.t("deposit.expectedPayment")}
                        </LimitLabel>{" "}
                        <LimitAmount>{` ${
                          isNaN(this.props.amount) === false
                            ? (
                                this.props.amount /
                                this.props.exchangeRate[key][key2].rate
                              ).toFixed(2)
                            : 0
                        }`}</LimitAmount>
                      </ExchangeRateContainer>
                    );
                  }
                });
              });
            }
          }
        })()}
        <CustomText>
          <CustomLabel>{i18n.t("deposit.promotion")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value={""}>
                {i18n.t("deposit.msgPlsSelectPromotion")}
              </option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                      "DepositReward",
                      "DepositAccumulateRoulette",
                    ].indexOf(item.promotionType) >= 0 &&
                    (item.promotionType === "DepositReward"
                      ? this.props.amount >=
                        item.campaignDetail.depositMinimumLimit
                      : true)
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        {config.features.Deposit_Withdrawal_PlayerNote &&
          (isEwallet || isPulsa) && (
            <Textbox
              style={{ margin: "20px auto 20px auto" }}
              value={this.props.playerNote}
              onChange={this.props.handlePlayerNoteChange}
              placeholder={i18n.t("deposit.plsEnterPlayerNote")}
              label={i18n.t("deposit.playerNote")}
            ></Textbox>
          )}
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={
            this.props.step === 1
              ? i18n.t("common.nextStep")
              : this.props.step === 2
              ? "上传"
              : ""
          }
          onClick={this.props.handleDepositClick}
          disabled={(() => {
            const paymentcode =
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase();
            const transferlimit =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit;

            if (
              this.props.disabled === true ||
              ((paymentcode.toUpperCase() === "MANUAL" ||
                paymentcode.toUpperCase() === "APPLEPAY") &&
                this.props.account === "") ||
              this.props.amount < transferlimit.from ||
              this.props.amount > transferlimit.to
            ) {
              return true;
            } else {
              return false;
            }
          })()}
        ></Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainHKJP));
