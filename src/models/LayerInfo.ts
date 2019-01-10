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
  OutFields?: string;
  Definition?: string;
  Url: string;
  GroupLayer?: GroupLayer;
}