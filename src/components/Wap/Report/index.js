import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

import { ReportService } from "../../../api-services/services/ReportService";
import { GameService } from "../../../api-services/services/GameService";
import { accountAction } from "../../../api-services/actions/accountAction";
import { GeneralService } from "../../../api-services/services/GeneralService";

import BottomScrollListener from "react-bottom-scroll-listener";
import Loading from "../../Wap/Share/Loading";
import Header from "../../Wap/Share/Header";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";
const moment = require("moment");
const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};
const Container = styled.div`
  width: 100%;
  padding-top: 170px;
  min-height: 100vh;
`;
const StyledAppBar = withStyles((theme) => ({
  root: {
    height: "170px",
    background: theme.palette.primary.main,

    background:
      `linear-gradient(rgba(` +
      theme.palette.primary.mainRgb +
      `, 0.8), rgba(` +
      theme.palette.primary.mainGradientRgb +
      `, 0.8)), url(${
        process.env.PUBLIC_URL + `/assets/images/wapp/bg-profile.png`
      })`,
    display: "block",
  },
}))(AppBar);
const BalanceLabel = styled.div`
  font-size: 36px;

  text-align: center;
  color: #fff;
  margin: 0 auto 20px auto;
`;

const DateContainer = styled.div`
  padding: 30px 40px;
`;
const DateSpliter = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #4a4a4a;
  margin: 75px 0 0 10px;
`;
const DateInner = styled.div`
  width: 320px;
  padding: 5px;
`;
const DateLabel = styled.div`
  height: 40px;
  border-left: 5px solid ${({ theme }) => theme.primary};
  padding-left: 20px;
  padding-top: 5px;
  margin-left: 10px;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondary};
`;
const DateRangContainer = styled.div`
  margin-top: 20px;
`;
const DateRangSelection = styled.div`
  width: 220px;
  height: 52px;
  float: left;
  font-weight: 600;

  letter-spacing: normal;
  text-align: center;
  font-size: 32px;
  ${(props) =>
    props.selected
      ? `  
  color: ` +
        props.theme.primary +
        `;`
      : `

  color: ` +
        props.theme.secondary +
        `;`}
`;
const DataContent = styled.div`
  width: 690px;

  margin: 0 auto;

  border: solid 2px #f9f9f9;
  background-color: #fff;
  font-size: 26px;
  color: #4a4a4a;
  padding: 0 20px;
`;
const DataHeader = styled.div`
  width: 690px;
  font-weight: 600;
  margin: 0 auto;

  font-size: 26px;
  color: ${({ theme }) => theme.secondary};
  padding: 0 20px;
`;
const DataRowId = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 14px 0px 0px 0px;
  font-weight: 600;
  font-size: 26px;
`;
const IDCell = styled.span`
  font-weight: normal;
  font-size: 26px;
`;
const DataRow = styled.div`
  border-bottom: 2px solid #d7d7d7;
  width: 100%;
  min-height: 78px;
  padding: 20px 0;
`;
const DataHeaderRow = styled(DataRow)`
  border-bottom: none;
`;
const DataDateCell3 = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: left;
`;
const DataDateCellAmount = styled.div`
  float: left;
  width: calc(630px / 3 * 1);
  text-align: right;
`;
const DataDateCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: left;
`;
const DataWinlossCell = styled.div`
  float: left;
  width: calc(630px / 4 * 1);
  text-align: right;
`;
const NoRecordContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/no-record.png`})
    no-repeat center;
  width: 96px;
  height: 136px;
`;
const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersModal: {
      dialogAction: {
        color: "red",
      },
    },
    MuiPaper: {
      root: {
        transform: "scale(1.5)",
      },
    },
    MuiFormControl: {
      root: {
        width: "312px",
        height: "76px",
        marginTop: "10px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px 0 rgba(35, 31, 27, 0.1)",
        border: "solid 1px #f3f3f3",
        backgroundColor: "#ffffff",
      },
    },
    MuiInput: {
      root: {
        fontSize: "30px",
        height: "75px",
        "&::before": {
          display: "none",
        },
        "& input": {
          textAlign: "center",
        },
      },
    },
  },
});
const CustomFormControl = withStyles((theme) => ({
  root: {
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const CustomSelect = withStyles((theme) => ({
  root: {
    height: "50px",
    padding: 0,
    margin: 0,
    width: "460px",
  },
}))(Select);

const SelectContainer = styled.div`
  float: left;
  padding: 0 0 0 30px;
  width: 690px;

  margin: 20px auto 20px 30px;

  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
`;

const SelectLabel = styled.div`
  font-size: 28px;
  color: #303030;
  margin-left: 20px;
  width: 140px;
  float: left;
  margin-top: 20px;
`;

const TheDepositButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  padding: 0px 10px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const CustomTabs = styled(Tabs)`
  height: 80px;
  font-size: 25px;
  display: flex;

  .MuiTabs-fixed {
    overflow: overlay !important;
  }
`;

const CustomTabText = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CustomBorderBottom = styled.div`
  height: 5px;
`;

const CustomTab = styled.div`
  width: calc(100vw / 4);
  display: flex;
  flex-direction: column;
  padding: 0px 10px;

  ${CustomTabText} {
    color: ${({ selected, theme }) => {
      return selected ? theme.primary : theme.secondary;
    }};
  }

  ${CustomBorderBottom} {
    background: ${({ selected, theme }) => {
      return selected ? theme.primary : theme.secondary;
    }};
  }
`;

const CustomDatepicker = styled.div`
  background: white;
  zoom: 1.5;
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 10px;

  .MuiInputBase-input {
    background: none;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const DateTimeDisplay = styled.div``;

const CustomWinLose = styled.span`
  color: ${({ value }) => {
    return value === 0 ? "" : value > 0 ? "rgb(3,189, 0)" : "rgb(255, 0, 0)";
  }};
`;

const CustomDataRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AnotherCustomDataRow = styled.div`
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  padding-bottom: 20px;
  border-bottom: 2px solid #d7d7d7;
`;

const FlatStraightLine = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const NoRecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  width: 100px;
`;

const NoDataText = styled.div`
  font-size: 24px;
  user-select: none;
  opacity: 0.5;
`;

class Report extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.state = {
      selectedType:
        this.props.match.params.tab &&
        parseInt(this.props.match.params.tab) > 0 &&
        parseInt(this.props.match.params.tab) <= 8
          ? parseInt(this.props.match.params.tab)
          : 2,
      loading: false,

      dateFrom: today,
      dateTo: today,

      tab1: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        type: 0,
      },
      tab2: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        roundTotal: {},
        type: 0,
      },
      tab3: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab4: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
        status: "",
      },
      tab5: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab6: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab7: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },
      tab8: {
        dateFrom: today,
        dateTo: today,
        dateRange: 0,
      },

      dateRange: 0,
      pageSize: 20,
      page: 1,
      type: 0,
      status: "",
      betType: 0,
      betType2: 0,
      dataList: [],
      gameList: [],
      isMaxPage: false,
      depositStatusList: {},
      withdrawalStatusList: {},
    };
  }

  theMenu = [
    {
      index: 2,
      label: i18n.t("report.bettingDetails"),
    },
    {
      index: 3,
      label: i18n.t("report.withdrawalDetails"),
    },
    {
      index: 4,
      label: i18n.t("report.depositDetails"),
    },
    {
      index: 6,
      label: i18n.t("common.transfer"),
    },
    {
      index: 8,
      label: i18n.t("report.balanceChanges.title"),
    },
    {
      index: 7,
      label: i18n.t("report.joinedPromo.title"),
    },
  ];

  noTransfer = [
    {
      index: 2,
      label: i18n.t("report.bettingDetails"),
    },
    {
      index: 3,
      label: i18n.t("report.withdrawalDetails"),
    },
    {
      index: 4,
      label: i18n.t("report.depositDetails"),
    },
    {
      index: 8,
      label: i18n.t("report.balanceChanges.title"),
    },
    {
      index: 7,
      label: i18n.t("report.joinedPromo.title"),
    },
  ];

  CTabs = (index, label) => {
    return (
      <Tab
        selected={index === this.state.selectedType}
        index={index}
        label={label}
        value={index}
      ></Tab>
    );
  };

  componentDidMount() {
    this.GetDepositWithdrawalStatus();
    // this.handleAccountGetReportTrigger(
    //   this.state.page,
    //   this.state.pageSize,
    //   0,
    //   0
    // );

    if (this.state.selectedType === 1) {
      this.handleAccountGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 2) {
      this.handleTransactionGetReportTrigger(this.state.page, this.state.type);
    } else if (this.state.selectedType === 3) {
      this.handleWithdrawalGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 4) {
      this.handleDepositGetReportTrigger(this.state.page, this.state.status);
    } else if (this.state.selectedType === 5) {
      this.handleRebateGetReportTrigger(this.state.page);
    } else if (this.state.selectedType === 6) {
      this.handleGetTransferReportTrigger(this.state.page);
    } else if (this.state.selectedType === 7) {
      this.handleGetJoinedPromo(this.state.page);
    } else if (this.state.selectedType === 8) {
      this.handleBalanceChanges(this.state.page);
    }
  }
  componentDidUpdate(preProps, preState) {
    if (this.state.selectedType === 1) {
      if (
        preState.type !== this.state.type ||
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleAccountGetReportTrigger(this.state.page, this.state.type);
      }
    } else if (this.state.selectedType === 2) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.type !== this.state.type ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleTransactionGetReportTrigger(
          this.state.page,
          this.state.type
        );
      }
    } else if (this.state.selectedType === 3) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleWithdrawalGetReportTrigger(
          this.state.page,
          this.state.status
        );
      }
    } else if (this.state.selectedType === 4) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.status !== this.state.status ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleDepositGetReportTrigger(this.state.page, this.state.status);
      }
    } else if (this.state.selectedType === 5) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleRebateGetReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 6) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetTransferReportTrigger(this.state.page);
      }
    } else if (this.state.selectedType === 7) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleGetJoinedPromo(this.state.page);
      }
    } else if (this.state.selectedType === 8) {
      if (
        preState.dateFrom !== this.state.dateFrom ||
        preState.dateTo !== this.state.dateTo ||
        preState.page !== this.state.page ||
        preState.selectedType !== this.state.selectedType
      ) {
        this.handleBalanceChanges(this.state.page);
      }
    }
  }
  GetGameList = () => {
    GameService.GetGameList(this.props.token).then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, gameList: response.data });
      }
    });
  };
  GetDepositWithdrawalStatus = () => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, depositStatusList: response.data });
      }
    });
    ReportService.GetWithdrawalStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, withdrawalStatusList: response.data });
      }
    });
  };
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleChangeTab = (e, newValue) => {
    let json = {};
    let setDateJson = {};

    if (this.state.selectedType !== newValue) {
      if (this.state.selectedType === 1) {
        json = {
          tab1: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 2) {
        json = {
          tab2: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            type: this.state.type,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 3) {
        json = {
          tab3: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 4) {
        json = {
          tab4: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            status: this.state.status,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 5) {
        json = {
          tab5: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 6) {
        json = {
          tab6: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 7) {
        json = {
          tab7: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      } else if (this.state.selectedType === 8) {
        json = {
          tab8: {
            dateFrom: this.state.dateFrom,
            dateTo: this.state.dateTo,
            dateRange: this.state.dateRange,
          },
        };
      }
      if (newValue === 1) {
        setDateJson = {
          dateFrom: this.state.tab1.dateFrom,
          dateTo: this.state.tab1.dateTo,
          type: this.state.tab1.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 2) {
        setDateJson = {
          dateFrom: this.state.tab2.dateFrom,
          dateTo: this.state.tab2.dateTo,
          type: this.state.tab2.type,
          dateRange: this.state.tab1.dateRange,
        };
      } else if (newValue === 3) {
        setDateJson = {
          dateFrom: this.state.tab3.dateFrom,
          dateTo: this.state.tab3.dateTo,
          status: this.state.tab3.status,
          dateRange: this.state.tab3.dateRange,
        };
      } else if (newValue === 4) {
        setDateJson = {
          dateFrom: this.state.tab4.dateFrom,
          dateTo: this.state.tab4.dateTo,
          status: this.state.tab4.status,
          dateRange: this.state.tab4.dateRange,
        };
      } else if (newValue === 5) {
        setDateJson = {
          dateFrom: this.state.tab5.dateFrom,
          dateTo: this.state.tab5.dateTo,
          dateRange: this.state.tab5.dateRange,
        };
      } else if (newValue === 6) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 7) {
        setDateJson = {
          dateFrom: this.state.tab6.dateFrom,
          dateTo: this.state.tab6.dateTo,
          dateRange: this.state.tab6.dateRange,
        };
      } else if (newValue === 8) {
        setDateJson = {
          dateFrom: this.state.tab8.dateFrom,
          dateTo: this.state.tab8.dateTo,
          dateRange: this.state.tab8.dateRange,
        };
      }
      window.scrollTo({ top: 0 });
      this.setState({
        ...this.state,
        dataList: [],
        selectedType: newValue,
        page: 1,
        ...setDateJson,
        ...json,
      });
    }
  };

  handleWeeklyClick = () => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let newdateFrom = addDays(today, -7);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 1,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleMontlyClick = () => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let newdateFrom = addMonths(today, -1);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 2,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleTodayClick = (date) => {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    this.setState({
      ...this.state,
      dateFrom: today,
      dateTo: today,
      dateRange: 0,
      dataList: [],
      isMaxPage: false,
      page: 1,
    });
  };
  handleDateFromChange = (e) => {
    this.setState({ ...this.state, dateFrom: e });
  };
  handleDateToChange = (e) => {
    this.setState({ ...this.state, dateTo: e });
  };
  handleAccountGetReportTrigger = (page, type) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetAccountDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,

      type
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleTransactionGetReportTrigger = (page, game_platform_id) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransactionDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });

    config.features.Report_ShowRoundsTotal &&
      ReportService.GetRoundsTotal(
        moment(this.state.dateFrom).utc().format(),
        moment(this.state.dateTo).utc().add(1, "days").format()
      ).then((result) => {
        if (result.IsSuccess) {
          this.setState({
            ...this.state,
            tab2: {
              ...this.state.tab2,
              roundTotal: result.data,
            },
          });
        }
      });
  };
  handleWithdrawalGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetWithdrawalDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleDepositGetReportTrigger = (page, status) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetDepositDetails(
      status,
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };
  handleRebateGetReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetRebateDetails(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.list)
            : response.data.list;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.count == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetTransferReportTrigger = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetTransferReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      1,
      true,
      "BalanceTime",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleGetJoinedPromo = (page) => {
    this.setState({ ...this.state, loading: true });
    GeneralService.GetJoinedPromoReport(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize,
      false,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalCount == dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleBalanceChanges = (page) => {
    this.setState({ ...this.state, loading: true });
    ReportService.GetBalanceChanges(
      moment(this.state.dateFrom).utc().format(),
      moment(this.state.dateTo).utc().add(1, "days").format(),
      page,
      this.state.pageSize
    ).then((response) => {
      if (response.IsSuccess) {
        const dataList =
          page > 1
            ? this.state.dataList.concat(response.data.items)
            : response.data.items;
        this.setState({
          ...this.state,
          dataList: dataList,
          loading: false,

          isMaxPage: response.data.totalcount === dataList.length,
        });
      } else {
        this.props.alert("", response.info);
        this.setState({
          ...this.state,

          loading: false,
        });
      }
    });
  };

  handleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
  };
  handleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
  };

  handleScrollBottom = () => {
    if (this.state.isMaxPage === false) {
      this.setState({
        ...this.state,
        page: this.state.page + 1,
        loading: true,
      });
    }
  };

  handleManualDeposit = (id) => {
    this.props.appHistory.push({
      pathname: "/" + i18n.language + "/manual/" + id,
    });
  };

  getDateFromMinDate = () => {
    switch (this.state.selectedType) {
      case 8:
        return addDays(new Date(this.state.dateTo), -44);
      default:
        return undefined;
    }
  };

  getDateToMaxDate = () => {
    switch (this.state.selectedType) {
      case 8:
        return addDays(new Date(this.state.dateTo), 44) > new Date()
          ? new Date()
          : addDays(new Date(this.state.dateTo), 44);
      default:
        return new Date();
    }
  };

  render() {
    const NoRecord = () => {
      return (
        <NoRecordWrapper>
          <NoRecordContainer language={i18n.language} />
          <NoDataText>{i18n.t("common.nodata")}</NoDataText>
        </NoRecordWrapper>
      );
    };

    return (
      <Container>
        <StyledAppBar>
          <Header
            onBackClick={this.handleBackClick}
            title={(() => {
              switch (this.state.selectedType) {
                case 1:
                  return i18n.t("report.transferDetails");
                case 2:
                  return i18n.t("report.bettingDetails");
                case 3:
                  return i18n.t("report.withdrawalDetails");
                case 4:
                  return i18n.t("report.depositDetails");
                case 5:
                  return;
                case 6:
                  return i18n.t("report.transfer.title");
                case 7:
                  return i18n.t("report.joinedPromo.title");
                case 8:
                  return i18n.t("report.balanceChanges.title");
                default:
                  return i18n.t("report.rebateDetails");
              }
            })()}
            position={"sticky"}
            backgroundColor={"transparent"}
          ></Header>
          <BalanceLabel>
            {this.props.wallet.mainSymbol}
            {Common.formatNumberWithThousand(
              this.props.wallet.mainBalance +
                this.props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .reduce((a, v) => (a = a + v.balance), 0)
            )}
          </BalanceLabel>
          {
            //         <Tabs value={this.state.selectedType} onChange={this.handleChangeTab}>
            //         {/*
            //       <Tab
            //           style={{ width: "calc(750px/5)" }}
            //           index={1}
            //           label={i18n.t("report.transferDetails")}
            //           value={1}
            //         />
            //       */}
            //         <Tab
            //           style={{ width: 'calc(750px/4)' }}
            //           index={2}
            //           label={i18n.t('report.bettingDetails')}
            //           value={2}
            //         />
            //         <Tab
            //           style={{ width: 'calc(750px/4)' }}
            //           index={3}
            //           label={i18n.t('report.withdrawalDetails')}
            //           value={3}
            //         />
            //         <Tab
            //           style={{ width: 'calc(750px/4)' }}
            //           index={4}
            //           label={i18n.t('report.depositDetails')}
            //           value={4}
            //         />
            //         {/*<Tab
            //           style={{ width: "calc(750px/5)" }}
            //           index={5}
            //           label={i18n.t("report.rebateDetails")}
            //           value={5}
            //         /> */}{' '}
            //         <Tab
            //           style={{ width: 'calc(750px/4)' }}
            //           index={6}
            //           label={i18n.t('common.transfer')}
            //           value={6}
            //         />
            //       </Tabs>
          }
        </StyledAppBar>
        <CustomTabs
          value={this.state.selectedType}
          onChange={this.handleChangeTab}
        >
          {(this.props.game.containTransferWallet
            ? this.theMenu
            : this.noTransfer
          ).map((data, index) => {
            return this.CTabs(data.index, data.label);
          })}
        </CustomTabs>

        <DateContainer>
          <FlatStraightLine>
            <DateInner>
              <DateLabel>{i18n.t("report.startDate")}</DateLabel>
              <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={localeMap[i18n.language.substring(0, 2)]}
                >
                  <DatePicker
                    autoOk
                    clearable
                    disableFuture
                    minDate={this.getDateFromMinDate()}
                    maxDate={new Date(this.state.dateTo)}
                    format="yyyy/MM/dd"
                    value={this.state.dateFrom}
                    onChange={this.handleDateFromChange}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </DateInner>
            <DateSpliter>-</DateSpliter>
            <DateInner>
              <DateLabel>{i18n.t("report.endDate")}</DateLabel>
              <ThemeProvider theme={materialTheme}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={localeMap[i18n.language.substring(0, 2)]}
                >
                  <DatePicker
                    autoOk
                    clearable
                    disableFuture
                    minDate={new Date(this.state.dateFrom)}
                    maxDate={this.getDateToMaxDate()}
                    format="yyyy/MM/dd"
                    value={this.state.dateTo}
                    onChange={this.handleDateToChange}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>
            </DateInner>
          </FlatStraightLine>
          <div className="clear"></div>
          <DateRangContainer>
            <DateRangSelection
              onClick={this.handleTodayClick}
              selected={this.state.dateRange === 0}
            >
              {i18n.t("report.today")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 1}
              onClick={this.handleWeeklyClick}
            >
              {i18n.t("report.oneWeek")}
            </DateRangSelection>
            <DateRangSelection
              selected={this.state.dateRange === 2}
              onClick={this.handleMontlyClick}
            >
              {i18n.t("report.oneMonth")}
            </DateRangSelection>
          </DateRangContainer>
        </DateContainer>
        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.platform")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                  >
                    <option value={0}>{i18n.t("report.all")}</option>

                    {(() => {
                      return this.state.gameList.map((row) => {
                        return (
                          <option value={row.id} key={row.id}>
                            {row.name}
                          </option>
                        );
                      });
                    })()}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>

                    {Object.keys(this.state.withdrawalStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.withdrawal.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <SelectContainer>
                <SelectLabel>{i18n.t("report.status")}</SelectLabel>
                <CustomFormControl variant="outlined" style={{}}>
                  <CustomSelect
                    native
                    style={{
                      fontSize: "28px",
                      height: "78px",
                      border: "none",
                    }}
                    onChange={this.handleStatusChange}
                    value={this.state.status}
                  >
                    <option value={""}>{i18n.t("report.all")}</option>
                    {Object.keys(this.state.depositStatusList).map((key) => {
                      return (
                        <option value={key}>
                          {i18n.t(`report.deposit.status${key}`)}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectContainer>
            );
          }
        })()}

        {(() => {
          if (this.state.selectedType === 1) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.submitDate")}</DataDateCell>
                    <DataWinlossCell>{i18n.t("report.status")}</DataWinlossCell>
                    <DataWinlossCell>
                      {i18n.t("report.transferOut")}
                      <br />
                      {i18n.t("report.transferIn")}
                    </DataWinlossCell>

                    <DataWinlossCell>{i18n.t("common.amount")}</DataWinlossCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>
                                {moment(row.create_time_text).format(
                                  "YYYY-MM-DD hh:mm a"
                                )}
                              </DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell>
                                {row.transform_out}
                                <br />
                                {row.transform_in}
                              </DataDateCell>

                              <DataDateCell>{row.amount_text}</DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 2) {
            return (
              <React.Fragment>
                <DataHeader>
                  {
                    //    <DataHeaderRow>
                    //      <DataDateCell>
                    //        {i18n.t("report.betDateTime")}
                    //      </DataDateCell>
                    //      <DataDateCell>{i18n.t("report.platform")}</DataDateCell>
                    //      <DataDateCell>{i18n.t("report.gamename")}</DataDateCell>
                    //      <DataWinlossCell>
                    //        {i18n.t("report.betAmount")}
                    //      </DataWinlossCell>
                    //      <DataWinlossCell>
                    //        {i18n.t("report.winloss")}
                    //      </DataWinlossCell>
                    //    </DataHeaderRow>
                  }
                </DataHeader>
                {config.features.Report_ShowRoundsTotal &&
                  this.state.tab2.roundTotal &&
                  (this.state.tab2.roundTotal.betAmount ||
                    this.state.tab2.roundTotal.validBetAmount ||
                    this.state.tab2.roundTotal.validBetAmount) && (
                    <DataContent
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        {this.state.tab2.roundTotal &&
                          i18n.t("report.totalBetAmount") +
                            ": " +
                            this.state.tab2.roundTotal.betAmount}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        {this.state.tab2.roundTotal &&
                          i18n.t("report.totalValidBet") +
                            ": " +
                            this.state.tab2.roundTotal.validBetAmount}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        {i18n.t("report.totalWinLose") + ": "}
                        <CustomWinLose
                          value={
                            this.state.tab2.roundTotal &&
                            this.state.tab2.roundTotal.winLoss
                          }
                        >
                          {this.state.tab2.roundTotal &&
                            this.state.tab2.roundTotal.winLoss}
                        </CustomWinLose>
                      </div>
                    </DataContent>
                  )}

                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.betid")} :{" "}
                                <IDCell>{row.id}</IDCell>
                              </DataRowId>
                              <DataRowId>
                                <CustomDataRow>
                                  <IDCell>
                                    {config.features.WGHK_Setup
                                      ? row.subGameProviderName
                                      : row.gameProviderName
                                      ? row.gameProviderName === "BTI" &&
                                        config.currency === "PHP"
                                        ? "PHSB"
                                        : row.gameProviderName
                                      : ""}
                                    - {row.gameName}
                                  </IDCell>
                                  <IDCell> {date}</IDCell>
                                </CustomDataRow>
                              </DataRowId>
                              <DataRowId>
                                <AnotherCustomDataRow>
                                  <IDCell>
                                    {i18n.t("report.betAmount")} :
                                    {row.betAmount}
                                  </IDCell>{" "}
                                  <IDCell>
                                    {i18n.t("report.validBet")} :
                                    {row.validBetAmount}
                                  </IDCell>{" "}
                                  <IDCell>
                                    {i18n.t("report.winloss")} :
                                    <CustomWinLose value={row.winLoss}>
                                      {row.winLoss}
                                    </CustomWinLose>
                                  </IDCell>
                                </AnotherCustomDataRow>
                              </DataRowId>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 3) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell3>{i18n.t("report.dateTime")}</DataDateCell3>

                    <DataDateCell3>{i18n.t("report.status")}</DataDateCell3>
                    <DataDateCellAmount>
                      {i18n.t("common.amount")}
                    </DataDateCellAmount>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <IDCell>{row.orderno}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3>{date}</DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(
                                    `report.withdrawal.status${row.status}`
                                  )}
                                </DataDateCell3>
                                <DataDateCellAmount>
                                  {row.amount}
                                </DataDateCellAmount>
                              </DataRow>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 4) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.createdon).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <React.Fragment key={index}>
                              <DataRowId>
                                {i18n.t("report.NewOrderNumber")} :{" "}
                                <IDCell>{row.orderno}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DataDateCell3></DataDateCell3>
                                <DataDateCell3>
                                  {i18n.t(`report.deposit.status${row.status}`)}
                                </DataDateCell3>
                                <DataDateCell3>{row.amount}</DataDateCell3>
                                <DataDateCellAmount>
                                  {row.status === 1 &&
                                    row.canuploadcerts === true && (
                                      <TheDepositButton
                                        onClick={() => {
                                          this.handleManualDeposit(row.id);
                                        }}
                                      >
                                        {i18n.t("deposit.uploadReceipt")}
                                      </TheDepositButton>
                                    )}
                                </DataDateCellAmount>
                                <DataRowId>
                                  <DateTimeDisplay>{date}</DateTimeDisplay>
                                </DataRowId>
                              </DataRow>
                            </React.Fragment>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 5) {
            return (
              <React.Fragment>
                <DataHeader>
                  <DataHeaderRow>
                    <DataDateCell>{i18n.t("report.rebate.sn")}</DataDateCell>
                    <DataDateCell>
                      {i18n.t("report.rebate.cycleDate")}
                    </DataDateCell>
                    <DataDateCell>{i18n.t("report.status")}</DataDateCell>
                    <DataDateCell style={{ "text-align": "right" }}>
                      {i18n.t("report.rebate.validBet")}
                      <br />
                      {i18n.t("report.rebate.amount")}
                    </DataDateCell>
                  </DataHeaderRow>
                </DataHeader>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <DataRow key={index}>
                              <DataDateCell>{row.sn}</DataDateCell>
                              <DataDateCell>{row.date}</DataDateCell>
                              <DataDateCell>{row.status_text}</DataDateCell>
                              <DataDateCell style={{ "text-align": "right" }}>
                                {row.bet_valid_text}
                                <br />
                                {row.rebate_amount_text}
                              </DataDateCell>
                            </DataRow>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 6) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          return (
                            <div key={index}>
                              <DataRowId>
                                {i18n.t("report.transfer.table.from")} :{" "}
                                <IDCell>
                                  {row.from
                                    ? row.from === "BTI" &&
                                      config.currency === "PHP"
                                      ? "PHSB"
                                      : row.from
                                    : ""}
                                </IDCell>
                              </DataRowId>
                              <DataRowId>
                                {i18n.t("report.transfer.table.to")} :{" "}
                                <IDCell>
                                  {row.to
                                    ? row.to === "BTI" &&
                                      config.currency === "PHP"
                                      ? "PHSB"
                                      : row.to
                                    : ""}
                                </IDCell>
                              </DataRowId>
                              <DataRowId>
                                {i18n.t("report.amount")} :{" "}
                                <IDCell>{row.amount}</IDCell>
                              </DataRowId>
                              <DataRow>
                                <DateTimeDisplay>
                                  {moment(row.balancetime).format(
                                    "YYYY-MM-DD hh:mm a"
                                  )}
                                </DateTimeDisplay>
                              </DataRow>
                            </div>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 7) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.joinedOn).format(
                            "YYYY-MM-DD hh:mm a"
                          );
                          return (
                            <div key={index}>
                              <DataRow>
                                <DataRowId>
                                  {i18n.t("report.dateTime")} :{" "}
                                  <IDCell>{date}</IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.joinedPromo.promoName")}:{" "}
                                  <IDCell>{row.promotionName}</IDCell>
                                </DataRowId>
                              </DataRow>
                            </div>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          } else if (this.state.selectedType === 8) {
            return (
              <React.Fragment>
                {(() => {
                  if (this.state.dataList.length <= 0) {
                    return <NoRecord />;
                  } else {
                    return (
                      <DataContent>
                        {this.state.dataList.map((row, index) => {
                          const date = moment(row.recordedon).format(
                            "YYYY/MM/DD hh:mm:ss"
                          );
                          return (
                            <div key={index}>
                              <DataRow>
                                <DataRowId>
                                  {i18n.t("report.dateTime")} :{" "}
                                  <IDCell>{date}</IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.balanceChanges.type")}:{" "}
                                  <IDCell>{ErrorSwitcher.getTranslation(row.type)}</IDCell>
                                </DataRowId>
                                <DataRowId>
                                  {i18n.t("report.balanceChanges.amount")}:{" "}
                                  <IDCell>{row.amount}</IDCell>
                                </DataRowId>
                              </DataRow>
                            </div>
                          );
                        })}
                      </DataContent>
                    );
                  }
                })()}
              </React.Fragment>
            );
          }
        })()}
        <BottomScrollListener onBottom={this.handleScrollBottom} />
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Report));
