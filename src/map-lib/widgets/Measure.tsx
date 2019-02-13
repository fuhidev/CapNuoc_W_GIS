import * as React from 'react';
import MeasureAreaViewModel from './Measure/MeasureAreaViewModel';
import MeasureDistanceViewModel from './Measure/MeasureDistanceViewModel';

import { Paper, ListItem, List, ListItemText } from '@material-ui/core';
type Props = {
  view: __esri.MapView;
};

export enum MeasureMode {
  DISTANCE, AREA
}

type States = {
  mode: MeasureMode | null,
  visible: boolean,
  coords: {
    x: number, y: number
  }
};

export default class MeasureComponent extends React.Component<Props, States> {
  private measureArea: MeasureAreaViewModel;
  private measureDistance: MeasureDistanceViewModel;
  constructor(props: Props) {
    super(props);
    this.measureArea = new MeasureAreaViewModel({ view: props.view });
    this.measureDistance = new MeasureDistanceViewModel({ view: props.view });
    this.state = {
      mode: null, visible: false,
      coords: { x: 0, y: 0 }
    };
  }

  componentDidMount() {
    this.props.view.on('click', this.onViewRightClick.bind(this));
  }
  private onViewRightClick(e: __esri.MapViewClickEvent) {
    // 2 là nhán chuột phải
    if (e.button === 2) {
      e.stopPropagation();
      this.setState({ visible: true, coords: { x: e.x, y: e.y } });
    } else {
      this.setState({ visible: false });
    }
  }

  render() {
    const { visible, mode, coords } = this.state;
    return (
      <Paper
        style={{
          position: 'absolute', top: coords.y, left: coords.x,
          visibility: visible ? 'visible' : 'hidden'
        }}>
        <List>
          <ListItem button
            disabled={mode === MeasureMode.AREA}
            onClick={this.distance.bind(this)} >
            <ListItemText>{mode === MeasureMode.DISTANCE ? 'Hủy đo khoảng cách' : 'Đo khoảng cách'}</ListItemText>
          </ListItem>
          <ListItem
            button
            disabled={mode === MeasureMode.DISTANCE}
            onClick={this.area.bind(this)} >

            <ListItemText>{mode === MeasureMode.AREA ? 'Hủy đo diện tích' : 'Đo diện tích'}</ListItemText>
          </ListItem>
        </List>
      </Paper>
    );
  }

  shouldComponentUpdate(props: Props, states: States) {
    // nếu chế độ hiện tại là null và chế độ tiếp theo là Area thì kích hoạt đo diện tích
    if (this.state.mode === null
      && states.mode === MeasureMode.AREA) {
      this.measureArea.measure();
    }
    // nếu chế độ hiên tại là Area và chế độ tiếp theo là null thi tắt đo khoảng cách
    else if (this.state.mode === MeasureMode.AREA
      && states.mode === null) {
      this.measureArea.clearMeasure();
    }
    else if (this.state.mode === null
      && states.mode === MeasureMode.DISTANCE) {
      this.measureDistance.measure();
    }
    // nếu chế độ hiên tại là Area và chế độ tiếp theo là null thi tắt đo khoảng cách
    else if (this.state.mode === MeasureMode.DISTANCE
      && states.mode === null) {
      this.measureDistance.clearMeasure();
    }
    return true;
  }

  private distance() {
    this.setState({
      mode: this.state.mode === null ? MeasureMode.DISTANCE : null,
      visible: false
    });
  }

  private area() {
    this.setState({
      mode: this.state.mode === null ? MeasureMode.AREA : null,
      visible: false
    });
  }
}