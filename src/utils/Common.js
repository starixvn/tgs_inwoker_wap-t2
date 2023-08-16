import { GameTypeEnum, SlotGameParentId } from "../api-services/utils/Enum";
import ABCPNG from "../assets/images/wap/bank/abc.png";
import BCMPNG from "../assets/images/wap/bank/bcm.png";
import BOBPNG from "../assets/images/wap/bank/bob.png";
import BOCPNG from "../assets/images/wap/bank/boc.png";
import BOSPNG from "../assets/images/wap/bank/bos.png";
import CCBPNG from "../assets/images/wap/bank/ccb.png";
import CEBPNG from "../assets/images/wap/bank/ceb.png";
import CGDPNG from "../assets/images/wap/bank/cgd.png";
import CIBPNG from "../assets/images/wap/bank/cib.png";
import CMBPNG from "../assets/images/wap/bank/cmb.png";
import CMBCPNG from "../assets/images/wap/bank/cmbc.png";
import ECITICPNG from "../assets/images/wap/bank/ecitic.png";
import GFPNG from "../assets/images/wap/bank/gf.png";
import HXBPNG from "../assets/images/wap/bank/hxb.png";
import ICBCPNG from "../assets/images/wap/bank/icbc.png";
import PABPNG from "../assets/images/wap/bank/pab.png";
import PSBCPNG from "../assets/images/wap/bank/psbc.png";
import SPDBPNG from "../assets/images/wap/bank/spdb.png";
import DefaultPNG from "../assets/images/wap/bank/default.png";
import Provider1PNG from "../assets/images/provider1.png";
import Provider2PNG from "../assets/images/provider2.png";
import Provider3PNG from "../assets/images/provider3.png";
import Provider4PNG from "../assets/images/provider4.png";
import Provider5PNG from "../assets/images/provider5.png";
import Provider6PNG from "../assets/images/provider6.png";
import Provider7PNG from "../assets/images/provider7.png";
import Provider8PNG from "../assets/images/provider8.png";
import Provider9PNG from "../assets/images/provider9.png";
import Provider10PNG from "../assets/images/provider10.png";
import PromoImage1 from "../assets/images/promotion/promo-1.jpg";
import PromoImage2 from "../assets/images/promotion/promo-2.jpg";
import PromoImage3 from "../assets/images/promotion/promo-3.jpg";
import i18n from "./i18n";

var newWindow;

function getCDNLanguagePrefix() {
  var prefix = "en-US";
  var arr = [
    { lang: ["zh-CN", "zh-TW"], prefix: "zh-CN" },
    { lang: ["en-US"], prefix: "en-US" },
  ];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].lang.indexOf(i18n.language) >= 0) {
      prefix = arr[i].prefix;
      break;
    }
  }
  return prefix;
}
function getLanguagePrefixFolder() {
  var prefix = "en-US";
  var arr = [
    { lang: ["zh-CN"], prefix: "zh-CN" },
    { lang: ["zh-TW"], prefix: "zh-TW" },
    { lang: ["en-US"], prefix: "en-US" },
  ];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].lang.indexOf(i18n.language) >= 0) {
      prefix = arr[i].prefix;
      break;
    }
  }
  return prefix;
}
function readFileDataAsBinary(e) {
  const file = e.files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsArrayBuffer(file);
  });
}

function ConvertSlotGameParentIdToString(id) {
  for (let key in SlotGameParentId) {
    if (SlotGameParentId[key] === id) {
      return key;
    }
  }
}
function GetBankImageByTitle(title) {
  let bank = null;

  for (let k in this.bankImageMapping) {
    if (this.bankImageMapping[k.toLowerCase()].title === title) {
      bank = this.bankImageMapping[k.toLowerCase()];
      break;
    }
  }
  if (bank !== null) {
    return bank.image;
  } else {
    return DefaultPNG;
  }
}
function ConvertGameTypeToText(gameType) {
  switch (gameType) {
    case GameTypeEnum.LIVE:
      return "真人";
    case GameTypeEnum.QIPAI:
      return "棋牌";
    case GameTypeEnum.SPORTS:
      return "体育";
    case GameTypeEnum.LOTTERY:
      return "彩票";
    case GameTypeEnum.SLOT:
      return "电子";
    case GameTypeEnum.FISH:
      return "捕鱼";
    case GameTypeEnum.TIGERSLOT:
    default:
      return "老虎";
  }
}
function GetBankImageByCode(code) {
  let mapp = this.bankImageMapping[code.toLowerCase()];
  if (mapp) {
    return mapp;
  } else {
    return {
      id: 0,
      title: code,
      image: DefaultPNG,
    };
  }
}
function GetDisplayGameType() {
  return [
    GameTypeEnum.SPORTS,
    GameTypeEnum.ESPORTS,
    GameTypeEnum.LIVELOBBY,
    GameTypeEnum.QIPAILOBBY,
    GameTypeEnum.FISH,
    GameTypeEnum.LOTTERYLOBBY,
    GameTypeEnum.SLOT,
    GameTypeEnum.TABLEGAME,
    GameTypeEnum.RNGSPORTS,
    GameTypeEnum.COCKFIGHT,
  ];
}
const gameImageMapping = [
  { gcode: "AG", img: Provider1PNG },
  { gcode: "BG", img: Provider2PNG },
  { gcode: "SG", img: Provider3PNG },
  { gcode: "VR", img: Provider4PNG },
  { gcode: "KY", img: Provider5PNG },
  { gcode: "JDB", img: Provider6PNG },
  { gcode: "HABA", img: Provider7PNG },
  { gcode: "PP", img: Provider8PNG },
  { gcode: "SABA", img: Provider9PNG },
  { gcode: "SBO", img: Provider10PNG },
];

const bankImageMapping = {
  ab: {
    id: 0,
    title: "农业银行",
    image: ABCPNG,
  },
  abc: {
    id: 0,
    title: "农业银行",
    image: ABCPNG,
  },
  bcm: {
    id: 0,
    title: "北京银行",
    image: BCMPNG,
  },
  bob: {
    id: 0,
    title: "北京银行",
    image: BOBPNG,
  },
  boc: {
    id: 0,
    title: "中国银行",
    image: BOCPNG,
  },
  bos: {
    id: 0,
    title: "上海银行",
    image: BOSPNG,
  },
  ccb: {
    id: 0,
    title: "建设银行",
    image: CCBPNG,
  },
  ecitic: {
    id: 0,
    title: "中信银行",
    image: ECITICPNG,
  },
  citic: {
    id: 0,
    title: "中信银行",
    image: ECITICPNG,
  },
  ceb: {
    id: 0,
    title: "中国光大银行",
    image: CEBPNG,
  },

  cgd: {
    id: 0,
    title: "广发银行",
    image: CGDPNG,
  },
  cib: {
    id: 0,
    title: "兴业银行",
    image: CIBPNG,
  },
  cmb: {
    id: 0,
    title: "招商银行",
    image: CMBPNG,
  },
  cmbc: {
    id: 0,
    title: "民生银行",
    image: CMBCPNG,
  },
  hxb: {
    id: 0,
    title: "华夏银行",
    image: HXBPNG,
  },
  hxbank: {
    id: 0,
    title: "华夏银行",
    image: HXBPNG,
  },
  icbc: {
    id: 0,
    title: "工商银行",
    image: ICBCPNG,
  },
  pab: {
    id: 0,
    title: "平安银行",
    image: PABPNG,
  },
  psbc: {
    id: 0,
    title: "中国邮政储蓄银行",
    image: PSBCPNG,
  },
  spdb: {
    id: 0,
    title: "浦东发展银行",
    image: SPDBPNG,
  },
  gf: {
    id: 0,
    title: "广发银行",
    image: GFPNG,
  },
  gdb: {
    id: 0,
    title: "广发银行",
    image: GFPNG,
  },
  pingan: {
    id: 0,
    title: "平安银行",
    image: GFPNG,
  },
  spabank: {
    id: 0,
    title: "平安银行",
    image: GFPNG,
  },
};
var popup = {};
function PopupCenter(url, title, w, h) {
  if (popup[title]) {
    if (!popup[title].closed) {
      popup[title].focus();
      return;
    }
  }

  var dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  var dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  var systemZoom = 1;
  var left = (width - w) / 2 / systemZoom + dualScreenLeft;
  var top = (height - h) / 2 / systemZoom + dualScreenTop;
  top = top < 0 ? 0 : top;
  left = left < 0 ? 0 : left;
  newWindow = window.open(
    url,
    "gamewindow",
    "scrollbars=yes, width=" +
      w / systemZoom +
      ", height=" +
      h / systemZoom +
      ", top=" +
      top +
      ", left=" +
      left
  );

  if (
    !newWindow ||
    newWindow.closed ||
    typeof newWindow.closed == "undefined"
  ) {
    //POPUP BLOCKED
  } else {
    // Puts focus on the newWindow
    if (window.focus) newWindow.focus();
  }
  popup[title] = newWindow;
  return newWindow;
}
function closePreviousPopup() {
  if (newWindow !== undefined) newWindow.close();
}
function GetBonusCategory(type_id) {
  switch (type_id) {
    case 1:
      return "身份验证";

    case 2:
      return "邮件验证";

    case 3:
      return "手机验证";
    case 4:
      return "注册红利";
    case 5:
      return "VIP红利";
    case 8:
      return "签到红利";
    case 10:
      return "流水红利";
    case 11:
      return "单次存款红利";

    case 12:
      return "累计存款红利";

    case 21:
      return "累计流水";

    case 31:
      return "特殊红利";

    default:
      return "";
  }
}
function formatNumberWithCommas(x) {
  if (isNaN(x)) return x;
  return parseFloat(x)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatNumberWithThousand(x) {
  if (isNaN(x)) return x;
  return x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatNumberWithCommasNoRounding(x) {
  if (isNaN(x)) return x;
  return parseFloat(x)
    .toFixed(6)
    .slice(0, -4)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function loadScript(url, cb) {
  var scr = document.createElement("script");
  scr.type = "text/javascript";

  if (scr.readyState) {
    // IE
    scr.onreadystatechange = function () {
      if (scr.readyState === "loaded" || scr.readyState === "complete") {
        scr.onreadystatechange = null;
        cb();
      }
    };
  } else {
    // Others
    scr.onload = cb;
  }

  scr.src = url;
  document.getElementsByTagName("head")[0].appendChild(scr);
}
const promoImgMap = [PromoImage1, PromoImage2, PromoImage3];
function GetPromoImg(index) {
  return promoImgMap[index % 3];
}

const baseRouteUrl = `/:locale(en-US|zh-CN|zh-TW|th-TH|id-ID|vi-VN|hi-IN|ta-IN)`;

function addComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function arrayValidator(array) {
  return array && Array.isArray(array) && array.length > 0;
}

function truncateString(str, n) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

const Common = {
  baseRouteUrl,
  ConvertSlotGameParentIdToString,
  GetBonusCategory,
  formatNumberWithCommas,
  formatNumberWithThousand,
  formatNumberWithCommasNoRounding,
  PopupCenter,
  bankImageMapping,
  GetBankImageByTitle,
  GetBankImageByCode,
  loadScript,
  ConvertGameTypeToText,
  readFileDataAsBinary,
  GetDisplayGameType,
  gameImageMapping,
  GetPromoImg,
  getLanguagePrefixFolder,
  getCDNLanguagePrefix,
  addComma,
  closePreviousPopup,
  arrayValidator,
  truncateString,
};
export default Common;
