import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../utils/i18n";
import { AppHistory } from "../../history/History";
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const Container = styled.div`
  width: 80vw;
  background: #fff;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  padding: 30px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CloseButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 20px 30px;
  margin-bottom: 10px;
  font-size: 30px;
  border-radius: 20px;
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 50px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
  width: 100%;
  font-size: 30px;
  text-align: justify;
  overflow: auto;
  max-height: 50vh;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
  overflow: auto;
  height: 800px;
`;

const ImageBanner = styled.div`
  background: url(${({ img }) => img}) no-repeat center;
  height: 200px;
  width: 560px;
  border-radius: 5px;
  background-size: 100%;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

const TheButton = styled.div`
  padding: 5px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1);
`;

class PopupAnnouncement extends Component {
  handlePromotionClick = (id) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
    this.props.onClose();
  };
  render() {
    return (
      <StyledDialog open={this.props.open} onClose={this.props.onClose}>
        <Container>
          <div className="clear"></div>
          <TitleContainer>{this.props.header}</TitleContainer>
          {this.props.type === "promo" ? (
            <ContentContainer>
              {this.props.content
                .sort((a, b) => {
                  return a.order - b.order;
                })
                .map((data, index) => {
                  var checkLocale = data.localization[i18n.language];
                  return (
                    <ImageBanner
                      img={
                        checkLocale
                          ? checkLocale.mobileBanner
                          : data.mobileBanner
                      }
                      key={index}
                      order={data.order}
                      onClick={() => {
                        this.handlePromotionClick(data.id);
                      }}
                    ></ImageBanner>
                  );
                })}
            </ContentContainer>
          ) : (
            <FormContainer
              dangerouslySetInnerHTML={{
                __html: this.props.text.replace(/\n/g, "<br />"),
              }}
            ></FormContainer>
          )}
          <CloseButton onClick={this.props.onClose}>
            {i18n.t("common.confirm")}
          </CloseButton>
        </Container>
      </StyledDialog>
    );
  }
}

export default PopupAnnouncement;
