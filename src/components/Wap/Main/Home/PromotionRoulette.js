import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DynamicFont from "react-dynamic-font";
import { Textfit } from "react-textfit";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { GeneralService } from "../../../../api-services/services/GeneralService";
import BtnRoulettePNG from "../../../../assets/images/roulette/btn-roulette.png";
import RoulettePointer from "../../../../assets/images/roulette/roulette-pointer.png";
import RouletteTurntable6 from "../../../../assets/images/roulette/roulette-turntable-6.png";
import RouletteTurntable12 from "../../../../assets/images/roulette/roulette-turntable-12.png";
import ModalBackgroundPNG from "../../../../assets/images/roulette/bg-modal.png";
import BtnClose from "../../../../assets/images/roulette/btn-close.png";
import TabActivePNG from "../../../../assets/images/roulette/tab-active.png";
import TabPNG from "../../../../assets/images/roulette/tab.png";
import EmptyBackgroundPNG from "../../../../assets/images/roulette/bg-empty.png";
import RouletteStandPNG from "../../../../assets/images/roulette/roulette-stand.png";

import i18n from "../../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import { AppHistory } from "../../../../history/History";
import config from "../../../../config/config";
import {
  RESET_PROMOROULETTE,
  SHOW_LOGIN,
} from "../../../../api-services/constant/actionType";

const moment = require("moment");
const RouletteEnum = {
  SIE: "ROULETTE",
  DAR: "DEPOSITACCUMULATEROULETTE",
};

const Container = styled.div``;

const BtnRoulette = styled.img`
  cursor: pointer;
  width: auto;
  height: ${({ size }) => {
    return size ? size : 200;
  }}px;
`;

const RouletteModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
    align-items: flex-start;
  }

  .MuiDialog-paper {
    min-width: 600px;
    background: #fffdee;
    border-radius: 50px;
    min-height: ${({ rouletteType }) =>
      rouletteType === RouletteEnum.DAR ? `485px` : `458px`};
    margin-top: 200px;
  }
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
  }

  .MuiDialog-paper {
    min-width: 549px;
    background: url(${EmptyBackgroundPNG}) no-repeat;
    min-height: 370px;
    background-position: -9px -6px;

    padding: ${({ isHistory }) => {
      return isHistory ? `45px 0 0 50px` : `100px 0 0 0`;
    }};
  }
`;

const ModalTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const ModalTitleH1 = styled(ModalTitle)`
  font-size: 3em
  width: 518px;
  margin: 0 auto;
`;
const ModalTitleH2 = styled(ModalTitle)`
  font-size: 2.5em;
  width: 518px;
  margin: 0 auto;
`;

const ModalTitleH3 = styled(ModalTitle)`
  font-size: 1.5em;
  font-weight: normal;
  color: #ff0000;
  cursor: pointer;
  width: 230px;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 30px;
  background: url(${BtnClose}) no-repeat;
  width: 31px;
  height: 31px;
  z-index: 5;
`;

const RouletteContainer = styled.div`
  width: 600px;
  height: ${({ rouletteType }) =>
    rouletteType === RouletteEnum.DAR ? `500px` : `458px`};
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background: url(${ModalBackgroundPNG});
  background-size: ${({ rouletteType }) =>
    rouletteType === RouletteEnum.DAR ? `602px 500px` : `602px 458px`};
  background-position-x: -2px;
`;

const TabContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: self-end;
  position: relative;
  z-index: 5;
`;

const Stand = styled.div`
  width: 200px;
  height: ${({ rouletteType }) =>
    rouletteType === RouletteEnum.DAR ? `114px` : `72px`};
  background: url(${RouletteStandPNG}) no-repeat;
  background-size: ${({ rouletteType }) =>
    rouletteType === RouletteEnum.DAR ? `200px 114px` : `cover`};
  margin: 0 auto;
  position: absolute;
  top: 386px;
  left: 200px;
  z-index: 1;
`;
const Tab = styled.div`
  cursor: pointer;
  height: 40px;
  width: 100px;
  padding: 0 10px;
  margin: 0 10px;
  color: ${(props) => (props.active ? `#000` : `#fff`)};
  background: url(${(props) =>
      props.active ? `${TabActivePNG}` : `${TabPNG}`})
    no-repeat;
  background-size: contain;
`;

const TabTitle = styled.div`
  line-height: 40px;
  text-align: center;
`;

const Content = styled.div`
  width: 600px;
  height: 286px;
  padding: 20px;
  overflow: auto;
`;

const TableContent = styled.div`
  height: 250px;
  overflow: auto;
`;

const StyledTableHead = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const StyledTableData = styled.td`
  font-size: 14px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: justify;

  tr ${StyledTableHead}:first-child, tr ${StyledTableData}:first-child {
    width: 50%;
  }
  tr ${StyledTableHead}:nth-child(2),
  tr ${StyledTableData}:nth-child(2) {
    width: 25%;
  }
  tr ${StyledTableHead}:nth-child(3),
  tr ${StyledTableData}:nth-child(3) {
    width: 20%;
  }
`;

const RouletteWrapper = styled.div`
  padding-top: 25px;
  position: relative;
  z-index: 2;
`;

const Turntable = styled.div`
  width: 385px;
  height: 385px;
  background: url(${(props) => props.turntableBG}) no-repeat;
  background-size: cover;
  margin: 0 auto;
`;
const Pointer = styled.div`
  width: 116px;
  height: 116px;
  background: url(${RoulettePointer}) no-repeat;
  position: absolute;
  left: 250px;
  top: 165px;
  cursor: pointer;
  ${(props) =>
    props.disabled
      ? `
  filter: grayscale(1);
  cursor: not-allowed;`
      : ``}
`;

const RouletteItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const RouletteLabelContainer = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  top: -32px;
  left: 52px;
  transform: scale(0.65);
`;
const RouletteTtem1 = styled.div`
  color: #fef6ec;
`;
const RouletteTtem2 = styled.div`
  width: 100%;
  height: 100%;
  transform: rotate(-135deg);
  color: #e62155;
`;

const RouletteSpan = styled.span`
  width: 50%;
  height: 50%;
  display: inline-block;
  position: absolute;
  line-height: 23px;
`;

const RouletteTitle = styled.b`
  //padding-left: 50px;
  font-size: 28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 75px;
  text-align: center;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 19px;
  font-family: Arial;
  margin-left: -8px;
`;
const EventLabel = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 6px;
  font-weight: bold;
`;
const EventText = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 12px;
`;

const RouletteCounterContainer = styled.div`
  position: relative;
  width: 50%;
  height: 37px;
  text-align: center;
  margin: 0 auto;
  z-index: 2;
  border: 2px solid #6d0f14;
  border-radius: 5px;
  background-color: #1f170b;
  color: #fff;
  padding: 3px 0;
  margin-top: 5px;
`;

const RouletteButtonWrapper = styled.div`
  position: relative;
`;

const CloseIcon = styled.div`
  position: absolute;
  padding: 0.5px 5px;
  border-radius: 50px;
  border: solid 1px #000;
  font-size: 12px;
  top: 0px;
  right: 0px;
  line-height: 19px;
  cursor: pointer;
  user-select: none;
`;

const ROULETTE_AREA_DEG_6 = [
  [326, 393],
  [36, 87],
  [91, 145],
  [149, 211],
  [215, 268],
  [272, 323],
];
const ROULETTE_ITEM_6 = [
  {
    label: "",
    style: {
      span: {
        top: "255px",
        right: "30px",
        transform: "rotate(46deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
  {
    label: "",
    style: {
      span: {
        top: "28px",
        left: "0px",
        transform: "rotate(25deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    label: "",
    style: {
      span: {
        top: "-21px",
        left: "182px",
        transform: "rotate(9deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-85deg)",
      },
    },
  },
  {
    label: "",
    style: {
      span: {
        bottom: "-33px",
        left: "103px",
        transform: "rotate(0deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-270deg)",
      },
    },
  },
  {
    label: "",
    style: {
      span: {
        top: "145px",
        left: "-35px",
        transform: "rotate(-20deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    label: "",
    style: {
      span: {
        top: "67px",
        right: "-24px",
        transform: "rotate(-29deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
];
const ROULETTE_AREA_DEG_12 = [
  [343, 373],
  [17, 41],
  [45, 74],
  [78, 102],
  [106, 134],
  [138, 161],
  [165, 194],
  [198, 221],
  [225, 252],
  [256, 279],
  [283, 312],
  [316, 339],
];
const ROULETTE_ITEM_12 = [
  {
    //1
    label: "",
    style: {
      span: {
        top: "255px",
        right: "30px",
        transform: "rotate(46deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
  {
    //2
    label: "",
    style: {
      span: {
        top: "-23px",
        right: "180px",
        transform: "rotate(242deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
  {
    //3
    label: "",
    style: {
      span: {
        top: "106px",
        left: "275px",
        transform: "rotate(160deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    //4
    label: "",
    style: {
      span: {
        top: "102px",
        left: "-27px",
        transform: "rotate(-3deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    //5
    label: "",
    style: {
      span: {
        top: "-21px",
        left: "182px",
        transform: "rotate(9deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-85deg)",
      },
    },
  },
  {
    //6
    label: "",
    style: {
      span: {
        top: "258px",
        left: "19px",
        transform: "rotate(208deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-85deg)",
      },
    },
  },
  {
    //7
    label: "",
    style: {
      span: {
        bottom: "257px",
        left: "30px",
        transform: "rotate(137deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-270deg)",
      },
    },
  },
  {
    //8
    label: "",
    style: {
      span: {
        bottom: "-29px",
        left: "183px",
        transform: "rotate(-26deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(-270deg)",
      },
    },
  },
  {
    //9
    label: "",
    style: {
      span: {
        top: "145px",
        left: "-35px",
        transform: "rotate(-20deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    //10
    label: "",
    style: {
      span: {
        top: "152px",
        left: "290px",
        transform: "rotate(175deg)",
      },
      label: {
        transform: "translate(-50%, -50%) rotate(185deg)",
      },
    },
  },
  {
    //11
    label: "",
    style: {
      span: {
        top: "275px",
        right: "190px",
        transform: "rotate(104deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
  {
    //12
    label: "",
    style: {
      span: {
        top: "-4px",
        right: "23px",
        transform: "rotate(-58deg)",
      },
      label: {
        transform: "translate(-50%, -50%)",
      },
    },
  },
];

const BackgroundOverlay = styled.div`
  width: 100%;
  border-radius: 50px;
  height: 500px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 3;

  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NewTitle1 = styled(ModalTitleH1)`
  color: #fff;
  font-size: 2.5rem;
`;

const Roulette = (props) => {
  const [startRotateDeg, setStartRotateDeg] = useState(0);
  useEffect(() => {
    if (props.itemIndex !== null && props.itemIndex >= 0) {
      handleSpinResult();
    } else if (props.itemIndex !== null && props.itemIndex < 0) {
      props.handleRouletteError("INDEX_ERROR");
    }
  }, [props.itemIndex]);

  const generateLabels = () => {
    return (
      <React.Fragment>
        <RouletteTtem1>
          {props.items.map((item, index) => {
            if (index % 2 !== 0) {
              return (
                <RouletteSpan style={item.style.span}>
                  <RouletteTitle style={item.style.label}>
                    <DynamicFont content={item.label}></DynamicFont>
                  </RouletteTitle>
                </RouletteSpan>
              );
            } else return null;
          })}
        </RouletteTtem1>
        <RouletteTtem2>
          {props.items.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <RouletteSpan style={item.style.span}>
                  <RouletteTitle style={item.style.label}>
                    <DynamicFont content={item.label}></DynamicFont>
                  </RouletteTitle>
                </RouletteSpan>
              );
            } else return null;
          })}
        </RouletteTtem2>
      </React.Fragment>
    );
  };

  const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  };

  const handleStartSpin = () => {
    if (!props.disableOnSpin) {
      if (props.account.token != null) {
        if (config.features.PromoRoulette_SMSVerification) {
          if (
            props.account.info.member_phone === null ||
            props.account.info.member_phone === ""
          ) {
            props.performCloseRouletteModal();
            props.handlePhoneVerifyClick();
          } else {
            props.getRouletteResult();
            handleSpin();
          }
        } else {
          props.getRouletteResult();
          handleSpin();
        }
      } else {
        props.handleOnSpinDisable();
        AppHistory.push("/" + i18n.language + "/login");
      }
    }
  };

  const handleSpin = () => {
    props.handleOnSpinDisable();
    const el = document.getElementById("roulette-turntable");
    const el2 = document.getElementById("roulette-label");
    const rouletteSpin =
      props.rouletteType === RouletteEnum.DAR && startRotateDeg >= 1800
        ? [{ transform: `rotate(${startRotateDeg + 1800}deg)` }]
        : [{ transform: "rotate(1800deg)" }];
    const rouletteTime = {
      duration: 1000,
      iterations: 30,
    };
    el.animate(rouletteSpin, rouletteTime);
    el2.animate(rouletteSpin, rouletteTime);
    if (props.rouletteType === RouletteEnum.DAR && startRotateDeg >= 1800) {
      setStartRotateDeg(startRotateDeg + 1800);
    } else {
      setStartRotateDeg(1800);
    }
  };

  const handleSpinResult = () => {
    const ROULETTE_AREA_DEG = props.getRouletteSetting().rouletteAreaDeg;
    const giftIndex = props.itemIndex; //  result-1 index
    const targetDegree = randomNum(
      ROULETTE_AREA_DEG[giftIndex][0],
      ROULETTE_AREA_DEG[giftIndex][1]
    );
    let rotateDeg = 0;

    let i = 0;

    const turntableEl = document.getElementById("roulette-turntable");
    const labelEl = document.getElementById("roulette-label");

    if (
      turntableEl.getAnimations().length > 0 &&
      labelEl.getAnimations().length > 0
    ) {
      turntableEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].pause();
      turntableEl.getAnimations()[0].finish();
      labelEl.getAnimations()[0].finish();
    }
    if (labelEl.getAnimations().length > 0) {
      labelEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].finish();
    }
    const _fn = (n = 0) => {
      if (targetDegree + 360 * n > startRotateDeg) {
        rotateDeg = targetDegree + 360 * n;
      } else {
        i++;
        _fn(i);
      }
    };
    _fn();
    if (props.rouletteType === RouletteEnum.DAR) {
      setStartRotateDeg(rotateDeg + 360);
    }
    turntableEl.style.transform = `rotate(${rotateDeg + 360}deg)`;
    turntableEl.style.transition = `all 1000ms ease-out`;
    labelEl.style.transform = `rotate(${rotateDeg + 360}deg)`;
    labelEl.style.transition = `all 1000ms ease-out`;
    turntableEl.ontransitionend = () => {
      setTimeout(() => {
        if (props.rouletteType === RouletteEnum.SIE) {
          props.performCloseRouletteModal();
        } else if (props.rouletteType === RouletteEnum.DAR) {
          props.updateRouletteCount();
        }
        props.performOpenEmptyModal(
          i18n.t("promoRoulette.dialogRewardTitle1"),
          props.items[giftIndex].label
        );
      }, 500);
      turntableEl.style.transition = `none`;
      labelEl.style.transition = `none`;
    };
    setStartRotateDeg(rotateDeg + 360);
  };

  return (
    <RouletteWrapper>
      <Turntable
        id="roulette-turntable"
        turntableBG={props.getRouletteSetting().turntableBG}
      ></Turntable>
      <RouletteLabelContainer>
        <RouletteItemContainer id="roulette-label">
          {generateLabels()}
        </RouletteItemContainer>
      </RouletteLabelContainer>
      <Pointer
        disabled={props.disableOnSpin}
        onClick={handleStartSpin}
      ></Pointer>
    </RouletteWrapper>
  );
};

const PromotionRoulette = (props) => {
  const [rouletteModal, setRouletteModal] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [disableOnSpin, setDisableOnSpin] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [rouletteCount, setRouletteCount] = useState(null);
  const [rouletteHistory, setRouletteHistory] = useState([]);

  const [displayRoulette, setDisplayRoulette] = useState(true);

  const getRouletteSetting = () => {
    switch (props.rouletteType) {
      case RouletteEnum.SIE:
        return {
          turntableBG: RouletteTurntable6,
          rouletteAreaDeg: ROULETTE_AREA_DEG_6,
          rouletteItems: ROULETTE_ITEM_6,
        };
      case RouletteEnum.DAR:
        return {
          turntableBG: RouletteTurntable12,
          rouletteAreaDeg: ROULETTE_AREA_DEG_12,
          rouletteItems: ROULETTE_ITEM_12,
        };
      default:
        return {
          turntableBG: RouletteTurntable6,
          rouletteAreaDeg: ROULETTE_AREA_DEG_6,
          rouletteItems: ROULETTE_ITEM_6,
        };
    }
  };

  const mapRouletteItems = ({ items, rouletteItems, rouletteitems }) => {
    const itemList = getRouletteSetting().rouletteItems;
    itemList.map((item, index) => {
      if (items && items[index]) {
        item.label = items[index].title;
        item.id = items[index].id;
      } else if (rouletteItems && rouletteItems[index]) {
        item.label = rouletteItems[index].title;
        item.id = rouletteItems[index].title;
      } else if (rouletteitems && rouletteitems[index]) {
        item.label = rouletteitems[index].title;
        item.id = rouletteitems[index].title;
      }
      return item;
    });
    return itemList;
  };
  const [items, setItems] = useState([]);
  const [promotionDetail, setPromotionDetail] = useState(
    props.promotionDetail || {}
  );
  const mapPromotionDetail = ({
    terms,
    viplevels,
    period,
    content,
    localization,
  }) => {
    setPromotionDetail((promotionDetail) => ({
      ...promotionDetail,
      terms: terms,
      viplevels: viplevels,
      period: period,
      content: content,
      localization: localization,
    }));
  };
  useEffect(() => {
    if (
      (!config.features.RouletteNewFlow &&
        props.general.isRouletteAvailable != null) ||
      rouletteCount !== null
    ) {
      if (
        ((!config.features.RouletteNewFlow &&
          props.general.isRouletteAvailable) ||
          rouletteCount > 0) &&
        rouletteModal
      ) {
        if (disableOnSpin) {
          setDisableOnSpin(false);
        }
      } else if (
        ((!config.features.RouletteNewFlow &&
          !props.general.isRouletteAvailable) ||
          rouletteCount <= 0) &&
        rouletteModal
      ) {
        if (props.rouletteType === RouletteEnum.SIE) {
          setRouletteModal(false);
          setDisableOnSpin(false);
          performOpenEmptyModal(
            i18n.t("promoRoulette.dialogUnavailableTitle1"),
            i18n.t("promoRoulette.dialogUnavailableTitle2"),
            i18n.t("promoRoulette.dialogUnavailableTitle3")
          );
        } else if (props.rouletteType === RouletteEnum.DAR) {
          setTimeout(() => {
            setDisableOnSpin(true);
          }, 100);
        }
      }
    } else if (rouletteCount === null && props.account.token !== null) {
      if (!disableOnSpin) {
        setDisableOnSpin(true);
      }
    }
  }, [props.general.isRouletteAvailable, rouletteModal, rouletteCount]);

  useEffect(() => {
    if (props.general.rouletteCount.length > 0) {
      let index = props.general.rouletteCount.findIndex((item) => {
        return (
          item.promotionid === promotionDetail.id &&
          item.promotiontype.toUpperCase() === RouletteEnum.DAR
        );
      });
      if (index > 0) {
        setRouletteCount(props.general.rouletteCount[index].roulettecount);
      }
    }
  }, [props.general.rouletteCount, rouletteCount, promotionDetail.id]);

  useEffect(() => {
    if (!isIdenticalArray(rouletteHistory, props.general.rouletteHistory)) {
      setRouletteHistory(props.general.rouletteHistory);
    }
  }, [props.general.rouletteHistory, rouletteHistory]);

  const isIdenticalArray = (arr1, arr2) => {
    if (arr1 && arr2) {
      var sortedArr1 = arr1.sort(function (a, b) {
        return new Date(a.createdon) - new Date(b.createdon);
      });
      var sortedArr2 = arr2.sort(function (a, b) {
        return new Date(a.createdon) - new Date(b.createdon);
      });
      return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
    } else {
      return "";
    }
  };

  const performOpenRouletteModal = () => {
    setRouletteModal(true);
  };

  const performCloseRouletteModal = () => {
    props.resetPromoRoulette();
    setDisableOnSpin(false);
    setRouletteModal(false);
    setTabIndex(0);
    setIsTabOpen(false);
  };

  const performOpenEmptyModal = (title1, title2, title3, history) => {
    setEmptyModal(true);
    setDialogContent({
      title1,
      title2,
      title3,
      history,
    });
  };

  const performCloseEmptyModal = () => {
    props.resetPromoRoulette();
    setEmptyModal(false);
    setDialogContent({});
  };

  const handleOpenTab = (index) => {
    if (tabIndex === index && isTabOpen) {
      setIsTabOpen(false);
    } else {
      setIsTabOpen(true);
    }
  };

  const handleSwitchTab = (index) => {
    setTabIndex(index);
  };

  const handleOnSpinDisable = () => {
    setDisableOnSpin(true);
  };

  const handlePhoneVerifyClick = () => {
    AppHistory.push("/" + i18n.language + "/profile/phone");
  };

  const handleNavigateToPromotion = () => {
    AppHistory.push("/" + i18n.language + "/promotion-list");
    performCloseEmptyModal();
  };

  const getRouletteResult = () => {
    if (props.rouletteType === RouletteEnum.SIE) {
      props.getPromotionRouletteResult(promotionDetail.id).then((response) => {
        if (!response.IsSuccess) {
          handleRouletteError();
        }
      });
    } else if (props.rouletteType === RouletteEnum.DAR) {
      props
        .getDepositAccumulateRouletteResult(promotionDetail.id)
        .then((response) => {
          if (!response.IsSuccess) {
            handleRouletteError();
          }
        });
    }
  };

  const handleRouletteError = (errorType) => {
    let title1 = "";
    let title2 = "";
    switch (errorType) {
      case "INDEX_ERROR":
        title1 = i18n.t("promoRoulette.dialogIndexErrorTitle1");
        break;
      default:
        title1 = i18n.t("promoRoulette.dialogErrorTitle1");
        title2 = i18n.t("promoRoulette.dialogErrorTitle2");
        break;
    }
    const turntableEl = document.getElementById("roulette-turntable");
    const labelEl = document.getElementById("roulette-label");

    if (
      turntableEl.getAnimations().length > 0 &&
      labelEl.getAnimations().length > 0
    ) {
      turntableEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].pause();
      turntableEl.getAnimations()[0].finish();
      labelEl.getAnimations()[0].finish();
    }
    if (labelEl.getAnimations().length > 0) {
      labelEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].finish();
    }
    performOpenEmptyModal(
      title1,
      title2,
      i18n.t("promoRoulette.dialogUnavailableTitle3")
    );
  };

  const getRouletteStatus = async () => {
    if (props.rouletteType === RouletteEnum.SIE) {
      if (config.features.RouletteNewFlow) {
        await updateRouletteCount();
      } else {
        setItems(mapRouletteItems(promotionDetail.campaignDetail));
        if (props.account.token != null) {
          props.getPromotionRouletteStatus(promotionDetail.id);
        }
      }
    } else if (props.rouletteType === RouletteEnum.DAR) {
      await updateRouletteCount();
      await props
        .getDepositAccumulateRoulette(promotionDetail.id)
        .then((response) => {
          if (response.data !== null) {
            setItems(mapRouletteItems(response.data));
            mapPromotionDetail(response.data);
          }
        });
    }
  };

  const updateRouletteCount = async () => {
    await GeneralService.GetPromotionRouletteCount().then((response) => {
      if (response.IsSuccess) {
        if (response.data.length > 0) {
          let index = response.data.findIndex((item) => {
            return (
              item.promotionid === promotionDetail.id &&
              item.promotiontype.toUpperCase() ===
                props.rouletteType.toUpperCase()
            );
          });
          if (index >= 0) {
            setRouletteCount(response.data[index].roulettecount);
          } else {
            setRouletteCount(0);
          }
        } else {
          setRouletteCount(0);
        }
      } else {
        setRouletteCount(0);
      }
    });
    await props.getDepositAccumulateRouletteHistory(promotionDetail.id);
  };

  const tabMenu = [
    {
      label: i18n.t("promoRoulette.main"),
    },
    {
      label: i18n.t("promoRoulette.content"),
    },
    {
      label: i18n.t("promoRoulette.terms"),
    },
    {
      label: i18n.t("promoRoulette.history"),
    },
  ];

  const HistoryContent = () => {
    return (
      <>
        <StyledTable>
          <tr>
            <StyledTableHead>
              {i18n.t("promoRoulette.winningID")}
            </StyledTableHead>
            <StyledTableHead>
              {i18n.t("promoRoulette.dateTime")}
            </StyledTableHead>
            <StyledTableHead>
              {i18n.t("promoRoulette.winnings")}
            </StyledTableHead>
          </tr>
        </StyledTable>

        <TableContent>
          <StyledTable>
            {items.length > 0 &&
              rouletteHistory.length > 0 &&
              rouletteHistory
                .sort((a, b) => new Date(b.createdon) - new Date(a.createdon))
                .map((row) => {
                  return (
                    <tr>
                      <StyledTableData>{row.id}</StyledTableData>
                      <StyledTableData>
                        {moment(row.createdon)
                          .utcOffset("+0800")
                          .format("HH:mm:ss DD/MM/YYYY")}
                      </StyledTableData>
                      <StyledTableData>
                        {items[row.itemindex].label}
                      </StyledTableData>
                    </tr>
                  );
                })}
          </StyledTable>
        </TableContent>
      </>
    );
  };

  return (
    <React.Fragment>
      <Container
        rouletteType={props.rouletteType}
        position={
          config.features.RouletteSetting &&
          config.features.RouletteSetting.wap &&
          config.features.RouletteSetting.wap.position
        }
      >
        {displayRoulette && (
          <RouletteButtonWrapper>
            <CloseIcon
              onClick={() => {
                setDisplayRoulette(false);
              }}
            >
              ✖
            </CloseIcon>
            <BtnRoulette
              size={
                config.features.RouletteSetting &&
                config.features.RouletteSetting.wap &&
                config.features.RouletteSetting.wap.size
              }
              src={BtnRoulettePNG}
              onClick={() => {
                getRouletteStatus();
                performOpenRouletteModal();
              }}
            ></BtnRoulette>
          </RouletteButtonWrapper>
        )}
      </Container>
      <RouletteModal
        open={rouletteModal}
        onClose={performCloseRouletteModal}
        rouletteType={props.rouletteType}
      >
        <RouletteContainer rouletteType={props.rouletteType}>
          {props.rouletteType === RouletteEnum.DAR && rouletteCount === 0 && (
            <BackgroundOverlay>
              <NewTitle1>
                <Textfit min={38} max={48}>
                  {i18n.t("promoRoulette.outOfCount")}
                </Textfit>
              </NewTitle1>
            </BackgroundOverlay>
          )}

          <Roulette
            rouletteType={props.rouletteType}
            itemIndex={props.general.itemIndex}
            items={items}
            account={props.account}
            showLogin={props.showLogin}
            disableOnSpin={disableOnSpin}
            handleOnSpinDisable={handleOnSpinDisable}
            getRouletteResult={getRouletteResult}
            performOpenEmptyModal={performOpenEmptyModal}
            performCloseRouletteModal={performCloseRouletteModal}
            handlePhoneVerifyClick={handlePhoneVerifyClick}
            getRouletteSetting={getRouletteSetting}
            updateRouletteCount={updateRouletteCount}
            handleRouletteError={handleRouletteError}
          ></Roulette>
          {props.rouletteType === RouletteEnum.DAR && (
            <RouletteCounterContainer>
              {" "}
              {i18n
                .t("promoRoulette.remainingSpin")
                .replace(/{rouletteCount}/g, rouletteCount)}{" "}
            </RouletteCounterContainer>
          )}
          <TabContainer>
            {tabMenu.map((item, index) => {
              return (
                <Tab
                  active={index === tabIndex}
                  onClick={() => {
                    handleOpenTab(index);
                    handleSwitchTab(index);
                  }}
                >
                  <TabTitle>
                    <DynamicFont content={item.label}></DynamicFont>
                  </TabTitle>
                </Tab>
              );
            })}
          </TabContainer>
          <Stand rouletteType={props.rouletteType}></Stand>
        </RouletteContainer>
        {isTabOpen && (
          <Content>
            {tabIndex === 0 && (
              <React.Fragment>
                <EventTitle>【{i18n.t("promotion.promoDetail")}】</EventTitle>
                <EventLabel>{i18n.t("promotion.promoTarget")}:</EventLabel>
                <EventText>
                  {promotionDetail.viplevels &&
                    promotionDetail.viplevels
                      .sort((a, b) => {
                        return a - b;
                      })
                      .map((a, index) => {
                        return (
                          <span key={index}>
                            VIP{a}
                            {index < promotionDetail.viplevels.length - 1 &&
                              ", "}
                          </span>
                        );
                      })}
                </EventText>
                <br />
                <EventLabel>{i18n.t("promotion.promoDate")}：</EventLabel>
                <EventText>
                  {promotionDetail.period &&
                    promotionDetail.period.from &&
                    moment(promotionDetail.period.from).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )}
                  {" - "}
                  {promotionDetail.period &&
                    promotionDetail.period.to &&
                    moment(promotionDetail.period.to).format(
                      "YYYY/MM/DD HH:mm:ss"
                    )}
                </EventText>
              </React.Fragment>
            )}
            {tabIndex === 1 && (
              <React.Fragment>
                <EventText
                  dangerouslySetInnerHTML={{
                    __html:
                      "<div>" +
                      (() => {
                        return (
                          (promotionDetail.localization &&
                            promotionDetail.localization[i18n.language]
                              .content) ||
                          promotionDetail.content ||
                          ""
                        );
                      })() +
                      "</div>",
                  }}
                ></EventText>
              </React.Fragment>
            )}
            {tabIndex === 2 && (
              <React.Fragment>
                <EventText
                  dangerouslySetInnerHTML={{
                    __html:
                      "<div>" +
                      (() => {
                        return (
                          (promotionDetail.localization &&
                            promotionDetail.localization[i18n.language]
                              .terms) ||
                          promotionDetail.terms ||
                          ""
                        );
                      })() +
                      "</div>",
                  }}
                ></EventText>
              </React.Fragment>
            )}
            {tabIndex === 3 && <HistoryContent />}
          </Content>
        )}
        <CloseButton onClick={performCloseRouletteModal}></CloseButton>
      </RouletteModal>
      <CustomModal
        open={emptyModal}
        isHistory={dialogContent.history}
        onClose={performCloseEmptyModal}
      >
        {dialogContent.title1 && (
          <ModalTitleH1>
            <Textfit min={38} max={48}>
              {dialogContent.title1}
            </Textfit>
          </ModalTitleH1>
        )}
        {dialogContent.title2 && (
          <ModalTitleH2>
            <Textfit min={30} max={40}>
              {dialogContent.title2}
            </Textfit>
          </ModalTitleH2>
        )}
        {dialogContent.title3 && (
          <ModalTitleH3 onClick={handleNavigateToPromotion}>
            <Textfit min={14} max={24}>
              {dialogContent.title3}
            </Textfit>
          </ModalTitleH3>
        )}

        {dialogContent.history && <HistoryContent />}
      </CustomModal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    getPromotionRouletteStatus: (id) =>
      dispatch(generalAction.getPromotionRouletteStatus(id)),
    getPromotionRouletteResult: (id) =>
      dispatch(generalAction.getPromotionRouletteResult(id)),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
    getDepositAccumulateRoulette: (promotionId) =>
      dispatch(generalAction.getDepositAccumulateRoulette(promotionId)),
    getDepositAccumulateRouletteResult: (promotionId) =>
      dispatch(generalAction.getDepositAccumulateRouletteResult(promotionId)),
    getDepositAccumulateRouletteHistory: (promotionId) =>
      dispatch(generalAction.getDepositAccumulateRouletteHistory(promotionId)),
    resetPromoRoulette: () => dispatch({ type: RESET_PROMOROULETTE }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionRoulette);
