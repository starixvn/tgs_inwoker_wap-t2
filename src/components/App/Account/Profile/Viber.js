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

const Viber = (props) => {
  const [viber, setViber] = useState(
    props.account.info.member_viber ? props.account.info.member_viber : ""
  );

  const onhandleTextChange = (e) => {
    setViber(e.target.value);
  };

  const onhandleClick = () => {
    // const re = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
    // if (!viber.match(re)) {
    //   props.enqueueSnackbar(i18n.t("profile.viber.msgInvalidViber"), {
    //     variant: "error",
    //   });
    //   return;
    // }

    AccountService.UpdateIM(viber, "viber", "viber").then((response) => {
      if (response.IsSuccess) {
        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_viber: viber,
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
    props.account.info.member_viber !== "" &&
    props.account.info.member_viber !== null;
  return (
    <Container>
      <CustomTextField
        placeholder={i18n.t("profile.viber.viberAccount")}
        adornment={IconInputReceivePNG}
        handleTextFieldChange={onhandleTextChange}
        defaultValue={viber}
        type={"text"}
        readOnly={
          ifNotEmpty &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        }
        maxLength={15}
      ></CustomTextField>
      {ifNotEmpty &&
        (config.features.ChangesNotAllowed ||
          config.features.Profile_ExistingDetails_ViewOnly) && (
          <Content>
            {i18n.t("profile.viber.toEdit")}
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

export default connect(null, null)(withSnackbar(Viber));
