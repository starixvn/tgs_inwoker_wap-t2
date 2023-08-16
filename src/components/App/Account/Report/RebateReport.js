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

class RebateReport extends Component {
  state = {
    isLoaded: false,
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
      this.state.page
    );
    this.setState({ ...this.state, dateRange: dateRange });
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
    return (
      <Container>
        <FilterContainer>
          <DateSelection
            onhandleDateChange={this.onhandleDateChange}
            defaultDateFrom={this.state.dateRange.dateFrom}
            defaultDateTo={this.state.dateRange.dateTo}
          ></DateSelection>
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="rebate"
            page={this.state.page}
            rows={this.props.rebateList.list}
            total={this.props.rebateList.count}
            onhandleChangePage={this.handleChangePage}
          />
        </InnerWrap>
      </Container>
    );
  }
}

export default RebateReport;
