import React, { Component } from "react";
import styled from "styled-components";
import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import TableList from "./TableList";
const moment = require("moment");
const Container = styled.div`
  width: 100%;
  min-height: 611px;
  color: #151a34;
  font-size: 14px;
`;
const FilterContainer = styled.div`
  height: 115px;
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
class BalanceChangesReport extends Component {
  state = {
    isLoaded: false,
    pageSize: 15,
    page: 1,
    dateRange: {
      dateFrom: moment(addDays(new Date(), -3)).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
    },
  };
  onhandleDateChange = (dateRange) => {
    this.setState({ ...this.state, dateRange: dateRange, page: 1 });
    this.props.onhandleGetReportTrigger(
      dateRange.dateFrom,
      dateRange.dateTo,
      1
    );
  };

  componentDidUpdate() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page
      );
    }
  }
  componentDidMount() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page
    );
  };
  render() {
    console.log(this.props)
    return (
      <Container>
        <FilterContainer>
          <DateSelection
            onhandleDateChange={this.onhandleDateChange}
            defaultDateFrom={this.state.dateRange.dateFrom}
            defaultDateTo={this.state.dateRange.dateTo}
            minDate={moment(this.state.dateRange.dateTo)
              .utc()
              .subtract(44, "days")
              .format("YYYY-MM-DD")}
            maxDate={
              moment(this.state.dateRange.dateFrom)
                .utc()
                .add(44, "days")
                .format() > moment(new Date()).format("YYYY-MM-DD")
                ? moment(new Date()).format("YYYY-MM-DD")
                : moment(this.state.dateRange.dateFrom)
                    .utc()
                    .add(44, "days")
                    .format("YYYY-MM-DD")
            }
          ></DateSelection>
          <div className="clear"></div>
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="balanceChanges"
            page={this.state.page}
            rows={this.props.balanceChangesReport.list}
            total={this.props.balanceChangesReport.count}
            onhandleChangePage={this.handleChangePage}
          />
        </InnerWrap>
      </Container>
    );
  }
}

export default BalanceChangesReport;
