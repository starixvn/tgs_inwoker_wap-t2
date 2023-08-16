import React, { useState } from "react";

import styled from "styled-components";

import { Collapse } from "@material-ui/core";
const moment = require("moment");
const CheckboxContainer = styled.div`
  float: left;
  width: 46px;
  height: 46px;
  margin: 56px 0 0 20px;

  ${(props) => (props.edit ? `display:block` : `display:none`)};
`;
const ContentContainer = styled.div`
  display: block;
  font-size: 28px;
  width: 90%;
`;

const ListItem = styled.div`
  width: 100%;
  margin: 20px auto;
  min-height: 155px;
`;
const MsgTitle = styled.div`
  color: #2e2426;
  width: 100%;
  font-weight: ${(props) => (props.isread === true ? "normal" : "600")};
  font-size: 30px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MsgTitleSpan = styled.span`
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const MsgDate = styled.div`
  color: #949494;

  float: left;
  margin-top: 15px;
  font-size: 28px;
`;

const ItemContainer = styled.div`
  float: right;
  width: ${(props) => (props.edit ? `648px` : `688px`)};
  min-height: 150px;
  border-radius: 12px;
  box-shadow: 0 4px 12px 0 rgba(58, 58, 58, 0.2);
  border: solid 2px #f3f3f3;
  background-color: #ffffff;
  padding: 30px 20px 0 35px;
  margin-right: 30px;
`;
const CheckboxCircle = styled.div`
  width: 46px;
  height: 46px;

  ${(props) =>
    props.checked
      ? `background: url(${
          process.env.PUBLIC_URL + `/assets/images/wapp/icon-inbox-checked.png`
        }) no-repeat;`
      : `border-radius: 23px;
    border: 2px solid #949494;`}
`;

const LetterContent = styled.div`
  font-size: 30px;
  padding: 20px 0px;
`;

const InboxList = ({
  index,
  row,
  edit,
  handleCheckboxClick,
  selected,
  handleItemClick,
}) => {
  const [opened, setOpened] = useState(false);

  const handleShowDetail = (index, isread) => {
    if (!opened && isread === false) handleItemClick(row.id);
    setOpened(!opened);
  };

  return (
    <ListItem>
      <CheckboxContainer edit={edit}>
        <CheckboxCircle
          onClick={() => handleCheckboxClick(row.id, row.id)}
          checked={selected.includes(row.id)}
        ></CheckboxCircle>
      </CheckboxContainer>
      <ItemContainer key={row.id} edit={edit}>
        <ContentContainer onClick={() => handleShowDetail(index, row.isread)}>
          <MsgTitle isread={row.isread}>
            <MsgTitleSpan>
              {row.localization !== null && row.localization.subject
                ? row.localization.subject
                : row.subject}
            </MsgTitleSpan>
          </MsgTitle>
          <MsgDate>{moment(row.createon).format("YYYY-MM-DD hh:mm a")}</MsgDate>
        </ContentContainer>{" "}
        <Collapse in={opened}>
          <LetterContent
            dangerouslySetInnerHTML={{
              __html:
                "<div style='width: 100%; height: 1px; background: #efefef;margin-top: 2px;'>123</div>" +
                  row.localization !==
                  null && row.localization.content
                  ? row.localization.content
                  : row.content,
            }}
          />
        </Collapse>
      </ItemContainer>
    </ListItem>
  );
};

export default InboxList;
