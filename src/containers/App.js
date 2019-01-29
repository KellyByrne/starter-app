import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import 'react-big-calendar/lib/less/styles.less';
import "react-toggle-switch/dist/css/switch.min.css";
import 'rc-drawer/assets/index.css';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import AppLocale from '../lngProvider';
import {alertActions} from '../actions';

import MainApp from 'app/index';
import asyncComponent from "util/asyncComponent";

// const PrivateRoute = ({ component: Component, ...rest }) => 
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />;


class App extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        this.props.history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {match, location, locale, isDirectionRTL, alert} = this.props;
        if (location.pathname === '/') {
            return ( <Redirect to={'/app/sample-page'}/> );
        }

        // for RTL Support
        if (isDirectionRTL) {
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl');
        }

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <div className="app-main">
                    {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    <Switch>
                        <Route path={`${match.url}app`} component={MainApp}/>
                        <Route
                            component={asyncComponent(() => import('components/Error404'))}/>
                    </Switch>
                </div>
            </IntlProvider>
        );
    }
}

const mapStateToProps = (state) => {
    const {alert} = state;
    const {locale, isDirectionRTL} = state.settings;
    return {locale, isDirectionRTL, alert}
};

export default connect(mapStateToProps)(App);
