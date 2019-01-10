import * as React from 'react';
import Search = require('esri/widgets/Search');

export interface SelectResult {
  result: {
    feature: __esri.Graphic,
    name: string
  };
}
type States = {

};

type Props = {
  view?: __esri.MapView | __esri.SceneView,
  searchRef?: (e: __esri.widgetsSearch) => void
  selectResult?: (e: SelectResult) => void
};

class SearchWidget extends React.Component<Props, States> {
  private div: HTMLDivElement | undefined;
  constructor(params: any) {
    super(params);

    this.state = {

    };
  }
  render() {
    return <div ref={(e: HTMLDivElement) =>
      this.div = e
    }> </div >;
  }
  componentDidMount() {
    var search = new Search({
      view: this.props.view,
      container: this.div,
      popupEnabled: false,
      resultGraphicEnabled: false,
      allPlaceholder: 'Nhập vị trí hoặc địa điểm'
    });

    if (this.props.selectResult) {
      search.on('select-result', this.props.selectResult);
    }

    if (this.props.searchRef) {
      this.props.searchRef(search);
    }
  }
}

export default SearchWidget;