import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../../../Share/Textbox";
import i18n from "../../../../../utils/i18n";

import BaseProfile from "./../../BaseProfile";
import styled from "styled-components";

import { accountAction } from "../../../../../api-services/actions/accountAction";
import { RESET_ACCOUNTRESULT } from "../../../../../api-services/constant/actionType";
import config from "../../../../../config/config";

const AnotherWrapper = styled.div`
  width: 700px;
  min-height: 170px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  background: #fff;

  width: 700px;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 16px;
  width: 100%;
`;

const CustomLabel = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `30px` : `24px`)};
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;

class Default extends BaseProfile {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: this.props.icUpload,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.props.name}
          onChange={this.props.handleChangeName}
          placeholder={
            config.features.Profile_CustomIdentityPageTranslation
              ? i18n.t("piso.profile.enterFullName")
              : i18n.t("profile.nameVerify.title")
          }
          label={
            config.features.Profile_CustomIdentityPageTranslation
              ? i18n.t("piso.profile.fullName")
              : i18n.t("profile.nameVerify.verifyName")
          }
          disabled={false}
          maxLength={256}
          isCustomProfileStyle={config.brand === "WGHK"}
        ></Textbox>
        {config.features.ICVerification && (
          <Textbox
            style={{ margin: "50px auto 20px auto" }}
            value={this.props.ic}
            onChange={this.props.handleChangeIC}
            placeholder={
              config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.enterDocumentNumber")
                : i18n.t("profile.nameVerify.msgEnterICNum")
            }
            label={
              config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.documentNumber")
                : i18n.t("profile.nameVerify.icNum")
            }
            disabled={false}
            maxLength={256}
            isCustomProfileStyle={config.brand === "WGHK"}
          ></Textbox>
        )}

        {config.features.ICVerificationUpload && (
          <AnotherWrapper>
            <CustomLabel>{i18n.t("common.upload")}</CustomLabel>
            <InputWrapper style={{ padding: 10 }}>
              <button
                onClick={() => {
                  document.getElementById("getFile").click();
                }}
                style={{
                  marginRight: 10,
                  height: 80,
                  minWidth: 200,
                  fontSize: 24,
                }}
              >
                {i18n.t("common.upload")}
              </button>
              <input
                type="file"
                id="getFile"
                onChange={this.props.handleFileChange}
                accept="image/jpg, image/jpeg, image/png, image/tiff"
                style={{ display: "none" }}
              />
              {this.props.icUpload ? this.props.icUpload[0].name : ""}
            </InputWrapper>
          </AnotherWrapper>
        )}
      </React.Fragment>
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (name, number) =>
      dispatch(accountAction.updateMemberCardNo(name, number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Default));
