import { AppBar, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import Common from "../../../../../../utils/Common";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import i18n from "../../../../../../utils/i18n";
import OnlineUserDisplayer from "../../../../../Share/online-user-displayer";
import Marquee from "../../Marquee";

var height = 250;

const StyledAppBar = withStyles({
  root: {
    height: `${height}px`,
    boxShadow: "none",
  },
})(AppBar);

const FixedContainer = styled.div`
  background-color: #fff;
  height: 250px;
  width: 100%;
  position: absolute;
  bottom: -2px;
`;
const AnnouncementContainer = styled.div`
  margin: 10px 23px;
  display: flex;
`;

const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;

  line-hight: 26px;
  overflow: hidden;
  margin: 5px 0 0 8px;
  color: #f6f6f6;
  width: 100%;
  flex: 1;
  height: 36px;
  border-radius: 17px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
const ProfileContainer = styled.div`
  width: 100%;
  height: 192px;
`;
const ProfileContainerTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};

  padding: 15px 25px 0 26px;
`;
const ProfileContainerBottom = styled.div`
  width: 100%;

  padding: 0 25px 0 26px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
const WelcomeLabel = styled.div`
  float: left;

  font-size: 22px;

  color: #dfdfdf;
`;
const WelcomeUsernameLabel = styled(WelcomeLabel)`
  color: #fde73f;
  font-weight: bold;
`;

const DisplayerContainer = styled.div`
  float: right;
`;
const BalanceContainer = styled.div`
  float: left;
`;
const BalanceAmount = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  width: 100%;
  margin-top: 35px;
`;
const WalletTypeLabel = styled(WelcomeLabel)`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;
const WalletActionContainer = styled.div`
  float: right;
`;
const WalletActionUL = styled.ul`
  text-align: center;

  margin-top: 15px;

  font-size: 28px;

  color: #ffffff;
`;
const WalletActionLI = styled.li`
  display: inline-table;
  padding: 0 10px;
  font-size: 24px;
  text-align: center;
`;
const WalletActionIcon = styled.div`
  ${(props) => `background:url(${props.img}) no-repeat center center; `}
  background-color: ${(props) => props.theme.secondary};
  margin: 0 auto;
  border-radius: 50%;
  background-size: 60px;
  width: 80px;
  height: 80px;
`;

const TheSpeaker = styled.div`
  background-color: ${({ theme }) => theme.primary};
  width: 40px;
  height: 40px;
  mask: url(${process.env.PUBLIC_URL}/assets/images/homeIcon/announceIcon.svg)
    no-repeat center / contain;
  z-index: 3;
`;
const GameBackground = styled.div`
  background: url(${process.env
    .PUBLIC_URL}/assets/images/mbHomePage/WGHK/background.png);
  background-size: cover;
`;
const TheButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20%;
  width: 100vw;
`;

const TheButton = styled.div`
  padding: 15px 45px;
  font-size: 36px;
  border-radius: 10px;
  color: #fff;
  background: #ff9900;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const GamePage = (props) => {
  var checkTransferWallet =
    Object.values(props.game.providerList).filter(
      (item) => item.transferwallet === true
    ).length > 0;

  const onClickStartGame = () => {
    Common.closePreviousPopup();
    Common.PopupCenter(
      "/" +
        i18n.language +
        "/joinlobbygame/" +
        GameTypeEnum.SPORTS +
        "/WGFM/true",
      "gamewindow"
    );
  };
  return (
    <>
      <StyledAppBar position="fixed" color="default">
        {/* <LogoHolderAppBar>
          <LogoHolder
            img={props.general.brand && props.general.brand.mobileLogoUrl}
          />
        </LogoHolderAppBar> */}
        <FixedContainer>
          <AnnouncementContainer>
            <TheSpeaker></TheSpeaker>
            <MarqueeContainer>
              <Marquee />
            </MarqueeContainer>
          </AnnouncementContainer>
          <ProfileContainer
            src={
              process.env.PUBLIC_URL + `/assets/images/wapp/home-profile.png`
            }
          >
            <ProfileContainerTop>
              {(() => {
                if (props.account.token != null) {
                  return (
                    <React.Fragment>
                      <WelcomeLabel>
                        {i18n.t("wap.main.home.profile.welcomeBack")}
                      </WelcomeLabel>
                      <WelcomeUsernameLabel>
                        {props.account.info.member_username}
                        {config.features.HaveVIPFeature &&
                          `(VIP
                        ${props.account.info.member_level_id})`}
                      </WelcomeUsernameLabel>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <WelcomeLabel>
                      {i18n.t("wap.main.home.profile.pleaseLogin")}
                    </WelcomeLabel>
                  );
                }
              })()}

              {config.features.OnlineUser && (
                <DisplayerContainer>
                  <OnlineUserDisplayer color="#fff" size="20px" />
                </DisplayerContainer>
              )}
            </ProfileContainerTop>
            <ProfileContainerBottom>
              <BalanceContainer>
                {props.account.token && (
                  <React.Fragment>
                    <BalanceAmount>
                      {props.wallet.mainSymbol}
                      {Common.formatNumberWithThousand(
                        props.wallet.mainBalance +
                          props.game.providerList
                            .filter(
                              (item) =>
                                item.status === 0 &&
                                item.transferwallet === true
                            )
                            .reduce((a, v) => (a = a + v.balance), 0)
                      )}
                    </BalanceAmount>

                    <WalletTypeLabel>
                      {i18n.t("wap.main.home.profile.mainAccount")}
                    </WalletTypeLabel>
                  </React.Fragment>
                )}
              </BalanceContainer>
              <WalletActionContainer>
                <WalletActionUL>
                  {config.features.HaveVIPFeature &&
                    config.features.HomePage_DisplayVIP && (
                      <WalletActionLI
                        onClick={() => {
                          AppHistory.push("/" + i18n.language + "/vip");
                        }}
                      >
                        <WalletActionIcon
                          img={
                            process.env.PUBLIC_URL +
                            `/assets/images/wapp/home-vip.png`
                          }
                        ></WalletActionIcon>
                        VIP
                      </WalletActionLI>
                    )}
                  <WalletActionLI
                    onClick={() => {
                      AppHistory.push("/" + i18n.language + "/deposit");
                    }}
                  >
                    <WalletActionIcon
                      img={
                        process.env.PUBLIC_URL +
                        `/assets/images/wapp/icon-deposit.png`
                      }
                    ></WalletActionIcon>
                    {i18n.t("common.deposit")}
                  </WalletActionLI>
                  {checkTransferWallet && (
                    <WalletActionLI
                      onClick={() => {
                        AppHistory.push("/" + i18n.language + "/transfer");
                      }}
                    >
                      <WalletActionIcon
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/icon-transfer.png`
                        }
                      ></WalletActionIcon>
                      {i18n.t("common.transfer")}
                    </WalletActionLI>
                  )}

                  <WalletActionLI
                    onClick={() => {
                      if (
                        props.wallet.bankCardList != null &&
                        props.wallet.bankCardList.length === 0 &&
                        config.features.AddCard_NotAllowedEditDelete
                      ) {
                        this.props.alert(
                          "",
                          i18n.t("disabledAddCard.title") +
                            " " +
                            i18n.t("disabledAddCard.description")
                        );
                      } else {
                        AppHistory.push("/" + i18n.language + "/withdrawal");
                      }
                    }}
                  >
                    <WalletActionIcon
                      img={
                        process.env.PUBLIC_URL +
                        `/assets/images/wapp/icon-withdrawal.png`
                      }
                    ></WalletActionIcon>
                    {i18n.t("common.withdrawal")}
                  </WalletActionLI>
                </WalletActionUL>
              </WalletActionContainer>
            </ProfileContainerBottom>
          </ProfileContainer>
        </FixedContainer>
      </StyledAppBar>
      <GameBackground
        style={{ marginTop: height + 5, height: window.innerHeight - 250 - 90 }}
        onClick={onClickStartGame}
      >
        <TheButtonContainer>
          <TheButton>{i18n.t("common.startGame")}</TheButton>
        </TheButtonContainer>
        {/* <GameIFrame
          brand="WGFM"
          sharedprops={sharedProps}
          token={props.account.token}
          type={GameTypeEnum.SPORTS}

          // updateHeight={updateIframeHeight}
        /> */}
      </GameBackground>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
