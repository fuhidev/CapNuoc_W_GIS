import * as React from 'react';
import { DatePicker, DatePickerProps } from 'material-ui';

export default class CustomDatePicker extends React.Component<DatePickerProps, {}> {
  render() {
    return <DatePicker
      {...this.props}
      cancelLabel="Đóng"
      okLabel="Chấp nhận" 
      formatDate={(date) =>
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      }
    />;
  }
}