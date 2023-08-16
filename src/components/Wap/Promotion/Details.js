import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../../Wap/Share/Header";
import Button from "../../Wap/Share/Button";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";

import config from "../../../config/config";
const moment = require("moment");
const Content = styled.div`
  width: 100%;

  padding: 0 30px 30px 30px;
`;
const PromoDetailImage = styled.div`
  width: 750px;
  height: 304px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 20px;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 28px;
  font-family: AdobeHeitiR;
  margin-left: -16px;
`;

const EventText = styled.div`
  font-size: 22px;
  color: #4f4f4f;
  font-family: AdobeHeitiR;
  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoDesc = styled.div`
  font-size: 22px;
`;
class Details extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var details = null;
    for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
      if (
        this.props.general.promotionList.items[i].id ===
        this.props.match.params.id
      ) {
        index = i;
        details = this.props.general.promotionList.items[i];
        break;
      }
    }

    if (index === -1) {
      this.props.appHistory.replace({
        pathname: "/" + i18n.language + "/promotion-list",
      });
    }

    this.state = {
      details: details,
      index: index,
      loading: false,
    };

    document.getElementsByTagName("body")[0].style.background = "#fff";
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.alert("", i18n.t("promotion.joinSuccess"));
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.alert("", i18n.t("promotion.promoJoint"));
        }
      }
    }
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "";
  }
  handleBonusChange = (e) => {
    this.setState({ ...this.state, bonusSubId: parseInt(e.target.value) });
  };
  performRedirect = (id, promotionType) => {
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
      this.props.appHistory.push({
        pathname: "/" + i18n.language + "/deposit/" + id,
      });
    }
  };

  handleJoinClick = (id, promotionType) => {
    if (this.props.token === null || this.props.token === "") {
      this.props.appHistory.replace({
        pathname: "/" + i18n.language + "/Login",
      });
    } else {
      if (this.state.details.vipLevels.length === 0) {
        //if nothing inside viplevels
        this.performRedirect(id, promotionType);
      } else {
        this.state.details.vipLevels.filter((levels) => {
          if (levels === this.props.account.info.member_level_id) {
            //check every single level whether it match member level
            this.performRedirect(id, promotionType);
          }
        });
      }
    }
  };

  handleBackClick = () => {
    this.props.appHistory.replace("/" + i18n.language + "/promotion-list");
  };

  render() {
    if (this.state.details === null) return <React.Fragment></React.Fragment>;
    var isDummy = this.state.details.promotionType.toUpperCase() === "DUMMY";

    var checkIfLocalizationIsEmpty =
      JSON.stringify(this.state.details.localization) === "{}";

    var contentToDisplay =
      (!checkIfLocalizationIsEmpty &&
        this.state.details.localization[i18n.language].content) ||
      this.state.details.content ||
      "";

    var termsToDisplay =
      (!checkIfLocalizationIsEmpty &&
        this.state.details.localization[i18n.language].terms) ||
      this.state.details.terms ||
      "";

    return (
      <React.Fragment>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("promotion.promoDetail")}
        ></Header>
        {(() => {
          if (this.state.details.localization !== null) {
            var checkLocale = this.state.details.localization[i18n.language];
            return (
              <PromoDetailImage
                img={
                  checkLocale
                    ? checkLocale.mobileBanner
                    : this.state.details.mobileBanner
                }
                onClick={() => this.handlePromoClick(this.state.details.id)}
              ></PromoDetailImage>
            );
          } else {
            return (
              <PromoDetailImage
                img={this.state.details.mobileBanner}
                onClick={() => this.handlePromoClick(this.state.details.id)}
              ></PromoDetailImage>
            );
          }
        })()}

        <Content>
          <EventTitle>【{i18n.t("promotion.promoDetail")}】</EventTitle>
          {config.features.HaveVIPFeature && (
            <EventText>
              {i18n.t("promotion.promoTarget")}：
              <br />
              {this.state.details.vipLevels
                .sort((a, b) => {
                  return a - b;
                })
                .map((a, index) => {
                  return (
                    <span key={index}>
                      VIP{a}
                      {index < this.state.details.vipLevels.length - 1 && ", "}
                    </span>
                  );
                })}
            </EventText>
          )}
          <EventText>
            {i18n.t("promotion.promoDate")}：
            <br />
            {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
            {" - "}
            {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
          </EventText>
          <PromoDesc
            dangerouslySetInnerHTML={{
              __html: "<div>" + contentToDisplay + "</div>",
            }}
          />
          <PromoDesc
            dangerouslySetInnerHTML={{
              __html: "<div>" + termsToDisplay + "</div>",
            }}
          />
        </Content>
        {!isDummy && (
          <Button
            style={{ margin: "40px auto 0 auto" }}
            label={i18n.t("promotion.joinPromo")}
            onClick={() =>
              this.handleJoinClick(
                this.state.details.id,
                this.state.details.promotionType
              )
            }
          ></Button>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    token: state.account.token,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
