import * as React from 'react';
import { withStyles, createStyles, WithStyles, List, ListItem, Avatar, ListItemText, Tooltip } from '@material-ui/core';
import { Model, TrangThai } from '../../../../services/map/SuCo/model';
import { AllModelReducer } from '../../../../reducers';
import { connect } from 'react-redux';
import * as moment from 'moment/moment';
const styles = createStyles({
  root: {

  },
  item: {
    cursor: 'pointer'
  }
});

type StateToProps = {
  datas: Model[],
  view?: __esri.MapView | __esri.SceneView,
  layer?: __esri.FeatureLayer // layer sự cố
};

type Props = {

}
  & StateToProps
  & WithStyles<typeof styles>;

class ListComponent extends React.Component<Props, {}>{
  render() {
    const { classes, datas } = this.props;
    return <div className={classes.root}>
      <List>
        {
          datas.map((m, index) =>
            <Tooltip
              key={(m.IDSuCo || '') + index}
              title={m.IDSuCo || ''}
              className={classes.item}
              onClick={() => this.onClick(m)}
            >
              <ListItem>
                <Avatar src={this.getSrcAvatar(m.TrangThai || 0)}>
                </Avatar>
                <ListItemText
                  primary={`${m.TGPhanAnh ? moment(new Date(m.TGPhanAnh)).fromNow() : '...'}`}
                  secondary={m.DiaChi}
                />
              </ListItem>
            </Tooltip>
          )
        }
      </List>
    </div>;
  }

  private async onClick(model: Model) {
    const { OBJECTID } = model;
    const { view, layer } = this.props;
    if (view && layer) {
      const results = await layer.queryFeatures({
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

  private getSrcAvatar(trangThai: number): string {
    const baseUrl = `/images/map/suco/`;
    return baseUrl + `${trangThai}.png`;
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  datas: state.mapSuCo.items.filter(f => f.TrangThai === TrangThai.MoiTiepNhan),
  view: state.map.view,
  layer: state.mapSuCo.layer
});

export default connect(mapStateToProps, null)(withStyles(styles)(ListComponent));