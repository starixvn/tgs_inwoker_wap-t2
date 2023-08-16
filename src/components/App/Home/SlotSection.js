import React from "react";
import styled from "styled-components";

import BGimage from "../../../assets/images/slot-bg.png";
import HomeSportSabaPNG from "../../../assets/images/home-sport-saba.png";
import HomeSportSboPNG from "../../../assets/images/home-sport-sbo.png";
import HomeSportImesPNG from "../../../assets/images/home-sport-imes.png";
import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
import { GameEnum } from "../../../api-services/utils/Enum";
import config from "../../../config/config";
export default function SlotSection(props) {
  const Container = styled.div`
    width: 100%;
    height: 500px;
    overflow: visible;
    position: relative;
    z-index: 6;
  `;
  const TitleContainer = styled.div`
    margin: 0 auto;
    width: 1280px;
    display: flex;
    position: relative;
    height: 500px;
    overflow: visible;
    z-index: 5;
  `;
  const SlotImageBg = styled.img`
    width: 1280px;
    position: absolute;
  `;
  const Title = styled.img`
    width: 250px;
    position: absolute;
    z-index: 4;
    top: 200px;
    left: 365px;
  `;
  const SlotText = styled.div`
    width: 880px;
    position: absolute;
    z-index: 4;
    top: 285px;
    left: 365px;
    color: #fff;
    font-size: 16px;
  `;
  const SlotGameContainer = styled.div`
    width: 880px;
    position: absolute;
    z-index: 4;
    top: 360px;
    left: 365px;
    color: #fff;
    font-size: 16px;
    overflow: visible;
  `;
  const GameIcon = styled.img`
    width: 150px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    transition: transform 0.5s ease-in;
    &:hover {
      transform: scale(1.2);
      transform-origin: center;
      cursor: pointer;
    }
  `;

  const GameBrand = [
    {
      gameCode: GameEnum.SBO,
      image: HomeSportSboPNG,
    },
    {
      gameCode: GameEnum.Sabah,
      image: HomeSportSabaPNG,
    },
    {
      gameCode: GameEnum.IMES,
      image: HomeSportImesPNG,
    },
  ];

  var checkAgain = GameBrand.filter((a) =>
    props.containESport.some((b) => a.gameCode === b.abbreviation)
  );

  return (
    <Container>
      <TitleContainer>
        <Title
          src={
            process.env.PUBLIC_URL +
            `/assets/images/${Common.getLanguagePrefixFolder()}/e-sports.png`
          }
        ></Title>

        <SlotImageBg src={BGimage}></SlotImageBg>
        <SlotText>
          {i18n
            .t("esports.bunnydesc")
            .replace(
              "{brand}",
              (config.brandName || config.brand) === "KING8"
                ? "Game of King"
                : config.brandName || config.brand
            )}
        </SlotText>
        <SlotGameContainer>
          {checkAgain.map((data, index) => {
            return (
              <ScrollAnimation
                animateIn="fadeInDown"
                duration={6}
                animateOnce={true}
                style={{ overflow: "visible" }}
                key={index}
              >
                <GameIcon src={data.image}></GameIcon>
              </ScrollAnimation>
            );
          })}
        </SlotGameContainer>
      </TitleContainer>
    </Container>
  );
}
