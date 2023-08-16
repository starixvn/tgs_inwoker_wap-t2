import React, { Component } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import { WalletService } from "../../../../api-services/services/WalletService";
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
  text-align: center;
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
  width: 258px;
`;

class Step2Form extends Component {
  // Similar to componentDidMount and componentDidUpdate:
  state = {
    exchangeRate: { buyprice: 0, sellprice: 0 },
  };
  componentDidMount() {
    if (this.props.isCrypto === true) {
      this.GetExchangeRate();
    }
  }
  componentDidUpdate(preProps) {
    if (this.props.isCrypto === true) {
      if (preProps.depositType !== this.props.depositType) {
        this.GetExchangeRate();
      }
    }
  }
  GetExchangeRate() {
    if (this.props.depositType === "LeePay") {
      WalletService.GetLeePayExchangeRate(this.props.channel.id).then(
        (response) => {
          if (response.IsSuccess) {
            this.setState({ ...this.state, exchangeRate: response.data });
          } else {
            this.setState({
              ...this.state,
            });
          }
        }
      );
    } else {
      WalletService.GetUmPayExchangeRate(this.props.channel.id).then(
        (response) => {
          if (response.IsSuccess) {
            this.setState({ ...this.state, exchangeRate: response.data.rate });
          } else {
            this.setState({
              ...this.state,
            });
          }
        }
      );
    }
  }

  render() {
    return (
      <Container>
        <CustomTable cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <TitleTD>{i18n.t("deposit.depositMethod")}</TitleTD>
              <ValueTD>{i18n.t(this.props.methodcode)}</ValueTD>

              <TitleTD>{i18n.t("deposit.depositTunnel")}</TitleTD>
              <ValueTD>{this.props.channel.channelname}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.orderNumber")}</TitleTD>
              <ValueTD>{this.props.depositResult.data.formid}</ValueTD>
              <TitleTD>{i18n.t("deposit.depositAmount")}</TitleTD>
              <ValueTD>{this.props.amount}</ValueTD>
            </tr>
            {(() => {
              if (this.props.isCrypto === true) {
                if (this.props.depositType.toUpperCase() === "LEEPAY") {
                  return (
                    <tr>
                      <TitleTD>{i18n.t("deposit.exchangeRate")}</TitleTD>
                      <ValueTD>{this.state.exchangeRate.buyprice}</ValueTD>
                      <TitleTD>{i18n.t("deposit.expectedPayment")}</TitleTD>
                      <ValueTD>
                        {(
                          this.props.amount / this.state.exchangeRate.buyprice
                        ).toFixed(2)}
                      </ValueTD>
                    </tr>
                  );
                } else {
                  return Object.keys(this.state.exchangeRate).map((key) => {
                    return Object.keys(this.state.exchangeRate[key]).map(
                      (key2) => {
                        if (key2 === "HKD") {
                          return (
                            <tr>
                              <TitleTD>
                                {i18n.t("deposit.exchangeRate")}
                              </TitleTD>
                              <ValueTD>
                                {this.state.exchangeRate[key][key2].rate}
                              </ValueTD>
                              <TitleTD>
                                {i18n.t("deposit.expectedPayment")}
                              </TitleTD>
                              <ValueTD>
                                {(
                                  this.props.amount /
                                  this.state.exchangeRate[key][key2].rate
                                ).toFixed(2)}
                              </ValueTD>
                            </tr>
                          );
                        }
                      }
                    );
                  });
                }
              }
            })()}
          </tbody>
        </CustomTable>
        <ButtonContainer>
          <CustomButton
            name={i18n.t("deposit.completeDeposit")}
            width={257}
            marginTop={1}
            marginLeft={0}
            handleClick={() => this.props.handleRestartClick()}
          ></CustomButton>
          {/* <CustomButton
            name={i18n.t("common.back")}
            width={257}
            marginTop={1}
            float="right"
            marginLeft={0}
            handleClick={() => this.props.handleDepositCancelClick()}
            grayMode={true}
          ></CustomButton> */}
        </ButtonContainer>
      </Container>
    );
  }
}
export default Step2Form;
