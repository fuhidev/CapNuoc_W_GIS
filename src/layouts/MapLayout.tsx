import * as React from 'react';
import Header from '../components/Header/Header';
import { Route } from '../modules/routers';
import { Profile } from '../models/User';

type Props = {
  routes: Route[],
  title: string,
  profile: Profile
};

export default class MapLayout extends React.Component<Props, {}> {
  render() {
    const { routes, title, children, profile } = this.props;

    return (
      <div>
        <Header routes={routes} title={title} displayName={profile.DisplayName} />
        {children}
      </div>
    );
  }
}