import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const BannedBg = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${process.env.PUBLIC_URL + `/assets/images/wapp/banned.jpg`})
    no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const CustomContainer = styled(Grid)`
  padding: 140px 0px 0px 0px;
`;
const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
`;

const Banned = (props) => {
  const csClick = () => {
    props.GetSupportUrl("", "", "");
  };
  return (
    <BannedBg>
      <CustomContainer
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Text>
          您的帐号已被封锁
          <br />
          <Hyperlink onClick={csClick}>請联系客服</Hyperlink>
        </Text>

        <Text>
          Your account has been locked, <br />
          please contact with{" "}
          <Hyperlink onClick={csClick}>customer service</Hyperlink>.
        </Text>
      </CustomContainer>
    </BannedBg>
  );
};

export default Banned;
