import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
const CustomText = withStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-input[readonly]": {
      backgroundColor: "transparent",
      color: "#6e6e6e",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "#b6b6b6",
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
      },
    },
  },
})(TextField);
function CustomTextField(props) {
  return (
    <CustomText
      style={{
        width: props.width ? props.width : "350px",
        height: props.multiline
          ? "auto"
          : props.height
          ? props.height + "px"
          : "46px",
        fontWeight: props.bold ? "bold" : "normal",
        marginTop: props.marginTop ? props.marginTop + "px" : "10px",
        float: props.float ? props.float : "left",
      }}
      multiline={props.multiline ? true : false}
      rows={props.multiline ? 8 : 0}
      onChange={props.handleTextFieldChange}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      variant="outlined"
      autoComplete="off"
      disabled={props.disabled ? props.disabled : false}
      type={props.type ? props.type : "text"}
      onInput={(e) => {
        e.target.value =
          props.type === "number"
            ? Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, props.maxLength ? props.maxLength : 50)
            : e.target.value;
      }}
      InputProps={
        props.adornment
          ? {
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ height: "30px", width: "32px" }}
                >
                  <img src={props.adornment} alt=""></img>
                </InputAdornment>
              ),
            }
          : {}
      }
      inputProps={{
        maxLength: props.maxLength ? props.maxLength : 50,
        readOnly: props.readOnly ? props.readOnly : false,
      }}
    />
  );
}

export default CustomTextField;
