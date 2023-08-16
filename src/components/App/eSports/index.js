import { connect } from "react-redux";
import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 850px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/esports/bg.jpg"})
    no-repeat center;
`;

const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;
const RightSlide = styled(ScrollAnimation)`
  display: flex;
`;
const ItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  cursor: not-allowed;
`;

const ImageWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `

    ${Maintenance}{
     
      display: flex;
    }
    ${GirlImage}{
      filter: brightness(40%) grayscale(200%);
    }
    
    
    `
      : ``;
  }}
`;
class ESports extends Component {
  constructor(props) {
    super(props);

    var sportsList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.ESPORTS;
    });

    this.state = {
      selected: sportsList[0],

      list: sportsList,
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var sportsList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.ESPORTS;
      });

      this.setState({
        ...this.state,
        selected: sportsList[0],

        list: sportsList,
      });
    }
  }
  handleJoinGameClick = (params, type) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      this.props.history.push("/sports/play/" + params + "/" + type);
    }
  };
  render() {
    return (
      <Container>
        <ItemContainer style={{ marginTop: 370 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list
              .slice(0, 4)

              .map((item, index) => {
                return (
                  <ImageWrapper maintenance={item.status !== 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/esports/" +
                        (config.features.SportsHideLogo ? "hkjp/" : "") +
                        item.abbreviation.toLowerCase() +
                        (config.features.SportsHideLogo
                          ? "-" + i18n.language
                          : "") +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation, item.type);
                      }}
                    />
                  </ImageWrapper>
                );
              })}
          </LeftSlide>
        </ItemContainer>
        <ItemContainer style={{ marginTop: 560 }}>
          <RightSlide
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list.map((item, index) => {
              if (index >= 4) {
                return (
                  <ImageWrapper maintenance={item.status !== 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/esports/" +
                        (config.features.SportsHideLogo ? "hkjp/" : "") +
                        item.abbreviation.toLowerCase() +
                        (config.features.SportsHideLogo
                          ? "-" + i18n.language
                          : "") +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.abbreviation, item.type);
                      }}
                    />
                  </ImageWrapper>
                );
              }
            })}
          </RightSlide>
        </ItemContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ESports));
