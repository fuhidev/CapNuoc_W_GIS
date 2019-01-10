import * as React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

type Props = {
  onDrawPolygonClick: (e: any) => void,
  onDrawRectangleClick: (e: any) => void,
  onDrawCircleWithCentroidClick: (e: any) => void,
  onDrawCircleClick: (e: any) => void,
  onDrawPolylineClick: (e: any) => void,
  onClearClick: (e: any) => void,
};

type States = {

};
export default class SketchSearch extends React.Component<Props, States>{
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Tooltip title="Theo dạng vùng">
          <IconButton
            onClick={this.props.onDrawPolygonClick.bind(this)}
          >
            <i className="esri-icon-polygon"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Theo hình chữ nhật">
          <IconButton
            onClick={this.props.onDrawRectangleClick.bind(this)}
          >
            <i className="esri-icon-sketch-rectangle"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Theo dạng hình tròn nhập bán kính">
          <IconButton
            onClick={this.props.onDrawCircleWithCentroidClick.bind(this)}
          >
            <i className="esri-icon-radio-checked"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Theo dạng hình tròn">
          <IconButton
            onClick={this.props.onDrawCircleClick.bind(this)}
          >
            <i className="esri-icon-radio-unchecked"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Theo dạng đường">
          <IconButton
            onClick={this.props.onDrawPolylineClick.bind(this)}
          >
            <i className="esri-icon-polyline"></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton
            onClick={this.props.onClearClick.bind(this)}
          >
            <i className="esri-icon-trash"></i>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}


