import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import config from "../../config/config";
import LoadingGIF from "../../assets/images/loading.gif";

const Container = styled.div`
  width: 100%;

  top: 0;
  left: 0;
  position: absolute;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  z-index: 9;
  background-color: rgba(
    0,
    0,
    0,
    ${(props) => (props.opacity ? props.opacity : 0.8)}
  );
  ${(props) =>
    props.open ? "opacity:1;height: 100%;" : "opacity:0;height:0px;"};
`;
const Inner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LogoImg = styled.img`
  margin: 0 auto;
  width: 180px;
  display: block;
`;
const LogoImg2 = styled.img`
  margin: 0 auto;
  display: block;
`;
function Loading(props) {
  return (
    <Container open={props.show} opacity={props.opacity}>
      <Inner>
        <LogoImg src={props.general.brand && props.general.brand.loadingUrl} />
        <div className="clear"></div>
        <LogoImg2 src={LoadingGIF} />
      </Inner>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};
export default connect(mapStateToProps, null)(Loading);
