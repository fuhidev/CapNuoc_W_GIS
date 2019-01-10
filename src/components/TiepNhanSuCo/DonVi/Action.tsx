import * as React from 'react';
import { Button, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  item: {
    flexGrow: 1
  }
});

type Props = {
  disabled:boolean,
  onClose: () => void,
  onSubmit: () => void
} & WithStyles<typeof styles>;

function ActionComponent(props: Props) {
  const { classes, onClose, onSubmit,disabled } = props;
  return <div className={classes.root}>
    <div className={classes.item}>
      <Button
        fullWidth
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >Xác nhận</Button>
    </div>
    <div className={classes.item}>
      <Button
        fullWidth
        variant="text"
        onClick={onClose}
      >Đóng</Button>
    </div>
  </div>;
};

export default withStyles(styles)(ActionComponent);