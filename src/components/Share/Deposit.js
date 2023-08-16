import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../App/Loading";
import Maintenance from "./Maintenance";
import config from "../../config/config";
import { walletAction } from "../../api-services/actions/walletAction";
class Deposit extends Component {
  state = {
    loading: true,
    maintenance: false,
    isHtml: false,
    html: "",
  };
  componentDidMount() {
    localStorage.removeItem("depositResult");
    var paymentcode = this.props.match.params.paymentcode;

    var methodcode = this.props.match.params.methodcode;

    const depositMethodSwitcher = (method) => {
      switch (method) {
        case "banktransfer":
          return "bank";
        case "crypto":
          return "crypto";
        case "thirdparty":
          return "thirdparty";
        default:
          return "bank";
      }
    };

    var channelid = this.props.match.params.channelid;
    var depositPromotion = this.props.match.params.promotion.trim();
    var amount = this.props.match.params.amount.replace(/,/g, "");
    var name = this.props.match.params.name;
    var account = this.props.match.params.account;
    if (paymentcode.toUpperCase() === "MANUAL") {
      // handle manual deposit
      if (methodcode === "BankTransfer") {
        this.props.doBankDeposit(
          name,
          account,
          amount,
          channelid,
          depositPromotion
        );
      }
      if (methodcode === "FPS") {
        this.props.doBankDeposit(name, amount, channelid, depositPromotion);
      }
      if (methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(amount, channelid, depositPromotion);
      }
    } else {
      this.props.performDeposit(
        amount,
        channelid,
        depositPromotion,
        paymentcode,
        depositMethodSwitcher(methodcode.toLowerCase())
      );

      // if (methodcode === "Crypto") {
      //  this.props.doCryptoDeposit(
      //    amount,
      //    channelid,
      //    depositPromotion,
      //    paymentcode
      //  );
      //} else {
      //  this.props.doBankDeposit2(
      //    amount,
      //    channelid,
      //    depositPromotion,
      //    paymentcode
      //  );
      //
      // }
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.depositResult !== this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      localStorage.setItem(
        "depositResult",
        JSON.stringify(this.props.wallet.depositResult)
      );
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var paymentcode = this.props.match.params.paymentcode.toUpperCase();
        var paymenturl = "";

        if (paymentcode !== "MANUAL" && paymentcode !== "HELP2PAY") {
          paymenturl = response.data.paymenturl;
          window.location.href = paymenturl;
        } else {
          if (paymentcode === "HELP2PAY") {
            window.location.href =
              config.baseUrl.replace("/api/", "") + response.data.paymenturl;
          } else {
            // window.close();
          }
        }
      } else {
        //window.close();
      }
    }
  }
  render() {
    if (this.state.maintenance) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else {
      if (this.state.isHtml) {
        return (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: this.state.html }}
          ></div>
        );
      } else {
        return <Loading show={this.state.loading} opacity={1}></Loading>;
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doBankDeposit: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doBankDeposit(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDeposit: (account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doFPSDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDepositWithName: (name, account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doFPSDepositWithName(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doThirdPartyDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doBankDeposit2: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doBankDeposit2(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    doCryptoDeposit: (amount, payment_id, promotionid, paymentcode) =>
      dispatch(
        walletAction.doCryptoDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      ),
    performDeposit: (amount, payment_id, promotionid, paymentcode, type) => {
      dispatch(
        walletAction.performDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode,
          type
        )
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
