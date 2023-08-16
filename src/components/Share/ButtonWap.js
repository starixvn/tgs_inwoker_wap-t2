import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  width: 637px;
  height: 94px;
  border-radius: 8px;

  border: solid 1px #ffffff;
  ${(props) =>
    props.styledtype === "2"
      ? "background-color: #404040;"
      : "background-image: linear-gradient(to top, " +
        props.theme.primaryGradient +
        ", " +
        props.theme.primary +
        ");"}

  margin:0 auto;
  font-size: 34px;

  color: #ffffff;

  padding-top: 20px;
  text-align: center;
`;

class ButtonWap extends Component {
  render() {
    return (
      <StyleButton onClick={this.props.onClick} {...this.props}>
        {this.props.name}
      </StyleButton>
    );
  }
}
export default ButtonWap;
