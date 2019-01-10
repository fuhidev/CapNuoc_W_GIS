import * as React from 'react';
import { Divider, Paper, TextField, RaisedButton, LinearProgress } from 'material-ui';
import { ResultILI } from '../../models/DMA';
import * as api from '../../apis/TonThatDMAApi';
interface Props {
}

interface States {
  p: number;
  result?: ResultILI;
  isLoadingResult: boolean;
  error?: string;
}

class ILITabComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoadingResult: false,
      p: 1
    };
  }
  render() {
    const { p, result, isLoadingResult, error } = this.state;
    return (
      <div>
        <TextField
          value={p}
          onChange={(e: any, value: any) => this.handleChange('p', value)}
          floatingLabelText="Áp lực trung bình"
          fullWidth={true}
        />
        <RaisedButton
          fullWidth={true}
          primary={true} label="Tính toán"
          onClick={this.handleSubmitClick.bind(this)}
        />
        <Divider />
        <div className="result-container">
          {isLoadingResult && <LinearProgress />}
          {error && <div className="error-message">{error}</div>}
          {result &&
            <Paper>
              <div className="title">Kết quả</div>
              <div style={{ textAlign: 'center' }}><i>(Số liệu đã làm tròn 3 chữ số)</i></div>
              <div className="ili-container">
                <div className="content">
                  <ul>
                    <li>
                      <span>CAPL: </span><strong>{result.CAPL}</strong>
                    </li>
                    <li>MAAPL: <strong>{result.MAAPL}</strong>
                      <ul>
                        <li><span>LM: </span><strong>{result.LM}</strong></li>
                        <li><span>NC: </span><strong>{result.NC}</strong></li>
                        <li><span>LP: </span><strong>{result.LP}</strong></li>
                        <li><span>P: </span><strong>{result.P}</strong></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="value">
                    <span>Giá trị ILI: </span>
                    <strong>{result.ILI}</strong>
                  </div>
                  <div className="title">
                    Đánh giá tình trạng thất thoát thu nước sạch
                  </div>
                  <div className="summary">
                    <div>
                      <span>Nhóm: </span>
                      <strong>{result.Group}</strong>
                    </div>
                    <div>
                      <span>Đánh giá: </span>
                      <strong>{result.Summary}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          }

        </div>
      </div>
    );
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async handleSubmitClick() {
    this.setState({
      isLoadingResult: true,
      result: undefined,
      error: undefined
    });
    const { p } = this.state;
    try {
      const result = await api.ILI({ P: p }) as ResultILI;
      this.setState({
        error: undefined,
        result
      });
    } catch (error) {
      this.setState({
        error: error.Message ? error.Message : error
      });
    }
    finally {
      this.setState({
        isLoadingResult: false
      });
    }
  }
}

export default ILITabComponent;