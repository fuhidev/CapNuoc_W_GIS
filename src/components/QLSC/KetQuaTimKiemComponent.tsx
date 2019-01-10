import * as React from 'react';
import {
  Paper, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton, FontIcon, TextField, LinearProgress, AutoComplete
} from 'material-ui';
import { KetQuaTruyVan } from '../../models/SuCo';

type States = {
  loading: {
    updatingNhomKhacPhuc: boolean
  },
  datas: KetQuaTruyVan[]
};

type Props = {
  datas: KetQuaTruyVan[],
  isOpen: boolean,
  nhomKhacPhucDatas: string[],
  onFocusGraphic: (idSuCo: string) => Promise<boolean>;
  onClose: () => void;
  onChangeNhomKhacPhuc: (idSuCo: string, nhomThucHien: string) => void;
  updateNhomKhacPhuc: (objectId: number, nhomThucHien: string) => Promise<boolean>;
};

class KetQuaTimKiemComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: { updatingNhomKhacPhuc: false }, datas: []
    };
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ datas: props.datas });
  }

  render() {
    // nếu không cho mở thì ẩn
    if (!this.props.isOpen) {
      return null;
    }

    const { datas, nhomKhacPhucDatas } = this.props;
    const { loading } = this.state;

    return (
      <Paper style={{
        position: 'relative',
        //  bottom: -0, left: 10, 
        height: 320,
        // maxWidth: 1024,
        // width: 'calc(100% - 400px)'
        width: '100%'
      }}>
        <h1 style={{ width: '100%', fontSize: 24, textAlign: 'center' }}>Dữ liệu sự cố</h1>
        <IconButton tooltip="Đóng" style={{ position: 'absolute', right: 0, top: 0 }}
          onClick={this.onClose.bind(this)} >
          <FontIcon className="far fa-times-circle" />
        </IconButton>
        <Table height="200px"
          onRowSelection={this.onRowClick.bind(this)}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: 20 }}>STT</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 70 }}>ID</TableHeaderColumn>
              <TableHeaderColumn >Vị trí</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 120 }}>Số điện thoại</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 120 }}>Người thông báo</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 120 }}>Ngày thông báo</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 300 }}>
                <div>
                  <p>Nhóm thực hiện</p>
                  {loading.updatingNhomKhacPhuc && <LinearProgress />}
                </div>

              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={{ width: '100%' }}>
            {
              datas.map(
                (m, index: number) =>
                  <TableRow key={'row' + m.OBJECTID}>
                    <TableRowColumn key={'row_1_' + index + '_' + m.OBJECTID} style={{ width: 20 }} >
                      {index + 1}</TableRowColumn>
                    <TableRowColumn key={'row_2_' + index + '_' + m.OBJECTID} style={{ width: 70 }}>
                      <span title={m.IDSuCo || 'KXĐ'}>{m.IDSuCo || 'KXĐ'}</span>
                    </TableRowColumn>
                    <TableRowColumn key={'row_3_' + index + '_' + m.OBJECTID}>
                      <span title={m.DiaChi || 'KXĐ'}>{m.DiaChi || 'KXĐ'}</span>
                    </TableRowColumn>
                    <TableRowColumn key={'row_4_' + index + '_' + m.OBJECTID} style={{ width: 120 }} >
                      <span title={m.SDTPhanAnh || 'KXĐ'}>{m.SDTPhanAnh || 'KXĐ'}</span>
                    </TableRowColumn>
                    <TableRowColumn key={'row_5_' + index + '_' + m.OBJECTID} style={{ width: 120 }} >
                      {m.NguoiPhanAnh || 'KXĐ'}</TableRowColumn>
                    <TableRowColumn key={'row_6_' + index + '_' + m.OBJECTID} style={{ width: 120 }} >
                      {m.TGPhanAnh ? new Date(m.TGPhanAnh).toLocaleString() : 'KXĐ'}
                    </TableRowColumn>
                    <TableRowColumn key={'row_7_' + index + '_' + m.OBJECTID} style={{ width: 300 }} >
                      <AutoComplete
                        name="nhomkhacphuc"
                        searchText={m.NhomKhacPhuc}
                        onUpdateInput={(value: string) => {
                          this.props.onChangeNhomKhacPhuc(m.IDSuCo, value)
                        }}
                        onBlur={() => {
                          this.setState({ loading: { ...this.state.loading, updatingNhomKhacPhuc: true } });
                          this.props.updateNhomKhacPhuc(m.OBJECTID, m.NhomKhacPhuc)
                            .then(isSuccess => this.setState({ loading: { ...this.state.loading, updatingNhomKhacPhuc: false } }))
                        }}
                        filter={AutoComplete.fuzzyFilter}
                        openOnFocus={true}
                        dataSource={nhomKhacPhucDatas}
                      />
                    </TableRowColumn>
                  </TableRow>
              )
            }

          </TableBody>
        </Table>
      </Paper>
    );
  }

  private async onRowClick(selectedRows: number[] | 'all') {
    const result = this.props.datas;

    const selectIndex = selectedRows[0];

    // kiểm tra
    if (selectIndex !== undefined && result && result[selectIndex]) {
      // lấy mã danh bộ
      const IDSuCo = result[selectIndex].IDSuCo;
      this.props.onFocusGraphic(IDSuCo);

      // goTo graphic
    }
  }

  private onClose() {
    this.props.onClose();
  }


  // private inPhieuCongTac(idSuCo: string) {
  //   var a = document.createElement('a');
  //   a.rel = 'noopener noreferrer';
  //   a.target = '_blank';
  //   a.href = api.inPhieuCongTac(idSuCo);
  //   a.click();
  // }
}
export default KetQuaTimKiemComponent;