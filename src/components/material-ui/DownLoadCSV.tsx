import * as React from 'react';
import * as json2csv from 'json2csv';

type States = {

};
type Props = {
  datas: any[],
  title?: string,
  label?: string
};

export default class Download extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { datas, title, label } = this.props;
    if (datas.length > 0) {
      const csvFile = json2csv.parse(datas);
      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, title || 'Không có tiêu đề');
      } else {
        var url = URL.createObjectURL(blob);
        return <a href={url} download={(title || 'Không có tiêu đề') + '.csv'
        }> {label || 'Tải xuống'}</a >;
      }
    } else {
      return null;
    }
  }
}