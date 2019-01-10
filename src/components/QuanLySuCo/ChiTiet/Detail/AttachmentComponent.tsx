import * as React from 'react';
import { createStyles, WithStyles, withStyles, Typography } from '@material-ui/core'
const styles = createStyles({
  root: {

  }
});

type Props = {
  attachments: any[]
}
  & WithStyles<typeof styles>;

class AttachmentComponent extends React.Component<Props, {}>{
  render() {
    return <Typography variant="h4" >Đang phát triển...</Typography>
  }
}

export default withStyles(styles)(AttachmentComponent);