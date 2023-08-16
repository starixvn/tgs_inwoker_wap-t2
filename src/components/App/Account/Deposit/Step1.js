import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import CustomButton from "../../../Share/Button";

import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const CurrencyTextFieldReplacement = styled.input`
  height: 35px;
  width: 154px;
  border-radius: 4px;
  border: solid 1px #b6b6b6;
  padding: 0px 10px;

  ::placeholder {
    color: #818181;
  }

  :focus {
    outline: none;
  }
`;

const TabButton = styled.div`
  width: 88px;
  height: 86px;
  font-size: 14px;
  color: #747474;
  text-align: center;
  float: left;
  margin-right: 8px;
  transition: border-bottom 0.6s ease;
  ${(props) =>
    props.active
      ? ` border-bottom: solid 3px #f0ca83;
      color: #f0ca83;`
      : ` border-bottom: solid 3px transparent;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div`
  margin-top: 40px;
`;
const NumberContainer = styled.div`
  width: 20px;
  height: 25px;
  font-family: Arial;
  font-size: 25px;
  color: #ffffff;
  text-align: center;
  float: left;
  -webkit-text-stroke: 1px black;
`;
const SubTitle = styled.div`
  color: #404040;
  font-size: 20px;
  float: left;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 20px 0 0 10px;
`;
const SelectionContainerTunnel = styled(SelectionContainer)`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgb(0 0 0 / 30%);
  padding: 10px 20px;
`;
const TunnelButton = styled(TabButton)`
  width: 133px;
  height: 41px;
  padding-top: 10px;
  margin-top: 0px;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "220px",
    height: "38px",

    marginRight: "5px",
    float: "left",

    padding: 0,
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);
const LimitPopupContainer = styled.div`
  min-width: 150px;
  font-size: 14px;
  color: #c30005;
  padding: 5px 10px 10px 55px;
`;
const InputSender = styled.input`
  height: 38px;
  width: 220px;
  float: left;
  margin-right: 5px;
  color: #818181;
  font-size: 14px;
  padding-left: 14px;
  border: 1px solid #b6b6b6;
  border-radius: 4px;
  background-color: transparent;
`;
class Step1 extends Component {
  render() {
    if (!this.props.selectedType) {
      return <></>;
    } else
      return (
        <>
          {(() => {
            if (this.props.selectedType.channel.length !== 0) {
              return (
                <>
                  <SubHeaderContainer>
                    <NumberContainer>1</NumberContainer>

                    <SubTitle>{i18n.t("deposit.paymentTunnel")}</SubTitle>
                  </SubHeaderContainer>
                  <SelectionContainerTunnel>
                    {this.props.selectedType.channel.map((item, key) => {
                      return (
                        <TunnelButton
                          key={item.id}
                          onClick={() => this.props.handleTunnelClick(item)}
                          active={this.props.selectedChannel.id === item.id}
                        >
                          {item.title}
                        </TunnelButton>
                      );
                    })}
                  </SelectionContainerTunnel>
                </>
              );
            }
          })()}

          <SubHeaderContainer>
            <NumberContainer>
              {this.props.selectedType &&
              this.props.selectedType.channel.length > 0
                ? "2"
                : "1"}
            </NumberContainer>

            <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
          </SubHeaderContainer>
          <SelectionContainer>
            {this.props.selectedChannel &&
            this.props.selectedChannel.amount_options ? (
              <>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={this.props.depositAmount}
                    displayEmpty
                    onBlur={this.props.handleDepositAmountBlur}
                    onChange={this.props.handleDepositAmountChange}
                    native
                  >
                    <option value="">{i18n.t("deposit.chooseAmount")}</option>
                    {this.props.selectedChannel.amount_options.map(
                      (item, key) => {
                        return (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        );
                      }
                    )}
                  </CustomSelect>
                </CustomFormControl>
              </>
            ) : (
              <>
                <CurrencyTextFieldReplacement
                  style={{
                    height: "40px",
                    width: "200px",
                    borderRadius: "12px",
                    boxShadow: "0px 2px 3px 0 rgba(0, 0, 0, 0.18)",
                    backgroundColor: "#fff",
                  }}
                  placeholder={i18n.t("deposit.plsEnterDepositAmount")}
                  onChange={this.props.handleDepositAmountChange}
                  outputFormat="string"
                  variant="outlined"
                  autoComplete="off"
                  value={this.props.depositAmount}
                  maximumValue={this.props.selectedType.max.toString()}
                  inputProps={{
                    maxLength: 15,
                  }}
                  currencySymbol=""
                  decimalPlaces={0}
                ></CurrencyTextFieldReplacement>
                <LimitPopupContainer>
                  *{i18n.t("deposit.limitDeposit")}
                  {Common.formatNumberWithThousand(
                    this.props.selectedType.min
                  )}{" "}
                  -{" "}
                  {Common.formatNumberWithThousand(this.props.selectedType.max)}
                </LimitPopupContainer>
              </>
            )}
          </SelectionContainer>
          {(() => {
            if (
              this.props.selectedType === null ||
              this.props.selectedType.id !== 0
            )
              return null;
            return (
              <>
                <SubHeaderContainer>
                  <NumberContainer>3</NumberContainer>

                  <SubTitle>{i18n.t("deposit.senderName")}</SubTitle>
                </SubHeaderContainer>
                <SelectionContainer>
                  <InputSender
                    type="text"
                    placeholder={i18n.t("deposit.senderName")}
                    value={this.props.username}
                    onChange={this.props.handleUsernameChange}
                  ></InputSender>
                </SelectionContainer>
              </>
            );
          })()}
          <CustomButton
            name={i18n.t("common.nextStep")}
            width={160}
            marginTop={"150"}
            float={"none"}
            handleClick={this.props.handleDepositClick}
          ></CustomButton>

          <form target="_blank" id="form1"></form>
        </>
      );
  }
}
export default Step1;
