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
    padding: "5px",
  },
  body: {
    fontSize: 14,
    padding: "5px",

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
  width: 100%;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
`;
function JoinedReportList(props) {
  // const classes = useStyles();

  // const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, props.total - page * rowsPerPage);
  return (
    <InnerWrap>
      <Table aria-label="customized table" style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("report.dateTime")}</StyledTableCell>

            <StyledTableCell>
              {i18n.t("report.joinedPromo.promoName")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            const date = moment(row.joinedOn).format("YYYY-MM-DD hh:mm a");
            return (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                <StyledTableCell>{date}</StyledTableCell>
                <StyledTableCell>{row.promotionName}</StyledTableCell>
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
export default JoinedReportList;
