import * as React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { ThongTinPhanAnh } from '../../../../services/map/SuCo/model';
import GroupComponent from '../../../material-ui/Group';
import DatePicker, { TimeType } from '../../../material-ui/DatePicker';

const SearchingForm = (props: {
  onChange: (name: string, value: any) => void,
  IDSuCo?: string,
  sdtNguoiPhanAnh?: string,
  tgPhanAnhFrom?: Date,
  tgPhanAnhTo?: Date,
  thongTinPhanAnh?: ThongTinPhanAnh,
  thongTinPhanAnhValues: __esri.CodedValueDomainCodedValues[]
}) => {
  return <div>
    <FlexComponent>
      <TextField
        name="IDSuCo"
        value={props.IDSuCo || ''}
        label="Mã sự cố"
        fullWidth={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange('IDSuCo', e.target.value)}
      />
      <TextField
        name="sdtNguoiPhanAnh"
        value={props.sdtNguoiPhanAnh || ''}
        label="SĐT người phản ánh"
        fullWidth={true}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange('sdtNguoiPhanAnh', e.target.value)}
      />
    </FlexComponent>
    <GroupComponent
      title="Thời gian phản ánh"
      styleContainer={{ display: 'flex', width: '100%' }}
    >
      <DatePicker
        inputProps={{ name: 'tgPhanAnhFrom', label: 'Từ' }}
        type={TimeType.Date}
        value={props.tgPhanAnhFrom}
        onChange={(newValue?: Date) => props.onChange('tgPhanAnhFrom', newValue)}
      // maxDate={props.tgPhanAnhTo}
      />
      <DatePicker
        inputProps={{ name: 'props.tgPhanAnhTo', label: 'Đến', fullWidth: true }}
        type={TimeType.Date}
        value={props.tgPhanAnhTo}
        onChange={(newValue?: Date) => props.onChange('tgPhanAnhTo', newValue)}
      // minDate={props.tgPhanAnhFrom}
      />
    </GroupComponent>
    <FormControl fullWidth >
      <InputLabel htmlFor="thongtinphananh">Thông tin phản ánh</InputLabel>
      <Select
        name="thongtinphananh"
        fullWidth={true}
        value={props.thongTinPhanAnh !== undefined ? props.thongTinPhanAnh : ''}
        onChange={
          (event: React.ChangeEvent<HTMLSelectElement>) =>
            props.onChange('thongTinPhanAnh', event.target.value)
        }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.thongTinPhanAnhValues &&
          props.thongTinPhanAnhValues.map(m =>
            <MenuItem key={m.code} value={m.code}>{m.name}</MenuItem>)
        }
      </Select>
    </FormControl>
  </div>;
};

const FlexComponent = (props: React.Props<any>) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {props.children}
  </div>
);

export default SearchingForm;