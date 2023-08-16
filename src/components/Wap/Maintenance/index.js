import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import IMHandler from "../Main/Support/IMHandler";
import { UiService } from "../../../api-services/services/UiService";
const MaintenanceBg = styled.div`
  z-index: 10;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: url(${({ image }) => {
      return process.env.PUBLIC_URL + `/assets/images/wapp/${image}.jpg`;
    }})
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
  padding: 20px 40px;
  white-space: pre-wrap;
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
  color: white;
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Maintenance = (props) => {
  function csClick() {
    props.GetSupportUrl("", "", "", "");
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
  }

  const maintenanceImageSwitcher = (template) => {
    switch (template) {
      case 8:
      case "8":
        return "maintenance-new";
      default:
        return "maintenance";
    }
  };

  const [open, setOpen] = useState(false);
  const [imList, setIMList] = useState([]);
  const [liveChat, setLiveChat] = useState("");

  const [beginTime, setBeginTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");
  const [isFailed, setFailed] = useState(false);
  useEffect(() => {
    props.brandComm().then((e) => {
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
  const handleCSClick = (userid, name = "", question, email = "") => {
    props.GetSupportUrl("", "", "");
    //  var newURL = liveChat
    //    .replace('{name}', name)
    //    .replace('{lang}', i18n.language)
    //    .replace('{email}', email || '')
    //
    //  if (newURL.length) {
    //    Common.PopupCenter(newURL, '', 785, 750)
    //  } else {
    //  }
  };

  useEffect(() => {
    if (!props.isMaintenance) {
      props.appHistory.push("/" + i18n.language);
    }
  });

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
      <TextContainer>
        <Text>
          {i18n.t("common.maintenance")}: <br />
          {beginTime} ~ {endTime} (GMT+8){" "}
        </Text>
        <Text
          style={{ color: "#fff" }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </TextContainer>
    );
  };

  const Local = ({ beginTime, endTime }) => {
    return (
      <>
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请
          <Hyperlink onClick={csClick}>联系客服</Hyperlink>。
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
                  <Hyperlink onClick={csClick}>dịch vụ khách hàng</Hyperlink>。
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

        <Text>
          We are currently under maintenance, <br /> please try again later.
        </Text>
        <Text>
          If you have any questions, <br />
          please contact our{" "}
          <Hyperlink onClick={csClick}>customer service</Hyperlink>.
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
    <MaintenanceBg image={maintenanceImageSwitcher(config.wapVersion)}>
      <CustomContainer container justify="center" alignItems="center">
        {isFailed ? (
          <Local />
        ) : content ? (
          <Api />
        ) : (
          <Local beginTime={beginTime} endTime={endTime} />
        )}
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

export default Maintenance;
