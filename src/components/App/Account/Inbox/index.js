import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconInboxRedPNG from "../../../../assets/images/icon-inbox.png";
import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import List from "./List";
import Details from "./Details";

import i18n from "../../../../utils/i18n";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { inboxAction } from "../../../../api-services/actions/inboxAction";
import { InboxService } from "../../../../api-services/services/InboxService";
import { SHOWING_DIALOG } from "../../../../api-services/constant/actionType";
const Container = styled.div` 
padding: 20px 28px;
box-sizing: border-box
background-color: #ffffff;
width: 100%;
min-height: 796px;
`;
const Title = styled.div`
  color: #404040;
  font-size: 20px;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconInboxRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 630px;
  border-radius: 10px;
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    background: `url(${LoginBGPNG}) no-repeat transparent`,
    backgroundSize: "cover",
    borderRadius: "15px",
    border: "solid 1px #ffffff",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 0px 32px 30px 32px;

  display: table;
`;
const DialogCloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const DialogHeader = styled.div`
  height: 50px;
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 45px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: #404040;
  width: 320px;
`;
class Inbox extends Component {
  state = {
    selectAll: false,
    openDialog: false,
    dialogTitle: "收件箱",
    selectedRecord: null,
    page: 0,
    selected: [],
    inbox: {
      list: [],
      count: 0,
      page_size: 10,
    },
    limit: 10,
  };
  handleChangePage = (newPage) => {
    this.setState({ ...this.state, page: newPage - 1 });
    this.GetInboxList(newPage - 1);
  };
  GetInboxList = (page) => {
    this.props.getMessages(i18n.language, page + 1, this.state.limit);
  };

  componentDidMount() {
    if (this.props.token != null) {
      this.GetInboxList(0);
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
      this.GetInboxList(0);
    }
  }

  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  handleDeleteSelected = () => {
    this.DeleteSelectedInbox(this.state.selected.join());
  };
  handleReadSelected = () => {
    this.ReadSelectedInbox(this.state.selected.join());
  };
  handleClickDelete = (id) => {
    this.DeleteSelectedInbox(id);
    this.setState({ ...this.state, openDialog: false });
  };
  handleRowClick = (row) => {
    InboxService.UpdateReadMessage([row.id]).then((response) => {
      this.GetInboxList(this.state.page);
    });
    this.setState({
      ...this.state,
      selectedRecord: row,
      openDialog: true,
    });
  };
  render() {
    return (
      <Container>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("inbox.title")}
        </Title>

        <InnerWrap>
          <List
            inbox={this.props.inbox}
            page={this.state.page}
            rows={this.state.inbox.list}
            total={this.state.inbox.count}
            selected={this.state.selected}
            onhandleChangePage={this.handleChangePage}
            onhandleRowClick={this.handleRowClick}
            onhandleSelectedChange={this.handleSelectedChange}
          ></List>
        </InnerWrap>
        <StyledDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          <DialogHeader>
            <DialogHeadertitle>{i18n.t("inbox.title")}</DialogHeadertitle>
            <DialogCloseIconContainer
              onClick={this.handleCloseDialog}
            ></DialogCloseIconContainer>
          </DialogHeader>
          <DialogContainer>
            <Details inbox={this.state.selectedRecord}></Details>
          </DialogContainer>
        </StyledDialog>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inbox: state.account.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    getMessages: (language, page, limit) =>
      dispatch(inboxAction.getMessages(language, page, limit, true, false)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Inbox));
