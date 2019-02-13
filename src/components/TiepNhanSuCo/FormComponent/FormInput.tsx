import * as React from 'react';
import BaseComponent from '../../BaseComponent';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

type Props = {
  onChange: (name: string, value: any) => void,
  hoVaTen?: string,
  soDienThoai?: string,
  diaChi?: string,
  ghiChu?: string,
  thongTinPhanAnh?: number,
  dmThongTinPhanAnh: __esri.CodedValueDomainCodedValues[],
};

export default class FormInput extends BaseComponent<Props, {}> {
  render() {
    const {
      className,
      hoVaTen,
      diaChi,
      thongTinPhanAnh,
      onChange,
      soDienThoai,
      ghiChu,
      dmThongTinPhanAnh,
    } = this.props;
    return <div className={className}>
      <TextField
        name="diaChi"
        fullWidth={true}
        label="Địa chỉ"
        value={diaChi || ''}
        onChange={(e) =>
          onChange('diaChi', e.target.value)}
      />
      <TextField
        name="hoVaTen"
        fullWidth={true}
        label="Họ và tên"
        value={hoVaTen || ''}
        onChange={(e) =>
          onChange('hoVaTen', e.target.value)}
      />
      <TextField
        name="soDienThoai"
        fullWidth={true}
        label="Số điện thoại"
        type="number"
        value={soDienThoai || ''}
        onChange={(e) =>
          onChange('soDienThoai', e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Thông tin phản ánh</InputLabel>
        <Select
          name="thongTinPhanAnh"
          fullWidth={true}
          value={thongTinPhanAnh !== undefined ? thongTinPhanAnh + '' : ''}
          onChange={(e) =>
            onChange('thongTinPhanAnh', e.target.value)}
        >
          {
            dmThongTinPhanAnh.map(m =>
              <MenuItem key={m.code} value={m.code}  >{m.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <TextField
        multiline
        name="ghiChu"
        fullWidth={true}
        label="Ghi chú"
        value={ghiChu || ''}
        onChange={(e) =>
          onChange('ghiChu', e.target.value)}
      />
    </div>;
  }
}