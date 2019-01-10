import * as React from 'react';
import {
  Paper, LinearProgress
} from 'material-ui';
import { BarChart, Bar, YAxis, CartesianGrid, XAxis, Tooltip, LabelList } from 'recharts';
import { TieuThuKhachHang } from '../../models/SanLuongKhachHang';
type States = {
};

type Props = {
  error?: string;
  isLoading: boolean;
  datas?: TieuThuKhachHang[],
  isOpen: boolean,
  danhBo: string
};

class BieuDoTieuThuComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    // nếu không cho mở thì ẩn
    if (!this.props.isOpen) {
      return null;
    }

    const { error, isLoading, datas, danhBo } = this.props;

    let convertDatas = datas ? datas.map(m => {
      return {
        name: m.KY + '-' + m.NAM,
        value: m.TIEUTHU
      };
    }) : [];

    return (
      <Paper style={{ position: 'absolute', bottom: 0, left: 10, height: 320, width: 500 }}>
        <h1 style={{ width: '100%', fontSize: 24, textAlign: 'center' }}>Biểu đồ tiêu thụ</h1>
        <h2 style={{ width: '100%', fontSize: 20, textAlign: 'center' }}>Danh bộ: {danhBo}</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading && <LinearProgress />}
        {convertDatas.length > 0 &&
          <BarChart width={480} height={230} data={convertDatas}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff5252" />
          </BarChart>
        }
      </Paper>
    );
  }
}
export default BieuDoTieuThuComponent;