import * as React from 'react';
import {
  AppBar, Drawer, MenuItem, Card, CardHeader, CardText, Divider, FlatButton
} from 'material-ui';
import { Link } from 'react-router-dom';
import { Route } from '../../modules/routers';
import Auth from '../../modules/Auth';
type Props = {
  title: string,
  routes: Route[]
};

type States = {
  isOpenDrawer: boolean
};

class Header extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenDrawer: false
    };
  }
  render() {
    const { title } = this.props;
    return (
      <div>
        {
          <AppBar
            title={'VAW - ' + title}
            onLeftIconButtonClick={e => this.setState({ isOpenDrawer: true })}
            iconElementRight={
              <div style={{ marginTop: 5 }}>
                <Link to="/logout">
                  <FlatButton label="Đăng xuất" style={{ color: '#fff' }} />
                </Link>
              </div>
            }
          />
        }

        <Drawer
          open={this.state.isOpenDrawer}
          docked={false}
          onRequestChange={(open: boolean) => this.setState({ isOpenDrawer: open })}
        >
          <Card>
            <CardHeader
              textStyle={{ color: 'red' }}
              titleStyle={{ color: '#0370b5', fontSize: 20 }}
              title={Auth.getUsername()}
              subtitle={new Date().toLocaleTimeString()}
            />
          </Card>
          {
            this.props.routes.map(m => <Link key={m.id} style={{ fontSize: 14, fontWeight: 'normal' }}
              to={m.props.path}><MenuItem primaryText={m.name} /></Link>)
          }
          <Divider />
          <CardText>Ứng dụng GIS quản lý mạng lưới VAW</CardText>
          <CardText>Phiên bản: v1.10</CardText>
        </Drawer>
      </div>
    );
  }
}

export default (Header);
