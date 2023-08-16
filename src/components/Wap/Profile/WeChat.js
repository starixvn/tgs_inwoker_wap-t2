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
class WeChat extends BaseProfile {
  state = {
    wechat: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_wechat) isConfigured = true;
    this.setState({
      wechat: isConfigured ? this.props.account.info.member_wechat : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ wechat: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.wechat;
  };
  handleSubmitClicked = () => {
    const wechat = this.state.wechat;
    //validate here
    //sdasdasdasda
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!wechat.match(re)) {
      this.props.alert("", i18n.t("profile.wechat.msgInvalidWeChat"));
      // this.props.enqueueSnackbar("微信号码格式不正确", {
      //   key: "error"
      // });
      return;
    }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(wechat, "wechat", "wechat")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                wechat: wechat,
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
      i18n.t("common.wechatNumber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.wechat}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.wechat.plsEnterWechat")}
        label={i18n.t("common.wechatNumber")}
        disabled={
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
            ? true
            : false
        }
        isCustomProfileStyle={config.brand === "WGHK"}
      ></Textbox>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.configured")
        : this.state.wechat !== this.props.account.member_wechat &&
            i18n.t("common.complete"),
      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.wechat.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.wechat.here"
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WeChat));
