import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  height: 100%;
`;

const BlockLabel = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `30px` : `32px`)};
  font-weight: 600;

  color: #2b2b2b;
  margin: 30px 0 10px 60px;
`;
const BlockContainer = styled.div`
  background-color: #fff;
  width: 700px;
  padding: 30px 0;
  border-radius: 20px;
  margin: 30px auto;
`;
const ItemContainer = styled.div`
  min-height: 100px;

  margin: 30px 0 0 30px;
`;
const ItemIconContainer = styled.div`
  width: 48px;
  float: left;
  margin: 0 10px 0 30px;
`;
const ItemIcon = styled.div`
  height: 48px;
  margin-top: 20px;
  width: 48px;
  background: url(${(props) => props.icon}) no-repeat left center;
  background-size: contain;
`;
const ItemContentContainer = styled.div`
  float: left;
  margin: 0 0 0 10px;
`;
const ItemTitle = styled.div`
  font-size: ${() => (config.brand === "WGHK" ? `28px` : `32px`)};
  font-weight: ${() => (config.brand === "WGHK" ? `400` : `normal`)};

  color: #2c2c2c;
`;
const NotSetLabel = styled.div`
  margin-top: 5px;
  font-size: ${() => (config.brand === "WGHK" ? `28px` : `32px`)};
  //font-weight: ${() => (config.brand === "WGHK" ? `400` : `500`)};
  color: #afafaf;
`;
const SettedLabel = styled(NotSetLabel)`
  color: ${({ theme }) => theme.secondary};
`;
const BtnBack = styled.div`
  height: 100px;

  width: 50px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back.png`})
    no-repeat right center;
  float: right;
  margin: 0 50px 0 0px;
`;
const ContentItem = (
  icon,
  title,
  isConfigured,
  onClickEvent,
  configuredValue = i18n.t("profile.setted"),
  category,
  disabled
) => {
  var configureElement = isConfigured ? (
    <SettedLabel>{configuredValue}</SettedLabel>
  ) : (
    <NotSetLabel>{i18n.t("profile.notSet")}</NotSetLabel>
  );
  var disable = false;
  if (category === "member_phone") {
    if (config.features.Profile_NotAllowChangePhone && isConfigured) {
      disable = true;
    }
  }
  return (
    <ItemContainer onClick={!disable && !disabled && onClickEvent}>
      <ItemIconContainer>
        <ItemIcon icon={icon}></ItemIcon>
      </ItemIconContainer>
      <ItemContentContainer>
        <ItemTitle>{title}</ItemTitle>
        {configureElement}
      </ItemContentContainer>
      {!disable && !disabled && <BtnBack></BtnBack>}
    </ItemContainer>
  );
};

class Profile extends Component {
  state = {};
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/" + i18n.language + "/login");
    }
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleNavigate = (path) => {
    this.props.appHistory.push("/" + i18n.language + path);
  };
  isConfigured(value) {
    if (value) return true;
    return false;
  }

  getStatus = () => {
    var currentFormStatus = this.props.account.info.identityformstatus;
    var hasSubmitted = this.props.account.info.identityformid ? true : false;

    var status = "";

    if (currentFormStatus === 0 && hasSubmitted === false) {
      //api沒給表單id ，表示可以上傳
      return (status = "no");
    }
    if (
      (currentFormStatus === 1 && hasSubmitted === true) ||
      currentFormStatus === 1
    ) {
      return (status = "yes");
    }
    if (
      (currentFormStatus === 2 && hasSubmitted === true) ||
      currentFormStatus === 2
    ) {
      //有給表單id但是狀態是拒絕，也可以上傳
      return (status = "rejected");
    }
    if (currentFormStatus === 0 && hasSubmitted === true) {
      //有給表單id但狀態沒驗證，不能上傳
      return (status = "verifying");
    }
    return status;
  };

  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("profile.title")}
        ></Header>

        <div style={{ marginBottom: "-30px" }}>
          <BlockContainer>
            <BlockLabel>{i18n.t("profile.basicInfo")}</BlockLabel>
            {config.features.ICVerification &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-user.png`,
                i18n.t("profile.nameVerify.icNum"),
                this.isConfigured(
                  this.props.account.info.member_name !== "" &&
                    this.props.account.info.member_name !== null
                ),
                () => {
                  this.handleNavigate("/profile/name");
                },
                `${this.props.account.info.member_name} ${
                  config.features.ShowVerificationStatus
                    ? `(` + i18n.t("verified." + this.getStatus()) + `)`
                    : ""
                }`
              )}

            {/* {ContentItem(
            IconMobilePNG,
            i18n.t("profile.phone.title"),
            this.isConfigured(this.props.account.info.member_phone),
            () => {
              this.handleNavigate("/profile/phone");
            },
            this.props.account.info.member_phone
          )} */}

            {(config.features.SMSVerification ||
              config.features.PromoRoulette_SMSVerification ||
              config.features.Register_ShowPhone) &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-phone.png`,
                i18n.t("profile.phone.title"),
                this.isConfigured(this.props.account.info.member_phone),
                () => {
                  this.handleNavigate("/profile/phone");
                },
                this.props.account.info.member_phone
                  ? this.props.account.info.member_phone.substring(0, 1) + "**"
                  : "",
                "member_phone"
              )}
            {config.features.EmailVerification &&
              ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-email.png`,
                i18n.t("common.emailAddress"),
                this.isConfigured(this.props.account.info.member_email),
                () => {
                  this.handleNavigate("/profile/email");
                },
                this.props.account.info.member_email
              )}

            {ContentItem(
              process.env.PUBLIC_URL + `/assets/images/wapp/icon-birthdate.png`,
              i18n.t("profile.birthdate.title"),
              this.isConfigured(this.props.account.info.member_birthdate),
              () => {
                this.handleNavigate("/profile/birthdate");
              },
              this.props.account.info.member_birthdate
                ? this.props.account.info.member_birthdate
                : ""
            )}
          </BlockContainer>

          {(config.features.QQWeChat ||
            config.features.CustomMessaging.length > 0) && (
            <BlockContainer>
              <BlockLabel>{i18n.t("profile.otherInfo")}</BlockLabel>
              {config.features.QQWeChat &&
                ContentItem(
                  process.env.PUBLIC_URL + `/assets/images/wapp/icon-qq.png`,
                  i18n.t("common.qqNumber"),
                  this.isConfigured(this.props.account.info.member_qq),
                  () => {
                    this.handleNavigate("/profile/qq");
                  },
                  this.props.account.info.member_qq
                    ? this.props.account.info.member_qq.substring(0, 1) + "**"
                    : ""
                )}

              {config.features.QQWeChat &&
                ContentItem(
                  process.env.PUBLIC_URL +
                    `/assets/images/wapp/icon-wechat.png`,
                  i18n.t("common.wechatNumber"),
                  this.isConfigured(this.props.account.info.member_wechat),
                  () => {
                    this.handleNavigate("/profile/wechat");
                  },
                  this.props.account.info.member_wechat
                    ? this.props.account.info.member_wechat.substring(0, 1) +
                        "**"
                    : ""
                )}

              {config.features.CustomMessaging &&
                config.features.CustomMessaging.map((platform) => {
                  return ContentItem(
                    process.env.PUBLIC_URL +
                      `/assets/images/wapp/icon-${platform}.svg`,
                    i18n.t("common." + platform),
                    this.isConfigured(
                      this.props.account.info["member_" + platform]
                    ),
                    () => {
                      this.handleNavigate("/profile/" + platform);
                    },
                    this.props.account.info["member_" + platform]
                      ? this.props.account.info["member_" + platform].substring(
                          0,
                          1
                        ) + "**"
                      : ""
                  );
                })}
            </BlockContainer>
          )}
        </div>

        <BlockContainer>
          <BlockLabel>{i18n.t("profile.securityInfo")}</BlockLabel>
          {ContentItem(
            process.env.PUBLIC_URL + `/assets/images/wapp/icon-unlock.png`,
            i18n.t("profile.password.title"),
            true,
            () => {
              this.handleNavigate("/profile/changepassword");
            },
            ""
          )}

          {/* {config.brand !== 'HKJP' && config.brand !== 'GPI'
            ? ContentItem(
                process.env.PUBLIC_URL + `/assets/images/wapp/icon-piggy.png`,
                i18n.t('profile.withdrawalPassword.title'),
                this.isConfigured(this.props.account.info.member_safe_password),
                () => {
                  if (this.props.account.info.check_pass_email === false) {
                    this.props.alert(
                      '',
                      i18n.t('profile.msgPlsBindEmailAddress')
                    )
                    this.handleNavigate('/profile/email')
                  } else {
                    if (
                      this.props.account.info.member_safe_password === 'set'
                    ) {
                      this.handleNavigate('/profile/changewithdrawalpassword')
                    } else {
                      this.handleNavigate('/profile/withdrawalpassword')
                    }
                  }
                }
              )
            : null} */}
        </BlockContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
export default connect(mapStateToProps, null)(withRouter(Profile));
