import React from "react";
import styled from "styled-components";

function CustomButton(props) {
  const StyleButton = styled.div`
    width: ${props.width ? props.width : "347"}px;
    height: ${props.small ? "32" : "46"}px;
    border: solid 1px #ffffff;
    margin-top: ${props.marginTop ? props.marginTop : "30"}px;
    background-image: linear-gradient(to top, #f0ca83, #f0ca83);
    ${props.grayMode
      ? " background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : ""}

    border-radius: 6px;
    font-size: ${props.small ? "14" : "16"}px;
    color: #fff;
    ${props.float ? "float: " + props.float + ";" : " float: left;"}
    ${props.marginLeft ? "margin-left: " + props.marginLeft + "px;" : ""}
    ${props.marginRight ? "margin-right: " + props.marginRight + "px;" : ""}
    ${props.disabled === true
      ? `pointer-events:none;`
      : `
    &:hover {
      cursor: pointer;
      box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);
      ${
        props.grayMode
          ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
          : " "
      }
    }
    `}
  `;
  const ButtonLabel = styled.span`
    text-align: center;
    display: block;
    margin-top: ${props.small ? "5" : "10"}px;
  `;
  return (
    <StyleButton onClick={props.handleClick}>
      <ButtonLabel>{props.name}</ButtonLabel>
    </StyleButton>
  );
}
export default CustomButton;
