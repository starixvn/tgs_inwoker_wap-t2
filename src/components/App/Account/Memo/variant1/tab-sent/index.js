import React from "react";
import { TabContentTitle, TabsContent } from "..";
import moment from "moment";
import styled from "styled-components";
import i18n from "../../../../../../utils/i18n";
import Modal from "../modal";
import { useState } from "react";

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

const ContentWrapper = styled.div``;

const Content = styled.div`
  padding: 20px;
`;

const UpperSection = styled.div`
  padding: 20px;
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
const Sent = ({ sent, action }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const performOpenModal = (id) => {
    action("read", id).then((res) => {
      setContent(res.data);
      setOpen(true);
    });
  };

  const dateTimeFormatter = (date) => {
    const today = moment();
    const diffInDays = today.diff(date, "days");
    return moment(date).format("YYYY/MM/DD") + " - " + diffInDays + " days ago";
  };

  const performCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <TabContentTitle>{i18n.t("sent")}</TabContentTitle>
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
            {sent.items &&
              sent.items.map((item, index) => {
                return (
                  <CustomTableRow key={index}>
                    <td>{index + 1}</td>
                    <td>{moment(item.sentOn).format("D MMMM YYYY HH:mm")}</td>
                    <td
                      onClick={() => {
                        performOpenModal(item.id);
                      }}
                    >
                      {item.subject}
                    </td>
                    <td>
                      <ContentButton
                        onClick={() => {
                          performOpenModal(item.id);
                        }}
                      >
                        🔎︎
                      </ContentButton>
                    </td>
                  </CustomTableRow>
                );
              })}
          </tbody>
        </CustomTable>
      </TabsContent>{" "}
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
    </>
  );
};

export default Sent;
