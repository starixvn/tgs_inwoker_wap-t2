import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import i18n from "../../../utils/i18n";
function MessageDialog(props) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const StyledModalPopup = withStyles((theme) => ({
    paper: {
      borderRadius: "50px",
      fontSize: "28px",
      color: "#666666",
      padding: "30px",
      width: "600px",
      maxWidth: "690px",

      display: "block",
    },
  }))(Modal);
  const DialoTitle = styled.div`
    font-size: 36px;
    font-weight: 600;
    margin: 0 auto;
    display: table;
    color: #4a4a4a;
  `;
  const DialoMessage = styled.div`
    font-size: 26px;
    margin: 30px 45px;
    color: #4a4a4a;
    line-height: 1.8em;
    text-align: center;
  `;
  const ButtonConfirm = styled.div`
    width: 250px;
    height: 90px;
    border-radius: 20px;

    font-size: 34px;

    text-align: center;

    padding-top: 24px;

    margin: 10px auto;
    background-image: linear-gradient(
      to top,
      ${({ theme }) => theme.primaryGradient},
      ${({ theme }) => theme.primary}
    );
    color: #ffffff;
  `;
  return (
    <StyledModalPopup
      onClose={props.onClose}
      open={props.open}
      TransitionComponent={Transition}
    >
      <DialoTitle>{i18n.t("share.messageDialog.info")}</DialoTitle>
      <DialoMessage>{props.message}</DialoMessage>
      <ButtonConfirm onClick={props.onClick}>
        {i18n.t("common.confirm")}
      </ButtonConfirm>
    </StyledModalPopup>
  );
}

export default MessageDialog;
