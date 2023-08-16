import React, { Component } from "react";
import styled from "styled-components";

import IconBonusRedPNG from "../../../../assets/images/icon-bonus-active.png";
import Details from "./Details";
import i18n from "../../../../utils/i18n";
import { withSnackbar } from "notistack";

import { FormControl, Select } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { GeneralService } from "../../../../api-services/services/GeneralService";

const CustomTable = styled(Table)`
  white-space: nowrap;
  table-layout: fixed;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: auto;
  width: ${({ isTransactionReport }) => {
    return isTransactionReport ? "auto" : "100%";
  }};
`;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "5px 20px 5px 20px",
  },
  body: {
    fontSize: 14,
    padding: "5px 20px 5px 20px",
    width: "auto",
    color: "#7b7b7b",
  },
}))(TableCell);
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #ffffff;
  width: 100%;
  min-height: 796px;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconBonusRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;

const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const RebateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "47.63px",
    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
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

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);

class Affiliate extends Component {
  state = {
    tab: 1,
    rebateType: 1,
    rebates: [],
  };

  componentDidMount() {
    if (this.props.token != null) {
    }

    if (this.state.rebates === null || this.state.rebates.length === 0) {
      GeneralService.GetBrandAllAgent().then((res) => {
        console.log(res);
        if (res.IsSuccess) {
          console.log(res);
          this.setState({
            ...this.state,
            rebates: res.data,
          });
        }
      });
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
    }
  }

  handleTabClick = (tab) => {
    this.setState({ ...this.state, tab: tab });
  };

  render() {
    const type = [
      { value: 1, title: "sport" },
      { value: 2, title: "virtualsports" },
      { value: 5, title: "livedealer" },
      { value: 7, title: "chess" },
      { value: 13, title: "lottery" },
      { value: 15, title: "egame" },
    ];
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("affiliate.title")}
        </Title>

        <InnerWrap>
          <div>
            <Details
              list={this.state.newBonusList}
              onhandleReceiveBonus={this.handleReceiveBonus}
            />
          </div>{" "}
          <RebateContent>
            <div>{i18n.t("rebateRate.title")}</div>
            <div>
              <CustomFormControl>
                <CustomSelect
                  variant="outlined"
                  displayEmpty
                  native
                  className="fix-text-cut"
                  value={this.state.rebateType}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      rebateType: e.target.value,
                    });
                  }}
                >
                  {type.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {i18n.t(`common.${item.title}`)}
                      </option>
                    );
                  })}
                </CustomSelect>
              </CustomFormControl>
            </div>
            <div>
              <CustomTable aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {i18n.t("rebateRate.players")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {i18n.t("rebateRate.turnover")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {i18n.t("rebateRate.rebates")} (%)
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rebates
                    .filter((item) => {
                      if (this.state.rebateType === 0) {
                        return true;
                      } else {
                        return (
                          item.allagentgametype.toString() ===
                          this.state.rebateType.toString()
                        );
                      }
                    })
                    .map((data, index) => {
                      return (
                        <TableRow>
                          <StyledTableCell>
                            {data.rebatepercentage}
                          </StyledTableCell>{" "}
                          <StyledTableCell>
                            {data.rebatepercentage}
                          </StyledTableCell>{" "}
                          <StyledTableCell>
                            {data.rebatepercentage}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </CustomTable>
            </div>
          </RebateContent>
        </InnerWrap>
      </Container>
    );
  }
}

export default withSnackbar(Affiliate);
