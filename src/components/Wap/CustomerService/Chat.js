import React, { Component } from "react";
import { connect } from "react-redux";
import { AccountService } from "../../../services/AccountService";
import { SupportService } from "../../../services/SupportService";
import { withRouter } from "react-router";
import Loading from "../../Wap/Share/Loading";
class Chat extends Component {
  componentDidMount() {
    if (this.props.account.token != null) {
      this.GetSupportUrl(
        this.props.account.info.member_id,
        this.props.account.info.member_username + "(会员)",
        "",
        this.props.account.info.member_email
      );
    } else {
      const userid = decodeURI(this.props.match.params.userid);
      const name = decodeURI(this.props.match.params.name);
      if (userid === " " && name === " ") {
        window.addEventListener(
          "message",
          async (e) => {
            if (typeof e.data === "string") {
              const json = JSON.parse(e.data);
              if (json.username && json.password) {
                const responseLogin = await AccountService.LoginWithoutSetToken(
                  json.username,
                  json.password,
                  json.blackbox
                );
                if (responseLogin.IsSuccess) {
                  const responseInfo = await AccountService.GetMemberInfo(
                    responseLogin.data
                  );
                  if (responseInfo.IsSuccess) {
                    this.GetSupportUrl(
                      responseInfo.data.member_id,
                      json.username + "(会员)",
                      this.props.match.params.question,
                      ""
                    );
                  } else {
                    alert(responseInfo.msg);
                    window.close();
                    // this.props.enqueueSnackbar(responseInfo.msg, {
                    //   variant: "error"
                    // });
                  }
                  //this.GetSupportUrl("", name, question);
                } else {
                  alert(responseLogin.msg);
                  window.close();
                  // this.props.enqueueSnackbar(responseLogin.msg, {
                  //   variant: "error"
                  // });
                }
              }
            }
          },
          false
        );
      } else {
        this.GetSupportUrl(
          userid,
          name,
          decodeURI(this.props.match.params.question),
          ""
        );
      }
    }
  }

  GetSupportUrl = (userid, name, question) => {
    SupportService.GetLiveSupport(
      userid,
      name,
      question,
      document.URL,
      document.referrer
    ).then((response) => {
      if (response.IsSuccess) {
        window.location.href = response.data.online;
      } else {
        window.close();
      }
    });
  };

  render() {
    return <Loading show={true}></Loading>;
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(Chat));
