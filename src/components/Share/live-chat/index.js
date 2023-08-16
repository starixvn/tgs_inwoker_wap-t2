import React from "react";
import Smartsupp from "./smartsupp";
import LiveChatCS from "./livechat";
import Tawkto from "./tawkto";
import Zendesk from "./zendesk";

const LiveChat = ({ vendor, license, group }) => {
  const typeSwitcher = (vendor) => {
    switch (vendor) {
      case "smartsupp":
        return <Smartsupp smartsuppkey={license} />;
      case "livechat":
        return <LiveChatCS license={license} group={group}/>;
      case "tawk":
        return <Tawkto license={license} />;
      case "zendesk":
        return <Zendesk license={license} />;
      default:
        return "";
    }
  };

  return typeSwitcher(vendor);
};

export default LiveChat;
