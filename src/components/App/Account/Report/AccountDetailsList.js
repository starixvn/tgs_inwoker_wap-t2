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
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "12px",
  },
  body: {
    fontSize: 14,
    padding: "5px 0 5px 10px",

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
function AccountDetailsList(props) {
  // const classes = useStyles();

  // const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage);
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, props.total - page * rowsPerPage);
  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("report.submitDate")}</StyledTableCell>
            <StyledTableCell>{i18n.t("report.status")}</StyledTableCell>
            <StyledTableCell>{i18n.t("report.transferOut")}</StyledTableCell>
            <StyledTableCell>{i18n.t("report.transferIn")}</StyledTableCell>
            <StyledTableCell align="right" style={{ paddingRight: "20px" }}>
              {i18n.t("report.amount")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            return (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                <StyledTableCell>{row.create_time_text}</StyledTableCell>
                <StyledTableCell>{row.status_text}</StyledTableCell>
                <StyledTableCell>{row.transform_out}</StyledTableCell>
                <StyledTableCell>{row.transform_in}</StyledTableCell>
                <StyledTableCell align="right" style={{ paddingRight: "20px" }}>
                  {row.amount_text}
                </StyledTableCell>
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
export default AccountDetailsList;
