import * as React from 'react';
import BaseComponent from '../../BaseComponent';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

type Props = {
	onChange: (name: string, value: any) => void,
	hoVaTen?: string,
	soDienThoai?: string,
	diaChi?: string,
	noiDung?: string,
	nguyenNhan?: string,
	linhVuc?: number,
	dmLinhVuc: __esri.CodedValueDomainCodedValues[],
	dmNguyenNhan: __esri.CodedValueDomainCodedValues[]
};

export default class FormInput extends BaseComponent<Props, {}> {
	render() {
		const {
			className,
			hoVaTen,
			diaChi,
			linhVuc,
			nguyenNhan,
			onChange,
			soDienThoai,
			noiDung,
			dmLinhVuc,
			dmNguyenNhan
		} = this.props;
		return <div className={className}>
			<TextField
				name="diaChi"
				fullWidth={true}
				label="Địa chỉ"
				value={diaChi||''}
				onChange={(e) =>
					onChange('diaChi', e.target.value)}
			/>
			<TextField
				name="hoVaTen"
				fullWidth={true}
				label="Họ và tên"
				value={hoVaTen||''}
				onChange={(e) =>
					onChange('hoVaTen', e.target.value)}
			/>
			<TextField
				name="soDienThoai"
				fullWidth={true}
				label="Số điện thoại"
				type="number"
				value={soDienThoai||''}
				onChange={(e) =>
					onChange('soDienThoai', e.target.value)}
			/>
			<FormControl fullWidth>
				<InputLabel>Lĩnh vực</InputLabel>
				<Select
					name="linhVuc"
					fullWidth={true}
					value={linhVuc !== undefined ? linhVuc + '' : ''}
					onChange={(e) =>
						onChange('linhVuc', e.target.value)}
				>
					{
						dmLinhVuc.map(m =>
							<MenuItem key={m.code} value={m.code}  >{m.name}</MenuItem>
						)
					}
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel>Nguyên nhân</InputLabel>
				<Select
					name="nguyenNhan"
					fullWidth={true}
					value={nguyenNhan !== undefined ? nguyenNhan + '' : ''}
					onChange={(e) =>
						onChange('nguyenNhan', e.target.value)}
				>
					{
						dmNguyenNhan.map(m =>
							<MenuItem key={m.code} value={m.code}  >{m.name}</MenuItem>
						)
					}
				</Select>
			</FormControl>
			<TextField
				multiline
				name="noiDung"
				fullWidth={true}
				label="Nội dung phản ánh"
				value={noiDung||''}
				onChange={(e) =>
					onChange('noiDung', e.target.value)}
			/>
		</div>
	}
}