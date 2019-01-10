import * as React from 'react';
import {
  Button,
  createStyles, WithStyles, withStyles
} from '@material-ui/core';

const styles = createStyles({
  root: {
    '& .fa':{
      marginRight: 10
    },
    '& .fas':{
      marginRight: 10
    }
  }
});

const SearchingAction = (props: {
  onSearch: (e: React.MouseEvent) => void,
  onClear: (e: React.MouseEvent) => void
} & WithStyles<typeof styles>) => (
    <div className={props.classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={props.onSearch}
      >
        <i className="fa fa-search" />
        Tìm
      </Button>
      <Button
        variant="text"
        onClick={props.onClear}
      >
        <i className="fas fa-eraser" />
        Xóa trắng
      </Button>
    </div>
  );

export default withStyles(styles)(SearchingAction);