import React, { useState } from "react";
import Maintenance from "../../../../Share/Maintenance";

import GameIFrame from "./iframe";
import { GameTypeEnum } from "../../../../../api-services/utils/Enum";

const ShowGame = ({ token }) => {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

  const sharedProps = {
    setMaintenance,
    setLoading,
  };
  return (
    <>
      {maintenance ? (
        <Maintenance isGameMaintenance={true} />
      ) : (
        <GameIFrame
          sharedprops={sharedProps}
          brand="WGFM"
          token={token}
          type={GameTypeEnum.SPORTS}
        />
      )}
    </>
  );
};

export default ShowGame;
