import * as React from 'react';
import BaseComponent from '../../BaseComponent';

type Props = {
	hoVaTen?: string,
	soDienThoai?: string,
	diaChi?: string,
	linhVuc?: string
};

export default class FormInput extends BaseComponent<Props, {}> {
	render() {
		const {
			className,
			hoVaTen,
			diaChi,
			linhVuc,
			soDienThoai,
		} = this.props;
		return <div className={className}>
			<div style={{ marginTop: 10 }} >
        <p>
          Người thông báo: <strong>{hoVaTen}</strong>
        </p>
        <p>
          Số điện thoại: <strong>{soDienThoai}</strong>
        </p>
        <p>
          Thời gian tiếp nhận: <strong>{new Date().toLocaleString()}</strong>
        </p>
        <p>
          Địa chỉ: <strong>{diaChi}</strong>
        </p>
        <p>
          Lĩnh vực: <strong>{linhVuc}</strong>
        </p>
      </div>
		</div>
	}
}

