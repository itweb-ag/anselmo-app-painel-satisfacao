import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";

export const dateToString = (value: Date): string => {
  if (value) {
    let dataString = (
      value.getFullYear() + '-' +
      ((value.getMonth() + 1) < 10 ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1)) + '-' +
      ((value.getDate() < 10) ? ('0' + value.getDate()) : value.getDate())
    );
    return `${dataString}`;
  } else {
    return '';
  }
}

export const stringToDate = (value: string): Date => {
  let dataSplit = value.split('-');
  return(new Date(parseInt(dataSplit[0]), (parseInt(dataSplit[1]) - 1), parseInt(dataSplit[2])));
}

type Argumentos = {
  label: string,
  value: string,
  setData(data: string): void
}

const SeletorDeData = ({label, value, setData}: Argumentos) => {
  const [valueDate, setValueDate] = useState<Date>();
  useEffect(() => {
    setValueDate(stringToDate(value));
  }, [value]);
  
  const DateToString = (value: any) => {
    if (value) {
      setData(`${dateToString(value)}`);
    }
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <MobileDatePicker
        label={label}
        value={valueDate}
        onChange={(newData) => {
          DateToString(newData);
        }}
        renderInput={(params) => (
          <TextField
            margin={"normal"}
            fullWidth
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default SeletorDeData;