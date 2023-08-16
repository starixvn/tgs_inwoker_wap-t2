import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  height: 170px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgb(58 58 58 / 20%);
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const CustomInput = styled.input`
  font-size: 28px;
  margin-top: 12px;
  border: 0;
  border-radius: 16px;
  color: #313131;
  padding: 16px 30px 16px 0px;
  position: relative;
  display: flex;
  flex: 1;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
`;
const Button = styled.div`
  font-size: 23px;
  position: absolute;
  text-align: center;
  color: #fefeff;
  float: right;
  padding: 8px 8px 0 8px;
  margin-top: 24px;
  top: 10%;
  right: 16px;
  height: 47px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary};
`;

const TextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText
      // style={{ ...this.props.style }}
      >
        <CustomLabel>{this.props.label}</CustomLabel>
        <TextFieldWrapper>
          <CustomInput
            type={this.props.type ? this.props.type : "text"}
            value={this.props.value}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled ? this.props.disabled : false}
            onChange={this.props.onChange}
            maxLength={this.props.maxLength ? this.props.maxLength : 50}
          ></CustomInput>
          <Button onClick={this.props.onClick}>{this.props.buttonlabel}</Button>
        </TextFieldWrapper>
      </CustomText>
    );
  }
}

export default Textbox;
