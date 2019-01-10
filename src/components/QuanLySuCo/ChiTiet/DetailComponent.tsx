import * as React from 'react';
import {
  createStyles, WithStyles, withStyles,
  ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Theme, LinearProgress, CircularProgress, Avatar
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SuCoThongTin from '../../../models/SuCoThongTin';
import AttachmentComponent from './Detail/AttachmentComponent';
import * as moment from 'moment/moment';
import { COLORS } from '../../../services/map/SuCo/model';
const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  expansionPanel: {
  },
  avatar: {
    marginRight: 7
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanelDetails: {
    display: 'block'
  }
});

type State = {
  attachments?: any[],
  dangTaiHinhAnh: boolean
};

type Props = {
  data: SuCoThongTin
}
  & WithStyles<typeof styles>

class DetailComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { dangTaiHinhAnh: false }
  }
  render() {
    const { classes, data } = this.props;
    const { dangTaiHinhAnh, attachments } = this.state;
    return <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Avatar src={this.getSrcAvatar(data.TinhTrang || "MTN")} />
          <Typography color="inherit" className={classes.heading}>{data.MaDonVi}</Typography>
          <Typography color="inherit" className={classes.secondaryHeading}>{data.NguoiChuyenTiep} chuyển tiếp vào {data.TGChuyenTiep && moment(new Date(data.TGChuyenTiep)).fromNow()}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <div>

            {data.NoiDungPhanHoi &&
              <Typography> Phản hồi nội dung: <strong>{data.NoiDungPhanHoi}</strong> vào {data.TGPhanHoi && moment(new Date(data.TGPhanHoi)).fromNow()}</Typography>
            }
            {
              !data.NoiDungPhanHoi && <Typography>Chưa có nội dung phản hồi</Typography>
            }
          </div>
          <div>
            {!attachments && <a href="#" onClick={this.loadAttachment.bind(this)}>Nhấn vào đây để xem hình ảnh</a>}
            {dangTaiHinhAnh && <div> <CircularProgress /></div>}
            {attachments && <AttachmentComponent attachments={attachments} />}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  }

  /**
   * Tải hình ảnh
   */
  private loadAttachment(e: React.MouseEvent) {
    e.preventDefault();
    if (this.state.dangTaiHinhAnh) return;
    try {
      this.setState({ dangTaiHinhAnh: true });
      setTimeout(() => {
        this.setState({ attachments: [] });
        this.setState({ dangTaiHinhAnh: false });
      }, 2000);
    } catch (error) {

    }
    finally {

    }
  }

  private getSrcAvatar(tinhTrang: string, linhVuc: number = -1): string {
    const baseUrl = `/images/map/suco/`;
    return baseUrl + `${linhVuc}-${tinhTrang}.png`;
  }
};

// const ContentComponent = (props)=>{
// return <div>
//   Pha
// </div>
// }

export default withStyles(styles)(DetailComponent);