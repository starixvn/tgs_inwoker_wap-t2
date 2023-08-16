import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slick from "react-slick";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 600px;
`;

const ATag = styled.a`
  text-decoration: none;
`;
const Img = styled.img`
  border: none;
  width: 1920px;
  height: 600px;

  margin: 0 auto 0 -960px;
  position: relative;
  left: 50%;
`;

class Slider extends React.Component {
  render() {
    const settings = {
      dots: false,

      className: "center",
      centerMode: false,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 1,
      speed: 500,
      arrows: true,
      autoplay: true,
      lazyLoad: "progressive",
    };

    return (
      <Container>
        <Slick {...settings}>
          {(() => {
            return this.props.general.banner.map((item, index) => {
              return (
                <ATag
                  href={item.navurl}
                  key={index}
                  target="_blank"
                  alt={item.alt}
                >
                  <Img
                    src={item.desktopurl}
                    alt={item.alt}
                    title={item.alt}
                  ></Img>
                </ATag>
              );
            });
          })()}

          {/* {this.props.list.map((row, index) => {
            return (
              <ATag href={row.go_url} key={index}>
                <Img src={row.pc_file_url}></Img>
              </ATag>
            );
          })} */}
        </Slick>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, null)(Slider);
