import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
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
  width: 506px;
  background: url(${LoginBGPNG}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 30px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
  text-align: justify;
`;

const ContentContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 0 3px;
`;

const ImageBanner = styled.div`
  background: url(${({ img }) => img}) no-repeat center;
  height: 175px;
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
  };

  render() {
    return (
      <StyledDialog open={this.props.open} onClose={this.props.onClose}>
        <Container>
          <CloseIconContainer
            viewBox="4 4 16 16"
            onClick={this.props.onClose}
          ></CloseIconContainer>
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
                      img={checkLocale && checkLocale.desktopBanner}
                      key={index}
                      order={data.order}
                    >
                      <TheButton
                        onClick={() => {
                          this.handlePromotionClick(data.id);
                        }}
                      >
                        {i18n.t("promotion.details")}
                      </TheButton>
                    </ImageBanner>
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
        </Container>
      </StyledDialog>
    );
  }
}

export default PopupAnnouncement;
