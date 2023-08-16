import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  height: 115px;
  width: 100%;
  margin-top: 16px;
  background-color: #f7f7f7;
  float: left;
  padding: 10px;
`;

const Label = styled.span`
  float: left;
  margin: 20px 20px 0 0;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "135px",
    height: "35px",
    marginTop: "10px",
    marginRight: "5px",
    float: "left",
    borderRadius: "12px",
    boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
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

class AccountDetails extends Component {
  state = {
    isLoaded: false,
    type: 0,
    status: 0,
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
      this.state.type
    );
  };

  onhandleTypeChange = (e) => {
    this.setState({ ...this.state, type: e.target.value, page: 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
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
      this.state.type
    );
  };
  componentDidUpdate() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo,
        this.state.page,

        this.state.type
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

        this.state.type
      );
    }
  }
  handleChangePage = (page) => {
    this.setState({ ...this.state, page: page + 1 });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      page + 1,

      this.state.type
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
          <Label>{i18n.t("report.platform")}</Label>
          <CustomFormControl style={{ width: "160px" }}>
            <Select
              native
              value={this.state.type}
              onChange={this.onhandleTypeChange}
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
          </CustomFormControl>
        </FilterContainer>

        <TableList
          type="account"
          page={this.state.page}
          rows={this.props.accountList.list}
          total={this.props.accountList.count}
          onhandleChangePage={this.handleChangePage}
        />
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
export default AccountDetails;
