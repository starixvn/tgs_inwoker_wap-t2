import React from "react";

import styled from "styled-components";

import { connect } from "react-redux";

const AnnounceContainer = styled.div`
  width: 1280px;
  height: 40px;
  margin: 0 auto;
`;
const MarqueeContainer = styled.div`
  position: absolute;
  top: 15px;
  width: 100%;
  white-space: nowrap;
  font-weight: bold;
  font-size: 14px;
  color: #f0ca83;
  float: left;
  height: 23px;
  padding-top: 4px;
  background-color: rgba(0, 0, 0, 0.5);
`;

function Marquee(props) {
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
export default connect(mapStateToProps, mapDispatchToProps)(Marquee);
