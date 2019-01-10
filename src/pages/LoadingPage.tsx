import * as React from 'react';
import { CircularProgress, StyleRulesCallback, WithStyles, withStyles } from '@material-ui/core';

const styles: StyleRulesCallback = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: '100%', height: '100vh'
  },
  progress: {
    width: 50,
    height: 50,
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
});

class LoadingPage extends React.Component<WithStyles<typeof styles>,{}> {
  render() {
    const {classes}=this.props;
    return <div className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress style={{color:'#fff'}} />
      </div>
    </div>
  }
}

export default withStyles(styles)(LoadingPage);