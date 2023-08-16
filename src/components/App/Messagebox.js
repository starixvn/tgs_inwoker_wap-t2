import React from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import LoginBGPNG from "../../assets/images/login-bg.png";
import IconCloseWhite from "../../assets/images/icon-close-white.png";

const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
})(Dialog);

const Container = styled.div`
  width: 420px;
  padding: 27px 32px;
  background: url(${LoginBGPNG});
  display: table;
  text-align: center;
`;
const CloseIconContainer = styled.div`
  background: url(${IconCloseWhite}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const Header = styled.div`
  width: 420px;
  height: 50px;
  background-color: #355460;
`;
const Headertitle = styled.div`
  text-align: center;
  margin-left: 50px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: #404040;
  width: 320px;
`;
function Messagebox(props) {
  return (
    <StyledDialog open={props.open} onClose={props.onhandleCloseDialog}>
      <Header>
        <Headertitle>{props.title}</Headertitle>
        <CloseIconContainer
          onClick={props.onhandleCloseDialog}
        ></CloseIconContainer>
      </Header>
      <Container>{props.message}</Container>
    </StyledDialog>
  );
}

export default Messagebox;
