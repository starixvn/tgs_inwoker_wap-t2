import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  margin: 0 auto;

  text-align: center;

  padding-top: 22px;
  font-size: 34px;

  color: #ffffff;
  width: 637px;
  height: 93px;
  border-radius: 20px;
  border: solid 1px #ffffff;
  background-color: #c7a87c;
  box-shadow: 0px 2px 5px 3px rgba(177, 177, 177, 1);
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
