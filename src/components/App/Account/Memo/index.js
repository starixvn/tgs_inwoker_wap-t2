import React from "react";
import { connect } from "react-redux";
import config from "../../../../config/config";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { useEffect } from "react";
import MemoVariant2 from "./variant2";
import MemoVariant1 from "./variant1";
import { useState } from "react";

const Memo = ({
  account,
  getMemoV2,
  composeMemo,
  replyMemo,
  readMemo,
  deliveryBox,
}) => {
  const [memo, setMemo] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    if (account.token !== "") {
      if (memo.length === 0) {
        getMemoV2().then((result) => {
          if (result.IsSuccess) {
            setMemo(result.data);
          }
        });
      }
      if (sent.length === 0) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const performComposeMemo = (subject, content) => {
    composeMemo(subject, content).then((result) => {
      if (result.IsSuccess) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    });
  };

  const performReplyMemo = (letterId, content) => {
    replyMemo(letterId, content).then((result) => {
      if (result.IsSuccess) {
        deliveryBox("get", "", 1, 100).then((result) => {
          if (result.IsSuccess) {
            setSent(result.data);
          }
        });
      }
    });
  };

  const commonprops = {
    memo,
    sent,
    getMemoV2,
    composeMemo,
    replyMemo,
    readMemo,
    deliveryBox,

    performComposeMemo,
    performReplyMemo,
  };

  const switchTemplate = (template) => {
    switch (template) {
      default:
        return <MemoVariant1 {...commonprops} />;
    }
  };

  return switchTemplate(config.accountTemplate);
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMemoV2: (letterId) => dispatch(generalAction.getMemoV2(letterId)),
    composeMemo: (subject, content) =>
      dispatch(generalAction.composeMemo(subject, content)),
    replyMemo: (letterId, content) =>
      dispatch(generalAction.replyMemo(letterId, content)),
    readMemo: (letterId) => dispatch(generalAction.readMemo(letterId)),
    deliveryBox: (action, id, page, row) =>
      dispatch(generalAction.deliveryBox(action, id, page, row)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
