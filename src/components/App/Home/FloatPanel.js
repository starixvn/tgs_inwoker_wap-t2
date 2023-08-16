import React from "react";
import styled from "styled-components";

import FloatingCSPNG from "../../../assets/images/floating-cs.png";
import FloatingCSHoverPNG from "../../../assets/images/floating-cs-hover.png";
import FloatingCSBorderlessBlackPNG from "../../../assets/images/floating-cs-borderless-black.png";
import FloatingCSBorderlessPNG from "../../../assets/images/floating-cs-borderless.png";

import FloatingDownloadPNG from "../../../assets/images/floating-download.png";
import FloatingDownloadHoverPNG from "../../../assets/images/floating-download-hover.png";

import Floating4PNG from "../../../assets/images/floating-4.png";
import Floating4HoverPNG from "../../../assets/images/floating-4-hover.png";
import Floating5PNG from "../../../assets/images/floating-5.png";
import Floating5HoverPNG from "../../../assets/images/floating-5-hover.png";

import IconDollarRedPNG from "../../../assets/images/icon-dollar-red.png";
import i18n from "../../../utils/i18n";

export default function FloatPanel(props) {
  const Container = styled.div`
    width: 62px;
    height: 300px;
    position: fixed;
    right: 15px;
    top: 60%;
    transform: translateY(-50%);
    overflow: visible;
    z-index: 8;
  `;
  const DiamondShapeContainer = styled.div`
    width: 62px;
    height: 62px;
    transform: rotate(45deg);
    overflow: visible;
    background-color: #ffff;
    border-width: 2px;
    border-color: #f4ddb1;
    border-style: solid;
    &:hover {
      background-color: #8a7f73;
      cursor: pointer;
      border-color: transparent;
    }
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
    margin: 30px 10px 30px auto;
  `;
  const ButtonWrap = styled.div`
    width: 62px;
    height: 62px;
    overflow: visible;
    transform: rotate(-45deg);
  `;

  const FundWifiPopup = styled.div`
    position: absolute;
    width: 126px;
    height: 67px;
    left: -120px;
    display: none;
    top: -15px;
  `;
  const HoverContainerIcon = styled.div`
    float: left;
    width: 28px;
    height: 28px;
    background-color: #16242a;
    margin: 16px 0 0 22px;
    background: url(${(props) => props.icon}) no-repeat;

    &:hover {
      background: url(${(props) => props.iconhover}) no-repeat;
    }
  `;
  const HoverText = styled.div`
    font-size: 16px;
    font-family: Roboto;
    float: left;
    color: #8a7f73;
    margin: 20px 0px 0 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #8a7f73;
    position: relative;
    overflow: visible;
    &:before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      top: 24px;
      left: 67px;
      background-color: #8a7f73;
      transform: rotate(45deg);
    }
    &:hover {
      background: url(${(props) => props.iconhover}) no-repeat;
    }
  `;
  const FundContainer = styled(FundWifiPopup)`
    &:hover ${HoverContainerIcon} {
      background: url(${IconDollarRedPNG}) no-repeat;
    }
    &:hover ${HoverText} {
      color: #f0ca83;
      border-bottom: 2px solid #f0ca83;
      &:before {
        background-color: #f0ca83;
      }
    }
  `;
  const ButtonFund = styled(ButtonWrap)`
    background: url(${Floating4PNG}) no-repeat center;
    &:hover {
      background: url(${Floating4HoverPNG}) no-repeat center;
      cursor: pointer;
    }
    &:hover ${FundContainer} {
      display: block;
    }
  `;

  const CSContainer = styled.div`
    display: none;
    position: absolute;
    width: 126px;
    height: 138px;
    left: -120px;
    top: -15px;
  `;

  const CSIcon = styled.div`
    background-size: contain;
    width: 25px;
    height: 25px;
    margin: 15px 0 0 15px;
    float: left;

    background: url(${FloatingCSBorderlessBlackPNG}) no-repeat;
  `;
  const CSText = styled.div`
    font-family: Roboto;
    font-size: 16px;
    float: left;
    color: #8a7f73;
    margin: 16px 0px 0 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #8a7f73;
    position: relative;
    overflow: visible;
    &:before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      top: 24px;
      left: 67px;
      background-color: #8a7f73;
      transform: rotate(45deg);
    }
  `;

  const CSPhoneText = styled.div`
    font-family: Roboto;
    font-size: 16px;
    float: left;
    color: #8a7f73;
    margin: 0px 0px 0 10px;
  `;
  const CSPhoneNumber = styled.div`
    font-size: 14px;
    font-weight: bold;
    font-family: Roboto;
    color: #16242a;
    margin: 5px 0 0 8px;
    padding-bottom: 5px;
    border-bottom: 2px solid #8a7f73;
    position: relative;
    overflow: visible;
    float:left &:before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      top: 20px;
      left: 88px;
      background-color: #8a7f73;
      transform: rotate(45deg);
    }
  `;
  const CSPhoneContainer = styled.div`
    margin: 12px 20px 0 5px;
    height: 58px;
  `;
  const CSOnlineContainer = styled.div`
    margin: 2px 20px 0 5px;
    height: 58px;

    &:hover {
      cursor: pointer;
    }
    &:hover ${CSIcon} {
      background: url(${FloatingCSBorderlessPNG}) no-repeat;
    }
    &:hover ${CSText} {
      color: #f0ca83;
      border-bottom: 2px solid #f0ca83;
    }
  `;

  const DownloadContainer = styled.div`
    display: none;
    position: absolute;
    width: 126px;
    height: 67px;
    left: -120px;
    top: -15px;
  `;
  const ButtonCS = styled(ButtonWrap)`
    background: url(${FloatingCSPNG}) no-repeat center;
    &:hover {
      background: url(${FloatingCSHoverPNG}) no-repeat center;
      cursor: pointer;
    }

    &:hover ${CSContainer} {
      display: block;
    }
  `;
  const ButtonDownload = styled(ButtonWrap)`
    background: url(${FloatingDownloadPNG}) no-repeat center;
    &:hover {
      background: url(${FloatingDownloadHoverPNG}) no-repeat center;
      cursor: pointer;
    }

    &:hover ${DownloadContainer} {
      display: block;
    }
  `;
  const ButtonTop = styled(ButtonWrap)`
    background: url(${Floating5PNG}) no-repeat center;
    &:hover {
      background: url(${Floating5HoverPNG}) no-repeat center;
      cursor: pointer;
    }

    &:hover ${FundContainer} {
      display: block;
    }
  `;
  const QRTitle = styled.div`
    font-size: 16px;
    font-family: Roboto;
    float: left;
    color: #8a7f73;
    margin: 20px 0px 0 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #8a7f73;
    position: relative;
    overflow: visible;
    &:before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      top: 24px;
      left: 67px;
      background-color: #8a7f73;
      transform: rotate(45deg);
    }
    &:hover {
      color: #f0ca83;
      border-bottom: 2px solid #f0ca83;
    }
  `;

  return (
    <Container>
      <DiamondShapeContainer>
        <ButtonCS>
          <CSContainer>
            <CSOnlineContainer onClick={props.onhandleShowCSClick}>
              <CSText>{i18n.t("web.rightNavBar.cs.csDesc")}</CSText>
            </CSOnlineContainer>
            <CSPhoneContainer>
              <CSPhoneText>{i18n.t("web.rightNavBar.cs.contact")}</CSPhoneText>
              <div className="clear"></div>
              <CSPhoneNumber>{i18n.t("common.csPhoneNumber")}</CSPhoneNumber>
            </CSPhoneContainer>
          </CSContainer>
        </ButtonCS>
      </DiamondShapeContainer>
      <DiamondShapeContainer>
        <ButtonFund>
          <FundContainer onClick={props.onhandleDepositClick}>
            <HoverText>{i18n.t("web.rightNavBar.wallet")}</HoverText>
          </FundContainer>
        </ButtonFund>
      </DiamondShapeContainer>
      <DiamondShapeContainer>
        <ButtonDownload onClick={props.onDownloadClick}>
          <DownloadContainer>
            <QRTitle>{i18n.t("web.rightNavBar.codeTitle")}</QRTitle>
          </DownloadContainer>
        </ButtonDownload>
      </DiamondShapeContainer>
      <DiamondShapeContainer>
        <ButtonTop
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ></ButtonTop>
      </DiamondShapeContainer>
    </Container>
  );
}
