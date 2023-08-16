import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";

import i18n from "../../../utils/i18n";

import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 870px;
  padding: 70px 0px;
  position: relative;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/pcGamePage/lottery/background.jpg)
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

class Lottery extends Component {
  constructor(props) {
    super(props);

    var lotteryList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.LOTTERY;
    });

    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var lotteryList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.LOTTERY;
      });

      this.setState({
        ...this.state,
        selected: lotteryList[0],

        list: lotteryList,
      });
    }
  }
  handleJoinGameClick = (name) => {
    if (this.props.account.token != null) {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <ItemContainer style={{ marginTop: 500 }}>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {this.state.list.map((item, index) => {
              return (
                <ImageWrapper maintenance={item.status !== 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GirlImage
                    img={
                      process.env.PUBLIC_URL +
                      "/assets/images/pcGamePage/lottery/" +
                      item.abbreviation.toLowerCase() +
                      ".png"
                    }
                    onClick={() => {
                      this.handleJoinGameClick(item.abbreviation);
                    }}
                  />
                </ImageWrapper>
              );
            })}
          </LeftSlide>
        </ItemContainer>
        {
          //    <ItemContainer style={{ marginTop: 560 }}>
          //    <RightSlide
          //      animateIn="fadeInRight"
          //      duration={1}
          //      animateOnce={true}
          //      style={{ overflow: "visible" }}
          //    >
          //      {this.state.list.map((item, index) => {
          //        if (index >= 3) {
          //          return (
          //            <GirlImage
          //              style={{ float: "left" }}
          //              img={
          //                process.env.PUBLIC_URL +
          //                "/assets/images/pcGamePage/lottery/" +
          //                item.abbreviation.toLowerCase() +
          //                ".png"
          //              }
          //              onClick={() => {
          //                this.handleJoinGameClick(item.abbreviation, item.type);
          //              }}
          //            />
          //          );
          //        }
          //      })}
          //    </RightSlide>
          //  </ItemContainer>
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
