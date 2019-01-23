import * as React from 'react';
import {
  Paper, MenuItem,
  Stepper, Step, StepLabel,
  LinearProgress,
  Button,
  Select,
  FormControl,
  InputLabel,
  WithStyles,
  createStyles,
  Theme,
  withStyles,
  Grid
} from '@material-ui/core';
import DownloadCSVComponent from '../material-ui/DownLoadCSV';
import SketchSearch from './SketchSearch';
import SketchSearchViewModel from '../../map-lib/widgets/SketchSearchViewModel';
// ESRI
import FeatureLayer from '../../map-lib/layers/FeatureLayer';
import HighlightGraphic from '../../map-lib/support/HighlightGraphic';
import geometryEngine = require('esri/geometry/geometryEngine');
// APP
import Item from '../material-ui/LayerFieldItem';
import ReactTable, { RowInfo } from 'react-table';
import * as queryHelper from '../../map-lib/support/queryHelper';
const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 700,
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: theme.palette.primary.main,
    textAlign: 'center',
    lineHeight: 1.5
  },
  btnGroup: {
    padding: '7px 0 17px 0'
  },
  statistic: {
    flex: '1 1 auto',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& .header': {

    },
    '& .content': {
      flex: '1 1 auto',
      overflow: 'auto'
    }
  },
  search: {},
  resultContainer: {
    flex: '1 1 auto',
    overflow: 'auto'
  },
  resultContainerTable: {
    overflow: 'auto',
  }
});

type States = {
  results?: any[],
  stepIndex: number;
  isLoading: boolean;
  error?: string;
  selectedLayer?: FeatureLayer;
  lstLayer: FeatureLayer[];
  searchFields?: any
};

type Props = {
  view: __esri.MapView | __esri.SceneView
} & WithStyles<typeof styles>;
class SearchComponent extends React.Component<Props, States> {
  private highlightGraphic: HighlightGraphic | undefined;
  private sketchSearch: SketchSearchViewModel;
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIndex: 0,
      isLoading: false,
      lstLayer: []
    };
    this.sketchSearch = new SketchSearchViewModel({ view: props.view });
  }

  render() {
    const {
      stepIndex
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root} tabIndex={stepIndex}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Thông tin tìm kiếm</StepLabel>
          </Step>
          <Step>
            <StepLabel>Kết quả tìm kiếm</StepLabel>
          </Step>
        </Stepper>
        {this.getStepContent()}
        <div className={classes.btnGroup}>
          <Button
            disabled={stepIndex === 0}
            onClick={this.handlePrevious.bind(this)}
            style={{ marginRight: 12 }}
            variant="text"
          >
            Quay lại
              </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={stepIndex === 1}
            onClick={this.onSubmitClick.bind(this)}
          >Tìm kiếm</Button>
          {/* <Toggle
                label="Hiển thị vị trí"
                alt="Nếu hiển thị sẽ làm chậm tốc độ tìm kiếm"
                /> */}
        </div>
      </div>
    );
  }

  private onChangeSelectedFeature(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
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
    if (this.highlightGraphic) {
      this.highlightGraphic.clear();
    }
    this.setState({
      stepIndex: 0
    });
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
  private getStepContent() {
    const { selectedLayer, stepIndex,
      error, isLoading, results, lstLayer } = this.state;
    const { classes } = this.props;

    if (stepIndex === 0) {
      return <div className={classes.statistic}>
        <div className="header">
          <FormControl fullWidth >
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
          <SketchSearch
            onDrawPolygonClick={this.sketchSearch.onDrawPolygonClick.bind(this.sketchSearch)}
            onDrawRectangleClick={this.sketchSearch.onDrawRectangleClick.bind(this.sketchSearch)}
            onDrawCircleWithCentroidClick={this.sketchSearch.onDrawCircleWithCentroidClick.bind(this.sketchSearch)}
            onDrawCircleClick={this.sketchSearch.onDrawCircleClick.bind(this.sketchSearch)}
            onDrawPolylineClick={this.sketchSearch.onDrawPolylineClick.bind(this.sketchSearch)}
            onClearClick={this.sketchSearch.onClearClick.bind(this.sketchSearch)}
          />
        </div>
        <div className="content">
          {this.renderForm()}
        </div>
      </div>;
    } else if (stepIndex === 1) {
      return <Paper className={classes.resultContainer}>
        {isLoading && <LinearProgress />}
        {error && <div className="error-message">{error}</div>}
        <div className={classes.title}>{selectedLayer ? selectedLayer.title : 'Không xác định'}</div>
        {results &&
          <div className={classes.resultContainerTable}>
            <div style={{ textAlign: 'right' }}>
              {/* <a href={} download={selectedLayer ? selectedLayer.title : 'clw'} >Tải xuống</a> */}
              <DownloadCSVComponent datas={results} title={selectedLayer ? selectedLayer.title : 'Kết quả tìm kiếm'} />
            </div>
            <ReactTable
              data={results}
              columns={this.renderComlumnTable()}
              defaultPageSize={10}
              className="-striped -highlight"
              getTrProps={(_: any, rowInfo?: RowInfo) => {
                return {
                  onClick: () => rowInfo && this.onRowClick(rowInfo)
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
            switch (field.type) {
              case 'string':
                where.push(`${field.name} like N'%${value}%'`);
                break;
              case 'date':
                const date = queryHelper.formatDate(new Date(value));
                where.push(`${field.name} = date'${date}'`);
                break;
              case 'small-integer':
              case 'integer':
              case 'single':
              case 'double':
              case 'long':
                where.push(`${field.name} = ${value}`);
                break;
              default:
                break;
            }
          }
        }

        let query = selectedLayer.createQuery();
        query.returnGeometry = true;
        query.outSpatialReference = view.spatialReference;
        query.outFields = ['*'];
        query.where = where.join(' AND ');
        if (this.sketchSearch && this.sketchSearch.graphicsSearch
          && this.sketchSearch.graphicsSearch.length > 0) {
          const union = geometryEngine.union(this.sketchSearch.graphicsSearch.toArray());
          if (union) { query.geometry = union; }
        }

        // truy vấn dữ liệu
        const results = await selectedLayer.queryFeatures(query);

        // nếu chưa hiển thị thì mở chế độ hiển thị
        if (!selectedLayer.visible) {
          selectedLayer.visible = true;
        }

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
export default withStyles(styles)(SearchComponent);