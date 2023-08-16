import { createGlobalStyle } from "styled-components";
import i18n from "./utils/i18n";
import "./assets/fonts/notosans/notosans-sc/css.css";
import "./assets/fonts/notosans/notosans-tc/css.css";

const languageSwitcher = (language) => {
  switch (language) {
    case "en-US":
      return `Tahoma, Helvetica, Arial, sans-serif`;
    case "zh-CN":
      return `'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'`;
    case "zh-TW":
      return `'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'`;
    case "th-TH":
      return ``;
  }
};
export const GlobalStyles = createGlobalStyle`
* {
  font-family: ${languageSwitcher(i18n.language)};
}

.headerSubmenu .slick-track,
.headerSubmenu .slick-slider .slick-list {
  height: auto;
}

.headerSubmenu .slick-slide > div {
  display: flex;
  align-items: center;
}

.headerSubmenu .slick-prev {
  left: 0;
  top: 90px;
}

.headerSubmenu .slick-next {
  right: 0;
  top: 90px;
}
.headerSubmenu.slick-slider .slick-track,
.headerSubmenu.slick-slider .slick-list {
  margin-left: 25px;
  margin-right: 35px;
}

.headerSubmenu .slick-prev::before,
.headerSubmenu .slick-next::before {
  color: ${({ theme }) => theme.primary};
}

 
 


`;
