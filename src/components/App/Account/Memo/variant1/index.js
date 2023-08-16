import React from "react";
import styled from "styled-components";

import IconInboxRedPNG from "../../../../../assets/images/icon-inbox.png";
import i18n from "../../../../../utils/i18n";
import { useState } from "react";
import Compose from "./tab-compose";
import Inbox from "./tab-inbox";
import Sent from "./tab-sent";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  min-height: 611px;     font-size: 14px;
  background-color: #fff;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const InnerWrap = styled.div`
  width: 935px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#f7f7f7;";
  }}

  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Tab = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
`;

export const TabContentTitle = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
`;
const TabsButton = styled.div`
  padding: 10px 20px;
  ${({ selected }) => {
    return selected ? "background-color: #fff" : "background-color: #f7f7f7";
  }}
  cursor: pointer;
  user-select: none;
`;

export const TabsContent = styled.div`
  padding: 15px 25px;
  background: #fff;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconInboxRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;

const MemoVariant1 = ({
  sent,
  memo,
  getMemoV2,
  deliveryBox,
  readMemo,
  performComposeMemo,
  performReplyMemo,
}) => {
  const [selected, setSelected] = useState("compose");

  const tabContentSwitcher = (text) => {
    switch (text) {
      case "compose":
        return <Compose composeMemo={performComposeMemo} />;
      case "memoinbox":
        return (
          <Inbox
            readMemo={readMemo}
            memo={memo}
            getmemo={getMemoV2}
            performReplyMemo={performReplyMemo}
          />
        );
      case "sent":
        return <Sent sent={sent} action={deliveryBox} />;
      default:
        return <Compose />;
    }
  };

  const Tabs = ({ icon, text }) => {
    return (
      <TabsButton
        selected={selected === text}
        onClick={() => {
          setSelected(text);
        }}
      >
        <div>{icon}</div>
        <div>{i18n.t(text)}</div>
      </TabsButton>
    );
  };

  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        {i18n.t("inbox.title")}
      </Title>
      <InnerWrap>
        <div style={{ width: "inherit" }}>
          <Tab>
            <Tabs text="compose" />
            <Tabs text="memoinbox" />
            <Tabs text="sent" />
          </Tab>
          {tabContentSwitcher(selected)}
        </div>
      </InnerWrap>
    </Container>
  );
};

export default MemoVariant1;
