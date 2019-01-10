import * as React from 'react';
import {
  Paper, SelectField, MenuItem,
  RaisedButton, Snackbar, Stepper, Step, StepLabel,
  LinearProgress,
  FlatButton,
} from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import ReactTable, { RowInfo } from 'react-table';
import DownloadCSVComponent from '../material-ui/DownLoadCSV';

// ESRI
import FeatureLayer from '../../map-lib/layers/FeatureLayer';
import HighlightGraphic from '../../map-lib/support/HighlightGraphic';

// APP
import * as moment from '../../modules/moment';
import Item from '../../components/material-ui/LayerFieldItem';
type States = {
  results?: any[],
  snackbar: string;
  stepIndex: number;
  isLoading: boolean;
  error?: string;
  selectedLayer?: FeatureLayer;
  lstLayer: FeatureLayer[];
  searchFields?: any
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
      isLoading: false,
      lstLayer: []
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

  private onChangeSelectedFeature(e: any, index: number, value: string) {
    // tạo search fields bao gồm tất cả thuộc tính của layer
    const { lstLayer } = this.state;
    const selectedLayer = lstLayer.find(f => f.id === value);
    let searchFields = {};
    if (selectedLayer) {
      selectedLayer.fields.forEach(field => searchFields[field.name] = null);
    }

    this.setState({
      searchFields,
      selectedLayer
    });
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
      error, isLoading, results, lstLayer } = this.state;

    if (stepIndex === 0) {
      return <div className="statistic">
        <SelectField
          fullWidth={true}
          floatingLabelText="Chọn lớp dữ liệu"
          value={selectedLayer ? selectedLayer.id : null}
          onChange={this.onChangeSelectedFeature.bind(this)}
        >
          {
            lstLayer &&
            lstLayer.map(m =>
              <MenuItem key={m.id} value={m.id} primaryText={m.title} />
            )
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
              {/* <a href={} download={selectedLayer ? selectedLayer.title : 'VAW'} >Tải xuống</a> */}
              <DownloadCSVComponent datas={results} title={selectedLayer ? selectedLayer.title : 'Kết quả tìm kiếm'} />
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

  componentDidMount() {
    const layers = this.getLayerList();

    this.setState({
      lstLayer: layers.toArray()
    });

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

  /**
   * Lấy danh sách layer
   */
  private getLayerList(): __esri.Collection<FeatureLayer> {
    const view = this.props.view;

    // lấy danh sách layer có kiểu feature
    const layers = view.map.allLayers.filter(f => f.type === 'feature'
      && (f as FeatureLayer).layerInfo && (f as FeatureLayer).layerInfo.IsView// nếu layer được phép xem
    );
    return layers as __esri.Collection<FeatureLayer>;
  }

  private async onSubmitClick() {
    const { selectedLayer, searchFields } = this.state;
    const { view } = this.props;
    if (selectedLayer) {
      this.setState({
        stepIndex: 1,
        isLoading: true // hiện loading
      });
      // nếu chưa tạo highlight thì tạo
      if (!this.highlightGraphic) {
        this.highlightGraphic = new HighlightGraphic(view);
      }
      this.highlightGraphic.clear(); // clear

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

        // truy vấn dữ liệu
        const results = await selectedLayer.queryFeatures({
          returnGeometry: true,
          outSpatialReference: view.spatialReference,
          outFields: ['*'],
          where: where.join(' AND ')
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
          error: 'Có lỗi xảy ra trong quá trình thực hiện, vui lòng thử lại'
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