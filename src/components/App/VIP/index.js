import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import IconVIPPNG from "../../../assets/images/icon-vip.png";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const heightSwitcher = (language) => {
  switch (language) {
    case "th-TH":
      return "50px";
    case "id-ID":
      return "90px";
    case "vi-VN":
      return "60px";
    default:
      return "";
  }
};
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
 
 
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 25px;

  background: url(${IconVIPPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 1280px;
  margin: auto;
  min-height: 610px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  border-radius: 10px;
`;

const OuterWrap = styled.div`
  width: 1280px;
  margin: auto;
`;

const VipLevelContainer = styled.div`
  display: grid;
  grid-template-columns: 275px auto;
`;

const VipLevelContainer2 = styled.div`
  display: grid;
  grid-template-columns: 125px auto;
`;

const VIPOverflow = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  box-shadow: 0 20px 25px -5px rgb(0 0 0/0.1), 0 8px 10px -6px rgb(0 0 0/0.1);
`;

const VIPOverflowData = styled(VIPOverflow)`
  ${(props) => {
    return props.total > 6
      ? `  width: calc(
      100%
       
    );`
      : ` 
       width: calc(100% / ${props.total} );
       `;
  }}

  box-shadow: none;
`;

const VIPOverflowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
`;

const VIPContent = styled.div`
  min-width: 125px;
  text-align: center;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
`;

const TitleContent = styled(VIPContent)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;
  width: 275px;
  padding: 10px 20px;
`;

const TableWrapper = styled.div`
  border-radius: 8px;
  cursor: default;
  border: solid 1px #b7c7cc;
  margin-bottom: 20px;

  & ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  & ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const VipEmblemContainer = styled(VIPContent)`
  min-height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VipEmblemContainerTitle = styled(VipEmblemContainer)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;
`;

const VIPLevelImage = styled.div`
  height: 95px;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleRow = styled(DataRow)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;
  align-items: center;
  text-transform: capitalize;
  height: 55px;
`;

const StandardDataCol = styled.div`
  padding: 10px 20px;
  text-align: center;
`;

const DataCol = styled(StandardDataCol)`
  width: calc(100% / 6);
`;

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);
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

  const getVIPTitle = (level) => {
    // currently bunny only has 6 levels
    if (config.features.VIP_CustomLevel_BUNNY && level < 7)
      return i18n.t("vip.bunny.level" + level);
    else return "VIP" + level;
  };

  const VipContent = ({ content }) => {
    return (
      <VIPContent height={heightSwitcher(i18n.language)}>
        {Common.addComma(content)}
      </VIPContent>
    );
  };

  const VipTitle = ({ title }) => {
    return (
      <TitleContent height={heightSwitcher(i18n.language)}>
        {title}
      </TitleContent>
    );
  };

  return (
    <Container>
      <OuterWrap>
        <Title>
          <TitleIcon></TitleIcon>
          VIP
        </Title>
      </OuterWrap>
      <InnerWrap>
        {vipBenefit.items && vipBenefit.items.length > 0 && (
          <TableWrapper>
            <VipLevelContainer>
              <VIPOverflow>
                <VipEmblemContainerTitle>
                  {i18n.t("vip.level")}
                </VipEmblemContainerTitle>
                <VipTitle title={i18n.t("vip.levelKeepAccumulateBetAmount")} />
                <VipTitle title={i18n.t("vip.levelKeepAccumulateDeposit")} />
                <VipTitle title={i18n.t("vip.levelUpAccumulateBetAmount")} />
                <VipTitle title={i18n.t("vip.levelUpAccumulateDeposit")} />
                <VipTitle title={i18n.t("vip.birthBenefit")} />
                <VipTitle title={i18n.t("vip.promotionBenefit")} />
                <VipTitle title={i18n.t("vip.quarterlyBenefit")} />
              </VIPOverflow>

              <VIPOverflowContainer>
                {vipBenefitList.map((data, index) => {
                  return (
                    <VIPOverflowData
                      key={index}
                      total={vipBenefit.items.length}
                    >
                      <VipEmblemContainer>
                        <VIPLevelImage>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/vip/${data.level}.png`
                            }
                          />
                        </VIPLevelImage>
                        {getVIPTitle(data.level)}
                      </VipEmblemContainer>
                      <VipContent content={data.levelKeepAccumulateBetAmount} />
                      <VipContent content={data.levelKeepAccumulateDeposit} />
                      <VipContent content={data.levelUpAccumulateBetAmount} />
                      <VipContent content={data.levelUpAccumulateDeposit} />
                      <VipContent content={data.birthBenefit} />
                      <VipContent content={data.promotionBenefit} />
                      <VipContent content={data.quarterlyBenefit} />
                    </VIPOverflowData>
                  );
                })}
              </VIPOverflowContainer>
            </VipLevelContainer>
          </TableWrapper>
        )}

        {vipBenefit.items && vipBenefit.items.length > 0 && (
          <TableWrapper>
            <VipLevelContainer2>
              <div>
                <TitleRow>
                  <StandardDataCol>{i18n.t("vip.vipBenefit")}</StandardDataCol>
                </TitleRow>
                {vipBenefitList.map((data, index) => {
                  return (
                    <StandardDataCol key={index}>{data.level}</StandardDataCol>
                  );
                })}
              </div>
              <div>
                <TitleRow>
                  {config.features.WGHK_Setup ? (
                    <DataCol>{i18n.t("vip.sportsRebate")}</DataCol>
                  ) : (
                    <>
                      <DataCol>{i18n.t("vip.cardGameRebate")}</DataCol>
                      <DataCol>{i18n.t("vip.liveDealerRebate")}</DataCol>
                      <DataCol>{i18n.t("vip.lotteryRebate")}</DataCol>
                      <DataCol>{i18n.t("vip.slotRebate")}</DataCol>
                      <DataCol>{i18n.t("vip.sportsRebate")}</DataCol>
                      <DataCol>{i18n.t("vip.virtualSportsRebate")}</DataCol>
                    </>
                  )}
                </TitleRow>
                {vipBenefitList.map((data, index) => {
                  return config.features.WGHK_Setup ? (
                    <DataRow key={index}>
                      <DataCol>{data.sportsRebate}%</DataCol>
                    </DataRow>
                  ) : (
                    <div>
                      <DataRow key={index}>
                        <DataCol>{data.cardGameRebate}%</DataCol>
                        <DataCol>{data.liveDealerRebate}%</DataCol>
                        <DataCol>{data.lotteryRebate}%</DataCol>
                        <DataCol>{data.slotRebate}%</DataCol>
                        <DataCol>{data.sportsRebate}%</DataCol>
                        <DataCol>{data.virtualSportsRebate}%</DataCol>
                      </DataRow>
                    </div>
                  );
                })}
              </div>
            </VipLevelContainer2>
          </TableWrapper>
        )}
      </InnerWrap>
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
