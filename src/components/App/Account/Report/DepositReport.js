import React, { Component } from "react";
import styled from "styled-components";

import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../../../utils/i18n";
import TableList from "./TableList";
const moment = require("moment");
const Container = styled.div`
  width: 100%;
  min-height: 611px;
  color: #151a34;
  font-size: 14px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  background-color: #f7f7f7;
  float: left;
  padding: 10px;
`;
const InnerWrap = styled.div`
  width: 888px;
  float: left;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: #f7f7f7;
`;
const Label = styled.span`
  float: left;
  margin: 20px 20px 0 0;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "160px",
    height: "35px",
    marginTop: "10px",
    marginRight: "5px",
    float: "left",
    borderRadius: "12px",
    boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
    backgroundColor: "#fff",
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 2",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "12px",
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);

class DepositReport extends Component {
  state = {
    isLoaded: false,
    status: "",
    page: 1,
    dateRange: {
      dateFrom: moment(addDays(new Date(), -7)).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
    },
  };
  onhandleDateChange = (dateRange) => {
    this.props.onhandleGetReportTrigger(
      dateRange.dateFrom,
      dateRange.dateTo,
      this.state.page,
      this.state.status
    );
    this.setState({ ...this.state, dateRange: dateRange });
  };
  onhandleStatusChange = (e) => {
    this.setState({
      ...this.state,
      status: e.target.value,
      page: 1,
    });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      parseInt(e.target.value)
    );
  };

  componentDidUpdate() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,
        this.state.status
      );
    }
  }
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,
        this.state.status
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page,

      this.state.status
    );
  };
  render() {
    return (
      <Container>
        <FilterContainer>
          <DateSelection
            onhandleDateChange={this.onhandleDateChange}
            defaultDateFrom={this.state.dateRange.dateFrom}
            defaultDateTo={this.state.dateRange.dateTo}
          ></DateSelection>
          <div className="clear"></div>
          <Label>{i18n.t("report.status")}</Label>
          <CustomFormControl>
            <Select
              native
              value={this.state.status}
              onChange={this.onhandleStatusChange}
              variant="outlined"
            >
              <option value={""}>{i18n.t("report.all")}</option>
              {Object.keys(this.props.depositStatusList).map((key) => {
                return (
                  <option value={key}>
                    {i18n.t(`report.deposit.status${key}`)}
                  </option>
                );
              })}
            </Select>
          </CustomFormControl>
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="depositReport"
            page={this.state.page}
            rows={this.props.depositList.list}
            total={this.props.depositList.count}
            onhandleChangePage={this.handleChangePage}
            depositStatusList={this.props.depositStatusList}
          />
        </InnerWrap>
      </Container>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     token: state.account.token
//     // bonus: state.bonus
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     getNewBonusList: token => dispatch(bonusAction.getNewBonusList(token))
//   };
// };
export default DepositReport;
