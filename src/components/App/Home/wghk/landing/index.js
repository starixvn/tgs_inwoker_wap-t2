import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import Common from "../../../../../utils/Common";
import { GameTypeEnum } from "../../../../../api-services/utils/Enum";
const WGHKBackgorund = styled.div`
  display: flex;
  background: url(${process.env.PUBLIC_URL +
  "/assets/images/pcHomePage/WGHK/background.png"});
  background-position: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const TheButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20%;
  width: 100vw;
`;

const TheButton = styled.div`
  padding: 15px 45px;
  font-size: 24px;
  border-radius: 10px;
  color: #fff;
  background: #ff9900;
  cursor: pointer;
  user-select: none;
  letter-spacing: 5px
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Landing = ({ showLogin, token }) => {
  return (
    <WGHKBackgorund>
      <TheButtonContainer>
        <TheButton
          onClick={() => {
            if (token) {
              Common.closePreviousPopup();
              Common.PopupCenter(
                "/joinlobbygame/" + GameTypeEnum.SPORTS + "/WGFM/true",
                "gamewindow"
              );
            } else {
              showLogin(true);
            }
          }}
        >
          {token ? i18n.t("common.startGame") : i18n.t("WGHK.loginRegister")}
        </TheButton>
      </TheButtonContainer>
    </WGHKBackgorund>
  );
};

export default Landing;
