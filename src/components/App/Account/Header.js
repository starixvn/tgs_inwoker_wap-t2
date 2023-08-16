import React from "react";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";

import IconRefreshPNG from "../../../assets/images/icon-refresh.png";

import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  width: 1205px;
  height: 70px;
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0px 1px 12px -5px rgba(0, 0, 0, 0.75);
  padding-left: 10px;
`;
const SpliterLine = styled.div`
  background-color: #8a7f73;
  width: 1.2px;
  height: 50px;
  float: left;
  margin: 12px 0;
`;
const MainWalletContainer = styled.div`
  float: left;
  margin: 10px 15px;
`;
const MainAccountLabel = styled.div`
  font-size: ${(props)=> i18n.language === "ta-IN" ? "12px" : "16px"};
  color: #8a7f73;
  height: 21px;
  float: left;
  margin-top: 25px;
  ${(props) => i18n.language ? ` 
  margin-top: 10px;   
  width: 95px;
  height: 100%;
  word-break: break-all;
  white-space: normal;` : `` 
  }
`;
const AmountContainer = styled.div`
  width: 170px;
  float: left;
  font-family: Arial;
  font-size: 36px;
  text-align: right;
  color: #8a7f73;
  margin-top: 10px;
`;
const RefreshButton = styled.div`
  width: 25px;
  height: 25px;
  margin: 22px 0px 0 4px;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 25px;
  height: 25px;
  background: url(${IconRefreshPNG}) no-repeat center;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

function Header(props) {
  var ingame = 0;
  props.game.providerList.map((item) => {
    if (item.transferwallet === true) ingame += parseFloat(item.balance);
  });

  return (
    <Container>
      {/* <AvatarContainer src={props.info.avatar}></AvatarContainer>
      <PlayerInfoContainer>
        <PlayerName>{props.info.member_username}</PlayerName>
        <MissionContainer>
          {i18n.t("web.account.header.lastLogin")}:{props.info.member_last_login}
        </MissionContainer>

      </PlayerInfoContainer> */}

      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.mainWallet")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              props.wallet.mainSymbol +
              Common.formatNumberWithThousand(props.wallet.mainBalance)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={props.onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
      <SpliterLine></SpliterLine>
      {props.game.containTransferWallet && (
        <>
          <MainWalletContainer>
            <MainAccountLabel>
              {i18n.t("web.account.header.allGameWallet")}:
            </MainAccountLabel>
            <AmountContainer>
              <DynamicFont
                content={
                  props.wallet.mainSymbol +
                  Common.formatNumberWithThousand(ingame)
                }
              />
            </AmountContainer>
            <RefreshButton onClick={props.onhandleRefreshClick}>
              <RefreshButtonIcon></RefreshButtonIcon>
            </RefreshButton>
          </MainWalletContainer>
          <SpliterLine></SpliterLine>
        </>
      )}

      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.total")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              props.wallet.mainSymbol +
              Common.formatNumberWithThousand(props.wallet.mainBalance + ingame)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={props.onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
    </Container>
  );
}
export default Header;
