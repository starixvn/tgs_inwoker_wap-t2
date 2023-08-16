import React from "react";
import styled, { keyframes } from "styled-components";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { SortedMenuList } from "../../utils/HeaderSorting";
import config from "../../config/config";
import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
  margin-right: 10px;
`;
const BtnStyle = styled.div`
  float: right;
  font-size: 14px;
  text-align: center;
  width: 60px;
  border-radius: 20px;
  margin-top: 5px;
`;
const BtnStyle1 = styled(BtnStyle)`
  line-height: 180%;
  margin-right: 5px;
  background-color: #c7a87c;
  color: #6d5d41;
  height: 25px;
  &:hover {
    color: #fdf8f0;
    cursor: pointer;
  }
`;
const BtnStyle2 = styled(BtnStyle)`
  line-height: 160%;
  background-color: transparent;
  color: #c7a87c;
  border-width: 2px;
  border-style: solid;
  border-color: #c7a87c;
  height: 25px;
  &:hover {
    color: #8a7f73;
    cursor: pointer;
  }
`;
const BtnLogout = styled.div`
  color: #8a7f73;
  text-align: right;
  padding: 10px 0px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
    color: #c7a87c;
  }
`;

const BalanceContainer = styled.div`
  color: #8a7f73;
  text-align: right;
  padding: 10px 10px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  margin: 2px 0 0 0;

  width: 16px;
  height: 16px;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  width: 16px;
  height: 16px;

  background-color: ${({ theme }) => theme.primary};
  mask: url(${IconRefreshBalanceHoverPNG}) no-repeat center;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #c7a87c;
`;
const MemberUserName = styled.span`
  color: #c7a87c;
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 5px 0px 5px;
  float: right;
  background-color: #8a7f73;
`;
const InboxContainer = styled(BalanceContainer)`
  color: #c7a87c;
  text-align: right;
  padding: 8px 0px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const MailIconContainer = styled.span`
  margin-top: -2px;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  margin-top: 3px;
  color: #c7a87c;
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #8a7f73;
  float: right;
  margin-right: 0px;
  padding: 10px 0 0 0;
  max-width: 335px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;
const TopContainer = styled.div``;
const BottomContainer = styled.div``;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverText};
`;

const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
`;

const Balance = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const MemberContainer = (props) => {
  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      props.game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return props.game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  const open = Boolean(anchorEl);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <TopContainer>
        <InboxContainer onClick={props.onhandleInboxClick}>
          <InboxCountLabel>{props.account.info.message_num}</InboxCountLabel>
          <MailIconContainer>
            <MailOutlineOutlinedIcon />
          </MailIconContainer>
        </InboxContainer>
        <Spliter></Spliter>
        <BtnLogout onClick={props.onhandleLogout}>
          {i18n.t("web.header.logout")}
        </BtnLogout>
        <Spliter></Spliter>
        <WelcomeContainer>
          <CustomLink to={"/account/profile"}>
            <MemberUserName>
              {props.account.info.member_username}{" "}
              {config.features.HaveVIPFeature &&
                `(VIP
              ${props.account.info.member_level_id})`}
            </MemberUserName>
          </CustomLink>
        </WelcomeContainer>
      </TopContainer>
      <BottomContainer>
        {/* <BtnTransfer onClick={props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </BtnTransfer>
        <BtnDeposit onClick={props.onhandleDeposit}>
          {i18n.t("web.header.deposit")}
        </BtnDeposit> */}
        <BalanceContainer style={{ display: "flex" }}>
          <span>{i18n.t("web.header.mainAccount")}:</span>
          <BalanceAmountLabel
            onClick={(e) => {
              handleTransfer(e);
            }}
          >
            {Common.formatNumberWithThousand(totalBalance)}
          </BalanceAmountLabel>{" "}
          <CustomPopover
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          >
            <div>
              <BrandAndBalanceButBigger>
                <div style={{ paddingRight: 30 }}>
                  {i18n.t("web.header.mainAccount")}
                </div>
                <div
                  style={{
                    width: 150,
                    display: "flex",
                    alignSelf: "flex-end",
                  }}
                >
                  <Textfit mode="single">
                    {Common.formatNumberWithThousand(totalBalance)}
                  </Textfit>
                </div>
              </BrandAndBalanceButBigger>
            </div>
            {SortedMenuList.map((item, key) => {
              var list = filterGameList(item).sort((a, b) => {
                if (config.features.LiveGame_Sorting_SKY) {
                  var sortDGFirst = ["DG"];
                  return (
                    sortDGFirst.indexOf(b.abbreviation) -
                    sortDGFirst.indexOf(a.abbreviation)
                  );
                } else return b - a;
              });

              if (list.length > 0) {
                return (
                  <GameType>
                    <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                    {props.game.homePageGameList
                      .filter((game) => {
                        return item.gameType.indexOf(game.type) >= 0;
                      })
                      .map((brand, index) => {
                        return props.game.providerList
                          .filter((item) => {
                            return (
                              item.abbreviation === brand.abbreviation &&
                              item.transferwallet === true
                            );
                          })
                          .map((data, index) => {
                            return (
                              <BrandAndBalance>
                                <Brand>
                                  {i18n.t(`${data.abbreviation}.${item.path}`)}
                                </Brand>
                                <Balance>
                                  {data.maintenance === 1
                                    ? i18n.t("transfer.maintenance")
                                    : Common.formatNumberWithCommas(
                                        data.balance
                                      )}
                                </Balance>
                              </BrandAndBalance>
                            );
                          });
                      })}
                  </GameType>
                );
              } else {
                return null;
              }
            })}
          </CustomPopover>
          <span>{i18n.t("web.header.dollor")}</span>
          <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
            <RefreshBalanceIcon></RefreshBalanceIcon>
          </RefreshBalance>
        </BalanceContainer>
      </BottomContainer>
    </Container>
  );
};

export default MemberContainer;
