import React from "react";
import { connect } from "react-redux";

import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { GameService } from "../../../api-services/services/GameService";
import Loading from "../Loading";
import Maintenance from "../../Share/Maintenance";
// const channel = new BroadcastChannel('refreshBalance');

class JoinLotteryGame extends React.Component {
  state = {
    loading: true,
    maintenance: false,
  };

  componentDidMount() {
    const brand = this.props.match.params.brand;
    GameService.GetGameList(brand, GameTypeEnum.LOTTERYLOBBY).then((e) => {
      if (e.IsSuccess) {
        if (e.data.length >= 1) {
          GameService.JoinGame(e.data[0].id, brand).then((response) => {
            if (response.IsSuccess) {
              // channel.postMessage({action: "refresh", target:"*"});
              this.setState({ ...this.state, maintenance: false });
              window.location.href = response.data.url;
            } else {
              this.handleJoinGameMaintenance(response);
            }
          });
        } else {
          this.handleJoinGameMaintenance();
        }
      } else {
        this.handleJoinGameMaintenance();
      }
    });
  }
  handleJoinGameMaintenance = (response) => {
    this.setState({ ...this.state, maintenance: true, loading: false });
  };
  render() {
    if (this.state.maintenance) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else {
      return <Loading show={this.state.loading} opacity={1}></Loading>;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinLotteryGame);
