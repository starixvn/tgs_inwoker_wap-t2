import React from "react";
import styled from "styled-components";
import { Component } from "react";
import { TextField, Select, FormControl, withStyles } from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";

import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
import config from "../../../../config/config";

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "340px",
    height: "47.63px",

    marginRight: "5px",
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
const TabButton = styled.div`
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px ${props.theme.primary};
      color: ${props.theme.primary};;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;
const TunnelButton = styled(TabButton)`
  min-width: 133px;
  height: 41px;

  margin-top: 3px;
  padding: 10px 20px 0 20px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);
const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const ExchangeRateContainer = styled.div``;

const Remark = styled.div`
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;

const TitleHint = styled.span`
  opacity: 0.5;
  margin-left: 10px;
`;

const GapLeaver = styled.div`
  padding-left: 50px;
`;

const FeeSpot = styled.div`
  color: ${({ theme }) => theme.primary};

  span {
    font-weight: bold;
  }
`;
class NewStepOne extends Component {
  render() {
    const {
      amount,
      onAmountChange,
      name,
      onNameChange,
      selectedMethodIndex,
      onMethodChange,
      selectedChannelIndex,
      onChannelChange,
      paymentType,
      onNextClick,
      exchangeRate,
      playerNote,
      onPlayerNoteChange,
    } = this.props;
    if (paymentType === null) return <></>;

    const methodList = paymentType.method;
    var isEwallet =
      methodList[selectedMethodIndex].methodcode.toUpperCase() === "EWALLET";
    var isPulsa =
      methodList[selectedMethodIndex].methodcode.toUpperCase() === "PULSA";

    console.log(paymentType.paymentcode);
    return (
      <>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>

          <SubTitle>
            {i18n.t("deposit.msgPlsSelectPayment")}{" "}
            <TitleHint>
              {methodList &&
                paymentType.paymentcode === "ZeroNineNinePay" &&
                "(" + i18n.t("hint._099") + ")"}
            </TitleHint>
          </SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          {methodList.map((item, index) => {
            return (
              <TunnelButton
                key={index}
                onClick={() => onMethodChange(index)}
                active={selectedMethodIndex === index}
              >
                {i18n.t(item.methodcode)}
              </TunnelButton>
            );
          })}
        </SelectionContainer>

        <SplitLine></SplitLine>
        {(() => {
          if (methodList.length > 0 && selectedMethodIndex !== -1) {
            return (
              <>
                {!config.features.Deposit_HideDepositChannel && (
                  <>
                    <SubHeaderContainer>
                      <NumberContainer>2</NumberContainer>

                      <SubTitle>
                        {i18n.t("deposit.msgPlsSelectMethod")}
                      </SubTitle>
                    </SubHeaderContainer>
                    <SelectionContainer>
                      {methodList[selectedMethodIndex].channel.map(
                        (item, index) => {
                          return (
                            <TunnelButton
                              key={index}
                              onClick={() => onChannelChange(index)}
                              active={selectedChannelIndex === index}
                            >
                              {item.channelname}
                            </TunnelButton>
                          );
                        }
                      )}
                    </SelectionContainer>
                    <SplitLine></SplitLine>
                  </>
                )}

                {(() => {
                  if (
                    paymentType.paymentcode.toUpperCase() === "MANUAL" ||
                    paymentType.paymentcode.toUpperCase() === "APPLEPAY"
                  ) {
                    return (
                      !config.features.Deposit_RemoveName && (
                        <>
                          <SubHeaderContainer>
                            <NumberContainer>3</NumberContainer>
                            <SubTitle>
                              {config.features.Deposit_CustomBankNameTranslation
                                ? i18n.t("mgm.msgPlsEnterAccount")
                                : config.features.Deposit_EnglishName
                                ? i18n.t("bet28.BankAccountName")
                                : i18n.t("deposit.msgPlsEnterAccount")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            <TextField
                              style={{
                                height: "38px",
                                width: "258px",
                                float: "left",
                                marginRight: "5px",
                                padding: 0,
                              }}
                              placeholder={
                                config.features
                                  .Deposit_CustomBankNameTranslation
                                  ? i18n.t("mgm.msgPlsEnterAccount")
                                  : config.features.Deposit_EnglishName
                                  ? i18n.t("bet28.msgEnterBankAccountName")
                                  : i18n.t("deposit.msgPlsEnterAccount")
                              }
                              onChange={onNameChange}
                              outputFormat="string"
                              variant="outlined"
                              autoComplete="off"
                              value={name}
                            ></TextField>
                          </SelectionContainer>
                          {config.features.Deposit_AddTips && (
                            <Remark> {i18n.t("mgm.accountDepositTips")}</Remark>
                          )}
                          <SplitLine></SplitLine>
                        </>
                      )
                    );
                  }
                })()}

                <SubHeaderContainer>
                  <NumberContainer>
                    {paymentType.paymentcode.toUpperCase() === "MANUAL" ||
                    paymentType.paymentcode.toUpperCase() === "APPLEPAY" ||
                    !config.features.Deposit_RemoveName
                      ? "4"
                      : "3"}
                  </NumberContainer>

                  <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
                  {methodList[selectedMethodIndex].channel[selectedChannelIndex]
                    .fees > 0 && (
                    <GapLeaver>
                      <FeeSpot>
                        {i18n.t("fees.deposit")}:{" "}
                        <span>
                          {
                            methodList[selectedMethodIndex].channel[
                              selectedChannelIndex
                            ].fees
                          }
                          %
                        </span>
                      </FeeSpot>
                    </GapLeaver>
                  )}
                </SubHeaderContainer>
                <SelectionContainer>
                  <TextField
                    style={{
                      height: "38px",
                      width: "220px",
                      float: "left",
                      marginRight: "5px",
                      padding: 0,
                    }}
                    placeholder={i18n.t("deposit.plsEnterDepositAmount")}
                    onChange={onAmountChange}
                    outputFormat="string"
                    variant="outlined"
                    autoComplete="off"
                    value={amount}
                    pattern="[0-9]*"
                    type={"number"}
                  ></TextField>

                  <LimitPopupContainer>
                    <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                    <LimitAmount>
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.from
                      )}{" "}
                      -{" "}
                      {Common.formatNumberWithThousand(
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].transferlimit.to
                      )}
                    </LimitAmount>
                  </LimitPopupContainer>
                  {(() => {
                    if (
                      methodList[selectedMethodIndex].methodcode === "Crypto"
                    ) {
                      if (paymentType.paymentcode.toUpperCase() === "LEEPAY") {
                        return (
                          <ExchangeRateContainer style={{ marginTop: "4px" }}>
                            <LimitLabel>
                              {i18n.t("deposit.exchangeRate")}:{" "}
                            </LimitLabel>
                            <LimitAmount>{` ${exchangeRate.buyprice}`}</LimitAmount>
                            <LimitLabel style={{ marginLeft: "26px" }}>
                              {i18n.t("deposit.expectedPayment")}
                            </LimitLabel>{" "}
                            <LimitAmount>{` ${
                              isNaN(amount) === false
                                ? (amount / exchangeRate.buyprice).toFixed(2)
                                : 0
                            }`}</LimitAmount>
                          </ExchangeRateContainer>
                        );
                      } else {
                        return Object.keys(exchangeRate).map((key) => {
                          return Object.keys(exchangeRate[key]).map((key2) => {
                            if (key2 === "HKD") {
                              return (
                                <ExchangeRateContainer
                                  style={{ marginTop: "4px" }}
                                >
                                  <LimitLabel>
                                    {i18n.t("deposit.exchangeRate")}:{" "}
                                  </LimitLabel>
                                  <LimitAmount>{` ${exchangeRate[key][key2].rate}`}</LimitAmount>
                                  <LimitLabel style={{ marginLeft: "26px" }}>
                                    {i18n.t("deposit.expectedPayment")}
                                  </LimitLabel>{" "}
                                  <LimitAmount>{` ${
                                    isNaN(amount) === false
                                      ? (
                                          amount / exchangeRate[key][key2].rate
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
                  {paymentType.paymentcode.toUpperCase() === "UMPAY" && (
                    <Remark>{i18n.t("deposit.ppRemark")}</Remark>
                  )}
                </SelectionContainer>
                <SplitLine></SplitLine>
                <SubHeaderContainer>
                  <NumberContainer>
                    {paymentType.paymentcode.toUpperCase() === "MANUAL" ||
                    paymentType.paymentcode.toUpperCase() === "APPLEPAY"
                      ? "5"
                      : "4"}
                  </NumberContainer>

                  <SubTitle>{i18n.t("deposit.promotion")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <CustomFormControl>
                    <CustomSelect
                      variant="outlined"
                      value={this.props.depositPromotion}
                      displayEmpty
                      onChange={this.props.handleDepositPromotionChange}
                      native
                    >
                      <option value="">
                        {i18n.t("deposit.msgPlsSelectPromotion")}
                      </option>
                      {this.props.promotionList.map((data, key) => {
                        return (
                          <option value={data.id} key={key}>
                            {data.name}
                          </option>
                        );
                      })}
                    </CustomSelect>
                  </CustomFormControl>
                </SelectionContainer>
                {config.features.Deposit_Withdrawal_PlayerNote &&
                  (isEwallet || isPulsa) && (
                    <React.Fragment>
                      <SplitLine></SplitLine>
                      <SubHeaderContainer>
                        <SubTitle>{i18n.t("deposit.playerNote")}</SubTitle>
                      </SubHeaderContainer>
                      <SelectionContainer>
                        <TextField
                          style={{
                            height: "38px",
                            width: "220px",
                            float: "left",
                            marginRight: "5px",
                            padding: 0,
                          }}
                          placeholder={i18n.t("deposit.plsEnterPlayerNote")}
                          onChange={onPlayerNoteChange}
                          outputFormat="string"
                          variant="outlined"
                          autoComplete="off"
                          value={playerNote}
                        ></TextField>
                      </SelectionContainer>
                    </React.Fragment>
                  )}

                <SplitLine></SplitLine>
                <CustomButton
                  name={i18n.t("common.nextStep")}
                  width={257}
                  marginTop={0}
                  float={"none"}
                  marginLeft={290}
                  handleClick={() => {
                    onNextClick();
                  }}
                  disabled={
                    amount <
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from ||
                    amount >
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to
                  }
                ></CustomButton>
              </>
            );
          }
        })()}
      </>
    );
  }
}

export default NewStepOne;
