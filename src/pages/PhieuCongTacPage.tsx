import * as React from 'react';
import * as qs from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';

type States = {
  id: string,
  hoVaTen: string,
  soDienThoai: string,
  diaChi: string,
  thongTinPhanAnh: number,
  thoiGian: string,
  phuong: string,
  quan: string,
  dma: string,
  doiQuanLy: string
};

class PhieuCongTacPage extends React.Component<RouteComponentProps<{}, {}>, States> {
  componentWillMount() {
    const parsed = qs.parse(this.props.location.search);
    this.setState({ ...parsed });
  }

  componentDidMount() {
    window.print();
  }
  render() {
    const {
      id,
      hoVaTen,
      soDienThoai,
      diaChi,
      thoiGian,
      thongTinPhanAnh,
      phuong,
      dma,
      quan, doiQuanLy
    } = this.state;
    const date = new Date();
    return (
      <div className="pct">
        <div className="main">
          <div className="div1">
            <div>TỔNG CÔNG TY CẤP NƯỚC SÀI GÒN</div>
            <div>TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN</div>
            <div>CÔNG TY CỔ PHẦN CẤP NƯỚC VĨNH LONG</div>
            <div><strong>PHÒNG QUẢN LÝ CẤP NƯỚC 1</strong></div>
            <div>---&#8619;&#x2605;&#8620;---</div>
            <div style={{ marginLeft: -50 }}>Số: <strong>{id}</strong></div>
          </div>
          <div className="div2">
            <div className="chxh">CÔNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div className="dltd">Độc lập – Tự do – Hạnh phúc</div>
            <div>Quận 5. Ngày {date.getDate()} tháng {date.getMonth() + 1} năm {date.getFullYear()}</div>
          </div>
          <div className="content">
            <div className="title">
              <p>PHIẾU CÔNG TÁC</p>
              <p>(SỬA BỂ, TU BỔ VÀ GIẢI QUYẾT PHẢN ÁNH CỦA KHÁCH HÀNG)</p>
            </div>
            <table className="info border">
              <tbody>
                <tr>
                  <td className="left">
                    <strong>I. Thông tin công tác</strong>
                    <div>
                      <ul>
                        <li>Thông tin phát hiện rò rỉ:  □ Bể nổi □ Bể ngầm</li>
                        <li>Phát hiện bởi: {hoVaTen}</li>
                        <li>Thông tin phản ánh của khách hàng: {thongTinPhanAnh}</li>
                      </ul>
                    </div>
                  </td>
                  <td className="right">
                    <div className="text">Ngày giờ nhận thông tin: {thoiGian}</div>
                    <div className="text">Địa chỉ: {diaChi}</div>
                    <div className="text">
                      <div style={{ float: 'left', width: '50%' }}>Phường: {phuong}</div>
                      <div style={{ float: 'left', width: '50%' }}>Quận: {quan}</div>
                    </div>
                    <div className="text">Điện thoại: {soDienThoai}</div>
                    <div className="text">Ngày giờ nhận công tác:
                     ..........................................................</div>
                    <div className="text">Nhóm thực hiện:
                     ......................................................................</div>
                    <div className="sign">
                      TL: GIÁM ĐỐC
                      <br />
                      TRƯỞNG PHÒNG
                      <br />
                      <br />
                      <br />
                      <p className="name">
                        {doiQuanLy ? doiQuanLy === 'QLCN1' ? 'Trần Hữu Tế Nhị' : 'Nguyễn Ngọc Thanh' : ''}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="ii border">
              <tbody>
                <tr>
                  <th colSpan={2} style={{ paddingLeft: 20 }}>
                    <strong>II. BÁO CÁO HOÀN CÔNG     DMA:{dma}</strong>
                    <div style={{ fontWeight: 'normal', paddingLeft: 20 }}>
                      <div>Ngày giờ tiếp cận:………………………………………………………………………………………….............. </div>
                      <div>Địa chỉ (theo thực tế)……………………………………………………………………………………………….</div>
                      <div>Khách hàng: ……………………………………..Danh bộ:…………………..Hợp đồng:………………............. </div>
                      <div>Hiệu:……………Cỡ:……… Chỉ số:………..□ Đứt chì mặt số…. □ Đứt chìa khóa gốc… □ Bình thường</div>
                      <div>Cỡ ống:…………………….Vật liệu:…………….…….Áp lực:……………………….Độ sâu:…………………</div>
                      <div>Đặc điểm bể: □Tét □Gãy □Xì mối nối □ Mục bù lon □ Lủng
                        □ Xì van cóc □ Xì van góc □ Hư đai</div>
                      <div>Nguyên nhân bể:……………………………………………………………………………………………………</div>
                      <div>Áp lực sau khi sửa bể:……………………………………………………………………………………………… </div>
                      <div>Ngày, giờ hoàn tất:………………………………………………………………………………………………….</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td style={{ padding: '0 20px 20px 20px' }}>
                    <strong>Vật tư sử dụng:</strong>
                    <table className="border">
                      <thead>
                        <tr>
                          <th>Loại vật tư</th>
                          <th style={{ width: 65 }}>Số lượng</th>
                          <th style={{ width: 65 }}>Đơn vị</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td style={{ padding: '0 20px 20px 20px' }}>
                    <div>
                      <div className="heading">
                        Đào đường:
              </div>
                      <div style={{ marginLeft: 15, fontSize: 18 }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>□ BTXM5</td>
                              <td>□ BTXM10</td>
                              <td>□ BTXM15</td>
                            </tr>
                            <tr>
                              <td>□ Nhựa</td>
                              <td>□ Lề gạch</td>
                              <td>□ Đất</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="heading">
                        Kích thước phui đào:
              </div>
                      <div style={{ marginLeft: 20 }}>
                        <table className="border" style={{ fontSize: 18 }}>
                          <tbody>
                            <tr>
                              <td>Dài</td>
                              <td>Rộng</td>
                              <td>Sâu</td>
                            </tr>
                            <tr>
                              <td>Dài</td>
                              <td>Rộng</td>
                              <td>Sâu</td>
                            </tr>
                            <tr>
                              <td>Dài</td>
                              <td>Rộng</td>
                              <td>Sâu</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <div className="heading">
                        Vật liệu tái lập
              </div>
                      <div style={{ marginLeft: 15, fontSize: 18 }}>
                        <table>
                          <tbody>
                            <tr>
                              <td>□ Cát vàng</td>
                              <td>□ Cát san lấp</td>
                            </tr>
                            <tr>
                              <td>□ Đá 04</td>
                              <td>□ Đá 1-2</td>
                            </tr>
                            <tr>
                              <td>□ Cát, đá hiện hữu</td>
                              <td>□ Vật liệu khác</td>
                            </tr>
                            <tr>
                              <td>□ Khách hàng tự tái lập</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr>
                  <td><div className="sign">
                    KT: GIÁM ĐỐC
                      <br />
                    PHÓ GIÁM ĐỐC
                      <br />
                    <br />
                    <br />
                    <p className="name">Trần Hữu Hiệp</p>
                  </div></td>
                  <td><div className="sign">
                    P. QUẢN LÝ CẤP NƯỚC 1
                      <br />
                    PHÓ PHÒNG
                      <br />
                    <br />
                    <br />
                    <p className="name">Nguyễn Văn Hùng</p>
                  </div></td>
                  <td><div className="sign">ĐD.PHÒNG KỸ THUẬT<br /><br /><br /><br />
                    <p className="name">Nguyễn Văn Hùng</p></div></td>
                  <td><div className="sign">GIÁM SÁT HIỆN TRƯỜNG<br /><br /><br /><br />
                    <p className="name">&nbsp;</p></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PhieuCongTacPage);