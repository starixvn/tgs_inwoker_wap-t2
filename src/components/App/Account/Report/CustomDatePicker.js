import React from "react";

import DateFnsUtils from "@date-io/date-fns"; // import
import { withStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import i18n from "../../../../utils/i18n";

const localeMap = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

function CustomDatePicker(props) {
  const CustomPicker = withStyles({
    root: {
      width: "135px",
      height: "40px",
      float: "left",
      backgroundColor: "#fff",
      "& .MuiInputBase-root": {
        paddingRight: 5,
      },
      "& input": {
        fontFamily: "SimHei",
        fontSize: "14px",
      },
      "& .MuiInputAdornment-positionEnd": {
        width: "45px",
        height: "48px",
        marginRight: "5px",
        maxHeight: "40px",
        borderLeft: "solid 1px #b6b6b6",
        "& .MuiButtonBase-root": {
          padding: "5px",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  })(KeyboardDatePicker);
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={localeMap[i18n.language.substring(0, 2)]}
    >
      <CustomPicker
        InputAdornmentProps={{ position: "end" }}
        variant="inline"
        maxDate={props.maxDate ? props.maxDate : new Date()}
        maxDateMessage={false}
        inputVariant="outlined"
        format="yyyy/MM/dd"
        id="date-picker-inline"
        value={props.selectedDate ? props.selectedDate : new Date()}
        onChange={(e) => {
          props.onhandleDateChange(e);
        }}
        minDate={props.minDate}
        InputProps={{
          readOnly: true,
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default CustomDatePicker;
