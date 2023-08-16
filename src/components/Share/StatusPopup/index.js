import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import i18n from "../../../utils/i18n";
import PopupAnnouncement from "../../App/Home/PopupAnnouncement";

const ThePopup = ({ data, index, onClose, wallet }) => {
  const [open, setOpen] = useState(true);

  const findTheName = (brandPaymentId) => {
    const depositTypeList = wallet.depositTypeList;
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

  const theHtmlContent = (
    currentItem
  ) => `<div style="display: grid; grid-template-columns: auto auto; gap: 5px 10px;"><div>${i18n.t(
    "depositAndWithdrawalStatus.updatedTime"
  )}:</div><div>${currentItem?.payload.updatedOn}</div><div>${i18n.t(
    "depositAndWithdrawalStatus.orderNo"
  )}:</div><div>${currentItem?.payload.orderNo}</div><div>${i18n.t(
    "depositAndWithdrawalStatus.channel"
  )}</div><div>${
    currentItem?.payload.paymentMethod ||
    findTheName(currentItem?.payload.brandPaymentId)
  }</div><div>${i18n.t("depositAndWithdrawalStatus.amount")}:</div><div>${
    currentItem?.payload.amount
  }</div><div>${i18n.t(
    "depositAndWithdrawalStatus.status"
  )}:</div><div>${i18n.t(
    "depositAndWithdrawalStatus." + currentItem?.payload.status
  )}</div></div>
  `;

  useEffect(() => {
    if (open) {
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 15000);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      onClose();
    }
  }, [open, onClose]);

  return (
    <PopupAnnouncement
      open={open}
      text={theHtmlContent(data)}
      header={i18n.t("depositAndWithdrawalStatus." + data?.type)}
      onClose={() => {
        onClose();
      }}
      key={index}
    />
  );
};

const StatusPopup = (props) => {
  const signalrInLocalStorage = localStorage.getItem("signalr");
  const signalr = JSON.parse(signalrInLocalStorage) || [];

  const [queue, setQueue] = useState(signalr);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (queue.length > 0 && !current) {
      setCurrent(queue[0]);
      setQueue(queue.slice(1));
    }
  }, [queue, current]);

  const handlePopupClose = () => {
    setCurrent(null);
    //delete the data from localStorage
    const newSignalr = queue.filter(
      (message) => message.payload.orderNo !== current.payload.orderNo
    );
    localStorage.setItem("signalr", JSON.stringify(newSignalr));
  };

  return current ? (
    <ThePopup data={current} onClose={handlePopupClose} wallet={props.wallet} />
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};

export default connect(mapStateToProps, null)(StatusPopup);
