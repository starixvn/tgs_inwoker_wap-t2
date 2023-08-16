import { HubConnectionBuilder } from "@microsoft/signalr";
import { isMobileOnly } from "react-device-detect";
import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import { connect } from "react-redux";

const DepositStatus = (props) => {
  var dataformat = {
    type: "DepositNotify",
    payload: {
      formId: "b9dc0f76-3343-4e57-91c0-065f020acc07",
      orderNo: "GPIT230323130003",
      brandPaymentId: "f343a82c-af13-4d34-bfd1-e0fdf68e30f4",
      amount: 123.0,
      status: 8000,
      updatedOn: "2023-03-23T05:41:47.260674Z",
    },
  };

  const resultSwitcher = (status) => {
    switch (status) {
      case 7000:
        return "rejected";
      case 8000:
        return "approved";
      default:
        return "";
    }
  };

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
    const day = ("0" + dateTime.getDate()).slice(-2);
    const hours = ("0" + dateTime.getHours()).slice(-2);
    const minutes = ("0" + dateTime.getMinutes()).slice(-2);
    const seconds = ("0" + dateTime.getSeconds()).slice(-2);
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  //write a function at convert DepositNotify to deposit and WithdrawNotify to withdraw
  const convertType = (type) => {
    if (type === "DepositNotify") {
      return "Deposit";
    } else if (type === "WithdrawNotify") {
      return "Withdraw";
    }
  };

  //find matching brandPaymentId in the array then display the name
  const findTheName = (brandPaymentId) => {
    const depositTypeList = props.wallet.depositTypeList;
    for (const item of depositTypeList) {
      for (const method of item.method) {
        const channel = method.channel.find((channel) => {
          return channel.id === brandPaymentId;
        });
        if (channel) {
          return channel.channelname;
        }
      }
    }
    return "";
  };

  const ReconnectTimeDelay = 5000;
  const [open, setOpen] = useState(false);
  const start = (connection) => {
    console.log("start SignalR connection");
    return connection
      .start()
      .then(() => {
        console.log("SignalR connected");
        connection.on("notify", (message) => {
          setOpen(true);
          // add isRead = false into message as new variable
          const newMessage = { ...message, isRead: false };
          // get existing messages from local storage or start with an empty array
          const signalr = JSON.parse(localStorage.getItem("signalr")) || [];
          // check if the new message has the same orderNo as the last message in signalr
          const lastMessage = signalr[signalr.length - 1];
          if (
            lastMessage &&
            lastMessage.payload.orderNo === message.payload.orderNo
          ) {
            // if it is the same, remove the last message from signalr
            signalr.pop();
          }
          //alter the type to use the new one with convertType
          message.type = convertType(message.type);
          //alter the updatedOn to use the mew one with formatDateTime
          message.payload.updatedOn = formatDateTime(message.payload.updatedOn);
          // alter the methodName to use the new one with findTheName
          console.log(findTheName(message.payload.brandPaymentId));
          message.payload.paymentMethod =
            findTheName(message.payload.brandPaymentId) || "";

          //alter status to use the new one with resultSwitcher
          message.payload.status = resultSwitcher(message.payload.status);
          // add the new message to signalr
          signalr.push(newMessage);
          // save signalr back to local storage
          localStorage.setItem("signalr", JSON.stringify(signalr));
        });
      })
      .catch((error) => {
        console.error(error);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(start(connection));
          }, ReconnectTimeDelay);
        });
      });
  };

  const connect = new HubConnectionBuilder()
    .withUrl(config.baseUrl.replace("http" || "https", "ws") + "notify", {
      accessTokenFactory: () => {
        return localStorage.getItem("token" + (isMobileOnly ? "1" : "0"));
      },
      transport: 1,
      skipNegotiation: true,
    })
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    connect.onreconnecting((error) => {
      console.log(`SignalR error "${error}". Reconnecting.`);
    });
    connect.onreconnected((connectionId) => {
      console.log(
        `SignalR connection reestablished, connectionId "${connectionId}".`
      );
    });
    connect.onclose((error) => {
      console.log("SignalR connection closed due to error", error);
    });
  });

  useEffect(() => {
    if (props.account.token) {
      start(connect);
    } else {
      connect.stop();
    }
  }, [props.account.token]);

  //if open is true, set to false after 15sec
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 15000);
    }
  }, [open]);

  //if closed, remove the message from localStorage with matching orderNo
  // useEffect(() => {
  //   if (!open) {
  //     const signalr = JSON.parse(localStorage.getItem("signalr")) || [];
  //     const newSignalr = signalr.filter(
  //       (message) => message.payload.orderNo !== content.payload.orderNo
  //     );
  //     localStorage.setItem("signalr", JSON.stringify(newSignalr));
  //   }
  // }, [open]);

  return (
    <>
      {
        //  <PopupAnnouncement
        //    open={open}
        //    text={theHtmlContent}
        //    header=""
        //    onClose={() => {
        //      setOpen(false);
        //      const signalr = JSON.parse(localStorage.getItem("signalr")) || [];
        //      const newSignalr = signalr.filter(
        //        (message) => message.payload.orderNo !== content.payload.orderNo
        //      );
        //      localStorage.setItem("signalr", JSON.stringify(newSignalr));
        //    }}
        //  />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, null)(DepositStatus);
