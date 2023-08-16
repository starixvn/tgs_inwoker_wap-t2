import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import i18n from "../../../utils/i18n";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import BaseProfile from "./BaseProfile";
import config from "../../../config/config";
import BottomNote from "../Share/BottomNote";

class QQ extends BaseProfile {
  state = {
    qq: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_qq) isConfigured = true;
    this.setState({
      qq: isConfigured ? this.props.account.info.member_qq : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ qq: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.qq;
  };

  handleSubmitClicked = () => {
    const qq = this.state.qq;
    //validate here
    //sdasdasdasda
    const re = new RegExp("^[1-9]\\d{4,14}$");
    if (!qq.match(re)) {
      this.props.alert("", i18n.t("profile.qq.msgInvalidQQ"));
      // this.props.enqueueSnackbar("QQ号码格式不正确", {
      //   key: "error"
      // });
      return;
    }

    this.showLoading(true);
    //api
    AccountService.UpdateIM(qq, "qq", "qq")
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                qq: qq,
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
      i18n.t("common.qqNumber"),
      <Textbox
        style={{ margin: "50px auto 20px auto" }}
        value={this.state.qq}
        onChange={this.handleChangeNumber}
        placeholder={i18n.t("profile.qq.plsEnterQQ")}
        disabled={
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
            ? true
            : false
        }
        type={"text"}
        label={i18n.t("common.qqNumber")}
        isCustomProfileStyle={config.brand === "WGHK"}
      ></Textbox>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.configured")
        : this.state.qq !== this.props.account.member_qq &&
            i18n.t("common.complete"),

      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.qq.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.qq.here"
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QQ));
