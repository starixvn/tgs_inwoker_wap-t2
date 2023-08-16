import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";

import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import Common from "../../../utils/Common";
const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "870px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/live/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  background-size: contain;
  background-position: center;
  float: right;
  cursor: pointer;
`;
const LeftSlide = styled(ScrollAnimation)`
  display: grid;
  grid-template-columns: repeat(4, 308px);
  grid-gap: 10px;
  grid-auto-rows: 200px;
  justify-content: center;
  align-items: center;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-self: center;

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

class LiveGame extends Component {
  constructor(props) {
    super(props);

    var liveList = props.game.homePageGameList
      .filter((item) => {
        return item.type === GameTypeEnum.LIVELOBBY;
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
      selected: liveList[0],
      subMenu: null,
      isSelected: false,
      hide: true,
      list: liveList,
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
      var liveList = this.props.game.homePageGameList
        .filter((item) => {
          return item.type === GameTypeEnum.LIVE;
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

      this.setState({
        ...this.state,
        selected: liveList[0],
        list: liveList,
      });
    }
  }
  triggerSetSelected = (bool) => {
    this.setState({
      isSelected: bool,
    });
    setTimeout(() => {
      this.triggerSetSelected(false);
    }, 800);
  };
  popup = null;
  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      // this.props.performBalanceRefresh();
      Common.closePreviousPopup();
      var win = Common.PopupCenter(
        "/joingame/" + GameTypeEnum.LIVELOBBY + "/" + params.toUpperCase(),
        params.toUpperCase(),
        1280,
        720
      );
      // var win = window.open(
      //     "/joingame/" +
      //     GameTypeEnum.LIVELOBBY +
      //     "/" +
      //     params.toUpperCase(),
      //   "gamewindow",
      //   "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      // );

      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
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
    const ImageDisplayer = ({ item }) => {
      return (
        <ImageWrapper maintenance={item.status !== 0}>
          <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
          <GirlImage
            img={
              process.env.PUBLIC_URL +
              "/assets/images/pcGamePage/live/" +
              item.abbreviation.toLowerCase() +
              (item.abbreviation.toLowerCase() === "wgfm" ||
              item.abbreviation.toLowerCase() === "wgvia"
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
    };

    const customSorting = this.state.list.sort((a, b) => {
      if (config.features.LiveGame_Sorting_SKY) {
        var sortDGFirst = ["DG"];
        return (
          sortDGFirst.indexOf(b.abbreviation) -
          sortDGFirst.indexOf(a.abbreviation)
        );
      } else return b - a;
    });

    return (
      <Container
        GamePage_SpecificBackground={
          config.features.GamePage_SpecificBackground
        }
      >
        <ItemContainer>
          <LeftSlide
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            {customSorting.map((item, index) => {
              return <ImageDisplayer item={item} />;
            })}
          </LeftSlide>
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
export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
