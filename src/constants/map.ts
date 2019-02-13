export const BASEMAP = {
  INDEX_HANH_CHINH: 5
};

export const SERVICE_PRINT =
  'https://ditagis.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';

export const LAYER = {
  BASE_MAP: 'basemap',
  BE_CHUA: 'bechuaLYR',
  BE_VIEN_THONG: 'bevienthongLYR',
  BIEN_BAO: 'bienbaoLYR',
  BTS: 'btsLYR',
  CAP_VIEN_THONG: 'capvienthongLYR',
  CAU_DUONG_BO: 'cauduongboLYR',
  CAY_XANH: 'cayxanhLYR',
  CONG_SO: 'congsoLYR',
  DEN_CHIEU_SANG: 'denchieusangLYR',
  DEN_TIN_HIEU: 'dentinhieuLYR',
  DIEM_DAU_NOI: 'diemdaunoiLYR',
  DONG_HO_TONG: 'donghotongLYR',
  GIAI_PHAN_CACH: 'giaiphancachLYR',
  GIAO_LO: 'giaoloLYR',
  HO_GA: 'hogaLYR',
  MAT_SONG: 'matsongLYR',
  NHA_MAY_NUOC: 'nhamaynuocLYR',
  ONG_PHAN_PHOI: 'ongphanphoiLYR',
  ONG_TRUYEN_DAN: 'ongtruyendanLYR',
  TD_CHIEUSANG: 'tdchieusangLYR',
  TIEU_DAO: 'tieudaoLYR',
  TIM_SONG: 'timsongLYR',
  TRAM_BOM: 'trambomLYR',
  TUYEN_DAY_DIEN_NGAM: 'tuyendaydienngamLYR',
  TUYEN_DAY_DIEN_NGAM_NOI: 'tuyendaydienngamnoiLYR',
  TUYEN_DAY_DIEN_NOI: 'tuyendaydiennoiLYR',
  TUYEN_ONG_THOAT_NUOC: 'tuyenongthoatnuocLYR',
  VAN: 'vanLYR',
  DIEM_SU_CO: 'diemsucoLYR'
};
export const MAP = {
  CENTER: [105.940810, 10.251717],
  ZOOM: 14
};

export const APP_LAYER = {
  qlml: ['*'],
  qlsc: ['*'],
  tnsc: [LAYER.DIEM_SU_CO, LAYER.BASE_MAP]
};

export const FIELDS_NO_EDIT = [
  'MaQuan',
  'MaPhuong',
  'OBJECTID',
  'IDSuCo',
  'MaDMA',
  'GlobalID',
  'DoiQuanLy',
  'TGPhanAnh',
  'created_user',
  'created_date',
  'last_edited_user',
  'last_edited_date'
];