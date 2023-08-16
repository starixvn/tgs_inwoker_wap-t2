import React from "react";
import styled from "styled-components";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";

import { withStyles } from "@material-ui/core/styles";
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
function Header(props) {
  const CustomAppBar = withStyles((theme) => ({
    root: {
      height: "90px",
      display: "block",
      backgroundColor: props.backgroundColor ? props.backgroundColor : "",
      backgroundImage: props.backgroundColor
        ? ""
        : "linear-gradient(to top, " +
          theme.palette.primary.mainGradient +
          ", " +
          theme.palette.primary.main +
          ")",
    },
  }))(AppBar);
  const Header = styled.div`
    height: 90px;
  `;
  const HeaderTitle = styled.div`
    float: left;
    color: #ffffff;
    font-weight: normal;
    font-size: 34px;
    text-align: center;

    margin-top: 20px;
    width: calc(100% - 80px - 80px);
  `;

  const HeaderBack = styled.div`
    float: left;
    background: url(${process.env.PUBLIC_URL +
      `/assets/images/wapp/btn-back-white.png`})
      no-repeat center;
    width: 80px;
    height: 90px;

    ${({ noBack }) => {
      return noBack && ` opacity: 0;`;
    }}
  `;
  const RightContentContainer = styled.div`
    float: right;
    width: 80px;
    overflow: visible;
  `;
  return (
    <Header>
      <ElevationScroll {...props}>
        <CustomAppBar position={props.position ? props.position : "fixed"}>
          <HeaderBack
            noBack={props.noBack}
            onClick={props.noBack ? "" : props.onBackClick}
          ></HeaderBack>
          <HeaderTitle>{props.title}</HeaderTitle>
          <RightContentContainer>{props.rightContent}</RightContentContainer>
        </CustomAppBar>
      </ElevationScroll>
    </Header>
  );
}
export default Header;
