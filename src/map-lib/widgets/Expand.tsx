import * as React from 'react';

import Expand = require('esri/widgets/Expand');

type Props = {
  view: __esri.MapView | __esri.SceneView,
  expand: {
    content: React.ReactNode
  } & __esri.ExpandProperties,
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
};

class ExpandWidget extends React.Component<Props, {}> {
  private divElement: HTMLDivElement;
  private expand: Expand;
  componentDidMount() {
    this.expand = new Expand({
      ...this.props.expand,
      container: this.divElement,
      // content:
    });

    if (this.props.position) {
      this.props.view.when(() => {
        this.props.view.ui.add(this.props.position);
      });
    }
  }
  render() {
    return <div ref={(element) => this.divElement = element}>
    </div>
  }
}