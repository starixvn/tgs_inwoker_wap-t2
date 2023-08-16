import React, { Component } from "react";

import styled from "styled-components";
const Content = styled.div`
  width: 680px;
  margin: 0 auto;
  font-size: 25px;
  color: #a0a0a0;
  text-align: center;
  margin-top: 20px;
`;
const StepContainer = styled.div`
  width: 50%;
  float: left;
`;
const StepCircle = styled.div`
  color: ${(props) => (props.active ? props.theme.primary : "#c3c3c3")};
  font-size: 24px;
  font-weight: 600;
  text-align: center;

  border-radius: 50%;
  padding-top: 3px;
`;
const StepLine = styled.div`
  height: 8px;
  background-color: ${(props) =>
    props.active ? props.theme.primary : "#c3c3c3"};
  ${(props) => (props.isfirst ? `border-radius:4px 0 0 4px;` : "")};
  ${(props) => (props.islast ? `border-radius:0 4px 4px 0;` : "")};
  margin-top: 14px;
`;
const StepLabel = styled.div`
  font-size: 26px;
  color: ${(props) => (props.active ? props.theme.primary : "#c3c3c3")};
  text-align: center;
  margin-top: 8px;
  width: 100%;
  font-weight: 600;
`;
class Step extends Component {
  render() {
    return (
      <Content>
        {this.props.steps.map((row, index) => {
          return (
            <StepContainer key={index}>
              <StepCircle active={index + 1 <= this.props.currentStep}>
                STEP {index + 1}
              </StepCircle>
              <StepLine
                active={index + 1 <= this.props.currentStep}
                isfirst={index === 0}
                islast={index === this.props.steps.length - 1}
              ></StepLine>
              <StepLabel active={index + 1 <= this.props.currentStep}>
                {row.label}
              </StepLabel>
            </StepContainer>
          );
        })}
      </Content>
    );
  }
}
export default Step;
