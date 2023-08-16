// import React, { useEffect, useState } from "react";
// import PrizePool from "./Prizepool";
// import { connect } from "react-redux";
// import { GameService } from "../../../services/GameService";
// import { UPDATING_JACKPOT } from "../../../constants/actionType";
// const Jackpot = props => {
//   const [jackpot, setJackpot] = useState(props.amount);
//   const [display, setDisplay] = useState(Array.from(jackpot));
//   let count = 0;
//   let increment = 0;
//   let currJackpot = 0;
//   let nextJackpot = 0;
//   function setPrizePool(x) {
//     let prize = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     if (prize.length === 10) {
//       prize = "00," + prize;
//     } else if (prize.length === 12) {
//       prize = "0" + prize;
//     }
//     props.dispatch({
//       type: UPDATING_JACKPOT,
//       payload: prize
//     });
//     return setJackpot(prize);
//   }
//   function getPrizePool() {
//     GameService.GetJackpotPrizePool().then(response => {
//       if (response.IsSuccess) {
//         if (currJackpot === 0) {
//           currJackpot = response.data - 7; // to animation in initial stage
//           setPrizePool(response.data.toFixed(2).toString());
//         }
//         nextJackpot = response.data;
//         increment = (response.data - currJackpot) / 10;
//       } else {
//       }
//     });
//   }
//   // const addZeroes = num => {
//   //   const dec = num.split(".")[1];
//   //   const len = dec && dec.length > 2 ? dec.length : 2;
//   //   return Number(num).toFixed(len);
//   // };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (count % 10 === 0) {
//         getPrizePool();
//       }

//       count++;

//       if (currJackpot < nextJackpot) {
//         currJackpot = currJackpot + increment;
//         setPrizePool(currJackpot.toFixed(2).toString());
//       }
//     }, 1000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     getPrizePool();
//   //   }, 10000);
//   //   return () => clearTimeout(timer);
//   // }, [jackpot]);
//   useEffect(() => {
//     setDisplay(Array.from(jackpot));
//   }, [jackpot]); //run this useEffect whenever there are changes on Jackpot
//   // (function loop() {
//   //   var haha = parseInt(jackpot);
//   //   setTimeout(function() {
//   //     console.log(parseInt(display[8]));
//   //     loop();
//   //   }, 10000);
//   // })();

//   return (
//     <div>
//       {display.map((data, index) => {
//         return (
//           <PrizePool
//             img={data}
//             number={data}
//             index={index}
//             key={index}
//           ></PrizePool>
//         );
//       })}
//     </div>
//   );
// };
// export default connect(null, null)(Jackpot);
