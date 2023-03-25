import * as React from "react";
//
import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
//MUI
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  de: deLocale,
  es: esLocale,
};

const maskMap = {
  fr: "__/__/____",
  es: "__/__/____",
  ru: "__.__.____",
  de: "__.__.____",
  pp: "__.__.____",
};

export default function LocalizedDatePicker(props) {
  const [locale, setLocale] = React.useState("es");
  const [value, setValue] = React.useState(Valor(props.vpd));

  const selectLocale = (newLocale) => {
    setLocale(newLocale);
  };

  function Valor(param) {
    if (param === undefined) {
      return null;
    }

    return new Date(param);
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[locale]}
    >
      <DatePicker
        label={props.label}
        mask={maskMap[locale]}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);

          props.Cambio(newValue);
        }}
        // slotProps={{ textField: { variant: "filled" } }}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );
}
