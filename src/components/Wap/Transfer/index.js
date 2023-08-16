import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";

import Button from "../../Wap/Share/Button";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import DynamicFont from "react-dynamic-font";
import Select from "@material-ui/core/Select";
import { accountAction } from "../../../api-services/actions/accountAction";
import { walletAction } from "../../../api-services/actions/walletAction";
import { WalletType, customGPname } from "../../../api-services/utils/Enum";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";

import Loading from "../../Wap/Share/Loading";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;
const RefreshLabel = styled.div`
  float: right;
  margin: 22px 20px 0 0;
  width: 46px;
  height: 46px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-transfer-refresh`})
    no-repeat;
`;
const InnerContainer = styled.div`
  margin: 40px auto 40px auto;

  width: 688px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
`;
const RowContainer = styled.div`
  min-height: 80px;
  padding: 30px;
`;
const LeftBalanceContainer = styled.div`
  float: left;
`;
const LeftLabelIcon = styled.div`
  width: 100%;
  height: 87px;
  float: left;
  border-radius: 50%;
  background: url(${(props) => props.icon}) no-repeat center center;
`;

const LeftLabel = styled.div`
  float: left;
  width: 100%;
  text-align: center;
  margin: 5px 0 0 0;

  font-size: 23px;

  color: #141a36;
`;
const RightAmountLabel = styled.div`
  float: left;
  margin: 38px 0px 0px 0px;
  font-size: 30px;
  color: #141a36;
  padding-left: 30px;
`;
const SplitLine = styled.div`
  height: 2px;
  background-color: #eeeeee;
  width:100%%
  margin:0 auto;
`;
const SplitLineHalf = styled(SplitLine)`
  height: 2px;
  background-color: #eeeeee;
  width:90%
  margin:0 auto;
`;
const ColumnWrap = styled.div`
  float: left;
  min-width: calc(25% - 2px);
`;
const ColumnContainer = styled.div`
  height: 120px;

  padding-top: 20px;
`;
const ColumnGameName = styled.div`
  font-size: 22px;
  color: #141a36;
  text-align: left;
  height: 35px;
  width: 157px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ColumnGameBalance = styled.div`
  width: 157px;
  font-size: 30px;
  color: ${({ theme }) => theme.secondary};
  text-align: left;
  margin-top: 10px;
`;

const TransferAccountContainer = styled(InnerContainer)`
  float: left;
  padding: 30px;
  width: 300px;
  margin: 40px;
  margin: 0px 0 0 30px;
`;
const TransferLabel = styled.div`
  font-size: 22px;
  color: #141a36;
  margin-left: 20px;
`;
const TransferArrowIcon = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-transfer-to.png`})
    no-repeat center;
  width: 60px;
  height: 60px;
  float: left;
  margin: 48px 14px 0 14px;
`;
const TextboxContainer = styled(InnerContainer)`
  height: 168px;
  padding: 30px;
`;
const TextboxLabel = styled.div`
  float: left;

  margin: 0 10px;

  font-size: 24px;
  width: 400px;
  color: #141a36;
`;
const TextboxInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  float: left;
  height: 88px;
  font-size: 28px;
  margin: 0 10px;
  padding: 0;
  border: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 28px;

    color: #c3c3c3;
  }
`;
const ButtonDiv = styled.div`
  float: right;

  color: #fefeff;
  font-size: 20px;

  text-align: center;
  padding: 9px 0;

  width: 146px;
  height: 47px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary};
`;
const DialogHeader = styled.div`
  color: #4a4a4a;
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 10px;
`;
const StyledModal = withStyles((theme) => ({
  paper: {
    borderRadius: "15px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
  },
}))(Modal);

const CustomFormControl = withStyles((theme) => ({
  root: {
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: 8,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const AutoTransferContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  padding: 0px 30px;
  zoom: 1.75;
`;

const ButtonWrapper = styled.div`
  display: block;
  padding-left: 50px;
  font-size: 24px;
  padding-top: 10px;
`;

const CustomButton = styled.div`
  background: ${({ theme }) => theme.primary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 200px;
  padding: 10px 20px;
`;

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferAmount: "",
      fromWallet: "0",
      toWallet: "0",
      loading: false,
      open: false,
      mainAccountId: "0",
      disabled: false,
    };
  }

  componentDidMount() {
    if (this.props.token != null) {
      this.props.getBalanceList();
      this.getAllGameBalance();
    } else {
      this.props.appHistory.replace("/" + i18n.language + "/login");
    }
    // .then((_) => {
    //   this.bindData();
    // });
    //this.handleRefreshClick();
  }
  componentDidUpdate(preProps) {
    if (
      this.props.game.providerList.length !==
        preProps.game.providerList.length &&
      this.props.game.providerList.length > 0
    ) {
      this.getAllGameBalance();
    }
    if (
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null
    ) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.getAllGameBalance();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
        // this.props.appHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.alert("", this.props.wallet.transferResult.info);
        // if (
        //   this.props.wallet.transferResult.code === 208 ||
        //   this.props.wallet.transferResult.code === 209
        // ) {
        //   this.props.alert('', i18n.t('transfer.msgFailedTransfer'))
        // } else {
        //   this.props.alert('', this.props.wallet.transferResult.info)
        // }
      }
    }
    // withdrawal all response
    if (
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null
    ) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "",
          fromWallet: 0,
          toWallet: "",
          loading: false,
          open: false,
        });
        // this.props.appHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.alert("", this.props.wallet.withdrawalAllResult.info);
      }
    }
  }
  getAllGameBalance = () => {
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => {
        this.props.getGameBalance(a.gpcode);
      });
  };
  handleRefreshClick = () => {
    this.props.getBalanceList();
    this.getAllGameBalance();
  };
  // bindData() {
  //   let singleWalletGameName = "";
  //   let transferWalletAmount = 0;

  //   let totalAmount = 0;
  //   let transferWalletList = [];
  //   let count = 1;
  //   for (let wallet of this.props.wallet.balanceList) {
  //     if (wallet.purse_type === WalletType.MainWallet) {
  //       transferWalletList.push(wallet);
  //       this.mainAccountId = wallet.id;
  //     } else if (wallet.purse_type === WalletType.SingleWallet) {
  //       singleWalletGameName += count + ". " + wallet.name + "<br />";
  //       count++;
  //     } else if (wallet.purse_type === WalletType.TransferWallet) {
  //       transferWalletAmount += parseFloat(wallet.balance);
  //       transferWalletList.push(wallet);
  //     }
  //     totalAmount += parseFloat(wallet.balance);
  //   }
  //   // if (singleWalletGameName.length > 1) {
  //   //   singleWalletGameName = singleWalletGameName.substring(
  //   //     0,
  //   //     singleWalletGameName.length - 1
  //   //   );
  //   // }
  //   this.setState({
  //     ...this.state,

  //     singleWalletGameName,
  //     transferWalletAmount: Common.formatNumberWithCommas(transferWalletAmount),
  //     totalAmount: Common.formatNumberWithCommas(totalAmount),
  //     selectListView: transferWalletList
  //       .filter((item) => item.maintenance !== 1)
  //       .map((item, key) => (
  //         <option
  //           key={item.id}
  //           value={isNaN(item.id) === true ? item.id : item.parent_id}
  //         >
  //           {item.name}
  //         </option>
  //       )),
  //     listView: this.GetTransferWalletQuickList(transferWalletList),
  //     transferWalletList: transferWalletList,
  //   });
  // }
  GetTransferWalletQuickList = (transferWalletList) => {
    return transferWalletList
      .filter(function (wallet) {
        return wallet.purse_type !== WalletType.MainWallet;
      })
      .map((item, index) => (
        <ColumnWrap key={index} disabled={item.maintenance === 1}>
          <ColumnContainer>
            <ColumnGameName>{item.name}</ColumnGameName>
            <ColumnGameBalance>
              <DynamicFont
                content={
                  item.maintenance === 1
                    ? i18n.t("transfer.maintenance")
                    : item.symbol +
                      Common.formatNumberWithThousand(item.balance)
                }
              ></DynamicFont>
            </ColumnGameBalance>
          </ColumnContainer>
        </ColumnWrap>
      ));
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleSubmitClicked = (e) => {
    this.setState({ ...this.state, disabled: true });
    const transferFrom = this.state.fromWallet;
    const transferTo = this.state.toWallet;
    const transferAmount = this.state.transferAmount
      .toString()
      .replace(/,/g, "");
    const balance = this.props.wallet.mainBalance;

    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.alert("", i18n.t("transfer.invalidAmount"));
      } else {
        this.props.alert("", i18n.t("transfer.insufficient"));
      }
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo == this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom == this.state.mainAccountId ? 1 : 2
    );
  };
  handleMaxAmountClicked = (e) => {
    if (this.state.fromWallet === this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferAmount: this.props.wallet.mainBalance,
      });
    } else {
      this.setState({
        ...this.state,
        transferAmount: this.props.game.providerList.filter(
          (a) => a.abbreviation === this.state.fromWallet
        )[0].balance,
      });
    }
  };
  handleWithdrawAllClick = (e) => {
    this.props.doWithdrawAll();
  };

  handleFromWallet = (e) => {
    const fromWallet = e.target.value;

    if (fromWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: this.state.mainAccountId,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: fromWallet,
        toWallet: "",
      });
    }
  };
  handleToWallet = (e) => {
    const toWallet = e.target.value;

    if (toWallet != this.state.mainAccountId) {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    } else {
      this.setState({
        ...this.state,
        fromWallet: this.state.mainAccountId,
        toWallet: toWallet,
      });
    }
  };
  handleTransferAmountChanged = (e) => {
    this.setState({ ...this.state, transferAmount: e.target.value });
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  handleSwitchAutoTransfer = () => {
    this.props.updateAutoTransferStatus();
  };

  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          rightContent={
            <RefreshLabel onClick={this.handleRefreshClick}></RefreshLabel>
          }
          onBackClick={this.handleBackClick}
          title={i18n.t("transfer.title")}
        ></Header>
        <InnerContainer>
          <RowContainer>
            <LeftBalanceContainer>
              <LeftLabelIcon
                icon={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/icon-transfer-total.png`
                }
              ></LeftLabelIcon>
              <div className="clear"></div>
              <LeftLabel>{i18n.t("transfer.mainAccount")}</LeftLabel>
            </LeftBalanceContainer>

            <RightAmountLabel>
              {Common.formatNumberWithThousand(this.props.wallet.mainBalance)}
            </RightAmountLabel>
            {/* <OneClickReceiveButton onClick={this.handleWithdrawAllClick}>
              {i18n.t("transfer.oneKeyReceive")}
            </OneClickReceiveButton> */}
          </RowContainer>
          <SplitLineHalf></SplitLineHalf>
        </InnerContainer>
        <AutoTransferContainer>
          <div></div>
          <CustomSwitchContainer>
            <div>
              {i18n.t("transfer.autoTransfer")} (
              {this.props.wallet.autotransfer === true
                ? i18n.t("transfer.on")
                : i18n.t("transfer.off")}
              )
            </div>
            <CustomSwitch
              checked={this.props.wallet.autotransfer === true}
              onChange={this.handleSwitchAutoTransfer}
            />
          </CustomSwitchContainer>
        </AutoTransferContainer>
        <ButtonWrapper>
          <CustomButton
            onClick={() => {
              this.props.performWithdrawFromEveryBrand();
            }}
          >
            {i18n.t("transfer.oneKeyTransferOut")}
          </CustomButton>
        </ButtonWrapper>

        <InnerContainer>
          <RowContainer>
            {this.props.game.providerList
              .filter(function (item) {
                return item.status === 0 && item.transferwallet === true;
              })
              .filter((e) => {
                if (config.features.MergeEVORTNT) {
                  if (
                    !(
                      e.gpcode === "NTTF" ||
                      e.gpcode === "RTTF" ||
                      e.gpcode === "BTG" ||
                      e.gpcode === "NLC"
                    )
                  ) {
                    return e;
                  }
                } else {
                  return e;
                }
              })
              .map((item, index) => (
                <ColumnWrap key={index}>
                  <ColumnContainer>
                    <ColumnGameName>{item.name}</ColumnGameName>
                    <ColumnGameBalance>
                      <DynamicFont
                        content={Common.formatNumberWithThousand(item.balance)}
                      ></DynamicFont>
                    </ColumnGameBalance>
                  </ColumnContainer>
                </ColumnWrap>
              ))}
          </RowContainer>
        </InnerContainer>

        <TransferAccountContainer>
          <TransferLabel>{i18n.t("transfer.transferFromWallet")}</TransferLabel>
          <CustomFormControl
            variant="outlined"
            style={{
              margin: "10px 0 0 0",
              width: "260px",
              height: "78px",

              border: "none",
              fontSize: "28px",
            }}
          >
            <Select
              native
              inputProps={{
                name: "age",
              }}
              style={{
                fontSize: "28px",
                height: "78px",
                border: "none",
              }}
              onChange={this.handleFromWallet}
              value={this.state.fromWallet}
            >
              <option value={this.state.mainAccountId}>
                {i18n.t("transfer.mainAccount")}
              </option>
              {this.props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .filter((e) => {
                  if (config.features.MergeEVORTNT) {
                    if (
                      !(
                        e.gpcode === "NTTF" ||
                        e.gpcode === "RTTF" ||
                        e.gpcode === "BTG" ||
                        e.gpcode === "NLC"
                      )
                    ) {
                      return e;
                    }
                  } else {
                    return e;
                  }
                })
                .map((item, index) => (
                  <option value={item.gpcode} key={index}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </CustomFormControl>
        </TransferAccountContainer>
        <TransferArrowIcon></TransferArrowIcon>
        <TransferAccountContainer style={{ margin: "0px" }}>
          <TransferLabel>{i18n.t("transfer.transferToWallet")}</TransferLabel>
          <CustomFormControl
            variant="outlined"
            style={{
              margin: "10px 0 0 0",
              width: "260px",
              height: "78px",
            }}
          >
            <Select
              native
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple",
              }}
              style={{
                fontSize: "28px",
                height: "78px",
                border: "none",
              }}
              onChange={this.handleToWallet}
              value={this.state.toWallet}
            >
              <option value={this.state.mainAccountId}>
                {i18n.t("transfer.mainAccount")}
              </option>
              {this.props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .filter((e) => {
                  if (config.features.MergeEVORTNT) {
                    if (
                      !(
                        e.abbreviation === "NTTF" ||
                        e.abbreviation === "RTTF" ||
                        e.gpcode === "BTG" ||
                        e.gpcode === "NLC"
                      )
                    ) {
                      return e;
                    }
                  } else {
                    return e;
                  }
                })
                .map((item, index) => (
                  <option value={item.gpcode} key={index}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </CustomFormControl>
        </TransferAccountContainer>
        <div className="clear"></div>
        <TextboxContainer>
          <TextboxLabel>{i18n.t("common.amount")}</TextboxLabel>
          <TextboxInput
            type={"number"}
            placeholder={i18n.t("transfer.msgEnterAmount")}
            onChange={this.handleTransferAmountChanged}
            value={this.state.transferAmount}
          ></TextboxInput>
          <ButtonDiv onClick={this.handleMaxAmountClicked}>
            {i18n.t("transfer.maxAmount")}
          </ButtonDiv>
        </TextboxContainer>

        <Button
          style={{ margin: "40px auto 40px auto" }}
          label={i18n.t("common.confirm")}
          onClick={this.handleSubmitClicked}
          disabled={(() => {
            return (
              this.state.transferAmount === 0 ||
              this.state.transferAmount === "" ||
              this.state.toWallet === this.state.fromWallet ||
              this.state.disabled === true
            );
          })()}
        ></Button>

        <StyledModal onClose={this.handleClose} open={this.state.open}>
          <DialogHeader>温馨提示</DialogHeader>
          以下产品无需转账， <br />
          直接使用主账户馀额进行游戏。
          <br />
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.singleWalletGameName,
            }}
          ></div>
        </StyledModal>
        <Loading
          show={
            this.state.loading ||
            this.props.wallet.loading ||
            this.props.wallet.transferLoading
          }
        ></Loading>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,
    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllWallet: (token, platformList) =>
      dispatch(accountAction.getAllWallet(token, platformList)),
    getAccountProfile: (token, showVip) =>
      dispatch(accountAction.getAccountProfile(token, showVip)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),

    doWithdrawAll: () => dispatch(walletAction.doWithdrawAll()),
    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    updateAutoTransferStatus: () =>
      dispatch(walletAction.updateAutoTransferStatus()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Transfer));
