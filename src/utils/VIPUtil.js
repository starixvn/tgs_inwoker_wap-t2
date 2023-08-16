import vip00PNG from "../assets/images/wap/vip_00.png";
import vip01PNG from "../assets/images/wap/vip_01.png";
import vip02PNG from "../assets/images/wap/vip_02.png";
import vip03PNG from "../assets/images/wap/vip_03.png";
import vip04PNG from "../assets/images/wap/vip_04.png";
import vip05PNG from "../assets/images/wap/vip_05.png";

import IconVipBirthdayPNG from "../assets/images/wap/icon-vip-birthday.png";
import IconVipLevelPNG from "../assets/images/wap/icon-vip-level.png";
import IconVipFuhuoPNG from "../assets/images/wap/icon-vip-fuhuo.png";
import IconVipDepositPNG from "../assets/images/wap/icon-vip-deposit.png";
import IconVipWithdrawalPNG from "../assets/images/wap/icon-vip-withdrawal.png";
import IconVipSportsbookPNG from "../assets/images/wap/icon-vip-sportsbook.png";
import IconVipLivePNG from "../assets/images/wap/icon-vip-live.png";
import IconVipSlotPNG from "../assets/images/wap/icon-vip-slot.png";
import IconVipQipaiPNG from "../assets/images/wap/icon-vip-qipai.png";
import IconVipLotteryPNG from "../assets/images/wap/icon-vip-lottery.png";
import Common from "./Common";
function getVIPRequiredPoint(vipId) {
  let vipSetting = {};
  if (vipId === 2) {
    vipSetting.month = 3000;
    vipSetting.year = 30000;
  } else if (vipId === 3) {
    vipSetting.month = 8000;
    vipSetting.year = 80000;
  } else if (vipId === 4) {
    vipSetting.month = 25000;
    vipSetting.year = 250000;
  } else if (vipId === 5) {
    vipSetting.month = 75000;
    vipSetting.year = 750000;
  } else if (vipId === 6) {
    vipSetting.month = 350000;
    vipSetting.year = 2500000;
  }
  return vipSetting;
}
function getVIPBenefitList(vipId) {
  let vipSetting = {};
  if (vipId === 0) return [];
  if (vipId === 1) {
    //vip 0, override value
    vipSetting.birthdayBonus = 0;
    vipSetting.levelUpBonus = 0;
    vipSetting.vipHelpBonusLimit = 0;

    vipSetting.sportBonusPa = 100.18;
    vipSetting.casinoBonusPa = 100.58;
    vipSetting.slotBonusPa = 100.76;
    vipSetting.chessBonusPa = 100.76;
    vipSetting.lottoryBonusPa = 100.5;

    vipSetting.dpBonusPa = 0;
    vipSetting.dpMaxLimit = 0;

    vipSetting.withdrawal = 7;
  } else if (vipId === 2) {
    vipSetting.birthdayBonus = 588;
    vipSetting.levelUpBonus = 888;
    vipSetting.vipHelpBonusLimit = 500;

    vipSetting.sportBonusPa = 100.28;
    vipSetting.casinoBonusPa = 100.7;
    vipSetting.slotBonusPa = 100.9;
    vipSetting.chessBonusPa = 100.9;
    vipSetting.lottoryBonusPa = 100.7;

    vipSetting.dpBonusPa = 0;
    vipSetting.dpMaxLimit = 0;

    vipSetting.withdrawal = 8;
  } else if (vipId === 3) {
    vipSetting.birthdayBonus = 888;
    vipSetting.levelUpBonus = 1888;
    vipSetting.vipHelpBonusLimit = 1500;

    vipSetting.sportBonusPa = 100.38;
    vipSetting.casinoBonusPa = 100.8;
    vipSetting.slotBonusPa = 101;
    vipSetting.chessBonusPa = 101;
    vipSetting.lottoryBonusPa = 100.9;

    vipSetting.dpBonusPa = 10;
    vipSetting.dpMaxLimit = 2000;

    vipSetting.withdrawal = 10;
  } else if (vipId === 4) {
    vipSetting.birthdayBonus = 1888;
    vipSetting.levelUpBonus = 3888;
    vipSetting.vipHelpBonusLimit = 8000;

    vipSetting.sportBonusPa = 100.48;
    vipSetting.casinoBonusPa = 100.9;
    vipSetting.slotBonusPa = 101.1;
    vipSetting.chessBonusPa = 101.1;
    vipSetting.lottoryBonusPa = 101;

    vipSetting.dpBonusPa = 20;
    vipSetting.dpMaxLimit = 5000;

    vipSetting.withdrawal = 10;
  } else if (vipId === 5) {
    vipSetting.birthdayBonus = 8888;
    vipSetting.levelUpBonus = 18888;
    vipSetting.vipHelpBonusLimit = 35000;

    vipSetting.sportBonusPa = 100.58;
    vipSetting.casinoBonusPa = 101;
    vipSetting.slotBonusPa = 101.2;
    vipSetting.chessBonusPa = 101.2;
    vipSetting.lottoryBonusPa = 101.1;

    vipSetting.dpBonusPa = 30;
    vipSetting.dpMaxLimit = 10000;

    vipSetting.withdrawal = 12;
  } else if (vipId === 6) {
    vipSetting.birthdayBonus = 88888;
    vipSetting.levelUpBonus = 108888;
    vipSetting.vipHelpBonusLimit = 350000;

    vipSetting.sportBonusPa = 100.78;
    vipSetting.casinoBonusPa = 101.2;
    vipSetting.slotBonusPa = 101.5;
    vipSetting.chessBonusPa = 101.5;
    vipSetting.lottoryBonusPa = 101.2;

    vipSetting.dpBonusPa = 40;
    vipSetting.dpMaxLimit = 18000;

    vipSetting.withdrawal = 999;
  }
  return [
    {
      icon: IconVipBirthdayPNG,
      name: "生日礼金",
      value: formatAmountWithCurrenySymbol(vipSetting.birthdayBonus),
    },
    {
      icon: IconVipLevelPNG,
      name: "晋升獎金",
      value: formatAmountWithCurrenySymbol(vipSetting.levelUpBonus),
    },
    {
      icon: IconVipFuhuoPNG,
      name: "每月复活金（负盈利5%）",
      value: formatAmountWithCurrenySymbol(vipSetting.vipHelpBonusLimit),
    },
    {
      icon: IconVipDepositPNG,
      name: "每月存款优惠（" + vipSetting.dpBonusPa + "%）",
      value: formatAmountWithCurrenySymbol(vipSetting.dpMaxLimit),
    },
    {
      icon: IconVipWithdrawalPNG,
      name: "免费提款次数",
      value: getWithdrawalLimit(vipId),
    },
    {
      icon: IconVipSportsbookPNG,
      name: "沙巴体育返水",
      value: formatRate(vipSetting.sportBonusPa),
    },
    {
      icon: IconVipLivePNG,
      name: "真人娱乐返水",
      value: formatRate(vipSetting.casinoBonusPa),
    },
    {
      icon: IconVipSlotPNG,
      name: "小游戏返水[限老虎机]",
      value: formatRate(vipSetting.slotBonusPa),
    },
    {
      icon: IconVipQipaiPNG,
      name: "棋牌返水",
      value: formatRate(vipSetting.chessBonusPa),
    },
    {
      icon: IconVipLotteryPNG,
      name: "彩票返水",
      value: formatRate(vipSetting.lottoryBonusPa),
    },
  ];
}

function getVIPIcon(level) {
  switch (level) {
    case 1:
      return vip00PNG;
    case 2:
      return vip01PNG;
    case 3:
      return vip02PNG;
    case 4:
      return vip03PNG;
    case 5:
      return vip04PNG;
    case 6:
      return vip05PNG;
    default:
      return vip00PNG;
  }
}

function getWithdrawalLimit(level) {
  switch (level - 1) {
    case 1:
      return "8次";
    case 2:
      return "9次";
    case 3:
      return "10次";
    case 4:
      return "12次";
    case 5:
      return "无限次";
    default:
      return "7次";
  }
}

function getVIPTipsList() {
  return [
    "VIP存款优惠所需流水额的计算公式为： （存款+红利） X 1倍流水。",
    "会员需在每个月３号早上0点前完成实名、手机与邮箱认证，方可领取本活动优惠。",
    "VIP存款优惠红利 ，每月3号中午12点依据上个月VIP等级及最高单笔额度存款进行派发。",
    "VIP复活金于每月3号中午12点发放，依据会员在上一月的VIP等级计算发放上限。",
    "VIP每级晋升奖金只可领取一次。例：已经领取过VIP1的888奖金的，如果再次晋升VIP1时，将不会再次发放。",
  ];
}

function formatRate(x) {
  return (x - 100).toPrecision(2).replace(/\.?0+$/, "") + "%";
}

function formatAmountWithCurrenySymbol(x) {
  return "¥" + formatAmount(x);
}
function formatAmount(x) {
  return Common.formatNumberWithCommas(x).replace(/\.?0+$/, "");
}

const VIPUtil = {
  getVIPIcon,
  getVIPBenefitList,
  formatAmount,
  getVIPTipsList,
  getVIPRequiredPoint,
};
export default VIPUtil;
