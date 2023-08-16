import React from "react";
import styled, { keyframes } from "styled-components";

import RecImg1 from "../../../assets/images/rec-img1.png";
import RecImg2 from "../../../assets/images/rec-img2.png";
import RecImg3 from "../../../assets/images/rec-img3.png";
import RecImg4 from "../../../assets/images/rec-img4.png";
import RecImgBg from "../../../assets/images/rec-imgbase.png";
import ScrollAnimation from "react-animate-on-scroll";
import Common from "../../../utils/Common";
import i18n from "../../../utils/i18n";
export const floatKeyframe = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;
export default function Recommend(props) {
  const Container = styled.div`
    width: 100%;
    position: relative;
    z-index: 5;
    padding-top: 50px;
  `;
  const TitleContainer = styled.div`
    margin: 0 auto;
    min-width: 1280px;
    display: flex;
    justify-content: center;
  `;
  const Title = styled.img`
    height: 110px;
  `;
  const RecommendContainer = styled.div`
    margin: 0 auto;
    width: 1280px;
    height: 510px;
    padding-top: 40px;
  `;
  const RecommendRow = styled.div`
    overflow: visible;
  `;
  const RecommendColumn = styled.div`
    float: left;
    width: 50%;
    position: relative;
    height: 200px;
    overflow: visible;
  `;
  const RecommendBase = styled.img`
    width: 140px;
    position: absolute;
    left: 60px;
  `;
  const RecommendImg = styled.img`
    position: absolute;
    z-index: 5;
    animation: ${floatKeyframe} 4s linear 0s infinite;
  `;
  const RecommendTitle = styled.div`
    color: #8a7f73;
    font-size: ${(props)=> i18n.language === "ta-IN" ? "22px" : "30px"};
    font-weight: 600;
    position: absolute;
    left: 220px;
    min-height: 45px;
  `;
  const RecommendText = styled.div`
    color: #8a7f73;
    font-size: ${(props)=> i18n.language === "ta-IN" ? "12px" : "16px"};
    position: absolute;
    left: 220px;
    top: 60px;
    width: 410px;
  `;
  return (
    <Container>
      <TitleContainer>
        <Title
          src={
            process.env.PUBLIC_URL +
            `/assets/images/${Common.getLanguagePrefixFolder()}/service.png`
          }
        ></Title>
      </TitleContainer>
      <RecommendContainer>
        <RecommendRow>
          <RecommendColumn>
            <RecommendImg
              src={RecImg4}
              style={{ top: "-20px", left: "60px", width: "140px" }}
            ></RecommendImg>
            <RecommendBase src={RecImgBg}></RecommendBase>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={2}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <RecommendTitle>{i18n.t("services.depositTitle")}</RecommendTitle>
              <RecommendText>{i18n.t("services.deposit")}</RecommendText>
            </ScrollAnimation>
          </RecommendColumn>
          <RecommendColumn>
            <RecommendImg
              src={RecImg2}
              style={{ top: "-10px", left: "60px", width: "140px" }}
            ></RecommendImg>
            <RecommendBase src={RecImgBg}></RecommendBase>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={4}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <RecommendTitle>{i18n.t("services.oddsTitle")}</RecommendTitle>
              <RecommendText>{i18n.t("services.odds")}</RecommendText>
            </ScrollAnimation>
          </RecommendColumn>
        </RecommendRow>
        <RecommendRow>
          <RecommendColumn>
            <RecommendImg
              src={RecImg3}
              style={{ top: "0px", left: "70px", width: "130px" }}
            ></RecommendImg>
            <RecommendBase src={RecImgBg}></RecommendBase>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={6}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <RecommendTitle>
                {i18n.t("services.securityTitle")}
              </RecommendTitle>
              <RecommendText>{i18n.t("services.security")}</RecommendText>
            </ScrollAnimation>
          </RecommendColumn>
          <RecommendColumn>
            <RecommendImg
              src={RecImg1}
              style={{ top: "0px", left: "60px", width: "160px" }}
            ></RecommendImg>
            <RecommendBase src={RecImgBg}></RecommendBase>
            <ScrollAnimation
              animateIn="fadeInDown"
              duration={8}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <RecommendTitle>
                {i18n.t("services.platformTitle")}
              </RecommendTitle>
              <RecommendText>{i18n.t("services.platform")}</RecommendText>
            </ScrollAnimation>
          </RecommendColumn>
        </RecommendRow>
      </RecommendContainer>
    </Container>
  );
}
