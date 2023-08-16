import React, { Component } from "react";

import Button from "../Share/Button";
import BottomNote from "../Share/BottomNote";
import styled from "styled-components";
import Header from "../Share/Header";
import Loading from "../Share/Loading";
import i18n from "../../../utils/i18n";
import { UPDATE_INFO } from "../../../api-services/constant/actionType";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
`;

class BaseProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, disableButton: false };
    this.isTextChanged = false;
  }

  /*
   * Please Override below functions
   * handleSubmitClicked,
   * isDisableButton
   */

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  updateInfo(payload) {
    this.props.dispatch({
      type: UPDATE_INFO,
      payload: payload,
    });
    this.handleBackClick();
  }
  duplicateText(count) {
    let value = "";
    for (let i = 0; i < count; i++) {
      value += "*";
    }
    return value;
  }
  maskString(value, start, end) {
    let newValue = value;
    if (end > start) {
      if (value.length > end) {
        newValue =
          value.substring(0, start) +
          this.duplicateText(end - start) +
          value.substring(end, value.length);
      }
    }
    return newValue;
  }
  checkButtonState = () => {
    if (this.isTextChanged) return false; //always disable if text not changed
    return this.isDisableButton();
  };

  onTextChanged = () => {
    this.isTextChanged = true;
    if (this.state.message != null && this.state.message.length > 0) {
      this.setState({ message: "" }); //clear
    }
  };

  showErrorMessage(message) {
    this.setState({ message: message });
  }
  showLoading(loading) {
    this.setState({ ...this.state, loading: loading });
  }
  setupContent(
    title,
    body,
    buttonTitle = i18n.t("common.submit"),
    bottomNode,
    noBack
  ) {
    return (
      <Container>
        <Header
          background={true}
          token={null}
          balance={0}
          onBackClick={this.handleBackClick}
          title={title}
          noBack={noBack}
        ></Header>
        {body}
        {this.state.message}
        <Button
          style={{ margin: "40px auto 0 auto" }}
          disabled={this.checkButtonState() || this.state.disableButton}
          onClick={this.handleSubmitClicked}
          label={buttonTitle}
        ></Button>
        {bottomNode || <BottomNote></BottomNote>}
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
export default BaseProfile;
