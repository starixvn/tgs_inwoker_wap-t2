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
import { useSnackbar } from "notistack";

import { AppHistory } from "../../../../history/History";
import config from "../../../../config/config";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import { utility } from "../../../../utils/utility";
const moment = require("moment");

const CustomTable = styled(Table)`
  white-space: nowrap;
  table-layout: fixed;
  overflow: auto;
  width: ${({ isTransactionReport }) => {
    return isTransactionReport ? "auto" : "100%";
  }};
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",
    width: "auto",
    color: "#7b7b7b",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#dde3f6 !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

const CustomWinLose = styled(StyledTableCell)`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;

const InnerWrap = styled.div`
  width: 100%;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  overflow-x: auto;
  user-select: none;
  padding-bottom: 15px;
`;

const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const headerLists = {
  transactionDetails: [
    {
      title: `report.betDateTime`,
    },
    {
      title: `report.betid`,
      width: "20rem",
    },
    {
      title: `report.platformgamename`,
    },
    {
      align: "right",
      title: `report.totalBet`,
      width: "4rem",
    },
    {
      align: "right",
      title: `report.validBet`,
      width: "4rem",
    },
    {
      align: "right",
      title: `report.winloss`,
      width: "4rem",
    },
  ],
  depositReport: [
    {
      title: `report.submitDate`,
    },
    {
      title: `report.NewOrderNumber`,
    },
    {
      title: `report.status`,
    },
    {
      align: "right",
      title: `common.amount`,
    },
  ],
  joinedPromo: [
    {
      title: `report.dateTime`,
    },
    {
      title: `report.joinedPromo.promoName`,
    },
  ],
  transfer: [
    {
      title: `report.dateTime`,
    },
    {
      title: `report.transfer.table.from`,
    },
    {
      title: `report.transfer.table.to`,
    },
    {
      title: `report.amount`,
    },
  ],
  withdrawal: [
    {
      align: "",
      title: `report.RequestDate`,
    },
    {
      align: "",
      title: `report.NewOrderNumber`,
    },
    {
      align: "",
      title: `report.status`,
    },
    {
      align: "right",
      title: `common.amount`,
    },
  ],
  account: [
    {
      title: `report.submitDate`,
    },
    {
      title: `report.status`,
    },
    {
      title: `report.transferOut`,
    },
    {
      title: `report.transferIn`,
    },
    {
      align: "right",
      title: `report.amount`,
    },
  ],
  rebate: [
    {
      title: `report.rebate.sn`,
    },
    {
      title: `report.rebate.cycleDate`,
    },
    {
      title: `report.status`,
    },
    {
      align: "right",
      title: `report.rebate.validBet`,
    },
    {
      align: "right",
      title: `report.rebate.amount`,
    },
  ],
  balanceChanges: [
    {
      title: `report.dateTime`,
    },
    {
      title: `report.balanceChanges.type`,
    },
    {
      title: `report.balanceChanges.amount`,
    },
  ],
};

function TableList(props) {
  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleDoubleClick = (id) => {
    enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(id);
  };

  const handleManualDeposit = (id) => {
    AppHistory.push({
      pathname: "/account/manual/" + id,
    });
  };

  const getTableList = () => {
    switch (props.type) {
      case "transactionDetails":
        return (
          <>
            {config.features.Report_ShowRoundsTotal && (
              <StyledTableRow style={{ pointerEvents: "none" }}>
                <StyledTableCell
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {i18n.t("report.total")}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">
                  {props.roundTotal && props.roundTotal.betAmount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {props.roundTotal && props.roundTotal.validBetAmount}
                </StyledTableCell>
                <CustomWinLose
                  value={props.roundTotal && props.roundTotal.winLoss}
                  align="right"
                >
                  {props.roundTotal && props.roundTotal.winLoss}
                </CustomWinLose>
              </StyledTableRow>
            )}
            {props.rows &&
              props.rows.map((row, index) => {
                const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    onClick={(e) => {
                      handleDoubleClick(row.id);
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
                    <StyledTableCell align="right">
                      {row.betAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.validBetAmount}
                    </StyledTableCell>
                    <CustomWinLose value={row.winLoss} align="right">
                      {row.winLoss}
                    </CustomWinLose>
                  </StyledTableRow>
                );
              })}
          </>
        );
      case "depositReport":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>
                {moment(row.createdon).format("YYYY-MM-DD hh:mm a")}
              </StyledTableCell>

              <StyledTableCell>{row.orderno}</StyledTableCell>
              <StyledTableCell>
                {i18n.t(`report.deposit.status${row.status}`)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell>
                {row.status === 1 && row.canuploadcerts === true && (
                  <TheDepositButton
                    onClick={() => {
                      handleManualDeposit(row.id);
                    }}
                  >
                    {i18n.t("deposit.uploadReceipt")}
                  </TheDepositButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      case "joinedPromo":
        return props.rows.map((row, index) => {
          const date = moment(row.joinedOn).format("YYYY-MM-DD hh:mm a");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>{row.promotionName}</StyledTableCell>
            </StyledTableRow>
          );
        });
      case "transfer":
        return props.rows.map((row, index) => {
          const date = moment(row.balancetime).format("YYYY-MM-DD hh:mm a");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>
                {row.from
                  ? config.currency === "PHP" && row.from.includes("BTI")
                    ? row.from.replace("BTI", "PHSB")
                    : row.from
                  : ""}
              </StyledTableCell>
              <StyledTableCell>
                {row.to
                  ? config.currency === "PHP" && row.to.includes("BTI")
                    ? row.to.replace("BTI", "PHSB")
                    : row.to
                  : ""}
              </StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
            </StyledTableRow>
          );
        });
      case "withdrawal":
        return props.rows.map((row, index) => {
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
        });
      case "account":
        return props.rows.map((row, index) => {
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
        });
      case "rebate":
        return props.rows.map((row, index) => {
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{row.sn}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.status_text}</StyledTableCell>
              <StyledTableCell align="right">
                {row.bet_valid_text}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.rebate_amount_text}
              </StyledTableCell>
            </StyledTableRow>
          );
        });
      case "balanceChanges":
        return props.rows.map((row, index) => {
          const date = moment(row.recordedon).format("YYYY/MM/DD hh:mm:ss");
          return (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
              <StyledTableCell>{date}</StyledTableCell>
              <StyledTableCell>
                {ErrorSwitcher.getTranslation(row.type)}
              </StyledTableCell>
              <StyledTableCell>{row.amount}</StyledTableCell>
            </StyledTableRow>
          );
        });
      default:
        break;
    }
  };
  return (
    <div style={{ display: "grid" }}>
      <InnerWrap>
        <CustomTable
          aria-label="customized table"
          style={{ tableLayout: props.tableLayout }}
          isTransactionReport={props.type === "transactionDetails"}
        >
          <TableHead>
            <TableRow>
              {headerLists[props.type].map((header, index) => {
                return (
                  <StyledTableCell
                    align={header.align}
                    style={{ width: header.width }}
                  >
                    {i18n.t(header.title)}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{getTableList()}</TableBody>
        </CustomTable>
      </InnerWrap>
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
        onPageChange={handleChangePage}
      />
    </div>
  );
}
export default TableList;
