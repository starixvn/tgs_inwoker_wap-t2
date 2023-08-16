import React from "react";
import { Component } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import { withSnackbar } from "notistack";
const Container = styled.div`
  font-size: 14px;
  color: #818181;
`;

const CustomTable = styled.table`
  width: 870px;
  margin: 20px auto;
  border: solid 1px #d9d9d9;
`;
const TitleTD = styled.td`
  width: 112px;
  height: 55px;
  background-color: #f7f7f7;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
const ValueTD = styled.td`
  width: 209px;
  height: 55px;
  background-color: #ffffff;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 530px;
`;

const QRCodeContainer = styled.div`
  margin: 15px 15px;
`;
const QRCodeImg = styled.img``;
class NewStepTwo extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      upload: "",
      uploaded: false,
      files: [],
    };

    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage = (e) => {
    this.setState({
      ...this.state,
      upload: e.target.files[0],
    });
  };
  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handleUploadClick = () => {
    this.props.performUploadImage(this.state.files[0]);
  };
  render() {
    const { extended, depositResult, amount } = this.props;
    console.log(this.state);
    return (
      <Container>
        <CustomTable cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <TitleTD>{i18n.t("deposit.depositMethod")}</TitleTD>
              <ValueTD>{i18n.t(this.props.methodcode)}</ValueTD>
            </tr>
            {this.props.methodcode === "ThirdParty" && (
              <tr>
                <TitleTD>{i18n.t("deposit.qrCode")}</TitleTD>
                <ValueTD>
                  <QRCodeContainer>
                    <QRCodeImg src={extended.qrCode} />
                  </QRCodeContainer>
                </ValueTD>
              </tr>
            )}
            <tr>
              <TitleTD>{i18n.t("deposit.depositTunnel")}</TitleTD>
              <ValueTD>{this.props.channelname}</ValueTD>
            </tr>
            {(() => {
              if (this.props.methodcode !== "ThirdParty") {
                return (
                  <React.Fragment>
                    <tr>
                      <TitleTD>{i18n.t("deposit.receiverBank")}</TitleTD>
                      <ValueTD>
                        {extended
                          ? extended.name
                          : this.props.depositDetail.bankaccountname}
                      </ValueTD>
                    </tr>
                    <tr>
                      <TitleTD>{i18n.t("deposit.receiverAccount")}</TitleTD>
                      <ValueTD>
                        {extended
                          ? extended.bankAccount
                          : this.props.bankaccount}
                      </ValueTD>
                    </tr>
                  </React.Fragment>
                );
              }
            })()}

            <tr>
              <TitleTD>{i18n.t("deposit.orderNumber")}</TitleTD>
              <ValueTD>
                {this.props.paymentId
                  ? this.props.paymentId
                  : depositResult
                  ? depositResult.data
                  : ""}
              </ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.depositAmount")}</TitleTD>
              <ValueTD>{amount}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.uploadReceipt")}</TitleTD>
              <ValueTD>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => {
                      document.getElementById("getFile").click();
                    }}
                    style={{ marginRight: 10, height: 30 }}
                  >
                    {i18n.t("common.upload")}
                  </button>
                  <input
                    type="file"
                    id="getFile"
                    onChange={this.handleFileChange}
                    accept="image/jpg, image/jpeg, image/png, image/tiff"
                    style={{ display: "none" }}
                  />
                  {this.state.files[0] ? this.state.files[0].name : ""}
                </div>
              </ValueTD>
            </tr>
            <tr></tr>
          </tbody>
        </CustomTable>
        <ButtonContainer>
          <CustomButton
            name={i18n.t("deposit.uploadReceipt")}
            width={257}
            marginTop={1}
            marginLeft={0}
            handleClick={() => this.handleUploadClick()}
            disabled={this.state.files.length <= 0}
          ></CustomButton>
          <CustomButton
            name={i18n.t("common.back")}
            width={257}
            marginTop={1}
            float="right"
            marginLeft={0}
            handleClick={() => this.props.handleRestartClick()}
            grayMode={true}
          ></CustomButton>
        </ButtonContainer>
      </Container>
    );
  }
}

export default withSnackbar(NewStepTwo);
