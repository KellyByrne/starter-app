import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';

import {
    ABOVE_THE_HEADER,
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION
} from 'constants/ActionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';

import { alertActions } from '../actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        this.props.history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {match, drawerType, navigationStyle, horizontalNavPosition, alert} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height')
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height')
        }
        return (
            <div className={`app-container ${drawerStyle}`}>
                <Sidebar/>
                <div className="app-main-container">
                    <div className="app-header">
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
                        <TopNav styleName="app-top-header"/>}
                        <Header/>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
                        <TopNav/>}

                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                            <Switch>
                                <Route path={`${match.url}/sample-page`}
                                       component={asyncComponent(() => import('./routes/SamplePage'))}/>
                                <Route path={`${match.url}/other-sample-page`}
                                       component={asyncComponent(() => import('./routes/OtherSamplePage'))}/>
                                <Route path={`${match.url}/register`}
                                       component={asyncComponent(() => import('./routes/RegisterPage'))}/>
                                <Route path={`${match.url}/login`}
                                       component={asyncComponent(() => import('./routes/LoginPage'))}/>
                                <Route component={asyncComponent(() => import('components/Error404'))}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const {drawerType, navigationStyle, horizontalNavPosition} = state.settings;
    const {alert} = state;
    return {drawerType, navigationStyle, horizontalNavPosition, alert}
};
export default withRouter(connect(mapStateToProps)(App));