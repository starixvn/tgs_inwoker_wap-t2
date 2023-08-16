import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "../../utils/i18n";
import MaintenancePNG from "../../assets/images/maintenance-blank.png";
import { Dialog } from "@material-ui/core";
import { connect } from "react-redux";
import Common from "../../utils/Common";
import { generalAction } from "../../api-services/actions/generalAction";
import { withSnackbar } from "notistack";
import { AppHistory } from "../../history/History";
import IMHandler from "./IMHandler";
import config from "../../config/config";
import { UiService } from "../../api-services/services/UiService";
const Container = styled.div`
  width: 100%;
  background: url(${MaintenancePNG}) no-repeat center;
  background-size: cover;
  position: relative;
  height: calc(100vh);
  overflow: auto;
  padding: 50px;
`;

const MaintenanceTextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 20%;
`;

const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 40px;
  white-space: pre-wrap;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
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
  cursor: pointer;
`;

const AnotherButton = styled(Button)`
  color: #ff8e39;
  background: none;
  border: solid 1px #ff8e39;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }

  .MuiDialog-paper {
    min-width: 900px;

    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const Icons = styled.img`
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  display: flex;
  padding: 20px;
`;

const QRCodeTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 5px 0px;
  font-weight: bold;
  font-size: 20px;
`;

const QRCodeImage = styled.img`
  height: 150px;
  width: 150px;
`;

const Maintenance = (props) => {
  const [open, setOpen] = useState(false);
  const [imList, setIMList] = useState([]);
  const [liveChat, setLiveChat] = useState("");
  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);

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

    UiService.GetMaintenance().then((result) => {
      if (result.IsSuccess) {
        if (result.data) {
          if (result.data.beginTime) {
            setBeginTime(result.data.beginTime);
          }
          if (result.data.beginTime) {
            setEndTime(result.data.endTime);
          }
          if (result.data.content) {
            setContent(result.data.content);
          }
        }
      } else {
        setFailed(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!props.general.isMaintenance && props.isGameMaintenance !== true) {
      AppHistory.push("/");
    }
  });
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
    if (config.features.LiveChatVendor.brand === "zendesk") {
      window.zE("webWidget", "open");
      return;
    } else if (config.features.LiveChatVendor.brand === "livechat") {
      window.LiveChatWidget.call("maximize");
      return;
    }
    if (newURL.length) {
      Common.PopupCenter(newURL, "", 785, 750);
    } else {
    }
  };

  const formatTime = (isoString) => {
    var newDate = new Date(isoString);
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const Api = () => {
    return (
      <>
        <Text>
          {i18n.t("common.maintenance")}: {beginTime} ~ {endTime} (GMT+8){" "}
        </Text>
        <Text
          style={{ color: "#fff" }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </>
    );
  };

  const Local = ({ beginTime, endTime }) => {
    return (
      <>
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请
          <Hyperlink>联系客服</Hyperlink>。
        </Text>
        <Text>
          維修時間 :{" "}
          {beginTime
            ? beginTime
            : formatTime(config.features.Maintenance_Detail.startTime)}{" "}
          ~{" "}
          {endTime
            ? endTime
            : formatTime(config.features.Maintenance_Detail.endTime)}{" "}
          (GMT+8){" "}
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
                  <Hyperlink>dịch vụ khách hàng</Hyperlink>。
                </Text>
                <Text>
                  thời gian bảo trì :{" "}
                  {beginTime
                    ? beginTime
                    : formatTime(
                        config.features.Maintenance_Detail.startTime
                      )}{" "}
                  ~{" "}
                  {endTime
                    ? endTime
                    : formatTime(
                        config.features.Maintenance_Detail.endTime
                      )}{" "}
                  (GMT+8){" "}
                </Text>
              </React.Fragment>
            );
          }
        })()}

        <Text>We are currently under maintenance, please try again later.</Text>
        <Text>
          If you have any questions, please contact our{" "}
          <Hyperlink>customer service</Hyperlink>.
        </Text>
        <Text>
          Maintenance Time :{" "}
          {beginTime
            ? beginTime
            : formatTime(config.features.Maintenance_Detail.startTime)}{" "}
          ~{" "}
          {endTime
            ? endTime
            : formatTime(config.features.Maintenance_Detail.endTime)}{" "}
          (GMT+8){" "}
        </Text>
      </>
    );
  };

  return (
    <Container>
      <MaintenanceTextContainer>
        {isFailed ? (
          <Local />
        ) : content ? (
          <Api />
        ) : (
          <Local beginTime={beginTime} endTime={endTime} />
        )}

        <ButtonContainer>
          <AnotherButton onClick={handleCSClick}>
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

        <CustomModal open={open}>
          <DialogTitle2>
            <div>{i18n.t("panel.imLong")}</div>
            <CloseButton
              onClick={() => {
                setOpen(false);
              }}
            >
              ✖
            </CloseButton>
          </DialogTitle2>
          <QRCodeContainer>
            {imList.map((data, index) => {
              return (
                <QRCodeHolder
                  onClick={() => {
                    //  copyText(data.appid ? data.appid : data.phone);
                    //  props.enqueueSnackbar(i18n.t("affiliate.copied"), {
                    //    variant: "success",
                    //  });
                  }}
                >
                  {data.qrcodeurl ? (
                    <QRCodeTextContainer>
                      <QRCodeImage src={data.qrcodeurl} />
                      <QRCodeText>{data.type}</QRCodeText>
                    </QRCodeTextContainer>
                  ) : (
                    <QRCodeTextContainer>
                      <Icons
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/icon/${data.type}.png`
                        }
                        onClick={() => {
                          IMHandler(data.type, data.phone);
                        }}
                      />
                      <QRCodeText>{data.type}</QRCodeText>
                      <div style={{ textAlign: "center" }}>
                        {i18n.t("common.phoneNumber")}: {data.phone}
                      </div>
                      <div>ID: {data.appid}</div>
                    </QRCodeTextContainer>
                  )}
                </QRCodeHolder>
              );
            })}
          </QRCodeContainer>
        </CustomModal>
      </MaintenanceTextContainer>
    </Container>
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
)(withSnackbar(Maintenance));
