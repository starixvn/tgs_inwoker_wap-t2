import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import i18n from "../../../../utils/i18n";
import TransferReportList from "./TransferReportList";
import JoinedReportList from "./JoinedReportList";
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
const Label = styled.span`
  float: left;
  margin: 20px 5px 0 0;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "135px",
    height: "40px",
    marginTop: "10px",
    marginRight: "5px",
    float: "left",
    broder: "solid 2px #000",
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

class JoinedPromoReport extends Component {
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

  onhandleDateChange = (dateRange) => {
    this.setState({ ...this.state, dateRange: dateRange, page: 1 });
    this.props.onhandleGetReportTrigger(
      dateRange.dateFrom,
      dateRange.dateTo,
      1
    );
  };
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
          <div className="clear"></div>
        </FilterContainer>
        <InnerWrap>
          <TableList
            type="joinedPromo"
            page={this.state.page}
            rows={this.props.joinedReport.list}
            total={this.props.joinedReport.count}
            onhandleChangePage={this.handleChangePage}
          />
        </InnerWrap>
      </Container>
    );
  }
}

export default JoinedPromoReport;
