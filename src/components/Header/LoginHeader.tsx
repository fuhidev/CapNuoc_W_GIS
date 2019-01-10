import * as React from 'react';
type Props = {

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
    return (
      <div className="header">
        <div className="logo">
          <img src="./images/logo.png" alt="Logo" />
        </div>
        <div className="title">
          <div className="main">
            Tổng công ty cấp nước Sài Gòn
        </div>
          <div className="sub">
            Công ty Cổ phần Cấp nước Vĩnh Long  
            </div>
        </div>
      </div>
    );
  }
}

export default (Header);
