import React from "react";
import { Popover } from "@material-ui/core";
import styled from "styled-components";

const CustomPopoverThing = styled(Popover)`
  .MuiPopover-paper {
    background: none;
  }
`;

const ArrowUp = styled.div`
  width: 15px;
  height: 10px;
  margin: auto;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid ${({ theme }) => theme.popoverBackground};
`;

const CustomPopoverContent = styled.div`
  min-width: 225px;
  border-radius: 12px;
  padding: 10px;
  display: grid;
  background: ${({ theme }) => theme.popoverBackground};
  max-height: ${({ height }) => {
    return height ? height : "500px";
  }};

  overflow: auto;
  user-select: none;

  ::-webkit-scrollbar {
    width: 5px;
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CustomPopover = ({ children, open, anchorEl, handleClose, height }) => {
  return (
    <div>
      <CustomPopoverThing
        elevation="0"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ArrowUp />
        <CustomPopoverContent height={height}>{children}</CustomPopoverContent>
      </CustomPopoverThing>
    </div>
  );
};

export default CustomPopover;
