// REACT
import * as React from 'react';
import {
  Paper, LinearProgress, Toggle, Snackbar
} from 'material-ui';
import { YAxis, CartesianGrid, XAxis, Tooltip, Line, LineChart } from 'recharts';

import DatePicker from '../material-ui/DatePicker';

// APP
import * as api from '../../apis/TonThatDMAApi';
import { ApLuc } from '../../models/DMA';
type States = {
  isBieuDoApLuc: boolean;
  apLucDatas?: ApLuc[];
  luuLuongDatas?: ApLuc[];
  isLoading: boolean;
  tuNgay: Date,
  denNgay: Date,
  error?: string,
  snackbar: string;
};

type Props = {
  isOpen: boolean,
  dma: string
};

class BieuDoApLuc extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    const denNgay = new Date(),
      tuNgay = new Date(denNgay.getFullYear(), denNgay.getMonth(), denNgay.getDate() - 1);
    this.state = {
      isBieuDoApLuc: true,
      isLoading: false,
      tuNgay, denNgay,
      snackbar: ''
    };
  }
  render() {
    // nếu không cho mở thì ẩn
    if (!this.props.isOpen) {
      return null;
    }

    const { error, isLoading, apLucDatas, isBieuDoApLuc, tuNgay, denNgay, luuLuongDatas,
      snackbar } = this.state;
    const { dma } = this.props;

    const title = isBieuDoApLuc ? 'Áp lực' : 'Lưu lượng';

    return (
      <Paper style={{ position: 'absolute', bottom: 0, left: 10, height: 340, width: 600 }}>
        <div style={{ position: 'absolute', top: 19, left: 20 }}>
          <Toggle
            label={title}
            toggled={isBieuDoApLuc}
            labelPosition="right"
            onToggle={(e: any, value: boolean) =>
              this.setState({ isBieuDoApLuc: value })}
          />
        </div>
        <h1 style={{ width: '100%', fontSize: 24, textAlign: 'center' }}>{'Biểu đồ ' + title + ' (' + dma + ')'}</h1>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ margin: '0 auto', width: 300, display: 'flex', flexDirection: 'row' }}>
            <div>
              <DatePicker
                fullWidth={true}
                value={tuNgay}
                onChange={(e: any, date: Date) => this.onChangeDate('tuNgay', date)} />
            </div>
            <div>
              <DatePicker
                fullWidth={true}
                value={denNgay}
                onChange={(e: any, date: Date) => this.onChangeDate('denNgay', date)} />
            </div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {isLoading && <LinearProgress />}
        <div style={{ width: '100%', overflowY: 'hidden', overflowX: 'auto' }}>
          {apLucDatas && apLucDatas.length > 0 &&
            <LineChart width={1000} height={230} data={isBieuDoApLuc ? apLucDatas : luuLuongDatas}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ThoiGian" />
              <YAxis />
              <Tooltip />
              <Line dataKey="GiaTri" fill="#ff5252" />
            </LineChart>
          }
        </div>
        <Snackbar
          autoHideDuration={4000}
          open={snackbar.length > 0}
          message={snackbar}
          onRequestClose={e => this.setState({ snackbar: '' })}
        />
      </Paper>
    );
  }

  componentWillReceiveProps(props: Props) {
    // Nếu nhận mã dma mới thì tải lại dữ liệu
    if (props.dma && this.props.dma !== props.dma) {
      this.loadData(props.dma, this.state.tuNgay, this.state.denNgay);
    }
  }

  private onChangeDate(key: string, value: Date) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }
  shouldComponentUpdate(props: Props, states: States) {

    // nếu thời gian thay đổi thì cập nhật lại dữ liệu
    if (this.state.tuNgay.getTime() !== states.tuNgay.getTime()
      || this.state.denNgay.getTime() !== states.denNgay.getTime()) {
      this.loadData(this.props.dma, states.tuNgay, states.denNgay);
      return false; // không cần phải cập nhật lại giao diện
    }
    return true;
  }

  private async loadData(dma: string, tuNgay: Date, denNgay: Date) {
    try {
      this.setState({
        isLoading: true,
        error:undefined
      });
      const apLucDatas = await api.layChiTietApLuc({
        maDMA: dma, tuNgay, denNgay
      });
      const luuLuongDatas = await api.layChiTietSanLuongDMA({
        maDMA: dma, tuNgay, denNgay
      });
      this.setState({
        apLucDatas,
        luuLuongDatas
      });

      let states = { snackbar: '', isBieuDoApLuc: this.state.isBieuDoApLuc };

      if (apLucDatas.length === 0) {
        states.snackbar = 'Không có dữ liệu áp lực';

        // Nếu áp lực không có dữ liệu mà lưu lượng có dữ liệu
        // thì chuyển sang hiển thị biểu đồ lưu lượng
        if (luuLuongDatas.length > 0) {
          states.isBieuDoApLuc = false;
        }
      }
      if (luuLuongDatas.length === 0) {
        if (states.snackbar) {
          states.snackbar += ' và lưu lượng';
        } else {
          states.snackbar = 'Không có dữ liệu lưu lượng';
        }
      }
      this.setState(states);
    } catch (e) {
      this.setState({
        apLucDatas: [],
        error: e && e.Message && e.Message,
      });
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }
}
export default BieuDoApLuc;