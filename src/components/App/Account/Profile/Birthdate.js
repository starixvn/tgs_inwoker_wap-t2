import React, { useState } from "react";

import styled from "styled-components";
import CustomButton from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import { AccountService } from "../../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import { withSnackbar } from "notistack";
import config from "../../../../config/config";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomDatePicker from "../Report/CustomDatePicker";
import moment from "moment";
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

const Container = styled.div``;

const Datepicker = styled(CustomDatePicker)``;

const DatepickerWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${({ disabled }) => {
    return disabled && ` pointer-events: none;`;
  }}
`;

const Birthdate = (props) => {
  const [birthDate, setBirthDate] = useState(
    moment(
      props.account.info.member_birthdate
        ? props.account.info.member_birthdate
        : new Date()
    ).format("YYYY/MM/DD")
  );

  const handleDateChange = (e) => {
    if (moment(e).isAfter(new Date())) {
      setBirthDate(moment(new Date()).format("YYYY/MM/DD"));
    } else {
      setBirthDate(moment(e).format("YYYY/MM/DD"));
    }
  };

  const onhandleClick = () => {
    AccountService.SetBirthDate(birthDate).then((response) => {
      if (response.IsSuccess) {
        props.dispatch({
          type: UPDATE_INFO,
          payload: {
            member_birthdate: birthDate,
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
    props.account.info.member_birthdate !== "" &&
    props.account.info.member_birthdate !== null;

  return (
    <Container>
      <DatepickerWrapper
        disabled={ifNotEmpty && config.features.Profile_SetUpBirthdateOnce}
      >
        <Datepicker
          onhandleDateChange={handleDateChange}
          selectedDate={birthDate}
        ></Datepicker>
      </DatepickerWrapper>

      {ifNotEmpty && config.features.Profile_SetUpBirthdateOnce && (
        <Content>
          {i18n.t("profile.birthdate.toEdit")}
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

      { ((!ifNotEmpty) || !config.features.Profile_SetUpBirthdateOnce)  && (
          <CustomButton
            style={{ marginTop: 10 }}
            name={i18n.t("common.submit")}
            handleClick={onhandleClick}
          ></CustomButton>
        )}
    </Container>
  );
};

export default connect(null, null)(withSnackbar(Birthdate));
