import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Router, Route, Switch, Redirect } from "react-router";
import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import IconDepositPNG from "../../../assets/images/icon-deposit.png";
import IconWithdrawPNG from "../../../assets/images/icon-withdraw.png";
import IconTransferPNG from "../../../assets/images/icon-transfer.png";
import IconReportPNG from "../../../assets/images/icon-report.png";
import IconProfilePNG from "../../../assets/images/icon-profile.png";

import IconBonusPNG from "../../../assets/images/icon-bonus.png";
import IconInboxPNG from "../../../assets/images/icon-inbox.png";

import IconDepositActivePNG from "../../../assets/images/icon-deposit-active.png";
import IconWithdrawActivePNG from "../../../assets/images/icon-withdraw-active.png";
import IconTransferActivePNG from "../../../assets/images/icon-transfer-active.png";
import IconReportActivePNG from "../../../assets/images/icon-report-active.png";
import IconProfileActivePNG from "../../../assets/images/icon-profile-active.png";

import IconBonusActivePNG from "../../../assets/images/icon-bonus-active.png";
import IconInboxActivePNG from "../../../assets/images/icon-inbox-active.png";

import IconVIPPNG from "../../../assets/images/icon-vip.png";
import IconVIPActivePNG from "../../../assets/images/icon-vip.png";

import Header from "./Header";
import Profile from "./Profile/index";
import VIP from "./Vip/index.js";

import Inbox from "./Inbox/index";
import Report from "./Report/index";
import Transfer from "./Transfer/index";
import Deposit from "./Deposit/index";
import Affiliate from "./Affiliate";

import Withdrawal from "./Withdrawal/index";
import { accountAction } from "../../../api-services/actions/accountAction";
import { walletAction } from "../../../api-services/actions/walletAction";
import i18n from "../../../utils/i18n";

import AvatarPNG from "../../../assets/images/avatar.png";
import Common from "../../../utils/Common";
import config from "../../../config/config";
import Memo from "./Memo";

const Container = styled.div`
  width: 100%;
  background: #f5f6fa;
`;
const InnerContainer = styled.div`
  margin: 35px auto;
  width: 1230px;
  overflow: auto;
  padding-bottom: 15px;
`;

const Main = styled.div`
  margin-left: 12px;

  height: 100%;
  width: 1206px;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const LeftMenu = styled.div`
  background-color: #ffffff;
  width: 216px;
  float: left;
  padding: 0px 0px 0px 12px;
  box-shadow: 6px 0 8px -6px rgb(50 50 93 / 45%);
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
`;
const RightContent = styled.div`
  width: 990px;
  height: 100%;
  float: right;
`;
const MenuTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 12px;
  margin-top: 20px;
  color: #404040;
`;
const MenuButtonDiv = styled.div`
  width: 204px;
  height: 40px;
  color: #8a7f73;
  margin: 20px 0px 20px 0px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  font-size: ${(props)=> i18n.language === "ta-IN" ? "12px" : "14px"};
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.active
      ? ` background-color: #f5f6fa;
      color: #404040;`
      : " background-color: transparent;"};
`;
const MenuButtonSpan = styled.span`
  float: left;
  width: 122px;
  display: block;
  margin-top: 10px;
`;
const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;
`;
const MenuDepositImg = styled(MenuImgFrame)`
  background-size: 15px 15px;
  ${(props) =>
    props.active
      ? `background: url(${IconDepositActivePNG}) no-repeat center center;`
      : `background: url(${IconDepositPNG}) no-repeat center center;`}
`;
const MenuWithdrawImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconWithdrawActivePNG}) no-repeat center center;`
      : `background: url(${IconWithdrawPNG}) no-repeat center center;`}
  background-size:15px 15px;
`;
const MenuTransferImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconTransferActivePNG}) no-repeat center center;`
      : `background: url(${IconTransferPNG}) no-repeat center center;`}
  background-size:15px 15px;
`;
const MenuReportImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconReportActivePNG}) no-repeat center center;`
      : `background: url(${IconReportPNG}) no-repeat center center;`}

  background-size:15px 15px;
`;
const MenuProfileImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconProfileActivePNG}) no-repeat center center;`
      : `background: url(${IconProfilePNG}) no-repeat center center;`}

  background-size:15px 15px;
`;

const MenuBonusImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconBonusActivePNG}) no-repeat center center;`
      : `background: url(${IconBonusPNG}) no-repeat center center;`}

  background-size:15px 15px;
`;
const MenuInboxImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconInboxActivePNG}) no-repeat center center;`
      : `background: url(${IconInboxPNG}) no-repeat center center;`}

  background-size:15px 15px;
`;

const MenuVIPImg = styled(MenuImgFrame)`
  ${(props) =>
    props.active
      ? `background: url(${IconVIPActivePNG}) no-repeat center center;`
      : `background: url(${IconVIPPNG}) no-repeat center center;`}

  background-size:15px 15px;
`;

const AvatarContainer = styled.img`
  width: 120px;
  margin: 30px 0 0 35px;
`;
const PlayerName = styled.div`
  font-size: 20px;
  color: #8a7f73;
  height: 28px;
  text-align: center;
`;
const BtnLogout = styled.div`
  color: #8a7f73;
  text-align: right;
  padding: 10px 0px 0 0;
  border-radius: 10px;
  margin-right: 12px;
  text-align: center;
  border: 2px solid #8a7f73;
  border-radius: 20px;
  height: 45px;
  margin-top: 60px;
  transition: background-color 0.5s ease;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    color: #f0ca83;
    background-color: #8a7f73;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
`;
const VIPLabel = styled.div`
  font-weight: bold;
  margin-top: 12px;

  font-size: 18px;

  color: #8a7f73;
  width: 100%;
  text-align: center;
`;
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.match.params.tab,
    };
  }
  async componentDidMount() {
    if (this.props.account.token === null) {
      await this.timeout(1000);
      if (this.props.account.token === null) {
        AppHistory.replace(`/`);
      }
      this.getAllGameBalance();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.account.token !== this.props.account.token &&
      this.props.account.token === null
    ) {
      AppHistory.replace(`/`);
    }
    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ ...this.state, activePage: this.props.match.params.tab });
    }
    if (
      this.props.game.providerList.length !==
        prevProps.game.providerList.length &&
      this.props.game.providerList.length > 0
    ) {
      this.getAllGameBalance();
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
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.updateBalanceList();
    this.getAllGameBalance();
  };
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  componentDidUpdate(prevProps, prevState) {}

  handleClickTab = (link) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.setActivePage(link);
    this.props.history.push("/account/" + link);
  };
  handleMoreBenefitClick = (viptitle) => {
    this.props.history.push("/vip");
  };
  handleIDVerifyClick = () => {
    this.props.history.push("/account/profile/member_name");
  };
  handlePhoneVerifyClick = () => {
    this.props.history.push("/account/profile/member_phone");
  };
  handleEmailVerifyClick = () => {
    this.props.history.push("/account/profile/member_email");
  };
  genImgComponent = (link) => {
    switch (link) {
      case "deposit":
        return (
          <MenuDepositImg
            active={this.state.activePage === link}
          ></MenuDepositImg>
        );
      case "withdrawal":
        return (
          <MenuWithdrawImg
            active={this.state.activePage === link}
          ></MenuWithdrawImg>
        );
      case "transfer":
        return (
          <MenuTransferImg
            active={this.state.activePage === link}
          ></MenuTransferImg>
        );
      case "report":
        return (
          <MenuReportImg
            active={this.state.activePage === link}
          ></MenuReportImg>
        );
      case "profile":
        return (
          <MenuProfileImg
            active={this.state.activePage === link}
          ></MenuProfileImg>
        );
      case "affiliate":
        return (
          <MenuBonusImg active={this.state.activePage === link}></MenuBonusImg>
        );
      case "inbox":
      case "memo":
        return (
          <MenuInboxImg active={this.state.activePage === link}></MenuInboxImg>
        );
      case "vip":
        return (
          <MenuVIPImg active={this.state.activePage === link}></MenuVIPImg>
        );
      default:
        return <></>;
    }
  };
  genMenuButtonDiv = (text, link) => {
    return (
      <MenuButtonDiv
        active={this.state.activePage === link}
        onClick={() => this.handleClickTab(link)}
      >
        <MenuImgFrame>{this.genImgComponent(link)}</MenuImgFrame>
        <MenuButtonSpan>{text}</MenuButtonSpan>
      </MenuButtonDiv>
    );
  };
  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/");
  };

  setActivePage = (page) => {
    this.setState({
      ...this.state,
      activePage: page,
    });
  };
  render() {
    return (
      <Container>
        <InnerContainer>
          <Main>
            <LeftMenu>
              <AvatarContainer
                src={
                  this.props.account.info.avatar
                    ? this.props.account.info.avatar
                    : AvatarPNG
                }
              ></AvatarContainer>
              <PlayerName>{this.props.account.info.member_username}</PlayerName>
              {config.features.HaveVIPFeature && (
                <VIPLabel>
                  VIP
                  {this.props.account.info.member_level_id}
                </VIPLabel>
              )}
              <MenuTitle>{i18n.t("web.account.fund")}</MenuTitle>
              {this.genMenuButtonDiv(i18n.t("web.account.deposit"), "deposit")}
              {this.genMenuButtonDiv(
                i18n.t("web.account.withdrawal"),
                "withdrawal"
              )}
              {this.props.game.containTransferWallet &&
                !config.features.NewTransferUI &&
                this.genMenuButtonDiv(
                  i18n.t("web.account.transfer"),
                  "transfer"
                )}
              {this.genMenuButtonDiv(i18n.t("web.account.report"), "report")}
              <MenuTitle>{i18n.t("web.account.personal")}</MenuTitle>
              {this.genMenuButtonDiv(i18n.t("web.account.profile"), "profile")}
              {this.genMenuButtonDiv(i18n.t("web.account.inbox"), "inbox")}{" "}
              {this.genMenuButtonDiv(i18n.t("memo"), "memo")}
              {config.features.HaveVIPFeature &&
                this.genMenuButtonDiv("VIP", "vip")}
              {this.props.general.haveAffiliate &&
                this.genMenuButtonDiv(
                  i18n.t("web.account.affiliate"),
                  "affiliate"
                )}
              <BtnLogout onClick={this.onhandleLogout}>
                {i18n.t("web.header.logout")}
              </BtnLogout>
            </LeftMenu>
            <RightContent>
              <Header
                info={this.props.account.info}
                vip={this.props.account.vip}
                game={this.props.game}
                wallet={this.props.wallet}
                onhandleClickTab={this.handleClickTab}
                onhandleRefreshClick={this.handleRefreshClick}
                onhandleMoreBenefitClick={this.handleMoreBenefitClick}
                onIDVerifyClick={this.handleIDVerifyClick}
                onPhoneVerifyClick={this.handlePhoneVerifyClick}
                onEmailVerifyClick={this.handleEmailVerifyClick}
              ></Header>

              <Router history={AppHistory}>
                <Switch>
                  <Route
                    exact
                    path={"/account/deposit/:promotionid?"}
                    render={(props) => (
                      <Deposit
                        token={this.props.account.token}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={"/account/manual/:paymentId"}
                    render={(props) => (
                      <Deposit
                        setActivePage={this.setActivePage}
                        token={this.props.account.token}
                        account={this.props.account}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={"/account/withdrawal"}
                    render={(props) => (
                      <Withdrawal
                        token={this.props.account.token}
                        onhandleClickTab={this.handleClickTab}
                        onhandleCSClick={this.props.onhandleCSClick}
                        account={this.props.account}
                        onhandleRefreshClick={this.handleRefreshClick}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={"/account/inbox"}
                    render={(props) => (
                      <Inbox token={this.props.account.token} />
                    )}
                  />
                  {config.features.HaveVIPFeature && (
                    <Route
                      exact
                      path={"/account/vip"}
                      render={(props) => (
                        <VIP token={this.props.account.token} />
                      )}
                    />
                  )}
                  <Route
                    exact
                    path={"/account/report"}
                    render={(props) => (
                      <Report
                        token={this.props.account.token}
                        checkTransferWallet={
                          this.props.game.containTransferWallet
                        }
                      />
                    )}
                  />
                  {this.props.game.containTransferWallet &&
                    !config.features.NewTransferUI && (
                      <Route
                        exact
                        path={"/account/transfer"}
                        render={(props) => (
                          <Transfer
                            token={this.props.account.token}
                            getAllGameBalance={this.getAllGameBalance}
                          />
                        )}
                      />
                    )}

                  <Route
                    exact
                    path={"/account/profile/:popup?"}
                    render={(props) => (
                      <Profile
                        account={this.props.account}
                        onhandleCSClick={this.props.onhandleCSClick}
                        popup={this.props.match.params.popup}
                      />
                    )}
                  />
                  {this.props.general.haveAffiliate && (
                    <Route
                      exact
                      path={"/account/affiliate"}
                      render={(props) => (
                        <Affiliate
                          token={this.props.account.token}
                          account={this.props.account}
                          onhandleCSClick={this.props.onhandleCSClick}
                          popup={this.props.match.params.popup}
                        />
                      )}
                    />
                  )}

                  <Route
                    exact
                    path={"/account/memo"}
                    render={(props) => (
                      <Memo
                        token={this.props.account.token}
                        account={this.props.account}
                        onhandleCSClick={this.props.onhandleCSClick}
                        popup={this.props.match.params.popup}
                      />
                    )}
                  />
                  <Redirect to={"/account/profile"}></Redirect>
                </Switch>
              </Router>
            </RightContent>
          </Main>
        </InnerContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateBalanceList: () => dispatch(walletAction.updateBalanceList()),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
