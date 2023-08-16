import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Header from "../Share/Header";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding: 20px;
`;

const Contents = styled.div`
  font-size: 25px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
`;

const VipEmblemHolder = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px 20px;
`;

const VipEmlemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 150px;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  max-height: 200px;
  ${({ selected, theme }) => {
    return (
      selected &&
      ` background: #fff;border-radius: 20px;border: solid 3px ${theme.primary};`
    );
  }}
`;

const VipEmblem = styled.img`
  height: 125px;
`;

const ContentDisplayer = styled.div`
  display: ${({ show }) => {
    return show ? "block" : "none";
  }};
`;

const CustomTable = styled.div`
  display: grid;
  grid-template-columns: auto 300px;
  padding: 20px 0px;
`;

const Left = styled.div`
  padding: 10px 20px 10px 5px;
  text-transform: capitalize;
  opacity: 0.75;
  font-size: 20px;
`;

const Right = styled.div`
  padding: 10px 5px;
  text-align: right;
  font-weight: bold;
`;

const VIPText = styled.div`
  font-weight: bold;
`;

const BoldText = styled.span`
  font-weight: bold;
  font-size: 24px;
`;

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (vipBenefit.length === 0) {
      getVIP().then((result) => {
        if (result.IsSuccess) {
          setVipBenefits(result.data);
        }
      });
    }
  }, []);

  var vipBenefitList =
    vipBenefit.items &&
    vipBenefit.items.sort((a, b) => {
      return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
    });

  const handleBackClick = () => {
    props.appHistory.goBack();
  };

  const getVIPTitle = (level) => {
    // currently bunny only has 6 levels
    if (config.features.VIP_CustomLevel_BUNNY && level < 7)
      return i18n.t("vip.bunny.level" + level);
    else return "VIP" + level;
  };

  return (
    <Container>
      <Header title="VIP" onBackClick={handleBackClick}></Header>

      {vipBenefit.items && vipBenefit.items.length > 0 && (
        <Contents>
          {vipBenefit.items && vipBenefit.items.length > 0 && (
            <VipEmblemHolder>
              {vipBenefitList.map((data, index) => {
                return (
                  <VipEmlemContainer
                    key={index}
                    total={vipBenefit.items.length}
                    selected={display === index}
                  >
                    <VipEmblem
                      onClick={() => {
                        setDisplay(index);
                      }}
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/vip/${data.level}.png`
                      }
                    />
                    <VIPText>{getVIPTitle(data.level)}</VIPText>
                  </VipEmlemContainer>
                );
              })}
            </VipEmblemHolder>
          )}
          {vipBenefit.items && vipBenefit.items.length > 0 && (
            <div>
              {vipBenefitList.map((data, index) => {
                return (
                  <ContentDisplayer show={index === display}>
                    <CustomTable>
                      <Left style={{ marginTop: 15 }}>
                        {i18n.t("vip.levelKeepAccumulateBetAmount")}
                      </Left>
                      <Right style={{ marginTop: 15 }}>
                        {Common.addComma(data.levelKeepAccumulateBetAmount)}
                      </Right>
                      <Left> {i18n.t("vip.levelKeepAccumulateDeposit")}</Left>
                      <Right>
                        {Common.addComma(data.levelKeepAccumulateDeposit)}
                      </Right>
                      <Left>{i18n.t("vip.levelUpAccumulateBetAmount")}</Left>
                      <Right>
                        {Common.addComma(data.levelUpAccumulateBetAmount)}
                      </Right>
                      <Left>{i18n.t("vip.levelUpAccumulateDeposit")}</Left>
                      <Right>
                        {Common.addComma(data.levelUpAccumulateDeposit)}
                      </Right>
                      <Left> {i18n.t("vip.birthBenefit")}</Left>
                      <Right>{Common.addComma(data.birthBenefit)}</Right>
                      <Left>{i18n.t("vip.promotionBenefit")}</Left>
                      <Right>{Common.addComma(data.promotionBenefit)}</Right>
                      <Left> {i18n.t("vip.quarterlyBenefit")}</Left>
                      <Right>{Common.addComma(data.quarterlyBenefit)}</Right>

                      <Left style={{ marginTop: 50 }}>
                        <BoldText>{i18n.t("vip.vipBenefit")}</BoldText>
                      </Left>
                      <Right></Right>
                      {config.features.WGHK_Setup ? (
                        <>
                          <Left>{i18n.t("vip.sportsRebate")} </Left>
                          <Right>{data.sportsRebate}% </Right>
                        </>
                      ) : (
                        <>
                          <Left>{i18n.t("vip.cardGameRebate")} </Left>
                          <Right>{data.cardGameRebate}% </Right>
                          <Left>{i18n.t("vip.liveDealerRebate")} </Left>
                          <Right>{data.liveDealerRebate}% </Right>
                          <Left>{i18n.t("vip.lotteryRebate")} </Left>
                          <Right>{data.lotteryRebate}% </Right>
                          <Left>{i18n.t("vip.slotRebate")} </Left>
                          <Right>{data.slotRebate}% </Right>
                          <Left>{i18n.t("vip.sportsRebate")} </Left>
                          <Right>{data.sportsRebate}% </Right>
                          <Left>{i18n.t("vip.virtualSportsRebate")} </Left>
                          <Right>{data.virtualSportsRebate}% </Right>
                        </>
                      )}
                    </CustomTable>
                  </ContentDisplayer>
                );
              })}
            </div>
          )}
        </Contents>
      )}
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVIP: () => dispatch(generalAction.getVIP()),
  };
};
const mapStateToProps = (state) => {
  return "";
};
export default connect(mapStateToProps, mapDispatchToProps)(VIP);
