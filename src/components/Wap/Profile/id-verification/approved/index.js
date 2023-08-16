import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../../../Share/Textbox";
import i18n from "../../../../../utils/i18n";
import BaseProfile from "./../../BaseProfile";
import config from "../../../../../config/config";

class Approved extends BaseProfile {
  render() {
    return (
      <React.Fragment>
        <Textbox
          style={{ margin: "50px auto 20px auto" }}
          value={this.props.account.info.member_name}
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
          disabled={true}
          maxLength={256}
          isCustomProfileStyle={config.brand === "WGHK"}
        ></Textbox>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, "")(withRouter(Approved));
