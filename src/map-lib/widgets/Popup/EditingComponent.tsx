import * as React from 'react';
import { RaisedButton, Snackbar, Card, CardHeader, CardText } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import { LayerFieldInfo } from '../Popup';
import Item from '../../../components/material-ui/LayerFieldItem';
interface Props {
  layerFieldsInfos: LayerFieldInfo[];
  graphic: __esri.Graphic;
  onSave: (attributes: object) => Promise<boolean>;
  capNhatHinhAnh: (form: HTMLFormElement) => Promise<__esri.FeatureEditResult>;
}

interface States {
  attributes: object | null;
  snackbar: string;
  attachments: __esri.AttachmentInfo[];
  isLoadingThemHinhAnh: boolean;

}

class EditingComponent extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      attributes: null, snackbar: '', attachments: []
      , isLoadingThemHinhAnh: false
    };
  }
  componentDidMount() {
    this.setState({ attributes: this.props.graphic.attributes });
    const { attributes } = this.props.graphic,
      layer = this.props.graphic.layer as __esri.FeatureLayer;
    if (layer.hasAttachments) {
      layer.queryAttachments({ objectIds: [attributes.OBJECTID] })
        .then((attachments: any) => {
          if (attachments[attributes.OBJECTID]) {
            this.setState({ attachments: attachments[attributes.OBJECTID] });
          }
        });
    }
  }

  private convertData(_attributes: any) {
    let attributes = { ..._attributes };

    // cập nhật giá trị
    for (const key in attributes) {
      if (key) {
        const value = attributes[key];
        if (value !== undefined && value !== null) {
          const field = (this.props.graphic.layer as __esri.FeatureLayer).fields.find(f => f.name === key);
          if (field) {
            let convertValue;
            if (field.type === 'small-integer' || field.type === 'integer') {
              convertValue = parseInt(value, undefined);
            } else if (field.type === 'double') {
              convertValue = parseFloat(value);
            } else {
              convertValue = value;
            }
            attributes[field.name] = convertValue;
          }
        }
      }
    }
    return attributes;
  }

  private onChange(name: string, value: any) {
    let attributes = { ...this.state.attributes };

    attributes[name] = value;

    // nếu giá trị thay đổi là subtype thì cập nhật tất cả các thành phần
    // liên quan là null
    const layer = this.props.graphic.layer as __esri.FeatureLayer;
    if (layer.typeIdField === name) {
      const subtype = layer.types[0];
      if (subtype) {
        // lọc fieldName để cập nhật lại giá trị
        for (const fieldName in subtype.domains) {
          if (fieldName && fieldName != name) {
            attributes[fieldName] = null;
          }
        }
      }
    }

    attributes = this.convertData(attributes);

    this.setState({ attributes });
  }

  render() {
    const { layerFieldsInfos, } = this.props;
    const { attributes, snackbar, attachments, isLoadingThemHinhAnh } = this.state;
    const layer = this.props.graphic.layer as __esri.FeatureLayer;
    return (
      attributes &&
      <MuiThemeProvider>
        <div>
          <Card>
            <CardHeader
              title="Thuộc tính"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              {
                layerFieldsInfos.filter(f => f.isEditable).map(_layerField => {
                  let layerField = { ..._layerField };
                  // nếu có subtype
                  if (layer.typeIdField) {
                    const types = layer.types; // lấy types

                    // nếu layerField chính là typeIDField thì cập nhật domain cho layerField
                    // để hiển thị select trong popup
                    if (layer.typeIdField === layerField.name) {
                      // tạo domain ảo
                      const domain = {
                        type: 'coded-value',
                        codedValues: types.map(m => ({ code: m.id, name: m.name }))
                      } as __esri.CodedValueDomain;
                      layerField.domain = domain;
                    }

                    // nếu attributes của typeID có giá trị
                    if (attributes[layer.typeIdField] || attributes[layer.typeIdField] === 0) {
                      // tìm subtype có giá trị id trùng với giá trị attributes của typeID
                      const subtype = types.find(f => f.id === attributes[layer.typeIdField]);
                      // nêu tồn tại
                      if (subtype) {
                        // nếu field nằm trong types
                        if (layerField.name in subtype.domains) {
                          const domain = subtype.domains[layerField.name] as __esri.Domain;

                          // nếu inherit thì lấy domain gốc
                          if (domain.type === 'inherited') {
                            layerField.domain = layer.getFieldDomain(layerField.name);
                          } else {
                            layerField.domain = domain; // gán domain cho domai mới theo subtype
                          }
                        }
                      }
                    }
                  }
                  return (
                    <Item
                      key={layer.id + '_' + layerField.name}
                      layerField={layerField as any}
                      value={attributes[layerField.name]}
                      onChange={this.onChange.bind(this)}
                    />
                  );
                })
              }
              <RaisedButton label="Cập nhật" primary={true}
                icon={<span className="esri-icon-check-mark"></span>}
                fullWidth={true}
                onClick={this.onSave.bind(this)} />
            </CardText>
          </Card>
          {
            layer.hasAttachments &&
            <Card>
              <CardHeader
                title="Hình ảnh"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <div>
                  <form encType="multipart/form-data" method="post"
                    onChange={this.capNhatHinhAnh.bind(this)}
                  >
                    <input hidden name="f" value="json" />
                    {isLoadingThemHinhAnh && <span className="esri-icon-loading-indicator"></span>}
                    <input type="file" name="attachment" />
                  </form>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {attachments.map(m =>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <a
                          style={{ flexGrow: 1 }}
                          title={m.name} target="_blank" key={m.id} href={m.url}>{m.name}</a>
                        <span
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.xoaHinhAnh(m.id)}
                          className="esri-icon-trash"
                        ></span>
                      </div>
                    )}
                  </div>
                </div>
              </CardText>
            </Card>

          }
          <Snackbar
            message={snackbar} autoHideDuration={4000}
            onRequestClose={() => this.setState({ snackbar: '' })}
            open={snackbar.length > 0}
          />
        </div>
      </MuiThemeProvider>

    );
  }

  /**
   * Cập nhật hình ảnh khi đổi file
   * @param e
   */
  private async capNhatHinhAnh(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    this.setState({ isLoadingThemHinhAnh: true });
    const result = await this.props.capNhatHinhAnh(form);
    const { attributes } = this.props.graphic,
      layer = this.props.graphic.layer as __esri.FeatureLayer;
    if (result.objectId) {
      const attachment = {
        id: result.objectId, name: (form.lastChild as HTMLInputElement).value.split(/(\\|\/)/g).pop(),
        url: `${layer.url}/${layer.layerId}/${attributes.OBJECTID}/attachments/${result.objectId}`
      } as __esri.AttachmentInfo;
      // const attachments = await layer.queryAttachments({ objectIds: [attributes.OBJECTID] });
      this.setState({
        snackbar: 'Thêm hình ảnh thành công',
        isLoadingThemHinhAnh: false,
        attachments: [...this.state.attachments, attachment]
      });
    } else {
      this.setState({ snackbar: result.error.message, isLoadingThemHinhAnh: false, });
    }
  }

  /**
   * Xóa hình ảnh
   * @param id objectid của hình ảnh
   */
  private async xoaHinhAnh(id: number) {
    const layer = this.props.graphic.layer as __esri.FeatureLayer;
    const result = await layer.deleteAttachments(this.props.graphic, [id]);
    if (result.error) {
      this.setState({ snackbar: 'Xóa không thành công' });
    } else {
      let attachments = [...this.state.attachments];
      let index = attachments.findIndex(f => f.id === id);
      if (index > -1) {
        attachments.splice(index, 1);
        this.setState({
          snackbar: 'Xóa thành công',
          attachments
        });
      }
    }
  }

  /**
   * Cập nhật thuộc tính đối tượng
   */
  private async onSave() {
    this.setState({ snackbar: 'Đang cập nhật' });
    const result = await this.props.onSave(this.state.attributes || {});

    let message = result ? 'Cập nhật thành công' : 'Cập nhật thất bại';
    this.setState({ snackbar: message });
  }
}

export default EditingComponent;