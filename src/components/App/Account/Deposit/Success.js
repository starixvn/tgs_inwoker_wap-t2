import React, { Component } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import SuccessPNG from "../../../../assets/images/success.png";
import CustomButton from "../../../Share/Button";
const Container = styled.div`
  padding-top: 50px;
`;
const ImgSuccess = styled.img`
  margin: 0 auto;
  display: block;
  width: 100px;
`;
const SuccessMessage = styled.div`
  font-size: 20px;
  color: #818181;
  text-align: center;
  margin-top: 20px;
`;
class Success extends Component {
  render() {
    return (
      <Container>
        <ImgSuccess src={SuccessPNG}></ImgSuccess>
        <SuccessMessage>{i18n.t("deposit.uploadSuccess")}</SuccessMessage>
        <CustomButton
          name={i18n.t("common.confirm")}
          width={257}
          marginTop={30}
          float={"none"}
          marginLeft={310}
          handleClick={this.props.handleRestartClick}
        ></CustomButton>
      </Container>
    );
  }
}
export default Success;
