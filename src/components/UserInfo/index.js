import React from 'react';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { userActions } from '../../actions';

class UserInfo extends React.Component {
    logOut = () => {
        this.props.dispatch(userActions.logout()); 
        console.log('logged out'); 
    } 

    render() {
        return (
            <div>
                <div className="user-profile">
                    <img className="user-avatar border-0 size-40" src="http://via.placeholder.com/150x150"
                         alt="User"/>
                        <div className="user-detail ml-2">
                            <h4 className="user-name mb-0">Chris Harris</h4>
                            <small>Administrator</small>
                        </div>
                </div>
                    <a className="dropdown-item text-muted" href="javascript:void(0)">
                        <i className="zmdi zmdi-face zmdi-hc-fw mr-1"/>
                        <IntlMessages id="popup.profile"/>
                    </a>
                    <a className="dropdown-item text-muted" href="javascript:void(0)">
                        <i className="zmdi zmdi-settings zmdi-hc-fw mr-1"/>
                        <IntlMessages id="popup.setting"/>
                    </a>
                <a onClick={this.logOut} className="dropdown-item text-muted" href="javascript:void(0)">
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1"/>
                        Logout
                    </a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(UserInfo);


