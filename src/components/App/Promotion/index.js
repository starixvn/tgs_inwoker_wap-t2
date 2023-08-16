import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";
import DynamicFont from "react-dynamic-font";

import BGPromotionJPG from "../../../assets/images/bg-promotion.png";
import PromoModelPNG from "../../../assets/images/promo-bg-model.png";
import PromoPresentPNG from "../../../assets/images/promo-bg-present.png";
import PromoItemPNG from "../../../assets/images/promot-item.png";
import PromoEmpty from "../../../assets/images/promo-empty.png";
import { withSnackbar } from "notistack";
import Collapse from "@material-ui/core/Collapse";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import CommonMarquee from "../CommonMarquee";
import ScrollAnimation from "react-animate-on-scroll";
import { AppHistory } from "../../../history/History";
import config from "../../../config/config";
export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;
const moment = require("moment");
const Container = styled.div`
  width: 100%;
  position: relative;
  background: url(${BGPromotionJPG}) no-repeat center;
  min-height: 770px;
  background-size: auto 100%;
  overflow: visible;
`;
const MainContent = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  overflow: visible;
`;
const MainContentLeft = styled.div`
  float: left;
  width: 480px;
  height: 700px;
  position: relative;
  overflow: visible;
  padding-top: 152px;
`;
const PromoImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;
const PromoModel = styled.img`
  height: 608px;
  width: 500px;
`;
const PromoPresent = styled.img`
  height: 195px;
  width: 200px;
  position: absolute;
  top: 0px;
  right: -55px;
  animation: ${floatKeyframe} 3s linear 0s infinite;
`;

const MainContentRight = styled.div`
  float: left;
  margin: 30px auto;
  padding: 25px 25px;
  width: 800px;
  height: 700px;
  background-color: #f0ededb3;
  border-radius: 20px;
  position: relative;
  overflow-y: scroll;
`;
const Inner = styled.div``;
const Content = styled.div`
  border-radius: 20px;
  width: 740px;
  height: 184px;
  background-color: #8a7f73;
  margin: 13px 0 13px 0px;
  float: left;
  position: relative;
  background: url(${({ image }) => image}) no-repeat;
  background-size: auto 100%;
  transition: all 0.2s linear 0.2s;
  filter: grayscale(30%);
  &:hover {
    cursor: pointer;
    filter: grayscale(0%);
    background-size: auto 105%;
  }
`;
const LeftContent = styled.div`
  float: left;
  width: 444px;
`;
const RightContent = styled.div`
  float: left;
  height: 184px;
  width: 290px;
  background-color: #291c04;
  position: absolute;
  right: 0;
  top: 0;
`;

const RightContentContainer = styled.div`
  position: relative;
  padding: 20px 15px;
  height: 100%;
  display: grid;
`;
const PromoTitle = styled.div`
  font-size: 26px;
  color: #ffffff;

  font-weight: 600;
`;
const PromoDate = styled.div`
  font-size: 12px;
  color: #ffffff;
`;

const CustomViewContainer = styled.div`
  position: relative;
  height: 40px;
`;
const Viewall = styled.div`
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  width: 75px;
  height: 30px;
  background: #735936;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 4px;
    right: 4px;
    border: 2px solid #fff;
  }
  &:hover {
    cursor: pointer;
    box-shadow: inset 1px 1px 6px 0 rgba(115, 89, 54, 0.75);
  }
`;
const PromoEmptyContainer = styled.div``;

const PromoEmptyText = styled.div`
  margin-top: 200px;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 56px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(#446597, #282828);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Tint = styled.div`
  opacity: 0.75;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  componentDidMount() {
    this.props.getPromotion();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      this.props.getPromotion();
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }

  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        [
          "FirstDeposit",
          "DailySecondDeposit",
          "DailyFirstDeposit",
          "DepositReward",
          "DepositAccumulateRoulette",
        ].indexOf(promotionType) >= 0
      ) {
        AppHistory.push({
          pathname: "/account/deposit/" + id,
        });
      }
    }
  };
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
  };
  render() {
    return (
      <Container>
        {config.features.HideMarquee && <CommonMarquee />}
        <MainContent>
          <MainContentLeft>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <PromoImageContainer>
                <PromoModel src={PromoModelPNG}></PromoModel>
                <PromoPresent src={PromoPresentPNG}></PromoPresent>
              </PromoImageContainer>
            </ScrollAnimation>
          </MainContentLeft>
          <MainContentRight className="scrollbar-wrap">
            <Inner>
              {(() => {
                if (this.props.general.promotionList.items.length > 0)
                  return this.props.general.promotionList.items
                    .sort((a, b) => {
                      return a.order - b.order;
                    })
                    .map((data, index) => {
                      var checkLocale = data.localization[i18n.language];

                      return (
                        <Content
                          key={index}
                          order={data.order}
                          image={
                            checkLocale && checkLocale.desktopBanner
                              ? checkLocale.desktopBanner
                              : data.desktopBanner
                          }
                        >
                          <LeftContent />
                          <RightContent>
                            <RightContentContainer>
                              <PromoTitle>
                                <DynamicFont
                                  content={
                                    checkLocale && checkLocale.name
                                      ? checkLocale.name
                                      : data.name
                                  }
                                />
                              </PromoTitle>
                              {config.features.HaveVIPFeature && (
                                <PromoDate>
                                  <Tint>
                                    {" "}
                                    {i18n.t("promotion.promoTarget")}：
                                  </Tint>{" "}
                                  {data.vipLevels
                                    .sort((a, b) => {
                                      return a - b;
                                    })
                                    .map((a, index) => {
                                      return (
                                        <span key={index}>
                                          VIP{a}
                                          {index < data.vipLevels.length - 1 &&
                                            ", "}
                                        </span>
                                      );
                                    })}
                                </PromoDate>
                              )}
                              <PromoDate>
                                <Tint> {i18n.t("promotion.promoDate")}：</Tint>{" "}
                                {moment(data.from).format(
                                  "YYYY/MM/DD HH:mm:ss"
                                )}
                                {" - "}
                                {moment(data.to).format("YYYY/MM/DD HH:mm:ss")}
                              </PromoDate>

                              <PromoDate></PromoDate>
                              <CustomViewContainer>
                                <Viewall
                                  onClick={() =>
                                    this.handlePromotionClick(
                                      data.id,
                                      data.promotionType
                                    )
                                  }
                                >
                                  {i18n.t("promotion.details")}
                                </Viewall>
                              </CustomViewContainer>
                            </RightContentContainer>
                          </RightContent>
                        </Content>
                      );
                    });
                else
                  return (
                    <PromoEmptyContainer>
                      <PromoEmptyText>
                        <PromoEmptyTextLine
                          style={
                            i18n.language === "en-US"
                              ? { fontSize: "40px", padding: "0 120px" }
                              : {}
                          }
                        >
                          {i18n.t("promotion.emptyLine1")}
                        </PromoEmptyTextLine>
                        <PromoEmptyTextLine>
                          {i18n.t("promotion.emptyLine2")}
                        </PromoEmptyTextLine>
                      </PromoEmptyText>
                    </PromoEmptyContainer>
                  );
              })()}
            </Inner>
          </MainContentRight>
        </MainContent>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    getPromotionList: (language) =>
      dispatch(generalAction.getPromotionList(language, 1, 99, true, "", true)),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
