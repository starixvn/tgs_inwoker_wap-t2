import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import Textbox from "../Share/Textbox";

import BaseProfile from "./BaseProfile";
import i18n from "../../../utils/i18n";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import config from "../../../config/config";
import BottomNote from "../Share/BottomNote";
class Viber extends BaseProfile {
  state = {
    viber: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_viber) isConfigured = true;
    this.setState({
      viber: isConfigured ? this.props.account.info.member_viber : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ viber: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.viber;
  };
  handleSubmitClicked = () => {
    const viber = this.state.viber;
    //validate here
    //sdasdasdasda
    // const re = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    // if (!viber.match(re)) {
    //   this.props.alert(
    //     '',
    //     i18n.t('profile.viber.msgInvalidViber')
    //   )
    //   // this.props.enqueueSnackbar("微信号码格式不正确", {
    //   //   key: "error"
    //   // });
    //   return
    // }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(viber, "viber", "viber")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                viber: viber,
                isConfigured: true,
              });
            }
            this.showLoading(false);
            this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));
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
      i18n.t("common.viber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.viber}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.viber.plsEnterViber")}
        label={i18n.t("common.viber")}
        disabled={
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
            ? true
            : false
        }
        maxLength={15}
      ></Textbox>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.configured")
        : this.state.viber !== this.props.account.member_viber &&
            i18n.t("common.complete"),
      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.viber.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.viber.here"
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Viber));
