import React, { useState, useEffect } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import config from "../../../config/config";
import QRCode from "react-qr-code";
import { useSnackbar } from "notistack";
import { utility } from "../../../utils/utility";

const Container = styled.div`
  width: 100%;
  min-height: 2000px;
  position: relative;
  background: url(${process.env.PUBLIC_URL + `/assets/images/download/bg.jpg`})
    no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ContentPlacedHere = styled.div`
  width: 1280px;
  position: relative;
`;

const TheFirstSection = styled.div`
  margin-top: -100px;
  display: flex;
  min-height: 150px;
  justify-content: flex-end;
  padding-bottom: 75px;
`;

const TheSecondSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const FirstSectionContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 175px;
  transform: scale(1.35);
`;

const SectionContentItem = styled.div`
  padding-left: 15px;
`;

const InstallationGuideButton = styled.div`
  color: #fff;
  background: #000;
  border-radius: 75px;
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
`;

const Text = styled.div`
  opacity: 0.55;
`;

const Icons = styled.div`
  width: 30px;
  height: 30px;

  background: #000;
  mask: url(${({ icon }) => {
      return (
        process.env.PUBLIC_URL + `/assets/images/download/icons/${icon}.png`
      );
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const DownloadTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const DownloadIcon = styled(Icons)`
  height: 50px;
  width: 50px;
`;

const TitleText = styled(Text)`
  font-size: 34px;
  margin-left: 10px;
  font-weight: bold;
`;

const ThirdSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ThirdSectionText = styled.div`
  font-size: 28px;
  padding: 10px 0px;
  opacity: 0.5;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
  }

  .MuiDialog-paper {
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

const DialogContent = styled.div`
  padding: 40px;
  font-size: 20px;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const DeviceGuide = styled.div`
  padding-bottom: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
`;

const DeviceText = styled.div`
  opacity: 0.55;
  padding: 20px 0px;
  font-size: 28px;
`;

const QRCodeHolder = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 24px;
  border: solid 1px rgba(0, 0, 0, 0.5);
`;

const DownloadButton = styled.div`
  color: #fff;
  background: #000;
  border-radius: 75px;
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
  min-width: 100px;
  text-align: center;
`;

const PointlessShit = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
`;

const HiddenDialogContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DeviceName = styled.div`
  width: 80px;
  font-weight: bold;
`;

const Links = styled.div`
  width: 325px;
  opacity: 0.75;
  cursor: pointer;
  font-size: 15px;
`;

const Download = () => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState([]);

  const [pointlessDialog, setPointlessDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function getJsonData() {
    return fetch(
      "https://app12.s3.ap-east-1.amazonaws.com/version_" +
        config.brand +
        ".json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function copyStupidLink(link) {
    enqueueSnackbar(i18n.t("pointless.copy"), {
      variant: "success",
    });
    utility.copy(link);
  }

  useEffect(() => {
    if (download.length === 0) {
      getJsonData();
    } else {
    }
  }, []);

  function logoSwitcher(brand) {
    switch (brand) {
      case "Atinbet":
        return "Atinbet";
      case "inyobet":
        return "inyo";
      default:
        return "PB";
    }
  }

  return (
    <Container>
      <ContentPlacedHere>
        <TheSecondSection>
          <DownloadTitleSection>
            <DownloadIcon icon="download" />
            <TitleText>{i18n.t("download.downloadMethod")}</TitleText>
          </DownloadTitleSection>
        </TheSecondSection>
        <ThirdSection>
          <ThirdSectionText>{i18n.t("download.scanDownload")}</ThirdSectionText>
          <ThirdSectionText>{i18n.t("download.useQRScan")}</ThirdSectionText>
        </ThirdSection>
        <DownloadSection>
          {download.map((data, index) => {
            return (
              <QRCodeContainer>
                <QRCodeHolder>
                  <QRCode size={180} value={data.link}></QRCode>
                </QRCodeHolder>
                <DeviceText>{data.platform}</DeviceText>
                <DownloadButton
                  onClick={() => {
                    window.open(data.link, "_blank");
                  }}
                >
                  {i18n.t("download.title")}
                </DownloadButton>
              </QRCodeContainer>
            );
          })}
        </DownloadSection>
        <HiddenDialogContainer>
          {config.features.Download_PointlessDialog && (
            <>
              <QRCodeContainer>
                <QRCodeHolder style={{ marginBottom: 20 }}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/download/brand/${logoSwitcher(
                        config.brand
                      )}_logo.png`
                    }
                    alt="download section"
                  />
                </QRCodeHolder>

                <DownloadButton
                  onClick={() => {
                    setPointlessDialog(true);
                  }}
                >
                  {i18n.t("pointless.link")}
                </DownloadButton>
              </QRCodeContainer>
              <CustomModal
                maxWidth="md"
                open={pointlessDialog}
                onClose={() => {
                  setPointlessDialog(false);
                }}
              >
                <DialogTitle2>
                  <div>{i18n.t("pointless.download")}</div>
                  <CloseButton
                    onClick={() => {
                      setPointlessDialog(false);
                    }}
                  >
                    ✖
                  </CloseButton>
                </DialogTitle2>
                <DialogContent>
                  {download.map((data, index) => {
                    return (
                      <PointlessShit>
                        <DeviceName>{data.platform}</DeviceName>
                        <Links
                          onClick={() => {
                            copyStupidLink(data.link);
                          }}
                        >
                          {data.link}
                        </Links>
                      </PointlessShit>
                    );
                  })}
                </DialogContent>
              </CustomModal>
            </>
          )}
        </HiddenDialogContainer>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ height: 650 }}
            src={process.env.PUBLIC_URL + `/assets/images/download/girl.png`}
            alt="girl"
          />
        </div>

        <TheFirstSection>
          <FirstSectionContent>
            <SectionContentItem>
              <Text>{i18n.t("download.supported")}:</Text>
            </SectionContentItem>
            <SectionContentItem>
              <Icons icon="android" />
            </SectionContentItem>
            <SectionContentItem>
              <Icons icon="ios" />
            </SectionContentItem>
            <SectionContentItem>
              <InstallationGuideButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                {i18n.t("download.openGuide")}
              </InstallationGuideButton>
            </SectionContentItem>
          </FirstSectionContent>
        </TheFirstSection>
      </ContentPlacedHere>
      <CustomModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="md"
      >
        <DialogTitle2>
          <div>{i18n.t("download.openGuide")}</div>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            ✖
          </CloseButton>
        </DialogTitle2>
        <DialogContent>
          <DeviceGuide>
            {i18n.t("download.iphone.title")} <br />
            {i18n.t("download.iphone.point1")} <br />
            {i18n.t("download.iphone.point2")} <br />
          </DeviceGuide>
          <DeviceGuide>
            {i18n.t("download.android.title")} <br />
            {i18n.t("download.android.point1")} <br />
            {i18n.t("download.android.point2")} <br />
          </DeviceGuide>
        </DialogContent>
      </CustomModal>
    </Container>
  );
};

export default Download;
