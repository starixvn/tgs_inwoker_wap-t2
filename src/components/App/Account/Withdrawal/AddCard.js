import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
import Common from "../../../../utils/Common";
import { utility } from "../../../../utils/utility";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 0px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;

  color: #818181;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
`;

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
    "&.MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: 44,
    },
  },
}))(Select);
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "395px",
    height: "38px",
    marginTop: "12px",
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
class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      number: "",
      bankName: "",
      bankAccountName: "",
      bankBranch: "",
      selectedChannelIndex: 0,
      selectedBankTypeIndex: 0,
      channelList: [],
      disableBankNameInput: false,
      disableBankAccountNameInput: false,
      name: "",
      phone: "",
    };
  }

  async componentDidMount() {
    await this.formatChannelList();
    if (this.props.isDeposit && this.props.bankCardList.length > 0) {
      var defaultCard = this.props.bankCardList.filter(
        (card) => card.default
      )[0];
      var name = "";
      var disableBankAccountNameInput = false;
      if (
        Common.arrayValidator(this.props.depositList) &&
        this.props.depositList[
          this.state.selectedBankTypeIndex
        ].banktype.toUpperCase() ===
          (defaultCard && defaultCard.banktype.toUpperCase())
      ) {
        switch (
          this.props.depositList[
            this.state.selectedBankTypeIndex
          ].banktype.toUpperCase()
        ) {
          // case "BANK":
          //   name = defaultCard.detail.name;
          //   disableBankAccountNameInput = true;
          //   break;
          case "EWALLET":
            name = defaultCard.detail.eMoneyName;
            disableBankAccountNameInput = true;
            break;
          default:
            name = "";
            break;
        }
        this.setState({
          ...this.state,
          bankAccountName: name,
          disableBankAccountNameInput: disableBankAccountNameInput,
        });
      }
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      !this.props.isDeposit &&
      preProps.withdrawalList.length !== this.props.withdrawalList.length
    ) {
      this.formatChannelList();
    }
    if (
      this.props.isDeposit &&
      preProps.depositList.length !== this.props.depositList.length
    ) {
      this.formatChannelList();
    }
    if (preState.selectedBankTypeIndex !== this.state.selectedBankTypeIndex) {
      this.formatChannelList();
    }
  }
  formatChannelList = () => {
    var i = 0;
    var channel = [];
    var channelList = [];
    var addedChannel = [];
    if (this.props.isDeposit) {
      if (this.props.depositList.length > 0) {
        channelList =
          this.props.depositList[this.state.selectedBankTypeIndex].channel;
        if (this.props.depositList.length > 0) {
          for (i = 0; i < channelList.length; i++) {
            if (addedChannel.indexOf(channelList[i].id) < 0) {
              addedChannel.push(channelList[i].id);
              channel.push(channelList[i]);
            }
          }
        }
      }
    } else {
      if (this.props.withdrawalList.length > 0) {
        channelList =
          this.props.withdrawalList[this.state.selectedBankTypeIndex].channel;
        if (this.props.withdrawalList.length > 0) {
          for (i = 0; i < channelList.length; i++) {
            if (addedChannel.indexOf(channelList[i].id) < 0) {
              addedChannel.push(channelList[i].id);
              channel.push(channelList[i]);
            }
          }
        }
      }
    }
    var disableInput = false;
    var bankName = "";
    if (channel.length > 0) {
      if (
        channel[this.state.selectedChannelIndex].channelcode !== "CustomBank"
      ) {
        disableInput = true;
        bankName = channel[this.state.selectedChannelIndex].channelcode;
      }
    }
    this.setState({
      ...this.state,
      channelList: channel,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
    return channel;
  };
  handleBankTypeChange = (e) => {
    var name = "";
    var disableBankAccountNameInput = false;
    if (this.props.isDeposit && this.props.bankCardList.length > 0) {
      var defaultCard = this.props.bankCardList.filter(
        (card) => card.default
      )[0];
      if (
        Common.arrayValidator(this.props.depositList) &&
        this.props.depositList[e.target.value].banktype.toUpperCase() ===
          (defaultCard && defaultCard.banktype.toUpperCase())
      ) {
        switch (this.props.depositList[e.target.value].banktype.toUpperCase()) {
          // case "BANK":
          //   name = defaultCard.detail.name;
          //   disableBankAccountNameInput = true;
          //   break;
          case "EWALLET":
            name = defaultCard.detail.eMoneyName;
            disableBankAccountNameInput = true;
            break;
          default:
            break;
        }
      }
    }
    this.setState({
      ...this.state,
      selectedBankTypeIndex: e.target.value,
      selectedChannelIndex: 0,
      bankAccountName: name,
      disableBankAccountNameInput: disableBankAccountNameInput,
      number: "",
    });
  };
  handleChannelChange = (e) => {
    var disableInput = false;
    var bankName = "";
    if (this.state.channelList[e.target.value].channelcode !== "CustomBank") {
      disableInput = true;
      bankName = this.state.channelList[e.target.value].channelcode;
    }
    this.setState({
      ...this.state,
      selectedChannelIndex: e.target.value,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleNextClick = (e) => {
    const selected = this.props.isDeposit
      ? this.props.depositList[this.state.selectedBankTypeIndex]
      : this.props.withdrawalList[this.state.selectedBankTypeIndex];
    let detail = {};

    const {
      selectedChannelIndex,
      channelList,
      bankName,
      bankAccountName,
      bankBranch,
      number,
      name,
      phone,
    } = this.state;

    const trimAndRemoveSpace = (value) => utility.removeSpace(value.trim());

    if (selected.banktype === "Bank") {
      let bankNameValue = channelList[selectedChannelIndex].channelcode;
      if (
        bankNameValue === "CustomBank" &&
        !(
          config.features.AddCard_HideCertainField ||
          config.features.AddCard_Bank_Custom_IDR
        )
      ) {
        bankNameValue = bankName.trim();
      }

      if (bankNameValue === "") {
        this.props.enqueueSnackbar(i18n.t("card.addCard.msgEnterBankName"), {
          variant: "error",
        });
        return;
      }

      if (bankAccountName.trim() === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterBankAccountName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      detail = {
        bankAccount: trimAndRemoveSpace(number),
        bankName: trimAndRemoveSpace(bankNameValue),
        name: trimAndRemoveSpace(bankAccountName),
        bankBranch: trimAndRemoveSpace(bankBranch),
      };
    } else if (
      selected.banktype === "ThirdParty" ||
      selected.banktype === "FPS"
    ) {
      if (name === "") {
        this.props.enqueueSnackbar(
          i18n.t("profile.nameVerify.msgPlsEnterName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (phone === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
        return;
      }

      if (
        phone.length < 8 ||
        phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
        return;
      }

      detail = {
        username: trimAndRemoveSpace(name),
        phone: trimAndRemoveSpace(phone),
      };
    } else if (selected.banktype === "EWallet") {
      if (bankAccountName.trim() === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterEwalletAccount"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (
        number.trim().length < 8 ||
        number.trim().length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
        return;
      }

      if (config.features.AddCard_CustomParam_IDR) {
        detail = {
          phone: trimAndRemoveSpace(number),
          eMoneyName: trimAndRemoveSpace(bankAccountName),
        };
      } else {
        detail = {
          name: trimAndRemoveSpace(bankAccountName),
          phone: trimAndRemoveSpace(number),
        };
      }
    } else if (selected.banktype === "Pulsa") {
      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      if (config.features.AddCard_CustomParam_IDR) {
        detail = {
          phone: trimAndRemoveSpace(number),
        };
      } else {
        detail = {
          phone: trimAndRemoveSpace(number),
        };
      }
    } else if (selected.banktype === "Coinsph") {
      if (name === "") {
        this.props.enqueueSnackbar(
          i18n.t("profile.nameVerify.msgPlsEnterName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (phone === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
        return;
      }

      if (
        phone.length < 8 ||
        phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
        return;
      }
        detail = {
          name: trimAndRemoveSpace(name),
          phone: trimAndRemoveSpace(phone),
          address: ""
        };
    } else {
      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      detail = {
        address: trimAndRemoveSpace(number),
      };
    }

    this.props.onhandleNextClick(
      channelList[selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };
  render() {
    const { withdrawalList, depositList } = this.props;

    const listDetector = (list, type) => {
      return (
        Common.arrayValidator(list) &&
        list[this.state.selectedBankTypeIndex].banktype === type
      );
    };

    const selectedBankType = (type) => {
      return this.props.isDeposit
        ? listDetector(depositList, type)
        : listDetector(withdrawalList, type);
    };

    const eWalletCustom =
      selectedBankType("Ewallet") && config.features.AddCard_EWalletCustoms;

    const bankList = [
      "กสิกรไทย (Kasikorn Bank- KKR)",
      "ไทยพาณิชย์ (Siam Commercial Bank - SCB)",
      "กรุงไทย (KrungThai Bank - KTB)",
      "กรุงเทพ (Bankok Bank - BBL)",
      "ออมสิน (Government Savings Bank - GSB)",
      "ทหารไทยธนาชาต (TMBThanachart Bank - TTB)",
      "กรุงศรี (Bank of Ayudhya - KrungSri)",
      "ธ.ก.ส (Bank for Agriculture and Agricultural Cooperatives - BAAC)",
      "ยูโอบี (United Overseas Bank - UOB)",
      "ซีไอเอ็มบีไทย (CIMB THAI - CIMB)",
      "เกียรตินาคินภทัร (Kiatnakin Phatra Bank - KKP)",
      "อาคารสงเคราะห์ (Government Housing Bank - GH)",
    ];

    return (
      <Container>
        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>

        {!config.features.AddCard_HideCertainField && (
          <>
            <TextFieldLabel>
              {i18n.t("common.withdrawalBankType")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomFormControl>
                <CustomSelect
                  native
                  variant="outlined"
                  displayEmpty
                  value={this.state.selectedBankTypeIndex}
                  onChange={this.handleBankTypeChange}
                >
                  {this.props.isDeposit
                    ? depositList.map((item, index) => {
                        return (
                          <option value={index} key={index}>
                            {item.banktype}
                          </option>
                        );
                      })
                    : withdrawalList.map((item, index) => {
                        return (
                          <option value={index} key={index}>
                            {item.banktype}
                          </option>
                        );
                      })}
                </CustomSelect>
              </CustomFormControl>
            </TextFieldContainer>
          </>
        )}

        {!config.features.AddCard_HideChannel && (
          <>
            <TextFieldLabel>
              {config.features.AddCard_Bank_Custom_IDR &&
              ((!this.props.isDeposit &&
                withdrawalList.length > 0 &&
                withdrawalList[this.state.selectedBankTypeIndex].banktype ===
                  "Bank") ||
                (this.props.isDeposit &&
                  depositList.length > 0 &&
                  depositList[this.state.selectedBankTypeIndex].banktype ===
                    "Bank"))
                ? i18n.t("card.addCard.BankName")
                : i18n.t("common.withdrawalChannel")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomFormControl>
                <CustomSelect
                  native
                  variant="outlined"
                  displayEmpty
                  value={this.state.selectedChannelIndex}
                  onChange={this.handleChannelChange}
                >
                  {this.props.isDeposit
                    ? depositList.length > 0 &&
                      this.state.channelList.map((item, index) => {
                        return (
                          <option value={index} key={index}>
                            {i18n.t(item.channelname)}
                          </option>
                        );
                      })
                    : withdrawalList.length > 0 &&
                      this.state.channelList.map((item, index) => {
                        return (
                          <option value={index} key={index}>
                            {i18n.t(item.channelname)}
                          </option>
                        );
                      })}
                </CustomSelect>
              </CustomFormControl>
            </TextFieldContainer>
          </>
        )}
        {(() => {
          if (
            (!this.props.isDeposit &&
              withdrawalList.length > 0 &&
              withdrawalList[this.state.selectedBankTypeIndex].banktype ===
                "Bank") ||
            (this.props.isDeposit &&
              depositList.length > 0 &&
              depositList[this.state.selectedBankTypeIndex].banktype === "Bank")
          ) {
            return (
              <>
                {!(
                  config.features.AddCard_HideCertainField ||
                  config.features.AddCard_Bank_Custom_IDR
                ) && (
                  <>
                    {!eWalletCustom && (
                      <>
                        <TextFieldLabel>
                          {config.features.AddCard_DisplayFPS
                            ? i18n.t("hk28.card.addCard.BankName")
                            : i18n.t("card.addCard.BankName")}
                        </TextFieldLabel>
                        <TextFieldContainer>
                          {config.features.AddCard_BankDropdown ? (
                            <CustomFormControl>
                              <CustomSelect
                                native
                                variant="outlined"
                                displayEmpty
                                value={this.state.bankName}
                                onChange={this.handleBankNameChange}
                              >
                                <option value="" selected disabled>
                                  {config.features.AddCard_DisplayFPS
                                    ? i18n.t(
                                        "hk28.card.addCard.msgEnterBankName"
                                      )
                                    : i18n.t("card.addCard.msgEnterBankName")}
                                </option>
                                {bankList.length > 0 &&
                                  bankList.map((item, index) => {
                                    return (
                                      <option value={item} key={index}>
                                        {item}
                                      </option>
                                    );
                                  })}
                              </CustomSelect>
                            </CustomFormControl>
                          ) : (
                            <CustomTextField
                              marginTop={10}
                              placeholder={
                                config.features.AddCard_DisplayFPS
                                  ? i18n.t("hk28.card.addCard.msgEnterBankName")
                                  : i18n.t("card.addCard.msgEnterBankName")
                              }
                              width={395}
                              height={38}
                              float={"none"}
                              maxLength={255}
                              disabled={this.state.disableBankNameInput}
                              value={this.state.bankName}
                              handleTextFieldChange={this.handleBankNameChange}
                            ></CustomTextField>
                          )}
                        </TextFieldContainer>
                      </>
                    )}
                    {(() => {
                      if (
                        config.features.AddCard_BankBranch &&
                        !eWalletCustom
                      ) {
                        return (
                          <React.Fragment>
                            <TextFieldLabel>
                              {i18n.t("card.addCard.branch")}
                            </TextFieldLabel>
                            <TextFieldContainer>
                              <CustomTextField
                                marginTop={10}
                                placeholder={i18n.t(
                                  "card.addCard.branchPlaceHolder"
                                )}
                                width={395}
                                height={38}
                                float={"none"}
                                maxLength={255}
                                handleTextFieldChange={
                                  this.handleBankBranchChange
                                }
                              ></CustomTextField>
                            </TextFieldContainer>
                          </React.Fragment>
                        );
                      }
                    })()}
                  </>
                )}

                <TextFieldLabel>
                  {eWalletCustom
                    ? i18n.t("card.addCard.eWalletAccount")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.card.addCard.BankAccountName")
                    : config.features.AddCard_Sowin_CustomBankAccountName
                    ? i18n.t("sowin.card.addCard.BankAccountName")
                    : i18n.t("card.addCard.BankAccountName")}
                </TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={
                      eWalletCustom
                        ? i18n.t("card.addCard.msgEnterEwalletAccount")
                        : config.features.AddCard_DisplayFPS
                        ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                        : i18n.t("card.addCard.msgEnterBankAccountName")
                    }
                    width={395}
                    height={38}
                    float={"none"}
                    maxLength={255}
                    handleTextFieldChange={this.handleBankAccountNameChange}
                    value={this.state.bankAccountName}
                    disabled={this.state.disableBankAccountNameInput}
                  ></CustomTextField>
                </TextFieldContainer>
              </>
            );
          } else {
            return null;
          }
        })()}
        {((!this.props.isDeposit &&
          withdrawalList.length > 0 &&
          withdrawalList[this.state.selectedBankTypeIndex].banktype ===
            "EWallet") ||
          (this.props.isDeposit &&
            depositList.length > 0 &&
            depositList[this.state.selectedBankTypeIndex].banktype ===
              "EWallet")) && (
          <React.Fragment>
            <TextFieldLabel>
              {eWalletCustom
                ? i18n.t("card.addCard.eWalletAccount")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.card.addCard.BankAccountName")
                : config.features.AddCard_Sowin_CustomBankAccountName
                ? i18n.t("sowin.card.addCard.BankAccountName")
                : i18n.t("card.addCard.BankAccountName")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  eWalletCustom
                    ? i18n.t("card.addCard.msgEnterEwalletAccount")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                    : i18n.t("card.addCard.msgEnterBankAccountName")
                }
                width={395}
                height={38}
                float={"none"}
                maxLength={255}
                handleTextFieldChange={this.handleBankAccountNameChange}
                value={this.state.bankAccountName}
                disabled={this.state.disableBankAccountNameInput}
              ></CustomTextField>
            </TextFieldContainer>
          </React.Fragment>
        )}
        {(!this.props.isDeposit &&
          withdrawalList.length > 0 &&
          (withdrawalList[this.state.selectedBankTypeIndex].banktype ===
            "ThirdParty" ||
            withdrawalList[this.state.selectedBankTypeIndex].banktype ===
            "Coinsph" ||
            withdrawalList[this.state.selectedBankTypeIndex].banktype ===
              "FPS")) ||
        (this.props.isDeposit &&
          depositList.length > 0 &&
          (depositList[this.state.selectedBankTypeIndex].banktype ===
            "ThirdParty" ||
            depositList[this.state.selectedBankTypeIndex].banktype ===
            "Coinsph" ||
            depositList[this.state.selectedBankTypeIndex].banktype ===
              "FPS")) ? (
          <div>
            <TextFieldLabel>
              {config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.name")
                : i18n.t("profile.nameVerify.title")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgPlsEnterName")
                    : i18n.t("profile.nameVerify.msgPlsEnterName")
                }
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handleNameChange}
              ></CustomTextField>
            </TextFieldContainer>
            <TextFieldLabel>
              {config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.phoneNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("bet28.phoneNumber")
                : i18n.t("common.phoneNumber")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgEnterPhone")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("bet28.msgEnterPhone")
                    : i18n.t("common.msgEnterPhone")
                }
                width={395}
                height={38}
                maxLength={config.features.MAX_PHONE_LENGTH || 10}
                float={"none"}
                handleTextFieldChange={this.handlePhoneChange}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        ) : (
          <div>
            <TextFieldLabel>
              {eWalletCustom || selectedBankType("Pulsa")
                ? i18n.t("card.addCard.phone")
                : config.features.AddCard_DisplayGCash
                ? i18n.t("piso.withdrawalNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.withdrawalNumber")
                : config.features.AddCard_Bank_Custom_IDR
                ? i18n.t("idr.withdrawalNumber")
                : i18n.t("common.withdrawalNumber")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  eWalletCustom || selectedBankType("Pulsa")
                    ? i18n.t("card.addCard.msgEnterPhone")
                    : config.features.AddCard_DisplayGCash
                    ? i18n.t("piso.msgEnterWithdrawalNumber")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.msgEnterWithdrawalNumber")
                    : config.features.AddCard_Bank_Custom_IDR
                    ? i18n.t("idr.msgEnterWithdrawalNumber")
                    : i18n.t("common.msgEnterWithdrawalNumber")
                }
                width={395}
                height={38}
                maxLength={
                  (selectedBankType("ThirdParty") ||
                    selectedBankType("Coinsph") ||
                    selectedBankType("Pulsa") ||
                    selectedBankType("FPS")) &&
                  config.features.MAX_PHONE_LENGTH
                }
                float={"none"}
                handleTextFieldChange={this.handleNumberChange}
                value={this.state.number}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        )}

        <TextFieldContainer>
          {(() => {
            if (this.props.showBack === true) {
              return (
                <Button
                  grayMode={true}
                  name={i18n.t("common.back")}
                  width={257}
                  marginRight={20}
                  handleClick={this.props.onhandleBackClick}
                ></Button>
              );
            } else {
              return null;
            }
          })()}

          <Button
            name={
              config.features.Register_CustomFlow_IDR && !this.props.isDeposit
                ? i18n.t("web.register.btn")
                : i18n.t("common.nextStep")
            }
            width={255}
            handleClick={this.handleNextClick}
          ></Button>
        </TextFieldContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(AddCard));
