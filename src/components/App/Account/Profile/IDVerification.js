import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";
import IconInputIDPNG from "../../../../assets/images/icon-input-id.png";
import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";
import { AccountService } from "../../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../../api-services/constant/actionType";
import { Link } from "react-router-dom";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
const Container = styled.div``;
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 90px;
  padding: 0 30px;
  color: #404040;
`;
const LabelLink = styled(Link)`
  color: #f0ca83;
  text-decoration: none;
`;

const InputWrapper = styled.div`
  background: #fff;
  border: solid 1px #b6b6b6;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 12px;
  width: 350px;
  display: inline-block;
`;

function IDVerification(props) {
  const [memberName, setMemberName] = useState(props.account.info.member_name);
  const [memberCard, setMemberCard] = useState(
    props.account.info.member_card_no
  );

  const [icUpload, setICUpload] = useState("");

  const onhandleNameChange = (e) => {
    setMemberName(e.target.value);
  };
  const onhandleIDChange = (e) => {
    setMemberCard(e.target.value);
  };

  const onhandleClick = () => {
    if (memberName === "" || memberName === null) {
      props.enqueueSnackbar(i18n.t("profile.nameVerify.msgPlsEnterName"), {
        variant: "error",
      });
      return;
    }
    if (memberCard === "" || memberCard === null) {
      props.enqueueSnackbar(i18n.t("profile.nameVerify.msgPlsEnterICNum"), {
        variant: "error",
      });
      return;
    }

    if (config.features.ICVerificationUpload && icUpload === "") {
      props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
        variant: "error",
      });
      return;
    }

    AccountService.AddRealName(memberName, memberCard).then((response) => {
      if (response.IsSuccess) {
        //upload IC when membername and memberic is valid.
        if (config.features.ICVerificationUpload) {
          AccountService.UploadIC(icUpload[0]).then((response) => {
            if (!response.IsSuccess) {
              props.enqueueSnackbar(
                ErrorSwitcher.getTranslation(response.info),
                {
                  variant: "error",
                }
              );
            }
          });
        }

        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_name: memberName,
          },
        });
        props.handleCloseDialog();
      } else {
        props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
          variant: "error",
        });
        // if (response.code === 401) {
        //   props.enqueueSnackbar(i18n.t("profile.nameVerify.msgInvalidICNum"), {
        //     variant: "error",
        //   });
        // } else {
        //   props.enqueueSnackbar(response.info, {
        //     variant: "error",
        //   });
        // }
      }
    });
  };
  var check_pass_account = false;
  if (config.features.ICVerification) {
    if (
      props.account.info.member_name !== "" &&
      props.account.info.member_name !== null
    ) {
      check_pass_account = props.account.info.check_pass_account;
    }
  } else {
    check_pass_account = props.account.info.check_pass_account;
  }

  function handleFileChange(e) {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 5120) {
        props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        setICUpload(files);
      }
    }
  }
  return (
    <Container>
      <CustomTextField
        placeholder={
          config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.enterFullName")
            : i18n.t("profile.nameVerify.msgPlsEnterName")
        }
        adornment={IconInputReceivePNG}
        handleTextFieldChange={onhandleNameChange}
        defaultValue={check_pass_account ? props.account.info.member_name : ""}
        readOnly={check_pass_account}
        maxLength={256}
      ></CustomTextField>

      {(() => {
        if (check_pass_account === false) {
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
                  handleTextFieldChange={onhandleIDChange}
                  defaultValue={props.account.info.member_card_no}
                  readOnly={props.account.info.check_pass_account}
                  maxLength={256}
                ></CustomTextField>
                {config.features.ICVerificationUpload && (
                  <InputWrapper
                    style={{ padding: "6.5px 10px", borderRadius: 12 }}
                  >
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
                        onChange={handleFileChange}
                        accept="image/jpg, image/jpeg, image/png, image/tiff"
                        style={{ display: "none" }}
                      />
                      {icUpload[0] ? icUpload[0].name : ""}
                    </div>
                  </InputWrapper>
                )}
              </>
            );
          }
        } else {
          return (
            <Content>
              {i18n.t("profile.nameVerify.toEdit")}
              {
                <LabelLink
                  onClick={() =>
                    props.handleCSClick(
                      props.account.info.member_username,
                      props.account.info.member_username
                    )
                  }
                >
                  {i18n.t("common.customerService")}
                </LabelLink>
              }
            </Content>
          );
        }
      })()}
      {(() => {
        if (check_pass_account === false) {
          return (
            <CustomButton
              name={i18n.t("common.submit")}
              handleClick={onhandleClick}
            ></CustomButton>
          );
        } else return null;
      })()}
    </Container>
  );
}

export default connect(null, null)(withSnackbar(IDVerification));
