import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { walletAction } from "../../../api-services/actions/walletAction";
import { generalAction } from "../../../api-services/actions/generalAction";
import { WalletService } from "../../../api-services/services/WalletService";
import {
  RESET_WALLETRESULT,
  WALLET_HIDEMESSAGE,
} from "../../../api-services/constant/actionType";
import { withRouter } from "react-router-dom";
import Common from "../../../utils/Common";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Header from "../Share/Header";

import { withStyles } from "@material-ui/core/styles";

import "react-lazy-load-image-component/src/effects/blur.css";

import Modal from "@material-ui/core/Dialog";
import Loading from "../../Wap/Share/Loading";

import i18n from "../../../utils/i18n";

import Details from "./Details";

import DetailsManual from "./DetailsManual";
import config from "../../../config/config";
import Main from "./Main";
import MainHKJP from "./MainHKJP";
import PopupAnnouncement from "../../Share/PopupAnnouncement";
const Container = styled.div`
  padding-top: 85px;
`;
const BalanceLabel = styled.div`
  float: right;
  margin: 20px 20px 0 0;

  font-size: 30px;
  font-weight: 600;

  text-align: right;
  color: ${({ theme }) => theme.balance};
`;

const StyledAppBar = withStyles({
  root: {
    top: "89px",

    backgroundColor: "#f1f1f1",
    boxShadow: "none",
  },
})(AppBar);

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
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 30px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
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

const CustomTabs = styled(Tabs)`
  background: ${({ theme }) => theme.tabbar};
`;

const TabButtonContainer = styled.div`
  height: 90px;
  padding-top: 30px;
  margin-left: 50px;
  margin-top: -90px;
`;

const ButtonAddCard = styled.div`
  width: 100px;
  height: 60px;
  border: 1px solid #d9d9d9;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:before {
    content: "+";
    width: 50px;
    height: 50px;
    font-size: 50px;
    line-height: 50px;
  }
`;

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedMethodIndex: 0,

      selectedChannelIndex: 0,
      depositPromotion: this.props.match.params.promotionid,
      amount: "",
      exchangeRate: { buyprice: 0, sellprice: 0 },
      step: 1,
      upload: "",

      isMaintenance: false,

      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
      disabled: false,
      files: null,
      fileInput: Math.random().toString(36),
      openPopup: false,
      url: "",
      openAnnouncement: config.features.DepositNotification,
      playerNote: "",
      selectedBankCard: "",
      showTabContainer: true,
    };
    this.state = { ...this.initialState, name: "", account: "" };
  }
  bankInfo = null;

  async componentDidMount() {
    if (this.props.token != null) {
      await this.props.getDepositMethod();
      this.props.getPromotion();
      if (this.state.paymentId) {
        WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
          (e) => {
            if (e.IsSuccess) {
              this.setState({
                step: 5,
                depositDetail: e.data,
                amount: e.data.amount,
                channelname: e.data.bankname,
                methodcode: e.data.methodname,
                bankaccount: e.data.bankaccount,
                showTabContainer: false,
              });
            }
          }
        );
      }
      if (
        config.features.Deposit_AddCard &&
        this.props.wallet.bankCardList.length > 0 &&
        this.props.wallet.bankCardList !== null
      ) {
        var defaultCard = this.props.wallet.bankCardList.filter(
          (item) => item.default
        );
        if (defaultCard.length > 0) {
          this.handleBankCardChange({ target: { value: defaultCard[0].id } });
        }
      }
      this.countDownInterval = setInterval(() => {
        this.props.getDepositMethod(); // call api every 30 mins
      }, 30 * 60 * 1000);
    } else {
      this.props.appHistory.replace("/" + i18n.language + "/login");
    }
  }

  componentDidUpdate(preProps, preState) {
    if (config.features.Deposit_AutofillFirstCard) {
      if (preProps.wallet !== this.props.wallet) {
        this.setState({
          account:
            preState.account === ""
              ? this.props.wallet.bankCardList.length > 0
                ? this.props.wallet.bankCardList[0].detail.bankAccount ||
                  this.props.wallet.bankCardList[0].detail.address ||
                  this.props.wallet.bankCardList[0].detail.phone
                : ""
              : preState.account,
          name:
            preState.account === ""
              ? this.props.account.info.member_name !== ""
                ? this.props.account.info.member_name
                : ""
              : preState.name,
        });
      }
    }

    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
        if (config.features.Deposit_DualPage) {
          this.setState({
            ...this.state,
            step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
            loading: false,
            showTabContainer: false,
          });
        } else {
          if (
            (config.features.Deposit_SplitUsdt &&
              payment.alteredpaymentcode &&
              payment.alteredpaymentcode.toUpperCase() === "MANUAL") ||
            payment.paymentcode.toUpperCase() === "MANUAL"
          ) {
            if (config.features.Deposit_UploadRequired) {
              this.props.doUploadDepositProof(
                response.data,
                this.state.files[0]
              );
              this.setState({
                ...this.state,
                loading: false,
              });
            } else {
              if (this.state.files !== null) {
                if (this.state.files.length > 0) {
                  this.props.doUploadDepositProof(
                    response.data,
                    this.state.files[0]
                  );
                }
              }
              this.setState({
                ...this.state,
                step: 3,
                showTabContainer: false,
              });
            }
          } else {
            if (payment.paymentcode.toUpperCase() === "HELP2PAY") {
              this.setState({
                ...this.state,
                openPopup: true,
                step: 3,
                url:
                  config.baseUrl.replace("/api/", "") +
                  response.data.paymenturl,
                showTabContainer: false,
              });
            } else {
              this.setState({
                ...this.state,
                step: 3,
                showTabContainer: false,
              });
            }
          }
        }
      } else {
        this.props.alert("", this.props.wallet.depositResult.info);
        this.setState({ ...this.state, loading: false });
        if (
          this.props.wallet.depositTypeList[
            this.state.selectedPaymentIndex
          ].paymentcode.toUpperCase() === "WANDAPAY"
        ) {
          if (!this.props.account.info.member_name) {
            this.props.history.push("/" + i18n.language + "/profile/name");
          }
        }
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({
          ...this.initialState,
          fileInput: Math.random().toString(36),
        });
        this.props.alert("", i18n.t("deposit.uploadSuccess"));
      } else {
        this.props.alert("", this.props.wallet.depositUploadResult.info);
        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preState.selectedPaymentIndex !== this.state.selectedPaymentIndex ||
      preState.selectedMethodIndex !== this.state.selectedMethodIndex ||
      preState.selectedChannelIndex !== this.state.selectedChannelIndex
    ) {
      if (
        this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
          .method[this.state.selectedMethodIndex].methodcode === "Crypto"
      ) {
        if (
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
            .paymentcode === "LeePay"
        ) {
          WalletService.GetLeePayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({ ...this.state, exchangeRate: response.data });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        } else {
          WalletService.GetUmPayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({
                ...this.state,
                exchangeRate: response.data.rate,
              });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          exchangeRate: this.initialState.exchangeRate,
        });
      }
    }
    if (
      config.features.Deposit_AddCard &&
      preProps.wallet.bankCardList !== this.props.wallet.bankCardList &&
      this.props.wallet.bankCardList.length > 0 &&
      this.props.wallet.bankCardList !== null
    ) {
      var defaultCard = this.props.wallet.bankCardList.filter(
        (item) => item.default
      );
      if (defaultCard.length > 0) {
        this.handleBankCardChange({ target: { value: defaultCard[0].id } });
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }
  handleRestartClick = async (e) => {
    this.setState({ ...this.initialState });
    await this.props.resetDeposit();
    if (
      config.features.Deposit_AddCard &&
      this.props.wallet.bankCardList.length > 0 &&
      this.props.wallet.bankCardList !== null
    ) {
      var defaultCard = this.props.wallet.bankCardList.filter(
        (item) => item.default
      );
      if (defaultCard.length > 0) {
        this.handleBankCardChange({ target: { value: defaultCard[0].id } });
      }
    }
  };

  handleAmountChange = (e) => {
    this.setState({
      ...this.state,
      amount: e.target.value.replace(/,/g, ""),
    });
  };

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  uploadImage = (e) => {
    this.setState({
      ...this.state,
      upload: e.target.files[0],
    });
  };

  handleDepositClick = () => {
    this.setState({ ...this.state, disabled: true });
    var payment =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];
    var bankCardIndex = this.props.wallet.bankCardList.findIndex(
      (item) => item.id === this.state.selectedBankCard
    );

    const depositMethodSwitcher = (method) => {
      switch (method) {
        case "banktransfer":
          return "bank";
        case "crypto":
          return "crypto";
        case "thirdparty":
          return "thirdparty";
        default:
          return "bank";
      }
    };

    if (
      (config.features.Deposit_SplitUsdt &&
        payment.alteredpaymentcode &&
        payment.alteredpaymentcode.toUpperCase() === "MANUAL") ||
      payment.paymentcode.toUpperCase() === "MANUAL"
    ) {
      // handle manual deposit
      if (method.methodcode === "BankTransfer") {
        if (config.features.Deposit_AddCard) {
          this.props.doBankDepositWithDetail(
            this.state.name,
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_AddCard
              ? this.props.wallet.bankCardList[bankCardIndex].detail
              : null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : ""
          );
        } else {
          this.props.doBankDeposit(
            this.state.name,
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : ""
          );
        }
      }
      if (method.methodcode === "FPS") {
        if (config.features.Deposit_FPSWithName) {
          this.props.doFPSDepositWithName(
            this.state.name,
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        } else {
          this.props.doFPSDeposit(
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        }
      }
      if (method.methodcode === "Usdt") {
        this.props.doUsdtDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
      if (method.methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      }
      if (method.methodcode === "Pulsa") {
        let phone = this.props.wallet.bankCardList[bankCardIndex]
        ? this.props.wallet.bankCardList[bankCardIndex].detail.phone
        : "";
        if (config.features.Deposit_AddCard) {
          this.props.doPulsaDepositWithDetail(
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : null,
            config.features.Deposit_AddCard
              ? this.props.wallet.bankCardList[bankCardIndex].detail
              : null,
            config.features.Deposit_ManualDepositPassPhone ? phone : null
          );
        } else {
          this.props.doPulsaDeposit(
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : null,
            config.features.Deposit_ManualDepositPassPhone ? phone : null
          );
        }
      }
      if (method.methodcode === "EWallet") {
        let emoneyname = this.props.wallet.bankCardList[bankCardIndex]
          ? this.props.wallet.bankCardList[bankCardIndex].detail.name ||
            this.props.wallet.bankCardList[bankCardIndex].detail.eMoneyName
          : "";
        let phone = this.props.wallet.bankCardList[bankCardIndex]
          ? this.props.wallet.bankCardList[bankCardIndex].detail.phone
          : "";
        if (config.features.Deposit_AddCard) {
          this.props.doEWalletDepositWithDetail(
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : null,
            config.features.Deposit_AddCard
              ? this.props.wallet.bankCardList[bankCardIndex].detail
              : null,
            emoneyname,
            config.features.Deposit_ManualDepositPassPhone ? phone : null
          );
        } else {
          this.props.doEWalletDeposit(
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : null,
            emoneyname,
            config.features.Deposit_ManualDepositPassPhone ? phone : null
          );
        }
      }
    } else {
      this.props.performDeposit(
        this.state.amount.replace(/,/g, ""),
        channel.id,
        this.state.depositPromotion,
        payment.paymentcode,
        depositMethodSwitcher(method.methodcode.toLowerCase())
      );
      // if (method.methodcode === "Crypto") {
      //   this.props.doCryptoDeposit(
      //     this.state.amount.replace(/,/g, ""),
      //     channel.id,
      //     this.state.depositPromotion,
      //     payment.paymentcode
      //   );
      // } else {
      //   this.props.doBankDeposit2(
      //     this.state.amount.replace(/,/g, ""),
      //     channel.id,
      //     this.state.depositPromotion,
      //     payment.paymentcode
      //   );
      // }
    }
    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };

  handlePaymentChange = (e, value) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedMethodIndex: 0,

        selectedChannelIndex: 0,
        selectedPaymentIndex: value,
      });
    }
  };
  performUploadImage = (file) => {
    this.props.doUploadDepositProof(
      this.props.wallet.depositResult
        ? this.props.wallet.depositResult.data
        : this.state.paymentId,
      file
    );
  };
  handleMethodChange = (e) => {
    this.setState({
      ...this.state,
      selectedChannelIndex: 0,
      selectedMethodIndex: e.target.value,
    });
  };
  handleChannelChange = (e) => {
    this.setState({
      ...this.state,
      selectedChannelIndex: e.target.value,
    });
  };
  handleAccountChange = (e) => {
    this.setState({
      ...this.state,
      account: e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };
  handlePromotionChange = (e) => {
    this.setState({
      ...this.state,
      depositPromotion: e.target.value,
    });
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
  handlePlayerNoteChange = (e) => {
    this.setState({
      ...this.state,
      playerNote: e.target.value,
    });
  };
  handleSelectAccountChange = (e) => {
    var bankCardIndex = this.props.wallet.bankCardList.findIndex(
      (item) => item.id === e.target.value
    );
    this.setState({
      ...this.state,
      selectedBankCard: e.target.value,
      account:
        this.props.wallet.bankCardList[bankCardIndex].detail.bankAccount ||
        this.props.wallet.bankCardList[bankCardIndex].detail.address ||
        this.props.wallet.bankCardList[bankCardIndex].detail.phone,
    });
  };
  handleBankCardChange = async (e) => {
    var paymentIndex = 0;
    var methodIndex = 0;
    var channelIndex = 0;

    if (config.features.Deposit_AddCard && e.target.value !== "") {
      var bankCardIndex = this.props.wallet.bankCardList.findIndex(
        (item) => item.id === e.target.value
      );
      loop1: for (
        var i = 0;
        i < this.props.wallet.depositTypeList.length;
        i++
      ) {
        for (
          var j = 0;
          j < this.props.wallet.depositTypeList[i].method.length;
          j++
        ) {
          for (
            var k = 0;
            k < this.props.wallet.depositTypeList[i].method[j].channel.length;
            k++
          ) {
            if (
              this.props.wallet.depositTypeList[i].method[j].channel[k]
                .channelid ===
              this.props.wallet.bankCardList[bankCardIndex].paymentchannelid
            ) {
              paymentIndex = i;
              methodIndex = j;
              channelIndex = k;
              break loop1;
            }
          }
        }
      }
    }
    this.setState({
      ...this.state,
      selectedBankCard: e.target.value,
      selectedPaymentIndex: paymentIndex,
      selectedMethodIndex: methodIndex,
      selectedChannelIndex: channelIndex,
      name: this.props.wallet.bankCardList[bankCardIndex].detail.name || "",
    });
  };
  handleClosePopup = () => {
    this.setState({ ...this.state, openPopup: false });
  };
  handleOpenPopupUrl = () => {
    if (this.state.url !== "") {
      window.open(this.state.url, "_blank");
    } else {
      window.open(this.props.wallet.depositResult.data.paymenturl, "_blank");
    }

    this.setState({
      ...this.state,
      openPopup: false,
      url: "",
    });
  };
  brandSwitcher = (brand) => {
    switch (brand) {
      case "GMO":
        return "GMO";
      default:
        return "";
    }
  };

  handleAddCard = () => {
    this.props.navigate("/card/add?do=deposit");
  };

  render() {
    const switchView = (view) => {
      switch (view) {
        case 1:
          if (config.features.Deposit_DualPage) {
            return (
              <MainHKJP
                name={this.state.name}
                handleNameChange={this.handleNameChange}
                handleMethodChange={this.handleMethodChange}
                handleChannelChange={this.handleChannelChange}
                handleAccountChange={this.handleAccountChange}
                handlePromotionChange={this.handlePromotionChange}
                handleAmountChange={this.handleAmountChange}
                handleDepositClick={this.handleDepositClick}
                selectedPaymentIndex={this.state.selectedPaymentIndex}
                selectedMethodIndex={this.state.selectedMethodIndex}
                selectedChannelIndex={this.state.selectedChannelIndex}
                depositPromotion={this.state.depositPromotion}
                account={this.state.account}
                amount={this.state.amount}
                exchangeRate={this.state.exchangeRate}
                step={this.state.step}
                disabled={this.state.disabled}
                playerNote={this.state.playerNote}
                handlePlayerNoteChange={this.handlePlayerNoteChange}
              ></MainHKJP>
            );
          } else {
            return (
              <Main
                name={this.state.name}
                handleNameChange={this.handleNameChange}
                handleMethodChange={this.handleMethodChange}
                handleChannelChange={this.handleChannelChange}
                handleAccountChange={this.handleAccountChange}
                handlePromotionChange={this.handlePromotionChange}
                handleAmountChange={this.handleAmountChange}
                handleDepositClick={this.handleDepositClick}
                handleSelectAccountChange={this.handleSelectAccountChange}
                selectedPaymentIndex={this.state.selectedPaymentIndex}
                selectedMethodIndex={this.state.selectedMethodIndex}
                selectedChannelIndex={this.state.selectedChannelIndex}
                depositPromotion={this.state.depositPromotion}
                account={this.state.account}
                amount={this.state.amount}
                exchangeRate={this.state.exchangeRate}
                step={this.state.step}
                disabled={this.state.disabled}
                handleFileChange={this.handleFileChange}
                key={this.state.fileInput}
                files={this.state.files}
                handleClosePopup={this.handleClosePopup}
                openPopup={this.state.openPopup}
                handleOpenPopupUrl={this.handleOpenPopupUrl}
                alert={this.props.alert}
                playerNote={this.state.playerNote}
                handlePlayerNoteChange={this.handlePlayerNoteChange}
                selectedBankCard={this.state.selectedBankCard}
                handleBankCardChange={this.handleBankCardChange}
                bankCardList={
                  config.features.Deposit_AddCard
                    ? this.props.wallet.bankCardList.sort(
                        (a, b) => b.default - a.default
                      )
                    : this.props.wallet.bankCardList
                }
              ></Main>
            );
          }

        case 2:
        case 3:
          return (
            <Details
              alert={this.props.alert}
              performUploadImage={this.performUploadImage}
              amount={this.state.amount}
              depositResult={this.props.wallet.depositResult}
              methodcode={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].methodcode
              }
              channel={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ]
              }
              handleRestartClick={this.handleRestartClick}
              isManual={
                (config.features.Deposit_SplitUsdt &&
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].alteredpaymentcode &&
                  this.props.wallet.depositTypeList[
                    this.state.selectedPaymentIndex
                  ].alteredpaymentcode.toUpperCase() === "MANUAL") ||
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode.toUpperCase() === "MANUAL"
              }
              isCrypto={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].methodcode === "Crypto"
              }
              depositType={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].paymentcode
              }
              extended={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].extended
              }
            ></Details>
          );
        case 5:
          return (
            <DetailsManual
              methodcode={this.state.methodcode}
              channelname={this.state.channelname}
              depositDetail={this.state.depositDetail}
              bankaccount={this.state.bankaccount}
              paymentId={this.state.paymentId}
              depositResult={this.props.wallet.depositResult}
              isManual={true}
              amount={this.state.amount}
              alert={this.props.alert}
              performUploadImage={this.performUploadImage}
              handleRestartClick={this.handleRestartClick}
              extended={
                this.props.wallet.depositTypeList[
                  this.state.selectedPaymentIndex
                ].method[this.state.selectedMethodIndex].channel[
                  this.state.selectedChannelIndex
                ].extended
              }
            ></DetailsManual>
          );
        default:
          return "";
      }
    };
    return (
      <Container>
        {(() => {
          if (
            config.features.DepositNotification &&
            this.props.ui.deposits &&
            this.props.ui.deposits.length > 0
          ) {
            var row = this.props.ui.deposits[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  this.setState({ ...this.state, openAnnouncement: false });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("deposit.title")}
          fixedColor={config.brand === "GMO"}
          rightContent={
            <BalanceLabel>
              {Common.formatNumberWithThousand(
                this.props.game.providerList.reduce(
                  (total, item) =>
                    item.transferwallet === true
                      ? (total += item.balance)
                      : (total += 0),
                  0
                ) + this.props.wallet.mainBalance
              )}
            </BalanceLabel>
          }
        ></Header>{" "}
        {(() => {
          if (this.props.wallet.depositTypeList.length <= 0) {
            return <React.Fragment></React.Fragment>;
          }
          return (
            <React.Fragment>
              {config.features.Deposit_AddCard ? (
                <React.Fragment>
                  {this.state.showTabContainer && (
                    <TabButtonContainer>
                      <ButtonAddCard
                        onClick={this.handleAddCard}
                      ></ButtonAddCard>
                    </TabButtonContainer>
                  )}
                </React.Fragment>
              ) : (
                <StyledAppBar>
                  <CustomTabs
                    value={this.state.selectedPaymentIndex}
                    onChange={this.handlePaymentChange}
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {this.props.wallet.depositTypeList
                      .sort(function (a, b) {
                        return a.displayorder - b.displayorder;
                      })
                      .map((item, index) => {
                        return (
                          <Tab
                            key={index}
                            value={index}
                            label={i18n.t(item.paymentcode)}
                          >
                            {i18n.t(item.paymentcode)}
                          </Tab>
                        );
                      })}
                  </CustomTabs>
                </StyledAppBar>
              )}
              {(() => {
                return switchView(this.state.step);
              })()}
            </React.Fragment>
          );
        })()}
        <StyledModalPopup
          onClose={this.props.hideAlert}
          open={this.props.wallet.message !== ""}
        >
          <DialoTitle>{i18n.t("common.info")}</DialoTitle>
          <DialoMessage>{this.props.wallet.message}</DialoMessage>
          <ButtonConfirm onClick={this.props.hideAlert}>
            {i18n.t("common.confirm")}
          </ButtonConfirm>
        </StyledModalPopup>
        <Loading show={this.props.wallet.depositLoading}></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    account: state.account,
    token: state.account.token,
    wallet: state.wallet,
    general: state.general,
    game: state.game,
    ui: state.ui,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doDepositUpload: (file, fileType, orderId) =>
      dispatch(walletAction.doManualDepositUpload(file, fileType, orderId)),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),

    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),

    doBankDeposit: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype,
      note
    ) => {
      dispatch(
        walletAction.doBankDeposit(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype,
          note
        )
      );
    },
    doFPSDeposit: (account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doFPSDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDepositWithName: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doFPSDepositWithName(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doThirdPartyDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doUsdtDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doUsdtDeposit(amount, paymentid, promotionid, banktype)
      );
    },
    doPulsaDeposit: (amount, paymentid, promotionid, banktype, playerNote, phone) => {
      dispatch(
        walletAction.doPulsaDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          playerNote,
          phone
        )
      );
    },
    doEWalletDeposit: (
      amount,
      paymentid,
      promotionid,
      banktype,
      playerNote,
      emoneyname,
      phone
    ) => {
      dispatch(
        walletAction.doEWalletDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          playerNote,
          emoneyname,
          phone
        )
      );
    },
    doBankDeposit2: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doBankDeposit2(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    doCryptoDeposit: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doCryptoDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    performDeposit: (amount, payment_id, promotionid, paymentcode, type) => {
      dispatch(
        walletAction.performDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode,
          type
        )
      );
    },
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    hideAlert: () =>
      dispatch({
        type: WALLET_HIDEMESSAGE,
      }),
    resetDeposit: () => {
      return dispatch({
        type: RESET_WALLETRESULT,
      });
    },
    doBankDepositWithDetail: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype,
      detail,
      note
    ) => {
      dispatch(
        walletAction.doBankDepositWithDetail(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype,
          detail,
          note
        )
      );
    },
    doPulsaDepositWithDetail: (
      amount,
      paymentid,
      promotionid,
      banktype,
      playerNote,
      detail,
      phone
    ) => {
      dispatch(
        walletAction.doPulsaDepositWithDetail(
          amount,
          paymentid,
          promotionid,
          banktype,
          playerNote,
          detail,
          phone
        )
      );
    },
    doEWalletDepositWithDetail: (
      amount,
      paymentid,
      promotionid,
      banktype,
      playerNote,
      detail,
      emoneyname,
      phone
    ) => {
      dispatch(
        walletAction.doEWalletDepositWithDetail(
          amount,
          paymentid,
          promotionid,
          banktype,
          playerNote,
          detail,
          emoneyname,
          phone
        )
      );
    },
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Deposit));
