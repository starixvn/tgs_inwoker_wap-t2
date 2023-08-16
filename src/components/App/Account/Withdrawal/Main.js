import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import LimitPopupBigPNG from "../../../../assets/images/limit-popup-big.png";
import IconEditPNG from "../../../../assets/images/icon-edit.png";
import IconBankDisablePNG from "../../../../assets/images/icon-bank-disable.png";
import CustomButton from "../../../Share/Button";
import CustomTextField from "../../../Share/TextField";
import i18n from "../../../../utils/i18n";
import Common from "../../../../utils/Common";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { connect } from "react-redux";
import config from "../../../../config/config";
const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #141933;
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

const BankCardButton = styled(Grid)`
  width: auto;
  text-align: left;

  height: 41px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const BankCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconBankDisablePNG}) no-repeat 15px center;
`;
const BankCardButtonLabel = styled.div`
  width: 86px;
  display: inline-block;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
`;
const ManageCardButton = styled(Grid)`
  height: 41px;
  width: auto;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const ManageCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconEditPNG}) no-repeat 15px center;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupBigPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 9px, rgba(122, 145, 153, 1) 10px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 25px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
  margin: 10px 0 0 20px;
`;

const Turnover = styled.div`
  span {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  margin: 0 0 0 0;
  display: flex;
`;

const GameWalletButton = styled.div`
  font-size: 12px;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  width: fit-content;
  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;

  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #ffffff;

  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const Main = (props) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(props.defaultCard);
  const [amount, setAmount] = useState("");

  const [disabled, setDisabled] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [fee, setFee] = useState(0);
  const [paymentList, setPaymentList] = useState(props.wallet.withdrawalList);
  const [exchangeRate, setExchangeRate] = useState(
    config.features.Withdrawal_USDT_ExchangeRate
  );
  const [playerNote, setPlayerNote] = useState("");
  var minValue = [];
  var maxValue = [];
  useEffect(() => {
    if (config.features.Deposit_AddCard && props.cardList.length > 0) {
      getTransferLimit(props.cardList[props.defaultCard].paymentchannelid);
    }
  }, [props.defaultCard]);

  const handleSelectCardChange = (index) => {
    setSelectedCardIndex(index);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePlayerNote = (e) => {
    setPlayerNote(e.target.value);
  };

  const handleWithdrawalClick = (e) => {
    props.onhandleWithdrawalClick(
      props.cardList[selectedCardIndex].id,
      amount,
      undefined,
      playerNote
    );
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const getTransferLimit = (channelId) => {
    //reset everything
    minValue = [];
    maxValue = [];
    setMin(0);
    setMax(0);
    setFee(0);
    //update new data.
    for (var i = 0; i < paymentList.length; i++) {
      const methodList = paymentList[i].channel;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner];
          if (channelList.channelid === channelId) {
            minValue.push(channelList.transferlimit.from);
            maxValue.push(channelList.transferlimit.to);
            setMin(Math.min(...minValue));
            setMax(Math.max(...maxValue));
            setFee(channelList.fees);
          }
        }
      }
    }
  };

  return (
    <>
      <SubHeaderContainer>
        <NumberContainer>1</NumberContainer>

        <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
      </SubHeaderContainer>
      <SelectionContainer>
        {props.cardList.map((item, index) => {
          return (
            <BankCardButton
              key={index}
              active={index === selectedCardIndex}
              onClick={() => {
                handleSelectCardChange(index);
                getTransferLimit(item.paymentchannelid);
              }}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <BankCardButtonIcon items></BankCardButtonIcon>
              <BankCardButtonLabel items>
                {i18n.t("withdrawal.bankCard")}
              </BankCardButtonLabel>
              <BankCardButtonCardNoHL items>
                {(() => {
                  if (
                    item.banktype === "ThirdParty" ||
                    item.banktype === "Coinsph" ||
                    item.banktype === "FPS"
                  ) {
                    if (item.detail.phone) {
                      return item.detail.phone.substring(
                        item.detail.phone.length - 4,
                        item.detail.phone.length
                      );
                    } else if (item.detail.address) {
                      return item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      );
                    }
                  } else if (
                    item.banktype === "Pulsa" ||
                    item.banktype === "EWallet"
                  ) {
                    if (item.detail.phone) {
                      return item.detail.phone.substring(
                        item.detail.phone.length - 4,
                        item.detail.phone.length
                      );
                    } else if (item.detail.address) {
                      return item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      );
                    }
                  } else {
                    if (item.detail.bankAccount) {
                      return item.detail.bankAccount.substring(
                        item.detail.bankAccount.length - 4,
                        item.detail.bankAccount.length
                      );
                    } else if (item.detail.address) {
                      return item.detail.address.substring(
                        item.detail.address.length - 4,
                        item.detail.address.length
                      );
                    }
                  }
                })()}
              </BankCardButtonCardNoHL>
              <BankCardButtonCardNo items>
                {i18n.t("withdrawal.tail")}
              </BankCardButtonCardNo>
            </BankCardButton>
          );
        })}
        <ManageCardButton
          onClick={props.onhandleManageCardClick}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <ManageCardButtonIcon items></ManageCardButtonIcon>
          <Grid items> {i18n.t("withdrawal.manageBank")}</Grid>
        </ManageCardButton>
      </SelectionContainer>
      {config.features.NewTransferUI && (
        <>
          <SplitLine></SplitLine>
          <SubHeaderContainer>
            <NumberContainer>2</NumberContainer>
            <SubTitle>{i18n.t("transfer.msgTransferOutFromGP")}</SubTitle>
            <ButtonWrapper>
              <GameWalletButton
                style={{ marginTop: 0, marginLeft: 10 }}
                onClick={() => {
                  props.performWithdrawFromEveryBrand().then((e) => {
                    if (e.IsSuccess) {
                      props.onhandleRefreshClick();
                    }
                  });
                }}
              >
                {i18n.t("transfer.oneKeyTransferAll")}
              </GameWalletButton>
            </ButtonWrapper>
          </SubHeaderContainer>
        </>
      )}

      <>
        <SplitLine></SplitLine>
        <SubHeaderContainer>
          <NumberContainer>
            {config.features.NewTransferUI ? 3 : 2}
          </NumberContainer>

          <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
          {
            //     <GapLeaver>
            //     <FeeSpot>
            //       {i18n.t("fees.withdraw")}: <span>{fee}%</span>
            //     </FeeSpot>
            //   </GapLeaver>
          }
          {/* {(() => {
            if (
              props.cardList[selectedCardIndex] &&
              props.cardList[selectedCardIndex].banktype === "Usdt"
            ) {
              return (
                <ExchangeRateContainer
                  style={{
                    paddingTop: "1px",
                    paddingLeft: "20px",
                    whiteSpace: "break-spaces",
                  }}
                >
                  <LimitLabel>{i18n.t("deposit.exchangeRate")} : </LimitLabel>
                  <LimitAmount>1</LimitAmount>
                  <LimitLabel> {"\t"} USDT : </LimitLabel>
                  <LimitAmount>{` ${exchangeRate}`}</LimitAmount>
                </ExchangeRateContainer>
              );
            }
          })()} */}
        </SubHeaderContainer>
        <SelectionContainer>
          <CustomTextField
            width={250}
            height={38}
            placeholder={i18n.t("withdrawal.enterAmount")}
            handleTextFieldChange={handleAmountChange}
            variant="outlined"
            autoComplete="off"
            value={amount}
            pattern="[0-9]*"
            type={"number"}
            maxLength={12}
          ></CustomTextField>

          <LimitPopupContainer>
            {Common.formatNumberWithThousand(min)} -{" "}
            {Common.formatNumberWithThousand(max)}
          </LimitPopupContainer>
          {(() => {
            if (
              props.cardList[selectedCardIndex] &&
              props.cardList[selectedCardIndex].banktype === "Usdt"
            ) {
              return (
                <React.Fragment>
                  <div class="clear"></div>
                  <SubHeaderContainer>
                    <SubTitle style={{ margin: "0px" }}>
                      {i18n.t("withdrawal.usdtAmount")}
                    </SubTitle>
                  </SubHeaderContainer>
                  <CustomTextField
                    width={250}
                    height={38}
                    variant="outlined"
                    autoComplete="off"
                    value={
                      isNaN(amount) === false
                        ? (amount * exchangeRate).toFixed(2)
                        : 0
                    }
                    pattern="[0-9]*"
                    type={"number"}
                    disabled={true}
                  ></CustomTextField>
                </React.Fragment>
              );
            }
          })()}
          <div class="clear"></div>
          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <span>
              {Common.formatNumberWithThousand(props.minWithdrawLimit)}
            </span>
          </Turnover>
        </SelectionContainer>
        {config.features.Deposit_Withdrawal_PlayerNote &&
          props.cardList[selectedCardIndex] &&
          (props.cardList[selectedCardIndex].banktype.toUpperCase() ===
            "BANK" ||
            props.cardList[selectedCardIndex].banktype.toUpperCase() ===
              "EWALLET" ||
            props.cardList[selectedCardIndex].banktype.toUpperCase() ===
              "PULSA") && (
            <React.Fragment>
              <SplitLine></SplitLine>
              <SubHeaderContainer>
                <NumberContainer>3</NumberContainer>
                <SubTitle>{i18n.t("withdrawal.playerNote")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <CustomTextField
                  width={250}
                  height={38}
                  placeholder={i18n.t("withdrawal.plsEnterPlayerNote")}
                  handleTextFieldChange={handlePlayerNote}
                  variant="outlined"
                  autoComplete="off"
                  value={playerNote}
                  maxLength={50}
                ></CustomTextField>
              </SelectionContainer>
            </React.Fragment>
          )}

        <CustomButton
          disabled={
            isNaN(parseFloat(amount)) ||
            parseFloat(amount) < min ||
            parseFloat(amount) > max ||
            disabled
          }
          name={i18n.t("common.nextStep")}
          width={255}
          marginTop={0}
          float={"none"}
          marginLeft={290}
          handleClick={handleWithdrawalClick}
        ></CustomButton>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

//test
