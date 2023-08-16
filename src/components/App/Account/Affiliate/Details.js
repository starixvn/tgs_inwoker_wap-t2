import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withSnackbar } from "notistack";

import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";
import QRCode from "react-qr-code";
import { utility } from "../../../../utils/utility";

const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 18px;
`;
const QRCodeContainer = styled.div`
  padding: 10px;
  margin: 0 auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 400px;
  font-size: 14px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-weight: 600;
  margin: 12px 0 0 3px;
  float: left;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 30px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  color: #000;
  float: right;
  padding: 7px 20px 0 20px;
  margin-top: 6px;
  width: 80px;
  color: #fff;
  border-radius: 6px;
  background-color: #f0ca83;

  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;

const DownloadButton = styled(Button)`
  padding: 5px 5px 0 5px;
`;

const QRCodeActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  padding: 20px 0px 10px 0px;
`;

class Affiliate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      copyTooltips: false,
    };
  }

  handleBackClick = () => {
    AppHistory.goBack();
  };
  handleCopyLink = () => {
    this.props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(
      `${window.location.hostname}/p/${this.props.account.info.playercode}?do=register`
    );
  };
  handleCopyReferralID = () => {
    this.props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(this.props.account.info.playercode);
  };
  handleQrAction = (option) => {
    var svgElement = document.querySelector("#qrcode-container").firstElementChild;
    let { width, height } = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);
    let outerHTML = clonedSvgElement.outerHTML,
      blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);
    let image = new Image();
    image.src = blobURL;
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = 150;
      canvas.height = 150;
      let context = canvas.getContext("2d");
      let offsetPositionX = (canvas.width - width) / 2;
      let offsetPositionY = (canvas.height - height) / 2;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, offsetPositionX, offsetPositionY, width, height);
      let png = canvas.toDataURL();
      if (option === "copy") {
        this.props.enqueueSnackbar(i18n.t("affiliate.copied"), {
          variant: "success",
        });
        utility.copyImage(png);
      } else if (option === "download") {
        utility.downloadImage(png, "download.png");
      }
    };
  };
  handleClickAway = () => {
    this.setState({ ...this.state, copyTooltips: false });
  };
  render() {
    var affiliateLink = `https://${window.location.hostname}/p/${this.props.account.info.playercode}?do=register`;
    return (
      <>
        <QRCodeLabel>{i18n.t("affiliate.qrCode")}</QRCodeLabel>
        <QRCodeContainer id="qrcode-container">
          <QRCode size={128} value={affiliateLink}></QRCode>
        </QRCodeContainer>
        <QRCodeActionContainer>
          <Button onClick={() => this.handleQrAction("copy")}>
            {i18n.t("common.copy")}
          </Button>
          <DownloadButton onClick={() => this.handleQrAction("download")}>
            {i18n.t("common.download")}
          </DownloadButton>
        </QRCodeActionContainer>
        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={this.props.account.info.playercode}
            readOnly={true}
          ></CustomInput>
          <Button onClick={this.handleCopyReferralID}>
            {i18n.t("common.copy")}
          </Button>
        </CustomText>
        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={affiliateLink}
            readOnly={true}
          ></CustomInput>

          <Button onClick={this.handleCopyLink}>{i18n.t("common.copy")}</Button>
        </CustomText>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Affiliate));
