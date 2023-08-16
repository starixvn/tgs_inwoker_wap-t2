import React from "react";

import styled from "styled-components";

import Button from "../../../Share/Button";
import IconBankPNG from "../../../../assets/images/icon-bank.png";
import IconAddCardPNG from "../../../../assets/images/icon-addcard.png";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
`;

const CardContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const CardFrame = styled.div`
  width: 279px;
  height: 133px;
  border: solid 1px #e1dfdf;
  background-color: #fefefe;
  float: left;
  margin: 8px;
`;
const AddCardFrame = styled(CardFrame)`
  background: url(${IconAddCardPNG}) no-repeat center 20px;
  &:hover {
    cursor: pointer;
  }
`;
const AddCardFrameLabel = styled.div`
  font-size: 14px;

  color: #747474;
  color: #747474;
  text-align: center;
  margin-top: 88px;
`;
const ContainerHeader = styled.div`
  border-bottom: solid 1px #e1dfdf;
  width: 100%;
  height: 41px;
`;
const CardBankIcon = styled.div`
  width: 18px;
  height: 18px;
  float: left;
  margin: 10px 0 0 8px;
  background: url(${IconBankPNG}) no-repeat;
`;
const Label = styled.div`
  font-size: 14px;
  float: left;
  color: #747474;
  margin: 9px 0 0 6px;
`;

const CardTitle = styled(Label)`
  float: left;
`;
const CardNumber = styled(Label)`
  font-weight: bold;
  max-width: 120px;
  color: #162429;
  white-space: nowrap;
  float: right;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LeftLabel = styled(Label)`
  float: left;
  margin: 6px 0 0 5px;
`;

const RowContainer = styled.div`
  padding: 5px 10px;
`;

function CardManage(props) {
  return (
    <Container>
      <SubTitle>{i18n.t("card.title")}</SubTitle>
      <CardContainer>
        {props.bankCardList.map((item, key) => {
          return (
            <CardFrame key={item.id}>
              <ContainerHeader>
                <CardBankIcon></CardBankIcon>
                <Label>{i18n.t("card.myCard")}</Label>
                {/* <CardNumber>{item.bank_account}</CardNumber>
                <CardTitle>{i18n.t("card.tail")}</CardTitle> */}
              </ContainerHeader>

              {/* <RowContainer>
                <LeftLabel>{i18n.t("card.transferRecord")}</LeftLabel>
                <Button
                  name={i18n.t("card.checkDetails")}
                  width={89}
                  height={32}
                  small={true}
                  marginTop={1}
                  handleClick={() => props.onhandleReportClick(item.id)}
                  float={"right"}
                ></Button>
              </RowContainer> */}
              <RowContainer>
                <CardTitle>{i18n.t("card.tail")}</CardTitle>
                <CardNumber>
                  {(() => {
                    if (
                      item.banktype === "ThirdParty" ||
                      item.banktype === "Coinsph" ||
                      item.banktype === "FPS"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else if (
                      item.banktype === "Pulsa" ||
                      item.banktype === "EWallet"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else {
                      if (item.detail.bankAccount) {
                        return item.detail.bankAccount.substring(
                          item.detail.bankAccount.length - 4,
                          item.detail.bankAccount.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    }
                  })()}
                </CardNumber>
              </RowContainer>
              {!(
                config.features.AddCard_NotAllowedEditDelete ||
                config.features.ChangesNotAllowed ||
                config.features.AddCard_DisableCreateUpdateDelete
              ) && (
                <RowContainer>
                  <LeftLabel>{i18n.t("card.removeCard")}</LeftLabel>
                  <Button
                    name={i18n.t("card.remove")}
                    width={89}
                    height={32}
                    grayMode={true}
                    small={true}
                    marginTop={1}
                    handleClick={() => props.onhandleDeleteCardClick(item.id)}
                    float={"right"}
                  ></Button>
                </RowContainer>
              )}
            </CardFrame>
          );
        })}

        {!(
          config.features.AddCard_NotAllowedEditDelete ||
          config.features.ChangesNotAllowed ||
          (props.bankCardList.length >=
            config.features.AddCard_MaximumCardAllowed &&
            config.features.AddCard_DisableCreateUpdateDelete)
        ) && (
          <AddCardFrame onClick={props.onhandleAddCardClick}>
            <AddCardFrameLabel>{i18n.t("card.msgAddCard")}</AddCardFrameLabel>
          </AddCardFrame>
        )}
      </CardContainer>

      <Button
        grayMode={true}
        name={i18n.t("common.back")}
        width={255}
        height={46}
        marginLeft={300}
        marginTop={100}
        handleClick={props.onhandleBackClick}
      ></Button>
    </Container>
  );
}

export default CardManage;
