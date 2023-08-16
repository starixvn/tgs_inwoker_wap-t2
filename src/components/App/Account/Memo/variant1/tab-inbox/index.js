import React from "react";
import { TabContentTitle, TabsContent } from "..";

import styled from "styled-components";
import moment from "moment";
import Modal from "../modal";
import { useState } from "react";
import i18n from "../../../../../../utils/i18n";

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;

  background-color: #fff;
  text-align: left;

  tr {
    border-bottom: 1px solid #eaeaea;
  }

  thead {
    tr {
      th {
        padding: 5px 10px;
        &:last-child {
          text-align: right;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 5px 10px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 4px;
  color: #fff;
  border-radius: 6px;
  border: solid 1px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

const CustomTableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const ContentWrapper = styled.div``;

const Content = styled.div`
  padding: 20px;
`;

const UpperSection = styled.div`
  padding: 20px;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr;
  padding-bottom: 10px;
`;

const CustomTextArea = styled.textarea`
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;
`;

const CustomButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
`;

const CustomTextfield = styled.input`
  outline: none;
  padding: 5px 10px;

  ::placeholder {
    color: #eaeaea;
  }
`;

const Inbox = ({ memo, getmemo, performReplyMemo, readMemo }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const [memoSubject, setMemoSubject] = useState("");
  const [memoContent, setMemoContent] = useState("");

  const performCloseModal = () => {
    setOpen(false);
    setReplyModal(false);
    //reset form
    setMemoSubject("");
    setMemoContent("");
  };

  const performReadInbox = (id) => {
    getmemo(id).then((res) => {
      if (res.IsSuccess) {
        readMemo(id);
        setContent(res.data);
        setOpen(true);
      }
    });
  };

  const dateTimeFormatter = (date) => {
    const today = moment();
    const diffInDays = today.diff(date, "days");
    return moment(date).format("YYYY/MM/DD") + " - " + diffInDays + " days ago";
  };

  const [replyModal, setReplyModal] = useState(false);
  const [replyId, setReplyId] = useState("");

  const performReplyClickAction = (item) => {
    setReplyModal(true);
    setMemoSubject("Re: " + item.subject);
    setReplyId(item.id);
  };

  return (
    <>
      <TabContentTitle>{i18n.t("memo")}</TabContentTitle>
      <TabsContent>
        <CustomTable>
          <thead>
            <tr>
              <th>{i18n.t("number")}</th>
              <th>{i18n.t("date")}</th>
              <th style={{ width: "60%" }}>{i18n.t("subject")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {memo.items &&
              memo.items.map((item, index) => {
                return (
                  <CustomTableRow key={index}>
                    <td>{index + 1}</td>
                    <td>{moment(item.sentOn).format("D MMMM YYYY HH:mm")}</td>
                    <td
                      onClick={() => {
                        performReadInbox(item.id);
                      }}
                    >
                      {item.subject}
                    </td>
                    <td>
                      <ContentButton
                        onClick={() => {
                          performReplyClickAction(item);
                        }}
                      >
                        {i18n.t("reply")}
                      </ContentButton>
                    </td>
                  </CustomTableRow>
                );
              })}
          </tbody>
        </CustomTable>
      </TabsContent>
      <Modal open={open} handleClose={performCloseModal}>
        <ContentWrapper>
          <UpperSection>
            <Title>{content.subject}</Title>
            <div>
              {content.sender} - {dateTimeFormatter(content.sentOn)}
            </div>
          </UpperSection>

          <Content>{content.content}</Content>
        </ContentWrapper>
      </Modal>

      <Modal open={replyModal} handleClose={performCloseModal}>
        <Content>
          <InputRow>
            <div>{i18n.t("subject")}</div>
            <div>
              <CustomTextfield
                value={memoSubject}
                disabled
                onChange={(e) => {
                  setMemoSubject(e.target.value);
                }}
              />
            </div>
          </InputRow>
          <InputRow>
            <div>{i18n.t("memo")}</div>
            <div>
              <CustomTextArea
                rows="7"
                cols="50"
                value={memoContent}
                placeholder="Enter your memo here..."
                onChange={(e) => {
                  setMemoContent(e.target.value);
                }}
              />
            </div>
          </InputRow>
          <InputRow>
            <div></div>
            <div>
              <CustomButton
                onClick={() => {
                  performReplyMemo(replyId, memoContent);
                  performCloseModal();
                }}
              >
                {i18n.t("common.submit")}
              </CustomButton>
            </div>
          </InputRow>
        </Content>
      </Modal>
    </>
  );
};

export default Inbox;
