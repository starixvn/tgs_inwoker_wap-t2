import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  height: 150px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomInput = styled.select`

  font-size: 28px;
  margin-top: 12px;
  font-weight: 500;
  border: 0;
  width: 100%;
  background-color: transparent;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;
  }
`;
class Select extends Component {
  render() {
    return (
      <CustomText style={{ ...this.props.style }}>
        <CustomLabel>{this.props.label}</CustomLabel>
        <CustomInput
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {this.props.default}
          {this.props.options}
        </CustomInput>
      </CustomText>
    );
  }
}

export default Select;
