import SuCoThongTin from '../../../models/SuCoThongTin';

export interface ThongKe {
  code: number | string;
  name: string;
  value: number;
}

export enum TinhTrang {
  MoiTiepNhan = 'MTN', DangXuLy = 'DXL', HoanThanh = 'HTH'
}

export enum LinhVuc {
  GiaoThong,
  CapNuoc,
  ThoatNuoc,
  VienThong,
  CayXanh,
  ChieuSang,
  DienLuc,
}

export interface KetQuaTruyVan {
  OBJECTID: number;
  IDSuCo: string;
  ViTri: string;
  SODIENTHOAI: string;
  NguoiCapNhat: string;
  NgayXayRa: number;
}

export interface VatTuSuCo {
  MaVatTu: string;
  TenVatTu: string;
  SoLuong: number;
  DonViTinh: string;
}

export enum ModelConstant {
  OBJECTID='OBJECTID',
  MaSuCo='MaSuCo',
  TinhTrang='TinhTrang',
  NguoiPhanAnh='NguoiPhanAnh',
  SDTNguoiPhanAnh='SDTNguoiPhanAnh',
  TGPhanAnh='TGPhanAnh',
  DiaChi='DiaChi',
  LinhVuc='LinhVuc',
  NguyenNhan='NguyenNhan',
  NoiDungPhanAnh='NoiDungPhanAnh',
  YKienChiDao='YKienChiDao',
  MaHuyenTP='MaHuyenTP',
  MaPhuongXa='MaPhuongXa',
  MaSuCoTrung='MaSuCoTrung',
  NVTiepNhan='NVTiepNhan'
}

export interface Model {
  OBJECTID: number;
  MaSuCo: string;
  TinhTrang: string;
  NguoiPhanAnh?: string;
  SDTNguoiPhanAnh?: string;
  TGPhanAnh: Date;
  DiaChi: string,
  NoiDungPhanAnh?: string;
  LinhVuc?: number;
  NguyenNhan?: string;
  YKienChiDao?: string;
  MaHuyenTP: string;
  MaPhuongXa: string;
  NVTiepNhan?:string;
  MaSuCoTrung?: string;
  SuCoThongTins?:SuCoThongTin[]
}


export const COLORS = ['#e10808', '#009c10', '#f0e91d'];

export const SEARCH_OUTFIELDS = ['OBJECTID', 'TinhTrang','NoiDungPhanAnh','LinhVuc', 'MaSuCo', 'DiaChi', 'TGPhanAnh'];