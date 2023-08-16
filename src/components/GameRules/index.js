// import React, { Component } from "react";

// import { withRouter } from "react-router-dom";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
// import TreeView from "@material-ui/lab/TreeView";
// import TreeItem from "@material-ui/lab/TreeItem";
// import Typography from "@material-ui/core/Typography";
// import Footer from "../App/Footer";
// import HeaderMini from "../App/HeaderMini";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// import AboutUsBgPNG from "../../assets/images/aboutus-bg.png";
// import Config from "../../config/config";
// import i18n from "../../utils/i18n";
// import BGJPG from "../../assets/images/bg.jpg";
// const Container = styled.div`
//   width: 100%;

//   position: relative;
//   background: url(${BGJPG});
// `;
// const InnerWrap = styled.div`
//   margin: 26px auto;
//   width: 1280px;
//   background-color: #152326;
// `;
// const LeftContainer = styled.div`
//   width: 207px;

//   float: left;
//   background-color: #29356c;
//   margin: 5px;
// `;
// const LeftContainerHeader = styled.div`
//   background: url(${AboutUsBgPNG}) no-repeat;
//   width: 207px;
//   height: 113px;
//   padding: 10px;
// `;
// const HeaderTitle = styled.div`
//   font-size: 29px;
//   color: #f5e3e0;
// `;
// const HeaderTitle2 = styled.div`
//   font-family: Arial;
//   font-size: 21px;

//   color: #f5e3e0;
// `;
// const RightContainer = styled.div`
//   width: 1057px;

//   float: left;
//   background-color: #ffffff;
//   margin: 5px 5px 5px 0;
//   padding-bottom: 20px;
// `;

// const useTreeItemStyles = makeStyles(theme => ({
//   root: {
//     color: "#bfd2bf",
//     fontSize: "14px",
//     "&:focus > $content": {
//       backgroundColor: `var(--tree-view-bg-color, 'transparent')`,
//       color: "#fbeba4"
//     }
//   },
//   content: {
//     color: "#bfd2bf",

//     padding: "11px 0",

//     "$expanded > &": {
//       backgroundColor: `var(--tree-view-bg-color, 'transparent')`,
//       color: "#fbeba4"
//     },
//     "&:hover ": {
//       color: "#fbeba4"
//     }
//   },
//   group: {
//     backgroundColor: "#33404d",
//     marginLeft: 0,
//     "& $content": {
//       paddingLeft: theme.spacing(2)
//     }
//   },
//   expanded: {},
//   label: {
//     fontWeight: "inherit",
//     color: "inherit"
//   },
//   labelRoot: {
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0.5, 0)
//   },
//   labelIcon: {
//     width: "22px",
//     height: "18px",
//     marginRight: "10px"
//   },
//   labelIconEmpty: {
//     marginRight: "10px"
//   },
//   labelText: {
//     fontWeight: "inherit",
//     flexGrow: 1
//   }
// }));

// function StyledTreeItem(props) {
//   const classes = useTreeItemStyles();
//   const {
//     labelText,
//     labelIcon: LabelIcon,
//     labelInfo,
//     color,
//     bgColor,
//     ...other
//   } = props;

//   return (
//     <TreeItem
//       label={
//         <div className={classes.labelRoot}>
//           {(() => {
//             if (LabelIcon) {
//               return (
//                 <div
//                   style={{
//                     background: "url(" + LabelIcon + ") no-repeat center"
//                   }}
//                   className={classes.labelIcon}
//                 />
//               );
//             } else {
//               return <div className={classes.labelIconEmpty} />;
//             }
//           })()}

//           <Typography variant="body2" className={classes.labelText}>
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </div>
//       }
//       classes={{
//         root: classes.root,
//         content: classes.content,
//         expanded: classes.expanded,
//         group: classes.group,
//         label: classes.label
//       }}
//       {...other}
//     />
//   );
// }

// StyledTreeItem.propTypes = {
//   bgColor: PropTypes.string,
//   color: PropTypes.string,

//   labelInfo: PropTypes.string,
//   labelText: PropTypes.string.isRequired
// };

// const Tabs = [
//   {
//     name: "真人场规矩",
//     child: [
//       { name: "百家乐", path: "1" },
//       { name: "包桌（VIP）百家乐", path: "2" },
//       { name: "竞咪（BID）百家乐", path: "3" },
//       { name: "免佣点数百家乐", path: "4" },
//       { name: "七喜百家乐", path: "5" },
//       { name: "龙宝百家乐", path: "6" },
//       { name: "保险百家乐", path: "7" },
//       { name: "龙虎", path: "8" },
//       { name: "骰宝", path: "9" },
//       { name: "轮盘", path: "10" },
//       { name: "二八杠", path: "11" },
//       { name: "三公", path: "12" },
//       { name: "温州牌九", path: "13" },
//       { name: "牛牛", path: "14" },
//       { name: "色碟", path: "15" },
//       { name: "德州撲克", path: "16" },
//       { name: "21点", path: "17" }
//     ]
//   },
//   {
//     name: "沙巴体育规则",
//     child: [
//       { name: "投注规则与规定", path: "BettingRules" },
//       { name: "一般盘口规则", path: "Handicap" },
//       { name: "电子竞技", path: "ElectronicSports" },
//       { name: "篮球", path: "Basketball" },
//       { name: "足球", path: "Football" },
//       { name: "羽毛球", path: "Badminton" },
//       { name: "乒乓球", path: "TableTennis" },
//       { name: "网球", path: "Tennis" },
//       { name: "排球及沙滩排球", path: "Volleyball" },
//       { name: "曲棍球", path: "Hockey" },
//       { name: "台球", path: "Billiards" },
//       { name: "高尔夫球", path: "Golf" },
//       { name: "手球", path: "Handball" },
//       { name: "水球", path: "WaterPolo" },
//       { name: "壁球", path: "Squash" },
//       { name: "棒球", path: "Baseball" },
//       { name: "冰上曲棍球", path: "IceHockey" },
//       { name: "板球", path: "Cricket" },
//       { name: "15人橄榄球", path: "RugbyFifteen" },
//       { name: "赛马", path: "Jockey" },
//       { name: "赛车", path: "Racing" },
//       { name: "百练赛游戏", path: "100TrainingGame" },
//       { name: "其他运动项目", path: "OtherSports" },
//       { name: "冬季奥林匹克运动会", path: "WinterOlympics" },
//       { name: "奥运会比赛", path: "OlympicGame" }
//     ]
//   },
//   {
//     name: "633体育规则",
//     child: [
//       { name: "投注规则与规定", path: "23" },
//       { name: "盘口介绍", path: "24" },
//       { name: "足球", path: "25" },
//       { name: "网球", path: "26" },
//       { name: "篮球", path: "27" },
//       { name: "美式足球", path: "28" },
//       { name: "冰上曲棍球", path: "29" },
//       { name: "棒球", path: "30" },
//       { name: "手球", path: "31" },
//       { name: "排球", path: "32" },
//       { name: "沙滩排球", path: "33" },
//       { name: "室内足球", path: "34" },
//       { name: "羽毛球", path: "35" },
//       { name: "英式橄榄球", path: "36" },
//       { name: "飞镖", path: "37" },
//       { name: "斯诺克", path: "38" },
//       { name: "乒乓球", path: "39" },
//       { name: "电子竞技", path: "40" },
//       { name: "板球", path: "41" },
//       { name: "虚拟赛事", path: "42" },
//       { name: "高尔夫球", path: "43" }
//     ]
//   },
//   /*{
//     name: "平博体育规则",
//     child: [{ name: "盘口规则", path: "58" }]
//   },*/
//   {
//     name: "彩票规则",
//     child: [
//       { name: "时时彩", path: "18" },
//       { name: "六合彩", path: "19" },
//       { name: "快乐彩", path: "20" },
//       { name: "PK拾", path: "21" },
//       { name: "快3", path: "22" }
//     ]
//   },
//   {
//     name: "棋牌规则",
//     child: [
//       { name: "21点", path: "44" },
//       { name: "二八杠", path: "45" },
//       { name: "十三水", path: "46" },
//       { name: "三公", path: "47" },
//       { name: "斗地主", path: "48" },
//       { name: "百人牛牛", path: "49" },
//       { name: "抢庄牛牛", path: "50" },
//       { name: "抢庄牌九", path: "51" },
//       { name: "极速炸金花", path: "52" },
//       { name: "押庄龙虎", path: "53" },
//       { name: "炸金花", path: "54" },
//       { name: "通比牛牛", path: "55" },
//       { name: "森林舞会", path: "56" },
//       { name: "德州扑克", path: "57" }
//     ]
//   }
// ];
// class GameRules extends Component {
//   getSelectedParent = selectedPage => {
//     let parent = "";
//     for (let item of Tabs) {
//       for (let child of item.child) {
//         if (child.path === selectedPage) {
//           parent = item.name;
//           break;
//         }
//       }
//       if (parent !== "") {
//         break;
//       }
//     }

//     return [parent];
//   };
//   state = {
//     html: "",
//     expanded: this.getSelectedParent(this.props.match.params.tab)
//   };

//   handleTreeChange = node => {
//     if (this.state.expanded.indexOf(node.toString()) >= 0) {
//       this.setState({ ...this.state, expanded: [] });
//     } else {
//       this.setState({ ...this.state, expanded: [node.toString()] });
//     }
//   };
//   handleTreeItemChange = path => {
//     this.props.history.push( "/game-rules/" + path);
//     fetch("/assets/rule/" + i18n.language + "/" + path + ".html")
//       .then(res => {
//         return res.text();
//       })
//       .then(html => {
//         this.setState({ ...this.state, html: html });
//       });
//   };
//   componentDidMount() {
//     let selectedPage = this.props.match.params.tab;
//     this.handleTreeItemChange(selectedPage);
//   }
//   componentWillReceiveProps(nextProps) {
//     const oldpage = this.props.match.params.tab;
//     const newpage = nextProps.match.params.tab;
//     if (oldpage !== newpage) {
//       this.handleTreeItemChange(newpage);
//       this.setState({
//         expanded: this.getSelectedParent(newpage)
//       });
//     }
//   }
//   render() {
//     return (
//       <Container>
//         <HeaderMini></HeaderMini>
//         <InnerWrap>
//           <LeftContainer>
//             <LeftContainerHeader>
//               <HeaderTitle>帮助中心</HeaderTitle>
//               <HeaderTitle2>Help Center</HeaderTitle2>
//             </LeftContainerHeader>
//             <TreeView
//               expanded={this.state.expanded}
//               defaultCollapseIcon={<ArrowDropDownIcon />}
//               defaultExpandIcon={<ArrowRightIcon />}
//               defaultEndIcon={<div style={{ width: 24 }} />}
//               children={<ArrowDropDownIcon />}
//               onNodeToggle={this.handleChange}
//             >
//               {Tabs.map((row, index) => {
//                 return (
//                   <StyledTreeItem
//                     key={row.name}
//                     nodeId={row.name}
//                     labelText={row.name}
//                     onClick={() => this.handleTreeChange(row.name)}
//                   >
//                     {row.child.map((child, index) => {
//                       return (
//                         <StyledTreeItem
//                           key={index}
//                           nodeId={child.path}
//                           labelText={child.name}
//                           onClick={() => this.handleTreeItemChange(child.path)}
//                         />
//                       );
//                     })}
//                   </StyledTreeItem>
//                 );
//               })}
//             </TreeView>
//           </LeftContainer>
//           <RightContainer className="right-container">
//             <link
//               rel="stylesheet"
//               href={process.env.PUBLIC_URL + "/assets/rule/styles/main.css"}
//             ></link>
//             <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
//           </RightContainer>
//         </InnerWrap>
//         <Footer target={"_self"}></Footer>
//       </Container>
//     );
//   }
// }
// export default withRouter(GameRules);
