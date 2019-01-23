import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

// Esri
import Print = require('esri/widgets/Print');
import { SERVICE_PRINT } from '../../constants/map';
const styles = createStyles({
  root: {}
});

type Props = {
  view: __esri.SceneView | __esri.MapView
}
  & WithStyles<typeof styles>;

type States = {

};

class PrintComponent extends React.Component<Props, States>{
  private container: HTMLDivElement | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}
      ref={e => this.container = e}
    >

    </div>;
  }
  componentDidMount() {
    if (this.container) {
      new Print({
        view: this.props.view,
        container: this.container,
        printServiceUrl: SERVICE_PRINT
      });
    }
  }
}

export default withStyles(styles)(PrintComponent);