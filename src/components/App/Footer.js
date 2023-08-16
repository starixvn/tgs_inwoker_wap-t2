import React, { useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Slider from "react-slick";

import i18n from "../../utils/i18n";
import config from "../../config/config";

const Container = styled.div`
  width: 100%;
  height: ${config.brand === "WGHK" ? `150px` : "240px"};
  background-color: #151515;
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;

const MiddleContainer = styled.div`
  height: ${config.brand === "WGHK" ? `80px` : "120px"};
  width: 100%;
  padding-top: ${config.brand === "WGHK" ? "10px" : "20px"};
  padding-bottom: ${config.brand === "WGHK" ? "10px" : "20px"};
  border-bottom: solid 1px #443f3b;
  border-top: solid 1px #443f3b;
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TheActualWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1280px;
`;

const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: ${config.brand === "WGHK" ? "6px" : "16px"};
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const BrandsImage = styled.div`
  opacity: 1;
  height: 80px;
  width: 175px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: contain;
`;

const ThirdPartyLogoHolder = styled.div`
  display: flex !important;
  justify-content: center;
  width: 175px;
`;

const WGHKFooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  color: #fff;
`;

const LogoHolder = styled.img`
  height: 50px;
`;
const settings = {
  className: "footer",
  dots: false,
  arrows: false,
  slidesToShow: 6,
  slidesToScroll: 6,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  cssEase: "linear",

  infinite: true,
};

function Footer(props) {
  const Default = () => {
    return (
      <Slider {...settings}>
        {(() => {
          return props.game.providerList
            .filter((gp) => {
              if (gp.abbreviation.includes("TCG")) {
                return gp.abbreviation === "TCG_SEA";
              } else {
                return gp;
              }
            })
            .map((item, index) => {
              return (
                <ThirdPartyLogoHolder>
                  <BrandsImage
                    img={
                      process.env.PUBLIC_URL +
                      `/assets/images/provider/${item.gpcode.toLowerCase()}.png`
                    }
                  />
                </ThirdPartyLogoHolder>
              );
            });
        })()}
      </Slider>
    );
  };

  const ImageHolder = ({ image }) => {
    return (
      <LogoHolder
        src={
          process.env.PUBLIC_URL +
          `/assets/images/pcHomePage/WGHK/footer/${image}.png`
        }
        alt={image}
      />
    );
  };

  const WGHKSetup = () => {
    return (
      <WGHKFooterContainer>
        <ImageHolder image="footer1" />
        <ImageHolder image="footer2" />
        <ImageHolder image="footer3" />
        <ImageHolder image="footer4" />
        <ImageHolder image="footer5" />
      </WGHKFooterContainer>
    );
  };

  const footerSwitcher = (brand) => {
    switch (brand) {
      case "WGHK":
        return <WGHKSetup />;
      default:
        return <Default />;
    }
  };
  const contRef = useRef();
  const bottomRef = useRef();
  return (
    <Container ref={contRef} hide={props.hide}>
      <MiddleContainer>
        <MiddleInnerWrap>
          <TheActualWrapper> {footerSwitcher(config.brand)}</TheActualWrapper>
        </MiddleInnerWrap>
      </MiddleContainer>
      {/* <HelperContainer>
        <HelperText>关于我们 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>联系我们 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>存款帮助 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>取款帮助 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>常见问题 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>规则与条款 </HelperText>
        <HelpIcon>|</HelpIcon>
        <HelperText>App 下载 </HelperText>
      </HelperContainer> */}
      <BottomContainer ref={bottomRef}>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(
              /{brand}/g,
              i18n.exists(`brand.${config.brand}.footer`)
                ? i18n.t(`brand.${config.brand}.footer`)
                : config.brand
            )}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
