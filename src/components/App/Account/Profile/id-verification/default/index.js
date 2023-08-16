import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../../../Share/TextField";
import CustomButton from "../../../../../Share/Button";
import IconInputIDPNG from "../../../../../../assets/images/icon-input-id.png";
import IconInputReceivePNG from "../../../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";

import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
const Container = styled.div``;

const InputWrapper = styled.div`
  background: #fff;
  border: solid 1px #b6b6b6;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 4px;
  width: 350px;
  display: inline-block;
`;

function Default(props) {
  const allowEdit = props.edit ? false : props.account.info.check_pass_account;
  return (
    <Container>
      <CustomTextField
        placeholder={
          config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.enterFullName")
            : i18n.t("profile.nameVerify.msgPlsEnterName")
        }
        adornment={IconInputReceivePNG}
        handleTextFieldChange={props.onhandleNameChange}
        defaultValue=""
        readOnly={allowEdit}
        maxLength={256}
      ></CustomTextField>

      {(() => {
        if (config.features.ICVerification) {
          return (
            <>
              <CustomTextField
                placeholder={
                  config.features.Profile_CustomIdentityPageTranslation
                    ? i18n.t("piso.profile.enterDocumentNumber")
                    : i18n.t("profile.nameVerify.msgPlsEnterICNum")
                }
                adornment={IconInputIDPNG}
                handleTextFieldChange={props.onhandleIDChange}
                defaultValue={props.account.info.member_card_no}
                readOnly={allowEdit}
                maxLength={256}
              ></CustomTextField>
              {config.features.ICVerificationUpload && (
                <InputWrapper style={{ padding: 5 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => {
                        document.getElementById("getFile").click();
                      }}
                      style={{ marginRight: 10, height: 30 }}
                    >
                      {i18n.t("common.upload")}
                    </button>
                    <input
                      type="file"
                      id="getFile"
                      onChange={props.handleFileChange}
                      accept="image/jpg, image/jpeg, image/png, image/tiff"
                      style={{ display: "none" }}
                    />
                    {props.icUpload[0] ? props.icUpload[0].name : ""}
                  </div>
                </InputWrapper>
              )}
            </>
          );
        }
      })()}
      {(() => {
        if (!props.check_pass_account || !allowEdit) {
          return (
            <CustomButton
              name={i18n.t("common.submit")}
              handleClick={props.onhandleClick}
            ></CustomButton>
          );
        } else return null;
      })()}
    </Container>
  );
}

export default connect(null, null)(withSnackbar(Default));
