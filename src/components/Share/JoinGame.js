import React, { Component } from "react";

import Loading from "../App/Loading";
import { GameService } from "../../api-services/services/GameService";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import Maintenance from "./Maintenance";
// const channel = new BroadcastChannel('refreshBalance');
class JoinGame extends Component {
  state = {
    loading: true,
    maintenance: false,
  };
  componentDidMount() {
    const gameType = parseInt(this.props.match.params.type);

    const gameCode = this.props.match.params.params;
    if (gameType === GameTypeEnum.FISH) {
      GameService.JoinGame(this.props.match.params.params2, gameCode).then(
        (response) => {
          if (response.IsSuccess) {
            window.location.href = response.data.url;
          } else {
            this.handleJoinGameMaintenance(response);
          }
        }
      );
    } else if (
      gameType === GameTypeEnum.ARCADE ||
      gameType === GameTypeEnum.SLOT ||
      gameType === GameTypeEnum.TABLEGAME ||
      gameType === GameTypeEnum.RNGSPORTS
    ) {
      GameService.JoinGame(this.props.match.params.params2, gameCode).then(
        (response) => {
          if (response.IsSuccess) {
            // channel.postMessage({action: "refresh", target:"*"});
            window.location.href = response.data.url;
          } else {
            this.handleJoinGameMaintenance(response);
          }
        }
      );
    } else {
      GameService.JoinLobbyGame(gameType, gameCode).then((response) => {
        if (response.IsSuccess) {
          // channel.postMessage({action: "refresh", target:"*"});
          window.location.href = response.data.url;
        } else {
          this.handleJoinGameMaintenance(response);
        }
      });
    }

    // if (gameType === GameTypeEnum.LIVE) {
    //   let result = null;
    //   if (game === GameEnum.AG) {
    //     result = GameService.JoinAGLiveGame(token, gameId, returnUrl);
    //   } else if (game === GameEnum.BBIN) {
    //     result = GameService.JoinBBINLiveGame(token, gameId, returnUrl);
    //   } else if (game === GameEnum.DG) {
    //     result = GameService.JoinDGLiveGame(token, returnUrl);
    //   } else if (game === GameEnum.MG) {
    //     result = GameService.JoinMGLiveGame(token, returnUrl);
    //   } else if (game === GameEnum.GD) {
    //     result = GameService.JoinGDLiveGame(token, returnUrl);
    //   }
    //   result.then((response) => {
    //     if (response.IsSuccess) {
    //       window.location.href = response.url;
    //     } else {
    //       this.handleJoinGameMaintenance(response);
    //     }
    //   });
    // } else if (
    //   gameType == GameTypeEnum.SLOT ||
    //   gameType == GameTypeEnum.TIGERSLOT
    // ) {
    //   GameService.JoinGame(game, gameId).then((response) => {
    //     if (response.IsSuccess) {
    //       window.location.href = response.url;
    //     } else {
    //       this.handleJoinGameMaintenance(response);
    //     }
    //   });
    // } else if (gameType === GameTypeEnum.LOTTERY) {
    //   const result = GameService.JoinLotteryGame(token, game, returnUrl);
    //   result.then((response) => {
    //     if (response.IsSuccess) {
    //       window.location.href = response.url;
    //     } else {
    //       this.handleJoinGameMaintenance(response);
    //     }
    //   });
    // } else if (gameType === GameTypeEnum.QIPAI) {
    //   const result = GameService.JoinQipaiGame(token, game, gameId, returnUrl);
    //   result.then((response) => {
    //     if (response.IsSuccess) {
    //       window.location.href = response.url;
    //     } else {
    //       this.handleJoinGameMaintenance(response);
    //     }
    //   });
    // } else if (gameType === GameTypeEnum.SPORTS) {
    //   const result = GameService.JoinSportsbook(token, game, returnUrl);
    //   result.then((response) => {
    //     if (response.IsSuccess) {
    //       window.location.href = response.url;
    //     } else {
    //       this.handleJoinGameMaintenance(response);
    //     }
    //   });
    // }
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

export default JoinGame;
