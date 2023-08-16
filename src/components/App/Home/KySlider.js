import React from "react";
import styled from "styled-components";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import KyHotGame1PNG from "../../../assets/images/ky-hotgame1.png";
import KyHotGame2PNG from "../../../assets/images/ky-hotgame2.png";
import KyHotGame3PNG from "../../../assets/images/ky-hotgame3.png";
import KyHotGame4PNG from "../../../assets/images/ky-hotgame4.png";
import { GameEnum, GameTypeEnum } from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";
export default function KySlider(props) {
  const KYHotGameTitle = styled.div`
    width: 100%;
    height: 200px;
    background-color: #f9f9f9;
    height: 60px;
    border-bottom: 5px solid #8a7f73;
    font-family: Roboto;
    font-size: 30px;
    font-weight: 600;
    color: #8a7f73;
    line-height: 55px;
    text-align: center;
    margin-top: 300px;
  `;

  const KyGameContainer = styled.div`
    float: left;
    width: 195px;
    height: 300px;
    overflow: visible;
    background: url(${(props) => props.img}) no-repeat;
    background-position: center bottom;
    &:hover {
      cursor: pointer;
    }
    &:hover ${KYHotGameTitle} {
      border-bottom: 5px solid #f0ca83;
      color: #f0ca83;
    }
  `;

  return (
    <>
      <KyGameContainer
        onClick={() =>
          props.handleJoinGameClick(
            GameTypeEnum.QIPAILOBBY,
            "",
            GameEnum.KY,
            "/joingame/" + GameTypeEnum.QIPAILOBBY + "/" + GameEnum.KY
          )
        }
        img={KyHotGame1PNG}
      >
        <KYHotGameTitle>{i18n.t("KY.BankerNiuNiu")}</KYHotGameTitle>
      </KyGameContainer>

      <KyGameContainer
        style={{ marginTop: "80px" }}
        onClick={() =>
          props.handleJoinGameClick(
            GameTypeEnum.QIPAILOBBY,
            "",
            GameEnum.KY,
            "/joingame/" + GameTypeEnum.QIPAILOBBY + "/" + GameEnum.KY
          )
        }
        img={KyHotGame3PNG}
      >
        <KYHotGameTitle>{i18n.t("KY.The21Point")}</KYHotGameTitle>
      </KyGameContainer>
      <KyGameContainer
        onClick={() =>
          props.handleJoinGameClick(
            GameTypeEnum.QIPAILOBBY,
            "",
            GameEnum.KY,
            "/joingame/" + GameTypeEnum.QIPAILOBBY + "/" + GameEnum.KY
          )
        }
        img={KyHotGame2PNG}
      >
        <KYHotGameTitle>{i18n.t("KY.SanGong")}</KYHotGameTitle>
      </KyGameContainer>
      <KyGameContainer
        style={{ marginTop: "80px" }}
        onClick={() =>
          props.handleJoinGameClick(
            GameTypeEnum.QIPAILOBBY,
            "",
            GameEnum.KY,
            "/joingame/" + GameTypeEnum.QIPAILOBBY + "/" + GameEnum.KY
          )
        }
        img={KyHotGame4PNG}
      >
        <KYHotGameTitle>{i18n.t("KY.GoldenFlower")}</KYHotGameTitle>
      </KyGameContainer>
    </>
  );
}
