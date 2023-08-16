import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "../../utils/i18n";
import { connect } from "react-redux";
import { generalAction } from "../../api-services/actions/generalAction";
import Common from "../../utils/Common";
import { AppHistory } from "../../history/History";
import { withSnackbar } from "notistack";
import IMHandler from "./IMHandler";
const MaintenanceBg = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/maintenance.jpg`})
    no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const CustomContainer = styled(Grid)`
  padding: 140px 0px 0px 0px;
`;
const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: ${({ open }) => {
    return open ? "flex" : "none";
  }};
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
  top: 0;
  bottom: 0;
  padding: 80px;
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  background: white;
`;

const OverlayHeader = styled.div`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  padding: 20px;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
`;

const OverlayBody = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const IMWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding: 20px;
`;

const Icon = styled.div`
  width: 150px;
  height: 150px;

  background: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + "/assets/images/icon/" + icon
    }) no-repeat center /
    contain;`;
  }};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.div`
  color: white;
  font-size: 30px;
  background: #ff8e39;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const AnotherButton = styled(Button)`
  color: #ff8e39;
  background: none;
  border: solid 1px #ff8e39;
`;

const SMType = styled.div`
  padding: 5px 0px;
  font-weight: bold;
`;

const TheText = styled.div`
  font-size: 20px;
`;

const MaintenanceMobile = (props) => {
  function csClick() {
    props.GetSupportUrl("", "", "", "");
  }

  const [open, setOpen] = useState(false);
  const [imList, setIMList] = useState([]);
  const [liveChat, setLiveChat] = useState("");
  useEffect(() => {
    props.getLiveChatURL().then((e) => {
      if (e.IsSuccess) {
        if (e.data.setting) {
          setLiveChat(e.data.setting.url);
        }
      }
    });
    props.getBrandCommunicationList().then((e) => {
      if (e.IsSuccess) {
        setIMList(e.data);
      }
    });
  }, []);
  const handleCSClick = (userid, name = "", question, email = "") => {
    var newURL = liveChat
      .replace("{name}", name)
      .replace("{lang}", i18n.language)
      .replace("{email}", email || "");

    // var newURL = props.general.livechat
    //   ? props.general.livechat.setting.url
    //       .replace("{name}", name)
    //       .replace("{lang}", i18n.language)
    //       .replace("{email}", email || "")
    //   : "";

    if (newURL.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    } else {
    }
  };

  useEffect(() => {
    if (!props.general.isMaintenance && props.isGameMaintenance !== true) {
      AppHistory.push("/");
    }
  });

  return (
    <MaintenanceBg>
      <CustomContainer container justify="center" alignItems="center">
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请<Hyperlink onClick={csClick}>联系客服</Hyperlink>。
        </Text>

        {(() => {
          if (i18n.language === "vi-VN") {
            return (
              <React.Fragment>
                <Text>
                  Chúng tôi hiện đang được bảo trì, vui lòng thử lại sau.
                </Text>
                <Text>
                  Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi{" "}
                  <Hyperlink onClick={csClick}>dịch vụ khách hàng</Hyperlink>。
                </Text>
              </React.Fragment>
            );
          }
        })()}

        <Text>
          We are currently under maintenance, <br />
          please try again later.
        </Text>
        <Text>
          If you have any questions, <br />
          please contact our{" "}
          <Hyperlink onClick={handleCSClick}>customer service</Hyperlink>.
        </Text>
      </CustomContainer>{" "}
      <ButtonContainer>
        <AnotherButton
          onClick={() => {
            handleCSClick();
          }}
        >
          {i18n.t("support.online")}
        </AnotherButton>
        {(() => {
          if (imList.length > 0) {
            return (
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                {i18n.t("panel.im")}
              </Button>
            );
          }
        })()}
      </ButtonContainer>
      <Overlay open={open}>
        <OverlayContent>
          <OverlayHeader>
            <div>{i18n.t("panel.im")}</div>
            <div
              onClick={() => {
                setOpen(false);
              }}
            >
              ✖
            </div>
          </OverlayHeader>
          <OverlayBody>
            {imList.map((data, index) => {
              return (
                <IMWrapper
                  onClick={() => {
                    IMHandler(data.type, data.phone);
                    // props.alert('', i18n.t('affiliate.copied'))
                  }}
                >
                  <Icon icon={`${data.type}.png`} />
                  <SMType>{data.type}</SMType>
                  <TheText style={{ textAlign: "center" }}>
                    {i18n.t("common.phoneNumber")}: {data.phone}
                  </TheText>
                  <TheText>ID: {data.appid}</TheText>
                </IMWrapper>
              );
            })}
          </OverlayBody>
        </OverlayContent>
      </Overlay>
    </MaintenanceBg>
  );
};
const mapStateToProps = (state) => {
  return {
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBrandCommunicationList: () =>
      dispatch(generalAction.getBrandCommunication()),

    getLiveChatURL: () => dispatch(generalAction.getLiveChatURL()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(MaintenanceMobile));
