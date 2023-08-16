import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../api-services/services/GameService";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { gameAction } from "../../../api-services/actions/gameAction";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Dialog";
import Header from "../Share/Header";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "../../Wap/Share/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import config from "../../../config/config";
import { walletAction } from "../../../api-services/actions/walletAction";
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;

  background-size: contain;
`;

const ListView = styled.div`
  padding-top: 15px;
`;
const ListItem = styled.div`
  position: relative;
  float: left;

  margin: 10px 0 10px 20px;

  width: 345px;
  height: 415px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.secondary};
`;
const ListitemLabelBackground = styled.div`
  width: 345px;
  height: 76px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  position: absolute;
  bottom: 0;
  left: 0;
`;
const LeftContainer = styled.div`
  position: absolute;
  top: 310px;
  left: 20px;
`;
const GameProvider = styled.div`
  height: 40px;
  border-radius: 20px;
  background-image: linear-gradient(to bottom, #323534, #1a1e1f);
  text-align: center;
  color: #fff;
  font-size: 28px;
  display: inline-block;
  padding: 0 20px;
`;
const GameName = styled.div`
  color: #ffffff;
  font-size: 28px;
  margin-top: 6px;
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
`;

const StyleSearchIcon = styled(SearchIcon)`
  font-size: 60px;
  height: 50px;
  margin: 14px 20px 0 0;
  color: ${({ theme }) => theme.primaryText};
`;
const StyledModal = withStyles((theme) => ({
  root: {},
  paper: {
    fontSize: "28px",
    color: "#666666",
    padding: "30px 0 30px 20px",
    maxWidth: "750px",
    width: "750px",
    backgroundColor: "#404040",
    margin: 0,
    // padding: 0,
    position: "absolute",
    top: 0,
  },
}))(Modal);
const SearchContainer = styled.div``;
const SearchKeywordWrap = styled.div`
  width: 750px;
  height: 90px;
`;

const SearchInputBG = styled.div`
  width: 600px;
  height: 70px;
  border-radius: 12px;
  background-color: #ffffff;
  float: left;
  margin: 15px 5px 0 5px;
`;
const SearchCancelButton = styled.div`
  font-size: 30px;
  float: right;
  color: #d7d7d7;
  margin: 30px 0 0 0;
  width: 140px;
  text-align: center;
`;
const SearchInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  float: left;
  margin: 13px 18px;
  font-size: 30px;
  width: 485px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #d7d7d7;
    font-size: 30px;
    letter-spacing: 1px;
  }
  border: none;
`;
const SearchInputButton = styled(SearchIcon)`
  color: #192031;
  float: right;
  font-size: 60px !important;
  margin: 5px 15px 0 0;
`;

const FavButtonButton = styled.div`
  width: 20px;
  height: 20px;

  background: ${({ active }) => {
    return !active ? "white" : "red";
  }};
  -webkit-mask: url(${process.env
      .PUBLIC_URL}/assets/images/slotGame/icon-fav.png)
    no-repeat center / contain;
  background-size: 100%;
`;

const FavButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 0px;
  :hover {
    cursor: pointer;
  }
`;

class CustomSportPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: GameTypeEnum.RNGSPORTS,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
      keyword: "",
      category: 0,
      gameList: [],
      page: 1,
      count: 9999,
      filterGame: 0,
      showSearch: false,
      showSuggest: true,
      loading: false,
      favGame: [],
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
    this.getFav();
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.platform !== this.state.platform) {
      this.getGameList();
    }
  }
  getGameList(platform = this.state.platform, page = this.state.page) {
    this.setState({ ...this.state, loading: true });
    let result = null;

    result = GameService.GetGameList(platform, this.state.type);
    result.then((response) => {
      this.setState({ ...this.state, loading: false });
      if (response.IsSuccess) {
        var data = response.data;
        if (page === 1) {
          this.setState({
            ...this.state,
            gameList: data,
          });
        } else {
          this.setState({
            ...this.state,
            gameList: this.state.gameList.concat(data),
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
        });
      }
    });
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  handlePlatformChange = (platform) => {
    this.setState({ ...this.state, platform: platform });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  handleChangeKeyword = (e) => {
    this.setState({
      ...this.state,
      keyword: e.target.value,
    });
  };

  handleSearchClick = (e) => {
    this.setState({
      ...this.state,
      showSearch: true,
    });
  };
  handleCloseSearch = (e) => {
    this.setState({ ...this.state, showSearch: false });
  };
  handleResetSearch = (e) => {
    this.setState({
      ...this.state,
      showSearch: false,
      showSuggest: true,
      keyword: "",
    });
  };

  handleGameClick = (gpcode, gpid) => {
    if (this.props.token) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;

      Common.closePreviousPopup();
      // this.performBalanceRefresh();
      Common.PopupCenter(
        `/${i18n.language}/joingame/${this.state.type}/${gpcode}/${gpid}`,
        "gamewindow"
      );
    } else {
      this.props.history.push(`/${i18n.language}/}`);
    }
  };
  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, filterGame: newValue, page: 1 });
  };

  handleToggleFavorite = (match, id, match2) => {
    if (match) {
      this.props.removeFavoriteGame(id).then(() => {
        var array = [...this.state.favGame];
        var index = array.indexOf(id);
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({ ...this.state, favGame: array });
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
  };

  performBalanceRefresh = () => {
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter(
        (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
      )
      .map((a) => this.props.getGameBalance(a.gpcode));
  };

  render() {
    if (!this.props.game.homePageGameList) {
      return <React.Fragment></React.Fragment>;
    } else
      return (
        <Container>
          <Header
            fixedColor={config.brand === "GMO"}
            token={this.props.token}
            balance={this.props.balance}
            onBackClick={this.handleBackClick}
            title={i18n.t("common.sports")}
            rightContent={
              <StyleSearchIcon
                style={{ fontSize: "60px" }}
                onClick={this.handleSearchClick}
              />
            }
          ></Header>
          <ListView>
            {this.state.gameList
              .filter((a) => {
                if (this.state.filterGame === SlotFilterType.All) return true;
                else {
                  if (this.state.filterGame === SlotFilterType.Hot) {
                    return a.tag.hot === true;
                  } else if (this.state.filterGame === SlotFilterType.New) {
                    return a.tag.new === true;
                  } else if (
                    this.state.filterGame === SlotFilterType.Recommend
                  ) {
                    return a.tag.recommend === true;
                  } else if (this.state.filterGame === "fav") {
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
              .map((row) => {
                const match = this.state.favGame.indexOf(row.id) > -1;
                const index = this.state.favGame.indexOf(row.id);

                var theName;
                this.props.game.providerList.filter((a) => {
                  if (a.abbreviation === row.gpcode) {
                    return (theName = a.name);
                  }
                  return theName;
                });

                return (
                  <ListItem key={row.id}>
                    <LazyLoadImage
                      width={344}
                      alt={""}
                      effect="blur"
                      src={`${
                        config.sourceUrl
                      }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                        row.code
                      }.jpg`}
                      style={{
                        borderRadius: "20px 20px 0 0",
                      }}
                      onClick={() => {
                        this.handleGameClick(row.gpcode, row.id);
                      }}
                    />
                    <ListitemLabelBackground></ListitemLabelBackground>
                    <LeftContainer>
                      <GameProvider>{theName}</GameProvider>
                      <GameName
                        onClick={() => {
                          this.handleGameClick(row.gpcode, row.id);
                        }}
                      >
                        {row.name}
                      </GameName>
                    </LeftContainer>

                    <FavButton
                      onClick={() => {
                        this.handleToggleFavorite(match, row.id, index);
                      }}
                    >
                      <FavButtonButton
                        active={match === true}
                      ></FavButtonButton>
                    </FavButton>
                  </ListItem>
                );
              })}
          </ListView>
          <StyledModal
            open={this.state.showSearch}
            onClose={this.handleCloseSearch}
          >
            <SearchContainer>
              <SearchKeywordWrap>
                <SearchInputBG>
                  <SearchInput
                    placeholder={i18n.t("slot.search")}
                    type={"text"}
                    onChange={this.handleChangeKeyword}
                    value={this.state.keyword}
                  ></SearchInput>
                  <SearchInputButton
                    onClick={this.handleCloseSearch}
                  ></SearchInputButton>
                </SearchInputBG>
                <SearchCancelButton onClick={this.handleResetSearch}>
                  {i18n.t("common.cancel")}
                </SearchCancelButton>
              </SearchKeywordWrap>
            </SearchContainer>
          </StyledModal>
          <Loading show={this.state.loading}></Loading>
        </Container>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
  };
};

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    game: state.game,
    balance: state.account.info.member_balance,
    token: state.account.token,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomSportPage));
