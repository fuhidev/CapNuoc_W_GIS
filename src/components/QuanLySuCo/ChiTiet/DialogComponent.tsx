import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = createStyles({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(propss:any) {
  return <Slide direction="up" {...propss} />;
}

type Props = {
  open: boolean,
  onClose: () => void,
  title: string,
  headerButtons?: { title: string, onClick: () => void }[]
}
  & WithStyles<typeof styles>;

class FullScreenDialog extends React.Component<Props, {}> {

  render() {
    const { classes, open, children, onClose, title, headerButtons } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              {
                headerButtons &&
                headerButtons.map(m =>
                  <Button color="inherit" onClick={m.onClick}>{m.title}</Button>)
              }
            </Toolbar>
          </AppBar>
          {children}
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FullScreenDialog);