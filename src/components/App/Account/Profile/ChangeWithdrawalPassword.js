import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import CustomButton from "../../../Share/Button";
import TextField from "@material-ui/core/TextField";
import IconInputVerifyCodePNG from "../../../../assets/images/icon-input-verifycode.png";
import { withStyles } from "@material-ui/core/styles";
import { AccountService } from "../../../../api-services/services/AccountService";
import CustomTextField from "../../../Share/TextField";
import Password1IconPNG from "../../../../assets/images/password1-icon.png";

import i18n from "../../../../utils/i18n";

import { withSnackbar } from "notistack";
const Container = styled.div``;
const CustomText = withStyles({
  root: {
    marginTop: "10px",
    float: "left",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      color: "#b6b6b6",
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
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);

class ChangeWithdrawalPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: "1",
      email: this.props.email ? this.props.email : "",
      securityKey: "",
      code: "",
      newpassword: "",
      confirmpassword: "",
      getCodeClicked: false,
    };
  }
  onhandleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.target.value });
  };
  onhandleCodeChange = (e) => {
    this.setState({ ...this.state, code: e.target.value });
  };
  onhandleNewPasswordChange = (e) => {
    this.setState({ ...this.state, newpassword: e.target.value });
  };
  onhandleConfirmPasswordChange = (e) => {
    this.setState({ ...this.state, confirmpassword: e.target.value });
  };
  onhandleGetCodeClick = () => {
    AccountService.GetChangeWithdrawalPasswordVerificationCode().then(
      (response) => {
        if (response.IsSuccess) {
          this.setState({ securityKey: response.data, getCodeClicked: true });
          this.props.enqueueSnackbar(i18n.t("common.msgTokenSent"), {
            variant: "info",
          });
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
        }
      }
    );
  };
  onhandleNextStep = () => {
    if (this.state.code !== "") {
      this.setState({
        step: "2",
      });
      this.props.handleChangeTitle(
        i18n.t("profile.changePassword.editPassword")
      );
    } else {
      this.props.enqueueSnackbar(i18n.t("common.msgEnterCode"), {
        variant: "error",
      });
    }
  };
  onhandleBackClick = () => {
    this.setState({
      step: "1",
      code: "",
      newpassword: "",
      confirmpassword: "",
    });
    this.props.handleChangeTitle(i18n.t("profile.emailVerification"));
  };
  onhandleSubmit = () => {
    var expr = /^.{6,20}$/;
    if (!expr.test(this.state.newpassword)) {
      this.props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "error",
      });
      return;
    }
    if (this.state.newpassword !== this.state.confirmpassword) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidConfirmPass"), {
        variant: "error",
      });
    } else {
      AccountService.ChangeWithdrawalPassword(
        this.state.newpassword,
        this.state.code,
        this.state.securityKey
      ).then((response) => {
        if (response.IsSuccess) {
          this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
            variant: "success",
          });
          this.props.handleCloseDialog();
        } else {
          this.props.enqueueSnackbar(response.info, {
            variant: "error",
          });
          // if (response.code === 405) {
          //   this.props.enqueueSnackbar(i18n.t("common.msgInvalidPhoneCode"), {
          //     variant: "error",
          //   });
          // } else {
          //   this.props.enqueueSnackbar(response.info, {
          //     variant: "error",
          //   });
          // }
        }
      });
    }
  };

  render() {
    return (
      <>
        {this.state.step == "1" ? (
          <Container>
            <CustomText
              value={this.state.email}
              onChange={this.onhandleEmailChange}
              inputProps={{
                maxLength: 20,
              }}
              style={{
                width: "100%",
                height: "46px",
              }}
              variant="outlined"
              autoComplete="off"
              disabled={true}
            ></CustomText>
            <CustomText
              placeholder={i18n.t("common.msgEnterCode")}
              adornment={IconInputVerifyCodePNG}
              onChange={this.onhandleCodeChange}
              variant="outlined"
              autoComplete="off"
              value={this.state.code}
              type={"text"}
              style={{
                width: "208px",
                height: "46px",
              }}
            ></CustomText>
            <CustomButton
              handleClick={this.onhandleGetCodeClick}
              name={i18n.t("common.msgSendToken")}
              width={140}
              marginTop={10}
              float={"right"}
            ></CustomButton>
            <CustomButton
              name={i18n.t("common.nextStep")}
              handleClick={this.onhandleNextStep}
            ></CustomButton>
          </Container>
        ) : (
          <>
            <Container>
              <CustomTextField
                placeholder={i18n.t("common.msgEnterNewPass")}
                adornment={Password1IconPNG}
                handleTextFieldChange={this.onhandleNewPasswordChange}
                value={this.state.newpassword}
                type="password"
              ></CustomTextField>
              <CustomTextField
                placeholder={i18n.t("common.ConfirmPass")}
                adornment={Password1IconPNG}
                handleTextFieldChange={this.onhandleConfirmPasswordChange}
                value={this.state.confirmpassword}
                type="password"
              ></CustomTextField>
              <CustomButton
                width={170}
                float={"left"}
                name={i18n.t("common.back")}
                handleClick={this.onhandleBackClick}
              ></CustomButton>
              <CustomButton
                name={i18n.t("common.submit")}
                handleClick={this.onhandleSubmit}
                width={170}
                float={"left"}
              ></CustomButton>
            </Container>
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps
)(withSnackbar(ChangeWithdrawalPassword));
