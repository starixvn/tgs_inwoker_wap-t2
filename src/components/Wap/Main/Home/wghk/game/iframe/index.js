import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GameService } from "../../../../../../../api-services/services/GameService";
import LoadingGIF from "../../../../../../../assets/images/loading.gif";

const GameFrame = styled.iframe`
  width: ${window.screen.width}px;
  transform: scale(${750 / window.screen.width});
  transform-origin: left top;
`;
//calc(100vh - (${({ height }) => height}px + 90px));
const LoadingLogoImg2 = styled.img`
  margin: 0 auto;
  display: block;
`;
const LoadingContainer = styled.div`
  width: 100%;

  top: 0;
  left: 0;
  position: absolute;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  background-color: #eaeaea;
  opacity: 1;
  height: 100%;
`;
const LoadingInner = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GameIFrame = ({ brand, type, sharedprops, token, height }) => {
  const { setMaintenance } = sharedprops;
  const [loading, setLoading] = useState(true);

  const joinGame = (gameCode) => {
    if (gameCode === "BC") {
      GameService.JoinBetConstruct(type, brand).then((response) => {
        if (typeof response.data === "string") {
          setMaintenance(false);
          var ifrm = myRef.current;
          ifrm =
            ifrm.contentWindow ||
            ifrm.contentDocument.document ||
            ifrm.contentDocument;

          ifrm.document.open();
          ifrm.document.write(response.data);
          ifrm.document.close();
          setLoading(false);
        } else {
          document.getElementsByTagName("body")[0].style.overflow = "";
          window.removeEventListener("resize", this.updateWindowDimensions);
          setMaintenance(true);
        }
      });
    } else
      GameService.JoinLobbyGame(type, gameCode).then((response) => {
        if (response.IsSuccess) {
          let arr = document.domain.split(".");
          let host = arr[arr.length - 2] + "." + arr[arr.length - 1];
          var currentDomain = host;
          setMaintenance(false);
          setLoading(false);

          if (myRef.current) {
            var url =
              (response.data.url.indexOf("http") <= -1 ? "https:" : "") +
              response.data.url;
            var getExistingParam = url.split("/")[3];
            myRef.current.src =
              "https://m." + currentDomain + "/" + getExistingParam;
          }
        } else {
          document.getElementsByTagName("body")[0].style.overflow = "";
          window.removeEventListener("resize", this.updateWindowDimensions);
          setMaintenance(true);
        }
      });
  };

  const handleResize = () => {
    var calHeight = (window.innerHeight - 440) / (750 / window.screen.width);

    myRef.current.height = calHeight;
  };

  useEffect(() => {
    token && joinGame(brand);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const myRef = useRef();
  return (
    <>
      {loading && (
        <LoadingContainer>
          <LoadingInner>
            <div className="clear"></div>
            <LoadingLogoImg2 src={LoadingGIF} />
          </LoadingInner>
        </LoadingContainer>
      )}
      <GameFrame
        ref={myRef}
        scrolling="yes"
        frameBorder="0"
        height={(window.innerHeight - 440) / (750 / window.screen.width)}
      ></GameFrame>
    </>
  );
};

export default GameIFrame;
