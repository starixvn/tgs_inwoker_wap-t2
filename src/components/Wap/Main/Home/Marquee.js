import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const AnnounceContainer = styled.div`
  width: 1280px;
  height: 38px;
  margin: 0 auto;
`;

const MarqueeContainer = styled.div`
  width: 890px;
  white-space: nowrap;

  font-size: 18px;
  color: #ffffff;
  float: left;
  line-hight: 26px;
`;

function Marquee(props) {
  return (
    <AnnounceContainer>
      <MarqueeContainer>
        {props.ui.marquees && props.ui.marquees.length > 0 && (
          <marquee style={{ marginTop: "5px" }}>
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
