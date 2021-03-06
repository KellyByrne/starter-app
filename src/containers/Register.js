import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    renderAlert = () => {
        if (Object.keys(this.props.alert).length > 0) {
           return (
                <div class="border alert alert-danger fade show d-flex align-items-center justify-content-center" role="alert">{this.props.alert.message}</div>
             );  
        }
     }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div  className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                {this.renderAlert()}
                <div className="app-login-main-content">
                    <div className="app-logo-content d-flex align-items-center justify-content-center">
                        <Link className="logo-lg" to="/" title="Jambo">
                            <img src="http://via.placeholder.com/177x65" alt="jambo" title="jambo" />
                        </Link>
                    </div>

                    <div className="app-login-content">
                        <div className="app-login-header">
                            <h1>Register</h1>
                        </div>

                        <div className="mb-4">
                            <h2>Create an account</h2>
                        </div>

                        <div className="app-login-form">
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className={'form-control form-control-lg' + (submitted && !user.firstName ? ' is-invalid' : '')} name="firstName" value={user.firstName} onChange={this.handleChange} />
                                    {submitted && !user.firstName &&
                                        <div className="invalid-feedback">First Name is Required</div>
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className={'form-control form-control-lg' + (submitted && !user.lastName ? ' is-invalid' : '')} name="lastName" value={user.lastName} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="invalid-feedback">Last Name is Required</div>
                                    }
                                </div>
                                <div className="form-group mb-3" >
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className={'form-control form-control-lg' + (submitted && !user.username ? ' is-invalid' : '')} name="username" value={user.username} onChange={this.handleChange} />
                                    {submitted && !user.username &&
                                        <div className="invalid-feedback">Username is Required</div>
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className={'form-control form-control-lg' + (submitted && !user.password ? ' is-invalid' : '')} name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="invalid-feedback">Password is Required</div>
                                    }
                                </div>
                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <Button color="primary" className="text-uppercase">Register</Button>
                                    {registering && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login">I am already a member</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    const {alert} = state;
    return {
        registering,
        alert
    };
}

export default connect(mapStateToProps)(RegisterPage);