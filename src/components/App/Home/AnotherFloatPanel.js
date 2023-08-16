import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { generalAction } from "../../../api-services/actions/generalAction";

import PanelUserPNG from "../../../assets/images/panel/01-2.png";
import PanelCSPNG from "../../../assets/images/panel/02-2.png";
import PanelUserPNG2 from "../../../assets/images/panel/01-3.png";
import PanelCSPNG2 from "../../../assets/images/panel/02-3.png";
import PanelDownloadPNG from "../../../assets/images/panel/001-3.png";
import PanelDownloadPNG2 from "../../../assets/images/panel/001-1.png";

import Help1PNG from "../../../assets/images/panel/icon-01.png";
import Help2PNG from "../../../assets/images/panel/icon-02.png";
import Help3PNG from "../../../assets/images/panel/icon-03.png";
import Help4PNG from "../../../assets/images/panel/icon-04.png";
import Help5PNG from "../../../assets/images/panel/icon-05.png";
import Help6PNG from "../../../assets/images/panel/icon-06.png";

import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";

import IMHandler from "../../Share/IMHandler";

import { AppHistory } from "../../../history/History";
import config from "../../../config/config";

const Icon = styled.div`
  height: 70px;
  width: 50px;

  background: url(${({ active, src, src2 }) => (active ? src2 : src)}) no-repeat
    center;
  transition: transform 0.5s;
  background-size: 100%;
  transform: translate(0px, ${({ active }) => (active ? "-5px" : "3px")});
`;

const Text = styled.div`
  font-size: 8px;
  text-align: center;
  width: 50px;
  pointer-events: none;
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: opacity 200ms;
  transform: translateY(-15px);
`;

const RotateBack = styled.div`
  transform: rotate(-45deg);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  height: auto;
  position: fixed;
  right: 2%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);
  overflow: visible;
  color: white;
  border-radius: 8px;
  z-index: 5;

  :hover {
  }
`;

const SidePanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 75px;
  height: 75px;
  transform: rotate(45deg);
  overflow: visible;

  border-width: 2px;
  border-color: #f4ddb1;
  border-style: solid;
  border-radius: 10px;

  ${({ active }) => {
    return active
      ? `  
       background-color: #c7a87c;`
      : `  
      background-color: #ffff;`;
  }}

  &:hover {
    background-color: #c7a87c;
    cursor: pointer;
    border-color: transparent;

    ${Icon} {
      background: url(${({ src2 }) => src2}) no-repeat center;
      background-size: 100%;
      transform: translate(0px, -5px);
    }
    ${Text} {
      opacity: 1;
      transition: opacity 200ms;
      transition-delay: 100ms;
    }
  }
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  margin: 30px 10px 5px auto;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }

  .MuiDialog-paper {
    min-width: 900px;

    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: #c7a87c;
`;

const DialogTitleTwo = styled(DialogTitle)`
  justify-content: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const CSSection = styled.div`
  background: #c7a87c;
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

const CSSectionContent = styled.div`
  min-height: 100%;
  min-width: 100%;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const CSActualContent = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto;
  padding: 30px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  display: flex;
  padding: 20px;
`;

const QRCodeTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 5px 0px;
  font-weight: bold;
  font-size: 20px;
`;

const CSButtonContainer = styled.div`
  padding: 10px;
  text-align: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  user-select: none;
`;

const IconHolder = styled.img`
  height: auto;
  width: 75px;
`;

const Icons = styled.img`
  margin-bottom: 10px;
  cursor: pointer;
`;

const QRCodeImage = styled.img`
  height: 150px;
  width: 150px;
`;

const AnotherFloatPanel = (props) => {
  const [supportModal, setSupportModal] = useState(false);
  const [csModal, setCsModal] = useState(false);

  const performOpenSupportModal = () => {
    setSupportModal(true);
  };
  const performOpenCsModal = () => {
    props.onhandleShowCSClick();
  };

  const performCloseSupportModal = () => {
    setSupportModal(false);
  };
  const performCloseCsModal = () => {
    setCsModal(false);
  };

  const buttons = [
    {
      icon: Help1PNG,
      name: i18n.t("panel.liveChatOptionFund"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help2PNG,
      name: i18n.t("panel.liveChatOptionBall"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help3PNG,
      name: i18n.t("panel.liveChatOptionLive"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help4PNG,
      name: i18n.t("panel.liveChatOptionLottery"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help5PNG,
      name: i18n.t("panel.liveChatOptionRegister"),
      click: props.onhandleShowCSClick,
    },
    {
      icon: Help6PNG,
      name: i18n.t("panel.liveChatOptionSlot"),
      click: props.onhandleShowCSClick,
    },
  ];

  var containIM = props.general.brandsSupport.length > 0;

  return (
    <div>
      <Container>
        {props.general.livechat && !config.features.LiveChatVendor && (
          <SidePanel
            active={csModal}
            onClick={() => {
              performOpenCsModal();
            }}
            src2={PanelUserPNG2}
          >
            <RotateBack active={csModal}>
              <Icon
                src={PanelUserPNG}
                src2={PanelUserPNG2}
                active={csModal}
                alt="user-icon"
              />

              <Text active={csModal}>
                {config.features.FloatPanel_CustomTranslation
                  ? i18n.t("mess888.panel.cs")
                  : i18n.t("panel.cs")}
              </Text>
            </RotateBack>
          </SidePanel>
        )}
        {containIM && (
          <SidePanel
            active={supportModal}
            onClick={() => {
              performOpenSupportModal();
            }}
            src2={PanelCSPNG2}
          >
            <RotateBack active={supportModal}>
              <Icon
                src={PanelCSPNG}
                src2={PanelCSPNG2}
                active={supportModal}
                alt="user-cs"
              />
              <Text active={supportModal}>
                {config.features.FloatPanel_CustomTranslation
                  ? i18n.t("mess888.panel.im")
                  : i18n.t("panel.im")}
              </Text>
            </RotateBack>
          </SidePanel>
        )}

        {config.features.HaveDownloadFeature && (
          <SidePanel
            active={supportModal}
            onClick={() => {
              AppHistory.replace("/download");
            }}
            src2={PanelDownloadPNG2}
          >
            <RotateBack active={supportModal}>
              <Icon
                src={PanelDownloadPNG}
                src2={PanelDownloadPNG2}
                active={supportModal}
                alt="user-cs"
              />
              <Text active={supportModal}>
                {config.features.FloatPanel_CustomTranslation
                  ? i18n.t("mess888.panel.download")
                  : i18n.t("download.title")}
              </Text>
            </RotateBack>
          </SidePanel>
        )}
      </Container>

      <CustomModal open={supportModal} onClose={performCloseSupportModal}>
        <DialogTitle2>
          <div>{i18n.t("panel.imLong")}</div>
          <CloseButton onClick={performCloseSupportModal}>✖</CloseButton>
        </DialogTitle2>
        <QRCodeContainer>
          {props.general.brandsSupport.map((data, index) => {
            return (
              <QRCodeHolder>
                {data.qrcodeurl ? (
                  <QRCodeTextContainer>
                    <QRCodeImage src={data.qrcodeurl} />
                    <QRCodeText>{data.type}</QRCodeText>
                  </QRCodeTextContainer>
                ) : (
                  <QRCodeTextContainer>
                    <Icons
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/icon/${data.type}.png`
                      }
                      onClick={() => {
                        IMHandler(data.type, data.phone);
                      }}
                    />
                    <QRCodeText>{data.type}</QRCodeText>
                    <div style={{ textAlign: "center" }}>
                      {i18n.t("common.phoneNumber")}: {data.phone}
                    </div>
                    <div>ID: {data.appid}</div>
                  </QRCodeTextContainer>
                )}
              </QRCodeHolder>
            );
          })}
        </QRCodeContainer>
      </CustomModal>

      <CustomModal open={csModal} onClose={performCloseCsModal}>
        <DialogTitleTwo>
          <div>{i18n.t("panel.liveChatWelcome")}</div>
          <CloseButton onClick={performCloseCsModal}>✖</CloseButton>
        </DialogTitleTwo>
        <CSSection>
          <CSSectionContent>
            {i18n.t("panel.liveChatDescription")}
          </CSSectionContent>
        </CSSection>
        <CSActualContent>
          {buttons.map((data, index) => {
            return (
              <CSButtonContainer onClick={data.click}>
                <div>
                  <IconHolder src={data.icon} alt={data.name} />
                </div>

                <div>{data.name}</div>
              </CSButtonContainer>
            );
          })}
        </CSActualContent>
      </CustomModal>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
  };
};
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnotherFloatPanel);
