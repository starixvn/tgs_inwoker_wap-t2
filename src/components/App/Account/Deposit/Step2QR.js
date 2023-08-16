import React, { Component } from "react";
import styled from "styled-components";
import DepositQRPhonePNG from "../../../../assets/images/deposit-qr-phone.png";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
const Container = styled.div`
  font-size: 14px;
  color: #818181;
`;
const LeftContainer = styled.div`
  float: left;
  margin: 0px 50px 0 100px;
`;
const RightContainer = styled.div`
  width: 260px;
  height: 400px;
  background: url(${DepositQRPhonePNG}) no-repeat;
  float: left;
`;

const CustomTable = styled.table`
  width: 100%;
  margin: 20px auto;
  border: solid 1px #d9d9d9;
`;
const TitleTD = styled.td`
  min-width: 112px;
  height: 55px;
  background-color: #f7f7f7;
  text-align: left;
  border: solid 1px #d9d9d9;
  padding: 0 30px;
`;
const ValueTD = styled.td`
  width: 209px;
  height: 55px;
  background-color: #ffffff;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
const QRImage = styled.img`
  margin: 118px auto 0 auto;
  height: 153px;
  width: 153px;
  display: block;
  border: none;
`;
const QRText = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  color: #151a34;
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 320px;
`;

class Step2QR extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    expired_time: 0,
  };
  componentDidMount() {}
  setCountdownTimer = () => {
    setTimeout(() => {
      if (this.state.expired_time > 0) {
        this.fireTimeout();
      }
    }, 1000);
  };
  fireTimeout = () => {
    this.setState({ ...this.state, expired_time: this.state.expired_time - 1 });
    this.setCountdownTimer();
  };

  render() {
    return (
      <Container>
        <LeftContainer>
          <CustomTable cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <TitleTD>{i18n.t("deposit.depositMethod")}</TitleTD>
                <ValueTD>{this.props.selectedType.title}</ValueTD>
              </tr>
              <tr>
                <TitleTD>{i18n.t("deposit.depositTunnel")}</TitleTD>
                <ValueTD>{this.props.selectedChannel.title}</ValueTD>
              </tr>
              <tr>
                <TitleTD>{i18n.t("deposit.depositAmount")}</TitleTD>
                <ValueTD>{this.props.amount}</ValueTD>
              </tr>
              {(() => {
                if (this.props.selectedChannel.is_transfer === true) {
                  return (
                    <>
                      <tr>
                        <TitleTD>{i18n.t("deposit.receiverBank")}</TitleTD>
                        <ValueTD>{this.props.bankInfo.bank_name}</ValueTD>
                      </tr>

                      <tr>
                        <TitleTD>{i18n.t("deposit.receiverAccount")}</TitleTD>
                        <ValueTD>{this.props.bankInfo.user_name}</ValueTD>
                      </tr>
                      <tr>
                        <TitleTD>{i18n.t("deposit.receiverNumber")}</TitleTD>
                        <ValueTD>{this.props.bankInfo.account}</ValueTD>
                      </tr>
                    </>
                  );
                } else {
                  return null;
                }
              })()}
              <tr>
                <TitleTD>{i18n.t("deposit.uploadReceipt")}</TitleTD>
                <ValueTD>
                  <input type="file" ref={this.myRef} accept="image/*"></input>
                </ValueTD>
              </tr>
            </tbody>
          </CustomTable>
          <ButtonContainer>
            <CustomButton
              name={i18n.t("deposit.upload")}
              width={152}
              marginTop={1}
              marginLeft={0}
              handleClick={() =>
                this.props.handleUploadClick(this.myRef.current.files[0])
              }
            ></CustomButton>
            <CustomButton
              name={i18n.t("deposit.cancel")}
              width={152}
              marginTop={1}
              float="right"
              marginLeft={0}
              handleClick={() => this.props.handleDepositCancelClick()}
              grayMode={true}
            ></CustomButton>
          </ButtonContainer>
        </LeftContainer>
        {(() => {
          if (this.props.selectedChannel.is_qr === true) {
            return (
              <RightContainer>
                <QRImage
                  src={
                    this.props.depositResult
                      ? this.props.depositResult.data.pic_url
                      : ""
                  }
                ></QRImage>
                <QRText>{i18n.t("deposit.qrDesc")}</QRText>
              </RightContainer>
            );
          } else {
            return null;
          }
        })()}
      </Container>
    );
  }
}
export default Step2QR;
