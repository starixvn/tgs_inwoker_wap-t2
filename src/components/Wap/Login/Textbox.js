import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;
  border: solid 1px #676666;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
`;

const TextSpan = styled.span`
  margin: 22px 0 0 35px;
  width: 56px;
  height: 38px;
  float: left;

  background: url(${(props) => props.icon}) no-repeat;
  background-size: contain;
`;

const InputTextBox = styled.input`
  width: 410px;
  color: ${({ theme }) => theme.secondary};
  font-size: 30px;
  float: left;
  background: none;
  border: none;
  padding-left: 0;

  margin-top: 20px;
  &::-webkit-input-placeholder {
    color: #b7b7b7;
    font-size: 23px;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: #b7b7b7;
  }
`;
const TextContainer = styled.div`
  float: left;
  width: 550px;
  height: 100%;
`;

const RightIcon = styled.div`
  width: 40px;
  height: 60px;
  background: url(${(props) =>
      props.password === true
        ? props.hidden
          ? process.env.PUBLIC_URL + `/assets/images/wapp/hide-password.png`
          : process.env.PUBLIC_URL + `/assets/images/wapp/show-password.png`
        : ""})
    no-repeat;
  background-size: contain;
  margin: 25px 25px 0 0;
  display: inline-block;
  float: left;
`;
class TextBox extends Component {
  render() {
    return (
      <Container style={{ ...this.props.style }}>
        <TextContainer>
          <TextSpan icon={this.props.icon}></TextSpan>
          <InputTextBox
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange}
            maxLength={this.props.maxLength}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled === true ? true : false}
          />
        </TextContainer>
        <RightIcon
          onClick={this.props.toggleShow}
          password={this.props.password}
          hidden={this.props.hidePassword}
        ></RightIcon>
      </Container>
    );
  }
}
export default TextBox;
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
