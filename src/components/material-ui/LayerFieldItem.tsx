import * as React from 'react';
import {
  Select, MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import DatePicker, { TimeType } from './DatePicker';
const Item = (props: {
  layerField: __esri.Field,
  value: string | number,
  onChange: (name: string, value: any) => void
}) => {
  const { layerField, value, onChange } = props;

  // nếu có domain thì hiển thị select
  if (layerField.domain && layerField.domain.type === 'coded-value') {
    let domain = layerField.domain as __esri.CodedValueDomain,
      codedValues = domain.codedValues;

    return (
      <div>
        <FormControl fullWidth >
          <InputLabel htmlFor={layerField.name}>{layerField.alias || layerField.name}</InputLabel>
          <Select
            name={layerField.name}
            value={value !== undefined && value !== null ? value : ''}
            fullWidth={true}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              let _value = event.target.value;
              const value1 = _value !== undefined && _value !== null && _value !== '' ?
                (layerField.type === 'integer' || layerField.type === 'small-integer') ?
                  parseInt(_value, undefined) :
                  (layerField.type === 'double' || layerField.type === 'single') ?
                    parseFloat(_value) : _value : null;
              onChange(layerField.name, value1);
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {
              codedValues.map(m => <MenuItem key={domain.name + '_' + m.code} value={m.code} >{m.name}</MenuItem>)
            }
          </Select>
        </FormControl>

      </div >
    );
  } else {
    switch (layerField.type) {
      case 'string':
      case 'small-integer':
      case 'integer':
      case 'double':
      case 'single':
        return (
          <div>
            <TextField
              type={layerField.type === 'string' ? 'text' : 'number'}
              label={layerField.alias || layerField.name}
              value={value !== null && value !== undefined ? value : ''}
              fullWidth={true}
              onChange={(e: any) => {
                const _value = e.target.value !== undefined && e.target.value !== null ?
                  (layerField.type === 'integer' || layerField.type === 'small-integer') ?
                    parseInt(e.target.value, undefined) :
                    (layerField.type === 'double' || layerField.type === 'single') ?
                      parseFloat(e.target.value) : e.target.value : null;
                onChange(layerField.name, _value);
              }}
            />
          </div>);
      case 'date':
        return <div>
          <DatePicker
            // mode={Mode["12h"]}
            inputProps={
              { label: layerField.alias, fullWidth: true }
            }
            type={TimeType.Date}
            value={value && Number.isInteger(value as any) ? new Date(value) : undefined}
            onChange={(date?: Date) => {
              onChange(layerField.name, date ? date.getTime() : undefined);
            }}
          /></div>;
      default:
        return <TextField
          label={layerField.alias || layerField.name}
          value={value !== null && value !== undefined ? value : ''}
          fullWidth={true}
          onChange={(e: any) => {
              onChange(layerField.name, e.target.value);
          }}
        />;
    }
  }

};
export default Item;