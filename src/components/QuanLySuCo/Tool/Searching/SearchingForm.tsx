import * as React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import { LinhVuc } from "../../../../services/map/SuCo/model";
import GroupComponent from '../../../material-ui/Group';
import DatePicker, { TimeType } from '../../../material-ui/DatePicker';


const SearchingForm = (props: {
  onChange: (name: string, value: any) => void,
    maSuCo?: string,
    sdtNguoiPhanAnh?: string,
    tgPhanAnhFrom?: Date,
    tgPhanAnhTo?: Date,
    linhVuc?: LinhVuc,
    linhVucValues: __esri.CodedValueDomainCodedValues[]
} ) => {
  return <div>
    <FlexComponent>
      <TextField
        name="maSuCo"
        value={props.maSuCo || ''}
        label="Mã sự cố"
        fullWidth={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange("maSuCo", e.target.value)}
      />
      <TextField
        name="sdtNguoiPhanAnh"
        value={props.sdtNguoiPhanAnh || ''}
        label="SĐT người phản ánh"
        fullWidth={true}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange("sdtNguoiPhanAnh", e.target.value)}
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
      <InputLabel htmlFor="linhvuc-suco">Lĩnh vực</InputLabel>
      <Select
      name="linhvuc-suco"
        fullWidth={true}
        value={props.linhVuc !== undefined?props.linhVuc : ''}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => props.onChange('linhVuc', event.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {props.linhVucValues &&
          props.linhVucValues.map(m =>
            <MenuItem key={m.code} value={m.code}>{m.name}</MenuItem>)
        }
      </Select>
    </FormControl>
  </div>
};


const FlexComponent = (props: React.Props<any>) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    {props.children}
  </div>
)

export default SearchingForm;