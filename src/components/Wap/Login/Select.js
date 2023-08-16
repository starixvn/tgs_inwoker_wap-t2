import React, { Component } from "react";
import styled from "styled-components";
import config from "../../../config/config";
const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;
  border: solid 1px #676666;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
`;

const InputTextBox = styled.input`
  width: 300px;
  color: #000;
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 0;

  margin: 20px 10px;
  &::-webkit-input-placeholder {
    color: #b7b7b7;
    font-size: 23px;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #b7b7b7;
  }
`;
const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: #000;
  font-size: 30px;
`;
const TextContainer = styled.div`
  float: right;
  width: 100%;
  height: 100%;
`;

class Select extends Component {
  render() {
    return (
      <React.Fragment>
        <Container
          style={{
            margin: this.props.leaveGap
              ? "20px 0px 20px 57px"
              : "20px 0px 0px 57px",
            width: "180px",
            float: "left",
            padding: "10px",
          }}
        >
          <SelectContainer
            value={this.props.selectValue}
            onChange={this.props.onSelectChange}
          >
            <option value={config.features.PhonePrefix}>
              {config.features.PhonePrefix}
            </option>
          </SelectContainer>
        </Container>

        <Container
          style={{
            margin: " 20px 57px 0px 0",
            width: "445px",
            float: "right",
          }}
        >
          <TextContainer>
            <InputTextBox
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange}
              maxLength={this.props.maxLength}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled === true ? true : false}
            />
          </TextContainer>
        </Container>
      </React.Fragment>
    );
  }
}
export default Select;
// export default function TextBox(props) {
//   const Container = styled.div`
//     width: 520px
//     height: 90px;
//     background-color:rgba(255,255,255,0.2);
//     margin:0 auto;
//     border-radius: 50px;
// `;
//   const LeftIcon = styled.div`
//     width: 40px;
//     height: 60px;
//     background: url(${props.param.isPassword == true
//         ? PasswordIconPNG
//         : UsernameIconPNG})
//       no-repeat;
//     margin: 25px 0 0 35px;
//     display: inline-block;
//     float: left;
//   `;
//   const TextSpan = styled.span`
//     font-size: 24px;
//     color: rgba(255, 255, 255, 0.5);
//     margin: 10px 0 0 20px;
//     display: inline-block;
//     float: left;
//     width: 290px;
//   `;
//   const RightIcon = styled.div`
//     width: 40px;
//     height: 60px;
//     background: url(${ClearTextPNG}) no-repeat;
//     margin: 25px 35px 0 0;
//     display: inline-block;
//     float: right;
//   `;
//   const TextBox = styled.input`
//     width: 280px;
//     height: 42px;
//     margin-left: 20px;
//     font-size: 24px;
//     float: left;
//     background: none;
//     border: none;
//     color: #fff;
//   `;
//   const handleRightIconClick = e => {
//     const isMasked = !this.state.isMasked;
//     const newValue = isMasked
//       ? Array(this.state.oriValue.length).join("*")
//       : this.state.oriValue;
//     this.setState({
//       ...this.state,
//       isMasked: isMasked
//     });
//     this.setState({
//       ...this.state,
//       formatedValue: newValue
//     });
//   };
//   let state = {
//     password: ""
//   };
//   const handleChange = e => {};
//   return (
//     <Container style={props.param.css}>
//       <LeftIcon></LeftIcon>
//       <RightIcon onClick={handleRightIconClick}></RightIcon>
//       <TextSpan>{props.param.text}</TextSpan>
//       <PasswordMask
//         id="password"
//         name="password"
//         placeholder="Enter password"
//         value={state.password}
//         onChange={handleChange.bind(this)}
//       />
//       ;
//     </Container>
//   );
// }
