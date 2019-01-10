import * as React from 'react';
import Header from './Header/Header';
import authService from '../services/api/AuthServices';
import LoadingPage from '../pages/LoadingPage';
import NotAccess from '../pages/NotAccess';

type States = {
  isLoadAccess: boolean
  isAccess: boolean
}

type PrivateComponentProps = {
  Component: React.ComponentType<any>
  id: string
};

class PrivateComponent extends React.Component<PrivateComponentProps, States>{
  constructor(props: PrivateComponentProps) {
    super(props);
    this.state = { isLoadAccess: false, isAccess: false };
  }
  async componentWillMount() {
    const isAccess = await authService.isAccess(this.props.id);
    // if (!isAccess) push('/notaccess');
    this.setState({ isLoadAccess: true, isAccess })
  }
  render() {
    if (this.state.isLoadAccess && !this.state.isAccess) {
      return <NotAccess />
    }
    if (!this.state.isLoadAccess) {
      return <LoadingPage />
    }
    return <div>
      <Header />
      <this.props.Component id={this.props.id} />
    </div>;
  }
}
export default PrivateComponent;