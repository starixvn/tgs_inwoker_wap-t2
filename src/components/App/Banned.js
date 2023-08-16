import React, { Component } from "react";
import styled from "styled-components";
import { isMobileOnly } from "react-device-detect";
import BannedPNG from "../../assets/images/banned.jpg";

const Container = styled.div`
  width: 100%;
  background: url(${BannedPNG}) no-repeat center;
  background-size: cover;
  position: relative;
  height: calc(100vh - 160px);
`;

const BannedTextContainer = styled.div`
  position: absolute;
  left: 40%;
  top: 50%;
`;

const Text = styled.div`
  color: white;
  font-size: 24px;
  text-align: left;
  padding: 20px 0px;
  font-weight: bold;
`;

const Hyperlink = styled.span`
  cursor: pointer;
  :focus,
  :active,
  :hover {
    text-decoration: underline;
  }
`;
class Banned extends Component {
  componentDidMount() {
    if (isMobileOnly) {
      document
        .getElementById("viewport")
        .setAttribute("content", "width=750, user-scalable=no");
    }
  }

  render() {
    return (
      <Container style={isMobileOnly ? {} : { minHeight: "800px" }}>
        <BannedTextContainer>
          <Text>
            您的帐号已被封锁，
            <Hyperlink onClick={this.props.onhandleCSClick}>联系客服</Hyperlink>
            。
          </Text>

          <Text>
            Your account has been locked, please contact with{" "}
            <Hyperlink onClick={this.props.onhandleCSClick}>
              customer service
            </Hyperlink>
            .
          </Text>
        </BannedTextContainer>
      </Container>
    );
  }
}

export default Banned;
