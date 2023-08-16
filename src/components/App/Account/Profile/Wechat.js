import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import CustomButton from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import { AccountService } from "../../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import { withSnackbar } from "notistack";
import IconInputReceivePNG from "../../../../assets/images/icon-input-receive.png";

import { Link } from "react-router-dom";
import config from "../../../../config/config";
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 90px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
const Container = styled.div``;

const Wechat = (props) => {
  const [wechat, setWeChat] = useState(
    props.account.info.member_wechat ? props.account.info.member_wechat : ""
  );

  const onhandleTextChange = (e) => {
    setWeChat(e.target.value);
  };

  const onhandleClick = () => {
    const re = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    if (!wechat.match(re)) {
      props.enqueueSnackbar(i18n.t("profile.wechat.msgInvalidWeChat"), {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateIM(wechat, "wechat", "wechat").then((response) => {
      if (response.IsSuccess) {
        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_wechat: wechat,
          },
        });
        props.handleCloseDialog();
      } else {
        props.enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
          variant: "error",
        });
      }
    });
  };

  var ifNotEmpty =
    props.account.info.member_wechat !== "" &&
    props.account.info.member_wechat !== null;
  return (
    <Container>
      <CustomTextField
        placeholder={i18n.t("profile.wechat.weChatAccount")}
        adornment={IconInputReceivePNG}
        handleTextFieldChange={onhandleTextChange}
        defaultValue={wechat}
        type={"text"}
        readOnly={
          ifNotEmpty &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        }
      ></CustomTextField>
      {ifNotEmpty &&
        (config.features.ChangesNotAllowed ||
          config.features.Profile_ExistingDetails_ViewOnly) && (
          <Content>
            {i18n.t("profile.wechat.toEdit")}
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
        )}

      {!(
        ifNotEmpty &&
        (config.features.ChangesNotAllowed ||
          config.features.Profile_ExistingDetails_ViewOnly)
      ) && (
        <CustomButton
          name={i18n.t("common.submit")}
          handleClick={onhandleClick}
        ></CustomButton>
      )}
    </Container>
  );
};

export default connect(null, null)(withSnackbar(Wechat));
