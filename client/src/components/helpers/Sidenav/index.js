import React from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';

import { logout } from 'redux/actions/authActions';
import './sidenav.css';

class Sidenav extends React.Component {
  state = {
    instance: null
  }

  componentDidMount(){
    this.setState({
      instance: M.Sidenav.init(this.sidenav)
    });
  }

  doLogout = () => {
      this.state.instance.close();
      this.props.logout();
  }

  render() {
      const { user } = this.props;

      return (
          <>
            <ul 
                id="slide-out" 
                className="sidenav sidenav-fixed" 
                ref={ (e) => {this.sidenav = e} } 
                style={{
                        borderRight: '1px solid #eeeeee',
                        height: '100vh'
                    }}
            >
                <li>
                  <div style={{padding: '20px', height: '100px'}}>
                    <i className="material-icons medium grey-text pfpIcon" style={{userSelect: 'none'}}>account_circle</i>
                    <span 
                        className="grey-text text-darken-3 username" 
                        style={{
                            fontSize: '22px', 
                            fontWeight: '500',
                        }}
                    >
                      {user.first} {user.last}&nbsp;
                    </span>
                    {user.isAdmin && <span className="verified_icon">
                        <i className="material-icons tiny blue-text" style={{userSelect: 'none'}}>verified</i>
                    </span>}
                  </div>
                </li>
                <li>
                  <a href="/">Event Calendar</a>
                </li>
                <li className="route">
                    <a href="/stats">Stats</a>
                </li>
                <li className="logout_button" style={{borderTop: '2px solid #eeeeee'}}>
                    <a className="waves-effect" href="#!" onClick={this.doLogout}>
                        <i className="material-icons tiny" style={{fontSize: '1.5rem', transform: 'translateY(2px)', userSelect: 'none'}}>keyboard_return</i>
                        Logout
                    </a>
                </li>
            </ul>
            <a href="#!" data-target="slide-out" className="sidenav-trigger" style={{zIndex: '5'}}>
                <i className="material-icons grey-text text-darken-2 small">menu</i>
            </a>
          </>
      );
  };
};

export default connect(null, { logout })(Sidenav);