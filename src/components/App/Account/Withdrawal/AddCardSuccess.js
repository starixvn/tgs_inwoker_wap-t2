import React from "react";

import styled from "styled-components";
import config from "../../../../config/config";
import i18n from "../../../../utils/i18n";
import Button from "../../../Share/Button";

const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 50px;
`;
const SubTitleDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 40px;
  color: #818181;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: table;
  width: 540px;
  display: flex;
  justify-content: space-around;
`;

function AddCardSuccess(props) {
  return (
    <Container>
      <SubTitle>{i18n.t("card.success.title")}</SubTitle>
      {!(
        config.features.ChangesNotAllowed ||
        config.features.AddCard_NotAllowedEditDelete ||
        props.bankCardList.length >= config.features.AddCard_MaximumCardAllowed
      ) ? (
        <SubTitleDesc>
          {i18n.t("card.success.successDesc")}
          <br></br>
          {i18n.t("card.success.bindDesc")}
        </SubTitleDesc>
      ) : (
        <SubTitleDesc>{i18n.t("card.success.noMoreAddCard")}</SubTitleDesc>
      )}

      <ButtonContainer>
        {!(
          config.features.ChangesNotAllowed ||
          config.features.AddCard_NotAllowedEditDelete ||
          props.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed
        ) && (
          <Button
            name={i18n.t("card.success.bindBankCard")}
            width={255}
            handleClick={props.onhandleBindCardClick}
          ></Button>
        )}
        <Button
          name={
            props.isDeposit
              ? i18n.t("card.success.goDeposit")
              : i18n.t("card.success.goWithdrawal")
          }
          width={255}
          handleClick={
            props.isDeposit
              ? props.onhandleGoDepositClick
              : props.onhandleGoWithdrawClick
          }
        ></Button>
      </ButtonContainer>
    </Container>
  );
}

export default AddCardSuccess;
