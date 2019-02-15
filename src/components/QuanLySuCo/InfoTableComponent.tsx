// React
import * as React from 'react';
import {
  Paper, IconButton, Tooltip, Table, TableHead, TableRow, TableCell, TableBody,
  WithStyles, withStyles, createStyles, Theme
} from '@material-ui/core';
// Redux
import { connect } from 'react-redux';
import { AllModelReducer } from '../../reducers';
import { emptyInfos } from '../../services/map/SuCo/action';

import { Model, ModelConstant } from '../../services/map/SuCo/model';
import FeatureLayer from '../../map-lib/layers/FeatureLayer';

import * as moment from 'moment/moment';

const DISPLAY_FIELDS = ['IDSuCo', 'DiaChi', 'TGPhanAnh'];

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    height: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    width: '100%',
    overflow: 'auto'
  },
  tableRow: {
    cursor: 'pointer',
  }
});
type StateToProps = {
  datas: Model[],
  layerSuCo?: FeatureLayer,
  view?: __esri.MapView | __esri.SceneView
};
type DispatchToProps = {
  closeContainer: () => void
};

type Props = {
} & StateToProps & DispatchToProps & WithStyles<typeof styles>;

type State = {
};

class InfoTableComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { columns: [] };
  }
  private onClose() {
    this.props.closeContainer();
  }

  private async onRowClick(rowInfo: Model) {
    const { OBJECTID } = rowInfo;
    const { view, layerSuCo } = this.props;
    if (view && layerSuCo) {
      const results = await layerSuCo.queryFeatures({
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

  private renderComlumnTable() {
    const { layerSuCo } = this.props;
    if (layerSuCo) {
      return layerSuCo.fields
        .filter(f => DISPLAY_FIELDS.indexOf(f.name) !== -1 && f.type !== 'oid')
        .map(m => ({ Alias: m.alias, Name: m.name }));
    }
    return [];
  }

  render() {
    const { datas, classes } = this.props;

    const columns = this.renderComlumnTable();

    return <div className={classes.root}>
      <Paper style={{
        position: 'relative',
        //  bottom: -0, left: 10, 
        height: '100%',
        // maxWidth: 1024,
        // width: 'calc(100% - 400px)'
        width: '100%'
      }}>
        <h1 style={{ width: '100%', fontSize: 24, textAlign: 'center' }}>Dữ liệu sự cố</h1>
        <Tooltip title="Đóng">
          <IconButton style={{ position: 'absolute', right: 0, top: 0 }}
            onClick={this.onClose.bind(this)} >
            <i className="far fa-times-circle" />
          </IconButton>
        </Tooltip>
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
              {columns.map(m =>
                <TableCell key={m.Name}>{m.Alias}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.convertDatas(datas).map(row => {
              return (
                <TableRow key={row.IDSuCo} className={classes.tableRow} onClick={() => this.onRowClick(row)}>
                  {
                    columns.map((m, index) => {
                      if (index === 0) {
                        return <TableCell key={row.IDSuCo + '_' + m.Name} component="th" scope="row">
                          {row[m.Name]}
                        </TableCell>;
                      }
                      return <TableCell key={row.IDSuCo + '_' + m.Name} >
                        {/* <Tooltip title={row[m.Name] || 'Không có giá trị'}> */}
                        {/* {m.Name === ModelConstant.NhomKhacPhuc
                          &&
                          <div>
                            <AutoComplete
                              name="nhomkhacphuc"
                              searchText={m.NhomKhacPhuc}
                              onUpdateInput={(value: string) => {
                                this.props.onChangeNhomKhacPhuc(m.IDSuCo, value)
                              }}
                              onBlur={() => {
                                this.setState({ loading: { ...this.state.loading, updatingNhomKhacPhuc: true } });
                                this.props.updateNhomKhacPhuc(m.OBJECTID, m.NhomKhacPhuc)
                                  .then(isSuccess => 
                                    this.setState({ loading: { ...this.state.loading, updatingNhomKhacPhuc: false } }))
                              }}
                              filter={AutoComplete.fuzzyFilter}
                              openOnFocus={true}
                              dataSource={nhomKhacPhucDatas}
                            />
                          </div>
                        } */}
                        {row[m.Name]}
                        {/* </Tooltip> */}
                      </TableCell>;
                    })
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <ReactTable
          data={datas}
          columns={this.renderComlumnTable()}
          defaultPageSize={10}
          className="-striped -highlight"

          getTrProps={(state: any, rowInfo?: RowInfo) => {
            if (rowInfo)
              return {
                onClick: () => this.onRowClick(rowInfo)
              };
          }}
        /> */}
      </Paper>
    </div>;
  }

  private convertDatas(datas: Model[]): Model[] {
    const { view, layerSuCo } = this.props;
    if (view && layerSuCo) {
      const timeFields = layerSuCo.fields.filter(m => m.type === 'date'); // lấy những fields có giá tị là thời gian
      let dataReturn = datas.slice(); // copy
      dataReturn.forEach(f => {
        timeFields.forEach(field => {
          // nếu có giá trị
          const baseValue = f[field.name];
          if (baseValue && Number.isInteger(baseValue)) {
            f[field.name] = moment(new Date(baseValue)).fromNow();
          }
        });
      });
      return dataReturn;
    }
    return [];
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  datas: state.mapSuCo.infoDatas || [],
  layerSuCo: state.mapSuCo.layer,
  view: state.map.view
});

const mapDispatchToProps = (dispatch: Function): DispatchToProps => ({
  closeContainer: () => dispatch(emptyInfos())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InfoTableComponent));