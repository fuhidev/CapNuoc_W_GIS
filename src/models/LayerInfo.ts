export interface GroupLayer {
  ID: string; Name: string;
}
export default interface LayerInfo {
  LayerID: string;
  LayerTitle: string;
  IsView: boolean;
  IsCreate: boolean;
  IsDelete: boolean;
  IsEdit: boolean;
  IsVisible: boolean;
  OutFields: string;
  QueryFields: string;
  EditFields: string;
  Definition?: string;
  Url: string;
  GroupLayer?: GroupLayer;
}