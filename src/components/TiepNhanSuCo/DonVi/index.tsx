import * as React from 'react';
import ActionComponent from './Action';
import FormComponent from './Form';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';
import DonVi from '../../../models/DonVi';
import { getAll } from '../../../services/api/DonViApi';

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 48px)'
  },
  formContainer: {
    flexGrow: 1,
    overflowY: 'auto'
  },
  actionContainer: {
    marginBottom: 7
  },
  title: {
    fontSize: '2rem',
    // fontWeight: 700,
    color: theme.palette.primary.main,
    padding: 15,
    textAlign: 'center'
  },
})

type Props = {
  onClose: () => void,
  onSubmit: (donVi: string) => Promise<boolean>,
  onChangeMaSuCo: (value: string) => void,
  maSuCo: string
} & WithStyles<typeof styles>;

type State = {
  donVis: DonVi[],
  donVi?: string
};

class TNSCDonViComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { donVis: [] };
  }

  async componentDidMount() {
    const results = await getAll();
    this.setState({ donVis: results });
  }

  render() {
    const { classes, maSuCo } = this.props;
    const { donVis, donVi } = this.state;
    return <div className={classes.root}>
      {/* <div className={classes.title}>
        <Typography variant="h3" color="inherit">Thông tin sự cố</Typography>
      </div> */}
      <div className={classes.formContainer}>
        <FormComponent
          donVis={donVis}
          value={donVi || ''}
          onSelect={this.selectDonVi.bind(this)}
          onChangeMaSuCo={this.props.onChangeMaSuCo.bind(this)}
          maSuCo={maSuCo}
        />
      </div>
      <div className={classes.actionContainer}>
        <ActionComponent
          disabled={donVi == undefined}
          onClose={this.props.onClose}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    </div>;
  }

  private selectDonVi(value: string) {
    this.setState({ donVi: value });
  }

  private async onSubmit() {
    if (this.state.donVi) {
      const result = await this.props.onSubmit(this.state.donVi);
      result && this.setState({ donVi: undefined });
    }
  }
}

export default withStyles(styles)(TNSCDonViComponent);