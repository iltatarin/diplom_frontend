import React from "react";
import './RegisterForm.scss';
import {register} from '../../../store/actions/Auth';
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import is from "is_js";

class RegisterForm extends React.Component{
    state = {
        registerClick: false,
        formValid: false,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordrep: '',
        check: false,
        monitoring_notify: true,
        phone_number: '',

        first_nameError: true,
        last_nameError: true,
        emailError: true,
        passwordError: true,
        passwordrepError: true,
        phone_numberError: true,

        first_nameTouched: false,
        last_nameTouched: false,
        emailTouched: false,
        passwordTouched: false,
        passwordrepTouched: false,
        phone_numberTouched: false,
        checkTouched: false,
    };

    validateControle(value, validate_type) {
        let isValid = true;

        isValid = value.trim() !== '' && isValid;

        if (validate_type === 'email') {
            isValid = is.email(value) && isValid;
        }
        if (validate_type === 'phone_number') {
            isValid = /^((\+7)+([0-9]){10})$/.test(value) && isValid;
        }

        if (validate_type === 'password') {
            isValid = value.length >= 6 && isValid;
        }

        if (validate_type === 'passwordrep') {
            isValid = value === this.state.password && isValid;
        }

        return isValid;
    }

    formValidChange(){
        let valid = false;
        if (
            this.state.first_nameTouched && this.state.last_nameTouched && this.state.emailTouched
            && this.state.passwordTouched && this.state.passwordrepTouched && this.state.phone_numberTouched
            && this.state.checkTouched
        ) {
            if (!(this.state.emailError || this.state.passwordError || this.state.first_nameError
                || this.state.last_nameError || this.state.passwordrepError || this.state.phone_numberError
                || this.state.check)) {
                valid = true;
            }
        }
        this.setState({
            formValid: valid
        })
    }

    onChangeHandlerEmail = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'email');

        if (validate_controle) {
            this.setState({
                email: input_value,
                emailError: false,
                emailTouched: true,
            });
        } else {
            this.setState({
                email: input_value,
                emailError: true,
                emailTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerFirstName = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'first_name');

        if (validate_controle) {
            this.setState({
                first_name: input_value,
                first_nameError: false,
                first_nameTouched: true,
            });
        } else {
            this.setState({
                first_name: input_value,
                first_nameError: true,
                first_nameTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerLastName = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'last_name');

        if (validate_controle) {
            this.setState({
                last_name: input_value,
                last_nameError: false,
                last_nameTouched: true,
            });
        } else {
            this.setState({
                last_name: input_value,
                last_nameError: true,
                last_nameTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerPassword = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'password');

        if (validate_controle) {
            this.setState({
                password: input_value,
                passwordError: false,
                passwordTouched: true,
            });
        } else {
            this.setState({
                password: input_value,
                passwordError: true,
                passwordTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerPasswordrep = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'passwordrep');

        if (validate_controle) {
            this.setState({
                passwordrep: input_value,
                passwordrepError: false,
                passwordrepTouched: true,
            });
        } else {
            this.setState({
                passwordrep: input_value,
                passwordrepError: true,
                passwordrepTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerPhone = (event) => {
        const input_value = event.target.value;
        const validate_controle = this.validateControle(input_value, 'phone_number');

        if (validate_controle) {
            this.setState({
                phone_number: input_value,
                phone_numberError: false,
                phone_numberTouched: true,
            });
        } else {
            this.setState({
                phone_number: input_value,
                phone_numberError: true,
                phone_numberTouched: true,
            });
        }
        this.formValidChange();
    };

    onChangeHandlerCheck = (event) => {
        this.setState({
            check: event.target.checked,
            checkTouched: true,
        });
        this.formValidChange();
    };

    onChangeHandlerNotify = (event) => {
        this.setState({
            monitoring_notify: event.target.checked
        });
    };

    changeTouchecAllForms() {
        this.setState({
            first_nameTouched: true,
            last_nameTouched: true,
            emailTouched: true,
            passwordTouched: true,
            passwordrepTouched: true,
            phone_numberTouched: true,
            checkTouched: true,
        });
    }

    registerHandler =() => {
        this.changeTouchecAllForms();

        this.setState({
            registerClick: true
        });

        if (this.state.formValid){
            this.props.registerHandler(this.state);
            const {history} = this.props;
            history.push('/auth');
        }
    };

    render(){
        return (
            <div className="RegisterForm">
                <div>
                    <div className="form">
                        <div>
                            <label htmlFor="firstname">Имя</label>
                            <input type="text" id="firstname" onChange={this.onChangeHandlerFirstName}/>
                            {
                                this.state.first_nameError && this.state.first_nameTouched
                                    ? <span className="error_message">Введите имя</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="lastname">Фамилия</label>
                            <input type="text" id="lastname" onChange={this.onChangeHandlerLastName}/>
                            {
                                this.state.last_nameError && this.state.last_nameTouched
                                    ? <span className="error_message">Введите фамилию</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="Email1">Email</label>
                            <input type="email" id="Email" onChange={this.onChangeHandlerEmail}/>
                            {
                                this.state.emailError && this.state.emailTouched
                                    ? <span className="error_message">Введите корректный email</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="Password1">Пароль</label>
                            <input type="password" id="Password1" onChange={this.onChangeHandlerPassword}/>
                            {
                                this.state.passwordError && this.state.passwordTouched
                                    ? <span className="error_message">Минимальная длина пароля 6 символов</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="Password2">Подтвердить пароль</label>
                            <input type="password" id="Password2" onChange={this.onChangeHandlerPasswordrep}/>
                            {
                                this.state.passwordrepError && this.state.passwordrepTouched
                                    ? <span className="error_message">Пароли не совпадают</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label htmlFor="phone">Номер телефона</label>
                            <input type="text" id="phone" onChange={this.onChangeHandlerPhone}/>
                            {
                                this.state.phone_numberError && this.state.phone_numberTouched
                                    ? <span className="error_message">Введите корректный номер (+79123456789)</span>
                                    : null
                            }
                        </div>
                        <div className="notify">
                            <label htmlFor="exampleCheck1">Получать уведомления на почту</label>
                            <input type="checkbox" id="exampleCheck1" checked={this.state.monitoring_notify} onChange={this.onChangeHandlerNotify}/>
                        </div>
                        <div className="check">
                            <label htmlFor="exampleCheck1">Согласен с правилами сайта</label>
                            <input type="checkbox" id="exampleCheck2" checked={this.state.check} onChange={this.onChangeHandlerCheck}/>
                            <br/>
                            {
                                !this.state.check && this.state.checkTouched
                                    ? <span className="error_message">Необходимо согласие с правилами</span>
                                    : null
                            }
                        </div>
                        <div>
                            <button onClick={this.registerHandler}>
                                Зарегистрироваться
                            </button>
                            {
                                (this.state.registerClick && !this.state.formValid)
                                ? <span className="error_message">Заполните все поля</span>
                                : null
                            }
                        </div>
                        <div>
                            <NavLink className="button_div" to="/auth" style={{textDecoration: 'none'}}>
                                Войти
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
        registerHandler: (state) => dispatch(register(state))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm));
