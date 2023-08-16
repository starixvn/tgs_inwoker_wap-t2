import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "../../../utils/i18n";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import BaseProfile from "./BaseProfile";
import config from "../../../config/config";
import BottomNote from "../Share/BottomNote";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import styled from "styled-components";

const moment = require("moment");
const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

const DatepickerWrapper = styled.div`
  padding: 40px 40px 0 40px;
`;

const CustomDatepicker = styled.div`
  ${({ disabled }) => {
    return disabled && `pointer-events: none;`;
  }}
  background: white;
  zoom: ${() => (config.brand === "WGHK" ? "1.0" : "1.5")};
  padding: ${() => (config.brand === "WGHK" ? "20px 20px" : "10px 20px")};
  border-radius: 8px;
  margin-top: 10px;

  .MuiInputBase-input {
    background: none;
    ${() =>
      config.brand === "WGHK" ? `font-size: 28px; font-weight: 400;` : ``}
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const CustomLabel = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `30px` : `24px`)};
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;

class Birthdate extends BaseProfile {
  state = {
    birthdate: moment(
      this.props.account.info.member_birthdate
        ? this.props.account.info.member_birthdate
        : new Date()
    ).format("YYYY/MM/DD"),
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_birthdate) isConfigured = true;
    this.setState({
      birthdate: isConfigured ? this.props.account.info.member_birthdate : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    if (moment(e).isAfter(new Date())) {
      this.setState({ birthdate: moment(new Date()).format("YYYY/MM/DD") });
    } else {
      this.setState({ birthdate: moment(e).format("YYYY/MM/DD") });
    }

    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.birthdate;
  };

  handleSubmitClicked = () => {
    this.showLoading(true);
    //api
    AccountService.SetBirthDate(this.state.birthdate)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                birthdate: this.state.birthdate,
                isConfigured: true,
              });
            }
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
            this.showLoading(false);
          });
        } else {
          this.props.alert("", response.msg);
          this.showLoading(false);
          // this.props.enqueueSnackbar(response.msg, {
          //   key: "error"
          // });
        }
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("profile.birthdate.title"),
      <div>
        <DatepickerWrapper>
          <CustomLabel>{i18n.t("profile.birthdate.title")}</CustomLabel>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[i18n.language.substring(0, 2)]}
          >
            <CustomDatepicker
              disabled={
                this.state.isConfigured &&
                config.features.Profile_SetUpBirthdateOnce
              }
            >
              <DatePicker
                maxDate={new Date()}
                invalidDateMessage={false}
                format="yyyy/MM/dd"
                value={this.state.birthdate}
                onChange={this.handleChangeNumber}
              />
            </CustomDatepicker>
          </MuiPickersUtilsProvider>
        </DatepickerWrapper>
      </div>,

      this.state.isConfigured && config.features.Profile_SetUpBirthdateOnce
        ? i18n.t("common.configured")
        : this.state.birthdate !== this.props.account.member_birthdate &&
            i18n.t("common.complete"),

      (() => {
        if (
          this.state.isConfigured &&
          config.features.Profile_SetUpBirthdateOnce
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.birthdate.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.Profile_SetUpBirthdateOnce
                  ? "common.customerService"
                  : "profile.birthdate.here"
              )}
            ></BottomNote>
          );
        }
      })()
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Birthdate));
