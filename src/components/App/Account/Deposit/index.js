import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import IconDepositRedPNG from "../../../../assets/images/icon-deposit-active.png";

import { walletAction } from "../../../../api-services/actions/walletAction";
import { WalletService } from "../../../../api-services/services/WalletService";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { RESET_WALLETRESULT } from "../../../../api-services/constant/actionType";
import { withRouter } from "react-router-dom";

import Loading from "../../../../components/App/Loading";

import UnderConstructionPNG from "../../../../assets/images/underconstruction.png";

import { withSnackbar } from "notistack";
import Step2Form from "./Step2Form";
import Success from "./Success";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import NewStepOne from "./NewStep1";
import NewStepOneHKJP from "./NewStep1HKJP";
import NewStepTwoHKJP from "./NewStep2HKJP";
import config from "../../../../config/config";
import PopupAnnouncement from "../../Home/PopupAnnouncement";
import AddCard from "../Withdrawal/AddCard";
import AddCardSuccess from "../Withdrawal/AddCardSuccess";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;
  width: 100%;
  min-height: 796px;
  background-color: #ffffff;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconDepositRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;

const TabButtonContainer = styled.div`
  padding: 6px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
`;
const TabButton = styled.div`
  font-size: 14px;

  color: #151a34;

  text-align: center;

  width: 104px;

  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #f2f2f2;
  background-position: center 14px;
  background-repeat: no-repeat;

  ${(props) =>
    props.active
      ? `    border: solid 1px #ffffff;color: #fff;

      background-color: ` +
        props.theme.primary +
        `;`
      : `   `};
  &:hover {
    cursor: pointer;
  }
`;

const TabLabel = styled.div`
  margin: 10px 0 6px 0;
`;
const Wrap = styled.div`
  width: 935px;

  position: relative;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px 25px 25px 0px
  margin-top: 14px;
  position: relative;
  min-height: 630px;border-radius: 10px;
`;
const UnderConstructionWrap = styled.div`
  width: 935px;
  height: 100%;

  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
  position: absolute;
  top: 0;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
`;

const ButtonAddCard = styled.div`
  width: 40px;
  height: 35px;
  border: 1px solid #d9d9d9;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:before {
    content: "+";
    width: 25px;
    height: 25px;
    font-size: 25px;
    line-height: 30px;
  }
`;

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedChannelIndex: 0,
      selectedMethodIndex: 0,
      loading: false,
      depositPromotion: this.props.match.params.promotionid,
      amount: "",
      step: 1,
      exchangeRate: { buyprice: 0, sellprice: 0 },
      files: [],
      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
      paymenturl: "",
      openAnnouncement: config.features.DepositNotification,
      playerNote: "",
      showTabContainer: true,
      isAddCardSuccess: false,
      selectedBankCard: "",
    };
    this.state = {
      ...this.initialState,
      name: "",
      account: "",
    };
  }

  async componentDidMount() {
    localStorage.removeItem("depositResult");
    await this.props.getDepositMethod();
    this.props.getPromotion();

    window.addEventListener("storage", this.handStorageMsg, true);
    if (this.state.paymentId) {
      WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
        (e) => {
          if (e.IsSuccess) {
            this.setState({
              ...this.state,
              amount: e.data.amount,
              step: 2,
              depositResult: e.data,
              loading: false,
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
            step: 2,
            depositResult: response,
            loading: false,
            showTabContainer: false,
          });
        } else {
          let url = "";
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
                depositResult: response,
              });
            } else {
              if (this.state.files.length > 0) {
                this.props.doUploadDepositProof(
                  response.data,
                  this.state.files[0]
                );
              }
              this.setState({
                ...this.state,
                step: 3,
                loading: false,
                depositResult: response,
                showTabContainer: false,
              });
            }
          } else {
            this.setState({
              ...this.state,
              step: 3,
              loading: false,
              depositResult: response,
              showTabContainer: false,
            });
            if (payment.paymentcode.toUpperCase() === "HELP2PAY") {
              url =
                config.baseUrl.replace("/api/", "") + response.data.paymenturl;
            }
            if (url !== "") {
              window.open(url, "_blank");
            } else {
              window.open(response.data.paymenturl, "_blank");
            }
          }
        }
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.depositResult.info),
          {
            variant: "error",
          }
        );

        this.setState({ ...this.state, loading: false });
        if (
          this.props.wallet.depositTypeList[
            this.state.selectedPaymentIndex
          ].paymentcode.toUpperCase() === "WANDAPAY"
        ) {
          if (!this.props.account.info.member_name) {
            this.props.history.push("/account/profile/member_name");
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
          ...this.state,
          step: 4,
          loading: false,
          showTabContainer: false,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.depositUploadResult.info
          ),
          {
            variant: "error",
          }
        );

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
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        this.setState({
          ...this.state,
          loading: false,
          step: 7,
          isAddCardSuccess: true,
          showTabContainer: false,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.addBankCardResult.info
          ),
          {
            variant: "error",
          }
        );
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
    window.removeEventListener("storage", this.handStorageMsg, true); // Succeeds
    localStorage.removeItem("depositResult");
  }
  handStorageMsg = (ev) => {
    if (ev.key === "depositResult" && ev.newValue) {
      var depositResult = JSON.parse(ev.newValue);

      if (depositResult !== null && depositResult.IsSuccess) {
        var payment =
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex];
        // var paymenturl = "";
        // if (payment.paymentcode.toUpperCase() !== "MANUAL") {
        //   paymenturl = response.data.paymenturl;
        //   window.open(paymenturl, "_blank");
        // }

        this.setState({
          ...this.state,
          step:
            ((config.features.Deposit_SplitUsdt &&
              payment.alteredpaymentcode &&
              payment.alteredpaymentcode.toUpperCase() === "MANUAL") ||
              payment.paymentcode.toUpperCase()) === "MANUAL"
              ? 2
              : 3,
          depositResult: depositResult,
          loading: false,
          showTabContainer: false,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(depositResult.info),
          {
            variant: "error",
          }
        );

        this.setState({
          ...this.state,
          loading: false,
        });
      }
    }
  };
  handleTabClick = (item, index) => {
    if (this.state.step === 1) {
      this.setState({
        ...this.state,
        selectedPaymentIndex: index,
        amount: "",
        // name: "",
        //: "",
        depositPromotion: "",
        selectedChannelIndex: 0,
        selectedMethodIndex: 0,
      });
    }
  };
  handleAddCard = () => {
    this.setState({
      ...this.state,
      step: 6,
      showTabContainer: false,
      loading: false,
    });
  };
  handleAddCardNextClick = (channelid, bankType, detail) => {
    //clear url params
    window.history.pushState({}, null, "deposit");
    this.props.addBankCard(channelid, bankType, detail);
  };
  handleAddCardBack = () => {
    this.setState({
      ...this.state,
      step: 1,
      showTabContainer: true,
      loading: false,
    });
  };
  handleBindCardClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, step: 7 });
  };
  handleGoDepositClick = () => {
    this.setState({
      ...this.state,
      isAddCardSuccess: false,
      step: 1,
      showTabContainer: true,
    });
  };
  handleGoWithdrawClick = () => {};
  handleCSClick = () => {
    this.props.onhandleCSClick(
      this.props.account.info.member_id,
      this.props.account.info.member_name,
      ""
    );
  };
  handleChannelChange = (index) => {
    //var channel = method.channel[this.state.selectedChannelIndex];

    this.setState({
      ...this.state,
      amount: "",
      selectedChannelIndex: index,
      depositPromotion: ""
    });
  };
  handleMethodChange = (index) => {
    this.setState({
      ...this.state,
      amount: "",
      selectedMethodIndex: index,
      selectedChannelIndex: 0,
    });
  };
  handleNextClick = (e) => {
    this.setState({ ...this.state, loading: true });

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
      } else if (method.methodcode === "FPS") {
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
      } else if (method.methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "Usdt") {
        this.props.doUsdtDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "Pulsa") {
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
      } else if (method.methodcode === "EWallet") {
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
      else if (method.methodcode === "Coinsph") {
        let name = this.props.wallet.bankCardList[bankCardIndex]
        ? this.props.wallet.bankCardList[bankCardIndex].detail.name || ""
        : "";
        let phone = this.props.wallet.bankCardList[bankCardIndex]
          ? this.props.wallet.bankCardList[bankCardIndex].detail.phone || ""
          : "";
        let address = this.props.wallet.bankCardList[bankCardIndex]
          ? this.props.wallet.bankCardList[bankCardIndex].detail.address || ""
          : "";

        if (config.features.Deposit_AddCard) {
          this.props.doCoinsphDepositWithDetail(
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
              name,
            config.features.Deposit_ManualDepositPassPhone ? phone : null,
            address
          );
        } else {
          this.props.doCoinsphDeposit(
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion,
            null,
            config.features.Deposit_Withdrawal_PlayerNote
              ? this.state.playerNote
              : null,
            name,
            config.features.Deposit_ManualDepositPassPhone ? phone : null,
            address
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
  };

  // handleUploadClick = (file) => {
  //   if (!file) {
  //     this.props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   // this.props.resetDeposit();
  //   this.props.doDepositUpload(
  //     file,
  //     "image",
  //     this.props.wallet.depositResult.data.order_id
  //   );
  // };

  //newly declared function - START

  handleChangeManualDepositMethod = (value) => {
    this.setState({
      ...this.state,
      methodCode: value,
    });
  };

  handleChangePaymentOption = (value) => {
    this.setState({
      ...this.state,
      paymentId: value,
    });
  };
  handleDepositPromotionChange = (e) => {
    this.setState({
      ...this.state,
      depositPromotion: e.target.value,
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
  handleBankCardChange = (e) => {
    var paymentIndex = 0;
    var methodIndex = 0;
    var channelIndex = 0;

    var bankCardIndex = this.props.wallet.bankCardList.findIndex(
      (item) => item.id === e.target.value
    );
    if (config.features.Deposit_AddCard && e.target.value !== "") {
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
  performSendData = () => {
    // TGSWalletService.PerformManualDeposit(
    //   this.state.amount,
    //   this.state.account,
    //   this.state.paymentId
    // ).then((result) => {
    //   if (result.IsSuccess) {
    //     this.setState({
    //       manualDepositId: result.data,
    //     });
    //     TGSWalletService.PerformGetManualDepositDetail(
    //       this.state.manualDepositId
    //     ).then((result) => {
    //       this.setState({
    //         ...this.state,
    //         manualDepositDetail: result.data,
    //         newStep: 2,
    //       });
    //     });
    //   }
    // });
    //this.props.performManualDeposit(
    //  this.state.amount,
    //  this.state.account,
    //  this.state.paymentId
    //);
  };

  performUploadImage = (file) => {
    this.props.doUploadDepositProof(
      this.state.paymentId
        ? this.state.paymentId
        : this.state.depositResult
        ? this.state.depositResult.data
        : "",
      file
    );
  };
  handleAmountChange = (e) => {
    var max =
      this.props.wallet.depositTypeList[this.state.selectedPaymentIndex].method[
        this.state.selectedMethodIndex
      ].channel[this.state.selectedChannelIndex].transferlimit.to;

    this.setState({
      ...this.state,
      amount:
        parseInt(e.target.value.replace(/,/g, "")) > max ? max : e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };

  handleAccountChange = (e) => {
    this.setState({
      ...this.state,
      account: e.target.value,
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
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
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
  handleRestartClick = async (e) => {
    this.setState(this.initialState);
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
  
  hasDepositPromotion = (item) => {
    return (
      [
        "FirstDeposit",
        "DailySecondDeposit",
        "DailyFirstDeposit",
        "DepositReward",
        "DepositAccumulateRoulette",
        "PromoteDepositChannel",
      ].indexOf(item.promotionType) >= 0
    );
  };

  hasDepositRewardPromotion = (item) => {
    return item.promotionType === "DepositReward"
      ? this.state.amount >= item.campaignDetail.depositMinimumLimit
      : true;
  };

  hasDepositPaymentChannelPromotion = (item) => {
    if (item.promotionType === "PromoteDepositChannel") {
      if (
        item.campaignDetail.channelIds &&
        item.campaignDetail.channelIds.length > 0
      ) {
        return (
          item.campaignDetail.channelIds.indexOf(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].channelid
          ) >= 0
        );
      }
    } else return true;
  };

  switchStep = (steps) => {
    switch (steps) {
      case 1:
        if (config.features.Deposit_DualPage) {
          return (
            <NewStepOneHKJP
              amount={this.state.amount}
              onAmountChange={this.handleAmountChange}
              name={this.state.name}
              account={this.state.account}
              accountList={this.props.wallet.bankCardList}
              onNameChange={this.handleNameChange}
              exchangeRate={this.state.exchangeRate}
              onAccountChange={this.handleAccountChange}
              selectedChannelIndex={this.state.selectedChannelIndex}
              onChannelChange={this.handleChannelChange}
              selectedMethodIndex={this.state.selectedMethodIndex}
              onMethodChange={this.handleMethodChange}
              selectedPaymentIndex={this.state.selectedPaymentIndex}
              promotionList={this.props.general.promotionList.items.filter(
                (item) =>
                  this.hasDepositPromotion(item) &&
                  this.hasDepositRewardPromotion(item) &&
                  this.hasDepositPaymentChannelPromotion(item)
              )}
              depositPromotion={this.state.depositPromotion}
              handleDepositPromotionChange={this.handleDepositPromotionChange}
              paymentType={
                this.props.wallet.depositTypeList.length > 0
                  ? this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ]
                  : null
              }
              playerNote={this.state.playerNote}
              onPlayerNoteChange={this.handlePlayerNoteChange}
              onNextClick={this.handleNextClick}
            />
          );
        } else {
          return (
            <NewStepOne
              amount={this.state.amount}
              onAmountChange={this.handleAmountChange}
              name={this.state.name}
              accountList={this.props.wallet.bankCardList}
              onNameChange={this.handleNameChange}
              account={this.state.account}
              onAccountChange={this.handleAccountChange}
              files={this.state.files}
              exchangeRate={this.state.exchangeRate}
              selectedChannelIndex={this.state.selectedChannelIndex}
              onChannelChange={this.handleChannelChange}
              selectedMethodIndex={this.state.selectedMethodIndex}
              onMethodChange={this.handleMethodChange}
              selectedPaymentIndex={this.state.selectedPaymentIndex}
              onFileChange={this.handleFileChange}
              promotionList={this.props.general.promotionList.items.filter(
                (item) =>
                  this.hasDepositPromotion(item) &&
                  this.hasDepositRewardPromotion(item) &&
                  this.hasDepositPaymentChannelPromotion(item)
              )}
              depositPromotion={this.state.depositPromotion}
              handleDepositPromotionChange={this.handleDepositPromotionChange}
              paymentType={
                this.props.wallet.depositTypeList.length > 0
                  ? this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ]
                  : null
              }
              playerNote={this.state.playerNote}
              onPlayerNoteChange={this.handlePlayerNoteChange}
              onNextClick={this.handleNextClick}
              selectedBankCard={this.state.selectedBankCard}
              handleBankCardChange={this.handleBankCardChange}
              bankCardList={
                config.features.Deposit_AddCard
                  ? this.props.wallet.bankCardList.sort(
                      (a, b) => b.default - a.default
                    )
                  : this.props.wallet.bankCardList
              }
              handleSelectAccountChange={this.handleSelectAccountChange}
            />
          );
        }

      case 2:
        return (
          <NewStepTwoHKJP
            extended={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].extended
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channelname={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].channelname
            }
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
            paymentId={this.state.paymentId}
          />
        );
      case 3:
        return (
          <Step2Form
            isCrypto={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode === "Crypto"
            }
            depositType={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .paymentcode
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channel={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ]
            }
            depositResult={this.state.depositResult}
            paymenturl={this.state.paymenturl}
            amount={this.state.amount}
            handleRestartClick={this.handleRestartClick}
          ></Step2Form>
        );
      case 4:
        return <Success handleRestartClick={this.handleRestartClick}></Success>;
      case 5:
        return (
          <NewStepTwoHKJP
            methodcode={this.state.methodcode}
            channelname={this.state.channelname}
            depositDetail={this.state.depositDetail}
            bankaccount={this.state.bankaccount}
            paymentId={this.state.paymentId}
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
          />
        );
      case 6:
        return (
          <AddCard
            name={this.props.account.info.member_name}
            onhandleNextClick={this.handleAddCardNextClick}
            onhandleBackClick={this.handleAddCardBack}
            withdrawalList={this.props.wallet.withdrawalList}
            depositList={this.props.wallet.depositList}
            showBack={true}
            containCard={
              this.props.wallet.bankCardList != null &&
              this.props.wallet.bankCardList.length === 0
            }
            isDeposit={true}
            bankCardList={
              config.features.Deposit_AddCard
                ? this.props.wallet.bankCardList.sort(
                    (a, b) => b.default - a.default
                  )
                : this.props.wallet.bankCardList
            }
          ></AddCard>
        );
      case 7:
        return (
          <AddCardSuccess
            onhandleBindCardClick={this.handleBindCardClick}
            onhandleGoDepositClick={this.handleGoDepositClick}
            onhandleGoWithdrawClick={this.handleGoWithdrawClick}
            onhandleCSClick={this.handleCSClick}
            bankCardList={this.props.wallet.bankCardList}
            isDeposit={true}
          ></AddCardSuccess>
        );
      default:
        return "";
    }
  };

  render() {
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

        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("deposit.title")}
        </Title>
        <Wrap>
          {(() => {
            return (
              <>
                <InnerWrap>
                  {config.features.Deposit_AddCard ? (
                    this.state.showTabContainer && (
                      <TabButtonContainer>
                        <ButtonAddCard
                          onClick={this.handleAddCard}
                        ></ButtonAddCard>
                      </TabButtonContainer>
                    )
                  ) : (
                    <TabButtonContainer>
                      {this.props.wallet.depositTypeList
                        .sort(function (a, b) {
                          return a.displayorder - b.displayorder;
                        })
                        .map((item, index) => {
                          return (
                            <TabButton
                              key={index}
                              onClick={() => this.handleTabClick(item, index)}
                              active={this.state.selectedPaymentIndex === index}
                            >
                              <TabLabel> {i18n.t(item.paymentcode)}</TabLabel>
                            </TabButton>
                          );
                        })}
                    </TabButtonContainer>
                  )}
                  {(() => {
                    if (this.props.wallet.depositTypeList.length <= 0)
                      return null;
                    return this.switchStep(this.state.step);
                    //   if (this.state.step === 1) {
                    //     return (
                    //       <Step1
                    //         username={this.state.username}
                    //         selectedType={this.state.selectedType}
                    //         selectedChannel={this.state.selectedChannel}
                    //         depositAmount={this.state.depositAmount}
                    //         handleDepositClick={this.handleDepositClick}
                    //         handleDepositAmountChange={
                    //           this.handleDepositAmountChange
                    //         }
                    //         handleUsernameChange={this.handleUsernameChange}
                    //         handleTunnelClick={this.handleTunnelClick}
                    //       ></Step1>
                    //     );
                    //   } else if (this.state.step === 2) {
                    //     return (
                    //       <Step2Form
                    //         depositResult={this.props.wallet.depositResult}
                    //         handleDepositConfirmClick={
                    //           this.handleDepositConfirmClick
                    //         }
                    //         handleDepositCancelClick={
                    //           this.handleDepositCancelClick
                    //         }
                    //       ></Step2Form>
                    //     );
                    //   } else if (this.state.step === 3) {
                    //     return (
                    //       <Step2QR
                    //         bankInfo={this.bankInfo}
                    //         amount={this.state.depositAmount}
                    //         selectedType={this.state.selectedType}
                    //         selectedChannel={this.state.selectedChannel}
                    //         depositResult={this.props.wallet.depositResult}
                    //         handleUploadClick={this.handleUploadClick}
                    //         handleDepositCancelClick={
                    //           this.handleDepositCancelClick
                    //         }
                    //       ></Step2QR>
                    //     );
                    //   } else if (this.state.step === 4) {
                    //     return (
                    //       <Success
                    //         handleConfirmClick={() => {
                    //           this.setState({
                    //             ...this.initialState,
                    //             selectedType: this.props.wallet
                    //               .depositTypeList[0],
                    //             selectedChannel: this.props.wallet
                    //               .depositTypeList[0].channel[0],
                    //           });
                    //         }}
                    //       ></Success>
                    //     );
                    //   }
                  })()}
                </InnerWrap>
              </>
            );
          })()}

          <Loading
            show={this.state.loading || this.props.wallet.depositLoading}
          ></Loading>
          <UnderConstructionWrap
            style={
              this.state.isMaintenance
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
          </UnderConstructionWrap>
        </Wrap>
        <form id="form" target="_blank" method="post">
          <input type="hidden" name="cid" id="cid"></input>
          <input type="hidden" name="oid" id="oid"></input>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    account: state.account,
    general: state.general,
    ui: state.ui,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
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
    doPulsaDeposit: (amount, paymentid, promotionid, banktype, note, phone) => {
      dispatch(
        walletAction.doPulsaDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          phone
        )
      );
    },
    doEWalletDeposit: (
      amount,
      paymentid,
      promotionid,
      banktype,
      note,
      emoneyname,
      phone
    ) => {
      dispatch(
        walletAction.doEWalletDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          emoneyname,
          phone
        )
      );
    },
    doBankDeposit2: (amount, payment_id, promotionid, paymentcode) => {
      dispatch(
        walletAction.doBankDeposit2(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      );
    },
    doCryptoDeposit: (amount, payment_id, promotionid, paymentcode) => {
      dispatch(
        walletAction.doCryptoDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      );
    },
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
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    resetDeposit: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    addBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.addBankCard(channelid, bankType, detail)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
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
      note,
      detail,
      phone
    ) => {
      dispatch(
        walletAction.doPulsaDepositWithDetail(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
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
      note,
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
          note,
          detail,
          emoneyname,
          phone
        )
      );
    },
    doCoinsphDeposit: (
      amount,
      paymentid,
      promotionid,
      banktype,
      note,
      name,
      phone,
      address
    ) => {
      dispatch(
        walletAction.doCoinsphDeposit(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          name,
          phone,
          address
        )
      );
    },
    doCoinsphDepositWithDetail: (
      amount,
      paymentid,
      promotionid,
      banktype,
      note,
      name,
      phone,
      address
    ) => {
      dispatch(
        walletAction.doCoinsphDepositWithDetail(
          amount,
          paymentid,
          promotionid,
          banktype,
          note,
          name,
          phone,
          address
        )
      );
    },
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Deposit)));
