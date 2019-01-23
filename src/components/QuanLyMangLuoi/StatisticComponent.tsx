import * as React from 'react';
import {
  Paper, Select, MenuItem,
  Button,
  LinearProgress,
  FormControl,
  InputLabel,
  WithStyles,
  createStyles,
  withStyles,
  Grid
} from '@material-ui/core';
import ReactTable from 'react-table';
import DownloadComponent from '../material-ui/DownLoadCSV';

// ESRI
import FeatureLayer from '../../map-lib/layers/FeatureLayer';
import geometryEngine = require('esri/geometry/geometryEngine');
// APP
import Item from '../../components/material-ui/LayerFieldItem';
import * as moment from 'moment/moment';
import SplitterLayout from 'react-splitter-layout';

const styles = createStyles({
  root: {
    height: '100%'
    // display: 'flex',
    // overflowY: 'hidden',
    // flexDirection: 'column'
  },
  formContainer: {
    // overflowY: 'auto',
    // minWidth: 300
  },
  resultsContainer: {
    // flexGrow: 1
  },
  statistic: {
    display: 'flex',
    flexDirection: 'column',
    '& .header': {

    },
    '& .content': {
      flex: '1 1 auto',
      overflow: 'auto'
    }
  },
  resultContainer: {

  },
  errorMessage: {

  }
});

type States = {
  results?: any[],
  snackbar: string;
  isLoading: boolean;
  error?: string;
  selectedLayer?: FeatureLayer;
  lstLayer: FeatureLayer[];
  searchFields?: any
};

type Props = {
  view: __esri.MapView | __esri.SceneView,
  layers: __esri.FeatureLayer[]
} & WithStyles<typeof styles>;
class StatisticComponent extends React.Component<Props, States> {
  static defaultProps = {
    layers: [],
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      snackbar: '',
      isLoading: false,
      lstLayer: [],
      results: []
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SplitterLayout
          vertical
          primaryIndex={1}
          primaryMinSize={400}
          secondaryMinSize={200}
          secondaryInitialSize={250}
        >
          {/* <div className={classes.formContainer}> */}
          {this.getStepContent(0)}
          {/* </div> */}
          {/* <div className={classes.resultsContainer}> */}
          {this.getStepContent(1)}
          {/* </div> */}
        </SplitterLayout>
      </div>
    );
  }

  private async changeSelectedFeature(layer?: FeatureLayer) {
    this.setState({
      isLoading: true
    });
    let searchFields = {};
    if (layer) {
      // nếu chưa tải thì chở tải layer tải xong
      if (!layer.loaded) {
        await layer.when();
      }
      layer.fields.forEach(field => searchFields[field.name] = null);
    }

    this.setState({
      searchFields,
      selectedLayer: layer,
      isLoading: false,
      results: []
    });
  }

  private onChangeSelectedFeature(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    // tạo search fields bao gồm tất cả thuộc tính của layer
    const { lstLayer } = this.state;
    const selectedLayer = lstLayer.find(f => f.id === value);
    this.changeSelectedFeature(selectedLayer);
  }

  private renderForm() {
    const { selectedLayer, searchFields } = this.state;

    if (selectedLayer && searchFields) {
      return <Grid container>
        {
          selectedLayer.fields.map(layerField => {
            return (
              <Grid key={selectedLayer.id + '_' + layerField.name} item xs={12} sm={6}>
                <Item
                  layerField={layerField}
                  value={searchFields[layerField.name]}
                  onChange={this.onChange.bind(this)}
                />
              </Grid>
            );
          })
        }
      </Grid>;
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
    let attributes = { ...this.state.searchFields };

    attributes[name] = value;

    // nếu giá trị thay đổi là subtype thì cập nhật tất cả các thành phần
    // liên quan là null
    const layer = this.state.selectedLayer as __esri.FeatureLayer;
    if (layer.typeIdField === name) {
      const subtype = layer.types[0];
      if (subtype) {
        // lọc fieldName để cập nhật lại giá trị
        for (const fieldName in subtype.domains) {
          if (fieldName && fieldName !== name) {
            attributes[fieldName] = null;
          }
        }
      }
    }

    this.setState({ searchFields: attributes });
  }

  /**
   * Giao diện khi chuyển bước
   */
  private getStepContent(stepIndex: number) {
    const { selectedLayer,
      error, isLoading, results, lstLayer } = this.state;
    const { classes } = this.props;

    if (stepIndex === 0) {
      return <div className={classes.statistic}>
        <div className="header">
          <FormControl fullWidth>
            <InputLabel htmlFor="lopdulieu">Chọn lớp dữ liệu</InputLabel>
            <Select
              fullWidth={true}
              value={selectedLayer ? selectedLayer.id : ''}
              onChange={this.onChangeSelectedFeature.bind(this)}
              inputProps={{ name: 'lopdulieu', id: 'lopdulieu' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                lstLayer &&
                lstLayer.map(m =>
                  <MenuItem key={m.id} value={m.id} >{m.title}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </div>
        <div className="content">
          {this.renderForm()}
        </div>
      </div>;
    } else if (stepIndex === 1) {
      return <Paper className={classes.resultContainer}>
        {isLoading && <LinearProgress />}
        {error && <div className={classes.errorMessage}>{error}</div>}
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          style={{ marginBottom: 7 }}
          onClick={this.onSubmitClick.bind(this)}
        >Thống kê</Button>
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
            />
          </div>
        }

      </Paper>;
    } else { return <div className={classes.errorMessage}>Có lỗi xảy ra</div>; }
  }

  componentDidMount() {
    const layers = this.getLayerList().toArray();

    this.setState({
      lstLayer: layers
    });
    this.changeSelectedFeature(layers.length > 0 ? layers[0] : undefined);
  }

  private renderComlumnTable() {
    const { selectedLayer } = this.state;
    if (selectedLayer) {
      var columns = [{ accessor: 'STT', Header: 'STT' },
      { accessor: 'TieuChi', Header: 'Tiêu chí' }];
      // nếu polyline thì tính theo chiều dài
      if (selectedLayer.geometryType === 'polyline') {
        columns.push({ accessor: 'ChieuDaiTT', Header: 'Chiều dài thực tế' });
        columns.push({ accessor: 'ChieuDaiGIS', Header: 'Chiều dài GIS' });
      }
      columns.push({ accessor: 'SoLuong', Header: 'Số lượng' }); // point tính theo số lượng
      return columns;
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
    if (selectedLayer) {
      this.setState({
        isLoading: true, // hiện loading,
        error: undefined
      });

      try {
        // điều kiện lọc
        let where = [];
        let tieuChi: string[] = [];
        const fields = selectedLayer.fields;
        for (const field of fields) {
          const value = searchFields[field.name];
          if (field.type === 'oid') { continue; }
          if (value === undefined || value === null) { continue; }
          if (field.domain && field.domain.type === 'coded-value') {
            let codedValues = (field.domain as __esri.CodedValueDomain).codedValues;
            if (codedValues) {
              let codedValue = codedValues.find(f => f.code === value);
              if (codedValue) {
                tieuChi.push(`${field.alias} = ${codedValue.name}`);
              } else {
                tieuChi.push(`${field.alias} = Không xác định`);
              }
            } else {
              tieuChi.push(`${field.alias} = Không xác định`);
            }
            where.push(`${field.name} = ${value}`);
          } else {
            if (field.type === 'string') {
              where.push(`${field.name} like N'%${value}%'`);
            } else if (field.type === 'date') {
              const date = moment(new Date(value)).format('YYYY-MM-DD');
              where.push(`${field.name} = date'${date}'`);
            } else { where.push(`${field.name} like ${value}`); }
            tieuChi.push(`${field.alias} = ${value}`);
          }
        }
        // if ('MAQUAN' in observable && observable['MAQUAN'] && observable['MAQUAN'].length > 0) {
        //   let values = observable['MAQUAN'];
        //   let orClause = values.map(m => `MAQUAN like ${m.MaHuyen}`);
        //   if (orClause.length > 0) {
        //     where.push('( ' + orClause.join(' or ') + ' )');
        //     tieuChi.push(`Quận thuộc ${values.map(m => m.TenQuan).join(', ')}`);
        //   }
        // }
        // nếu có truy vấn
        if (where.length > 0) {
          let query = selectedLayer.createQuery();
          query.where = where.join(' AND ');

          if (selectedLayer.geometryType === 'polyline') {
            query.returnGeometry = true;
            query.outFields = ['CHIEUDAI'];
            // query.outSpatialReference = this.view.spatialReference;
            const results = await selectedLayer.queryFeatures(query);
            const features = results.features;

            let length = '0';
            // nếu có đối tượng
            if (features.length > 0) {
              let geometries = features.filter(m => m.geometry).map(m => m.geometry);

              if (geometries.length > 0) {
                let unionGeometry = geometryEngine.union(geometries);
                length = geometryEngine.planarLength(unionGeometry, 'meters').toFixed(3);
              }
            } else {// nếu không tìm thấy đối tượng thì chiều dài = 0
              length = '0';
            }

            const newState = this.state.results ? this.state.results.slice() : [];
            newState.push({
              STT: this.state.results ? this.state.results.length + 1 : 1,
              TieuChi: tieuChi.join(', '),
              ChieuDaiGIS: length + ' m',
              ChieuDaiTT: features.length > 0 ?
                features.map(m => m.attributes.CHIEUDAI || 0).reduce((a, b) => a + b) : 0,
              SoLuong: features.length
            });
            this.setState({
              results: newState
            });
            return null;
          } else {
            selectedLayer.queryFeatureCount(query).then(count => {
              const newState = this.state.results ? this.state.results.slice() : [];
              newState.push({
                STT: this.state.results ? this.state.results.length + 1 : 1,
                TieuChi: tieuChi.join(', '), SoLuong: count
              });
              this.setState({
                results: newState
              });
            });
          }
        } else {
          this.setState({
            error: 'Không xác định điều kiện lọc'
          });
        }
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
}
export default withStyles(styles)(StatisticComponent);