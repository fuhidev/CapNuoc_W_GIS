import * as React from 'react';
import Header from './Header/Header';
import authService from '../services/api/AuthServices';
import LoadingPage from '../pages/LoadingPage';
import NotAccess from '../pages/NotAccess';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  header: {
    flex: '0 0 auto'
  },
  container: {
    flex: '1 1 auto',
    height: 'calc(100vh - 64px)'
  }
});

type States = {
  isLoadAccess: boolean
  isAccess: boolean
};

type PrivateComponentProps = {
  Component: React.ComponentType<any>
  id: string
}
  & WithStyles<typeof styles>;

class PrivateComponent extends React.Component<PrivateComponentProps, States>{
  constructor(props: PrivateComponentProps) {
    super(props);
    this.state = { isLoadAccess: false, isAccess: false };
  }
  async componentWillMount() {
    const isAccess = await authService.isAccess(this.props.id);
    // if (!isAccess) push('/notaccess');
    this.setState({ isLoadAccess: true, isAccess });
  }
  render() {
    if (this.state.isLoadAccess && !this.state.isAccess) {
      return <NotAccess />;
    }
    if (!this.state.isLoadAccess) {
      return <LoadingPage />;
    }
    const { classes } = this.props;
    return <div className={classes.root}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.container}>
        <this.props.Component id={this.props.id} />
      </div>
    </div>;
  }
}
export default withStyles(styles)(PrivateComponent);