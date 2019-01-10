import * as React from 'react';
import {
  createStyles, withStyles, WithStyles,
  TextField, List, ListItem, ListItemAvatar, Avatar,
  ListItemText, ListItemSecondaryAction, Checkbox, ListSubheader, Divider, FormControl, InputLabel, OutlinedInput, AppBar
} from '@material-ui/core';
import DonVi from '../../../models/DonVi';
const styles = createStyles({
  root: {
  },
  idContainer: {
    marginTop: 10
  },
  searchContainer: {

  },
  listContainer: {
    overflowY: 'auto'
  }
});

type Props = {
  donVis: DonVi[],
  maSuCo: string,
  value: string,
  onSelect: (value: string) => void,
  onChangeMaSuCo: (value: string) => void
} & WithStyles<typeof styles>;

type State = {
  donVis: DonVi[],
};

type SearchProps = {
  onSearch: (value: string) => void
};

function SearchWidget(props: SearchProps) {
  return <div>
    <TextField
      fullWidth
      placeholder="Nhập tên đơn vị cần lọc"
      onChange={(e) => props.onSearch(e.target.value)}
    />
  </div>;
}

type ListViewProps = {
  data: DonVi[],
  onSelect: (value: string) => void,
  checked: string,
};

function ListView(props: ListViewProps) {
  const data = Object.entries(
    props.data.reduce((a, b) => {
      const { LinhVuc } = b;

      a[LinhVuc] = a[LinhVuc]
        ? [...a[LinhVuc], b]
        : [b];

      return a;
    }, {}));
  return <div>
    <List dense >
      {data.map(([linhVuc, items]) => (
        <div key={linhVuc}>
          <ListSubheader>{linhVuc}</ListSubheader>
          {(items as DonVi[]).map(m =>
            <ListItem key={linhVuc + '' + m.MaDonVi} button>
              <ListItemAvatar>
                <Avatar src="/images/not_found.jpg" />
              </ListItemAvatar>
              <ListItemText primary={m.TenDonVi} />
              <ListItemSecondaryAction>
                <Checkbox onChange={() => props.onSelect(m.MaDonVi)} checked={props.checked === m.MaDonVi} />
              </ListItemSecondaryAction>
            </ListItem>
          )}
          <Divider />
        </div>
      ))}
    </List>
  </div>;
}

class FormComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { donVis: [] };
  }
  render() {
    const { classes, value, maSuCo } = this.props;
    const { donVis } = this.state;
    return <div className={classes.root}>
      <div className={classes.idContainer}>
        <TextField
          fullWidth
          variant="outlined"
          value={maSuCo}
          label="Mã sự cố"
          style={{ padding: 10 }}
          onChange={this.onChangeMaSuCo.bind(this)}
        />
      </div>
      <div className={classes.searchContainer}>
        <SearchWidget
          onSearch={this.onSearch.bind(this)}
        /></div>
      <div className={classes.listContainer}>
        <ListView
          data={donVis}
          onSelect={this.onSelect.bind(this)}
          checked={value}
        /></div>
    </div>;
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ donVis: props.donVis }); // cập nhật lại donVis nếu nhận được props mới
  }

  private onSearch(value: string) {
    let list = this.props.donVis.filter(f => f.TenDonVi.toLowerCase().includes(value.toLowerCase()));
    this.setState({ donVis: list });
  }

  private onSelect(value: string) {
    this.props.onSelect(value);
  }

  private onChangeMaSuCo(e:React.ChangeEvent<HTMLInputElement>) {
    this.props.onChangeMaSuCo(e.target.value)
  }
};

export default withStyles(styles)(FormComponent);