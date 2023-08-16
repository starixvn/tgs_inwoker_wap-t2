import React, { Component } from "react";
import styled from "styled-components";

import addDays from "date-fns/addDays";
import DateSelection from "./DateSelection";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import DailyReportList from "./DailyReportList";
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
  width: 935px;
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
    width: "135px",
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

class DailyReport extends Component {
  state = {
    isLoaded: false,
    type: 0,
    type2: 0,
    dateRange: {
      dateFrom: moment(addDays(new Date(), -7)).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
    },
  };
  onhandleDateChange = (dateRange) => {
    this.props.onhandleGetReportTrigger(dateRange.dateFrom, dateRange.dateTo);
    this.setState({ ...this.state, dateRange: dateRange });
  };
  onhandleTypeChange = (e) => {
    this.setState({
      ...this.state,
      type: parseInt(e.target.value),
      type2: 0,
      page: 1,
    });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      parseInt(e.target.value),
      0
    );
  };
  onhandleType2Change = (e) => {
    this.setState({ ...this.state, type2: e.target.value });
    this.props.onhandleGetReportTrigger(
      this.state.dateRange.dateFrom,
      this.state.dateRange.dateTo,
      this.state.type,
      e.target.value
    );
  };
  componentDidUpdate() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo
      );
    }
  }
  componentDidMount() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.props.onhandleGetReportTrigger(
        this.state.dateRange.dateFrom,
        this.state.dateRange.dateTo
      );
    }
  }

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
          <Label>类别</Label>
          <CustomFormControl>
            <Select
              native
              value={this.state.type}
              onChange={this.onhandleTypeChange}
              variant="outlined"
            >
              <option value={0}>全部</option>
              <option value={1}>体育</option>
              <option value={2}>彩票</option>
              <option value={3}>真人</option>
              <option value={4}>棋牌</option>
              <option value={5}>小游戏</option>
              <option value={6}>视频</option>
            </Select>
          </CustomFormControl>
          <Label>馆别</Label>
          <CustomFormControl style={{ width: "160px" }}>
            <Select
              native
              value={this.state.type2}
              onChange={this.onhandleType2Change}
              variant="outlined"
            >
              <option value={0}>全部</option>

              {(() => {
                let gameList = [];

                if (this.state.type === 0) {
                  gameList = this.props.gameList.filter(
                    (game) => game.purse_type !== 0 && game.parent_id == 0
                  );
                } else {
                  gameList = this.props.gameList.filter(
                    (game) =>
                      game.purse_type !== 0 &&
                      game.type == this.state.type &&
                      game.parent_id !== 0
                  );
                }

                return gameList.map((row) => {
                  return (
                    <option value={row.id} key={row.id}>
                      {/* {name} */}
                      {row.name}
                    </option>
                  );
                });
              })()}
            </Select>
          </CustomFormControl>
        </FilterContainer>
        <InnerWrap>
          <DailyReportList
            rows={this.props.dailyList.datas}
            total={this.props.dailyList.total}
          ></DailyReportList>
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
export default DailyReport;
