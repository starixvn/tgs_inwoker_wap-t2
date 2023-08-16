import React from "react";

import styled from "styled-components";
import Common from "../../utils/Common";

import { connect } from "react-redux";
const AnnounceContainer = styled.div`
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;
const MarqueeIcon = styled.img`
  height: 16px;
  margin-top: 5px;
  padding-right: 25px;
  float: right;
  @media (max-width: 320px) {
    display: none;
  }
`;
const MarqueeContainer = styled.div`
  position: relative;
  overflow: visible;
  float: right;
  width: 78%;
  white-space: nowrap;
  font-weight: bold;
  font-size: 14px;
  color: #f0ca83;
  padding-top: 4px;
  height: 23px;
  background-color: rgba(0, 0, 0, 0.7);
  @media (max-width: 320px) {
    width: 100%;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: -23px;
    width: 0;
    height: 0;
    border-right: 23px solid rgba(0, 0, 0, 0.7);
    border-bottom: 24px solid transparent;
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

function CommonMarquee(props) {
  return (
    <AnnounceContainer>
      <MarqueeContainer>
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
      </MarqueeContainer>
      <MarqueeIcon
        src={
          process.env.PUBLIC_URL +
          `/assets/images/${Common.getLanguagePrefixFolder()}/marqueeicon.png`
        }
      ></MarqueeIcon>
    </AnnounceContainer>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommonMarquee);
