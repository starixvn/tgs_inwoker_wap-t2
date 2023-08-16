import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",

    color: "#151a34",
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
  width: 100%;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
`;
function DailyReportList(props) {
  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>时间</StyledTableCell>
            <StyledTableCell align="right">投注金额</StyledTableCell>
            <StyledTableCell align="right">输赢</StyledTableCell>
            <StyledTableCell align="right">流水</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.bet_time}
              >
                <StyledTableCell>{row.bet_time}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.bet_amount}
                </StyledTableCell>
                <StyledTableCell align="right">{row.win_loss}</StyledTableCell>
                <StyledTableCell align="right">{row.turnover}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </InnerWrap>
  );
}
export default DailyReportList;
