import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomDatePicker from "./CustomDatePicker";
import addDays from "date-fns/addDays";
import i18n from "../../../../utils/i18n";
const Container = styled.div`
  width: 100%;
  color: #151a34;
  font-size: 14px;
`;

const TabButton = styled.div`
  width: 72px;
  height: 35px;
  font-size: 14px;
  border-radius: 12px;
  background-color: #f7f7f7;
  text-align: center;
  padding-top: 8px;
  float: left;
  margin-left: 20px
  &:hover {
    background-color: #f0ca83;
    color:#fff;
    box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.3);
  }
    ${(props) =>
      props.active
        ? ` border: solid 1px #8a7f73;
      background-color:#f0ca83;
      box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.18);
      `
        : ` border: solid 1px #151a34;
      `};
  &:hover {
    cursor: pointer;
  }
`;
const DatePicker = styled(CustomDatePicker)``;
const Label = styled.span`
  float: left;
  margin: 10px 20px 0 0;
`;
const LabelDash = styled.span`
  float: left;
  margin: 10px 20px;
`;
var moment = require("moment");
class DateSelection extends Component {
  state = {
    dateFrom: this.props.defaultDateFrom,
    dateTo: this.props.defaultDateTo,
    dateRange: -1,
  };

  callbackDateChange = (from, to) => {
    this.props.onhandleDateChange({
      dateFrom: moment(from).format("YYYY-MM-DD"),
      dateTo: moment(to).format("YYYY-MM-DD"),
    });
  };

  handleDateFromChange = (e) => {
    this.callbackDateChange(e, this.state.dateTo);

    this.setState({
      ...this.state,
      dateFrom: e,
      dateRange: -1,
    });
  };
  handleDateToChange = (e) => {
    this.callbackDateChange(this.state.dateFrom, e);

    this.setState({
      ...this.state,
      dateTo: e,
      dateRange: -1,
    });
  };

  handleTodayClick = (date) => {
    let today = new Date();

    this.setState({
      ...this.state,
      dateFrom: today,
      dateTo: today,
      dateRange: 0,
    });
    this.callbackDateChange(today, today);
  };
  handleWeeklyClick = () => {
    let today = new Date();
    let newdateFrom = addDays(today, -7);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 1,
    });
    this.callbackDateChange(newdateFrom, today);
  };
  handleMontlyClick = () => {
    let today = new Date();
    let newdateFrom = addDays(today, -30);

    this.setState({
      ...this.state,
      dateFrom: newdateFrom,
      dateTo: today,
      dateRange: 2,
    });
    this.callbackDateChange(newdateFrom, today);
  };
  render() {
    return (
      <Container>
        <Label>{i18n.t("report.date")}</Label>
        <DatePicker
          onhandleDateChange={this.handleDateFromChange}
          selectedDate={this.state.dateFrom}
          maxDate={this.state.dateTo}
          minDate={this.props.minDate}
        ></DatePicker>
        <LabelDash>-</LabelDash>
        <DatePicker
          maxDate={this.props.maxDate}
          minDate={this.state.dateFrom}
          onhandleDateChange={this.handleDateToChange}
          selectedDate={this.state.dateTo}
        ></DatePicker>
        <TabButton
          onClick={this.handleTodayClick}
          active={this.state.dateRange === 0}
        >
          {i18n.t("report.today")}
        </TabButton>
        <TabButton
          onClick={this.handleWeeklyClick}
          active={this.state.dateRange === 1}
        >
          {i18n.t("report.oneWeek")}
        </TabButton>
        <TabButton
          onClick={this.handleMontlyClick}
          active={this.state.dateRange === 2}
        >
          {i18n.t("report.oneMonth")}
        </TabButton>
      </Container>
    );
  }
}

export default connect()(DateSelection);
