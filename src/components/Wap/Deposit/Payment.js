import React, { Component } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { WalletService } from "../../../api-services/services/WalletService";

class Payment extends Component {
  componentDidMount() {
    WalletService.Deposit(
      this.props.token,
      this.props.match.params.id,
      this.props.match.params.bank || 0,
      this.props.match.params.amount,
      this.props.match.params.bonus || ""
    ).then((response) => {
      if (response.IsSuccess) {
        if (response.data.is_qrcode !== 1) {
          if (response.data.params != null) {
            let form = document.getElementById("form");
            form.action = response.data.url;
            document.getElementById("cid").value = response.data.params.cid;
            document.getElementById("oid").value = response.data.params.oid;
            form.submit();
          } else {
            window.location.href = response.data.url;
          }
        } else {
          window.close();
        }
      } else {
        alert(response.msg);
        window.close();
      }
    });
  }

  render() {
    return (
      <form id="form" target="_self" method="post">
        <input type="hidden" name="cid" id="cid"></input>
        <input type="hidden" name="oid" id="oid"></input>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(Payment));
