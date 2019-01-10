import * as React from 'react';
import User from '../services/user/model';
import { Card, TextField, Button, createStyles, WithStyles, Theme, withStyles, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  container: {
    margin: '20px auto',
    textAlign: 'center',
    maxWidth: 700
  },
  title: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight:700,
    marginTop:15,
    color: theme.palette.primary.main
  },
  cardHeading: {
    padding: 16
  },

});

type Props = {
  onSubmit: (event: object) => void
  onChange: (event: object) => void
  user: User,
} & WithStyles<typeof styles>;
type States = {

};

class LoginComponent extends React.Component<Props, States> {
  render() {
    const { user, onChange, onSubmit, classes } = this.props;
    return (
      <Card className={classes.container}>
        <form action="/" onSubmit={onSubmit}>
          <Typography className={classes.title} > Đăng nhập</Typography>
          <div className={classes.cardHeading}>
            <TextField
              label="Tài khoản"
              name="username"
              onChange={onChange}
              value={user.username}
            />
          </div>

          <div className={classes.cardHeading}>
            <TextField
              label="Mật khẩu"
              type="password"
              name="password"
              onChange={onChange}
              value={user.password}
            />
          </div>

          <div className={classes.cardHeading}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default withStyles(styles)(LoginComponent);