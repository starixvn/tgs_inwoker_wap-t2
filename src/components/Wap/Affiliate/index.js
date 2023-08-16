import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
import QRCode from "react-qr-code";
import { utility } from "../../../utils/utility";
import { generalAction } from "../../../api-services/actions/generalAction";

const QRCodeLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 30px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;
const QRCodeContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 700px;
  font-size: 28px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  border: solid 1px #f3f3f3;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 0px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-weight: 600;
  margin: 24px 0 0 3px;
  float: left;
  color: #212e31;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 28px;
  margin: 25px 0 25px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #d09f58;
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 60px;
  border-radius: 10%;
  border: solid 1px #000;

  font-size: 24px;
  font-weight: 600;

  text-align: center;
  color: #000;
  float: right;
  padding: 12px 20px 0 20px;
  margin-top: 12px;
`;

const CustomSelectContainer = styled.div`
  width: 700px;
  height: 170px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const CustomSelectGapLeaver = styled.div`
  padding: 5px;
`;

const CustomSelect = styled.select`
  height: 104px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 16px;
  border: solid 1px transparent;
  width: 100%;
  padding: 16px 32px;
  background: #fff;
  color: #000;

  &:focus {
    outline: none;
  }
`;

const AnotherCustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const Table = styled.table`
  width: 700px;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;

  font-size: 24px;
  font-weight: 600;
  color: #212e31;
  text-align: center;
  background: #fff;
  border-radius: 30px;
  thead {
    tr {
      th {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 20px 0;
        font-weight: 200;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
`;

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 30,
  },
}))(Tooltip);
class Affiliate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      copyTooltips: false,
      rebates: [],
      rebateType: 1,
    };
  }

  componentDidMount() {
    if (this.state.rebates.length === 0) {
      this.props.getBrandAllAgent().then((res) => {
        if (res.IsSuccess) {
          console.log(res.data);
          this.setState({
            ...this.state,
            rebates: res.data,
          });
        }
      });
    }
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleCopyLink = (link) => {
    this.setState({ ...this.state, copyTooltips: true });
    utility.copy(link);
    setTimeout(() => {
      this.setState({ ...this.state, copyTooltips: false });
    }, 3000);
  };
  handleClickAway = () => {};

  render() {
    var affiliateLink = `https://${window.location.hostname}/${i18n.language}/p/${this.props.account.info.playercode}?do=register`;
    const types = [
      { value: 1, title: "sport" },
      { value: 2, title: "virtualsports" },
      { value: 5, title: "livedealer" },
      { value: 7, title: "chess" },
      { value: 13, title: "lottery" },
      { value: 15, title: "egame" },
    ];
    return (
      <React.Fragment>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("affiliate.title")}
        ></Header>
        <QRCodeLabel>{i18n.t("affiliate.qrCode")}</QRCodeLabel>
        <QRCodeContainer>
          <QRCode value={affiliateLink}></QRCode>
        </QRCodeContainer>

        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={this.props.account.info.playercode}
            readOnly={true}
          ></CustomInput>
        </CustomText>
        <CustomText>
          <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>
          <CustomInput
            type={"text"}
            value={affiliateLink}
            readOnly={true}
          ></CustomInput>
          <LightTooltip
            open={this.state.copyTooltips}
            title={i18n.t("affiliate.copied")}
            placement="top"
          >
            <Button
              onClick={() => {
                this.handleCopyLink(affiliateLink);
              }}
            >
              {i18n.t("common.copy")}
            </Button>
          </LightTooltip>
        </CustomText>

        <CustomSelectContainer style={{ marginTop: 40 }}>
          <AnotherCustomLabel>{i18n.t("rebateRate.title")}</AnotherCustomLabel>
          <CustomSelectGapLeaver>
            <CustomSelect
              native
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  rebateType: e.target.value,
                });
              }}
            >
              {types.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {i18n.t(`common.${item.title}`)}
                  </option>
                );
              })}
            </CustomSelect>
          </CustomSelectGapLeaver>
        </CustomSelectContainer>

        <Table>
          <thead>
            <tr>
              <th>{i18n.t("rebateRate.players")}</th>
              <th>{i18n.t("rebateRate.turnover")}</th>{" "}
              <th>{i18n.t("rebateRate.rebates")} (%)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rebates
              .filter((item) => {
                if (this.state.rebateType === 0) {
                  return true;
                } else {
                  return (
                    item.allagentgametype.toString() ===
                    this.state.rebateType.toString()
                  );
                }
              })
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.activenumber}</td>
                    <td>{item.turnover}</td>
                    <td>{item.rebatepercentage}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Loading show={this.state.loading}></Loading>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBrandAllAgent: () => dispatch(generalAction.getBrandAllAgent()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
