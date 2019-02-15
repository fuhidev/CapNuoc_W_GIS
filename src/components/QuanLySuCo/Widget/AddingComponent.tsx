import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Auth from '../../../modules/Auth';
import { ModelConstant } from '../../../services/map/SuCo/model';

// Esri
import Graphic = require('esri/Graphic');
const styles = createStyles({
  root: {}
});

type Props = {
  view: __esri.MapView | __esri.SceneView,
  layer: __esri.FeatureLayer,
  position?: string
}
  & WithStyles<typeof styles>;

type States = {

};

class AddingComponent extends React.Component<Props, States>{
  private btn: HTMLButtonElement | null = null;
  private handleViewClick: IHandle | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (this.btn)
      this.props.view.ui.add(this.btn, this.props.position);
  }

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
      <div
        className="esri-widget--button esri-icon-plus-circled"
        onClick={this.onClick.bind(this)}
        ref={(element: any) => this.btn = element}></div>
    </div>;
  }

  private onClick() {
    const view = this.props.view;
    let message = 'Không nhận được view';
    if (view && this.btn) {
      if (this.handleViewClick) {
        this.handleViewClick.remove();
        delete this.handleViewClick;
        message = 'Hủy chức năng thêm điểm sự cố';
        view.container.style.cursor = 'default';
        this.btn.classList.remove('esri-widget--button--active');
      } else {
        this.handleViewClick = view.on('click', this.onViewClick.bind(this));
        message = 'Chọn vị trí trên bản đồ để thêm điểm sự cố';
        view.container.style.cursor = 'crosshair';
        this.btn.classList.add('esri-widget--button--active');
      }
    }
    this.setState({
      snackbar: message
    });
  }

  private async onViewClick(e: __esri.MapViewClickEvent) {
    e.stopPropagation();
    const { view, layer } = this.props;
    let message = '';
    try {
      if (view) {
        if (layer) {
          const viTri = e.mapPoint;
          // lấy layer điểm sự cố
          if (!viTri) { throw 'Không xác định vị trí'; }

          // const hanhChinh = await HanhChinhUtils.getHanhChinhByGeometry(view, viTri);
          // if (!hanhChinh) {
          //   throw 'Sự cố không thuộc địa bàn quản lý';
          // }

          const geometry = viTri;
          const user = Auth.getUser();
          const attributes = {
            NguoiPhanAnh: user && user.username
          };

          const featureAdd = new Graphic({
            attributes, geometry
          });

          const result = await layer.applyEdits({
            addFeatures: [featureAdd]
          });
          const addFeatureResult = result.addFeatureResults[0] as __esri.FeatureEditResult;
          if (addFeatureResult.error) {
            throw addFeatureResult.error;
          } else {
            if (addFeatureResult.objectId) {
              const results = await layer.queryFeatures({
                returnGeometry: true, outSpatialReference: view.spatialReference,
                where: `OBJECTID = ${addFeatureResult.objectId}`, outFields: ['*']
              });

              view.popup.open({ features: results.features, updateLocationEnabled: true });

              message = 'Thêm thành công có mã ' + results.features[0].attributes[ModelConstant.IDSuCo];
            }
          }
        } else {
          throw 'Không có quyền truy cập lớp dữ liệu sự cố';
        }
      } else {
        throw 'Không tìm thấy MapView';
      }
    } catch (error) {
      message = typeof (error) === 'string' ? error : 'Có lỗi xảy ra!';
    }
    finally {
      this.setState({
        snackbar: message
      });
    }

  }
}

export default withStyles(styles)(AddingComponent);