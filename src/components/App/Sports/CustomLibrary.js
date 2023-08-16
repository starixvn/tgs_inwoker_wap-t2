import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

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

import SlotLikePNG from "../../../assets/images/slot-like.png";
import SlotLikeActivePNG from "../../../assets/images/slot-like-active.png";

import Loading from "../Loading";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;

  position: relative;
`;

const InnerWrap = styled.div`
  width: 1007px;
  min-height: 580px;
  border-radius: 30px;

  background: rgba(255, 255, 255, 0.8);

  margin: 130px auto 50px auto;
  padding: 16px 46px;
  box-sizing: border-box;
  overflow-y: auto;

  ${({ type }) => {
    return type === GameTypeEnum.SLOT && config.features.Slot_InfoGap
      ? `margin: 587px auto 50px auto;`
      : `margin: 130px auto 50px auto;`;
  }}
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
  margin-right: 20px
margin-top: 6px
&:hover {
    cursor: pointer;
  }

   
  ${(props) =>
    props.active
      ? ` color:  ${({ theme }) => theme.primary};`
      : ` color: ` + props.theme.secondary + `;`};
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
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
  margin: 5px 0 0 5px;
  width: 100px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #9e9e9e;
  }
  :-ms-input-placeholder {
    color: #9e9e9e;
  }
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
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  color: #ffffff;
  font-size: 14px;
  padding: 10px 10px 0 10px;
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
      ? ` background-image:  url(${props.iconActive})`
      : `  background-image:  url(${props.iconInactive})`};
`;

const Spliter = styled.div`
  background-color: #515151;
  width: 1px;
  float: left;
  height: 14px;
  margin: 7px 0 10px 0;
`;

class CustomLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favGame: [],
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: GameTypeEnum.RNGSPORTS,
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

        this.getGameList(this.state.platform, this.state.type);
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

  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };

  handleJoinGameClick = (gpcode, gpid) => {
    if (this.props.token) {
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      this.props.history.push(`/sports/c/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token === null && category === 3) {
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

  getBookmarkIcon = (gpcode) => {
    switch (gpcode.toLowerCase()) {
      case "joker": {
        if (this.state.filterGame === SlotFilterType.Recommend)
          return `${SlotLikePNG}`;
        else return `${SlotBookmark2PNG}`;
      }
      default:
        return `${SlotBookmark2PNG}`;
    }
  };
  getBookmarkActiveIcon = (gpcode) => {
    switch (gpcode.toLowerCase()) {
      case "joker": {
        if (this.state.filterGame === SlotFilterType.Recommend)
          return `${SlotLikeActivePNG}`;
        else return `${SlotBookmark1PNG}`;
      }
      default:
        return `${SlotBookmark1PNG}`;
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
          return s.isactive === true;
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
      <Container
        style={{
          background: `url(${process.env.PUBLIC_URL}/assets/images/pcGamePage/sports/bg2.jpg) no-repeat center top, #E3E3E3`,
        }}
      >
        <InnerWrap type={this.state.type}>
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
                placeholder={i18n.t("slot.search")}
                onChange={this.handleKeywordChange}
              ></SearchFilterItemInput>
            </SearchFilterItemContainer>
          </GameSubFilterContainer>
          <GameListContainer>{list}</GameListContainer>
        </InnerWrap>
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
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomLibrary);
