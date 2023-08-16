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
import { withSnackbar } from "notistack";
import { config } from "react-spring";
import { utility } from "../../../../utils/utility";
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

    color: "#151a34",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    userSelect: "none",
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

const CustomWinLose = styled(StyledTableCell)`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;

function TransactionDetailsList(props) {
  // const classes = useStyles();

  // const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  const handleDoubleClick = (e, id) => {
    if (e.detail === 2) {
      props.enqueueSnackbar(i18n.t("affiliate.copied"), {
        variant: "success",
      });
      utility.copy(id);
    }
  };

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, props.total - page * rowsPerPage);
  return (
    <InnerWrap>
      <Table aria-label="customized table" style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("report.betDateTime")}</StyledTableCell>
            <StyledTableCell
              style={{
                width: "20rem",
              }}
            >
              {i18n.t("report.betid")}
            </StyledTableCell>
            <StyledTableCell>
              {i18n.t("report.platform")}/{i18n.t("report.gamename")}
            </StyledTableCell>

            <StyledTableCell
              align="right"
              style={{
                width: "4rem",
              }}
            >
              {i18n.t("report.totalBet")}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              style={{
                width: "4rem",
              }}
            >
              {i18n.t("report.validBet")}
            </StyledTableCell>
            <StyledTableCell
              align="right"
              style={{
                width: "4rem",
              }}
            >
              {i18n.t("report.winloss")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
            return (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                onClick={(e) => {
                  handleDoubleClick(e, row.id);
                }}
              >
                <StyledTableCell>{date}</StyledTableCell>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>
                  {row.gameProviderName
                    ? config.currency === "PHP" &&
                      row.gameProviderName.includes("BTI")
                      ? row.gameProviderName.replace("BTI", "PHSB")
                      : row.gameProviderName
                    : ""}
                  -{row.gameName}
                </StyledTableCell>

                <StyledTableCell align="right">{row.betAmount}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.validBetAmount}
                </StyledTableCell>
                <CustomWinLose value={row.winLoss} align="right">
                  {row.winLoss}
                </CustomWinLose>
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
export default withSnackbar(TransactionDetailsList);
