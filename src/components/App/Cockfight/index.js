import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { withRouter } from "react-router-dom";
import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
import { GameService } from "../../../api-services/services/GameService";
import { AppHistory } from "../../../history/History";
const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 749px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcGamePage/cockfight/bg.jpg"})
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
class Cockfight extends Component {
  constructor(props) {
    super(props);

    var cockfightList = props.game.homePageGameList
      .filter((item) => {
        return item.type === GameTypeEnum.COCKFIGHT;
      })
      .sort((a, b) => {
        if (config.features.LiveGame_Sorting_SKY) {
          var sortDGFirst = ["DG"];
          return (
            sortDGFirst.indexOf(b.abbreviation) -
            sortDGFirst.indexOf(a.abbreviation)
          );
        } else return b - a;
      });

    this.state = {
      selected: cockfightList[0],

      list: cockfightList,
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var cockfightList = this.props.game.homePageGameList
        .filter((item) => {
          console.log(item);
          return item.type === GameTypeEnum.COCKFIGHT;
        })
        .sort((a, b) => {
          return b - a;
        });

      this.setState({
        ...this.state,
        selected: cockfightList[0],

        list: cockfightList,
      });
    }
  }
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (params === "SM01") {
        if (document.getElementById("audio") != null)
          document.getElementById("audio").volume = 0.0;
        this.props.performBalanceRefresh();
        Common.closePreviousPopup();

        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      } else {
        AppHistory.push("/sports/play/" + params + "/" + GameTypeEnum.SPORTS);
      }
    } else {
      this.props.showLogin(true);
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
              .reverse()
              .map((item, index) => {
                return (
                  <ImageWrapper maintenance={item.status != 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/cockfight/" +
                        item.abbreviation.toLowerCase() +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.gpcode, item.type);
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
                  <ImageWrapper maintenance={item.status != 0}>
                    <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                    <GirlImage
                      img={
                        process.env.PUBLIC_URL +
                        "/assets/images/pcGamePage/cockfight/" +
                        item.abbreviation.toLowerCase() +
                        ".png"
                      }
                      onClick={() => {
                        this.handleJoinGameClick(item.gpcode, item.type);
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
)(withRouter(Cockfight));
