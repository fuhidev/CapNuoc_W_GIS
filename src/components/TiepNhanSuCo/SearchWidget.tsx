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
  view?: __esri.MapView,
  searchRef?: (e: __esri.widgetsSearch) => void
  selectResult?: (e: SelectResult) => void
};

class SearchWidget extends React.Component<Props, States> {
  private search: Search;
  private div: HTMLDivElement;
  constructor(params: any) {
    super(params);

    this.state = {

    };
  }
  render() {
    return <div style={{width:'100%'}} ref={(e: HTMLDivElement) =>
      this.div = e
    }> </div >;
  }
  componentDidMount() {
    var search = new Search({
      view: this.props.view,
      container: this.div,
      popupEnabled:false,
      resultGraphicEnabled: false,
      allPlaceholder: 'Nhập vị trí hoặc địa điểm',
      autoSelect:true
    });

    if (this.props.selectResult) {
      search.on('select-result', this.props.selectResult);
    }

    this.search = search;
    if (this.props.searchRef) {
      this.props.searchRef(this.search);
    }
  }
}

export default SearchWidget;