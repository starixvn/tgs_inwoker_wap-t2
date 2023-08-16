import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GameService } from "../../../../../../api-services/services/GameService";
import LoadingGIF from "../../../../../../assets/images/loading.gif";
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

const GameFrame = styled.iframe`
  margin-top: 24px;
  width: 100vw;
  // calc(100vh - 20vh - 105px - 24px);
  height: ${({ height }) => height}px;
`;

const GameIFrame = ({ brand, type, sharedprops, token }) => {
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
    }
    // var urls = "https://wghk.srvptt.com/index.php?m=Homeweb&c=Login&a=login&is_api=1&username=TA%234uhr2126wqsk&session_id=082ffdb896ccdfde44&lang=zh-tw&version=brown2"
    // myRef.current.src = urls;
    else
      GameService.JoinLobbyGame(type, gameCode).then((response) => {
        if (response.IsSuccess) {
          setMaintenance(false);
          setLoading(false);

          let arr = document.domain.split(".");
          let host = arr[arr.length - 2] + "." + arr[arr.length - 1];
          // console.log("checkuuwwwwwwirl11:", arr)
          // return host;
          var currentDomain = host;

          // <iframe src="http://**.**.com" width=1200 height=800></iframe>
          if (myRef.current) {
            var url =
              (response.data.url.indexOf("http") <= -1 ? "https:" : "") +
              response.data.url;

            var getExistingParam = url.split("/")[3];
            // myRef.current.src = currentDomain + "/" + getExistingParam;
            // console.log("checkuuwwwwwwirl:", currentDomain + "/" + getExistingParam)
            myRef.current.src =
              "https://" + currentDomain + "/" + getExistingParam;
          }
        } else {
          document.getElementsByTagName("body")[0].style.overflow = "";
          window.removeEventListener("resize", this.updateWindowDimensions);
          setMaintenance(true);
        }
      });
  };

  const handleResize = () => {
    var calHeight = window.innerHeight - 155.5 - 105 - 24;
    myRef.current.height = calHeight;
    console.log("wtf???", calHeight);
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
        height={window.innerHeight - 155.5 - 105 - 24}
      ></GameFrame>
    </>
  );
};

export default GameIFrame;
