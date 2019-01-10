export interface Model {
  tenDMA: string;
  tuyenDuong: string;
  phuong: string;
  quan: string;
  ngayKhaoSat: string;
  ngayBaoCao: string;
  tongSoDauNoiDichVu: number;
  khachHang: {
    dotDocSo: number;
    sinhHoat: number;
    thuongMai: number;
    hanhChinhSuNghiep: number;
    khac: number;
  };
  tinhTrangSuDung: {
    binhThuong: number;
    dongCuaKhongO: number;
    catHuyTam: number;
    thay: number;
    khac: number;
  };
  soKhachHangVoi: {
    mucTieuThuDuoi4: number;
    mucTieuThuTren4: number;
  };
  tuoiThoDHN: {
    duoi5Nam: number;
    tren5Nam: number;
  };
  apLucKhuVuc: {
    manh: number;
    yeu: number;
    trungbinh: number;
  };
  chatLuongNuoc: {
    tot: number;
    xau: number;
    trungbinh: number;
  };
  duongKinhVatLieuOng: {
    '50mm': { gang: number; upvc: number; hdpe: number };
    '100mm': { gang: number; upvc: number; hdpe: number };
    '150mm': { gang: number; upvc: number; hdpe: number };
    '200mm': { gang: number; upvc: number; hdpe: number };
    '250mm': { gang: number; upvc: number; hdpe: number };
  };
  van: {
    bien: number; trong: number
  };
  truCuuHoa: {
    tot: number;
    khongTot: number;
  };
  viTriDongHoTong: {
    VT1: string; VT2: string;
  };
}
export function renderContent(model: Model) {
  const content = `<?xml version="1.0"?>
  <?mso-application progid="Excel.Sheet"?>
  <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
   xmlns:o="urn:schemas-microsoft-com:office:office"
   xmlns:x="urn:schemas-microsoft-com:office:excel"
   xmlns:dt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"
   xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
   xmlns:html="http://www.w3.org/TR/REC-html40">
   <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <Author>Hờ Phờ Hờ</Author>
    <LastAuthor>Hờ Phờ Hờ</LastAuthor>
    <Created>2018-07-02T05:21:28Z</Created>
    <LastSaved>2018-07-02T05:29:14Z</LastSaved>
    <Version>15.00</Version>
   </DocumentProperties>
   <CustomDocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <ESRI_WORKBOOK_ID dt:dt="string">1810edb4e7534613abbafdc9fd65cd51</ESRI_WORKBOOK_ID>
   </CustomDocumentProperties>
   <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
    <AllowPNG/>
   </OfficeDocumentSettings>
   <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
    <WindowHeight>4755</WindowHeight>
    <WindowWidth>7545</WindowWidth>
    <WindowTopX>975</WindowTopX>
    <WindowTopY>0</WindowTopY>
    <ProtectStructure>False</ProtectStructure>
    <ProtectWindows>False</ProtectWindows>
   </ExcelWorkbook>
   <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
     <Alignment ss:Vertical="Bottom"/>
     <Borders/>
     <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#000000"/>
     <Interior/>
     <NumberFormat/>
     <Protection/>
    </Style>
    <Style ss:ID="m2248954958256">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954958276">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954958296">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954958336">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="VNI-Commerce" ss:Size="14" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954958356">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="VNI-Commerce" ss:Size="14" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954966804">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248954966824">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248954966844">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954966884">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954966904">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954962624">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248954962724">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248954963476">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954963496">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248954963516">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="m2248956563440">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Italic="1"/>
     <Interior/>
     <NumberFormat ss:Format="[$-1010000]d/m/yyyy;@"/>
    </Style>
    <Style ss:ID="m2248956563460">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248956485888">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="12"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248956485928">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248956485948">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="13"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248956485988">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman" ss:Size="7"
      ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="m2248956486008">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s70">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="14"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s74">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s87">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="14"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s88">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Size="14"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s90">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s101">
     <Alignment ss:Vertical="Top"/>
     <Borders>
      <Border ss:Position="Top" ss:LineStyle="Continuous"/>
     </Borders>
     <Font ss:FontName="VNI-Times" ss:Size="9" ss:Color="#000000" ss:Italic="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s110">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Calibri Light" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s113">
     <Alignment ss:Vertical="Top"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous"/>
     </Borders>
     <Font ss:FontName="VNI-Times" ss:Size="9" ss:Color="#000000" ss:Italic="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s114">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Wingdings" x:CharSet="2" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s115">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Wingdings" x:CharSet="2" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s116">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Wingdings" x:CharSet="2" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s117">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Wingdings" x:CharSet="2" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s118">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Calibri Light" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s119">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s120">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s121">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="s122">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s130">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s131">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s135">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Italic="1"/>
     <Interior/>
     <NumberFormat ss:Format="[$-1010000]d/m/yyyy;@"/>
    </Style>
    <Style ss:ID="s136">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Size="12" ss:Color="#000000" ss:Bold="1" ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s137">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s138">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s139">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s140">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s143">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1" ss:Italic="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s144">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s145">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s146">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s147">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s148">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s149">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s150">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s151">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s152">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="s153">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s154">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s155">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s158">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
    </Style>
    <Style ss:ID="s159">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s160">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s174">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#FF0000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s175">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="s176">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s177">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="s178">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s179">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s180">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s181">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s187">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s188">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s197">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s199">
     <Alignment ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s202">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s203">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman" ss:Bold="1"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s204">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s205">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s206">
     <Alignment ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#FF0000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s207">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s208">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Size="12" ss:Color="#000000" ss:Bold="1" ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s209">
     <Alignment ss:Vertical="Center" ss:WrapText="1"/>
     <Borders/>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#FF0000"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s210">
     <Alignment ss:Vertical="Top" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="DiagonalLeft" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s211">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s221">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s222">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s223">
     <Alignment ss:Horizontal="Right" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Color="#000000" ss:Bold="1"/>
     <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s224">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Size="12" ss:Color="#000000" ss:Bold="1" ss:Italic="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s225">
     <Alignment ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="s226">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s230">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s231">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s232">
     <Alignment ss:Vertical="Center"/>
     <Font ss:FontName="VNI-Times" ss:Color="#000000"/>
    </Style>
    <Style ss:ID="s233">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
     <NumberFormat ss:Format="@"/>
    </Style>
    <Style ss:ID="s234">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
     <NumberFormat ss:Format="@"/>
    </Style>
    <Style ss:ID="s235">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
     <NumberFormat ss:Format="0"/>
    </Style>
    <Style ss:ID="s236">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
     <NumberFormat ss:Format="0"/>
    </Style>
    <Style ss:ID="s237">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
    </Style>
    <Style ss:ID="s238">
     <Alignment ss:Vertical="Center"/>
     <Font ss:FontName="VNI-Times" ss:Color="#000000"/>
     <NumberFormat ss:Format="0"/>
    </Style>
    <Style ss:ID="s239">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s240">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
    </Style>
    <Style ss:ID="s241">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman"/>
     <Interior/>
    </Style>
    <Style ss:ID="s242">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s243">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s244">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior/>
     <NumberFormat ss:Format="Percent"/>
    </Style>
    <Style ss:ID="s245">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior/>
     <NumberFormat ss:Format="Percent"/>
    </Style>
    <Style ss:ID="s246">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
      <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Bold="1"/>
     <Interior/>
     <NumberFormat ss:Format="Percent"/>
    </Style>
    <Style ss:ID="s248">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:Family="Roman" ss:Color="#000000"
      ss:Bold="1"/>
     <Interior/>
    </Style>
    <Style ss:ID="s264">
     <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
     <Borders>
      <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2"/>
      <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="VNI-Commerce" ss:Size="14" ss:Color="#000000"/>
     <Interior/>
    </Style>
    <Style ss:ID="s271">
     <Alignment ss:Vertical="Bottom"/>
     <Borders>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Size="12"/>
    </Style>
    <Style ss:ID="s272">
     <Alignment ss:Vertical="Bottom"/>
     <Borders>
      <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2"/>
     </Borders>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Italic="1"/>
    </Style>
    <Style ss:ID="s274">
     <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
     <Font ss:FontName="Calibri Light" x:CharSet="163" x:Family="Roman" ss:Size="11"
      ss:Color="#000000"/>
     <NumberFormat ss:Format="@"/>
    </Style>
    <Style ss:ID="s275">
     <Alignment ss:Vertical="Bottom"/>
     <Font ss:FontName="Times New Roman" x:CharSet="163" x:Family="Roman"
      ss:Italic="1"/>
    </Style>
    <Style ss:ID="s276">
     <NumberFormat ss:Format="Percent"/>
    </Style>
   </Styles>
   <Worksheet ss:Name="Sheet1">
    <Table ss:ExpandedColumnCount="16117" ss:ExpandedRowCount="66" x:FullColumns="1"
     x:FullRows="1" ss:DefaultRowHeight="15">
     <Column ss:AutoFitWidth="0" ss:Width="103.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="49.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="45.75"/>
     <Column ss:AutoFitWidth="0" ss:Width="50.25"/>
     <Column ss:AutoFitWidth="0" ss:Width="81"/>
     <Column ss:AutoFitWidth="0" ss:Width="57.75"/>
     <Column ss:AutoFitWidth="0" ss:Width="52.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="46.5" ss:Span="1"/>
     <Column ss:Index="10" ss:AutoFitWidth="0" ss:Width="55.5"/>
     <Column ss:Index="227" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="230" ss:Width="44.25"/>
     <Column ss:Index="232" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="234" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="238" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="483" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="486" ss:Width="44.25"/>
     <Column ss:Index="488" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="490" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="494" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="739" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="742" ss:Width="44.25"/>
     <Column ss:Index="744" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="746" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="750" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="995" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="998" ss:Width="44.25"/>
     <Column ss:Index="1000" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="1002" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="1006" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="1251" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="1254" ss:Width="44.25"/>
     <Column ss:Index="1256" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="1258" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="1262" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="1507" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="1510" ss:Width="44.25"/>
     <Column ss:Index="1512" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="1514" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="1518" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="1763" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="1766" ss:Width="44.25"/>
     <Column ss:Index="1768" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="1770" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="1774" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="2019" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="2022" ss:Width="44.25"/>
     <Column ss:Index="2024" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="2026" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="2030" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="2275" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="2278" ss:Width="44.25"/>
     <Column ss:Index="2280" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="2282" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="2286" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="2531" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="2534" ss:Width="44.25"/>
     <Column ss:Index="2536" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="2538" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="2542" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="2787" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="2790" ss:Width="44.25"/>
     <Column ss:Index="2792" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="2794" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="2798" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="3043" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="3046" ss:Width="44.25"/>
     <Column ss:Index="3048" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="3050" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="3054" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="3299" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="3302" ss:Width="44.25"/>
     <Column ss:Index="3304" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="3306" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="3310" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="3555" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="3558" ss:Width="44.25"/>
     <Column ss:Index="3560" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="3562" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="3566" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="3811" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="3814" ss:Width="44.25"/>
     <Column ss:Index="3816" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="3818" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="3822" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="4067" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="4070" ss:Width="44.25"/>
     <Column ss:Index="4072" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="4074" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="4078" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="4323" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="4326" ss:Width="44.25"/>
     <Column ss:Index="4328" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="4330" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="4334" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="4579" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="4582" ss:Width="44.25"/>
     <Column ss:Index="4584" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="4586" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="4590" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="4835" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="4838" ss:Width="44.25"/>
     <Column ss:Index="4840" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="4842" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="4846" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="5091" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="5094" ss:Width="44.25"/>
     <Column ss:Index="5096" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="5098" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="5102" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="5347" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="5350" ss:Width="44.25"/>
     <Column ss:Index="5352" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="5354" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="5358" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="5603" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="5606" ss:Width="44.25"/>
     <Column ss:Index="5608" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="5610" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="5614" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="5859" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="5862" ss:Width="44.25"/>
     <Column ss:Index="5864" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="5866" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="5870" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="6115" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="6118" ss:Width="44.25"/>
     <Column ss:Index="6120" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="6122" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="6126" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="6371" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="6374" ss:Width="44.25"/>
     <Column ss:Index="6376" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="6378" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="6382" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="6627" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="6630" ss:Width="44.25"/>
     <Column ss:Index="6632" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="6634" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="6638" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="6883" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="6886" ss:Width="44.25"/>
     <Column ss:Index="6888" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="6890" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="6894" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="7139" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="7142" ss:Width="44.25"/>
     <Column ss:Index="7144" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="7146" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="7150" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="7395" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="7398" ss:Width="44.25"/>
     <Column ss:Index="7400" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="7402" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="7406" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="7651" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="7654" ss:Width="44.25"/>
     <Column ss:Index="7656" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="7658" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="7662" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="7907" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="7910" ss:Width="44.25"/>
     <Column ss:Index="7912" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="7914" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="7918" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="8163" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="8166" ss:Width="44.25"/>
     <Column ss:Index="8168" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="8170" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="8174" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="8419" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="8422" ss:Width="44.25"/>
     <Column ss:Index="8424" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="8426" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="8430" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="8675" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="8678" ss:Width="44.25"/>
     <Column ss:Index="8680" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="8682" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="8686" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="8931" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="8934" ss:Width="44.25"/>
     <Column ss:Index="8936" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="8938" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="8942" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="9187" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="9190" ss:Width="44.25"/>
     <Column ss:Index="9192" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="9194" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="9198" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="9443" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="9446" ss:Width="44.25"/>
     <Column ss:Index="9448" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="9450" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="9454" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="9699" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="9702" ss:Width="44.25"/>
     <Column ss:Index="9704" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="9706" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="9710" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="9955" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="9958" ss:Width="44.25"/>
     <Column ss:Index="9960" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="9962" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="9966" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="10211" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="10214" ss:Width="44.25"/>
     <Column ss:Index="10216" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="10218" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="10222" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="10467" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="10470" ss:Width="44.25"/>
     <Column ss:Index="10472" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="10474" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="10478" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="10723" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="10726" ss:Width="44.25"/>
     <Column ss:Index="10728" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="10730" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="10734" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="10979" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="10982" ss:Width="44.25"/>
     <Column ss:Index="10984" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="10986" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="10990" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="11235" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="11238" ss:Width="44.25"/>
     <Column ss:Index="11240" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="11242" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="11246" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="11491" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="11494" ss:Width="44.25"/>
     <Column ss:Index="11496" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="11498" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="11502" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="11747" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="11750" ss:Width="44.25"/>
     <Column ss:Index="11752" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="11754" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="11758" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="12003" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="12006" ss:Width="44.25"/>
     <Column ss:Index="12008" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="12010" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="12014" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="12259" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="12262" ss:Width="44.25"/>
     <Column ss:Index="12264" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="12266" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="12270" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="12515" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="12518" ss:Width="44.25"/>
     <Column ss:Index="12520" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="12522" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="12526" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="12771" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="12774" ss:Width="44.25"/>
     <Column ss:Index="12776" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="12778" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="12782" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="13027" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="13030" ss:Width="44.25"/>
     <Column ss:Index="13032" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="13034" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="13038" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="13283" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="13286" ss:Width="44.25"/>
     <Column ss:Index="13288" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="13290" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="13294" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="13539" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="13542" ss:Width="44.25"/>
     <Column ss:Index="13544" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="13546" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="13550" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="13795" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="13798" ss:Width="44.25"/>
     <Column ss:Index="13800" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="13802" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="13806" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="14051" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="14054" ss:Width="44.25"/>
     <Column ss:Index="14056" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="14058" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="14062" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="14307" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="14310" ss:Width="44.25"/>
     <Column ss:Index="14312" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="14314" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="14318" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="14563" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="14566" ss:Width="44.25"/>
     <Column ss:Index="14568" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="14570" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="14574" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="14819" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="14822" ss:Width="44.25"/>
     <Column ss:Index="14824" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="14826" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="14830" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="15075" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="15078" ss:Width="44.25"/>
     <Column ss:Index="15080" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="15082" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="15086" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="15331" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="15334" ss:Width="44.25"/>
     <Column ss:Index="15336" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="15338" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="15342" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="15587" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="15590" ss:Width="44.25"/>
     <Column ss:Index="15592" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="15594" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="15598" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="15843" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="15846" ss:Width="44.25"/>
     <Column ss:Index="15848" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="15850" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="15854" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Column ss:Index="16099" ss:AutoFitWidth="0" ss:Width="60"/>
     <Column ss:AutoFitWidth="0" ss:Width="43.5"/>
     <Column ss:Index="16102" ss:Width="44.25"/>
     <Column ss:Index="16104" ss:AutoFitWidth="0" ss:Width="47.25"/>
     <Column ss:Index="16106" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:AutoFitWidth="0" ss:Width="40.5"/>
     <Column ss:AutoFitWidth="0" ss:Width="67.5"/>
     <Column ss:Index="16110" ss:AutoFitWidth="0" ss:Width="33"/>
     <Column ss:Hidden="1" ss:AutoFitWidth="0" ss:Span="6"/>
     <Row ss:AutoFitHeight="0" ss:Height="16.5">
      <Cell ss:MergeAcross="3" ss:StyleID="m2248956485888">
      <Data ss:Type="String">CÔNG TY CỔ PHẦN CẤP NƯỚC VĨNH LONG</Data></Cell>
      <Cell ss:MergeAcross="1" ss:StyleID="s70"><Data ss:Type="String">PHIẾU BÁO CÁO</Data></Cell>
      <Cell ss:StyleID="s74"><Data ss:Type="String">DMA</Data></Cell>
      <Cell ss:MergeAcross="2" ss:StyleID="m2248956485928"><Data ss:Type="String">${model.tenDMA}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:MergeAcross="3" ss:StyleID="m2248956485948"><Data ss:Type="String">PHÒNG QUẢN LÝ CẤP NƯỚC</Data></Cell>
      <Cell ss:StyleID="s87"/>
      <Cell ss:StyleID="s88"/>
      <Cell ss:MergeDown="1" ss:StyleID="s90"><Data ss:Type="String">Tuyến đường</Data></Cell>
      <Cell ss:MergeAcross="2" ss:MergeDown="1" ss:StyleID="m2248956485988">
      <Data ss:Type="String">${model.tuyenDuong}</Data></Cell>
      <Cell ss:StyleID="s101"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="18">
      <Cell ss:MergeAcross="3" ss:StyleID="m2248956486008"><Data ss:Type="String"
        x:Ticked="1">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-</Data></Cell>
      <Cell ss:MergeAcross="1" ss:StyleID="s110">
      <Data ss:Type="String" x:Ticked="1">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-</Data></Cell>
      <Cell ss:Index="11" ss:StyleID="s113"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s114"/>
      <Cell ss:StyleID="s115"/>
      <Cell ss:StyleID="s116"/>
      <Cell ss:StyleID="s117"/>
      <Cell ss:StyleID="s116"/>
      <Cell ss:StyleID="s116"/>
      <Cell ss:StyleID="s118"><Data ss:Type="String">Phường</Data></Cell>
      <Cell ss:StyleID="s119"><Data ss:Type="String">${model.phuong}</Data></Cell>
      <Cell ss:StyleID="s120"><Data ss:Type="String">Quận</Data></Cell>
      <Cell ss:StyleID="s121"><Data ss:Type="String">${model.quan}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:StyleID="s122"><Data ss:Type="String">Ngày khảo sát :</Data></Cell>
      <Cell ss:MergeAcross="3" ss:StyleID="m2248956563440"><Data ss:Type="String">${model.ngayKhaoSat}</Data></Cell>
      <Cell ss:StyleID="s130"/>
      <Cell ss:StyleID="s131"/>
      <Cell ss:MergeAcross="1" ss:StyleID="m2248956563460"><Data ss:Type="String">Ngày báo cáo:</Data></Cell>
      <Cell ss:StyleID="s135"><Data ss:Type="String">${model.ngayBaoCao}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s136"><Data ss:Type="String">I- Số liệu về khu vực DMA</Data></Cell>
      <Cell ss:StyleID="s137"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s137"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s137"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s137"/>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s140"><Data ss:Type="String">1.Tổng số đấu nối dịch vụ</Data></Cell>
      <Cell ss:StyleID="s143"><Data ss:Type="Number">${model.tongSoDauNoiDichVu}</Data></Cell>
      <Cell ss:StyleID="s144"/>
      <Cell ss:StyleID="s145"><Data ss:Type="String">8.Áp lực khu vực</Data></Cell>
      <Cell ss:StyleID="s146"><Data ss:Type="String">Mạnh</Data></Cell>
      <Cell ss:StyleID="s147"><Data ss:Type="String">Trung bình</Data></Cell>
      <Cell ss:StyleID="s147"><Data ss:Type="String">Yếu</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s149"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s140"><Data ss:Type="String">2. Đợt đọc số</Data></Cell>
      <Cell ss:StyleID="s150"/>
      <Cell ss:StyleID="s143"><Data ss:Type="String">IV</Data></Cell>
      <Cell ss:StyleID="s144"/>
      <Cell ss:StyleID="s145"/>
      <Cell ss:StyleID="s151"><Data ss:Type="Number">${model.apLucKhuVuc.manh}</Data></Cell>
      <Cell ss:StyleID="s151"><Data ss:Type="Number">${model.apLucKhuVuc.trungbinh}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.apLucKhuVuc.yeu}</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s149"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s140"><Data ss:Type="String">3.Khách hàng</Data></Cell>
      <Cell ss:StyleID="s153"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s145"><Data ss:Type="String">9.Chất lượng nước</Data></Cell>
      <Cell ss:StyleID="s146"><Data ss:Type="String">Tốt</Data></Cell>
      <Cell ss:StyleID="s146"><Data ss:Type="String">Trung Bình</Data></Cell>
      <Cell ss:StyleID="s147"><Data ss:Type="String">Xấu</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s149"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Sinh hoạt</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.khachHang.sinhHoat}</Data></Cell>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s145"/>
      <Cell ss:StyleID="s151"><Data ss:Type="Number">${model.chatLuongNuoc.tot}</Data></Cell>
      <Cell ss:StyleID="s159"><Data ss:Type="Number">${model.chatLuongNuoc.trungbinh}</Data></Cell>
      <Cell ss:StyleID="s160"><Data ss:Type="Number">${model.chatLuongNuoc.xau}</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s149"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Thương mại</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.khachHang.thuongMai}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s145"><Data ss:Type="String">10.Đường kính, vật liệu ống (chiều dài tính bằng m)</Data></Cell>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s149"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Hành chính, sự nghiệp</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.khachHang.hanhChinhSuNghiep}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s145"/>
      <Cell ss:MergeDown="1" ss:StyleID="m2248954963476"><Data ss:Type="String">Đường kính</Data></Cell>
      <Cell ss:MergeAcross="2" ss:StyleID="m2248954963496"><Data ss:Type="String">Vật liệu</Data></Cell>
      <Cell ss:MergeDown="1" ss:StyleID="m2248954963516"><Data ss:Type="String">Tổng cộng</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Khác</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.khachHang.khac}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s174"/>
      <Cell ss:Index="7" ss:StyleID="s152"><Data ss:Type="String">Gang</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="String">uPVC</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="String">HDPE</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s140"><Data ss:Type="String">4.Tình trạng sử dụng ĐHN</Data></Cell>
      <Cell ss:StyleID="s153"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s174"/>
      <Cell ss:StyleID="s152"><Data ss:Type="String">50 mm</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['50mm'].gang}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['50mm'].upvc}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['50mm'].hdpe}</Data></Cell>
      <Cell ss:StyleID="s175"><Data ss:Type="Number">${model.duongKinhVatLieuOng['50mm'].hdpe +
    model.duongKinhVatLieuOng['50mm'].gang + model.duongKinhVatLieuOng['50mm'].upvc}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Bình thường</Data></Cell>
      <Cell ss:StyleID="s158" ss:Formula="=R[-8]C-R[1]C-R[2]C-R[3]C-R[4]C"><Data
        ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"/>
      <Cell ss:StyleID="s152"><Data ss:Type="String">100 mm</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['100mm'].gang}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['100mm'].upvc}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['100mm'].hdpe}</Data></Cell>
      <Cell ss:StyleID="s175"><Data ss:Type="Number">${model.duongKinhVatLieuOng['100mm'].hdpe +
    model.duongKinhVatLieuOng['100mm'].gang + model.duongKinhVatLieuOng['100mm'].upvc}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Đóng cửa, không ở</Data></Cell>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"/>
      <Cell ss:StyleID="s152"><Data ss:Type="String">150 mm</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['150mm'].gang}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['150mm'].upvc}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['150mm'].hdpe}</Data></Cell>
      <Cell ss:StyleID="s175"><Data ss:Type="Number">${model.duongKinhVatLieuOng['150mm'].hdpe +
    model.duongKinhVatLieuOng['150mm'].gang + model.duongKinhVatLieuOng['150mm'].upvc}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Cắt hủy tạm</Data></Cell>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"/>
      <Cell ss:StyleID="s152"><Data ss:Type="String">200 mm</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['200mm'].gang}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['200mm'].upvc}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['200mm'].hdpe}</Data></Cell>
      <Cell ss:StyleID="s175"><Data ss:Type="Number">${model.duongKinhVatLieuOng['200mm'].hdpe +
    model.duongKinhVatLieuOng['200mm'].gang + model.duongKinhVatLieuOng['200mm'].upvc}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Thay</Data></Cell>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s174"/>
      <Cell ss:StyleID="s152"><Data ss:Type="String">250 mm</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['250mm'].gang}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['250mm'].upvc}</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.duongKinhVatLieuOng['250mm'].hdpe}</Data></Cell>
      <Cell ss:StyleID="s175"><Data ss:Type="Number">${model.duongKinhVatLieuOng['250mm'].hdpe +
    model.duongKinhVatLieuOng['250mm'].gang + model.duongKinhVatLieuOng['250mm'].upvc}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s155"/>
      <Cell ss:StyleID="s178"><Data ss:Type="String">Khác</Data></Cell>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s174"/>
      <Cell ss:StyleID="s160"><Data ss:Type="String">Tổng cộng</Data></Cell>
      <Cell ss:StyleID="s152" ss:Formula="=SUM(R[-5]C:R[-1]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s152" ss:Formula="=SUM(R[-5]C:R[-1]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s179" ss:Formula="=SUM(R[-4]C[1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s180" ss:Formula="=SUM(RC[-3]:RC[-2])"><Data ss:Type="Number">0</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s140"><Data ss:Type="String">5.Số khách hàng với </Data></Cell>
      <Cell ss:StyleID="s181"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Mức tiêu thụ &lt; 4 m3/tháng</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.soKhachHangVoi.mucTieuThuDuoi4}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s145"><Data ss:Type="String">11. Van</Data></Cell>
      <Cell ss:StyleID="s160"><Data ss:Type="Number">${model.van.bien + model.van.trong}</Data></Cell>
      <Cell ss:MergeAcross="1" ss:StyleID="m2248954962624"><Data ss:Type="String">12. Trụ cứu hỏa</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.truCuuHoa.tot + model.truCuuHoa.khongTot}</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">Mức tiêu thụ &gt; 4 m3/tháng</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.soKhachHangVoi.mucTieuThuTren4}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"><Data ss:Type="String">Số van biên</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.van.bien}</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s138"><Data ss:Type="String">Tốt</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.truCuuHoa.tot}</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s140"><Data ss:Type="String">6.Tuổi thọ ĐHN</Data></Cell>
      <Cell ss:StyleID="s181"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s176"><Data ss:Type="String">Số van bên trong</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.van.trong}</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s138"><Data ss:Type="String">Không tốt</Data></Cell>
      <Cell ss:StyleID="s152"><Data ss:Type="Number">${model.truCuuHoa.khongTot}</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">ĐHN &lt; 5 năm</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.tuoiThoDHN.duoi5Nam}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s187"><Data ss:Type="String">13. Vị trí đồng hồ tổng</Data></Cell>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:MergeAcross="1" ss:StyleID="s155"><Data ss:Type="String">ĐHN &gt; 5 năm</Data></Cell>
      <Cell ss:StyleID="s158"><Data ss:Type="Number">${model.tuoiThoDHN.tren5Nam}</Data></Cell>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s188"><Data ss:Type="String">ĐHT 1: </Data></Cell>
      <Cell ss:MergeAcross="4" ss:StyleID="m2248954966904">
      <Data ss:Type="Number">${model.viTriDongHoTong.VT1}</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:MergeAcross="1" ss:StyleID="s197"><Data ss:Type="String">7. Hiệu, cở ĐHN</Data></Cell>
      <Cell ss:StyleID="s199"/>
      <Cell ss:StyleID="s154"/>
      <Cell ss:StyleID="s188"><Data ss:Type="String">ĐHT 2: </Data></Cell>
      <Cell ss:MergeAcross="4" ss:StyleID="m2248954966904">
      <Data ss:Type="Number"><${model.viTriDongHoTong.VT2}/Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s203"><Data ss:Type="String">Hiệu/Cở</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">15</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">25</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">40</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">50</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">80</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="Number">100</Data></Cell>
      <Cell ss:StyleID="s203"><Data ss:Type="String">Tổng</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">ACC</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">ACT</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">AIC</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">ASA</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">BAY</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">DEL</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s206"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">ITR</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">KEN</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s202"/>
      <Cell ss:StyleID="s204"><Data ss:Type="String">SEN</Data></Cell>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s205"/>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s207"/>
      <Cell ss:StyleID="s203"><Data ss:Type="String">TỔNG</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-2]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-2]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-1]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-1]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-2]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(R[-9]C:R[-2]C)"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s203" ss:Formula="=SUM(RC[-6]:RC[-1])"><Data ss:Type="Number">0</Data></Cell>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s136"><Data ss:Type="String">II- Số liệu về sửa bể</Data></Cell>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s148"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s208"><Data ss:Type="String">III. Đánh giá</Data></Cell>
      <Cell ss:StyleID="s209"/>
      <Cell ss:StyleID="s138"/>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="25.5">
      <Cell ss:StyleID="s210"><Data ss:Type="String">                         Cở ống&#10;Đặc điểm</Data></Cell>
      <Cell ss:StyleID="s211"><Data ss:Type="String">Ø25</Data></Cell>
      <Cell ss:StyleID="s211"><Data ss:Type="String">Ø27</Data></Cell>
      <Cell ss:StyleID="s211"><Data ss:Type="String">Ø40</Data></Cell>
      <Cell ss:StyleID="s211"><Data ss:Type="String">Tổng</Data></Cell>
      <Cell ss:StyleID="s144"/>
      <Cell ss:MergeAcross="3" ss:MergeDown="9" ss:StyleID="m2248954966824"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Téc</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Gãy</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Xì mối nối</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s222"/>
      <Cell ss:StyleID="s222"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Mục bù lon</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Lủng</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Xì van góc</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Xì van cóc</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s221"><Data ss:Type="String">Hư đai</Data></Cell>
      <Cell ss:StyleID="s221"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s151"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12.9375">
      <Cell ss:StyleID="s223"><Data ss:Type="String">Tổng</Data></Cell>
      <Cell ss:StyleID="s223"/>
      <Cell ss:StyleID="s211"/>
      <Cell ss:StyleID="s211"/>
      <Cell ss:StyleID="s211"/>
      <Cell ss:StyleID="s144"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s224"><Data ss:Type="String">IV- Tỷ lệ nước thất thoát thất thu (%NRW)</Data></Cell>
      <Cell ss:StyleID="s225"/>
      <Cell ss:StyleID="s225"/>
      <Cell ss:StyleID="s225"/>
      <Cell ss:StyleID="s225"/>
      <Cell ss:StyleID="s144"/>
      <Cell ss:StyleID="s208"/>
      <Cell ss:StyleID="s144"/>
      <Cell ss:StyleID="s144"/>
      <Cell ss:StyleID="s139"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="12">
      <Cell ss:MergeDown="1" ss:StyleID="m2248954966844"><Data ss:Type="String">Ngày</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 10</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 11</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 12</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 1-2016</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 2</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 3</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 4</Data></Cell>
      <Cell ss:StyleID="s230"><Data ss:Type="String">Kỳ 5</Data></Cell>
      <Cell ss:StyleID="s231"><Data ss:Type="String">Kỳ 6</Data></Cell>
      <Cell ss:StyleID="s232"/>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:Index="2" ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s233"/>
      <Cell ss:StyleID="s234"/>
      <Cell ss:StyleID="s232"/>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:StyleID="s226"><Data ss:Type="String">Sản lượng qua ĐHT 1</Data></Cell>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s235"/>
      <Cell ss:StyleID="s236"/>
      <Cell ss:StyleID="s232"/>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:StyleID="s226"><Data ss:Type="String">Sản lượng qua ĐHT 2</Data></Cell>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s158"/>
      <Cell ss:StyleID="s237"/>
      <Cell ss:StyleID="s238"/>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:StyleID="s239"><Data ss:Type="String">Sản lượng khách hàng</Data></Cell>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s241"/>
      <Cell ss:StyleID="s232"/>
     </Row>
     <Row ss:AutoFitHeight="0">
      <Cell ss:StyleID="s242"><Data ss:Type="String">Nước súc xả</Data></Cell>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s240"/>
      <Cell ss:StyleID="s241"/>
      <Cell ss:StyleID="s232"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s243"><Data ss:Type="String">%NRW</Data></Cell>
      <Cell ss:StyleID="s244"/>
      <Cell ss:StyleID="s244"/>
      <Cell ss:StyleID="s244"/>
      <Cell ss:StyleID="s244"/>
      <Cell ss:StyleID="s244"/>
      <Cell ss:StyleID="s245"/>
      <Cell ss:StyleID="s245"/>
      <Cell ss:StyleID="s245"/>
      <Cell ss:StyleID="s246"/>
      <Cell ss:StyleID="s238"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:MergeAcross="2" ss:StyleID="s248"><Data ss:Type="String">DUYỆT</Data></Cell>
      <Cell ss:MergeAcross="3" ss:StyleID="m2248954966884"><Data ss:Type="String">PHÒNG QUẢN LÝ CẤP NƯỚC</Data></Cell>
      <Cell ss:MergeAcross="2" ss:StyleID="m2248954966904"><Data ss:Type="String">NGƯỜI LẬP BÁO CÁO</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="20.25">
      <Cell ss:MergeAcross="2" ss:MergeDown="2" ss:StyleID="m2248954958256"/>
      <Cell ss:MergeAcross="3" ss:MergeDown="2" ss:StyleID="m2248954958276"/>
      <Cell ss:MergeAcross="2" ss:MergeDown="2" ss:StyleID="m2248954958296"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="18"/>
     <Row ss:AutoFitHeight="0" ss:Height="19.5"/>
     <Row ss:AutoFitHeight="0" ss:Height="14.25">
      <Cell ss:MergeAcross="2" ss:StyleID="s264"><Data ss:Type="String">LÊ TRỌNG HIẾU</Data></Cell>
      <Cell ss:MergeAcross="3" ss:StyleID="m2248954958336"><Data ss:Type="String">NGUYỄN ANH KIỆT</Data></Cell>
      <Cell ss:MergeAcross="2" ss:StyleID="m2248954958356"><Data ss:Type="String">HUỲNH TẤN LONG</Data></Cell>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="15.75">
      <Cell ss:StyleID="s271"><Data ss:Type="String">Nơi nhận:</Data></Cell>
      <Cell ss:StyleID="s272"/>
      <Cell ss:StyleID="s272"/>
      <Cell ss:StyleID="s272"/>
     </Row>
     <Row ss:AutoFitHeight="0" ss:Height="35.25">
      <Cell ss:MergeAcross="1" ss:StyleID="s274"><Data ss:Type="String">- PGĐ Kỹ thuật &quot;để biết&quot;;&#10;- Lưu: VT, KTCN.</Data></Cell>
      <Cell ss:Index="4" ss:StyleID="s275"/>
     </Row>
     <Row ss:Index="66" ss:AutoFitHeight="0">
      <Cell ss:Index="8" ss:StyleID="s276"/>
     </Row>
    </Table>
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
     <PageSetup>
      <Header x:Margin="0.3"/>
      <Footer x:Margin="0.3"/>
      <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
     </PageSetup>
     <Unsynced/>
     <Selected/>
     <Panes>
      <Pane>
       <Number>3</Number>
       <ActiveRow>24</ActiveRow>
       <ActiveCol>5</ActiveCol>
       <RangeSelection>R25C6:R25C10</RangeSelection>
      </Pane>
     </Panes>
     <ProtectObjects>False</ProtectObjects>
     <ProtectScenarios>False</ProtectScenarios>
    </WorksheetOptions>
   </Worksheet>
   <Worksheet ss:Name="ESRI_MAPINFO_SHEET">
    <Table ss:ExpandedColumnCount="1" ss:ExpandedRowCount="1" x:FullColumns="1"
     x:FullRows="1" ss:DefaultRowHeight="15">
     <Row ss:AutoFitHeight="0"/>
    </Table>
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
     <PageSetup>
      <Header x:Margin="0.3"/>
      <Footer x:Margin="0.3"/>
      <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/>
     </PageSetup>
     <Unsynced/>
     <Visible>SheetVeryHidden</Visible>
     <ProtectObjects>False</ProtectObjects>
     <ProtectScenarios>False</ProtectScenarios>
    </WorksheetOptions>
   </Worksheet>
  </Workbook>
  `;
  return content;
}