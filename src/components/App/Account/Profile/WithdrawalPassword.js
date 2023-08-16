import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";

import Password2IconPNG from "../../../../assets/images/password2-icon.png";
import IconInputNewpassPNG from "../../../../assets/images/icon-input-newpass.png";
import {AccountService} from "../../../../api-services/services/AccountService";
import {UPDATE_INFO} from "../../../../api-services/constant/actionType";

import { withSnackbar } from "notistack";
import i18n from "../../../../utils/i18n";
const Container = styled.div``;

class WithdrawalPassword extends Component {
  local_props = {
    old_password: "",
    password: "",
    rpassword: "",
  };
  onhandleOldPassChange = (e) => {
    this.local_props.old_password = e.target.value;
  };
  onhandlePass1Change = (e) => {
    this.local_props.password = e.target.value;
  };
  onhandlePass2Change = (e) => {
    this.local_props.rpassword = e.target.value;
  };
  onhandleClick = () => {
    var expr = /^.{6,20}$/;
    if (!expr.test(this.local_props.password)) {
      this.props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "error",
      });
      return;
    }

    if (this.local_props.rpassword !== this.local_props.password) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidConfirmPass"), {
        variant: "error",
      });
      return;
    }

    AccountService.AddWithdrawalPassword(this.local_props.password).then(
      (response) => {
        if (response.IsSuccess) {
          this.props.dispatch({
            type: UPDATE_INFO,
            payload: {
              member_safe_password: "set",
            },
          });
          this.props.handleCloseDialog();
          this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
            variant: "success",
          });
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
        }
      }
    );
  };
  render() {
    return (
      <Container>
        <CustomTextField
          placeholder={i18n.t("profile.withdrawalPassword.newPass")}
          adornment={IconInputNewpassPNG}
          handleTextFieldChange={this.onhandlePass1Change}
          type="password"
        ></CustomTextField>
        <CustomTextField
          placeholder={i18n.t("profile.withdrawalPassword.conPass")}
          adornment={Password2IconPNG}
          handleTextFieldChange={this.onhandlePass2Change}
          type="password"
        ></CustomTextField>
        {/* <CustomButton
          width={170}
          float={"left"}
          name={i18n.t("common.back")}
          handleClick={this.props.handleBackClick}
        ></CustomButton> */}
        <CustomButton
          // width={170}
          // float={"right"}
          name={i18n.t("common.submit")}
          handleClick={this.onhandleClick}
        ></CustomButton>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(WithdrawalPassword));
