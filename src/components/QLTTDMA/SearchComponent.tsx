import * as React from 'react';
import {
  Paper, SelectField, MenuItem,
  RaisedButton, Snackbar, Stepper, Step, StepLabel,
  LinearProgress,
  FlatButton
} from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import ReactTable, { RowInfo } from 'react-table';
import DownloadComponent from '../material-ui/DownLoadCSV';

// ESRI
import FeatureLayer from '../../map-lib/layers/FeatureLayer';
import HighlightGraphic from '../../map-lib/support/HighlightGraphic';
// APP
import * as moment from '../../modules/moment';
import DMA from '../../models/DMA';
import * as tonThatDMAApi from '../../apis/TonThatDMAApi';
import { LAYER as CST_LAYER } from '../../constants/map';
import Item from '../../components/material-ui/LayerFieldItem';
type States = {
  results?: any[],
  snackbar: string;
  stepIndex: number;
  isLoading: boolean;
  error?: string;
  selectedLayer?: FeatureLayer;
  searchFields?: any;
  dmas: DMA[];
  dma?: string;
};

type Props = {
  view: __esri.MapView
};
class SearchComponent extends React.Component<Props, States> {
  private highlightGraphic: HighlightGraphic;
  constructor(props: Props) {
    super(props);
    this.state = {
      snackbar: '',
      stepIndex: 0,
      isLoading: true,
      dmas: []
    };
  }

  render() {
    const {
      snackbar,
      stepIndex
    } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <div className="tool-search" tabIndex={stepIndex}>
            <Paper>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>Thông tin tìm kiếm</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Kết quả tìm kiếm</StepLabel>
                </Step>
              </Stepper>
              <div>{this.getStepContent()}</div>
              <div className="btn-group">
                <FlatButton
                  label="Quay lại"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrevious.bind(this)}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label="Tìm kiếm"
                  disabled={stepIndex === 1}
                  primary={true}
                  onClick={this.onSubmitClick.bind(this)}
                />
              </div>
            </Paper>
          </div >
          <Snackbar
            autoHideDuration={4000}
            open={snackbar.length > 0}
            message={snackbar}
            onRequestClose={e => this.setState({ snackbar: '' })}
          />
        </div>
      </MuiThemeProvider >
    );
  }

  private async goToDMA(maDMA: string) {
    const view = this.props.view;
    if (view) {
      const layer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;
      if (layer) {
        const results = await layer.queryFeatures({
          where: `MADMA = '${maDMA}'`,
          outSpatialReference: view.spatialReference,
          returnGeometry: true
        });
        view.goTo(results.features);
      }
    }
  }

  private handlePrevious() {
    this.setState({
      stepIndex: 0
    });
  }

  private renderForm() {
    const { selectedLayer, searchFields } = this.state;

    if (selectedLayer && searchFields) {
      return selectedLayer.fields.map(layerField => {
        return (
          <Item
            key={selectedLayer.id + '_' + layerField.name}
            layerField={layerField}
            value={searchFields[layerField.name]}
            onChange={this.onChange.bind(this)}
          />
        );
      });
    } else {
      return null;
    }
  }

  /**
   * Sự kiện thay đổi giá trị thuộc tính
   * @param name Tên thuộc tính
   * @param value Giá trị
   */
  private onChange(name: string, value: any) {
    let searchFields = this.state.searchFields;
    if (searchFields) {
      searchFields[name] = value;
      // this.convertValue(name, value);
    }
    this.setState({
      searchFields: { ...this.state.searchFields, }
    });
  }

  /**
   * Giao diện khi chuyển bước
   */
  private getStepContent() {
    const { selectedLayer, stepIndex,
      error, isLoading, results, dma, dmas } = this.state;

    if (stepIndex === 0) {
      return <div className="statistic">
        <SelectField
          floatingLabelText="DMA"
          hintText="Chọn DMA"
          fullWidth={true}
          value={dma}
          onChange={(e: any, index: any, value: any) => {
            this.goToDMA(value);
            this.handleChange('dma', value);
          }}
        >
          {
            dmas.map(m => <MenuItem key={'tieuthu' + m.MaDMA} value={m.MaDMA} primaryText={m.TenDMA} />)
          }
        </SelectField>
        {this.renderForm()}
      </div>;
    } else if (stepIndex === 1) {
      return <Paper className="result-container">
        {isLoading && <LinearProgress />}
        {error && <div className="error-message">{error}</div>}
        <div className="title">{selectedLayer ? selectedLayer.title : 'Không xác định'}</div>
        {results &&
          <div>
            <div style={{ textAlign: 'right' }}>
              <DownloadComponent datas={results} title={selectedLayer ? selectedLayer.title : 'Kết quả tìm kiếm'} />
            </div>
            <ReactTable
              data={results}
              columns={this.renderComlumnTable()}
              defaultPageSize={10}
              className="-striped -highlight"
              getTrProps={(state: any, rowInfo: RowInfo) => {
                return {
                  onClick: () => this.onRowClick(rowInfo)
                };
              }}
            />
          </div>
        }

      </Paper>;
    } else { return <div className="error-message">Có lỗi xảy ra</div>; }
  }

  async componentDidMount() {
    tonThatDMAApi.layLoggerDMA()
      .then((dmaDatas) => {
        this.setState({ dmas: dmaDatas, dma: dmaDatas[0].MaDMA });
      });

    const { view } = this.props;
    try {
      if (view) {

        // đồng hồ tổng layer
        const layer = view.map.findLayerById(CST_LAYER.DONG_HO_TONG) as FeatureLayer;
        let searchFields = {};
        if (layer) {
          if (!layer.loaded) {
            await layer.when();
          }
          layer.fields.forEach(field => searchFields[field.name] = null);
          this.setState({
            selectedLayer: layer,
            searchFields
          });
        } else {
          throw 'Không tìm thấy layer đồng hồ tổng,vui lòng chạy lại trang!';
        }
      } else {
        throw 'Không tìm thấy view, vui lòng chạy lại trang!';
      }
    } catch (error) {
      this.setState({
        error
      });
    }
    finally {
      this.setState({
        isLoading: false
      });
    }
  }

  private renderComlumnTable() {
    const { selectedLayer } = this.state;
    if (selectedLayer) {
      return selectedLayer.fields.map(m => {
        return {
          Header: m.alias,
          accessor: m.name
        };
      }
      );
    } else {
      return [];
    }
  }

  private async onSubmitClick() {
    const { selectedLayer, searchFields, dma } = this.state;
    const { view } = this.props;

    // nếu chưa tạo highlight thì tạo
    if (!this.highlightGraphic) {
      this.highlightGraphic = new HighlightGraphic(view);
    }
    this.highlightGraphic.clear(); // clear

    if (selectedLayer && dma) {
      this.setState({
        stepIndex: 1,
        isLoading: true // hiện loading
      });

      try {
        // điều kiện lọc
        let where = ['1=1'];
        const fields = selectedLayer.fields;
        for (const field of fields) {
          if (field.type === 'oid') { continue; }
          const value = searchFields[field.name];
          if (value) {
            if (field.type === 'string') {
              where.push(`${field.name} like N'%${value}%'`);
            } else if (field.type === 'date') {
              const date = moment.formatddmmyyyy(value);
              where.push(`${field.name} = date'${date}'`);
            } else { where.push(`${field.name} like ${value}`); }
          }
        }

        // truy vấn dữ liệu GIS DMA

        const dmaLayer = view.map.findLayerById(CST_LAYER.DMA) as __esri.FeatureLayer;
        if (!dmaLayer) { throw 'Không tìm thấy lớp dữ liệu DMA'; }
        const resultsDMA = await dmaLayer.queryFeatures({
          where: `MADMA = '${dma}'`, outFields: [], returnGeometry: true
        });

        if (resultsDMA.features.length === 0) { throw 'Không xác định được dữ liệu GIS của DMA ' + dma; }
        // truy vấn dữ liệu
        const results = await selectedLayer.queryFeatures({
          returnGeometry: true,
          outFields: ['*'],
          where: where.join(' AND '),
          geometry: resultsDMA.features[0].geometry,
          outSpatialReference: view.spatialReference
        });

        // highlight
        this.highlightGraphic.addAll(results.features);

        this.setState({
          results: this.convertData(selectedLayer, results.features.map(m => m.attributes))
        });
        // if ('MAQUAN' in observable && observable['MAQUAN'] && observable['MAQUAN'].length > 0) {
        //   let values = observable['MAQUAN'];
        //   let orClause = values.map(m => `MAQUAN like ${m.MaHuyen}`);
        //   if (orClause.length > 0) {
        //     where.push('( ' + orClause.join(' or ') + ' )');
        //   }
        // }
      } catch (error) {
        this.setState({
          error: 'Có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại' +
            (typeof (error) === 'string' ? error : '')
        });
      }
      finally {
        this.setState({
          isLoading: false
        });
      }
    } else {
      this.setState({
        error: 'Có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại'
      });
    }
  }

  private convertData(layer: __esri.FeatureLayer, data: any[]) {
    let returnData = data.slice();
    for (const field of layer.fields) {
      const domain = field.domain;
      if (domain) {
        const codedValues = (domain as __esri.CodedValueDomain).codedValues;
        if (codedValues) {
          for (const key in data) {
            if (key) {
              const codeValue = codedValues.find(f => f.code === data[key][field.name]);
              if (codeValue) {
                returnData[key][field.name] = codeValue.name;
              }
            }
          }
        }
      }
    }
    return returnData;
  }

  private handleChange(key: string, value: any) {
    let states = { ...this.state };
    states[key] = value;
    this.setState(states);
  }

  private async onRowClick(rowInfo: RowInfo) {
    const { OBJECTID } = rowInfo.row;
    const { selectedLayer } = this.state;
    const { view } = this.props;
    if (selectedLayer) {
      const results = await selectedLayer.queryFeatures({
        where: `OBJECTID = ${OBJECTID}`,
        returnGeometry: true,
        outSpatialReference: view.spatialReference,
        outFields: ['*']
      });

      // hiển thị popup
      view.popup.open({
        features: results.features,
        updateLocationEnabled: true
      });
    }
  }
}
export default SearchComponent;