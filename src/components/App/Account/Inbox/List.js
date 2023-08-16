import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import i18n from "../../../../utils/i18n";
import moment from "moment";
const StyledTableCell = withStyles((theme) => ({
  root: {
    fontFamily: 'Arial,"Microsoft Yahei", "微软雅黑"',
  },
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "12px",
    maxWidth: "600px",
  },
  body: {
    fontSize: 14,
    padding: "5px 0 5px 10px",
    maxWidth: "600px",
    color: "#7b7b7b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#fdeced !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

const InnerWrap = styled.div`
  width: 935px;
  float: left;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  display: contents;
`;
function List(props) {
  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  const isSelected = (id) => props.selected.indexOf(id) !== -1;

  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: "170px" }}>
              {i18n.t("inbox.dateTime")}
            </StyledTableCell>

            <StyledTableCell style={{ width: "200px" }}>
              {i18n.t("inbox.inboxTitle")}
            </StyledTableCell>
            <StyledTableCell>{i18n.t("inbox.details")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.inbox.items.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            let doc = new DOMParser().parseFromString(
              row.localization !== null && row.localization.content
                ? row.localization.content
                : row.content,
              "text/html"
            );

            return (
              <StyledTableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                onClick={() => props.onhandleRowClick(row)}
              >
                <StyledTableCell
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {moment(row.createon).format("YYYY-MM-DD hh:mm:ss a")}
                </StyledTableCell>
                <StyledTableCell
                  id={labelId}
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject}
                </StyledTableCell>
                <StyledTableCell
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {doc.querySelector("p")
                    ? doc.querySelector("p").textContent
                    : ""}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={props.inbox.totalcount}
        rowsPerPage={10}
        page={props.page}
        labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onChangePage={handleChangePage}
      />
    </InnerWrap>
  );
}
export default List;
