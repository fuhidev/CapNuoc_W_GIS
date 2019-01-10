import * as React from 'react';
import {
  SelectField, MenuItem,
  TextField,
} from 'material-ui';
import DatePicker from '../../components/material-ui/DatePicker';
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
        <SelectField
          value={value}
          fullWidth={true}
          onChange={(e: any, index: number, _value: any) => {
            const value1 = _value !== undefined && _value !== null ?
              (layerField.type === 'integer' || layerField.type === 'small-integer') ?
                parseInt(_value, undefined) :
                (layerField.type === 'double' || layerField.type === 'single') ?
                  parseFloat(_value) : _value : null;
            onChange(layerField.name, value1);
          }}
        >
          <MenuItem value={null} primaryText={layerField.alias || layerField.name} />
          {
            codedValues.map(m => <MenuItem key={domain.name + '_' + m.code} value={m.code} primaryText={m.name} />)
          }
        </SelectField>
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
              floatingLabelText={layerField.alias || layerField.name}
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
        return <div><DatePicker
          floatingLabelText={layerField.alias || layerField.name}
          fullWidth={true}
          value={Number.isInteger(value as any) ? new Date(value) : new Date()}
          onChange={(event: any, _value: any) => {
            onChange(layerField.name, (_value as Date).getTime());
          }}
        /></div>;
      default:
        return <div></div>;
    }
  }

};
export default Item;