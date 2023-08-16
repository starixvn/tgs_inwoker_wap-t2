import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";

import BGGamePNG from "../../../assets/images/slot/bg-game.png";
import BGFishPNG from "../../../assets/images/slot/fishbg.jpg";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

import SlotAllGamePNG from "../../../assets/images/slot-allgame.png";
import SlotAllGameInactivePNG from "../../../assets/images/slot-allgame-inactive.png";
import SlotHotGamePNG from "../../../assets/images/slot-hotgame.png";
import SlotHotGameActivePNG from "../../../assets/images/slot-hotgame-active.png";
import SlotNewGamePNG from "../../../assets/images/slot-newgame.png";
import SlotNewGameActivePNG from "../../../assets/images/slot-newgame-active.png";
import SlotBookmarkPNG from "../../../assets/images/slot-bookmark.png";
import SlotBookmarkActivePNG from "../../../assets/images/slot-bookmark-active.png";
import SlotFishGamePNG from "../../../assets/images/slot-fishgame.png";
import SlotFishGameActivePNG from "../../../assets/images/slot-fishgame-active.png";
import SlotHistoryGamePNG from "../../../assets/images/slot-history.png";
import SlotHistoryGameActivePNG from "../../../assets/images/slot-history-active.png";

import SlotBookmark1PNG from "../../../assets/images/slot-bookmark-1.png";
import SlotBookmark2PNG from "../../../assets/images/slot-bookmark-2.png";

import Loading from "../../../components/App/Loading";
import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import i18n from "../../../utils/i18n";
import CommonMarquee from "../CommonMarquee";

import config from "../../../config/config";
import Common from "../../../utils/Common";
const Container = styled.div`
  width: 100%;
  position: relative;
  background: url(${({ type }) => {
        return type === GameTypeEnum.FISH ? BGFishPNG : BGGamePNG;
      }})
      no-repeat center top,
    #e3e3e3;
  overflow: visible;
  background-size: ${({ type }) => {
    return type === GameTypeEnum.FISH ? "" : "auto 100%";
  }};
`;

const InnerWrap = styled.div`
  width: 1007px;
  min-height: 580px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
  margin: 20px auto 0px auto;
  padding: 16px 46px;
  box-sizing: border-box;
  overflow-y: auto;
`;
const GameTabContainer = styled.div`
  width: 1007px;
  margin: 40px auto 5px auto;
  background-color: #76727252;
  border-radius: 30px;
`;

const DisabledOverlay = styled.div`
  height: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  position: relative;
  color: white;
  font-weight: bold;
  pointer-event: none;
  text-transform: capitalize;
  z-index: 3;
  cursor: not-allowed;
  font-size: 15px;
  margin-top: -8px;
  width: 100%;
  border-radius: 35px;
`;

const GameTabButton = styled.div`
  width: 170px;
  height: 50px;
  outline: none;

  float: left;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 25px;
  background-color: transparent;
  margin: 8px 5px;
  transition: background-color 0.5s ease;
  padding: 5px;
  ${(props) => {
    if (props.active === true) {
      return `border: 2px solid #ebc468;
      background-color: #8a7f73;

    `;
    } else {
      return ` &:hover {
      cursor: pointer;
      border: 2px solid #ebc468;
      background-color: #8a7f73;
    }
   `;
    }
  }}

  ${({ maintenance }) => {
    return maintenance
      ? `
          pointer-events: none !important;
        ${DisabledOverlay}{
          display: flex; 
          pointer-events: none !important;
          cursor: not-allowed;
        }
    
        ${GameTab}{
          pointer-events: none;
         z-index: -1;
        }
        `
      : ``;
  }}
`;
const GameTab = styled.div`
  background: url(${(props) =>
      `${
        process.env.PUBLIC_URL
      }/assets/images/provider/${props.abbreviation.toLowerCase()}.png`})
    no-repeat center;
  background-size: contain;
  height: 100%;
  width: 100%;
`;
const GameTabAll = styled(GameTabButton)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllPNG}) , linear-gradient(to top,#695b4b,#46423d);`
      : `  background: url(${SlotAllInactivePNG}) , rgb(238, 238, 238);`};
  background-repeat: no-repeat;
  background-size: 120ox auto;
  background-position: center;
  &:hover {
    cursor: pointer;
    background-image: url(${SlotAllPNG}),
      linear-gradient(to top, #695b4b, #46423d);
  }
`;

const GameSubFilterContainer = styled.div`
  padding-left: 20px;
  width: 908px;
  height: 42px;
  border-top: 1px solid #36437d;
  border-bottom: 1px solid #36437d;
  margin: 25px 0 15px 0;
`;

const CategoryContainer = styled.div`
  height: 30px;
  box-sizing: border-box;

  font-size: 16px;
  float: left;
  margin-right: 20px;
  margin-top: 6px;
  &:hover {
    cursor: pointer;
  }
  ${(props) => (props.active ? ` color:  #c40511;` : ` color: #404040;`)};
`;
const CategoryText = styled.div`
  float: left;
  margin-top: 2px;
`;
const FilterItem = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  margin: 3px 5px 0 0;
  height: 19px;
  width: 19px;
  float: left;
`;

const AllGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllGamePNG}) no-repeat;`
      : `  background: url(${SlotAllGameInactivePNG}) no-repeat;`};
`;
const HotGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHotGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHotGamePNG}) no-repeat;`};
`;
const NewGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotNewGameActivePNG}) no-repeat;`
      : `  background: url(${SlotNewGamePNG}) no-repeat;`};
`;
const BookmarkFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotBookmarkActivePNG}) no-repeat;`
      : `  background: url(${SlotBookmarkPNG}) no-repeat;`};
`;
const FishGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotFishGameActivePNG}) no-repeat;`
      : `  background: url(${SlotFishGamePNG}) no-repeat;`};
`;
const HistoryFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHistoryGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHistoryGamePNG}) no-repeat;`};
`;

const SearchFilterItemContainer = styled.div`
  width: 141px;
  height: 30px;
  border-radius: 15px;
  background-color: #d3d3d3;

  margin-top: 5px;
  float: right;
`;
const SearchFilterItemInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 15px;
  margin: 5px 0 0 5px;
  width: 100px;
`;

const GameListContainer = styled.div`
  width: 908px;
  padding: 6px;
  background-color: #eaeaea;
`;

const GameHoverSelection = styled.div`
  width: 165px;
  height: 205px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  color: #fff;
  font-size: 65px;
  text-align: center;
  padding-top: 55px;
`;
const ItemContainer = styled.div`
  width: 165px;
  border: solid 1px #fde73f;
  position: relative;
  float: left;
  margin: 7px;
  &:hover {
    cursor: pointer;
  }
  &:hover ${GameHoverSelection} {
    display: block;
  }
  ${(props) =>
    `
  background-image:url(` +
    props.img +
    `)`};
  background-size: 165px 165px;
  background-repeat: no-repeat;
  background-position: center top;
`;
const GameDesc = styled.div`
  padding-left: 10px;

  height: 28px;
  float: right;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`;
const Namecontainer = styled.div`
  width: 165px;
  height: 40px;
  box-shadow: 0px 4px 6px 0 rgba(0, 0, 0, 0.8);
  border-top: solid 1px #fde73f;
  background-image: linear-gradient(to top, #f0bc5a, #f0ca83);

  color: #ffffff;
  font-size: 14px;
  padding: 10px 0 0 10px;
  box-sizing: border-box;
  margin-top: 165px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GameProvider = styled.div`
  float: left;
  font-size: 14px;
  color: #ffffff;
  padding-right: 5px;
  margin-top: 4px;
  text-align: center;
`;
const Bookmark = styled.div`
  float: right;

  width: 30px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: 8px center;

  ${(props) =>
    props.bookmark
      ? ` background-image:  url(${SlotBookmark1PNG})`
      : `  background-image:  url(${SlotBookmark2PNG})`};
`;

const Spliter = styled.div`
  background-color: #515151;
  width: 1px;
  float: left;
  height: 14px;
  margin: 7px 0 10px 0;
`;

const Spacing = styled.div`
  height: 40px;
`;
class Slots extends Component {
  constructor(props) {
    super(props);

    const type = this.getType();
    this.state = {
      favGame: [],
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: type,
      platformList: [],
      loading: true,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
    if (this.props.token !== null && this.props.token !== "") {
      this.getFav();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevProps.match.params.platform !== this.props.match.params.platform ||
      prevProps.match.url !== this.props.match.url
    ) {
      if (prevProps.match.url !== this.props.match.url) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        var platform = this.props.match.params.platform
          ? this.props.match.params.platform
          : "";

        this.getGameList(1, platform, this.getType());
      } else if (prevState.type !== this.state.type) {
        if (this.props.token !== null && this.props.token !== "") {
          this.getFav();
        }
      } else if (
        prevProps.match.params.platform !== this.props.match.params.platform
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setState({
          ...this.state,
          platform: this.props.match.params.platform
            ? this.props.match.params.platform
            : "",
        });
      } else {
        this.getGameList();
      }
    }
    if (prevProps.token !== this.props.token && this.props.token !== null) {
      this.getFav();
    }
  }
  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : this.props.match.url.indexOf("fish") >= 0
        ? GameTypeEnum.FISH
        : GameTypeEnum.TABLEGAME;
    return type;
  }

  getFav(type = this.state.type) {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        this.setState({
          ...this.state,
          favGame: data,
        });
      }
    });
  }
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,

      loading: true,
    });

    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }
  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${type}/${platform}`);
  };
  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };
  // handleSearchClick = (e) => {
  //   this.getGameList(1);
  // };
  // handleMoreClick = () => {
  //   this.setState({ ...this.state, page: this.state.page + 1 });
  // };
  // handleBookmarkClick = (id, collect_id) => {
  //   if (this.props.token) {
  //     if (collect_id > 0) {
  //       GameService.DeleteBookmarkSlotGame(collect_id).then((response) => {
  //         if (response.IsSuccess) {
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = 0;
  //                 if (this.state.filterGame !== SlotFilterType.Bookmark) {
  //                   newList.push(item);
  //                 }
  //               } else {
  //                 newList.push(item);
  //               }
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //         }
  //       });
  //     } else {
  //       GameService.BookmarkSlotGame(this.props.token, id).then((response) => {
  //         if (response.IsSuccess) {
  //           var collect_id = response.data;
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = collect_id;
  //               }
  //               newList.push(item);
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //           // this.state.gameList.filter((row) => row.id === id);
  //         }
  //       });
  //     }
  //   }
  // };
  handleJoinGameClick = (gpcode, gpid) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    if (this.props.token) {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      this.props.history.push(`/${type}/play/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token == null && category === 3) {
      return null;
    }
    return (
      <CategoryContainer
        onClick={() => this.handleFilterGameClick(category)}
        active={this.state.filterGame === category}
      >
        {(() => {
          switch (category) {
            case SlotFilterType.All:
              return (
                <AllGameFilterItem
                  active={this.state.filterGame === category}
                ></AllGameFilterItem>
              );
            case SlotFilterType.Hot:
              return (
                <HotGameFilterItem
                  active={this.state.filterGame === category}
                ></HotGameFilterItem>
              );
            case SlotFilterType.New:
              return (
                <NewGameFilterItem
                  active={this.state.filterGame === category}
                ></NewGameFilterItem>
              );
            case SlotFilterType.Bookmark:
              return (
                <BookmarkFilterItem
                  active={this.state.filterGame === category}
                ></BookmarkFilterItem>
              );

            case SlotFilterType.Fish:
              return (
                <FishGameFilterItem
                  active={this.state.filterGame === category}
                ></FishGameFilterItem>
              );
            case SlotFilterType.History:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            case SlotFilterType.Recommend:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );

            default:
              return null;
          }
        })()}

        <CategoryText>{text}</CategoryText>
      </CategoryContainer>
    );
  }

  handleToggleFavorite = (match, id, match2) => {
    if (this.props.token !== null && this.props.token !== "") {
      if (match) {
        this.props.removeFavoriteGame(id).then(() => {
          var array = [...this.state.favGame];
          var index = array.indexOf(id);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ favGame: array });
          }
        });
      } else {
        this.props.setFavoriteGame(id).then(() => {
          this.setState({
            ...this.state,
            favGame: [...this.state.favGame, id],
          });
        });
      }
    }
  };
  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((a) => {
          if (this.state.filterGame === SlotFilterType.All) return true;
          else {
            if (this.state.filterGame === SlotFilterType.Hot) {
              return a.tag.hot === true;
            } else if (this.state.filterGame === SlotFilterType.New) {
              return a.tag.new === true;
            } else if (this.state.filterGame === SlotFilterType.Recommend) {
              return a.tag.recommend === true;
            } else if (this.state.filterGame === SlotFilterType.Bookmark) {
              return this.state.favGame.indexOf(a.id) > -1;
            }
          }

          return false;
        })
        .filter((a) => {
          if (this.state.keyword === "") return true;
          else
            return a.name
              .toUpperCase()
              .includes(this.state.keyword.toUpperCase());
        })
        .filter((s) => {
          return s.isactive === true; // show only active game.
        })

        .map((el, i) => {
          var theName;
          this.props.game.providerList.filter((a) => {
            if (a.abbreviation === el.gpcode) {
              return (theName = a.name);
            }
            return theName;
          });

          return (
            <ItemContainer
              key={i}
              img={`${
                config.sourceUrl
              }${el.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                el.code
              }.jpg`}
            >
              <GameDesc>
                <GameProvider>{theName}</GameProvider>
                <Spliter></Spliter>
                <Bookmark
                  bookmark={this.state.favGame.indexOf(el.id) > -1}
                  onClick={() =>
                    this.handleToggleFavorite(
                      this.state.favGame.indexOf(el.id) > -1,
                      el.id
                    )
                  }
                ></Bookmark>
              </GameDesc>
              <GameHoverSelection
                onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
              >
                GO
              </GameHoverSelection>
              <Namecontainer>{el.name}</Namecontainer>
            </ItemContainer>
          );
        });
    }

    return (
      <Container type={this.state.type}>
        {config.features.HideMarquee && <CommonMarquee />}
        <GameTabContainer type={this.state.type}>
          <GameTabAll
            active={this.state.platform === ""}
            onClick={() => this.handleParentClick("")}
          ></GameTabAll>
          {this.props.game.homePageGameList
            .filter((row) => {
              return row.type === this.state.type;
            })
            .map((row, index) => {
              return (
                <GameTabButton
                  key={index}
                  active={this.state.platform === row.abbreviation}
                  onClick={() => this.handleParentClick(row.abbreviation)}
                  maintenance={row.status !== 0}
                >
                  <DisabledOverlay>
                    {i18n.t("transfer.maintenance")}
                  </DisabledOverlay>
                  <GameTab abbreviation={row.abbreviation}></GameTab>
                </GameTabButton>
              );
            })}
        </GameTabContainer>
        <InnerWrap>
          <GameSubFilterContainer>
            {this.genCategoryItem(SlotFilterType.All, i18n.t("slot.allGame"))}
            {this.genCategoryItem(SlotFilterType.Hot, i18n.t("slot.hotGame"))}
            {this.genCategoryItem(SlotFilterType.New, i18n.t("slot.newGame"))}
            {this.genCategoryItem(
              SlotFilterType.Recommend,
              i18n.t("slot.recommendGame")
            )}
            {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )}
            <SearchFilterItemContainer>
              <SearchFilterItemInput
                type="text"
                maxLength="15"
                autocomplete="off"
                onChange={this.handleKeywordChange}
                placeholder={i18n.t("slot.search")}
              ></SearchFilterItemInput>
            </SearchFilterItemContainer>
          </GameSubFilterContainer>
          <GameListContainer>{list}</GameListContainer>
          {/* <ButtonMore
            onClick={this.handleMoreClick}
            style={{
              visibility:
                this.state.gameList.length < this.state.total
                  ? "visible"
                  : "hidden",
            }}
          >

          </ButtonMore> */}
        </InnerWrap>
        <Spacing></Spacing>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    // jackpotAmount: state.ui.jackpotAmount,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Slots);
