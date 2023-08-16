import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import i18n from "../../../../utils/i18n";
import BottomNote from "../../Share/BottomNote";
import BaseProfile from "./../BaseProfile";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { RESET_ACCOUNTRESULT } from "../../../../api-services/constant/actionType";
import config from "../../../../config/config";
import { AccountService } from "../../../../api-services/services/AccountService";
import Default from "./default";
import Approved from "./approved";

class NameVerify extends BaseProfile {
  constructor(props) {
    super(props);

    const name = this.props.account.info.member_name;
    const ic = this.props.account.info.member_card_no;

    const isConfigured = this.checkisConfigure();
    this.state = {
      name: name,
      ic: ic,
      isConfigured: isConfigured,
      icUpload: "",
      scene: "",
    };
  }

  currentFormStatus = this.props.account.info.identityformstatus;
  hasSubmitted = this.props.account.info.identityformid ? true : false;

  componentDidMount() {
    if (this.currentFormStatus === 0 && this.hasSubmitted === false) {
      //api沒給表單id ，表示可以上傳
      this.setState({
        ...this.state,
        scene: "waiting-submit",
      });
    }
    if (
      (this.currentFormStatus === 1 && this.hasSubmitted === true) ||
      this.currentFormStatus === 1
    ) {
      this.setState({
        ...this.state,
        scene: "approved",
      });
    }
    if (
      (this.currentFormStatus === 2 && this.hasSubmitted === true) ||
      this.currentFormStatus === 2
    ) {
      //有給表單id但是狀態是拒絕，也可以上傳
      this.setState({
        ...this.state,
        scene: "rejected",
      });
    }
    if (this.currentFormStatus === 0 && this.hasSubmitted === true) {
      //有給表單id但狀態沒驗證，不能上傳
      this.setState({
        ...this.state,
        scene: "waiting-verification",
      });
    }
  }
  componentDidUpdate(preProps, prevState) {
    if (
      preProps.account.info.member_card_no !==
      this.props.account.info.member_card_no
    ) {
      const ic = this.props.account.info.member_card_no;
      const isConfigured = this.checkisConfigure();
      this.setState({ ...this.state, ic: ic, isConfigured: isConfigured });
    }
    if (
      preProps.account.updateCardResult !==
        this.props.account.updateCardResult &&
      this.props.account.updateCardResult !== null
    ) {
      if (this.props.account.updateCardResult.IsSuccess) {
        if (config.features.ICVerificationUpload) {
          AccountService.UploadIC(this.state.icUpload[0]).then((response) => {
            if (!response.IsSuccess) {
              this.props.alert("", response.info);
            }
          });
        }
        if (
          preProps.account.info.identityformstatus !==
          this.props.account.info.identityformstatus
        ) {
          this.setState({
            ...this.state,
            scene: "waiting-verification",
          });
        }
        this.props.resetResult();
        this.setState({ disableButton: true });
        // this.props.getIDCardNo();
        this.props.appHistory.replace("/" + i18n.language + "/profile");
      } else {
        this.props.alert("", this.props.account.updateCardResult.info);
        // if (this.props.account.updateCardResult.code === 401) {
        //   this.props.alert(
        //     '',
        //     i18n.t('profile.nameVerify.msgInvalidICNum')
        //   )
        // } else {
        //   this.props.alert('', this.props.account.updateCardResult.info)
        // }

        this.showLoading(false);
      }
    }
  }
  checkisConfigure = () => {
    var check_pass_account = false;
    if (config.features.ICVerification) {
      if (
        this.props.account.info.member_name !== "" &&
        this.props.account.info.member_name !== null
      ) {
        check_pass_account = this.props.account.info.check_pass_account;
      }
    } else {
      check_pass_account = this.props.account.info.check_pass_account;
    }
    return check_pass_account;
  };
  handleChangeName = (e) => {
    this.setState({ ...this.state, name: e.target.value });
    this.onTextChanged();
  };
  handleChangeIC = (e) => {
    this.setState({ ...this.state, ic: e.target.value });
    this.onTextChanged();
  };
  handleSubmitClicked = () => {
    if (config.features.ICVerificationUpload && this.state.icUpload === "") {
      return this.props.alert("", i18n.t("deposit.msgPlsSelectFile"));
    }
    const name = this.state.name || "";
    const ic = this.state.ic || "";
    this.showLoading(true);
    this.props.updateMemberCardNo(name, ic);

    this.showLoading(false);
  };

  isDisableButton = () => {
    const name = this.state.name || "";
    const ic = this.state.ic || "";

    const isDisableButton = config.features.ICVerification
      ? !(name && ic)
      : name === "";
    return isDisableButton;
  };

  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileType"));

        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 5120) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileSize"));
        e.target.value = null;
      } else {
        this.setState({
          ...this.state,
          icUpload: files,
        });
      }
    }
  };

  handleGoEdit = () => {
    this.setState({
      ...this.state,
      scene: "waiting-submit",
    });
  };

  commonprops = {
    name: this.state.name,
    ic: this.state.ic,
    icUpload: this.state.icUpload,
    handleFileChange: this.handleFileChange,
    handleSubmitClicked: this.handleSubmitClicked,
    handleChangeIC: this.handleChangeIC,
    handleChangeName: this.handleChangeName,
  };

  sceneSwitcher = (scene) => {
    switch (scene) {
      case "waiting-verification":
        return <Approved {...this.commonprops} />;
      case "approved":
        return <Approved {...this.commonprops} />;
      // case "waiting-submit":
      //   return <Default {...this.commonprops} />;
      // case "reject":
      //   return <Default {...this.commonprops} />;
      default:
        return <Default {...this.commonprops} icUpload={this.state.icUpload} />;
    }
  };

  bottomNoteSwitcher = (scene) => {
    switch (scene) {
      case "waiting-verification":
        return (
          <BottomNote
            text1={i18n.t("profile.nameVerify.toEdit")}
            toEdit={this.handleGoEdit}
            text2={i18n.t("profile.nameVerify.editHere")}
          ></BottomNote>
        );
      case "waiting-submit":
        return <BottomNote empty></BottomNote>;
      // case "reject":
      //   return <Default {...this.commonprops} />;

      case "approved":
        return <BottomNote text1={""} empty text2={""}></BottomNote>;
      default:
        return (
          <BottomNote
            text1={i18n.t("profile.nameVerify.toEdit")}
            link={"../chat"}
            text2={i18n.t("profile.nameVerify.editHere")}
          ></BottomNote>
        );
    }
  };

  render() {
    return this.setupContent(
      i18n.t("profile.nameVerify.title"),
      this.sceneSwitcher(this.state.scene),
      this.state.isConfigured &&
        config.features.ICVerification &&
        this.state.scene !== "waiting-submit"
        ? i18n.t("common.configured")
        : i18n.t("common.complete"),
      config.features.Profile_DisplayEditNameButton
        ? this.bottomNoteSwitcher(this.state.scene)
        : null
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountProfile: () => dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (name, number) =>
      dispatch(accountAction.updateMemberCardNo(name, number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NameVerify));
