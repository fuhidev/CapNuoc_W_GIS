import * as React from 'react';
import { TextField } from '@material-ui/core';
import * as moment from 'moment/moment';
import { TextFieldProps } from '@material-ui/core/TextField';

export enum TimeType {
  Date = 'date', DateTime = 'datetime-local'
};
export type Props = {
  type: TimeType,
  value?: Date,
  onChange: (date: Date | undefined) => void,
  inputProps?: TextFieldProps
};


class CustomDatePicker extends React.Component<Props, {}>{
  private rel: HTMLInputElement;
  render() {
    const {  value, type, onChange, inputProps } = this.props;
    return <TextField
      {...inputProps}
      inputRef={(e) => this.rel = e}
      // type={props.type}
      type="text"
      onFocus={_ => this.rel.type = 'date'}
      onBlur={_ => this.rel.type = 'text'}
      value={value ? dateToString(value, type) : undefined}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value ? new Date(value) : undefined);
      }}
    />
  }
}

function dateToString(date: Date, type: TimeType) {
  if (type === TimeType.Date)
    return moment(date).format("YYYY-MM-DD")
  if (type === TimeType.DateTime)
    return moment(date).format("YYYY-MM-DDTHH:mm:ss")
}

export default CustomDatePicker;