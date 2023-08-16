// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// // import Number0PNG from "../../../assets/images/slot/0.png";
// // import Number1PNG from "../../../assets/images/slot/1.png";
// // import Number2PNG from "../../../assets/images/slot/2.png";
// // import Number3PNG from "../../../assets/images/slot/3.png";
// // import Number4PNG from "../../../assets/images/slot/4.png";
// // import Number5PNG from "../../../assets/images/slot/5.png";
// // import Number6PNG from "../../../assets/images/slot/6.png";
// // import Number7PNG from "../../../assets/images/slot/7.png";
// // import Number8PNG from "../../../assets/images/slot/8.png";
// // import Number9PNG from "../../../assets/images/slot/9.png";
// // import NumberFramePNG from "../../../assets/images/slot/number-frame.png";
// // import ThousandPNG from "../../../assets/images/slot/thousand.png";
// // import DotPNG from "../../../assets/images/slot/dot.png";

// import FlipNumbers from "react-flip-numbers";

// const PrizePool = ({ img, index, number }) => {
//   const [numbers, setNumbers] = useState(number);
//   const [oldNumber, setOldNumber] = useState("");
//   const [flip, setFlip] = useState(false);

//   useEffect(() => {
//     setOldNumber(numbers);
//     setNumbers(number);

//     if (oldNumber !== numbers) {
//       setFlip(false);
//     } else {
//       setFlip(true);
//     }
//   });

//   // const NumberFrame = styled.div`
//   //   background: url(${NumberFramePNG}) no-repeat;
//   //   width: 83px;
//   //   height: 108px;
//   //   float: left;
//   //   margin: 0 4px;
//   //   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//   // `;

//   // const NumberSplitor = styled.div`
//   //   background: url(${props => props.src}) no-repeat center bottom;
//   //   width: 15px;
//   //   height: 115px;
//   //   float: left;
//   // `;

//   // const Numbers = (img, index) => {
//   //   return (
//   //     //addFlipAnimation - temporary not available
//   //     <NumberFrame>
//   //       <div
//   //         className={flip ? "animated flash" : null}
//   //         style={{
//   //           background: "url(" + img + ") no-repeat center center",
//   //           width: "83px",
//   //           height: "108px"
//   //         }}
//   //       ></div>
//   //     </NumberFrame>
//   //   );
//   // };

//   // const Symbol = (img, index) => {
//   //   return (
//   //     <NumberSplitor
//   //       className=""
//   //       src={img}
//   //       style={{ height: "108px" }}
//   //     ></NumberSplitor>
//   //   );
//   // };

//   // const renderImageAndSymbol = (image, index) => {
//   //   switch (image) {
//   //     case "1":
//   //       return Numbers(Number1PNG, index);
//   //     case "2":
//   //       return Numbers(Number2PNG, index);
//   //     case "3":
//   //       return Numbers(Number3PNG, index);
//   //     case "4":
//   //       return Numbers(Number4PNG, index);
//   //     case "5":
//   //       return Numbers(Number5PNG, index);
//   //     case "6":
//   //       return Numbers(Number6PNG, index);
//   //     case "7":
//   //       return Numbers(Number7PNG, index);
//   //     case "8":
//   //       return Numbers(Number8PNG, index);
//   //     case "9":
//   //       return Numbers(Number9PNG, index);
//   //     case "0":
//   //       return Numbers(Number0PNG, index);
//   //     case ",":
//   //       return Symbol(ThousandPNG, index);
//   //     case ".":
//   //       return Symbol(DotPNG, index);
//   //     default:
//   //       return null;
//   //   }
//   // };

//   return (
//     <div className="flips" key={index}>
//       <FlipNumbers
//         className="test"
//         play
//         color="#000000"
//         width={84}
//         height={108}
//         numbers={number}
//       />
//     </div>
//   );
// };

// export default PrizePool;
