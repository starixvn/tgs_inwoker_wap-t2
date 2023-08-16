import config from "../../../../config/config";
import { themeList } from "./../../../../theme";
import { isMobileOnly } from "react-device-detect";
var muiThemeMode = isMobileOnly
  ? themeList[config.brand] || themeList[config.theme]
  : themeList[config.theme];

const Smartsupp = ({ smartsuppkey, xPosition, yPosition }) => {
  const offsetX = xPosition || 50;
  const offsetY = yPosition || 50;
  const script = document.createElement("script");
  script.innerHTML =
    `var _smartsupp = _smartsupp || {};
        _smartsupp.key = "` +
    smartsuppkey +
    `"; _smartsupp.color ="` +
    muiThemeMode.primary +
    `";
    _smartsupp.offsetX="` +
    offsetX +
    `";
    _smartsupp.offsetY="` +
    offsetY +
    `";
        window.smartsupp ||
          (function (d) {
            var s,
              c,
              o = (smartsupp = function () {
                o._.push(arguments);
              });
            o._ = [];
            s = d.getElementsByTagName("script")[0];
            c = d.createElement("script");
            c.type = "text/javascript";
            c.charset = "utf-8";
            c.async = true;
            c.src = "https://www.smartsuppchat.com/loader.js?";
            s.parentNode.insertBefore(c, s);
          })(document)`;
  document.body.appendChild(script);
  return "";
};

export default Smartsupp;
