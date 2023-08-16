import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import BGJPG from "../../../assets/images/bg.jpg";
import { AppHistory } from "../../../history/History";
import { withSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import { Grid, Container as MContainer } from "@material-ui/core";

import config from "../../../../src/config/config";

const moment = require("moment");
const Container = styled.div`
  width: 100%;
  padding-top: 20px;

  background: url(${BGJPG}) no-repeat top center #19262f;
  min-height: 800px;
`;

const PromoDesc = styled.div`
  font-size: 14px;
  color: #747474;
`;

const PromoDetailContainer = styled(Grid)`
  box-shadow: 0px 1px 8px rgba(32, 0, 0, 0.7);
  margin: 10px 0px;
  width: 100%;
  position: relative;
  background: white;
  padding: 18px 15px;
  border-radius: 20px;
`;

const PromoDetailImage = styled.div`
  width: 100%;
  height: 486px;
  margin-bottom: 20px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: AdobeHeitiR;
`;

const EventText = styled.div`
  font-size: 14px;
  color: #4f4f4f;
  font-family: AdobeHeitiR;
  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-color: #f0ca83;

  ${({ disableTheButton }) => {
    return disableTheButton
      ? `
    opacity: 0.65;
    cursor: not-allowed;`
      : ``;
  }}
`;

const TNCContainer = styled.span`
  color: #123414;
  text-decoration: underline;
  font-weight: bold;
`;

const PromoButtonText = styled(Grid)`
  color: #fff;
  font-size: 20px;
`;

const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const DialogContainer = styled.div`
  width: 600px;

  background-color: #fff;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;
const DialogContent = styled.div`
  margin: 0 auto;
  padding: 10px 40px;
`;
const CloseButton = styled.div`
  position: absolute;
  right: 22px;
  top: 24px;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  background: #fff;
  padding: 8px 12px;
  color: #000;
`;

class PromotionDetails extends Component {
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
      AppHistory.replace("/promotion");
    }
    var term = "";
    if (details) {
      if (
        JSON.stringify(details.localization) !== "{}" &&
        (details.localization[i18n.language] !== "" ||
          details.localization[i18n.language] !== null)
      ) {
        term = details.localization[i18n.language].terms
          ? details.localization[i18n.language].terms
          : details.terms;
      } else {
        term = details.terms || "";
      }
    }
    this.state = {
      index: index,
      details: details,
      term: term,
      joined: false,
      openDialog: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/promotion");
    }
    if (this.props.general.promotionList.items.length <= 0) {
      AppHistory.replace("/promotion");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
        this.setState({
          ...this.state,
          joined: true,
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "success",
          });
        }
      }
    }
  }

  handleBospIdChange = (bospId) => {
    this.setState({ ...this.state, selectedBospId: bospId });
  };
  ResetPopup = () => {
    this.setState({
      ...this.state,
      openJoin: false,
      selectedPromoSpecifications: [],
      selectedPromoTitle: "",
      selectedBospId: 0,
    });
    this.props.history.push("/promotion");
  };
  handleCloseDialog = () => {
    this.ResetPopup();
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };
  handleShowDialog = () => {
    this.setState({ ...this.state, openDialog: true });
  };
  ViewAllClick = (activity_id) => {
    let list = this.state.list;
    var foundIndex = list.findIndex((x) => x.id === activity_id);
    list[foundIndex].checked = !list[foundIndex].checked;

    this.setState({ ...this.state, list: list });
  };
  contentClickHandler = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    if (targetLink.href.indexOf("/promotion/") >= 0) {
      this.props.history.push(
        "/promotion/" +
          targetLink.href.substring(
            targetLink.href.indexOf("/promotion/") + 11,
            targetLink.href.length
          )
      );
    }
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
      AppHistory.push({
        pathname: "/account/deposit/" + id,
      });
    }
  };

  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
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

  goBack() {
    AppHistory.replace("/promotion");
  }
  render() {
    if (this.state.details === null) return <></>;
    var isDummy = this.state.details.promotionType.toUpperCase() === "DUMMY";
    var isPromoteDepositChannel = this.state.details.promotionType.toUpperCase() === "PROMOTEDEPOSITCHANNEL";
    var checkIfLocalizationIsEmpty =
      JSON.stringify(this.state.details.localization) === "{}";
    return (
      <Container>
        <MContainer>
          <PromoDetailContainer container direction="column">
            <CloseButton onClick={this.goBack}>✖</CloseButton>
            <PromoDetailImage
              img={(() => {
                if (this.state.details.localization !== null) {
                  var checkLocale =
                    this.state.details.localization[i18n.language];
                  if (checkLocale) {
                    return checkLocale.desktopBanner;
                  } else {
                    return this.state.details.desktopBanner;
                  }
                } else {
                  return this.state.details.desktopBanner;
                }
              })()}
            ></PromoDetailImage>
            {config.features.HaveVIPFeature && (
              <React.Fragment>
                <EventTitle>{i18n.t("promotion.promoTarget")}：</EventTitle>
                <EventText>
                  {this.state.details.vipLevels
                    .sort((a, b) => {
                      return a - b;
                    })
                    .map((a, index) => {
                      return (
                        <span key={index}>
                          VIP{a}
                          {index < this.state.details.vipLevels.length - 1 &&
                            ", "}
                        </span>
                      );
                    })}
                </EventText>
              </React.Fragment>
            )}
            <EventTitle>{i18n.t("promotion.promoDate")}：</EventTitle>
            <EventText>
              {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
              {" - "}
              {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
            </EventText>
            <EventText>
              <PromoDesc
                dangerouslySetInnerHTML={{
                  __html:
                    "<div>" +
                    (() => {
                      if (
                        !checkIfLocalizationIsEmpty &&
                        (this.state.details.localization[i18n.language] !==
                          "" ||
                          this.state.details.localization[i18n.language] !==
                            null)
                      ) {
                        return (
                          (this.state.details.localization[i18n.language]
                            .content
                            ? this.state.details.localization[i18n.language]
                                .content
                            : this.state.details.content) ?? ""
                        );
                      } else {
                        return this.state.details.content ?? "";
                      }
                    })() +
                    "</div>",
                }}
              ></PromoDesc>

              {this.state.term !== "" && (
                <TNCContainer onClick={this.handleShowDialog}>
                  {i18n.t("common.termsAndCondition")}
                </TNCContainer>
              )}
            </EventText>
            <Grid container justify="center">
              {!(isDummy || isPromoteDepositChannel) && (
                <PromoButtonContainer
                  container
                  alignItems="center"
                  justify="center"
                  md={3}
                  disableTheButton={this.state.joined}
                  onClick={() =>
                    !this.state.joined &&
                    this.handlejoinPromotionClick(
                      this.state.details.id,
                      this.state.details.promotionType
                    )
                  }
                >
                  <PromoButtonText item>
                    {i18n.t("promotion.joinPromo")}
                  </PromoButtonText>
                </PromoButtonContainer>
              )}
            </Grid>
          </PromoDetailContainer>
        </MContainer>
        <StyledDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        >
          <DialogContainer>
            <CloseIconContainer
              viewBox="4 4 16 16"
              onClick={this.handleCloseDialog}
            ></CloseIconContainer>
            <div className="clear"></div>
            <TitleContainer>
              {i18n.t("common.termsAndCondition")}
            </TitleContainer>
            <DialogContent
              dangerouslySetInnerHTML={{
                __html: "<div >" + this.state.term + "</div>",
              }}
            ></DialogContent>
          </DialogContainer>
        </StyledDialog>
      </Container>
    );
    // if (this.state.details === null) {
    //   //TODO: temporary put this here.
    //   return (
    //     <Container>
    //       <MContainer>
    //         <PromoDetailContainer container direction="column">
    //           <PromoDetailImage src={PromoImage1} />
    //           <EventTitle>【活動條件】</EventTitle>
    //           <EventText>
    //             活動對象：
    //             <br />
    //             全站會員
    //           </EventText>
    //           <EventText>
    //             活動時間：
    //             <br />
    //             2021年4月20日00:00:00-2021年4月29日23:59:59
    //           </EventText>
    //         </PromoDetailContainer>
    //       </MContainer>
    //     </Container>
    //   );
    // } else {
    //   return (
    //     <Container>
    //       <MainContent>
    //         <Inner>
    //           <Content>
    //             <PromoTitle>{this.state.details.title}</PromoTitle>

    //             <PromoDate>
    //               {i18n.t("promotion.startDate")}
    //               {this.state.details.start_time_text}
    //             </PromoDate>
    //             <PromoDate>
    //               {i18n.t("promotion.endDate")}
    //               {this.state.details.end_time_text}
    //             </PromoDate>
    //             <PromoDesc
    //               dangerouslySetInnerHTML={{
    //                 __html:
    //                   "<div class='custom-promotion'>" +
    //                   this.state.details.desc +
    //                   this.state.details.pc_promotion_describe +
    //                   "</div>",
    //               }}
    //             ></PromoDesc>
    //           </Content>
    //         </Inner>
    //       </MainContent>
    //     </Container>
    //   );
    // }
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
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(PromotionDetails))
);
