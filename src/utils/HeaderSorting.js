import config from "../config/config";
import i18n from "./i18n";
import { GameTypeEnum } from "../api-services/utils/Enum";

const MenuItemList = [
  {
    path: "esports",
    title: "common.esports",
    gameType: [GameTypeEnum.ESPORTS],
    sorting: 1,
    sortingGMO: 7,
    sortingHK28: 2,
    sortingPB: 4,
    sortingSKY: 7,
    sortingWLGHK: 4,
    sortingPB3: 6,
    sortingBUNNY: 4,
  },
  {
    path: "sports",
    title: "common.sport",
    gameType: [GameTypeEnum.SPORTS, GameTypeEnum.RNGSPORTS],
    sorting: 2,
    sortingGMO: 5,
    sortingHK28: 2,
    sortingPB: 3,
    sortingSKY: 3,
    sortingWLGHK: 3,
    sortingPB3: 3,
    sortingBUNNY: 3,
  },
  {
    path: "live",
    title: "common.live",
    gameType: [GameTypeEnum.LIVELOBBY],
    sorting: 3,
    sortingGMO: 1,
    sortingHK28: 1,
    sortingPB: 2,
    sortingSKY: 1,
    sortingWLGHK: 1,
    sortingPB3: 2,
    sortingBUNNY: 1,
  },
  {
    path: "chess",
    title: "common.chess",
    gameType: [GameTypeEnum.QIPAILOBBY],
    sorting: 4,
    sortingGMO: 2,
    sortingHK28: 3,
    sortingPB: 8,
    sortingSKY: 2,
    sortingWLGHK: 2,
    sortingPB3: 7,
    sortingBUNNY: 2,
  },

  {
    path: "lottery",
    title: "common.lottery",
    gameType: [GameTypeEnum.LOTTERYLOBBY],
    sorting: 5,
    sortingGMO: 6,
    sortingHK28: 7,
    sortingPB: 7,
    sortingSKY: 8,
    sortingWLGHK: 6,
    sortingPB3: 8,
    sortingBUNNY: 5,
  },
  {
    path: `slots`,
    title: "common.slot",
    gameType: [GameTypeEnum.SLOT],
    sorting: 6,
    sortingGMO: 8,
    sortingHK28: 4,
    sortingPB: 1,
    sortingSKY: 5,
    sortingWLGHK: 7,
    sortingPB3: 1,
    sortingBUNNY: 6,
  },
  {
    path: `electron`,
    title: "common.electron",
    gameType: [GameTypeEnum.TABLEGAME],
    sorting: 7,
    sortingGMO: 3,
    sortingHK28: 6,
    sortingPB: 5,
    sortingSKY: 6,
    sortingWLGHK: 8,
    sortingPB3: 4,
    sortingBUNNY: 7,
  },
  {
    path: `fish`,
    title: "common.fish",
    gameType: [GameTypeEnum.FISH],
    sorting: 8,
    sortingGMO: 4,
    sortingHK28: 5,
    sortingPB: 6,
    sortingSKY: 4,
    sortingWLGHK: 5,
    sortingPB3: 5,
    sortingBUNNY: 8,
  },
  {
    path: `cockfight`,
    title: "common.cockfight",
    gameType: [GameTypeEnum.COCKFIGHT],
    sorting: 9,
    sortingGMO: 9,
    sortingHK28: 9,
    sortingPB: 9,
    sortingSKY: 9,
    sortingWLGHK: 9,
    sortingBUNNY: 9,
    include: ["SM01", "AWC_COCKFIGHT"],
  },
];

export const SortedMenuList = MenuItemList.sort((a, b) => {
  if (config.features.MenuItem_Sorting_PB3) {
    return a.sortingPB3 > b.sortingPB3 ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_HK28) {
    return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_WLGHK) {
    return a.sortingWLGHK > b.sortingWLGHK ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_SKY) {
    return a.sortingSKY > b.sortingSKY ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_PB) {
    return a.sortingPB > b.sortingPB ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_GMO) {
    return a.sortingGMO > b.sortingGMO ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_PISO) {
    return a.sortingPISO > b.sortingPISO ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_BUNNY) {
    return a.sortingBUNNY > b.sortingBUNNY ? 1 : -1;
  } else {
    return a.sorting > b.sorting ? 1 : -1;
  }
});
