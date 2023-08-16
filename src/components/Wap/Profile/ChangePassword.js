import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import BaseProfile from "./BaseProfile";

import {AccountService} from "../../../api-services/services/AccountService";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
class ChangePassword extends BaseProfile {
  componentDidMount() {}
  handleChangeOldPassword = (e) => {
    this.setState({ ...this.state, oldpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword = (e) => {
    this.setState({ ...this.state, newpassword: e.target.value });
    this.onTextChanged();
  };
  handleChangeNewPassword2 = (e) => {
    this.setState({ ...this.state, newpassword2: e.target.value });
    this.onTextChanged();
  };

  handleSubmitClicked = (e) => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;
    var expr = /^.{6,20}$/;
    if (!expr.test(newpassword)) {
      this.props.alert('', i18n.t('common.msgRegisterPassInvalid'))
      return;
    }
    if (newpassword !== newpassword2) {
      this.props.alert('', i18n.t('common.msgInvalidConfirmPass'))
      return;
    } 
    // if (newpassword !== newpassword2) {
    //   this.props.alert("", i18n.t("common.msgInvalidConfirmPass"));
    //   // this.props.enqueueSnackbar("确认密码错误", {
    //   //   key: "error"
    //   // });
    //   return;
    // }
    this.showLoading(true);
    AccountService.UpdatePassword(oldpassword, newpassword)
      .then((response) => {
        if (response.IsSuccess) {
          this.updateInfo({});
          this.props.alert("", i18n.t("common.msgSuccessUpdateProfile"));

          this.props.appHistory.replace("/" + i18n.language + "/profile");
        } else {
          this.props.alert("", i18n.t("common.msgInvalidOldPass"));
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.props.alert("", err);
        // this.props.enqueueSnackbar(err, {
        //   key: "error"
        // });
        this.showLoading(false);
      });
    //this.setState({ ...this.state, currentStep: 2 });
  };
  isDisableButton = () => {
    const oldpassword = this.state.oldpassword;
    const newpassword = this.state.newpassword;
    const newpassword2 = this.state.newpassword2;

    const isDisableButton = !(oldpassword && newpassword && newpassword2);

    return isDisableButton;
  };
  render() {
    return this.setupContent(
      i18n.t("profile.changePassword.editPassword"),
      <React.Fragment>
        <Textbox
          type={"password"}
          style={{ margin: "50px auto 20px auto" }}
          value={this.state.oldpassword}
          onChange={this.handleChangeOldPassword}
          placeholder={i18n.t("profile.changePassword.msgEnterOriPass")}
          label={i18n.t("profile.changePassword.OriPass")}
          isCustomProfileStyle={config.brand === "WGHK"}
        ></Textbox>
        <Textbox
          type={"password"}
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.newpassword}
          onChange={this.handleChangeNewPassword}
          placeholder={i18n.t("common.msgEnterNewPass")}
          label={i18n.t("common.NewPass")}
          isCustomProfileStyle={config.brand === "WGHK"}
        ></Textbox>
        <Textbox
          type={"password"}
          style={{ margin: "20px auto 20px auto" }}
          value={this.state.newpassword2}
          onChange={this.handleChangeNewPassword2}
          placeholder={i18n.t("common.msgEnterConfirmPass")}
          label={i18n.t("common.ConfirmPass")}
          isCustomProfileStyle={config.brand === "WGHK"}
        ></Textbox>
      </React.Fragment>,
      i18n.t("common.complete")
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(ChangePassword));
