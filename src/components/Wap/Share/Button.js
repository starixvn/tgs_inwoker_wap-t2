import React, { Component } from "react";
import styled from "styled-components";
const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);`}

  width: 690px;
  height: 93px;
  border-radius: 20px;
  border: solid 1px #ffffff;

  font-size: 34px;
  padding: 22px 0;
  color: #ffffff;
  text-align: center;
`;

class CustomButton extends Component {
  render() {
    return (
      <Content
        style={{ ...this.props.style }}
        onClick={this.props.disabled === true ? null : this.props.onClick}
        disabled={this.props.disabled ? this.props.disabled : false}
      >
        {this.props.label}
      </Content>
    );
  }
}
export default CustomButton;
