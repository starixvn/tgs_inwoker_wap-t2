import React, { Component } from "react";
import styled from "styled-components";

import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";

import TableList from "./TableList";
const moment = require("moment");
const Container = styled.div`
  width: 100%;
  min-height: 611px;
  color: #7b7b7b;
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

class TransferReport extends Component {
  state = {
    isLoaded: false,
    type: 0,
    type2: 0,
    status: 1,
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
      1,
      1,
      this.state.type2
    );
  };

  onhandleType2Change = (e) => {
    this.setState({ ...this.state, type2: e.target.value, page: 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      1,
      e.target.value
    );
  };
  onhandleStatusChange = (e) => {
    this.setState({ ...this.state, status: e.target.value, page: 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      1,
      1,
      this.state.type2
    );
  };
  componentDidUpdate() {
    if (this.state.isLoaded === false) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,
        1, //force OrderBy
        this.state.type2
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
        1, //force OrderBy
        this.state.type2
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page,
      1, //force OrderBy
      this.state.type2
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

          {/* <Label>{i18n.t("report.platform")}</Label>
          <CustomFormControl style={{ width: "160px" }}>
            <Select
              native
              value={this.state.type2}
              onChange={this.onhandleType2Change}
              variant="outlined"
            >
              <option value={0}>{i18n.t("report.all")}</option>

              {(() => {


                return this.props.gameList.map((row) => {

                  return (
                    <option value={row.id} key={row.id}>

                      {row.name}
                    </option>
                  );
                });
              })()}


            </Select>
          </CustomFormControl> */}
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="transfer"
            page={this.state.page}
            rows={this.props.transferReportList.list}
            total={this.props.transferReportList.count}
            onhandleChangePage={this.handleChangePage}
          />
        </InnerWrap>
      </Container>
    );
  }
}

export default TransferReport;
