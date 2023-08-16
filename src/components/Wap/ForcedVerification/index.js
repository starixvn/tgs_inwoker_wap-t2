import React, { useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import { AccountService } from "../../../api-services/services/AccountService";
import { Textfit } from "react-textfit";

const Wrapper = styled.div`
  padding: 20px 10px;
  min-height: 20vh;
`;

const CustomDialog = styled(Dialog)`
  .MuiPaper-rounded {
    border-radius: 20px;
  }
`;

const Title = styled.div`
  font-size: 3.5rem
  width: 100%;
  text-align: center;
  padding: 10px 10px 20px 10px;
  font-weight: bold;
`;

const InputRow = styled.div`
  display: grid;
  gap: 5px;
  padding: 5px 30px;
  grid-template-columns: 30% 70%;
`;

const AnotherRow = styled.div`
  padding: 5px 30px;
  display: grid;

  gap: 5px;
  grid-template-columns: 70% 30%;
`;

const ButtonRow = styled.div`
  padding: 10px 30px;
  height: 100px;
`;

const CustomSelect = styled.select`
  border-radius: 12px;
  border: solid 1px #676666;
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 10%);
  height: 80px;
  font-size: 1.8rem;
  padding: 0px 8px;
`;

const CustomTextField = styled.input`
  border-radius: 12px;
  border: solid 1px #676666;
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 10%);
  padding: 0px 10px;
  height: 78.5px;
  display: flex;
  flex: 1;
  font-size: 1.8rem;
  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.8rem;
  }
`;

const CustomButton = styled.div`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 100%;
  width: 100%;
  flex: 1;
  font-size: 1.8rem;

  ${({ theme }) => {
    return (
      "background-image: linear-gradient(to top, " +
      theme.primaryGradient +
      ", " +
      theme.primary +
      ");"
    );
  }}

  ${({ disabled }) => {
    return disabled && `filter: grayscale(01);pointer-events: none;`;
  }}

  color: #ffffff;
`;

const ForcedVerification = ({ forcedverify, alert }) => {
  useEffect(() => {
    setOpen(forcedverify);
  }, []);

  const [open, setOpen] = useState(forcedverify);
  const [areaCode, setAreacode] = useState(config.features.PhonePrefix);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [securityKey, setSecurityKey] = React.useState("");
  const handleGetCodeClick = async () => {
    if (countdown <= 0) {
      var expr = new RegExp(
        `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
      );
      if (!expr.test(phone)) {
        alert(
          "",
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10)
        );
        return;
      }

      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areaCode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          setSecurityKey(response.data.stepResponse);
          alert("", i18n.t("common.msgTokenSent"));
          setCountdown(60);
        } else {
          alert("", response.info);
        }
      });
    }
  };

  function smsVerification(securityKey, code) {
    AccountService.NewRegister("InitPhone", {
      input: "Valid",
      data: {
        securitykey: securityKey,
        validatecode: code,
      },
    }).then(async (response) => {
      if (response.IsSuccess) {
        alert("", i18n.t("common.msgTokenVerified"));
        setOpen(false);
      } else {
        alert("", response.info);
      }
    });
  }

  const handleActivationClick = async () => {
    var expr = new RegExp(
      `^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`
    );
    if (!expr.test(phone)) {
      alert(
        "",
        i18n
          .t("common.noReachMin")
          .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH)
      );
      return;
    }
    if (!config.features.SkipSMSVerification) {
      expr = /^[a-zA-Z0-9]{6}$/;
      if (!expr.test(code)) {
        alert("", i18n.t("common.msgEnterCode"));
        return;
      }
    }

    if (config.features.SkipSMSVerification) {
      AccountService.NewRegister("InitPhone", {
        input: "Init",
        data: {
          areacode: areaCode,
          phone: phone,
        },
      }).then(async (response) => {
        if (response.IsSuccess) {
          smsVerification(response.data, "123456");
        } else {
          alert("", response.info);
        }
      });
    } else {
      smsVerification(securityKey, code);
    }
  };

  useEffect(() => {
    if (countdown > 0)
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
  }, [countdown]);

  return (
    <CustomDialog open={open} maxWidth="" fullWidth="xs">
      <Wrapper>
        <Title>{i18n.t("web.register.activation")}</Title>
        {
          //     <CloseButton
          //     onClick={() => {
          //       setOpen(false);
          //     }}
          //   >
          //     ×
          //   </CloseButton>
        }
        <InputRow>
          <CustomSelect>
            <option>{areaCode}</option>
          </CustomSelect>
          <CustomTextField
            type="text"
            value={phone}
            placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </InputRow>
        {!config.features.SkipSMSVerification && (
          <AnotherRow>
            <CustomTextField
              type="text"
              value={code}
              placeholder={i18n.t("common.msgEnterCode")}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <CustomButton onClick={handleGetCodeClick} disabled={countdown > 0}>
              <Textfit>
                {countdown <= 0
                  ? i18n.t("common.msgSendToken")
                  : i18n.t("common.btnTokenResendLabel") +
                    "(" +
                    countdown +
                    "s)"}
              </Textfit>
            </CustomButton>
          </AnotherRow>
        )}
        <ButtonRow>
          <CustomButton onClick={handleActivationClick}>
            {i18n.t("common.submit")}
          </CustomButton>
        </ButtonRow>
      </Wrapper>
    </CustomDialog>
  );
};

export default ForcedVerification;
