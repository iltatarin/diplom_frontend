import React from "react";
import './Auth.scss';
import {login} from '../../../store/actions/Auth';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router-dom";
import is from 'is_js';

class Auth extends React.Component{
    state = {
        formValid: true,
        email: '',
        emailError: false,
        emailTouched: false,
        emailErrorMessage: 'Введите корректный email',
        password: '',
        passwordError: true,
        passwordTouched: false,
        passwordErrorMessage: 'Минимальная длина пароля 6 символов'
    };

    validateControle(value, validate_type) {
        let isValid = true;

        isValid = value.trim() !== '' && isValid;

        if (validate_type === 'email') {
            isValid = is.email(value) && isValid;
        }

        if (validate_type === 'password') {
            isValid = value.length >= 5 && isValid;
        }

        return isValid;
    }


    formValidChange(){
        let invalidate = true;
        if (!(this.state.emailError || this.state.passwordError)) {
            invalidate = false;
        }
        this.setState({
            formValid: invalidate
        })
    }

    onChangeHandlerEmail = (event) => {
        const validate_controle = this.validateControle(event.target.value, 'email');
        if (validate_controle) {
            this.setState({
                email: event.target.value,
                emailError: false,
                emailTouched: true,
            });
        } else {
            this.setState({
                email: event.target.value,
                emailError: true,
                emailTouched: true,
            });
        }
        this.formValidChange();
    };


    onChangeHandlerPassword = (event) => {
        const validate_controle = this.validateControle(event.target.value, 'password');
        if (validate_controle) {
            this.setState({
                password: event.target.value,
                passwordError: false,
                passwordTouched: true,
            });
        } else {
            this.setState({
                password: event.target.value,
                passwordError: true,
                passwordTouched: true,
            });
        }
        this.formValidChange();
    };


    loginHandler =() => {
        this.props.login(this.state);
        const {history} = this.props;
        history.push('/');
    };

    render(){
        return (
            <div className="Auth">
                <div>
                    <div className="form">
                        <div>
                            <label htmlFor="Email1">Email</label>
                            <input type="email" id="Email" onChange={this.onChangeHandlerEmail}/>
                            {
                                this.state.emailError && this.state.emailTouched
                                    ? <span className="error_message">{this.state.emailErrorMessage}</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="Password1">Пароль</label>
                            <input type="password" id="Password1" onChange={this.onChangeHandlerPassword}/>
                            {
                                this.state.passwordError && this.state.passwordTouched
                                    ? <span className="error_message">{this.state.passwordErrorMessage}</span>
                                    : null
                            }
                        </div>
                        {
                            this.state.passwordError || this.state.emailError || this.state.formValid
                            ?   <button className="loginButton" onClick={this.loginHandler} disabled={true}>
                                    Войти
                                </button>
                            : <button className="loginButton" onClick={this.loginHandler} disabled={false}>
                                    Войти
                                </button>
                        }
                        <div>
                            <NavLink className="button_div" to="/register" style={{textDecoration: 'none'}}>
                                Регистрация
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (state) => dispatch(login(state))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Auth));
