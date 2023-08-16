import React, { Component } from "react";

import Loading from "../App/Loading";
import { GameService } from "../../api-services/services/GameService";
import { isMobileOnly } from "react-device-detect";
import Maintenance from "./Maintenance";
import MaintenanceMobile from "./MaintenanceMobile";
// const channel = new BroadcastChannel('refreshBalance');

class JoinLobbyGame extends Component {
  state = {
    loading: true,
    maintenance: false,
  };
  componentDidMount() {
    if (isMobileOnly) {
      document
        .getElementById("viewport")
        .setAttribute("content", "width=750, user-scalable=no");
    }
    const gameType = this.props.match.params.type;

    const gameCode = this.props.match.params.params.trim();
    const replaceUrl = (this.props.match.params.replaceUrl ?? "false").trim();

    if (gameCode === "BC") {
      GameService.JoinBetConstruct(gameType, gameCode).then((response) => {
        if (response.data !== undefined) {
          // channel.postMessage({action: "refresh", target:"*"});
          document.write(
            "<style>body{margin:0;padding:0}</style>" + response.data
          );
        } else {
          this.handleJoinGameMaintenance(response);
        }
      });
    } else {
      GameService.JoinLobbyGame(gameType, gameCode).then((response) => {
        if (response.IsSuccess) {
          // channel.postMessage({action: "refresh", target:"*"});
          if (replaceUrl === "true") {
            let arr = document.domain.split(".");
            let host = arr[arr.length - 2] + "." + arr[arr.length - 1];
            var currentDomain = host;

            var url =
              (response.data.url.indexOf("http") <= -1 ? "https:" : "") +
              response.data.url;
            var getExistingParam = url.split("/")[3];

            window.location.href =
              "https://" +
              (isMobileOnly ? "m" : "w") +
              "." +
              currentDomain +
              "/" +
              getExistingParam;
            }else{
              window.location.href = response.data.url;
            }
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
      if (isMobileOnly) {
        return <MaintenanceMobile isGameMaintenance={true}></MaintenanceMobile>;
      } else {
        return <Maintenance isGameMaintenance={true}></Maintenance>;
      }
    } else {
      return (
        <React.Fragment>
          <Loading show={this.state.loading} opacity={1}></Loading>
        </React.Fragment>
      );
    }
  }
}

export default JoinLobbyGame;
