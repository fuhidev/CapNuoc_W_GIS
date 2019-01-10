import * as React from 'react';
import { Typography } from '@material-ui/core';
export default class NotFound extends React.Component {
  render() {
    return <div style={{ textAlign: 'center' }}>
      <Typography variant="title">Không có quyền truy cập</Typography>
    </div>;
  }
}