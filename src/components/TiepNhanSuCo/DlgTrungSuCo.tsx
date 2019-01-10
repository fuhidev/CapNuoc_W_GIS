import * as React from 'react';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';

type States = {
};

type Props = {
  open: boolean,
  ids: string[],
  onSubmit: () => void,
  onClose: () => void
}

export default class DlgTrungSuCo extends React.Component<Props, States>{

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { ids, onClose, onSubmit } = this.props;

    const isOpen = ids.length > 0;
    const content = `Hệ thống phát hiện ở khu vực này đã tiếp nhận <strong>${ids.length}</strong> sự cố với ID lần lượt: <strong>${ids.toString()}</strong> trong ngày hôm nay (${new Date().toLocaleDateString()})`

    const actions = [
      <FlatButton
        label="Hủy"
        primary={true}
        onClick={onClose}
      />,
      <FlatButton
        label="Tiếp tục"
        primary={true}
        keyboardFocused={true}
        onClick={onSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Trùng sự cố"
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={onClose}
        >
          {content || ''}
        </Dialog>
      </div>
    );
  }
}