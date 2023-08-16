import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-lazy-load-image-component/src/effects/blur.css";

import i18n from "../../../utils/i18n";

const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;

  background-size: contain;
`;

const ListView = styled.div``;
const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;
  background-size: 100% 100%;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 280px;
`;

const EmptyPromo = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/promo-empty.png`})
    no-repeat;
  background-size: cover;
  position: relative;

  margin: 10px auto;
  border-radius: 10px;
  width: 690px;
  height: 240px;
`;
const PromoEmptyText = styled.div`
  width: 350px;
  padding-top: 62px;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 34px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(#446597, #282828);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    openJoin: false,
    selectedPromoSpecifications: [],
  };
  componentDidMount() {
    //  if (this.props.token === null || this.props.token === "") {
    //    this.props.getPromotionList(i18n.language);
    //  } else {
    //    this.props.getPlayerPromotionList(i18n.language);
    //  }
  }

  handleTabChange = (tab) => {
    // this.getList(tab);
    this.setState({ ...this.setState, selectedTab: tab });
  };
  handlePromoClick = (id) => {
    this.props.appHistory.replace({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
  };

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, selectedTab: newValue });
  };
  a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      "aria-controls": `wrapped-tabpanel-${index}`,
    };
  }
  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("promotion.title")}
        ></Header>

        <ListView>
          {this.props.general.promotionList.items.length <= 0 ? (
            <EmptyPromo>
              <PromoEmptyText>
                <PromoEmptyTextLine
                  style={
                    i18n.language === "en-US"
                      ? { fontSize: "26px", padding: "0px 32px" }
                      : {}
                  }
                >
                  {i18n.t("promotion.emptyLine1")}
                </PromoEmptyTextLine>
                <PromoEmptyTextLine>
                  {i18n.t("promotion.emptyLine2")}
                </PromoEmptyTextLine>
              </PromoEmptyText>
            </EmptyPromo>
          ) : (
            this.props.general.promotionList.items
              .sort((a, b) => {
                return a.order - b.order;
              })
              .map((row, index) => {
                if (row.localization !== null) {
                  var checkLocale = row.localization[i18n.language];
                  return (
                    <ListItem
                      key={index}
                      order={row.order}
                      src={
                        checkLocale
                          ? checkLocale.mobileBanner
                          : row.mobileBanner
                      }
                      onClick={() => this.handlePromoClick(row.id)}
                    ></ListItem>
                  );
                } else {
                  return (
                    <ListItem
                      key={index}
                      src={row.mobileBanner}
                      onClick={() => this.handlePromoClick(row.id)}
                    ></ListItem>
                  );
                }
              })
          )}
        </ListView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    general: state.general,
    token: state.account.token,
  };
};
const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Promotion));
