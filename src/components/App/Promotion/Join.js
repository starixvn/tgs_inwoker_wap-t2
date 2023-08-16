// import React, { useState, useEffect } from "react";

// import styled from "styled-components";
// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import LoginBGPNG from "../../../assets/images/login-bg.png";
// import IconCloseWhite from "../../../assets/images/icon-close-white.png";
// import PromotionSelectedPNG from "../../../assets/images/promotion-selected.png";
// import PromotionUnselectedPNG from "../../../assets/images/promotion-unselected.png";
// const StyledDialog = withStyles({
//   root: {
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
//   }
// })(Dialog);

// const Container = styled.div`
//   width: 420px;
//   padding: 27px 32px;
//   background: url(${LoginBGPNG});
//   display: table;
//   text-align: center;
// `;
// const CloseIconContainer = styled.div`
//   background: url(${IconCloseWhite}) no-repeat center;
//   width: 50px;
//   height: 100%;
//   float: right;
//   &:hover {
//     cursor: pointer;
//   }
// `;
// const Header = styled.div`
//   width: 420px;
//   height: 50px;
//   background-color: #355460;
// `;
// const Headertitle = styled.div`
//   text-align: center;
//   margin-left: 50px;
//   padding-top: 12px;
//   float: left;
//   font-size: 18px;
//   font-weight: bold;
//   color: #ffffff;
//   width: 320px;
// `;

// const ButtonApply = styled.div`
//   width: 347px;
//   height: 46px;
//   border: solid 1px #b6b6b6;
//   margin-top: 15px;
//   background-image: linear-gradient(to top, #c0252d, #d95a61);
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;
//   padding-top: 10px;
//   &:hover {
//     cursor: pointer;
//     background-blend-mode: screen, normal;
//     background-image: linear-gradient(
//         to bottom,
//         rgba(255, 255, 255, 0.08),
//         rgba(255, 255, 255, 0.08)
//       ),
//       linear-gradient(to top, #c0252d, #d95a61);
//   }
// `;
// const FooterText = styled.div`
//   font-size: 14px;
//   margin-top: 10px;
//   text-align: center;
//   color: #e52f2f;
// `;
// const SelectionGroup = styled.div`
//   margin: 0 auto;

//   width: 310px;
// `;
// const SelectionContainer = styled.div`
//   width: 302px;
//   height: 74px;
//   font-size: 18px;
//   font-weight: bold;
//   &:hover {
//     cursor: pointer;
//   }
//   ${props =>
//     props.selected
//       ? `
//   background: url(${PromotionSelectedPNG}) no-repeat;
//   color: #fff;
//   `
//       : `  background: url(${PromotionUnselectedPNG}) no-repeat;
//   color: #16242a;`}
// `;

// const SelectionTitleLabel = styled.div`
//   margin: 22px 0 0 40px;
//   float: left;
// `;
// const SelectionLabel = styled.div`
//   font-size: 16px;
//   margin: 22px 20px 0 0;
//   float: right;
// `;
// const Join = ({
//   open,
//   onhandleCloseDialog,
//   title,
//   onJoinClick,
//   specifications,
//   onChangeSelected,
//   selected
// }) => {
//   const handleApply = () => {
//     onJoinClick();
//   };
//   return (
//     <StyledDialog open={open} onClose={onhandleCloseDialog}>
//       <Header>
//         <Headertitle>{title}</Headertitle>
//         <CloseIconContainer onClick={onhandleCloseDialog}></CloseIconContainer>
//       </Header>
//       <Container>
//         <SelectionGroup>
//           {specifications.map(row => {
//             return (
//               <SelectionContainer
//                 onClick={() => {
//                   selected
//                     ? onChangeSelected(0)
//                     : onChangeSelected(row.bosp_id);
//                 }}
//                 key={row.bosp_id}
//                 selected={selected === row.bosp_id}
//               >
//                 <SelectionTitleLabel>{row.bosp_title}</SelectionTitleLabel>
//                 <SelectionLabel>选择</SelectionLabel>
//               </SelectionContainer>
//             );
//           })}
//           {/* {this.props.specifications.map(row => {
//               return (
//                 <SelectionContainer
//                   onClick={() =>
//                     this.setState({ ...this.state, selected: row.bosp_id + 1 })
//                   }
//                   key={row.bosp_id}
//                   selected={this.state.selected === row.bosp_id + 1}
//                 >
//                   <SelectionTitleLabel>红利1</SelectionTitleLabel>
//                   <SelectionLabel>选择</SelectionLabel>
//                 </SelectionContainer>
//               );
//             })} */}
//         </SelectionGroup>

//         <ButtonApply onClick={handleApply}>立即领取</ButtonApply>
//         <FooterText>温馨提示:红利领取后即无法更改</FooterText>
//       </Container>
//     </StyledDialog>
//   );
// };

// export default Join;
