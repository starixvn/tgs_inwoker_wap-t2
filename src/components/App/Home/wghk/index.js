import React from "react";
import { connect } from "react-redux";
import { SHOW_LOGIN } from "../../../../api-services/constant/actionType";
import Landing from "./landing";
import styled from "styled-components";

const MarqueeContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  background: #b4b4b4;
  justify-content: center;
`;

const MarqueeContent = styled.div`
  width: 1280px;
  display: flex;
  color: #fff;
`;

const TheSpeaker = styled.div`
  background-color: #fff;
  width: 24px;
  height: 24px;
  mask: url(${process.env.PUBLIC_URL}/assets/images/homeIcon/announceIcon.svg)
    no-repeat center / contain;
  z-index: 3;
`;

const TheMarqueeHolder = styled.div`
  padding-left: 40px;
  width: 100%;
`;

const WGHKHome = (props) => {
  return (
    <>
      <MarqueeContainer>
        <MarqueeContent>
          <TheSpeaker></TheSpeaker>
          <TheMarqueeHolder>
            {props.ui.marquees && props.ui.marquees.length > 0 && (
              <marquee>
                {props.ui.marquees.map((row, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "inline",
                        whiteSpace: "nowrap",
                        wordBreak: "keep-all",
                        overflow: "visible",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"* "}
                      {row.localization !== null && row.localization.content
                        ? row.localization.content
                        : row.content}
                    </div>
                  );
                })}
              </marquee>
            )}
          </TheMarqueeHolder>
        </MarqueeContent>
      </MarqueeContainer>

      <Landing showLogin={props.showLogin} token={props.token} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    token: state.account.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WGHKHome);
