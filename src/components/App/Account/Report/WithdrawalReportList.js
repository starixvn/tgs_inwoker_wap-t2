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
const moment = require("moment");
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "5px 20px 5px 20px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("report.RequestDate")}</StyledTableCell>

            <StyledTableCell>{i18n.t("report.NewOrderNumber")}</StyledTableCell>
            <StyledTableCell>
              {i18n.t("report.withdrawal.bankCard")}
            </StyledTableCell>
            <StyledTableCell>{i18n.t("report.status")}</StyledTableCell>
            <StyledTableCell align="right">
              {i18n.t("common.amount")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                <StyledTableCell>
                  {moment(row.createdon).format("YYYY-MM-DD hh:mm a")}
                </StyledTableCell>

                <StyledTableCell>{row.orderno}</StyledTableCell>
                <StyledTableCell>
                  {i18n.t(`report.withdrawal.status${row.status}`)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={props.total}
        rowsPerPage={20}
        page={props.page - 1}
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
export default DailyReportList;
