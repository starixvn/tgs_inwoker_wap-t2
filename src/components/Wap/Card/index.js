import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import { walletAction } from "../../../api-services/actions/walletAction";
import { accountAction } from "../../../api-services/actions/accountAction";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";
import MessageDialog from "../../Wap/Share/MessageDialog";
import Loading from "../../Wap/Share/Loading";
import Header from "../../Wap/Share/Header";
import SwipeToDelete from "react-swipe-to-delete-component";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  padding-top: 170px;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "170px",

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${
        process.env.PUBLIC_URL + `/assets/images/wapp/bg-profile.png`
      })`,
    display: "block",
  },
}))(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #ffffff;
  margin: 15px auto 20px auto;
`;

const CardItem = styled.div`
  background: #fff;
  width: 632px;
  height: 170px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border-radius: 16px;
  margin-left: 60px;
  padding: 0 0 0 44px;
  color: ${({ theme }) => theme.secondary};
`;
const InfoLabel = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `18px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `600`)};

  color: ${({ theme }) => theme.secondary};
  float: right;
  margin: 15px 80px 0 0;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-card-info.png`})
    no-repeat left center;
  background-size: 32px;
  padding-left: 44px;
  height: ${() => (config.brand === "WGHK" ? `42px` : `32px`)};
  padding-top: 4px;
`;
const BankIcon = styled.div`
  background: url(${(props) => props.src}) no-repeat center center;
  margin: 0 20px 0 20px;
  height: 170px;
  width: 110px;
  float: left;
`;
const BankName = styled.div`
  font-size: 24px;

  float: left;
  width: 480px;
  margin-top: 40px;
`;
const BankNumber = styled.div`
  font-size: 32px;

  float: left;
  width: 480px;
  margin-top: 15px;
`;
const EmptyCardItem = styled.div`
  width: 632px;
  height: 170px;
  border: 2px ${({ theme }) => theme.secondary} dashed;
  border-radius: 16px;
  margin: 30px auto 0 auto;
`;
const EmptyCardTitle = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `26px` : `24px`)};
  font-weight: 600;
  float: left;
  color: ${({ theme }) => theme.secondary};
  width: 450px;

  margin: 50px 0 0 45px;
`;
const EmptyCardDesc = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `24px` : `18px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `normal`)};
  float: left;
  color: ${({ theme }) => theme.secondary};
  width: ${() => (config.brand === "WGHK" ? `455px` : `450px`)};
  margin: 5px 0 0 45px;
`;
const EmptyCardAdd = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-plus-circle.png`})
    no-repeat center center;
  width: 100px;
  height: 170px;
  float: right;
`;

const DisableSwipe = styled.div`
  pointer-events: ${({ disable }) => {
    return disable ? "none" : "auto";
  }};
`;

class Card extends Component {
  state = {
    loading: false,
    bankCardList: [],
    showDialog: false,
    dialogMessage: "",
  };
  componentDidMount() {
    // if (
    //   this.props.account.info.member_name === '' ||
    //   this.props.account.info.member_name === null
    // ) {
    //   this.props.appHistory.replace({
    //     pathname: '/' + i18n.language + '/profile/name',
    //
    //     state: { from: 'card' }
    //   })
    // } else {
    //   // if (this.props.account.info.member_safe_password !== 'set') {
    //   //   this.props.appHistory.replace(
    //   //     '/' + i18n.language + '/profile/withdrawalpassword'
    //   //   )
    //   // } else {
    //   //   // this.GetBankCardList();
    //   //   if (this.props.wallet.bankCardList.length === 0) {
    //   //     this.props.getBankCardList()
    //   //   }
    //   // }
    //   if (this.props.wallet.bankCardList.length === 0) {
    //     this.props.getBankCardList()
    //   }
    // }

    if (this.props.wallet.bankCardList.length === 0) {
      this.props.getBankCardList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.deleteBankCardResult.info,
        });
      }
      this.props.resetResult();
    }
  }
  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleDeleteCard = (e) => {
    if (
      this.props.wallet.bankCardList.length > 0 &&
      (config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        config.features.AddCard_DisableCreateUpdateDelete)
    ) {
      this.props.alert("", i18n.t("card.toEdit"));

      this.props.getBankCardList();
    } else {
      this.props.deleteBankCard(e.item.id);
    }
  };
  render() {
    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={i18n.t("card.title")}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
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
        </StyledAppBar>
        {this.props.wallet.bankCardList.map((row) => {
          return (
            <DisableSwipe
              disable={
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete
              }
            >
              <SwipeToDelete
                key={row.id}
                item={row}
                deleteSwipe={0.1}
                onDelete={this.handleDeleteCard}
              >
                <CardItem>
                  <BankName>{row.banktype}</BankName>
                  <BankNumber>
                    {row.detail.address ||
                      row.detail.bankAccount ||
                      row.detail.phone}
                  </BankNumber>
                </CardItem>
              </SwipeToDelete>
            </DisableSwipe>
          );
        })}

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (this.props.wallet.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <>
            <InfoLabel>{i18n.t("card.msgSlideToDelete")}</InfoLabel>
            <div className="clear"></div>
            <EmptyCardItem
              onClick={() => {
                this.props.wallet.bankCardList.length > 0 &&
                (config.features.ChangesNotAllowed ||
                  config.features.AddCard_NotAllowedEditDelete ||
                  this.props.wallet.bankCardList.length >=
                    config.features.AddCard_MaximumCardAllowed)
                  ? this.props.alert("", i18n.t("card.toEdit"))
                  : this.props.navigate("/card/add");
              }}
            >
              <EmptyCardAdd></EmptyCardAdd>
              <EmptyCardTitle>{i18n.t("card.msgAddCard")}</EmptyCardTitle>
              <EmptyCardDesc>{i18n.t("card.msgAddCardDesc")}</EmptyCardDesc>
            </EmptyCardItem>
          </>
        )}
        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        ></MessageDialog>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
