import React, { Component } from "react";
import styled from "styled-components";
import config from "../../../config/config";
const CustomText = styled.div`
  width: 700px;
  height: 170px;

  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: ${(props) =>
    config.brand === "WGHK" && props.isCustomProfileStyle
      ? `30px`
      : config.brand === "WGHK"
      ? `26px`
      : `20px`};
  font-weight: 600;
  margin-left: 3px;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: ${({ theme }) => theme.secondary};
  font-size: ${(props) =>
    config.brand === "WGHK" && props.isCustomProfileStyle
      ? `28px`
      : config.brand === "WGHK"
      ? `24px`
      : `28px`};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `500`)};
  margin-top: 25px;
  border: 0;
  width: 100%;
  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: ${(props) =>
      config.brand === "WGHK" && props.isCustomProfileStyle
        ? `28px`
        : config.brand === "WGHK"
        ? `24px`
        : `28px`};
    font-weight: ${() => (config.brand === "WGHK" ? `400` : `500`)};
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText style={{ ...this.props.style }} onClick={this.props.onClick}>
        <LabelContainer>
          <CustomLabel isCustomProfileStyle={this.props.isCustomProfileStyle}>
            {this.props.label}
          </CustomLabel>
          {this.props.custom && <div>{this.props.custom}</div>}
        </LabelContainer>
        <CustomInput
          style={this.props.color ? { color: this.props.color } : {}}
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
          isCustomProfileStyle={this.props.isCustomProfileStyle}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
