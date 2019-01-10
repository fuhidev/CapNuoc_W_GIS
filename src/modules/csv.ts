export function jSONToCSVConvertor(datas: Array<any>, columns: any, title: string) {
  function emitXmlHeader() {
    var headerRow = '<ss:Row>\n';
    for (var colName in columns) {
      if (colName) {
        headerRow += '  <ss:Cell>\n';
        headerRow += '    <ss:Data ss:Type="String">';
        headerRow += colName + '</ss:Data>\n';
        headerRow += '  </ss:Cell>\n';
      }
    }
    headerRow += '</ss:Row>\n';
    return '<?xml version="1.0"?>\n' +
      '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
      '<ss:Worksheet ss:Name="Sheet1">\n' +
      '<ss:Table>\n\n' + headerRow;
  }

  function emitXmlFooter() {
    return '\n</ss:Table>\n' +
      '</ss:Worksheet>\n' +
      '</ss:Workbook>\n';
  }

  function jsonToSsXml(jsonObject: string | object) {
    var row;
    var col;
    var xml;
    var data = typeof jsonObject !== 'object' ? JSON.parse(jsonObject) : jsonObject;

    xml = emitXmlHeader();

    for (row = 0; row < data.length; row++) {
      xml += '<ss:Row>\n';

      for (col in data[row]) {
        if (col) {
          xml += '  <ss:Cell>\n';
          xml += '    <ss:Data ss:Type="' + columns[col] + '">';
          xml += data[row][col] + '</ss:Data>\n';
          xml += '  </ss:Cell>\n';
        }
      }

      xml += '</ss:Row>\n';
    }

    xml += emitXmlFooter();
    return xml;
  }

  function download(content: any, filename: any, contentType: any) {
    if (!contentType) { contentType = 'application/octet-stream'; }
    var blob = new Blob([content], {
      'type': contentType
    });
    return window.URL.createObjectURL(blob);
  }
  return download(
    jsonToSsXml(datas), title, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}