import axios from 'axios';
import {AUTH_LOGIN_SUCCESS, AUTH_LOGOUT} from "./ActionTypes";

export function register({
        email, password, passwordrep, check,
        monitoring_notify, first_name,
        last_name, phone_number
    })
{
    return async dispatch => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const authData = {
            'email': email,
            "password": password,
            "passwordrep": passwordrep,
            "check": check,
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone_number,
            "monitoring_notify": monitoring_notify
        };

        await instance.post('/auth/register/', authData).then(
            (response) => {
                console.log(response.data);
                alert('Поздравляю, вы зарегистрированы.');
                dispatch({
                    type: 'AUTH_REGISTER'
                });
                dispatch({
                    type: 'AUTH_REGISTER_SUCCESS', status: 'Вы зарегистрировались!'
                })
            },
            response => {
                alert('Ошибка! Попробуйте позже!');
                console.log(response.data);
                dispatch({
                    type: 'AUTH_REGISTER_ERROR', status: 'Ошибка при регистрации. Попробуйте ещё раз.'
                })
            }
        );
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
        }
    }
}

export function authSuccess(token) {
    return dispatch => {
        dispatch ({
            type: AUTH_LOGIN_SUCCESS,
            token: token,
            userId: localStorage.getItem('userId'),
            userEmail: localStorage.getItem('userEmail'),
            profileId: localStorage.getItem('profileId'),
            profileFirstName: localStorage.getItem('profileFirstName'),
            profilePhoneNumber: localStorage.getItem('profilePhoneNumber'),
            profileLastName: localStorage.getItem('profileLastName'),
        })
    }
}


export function login({email, password}) {
    return async dispatch => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const authData = {
            'email': email,
            "password": password,
        };
        console.log(authData);

        await instance.post('/auth/login/', authData).then(
            (response) => {
                console.log(response.data);
                alert('Поздравляю, вы авторизованы.');
                const token = response.data['result']['token'];
                const userData = response.data['result']['user'];
                const profileData = response.data['result']['profile'];
                dispatch({
                    type: 'AUTH_LOGIN'
                });

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userData['id']);
                localStorage.setItem('userEmail', userData['email']);
                localStorage.setItem('profileId', profileData['id']);
                localStorage.setItem('profileFirstName', profileData['first_name']);
                localStorage.setItem('profilePhoneNumber', profileData['phone_number']);
                localStorage.setItem('profileLastName', profileData['last_name']);

                dispatch({
                    type: 'AUTH_LOGIN_SUCCESS',
                    token: token,
                    userId: userData['id'],
                    profileId: profileData['id'],
                    profileFirstName: profileData['first_name'],
                    profilePhoneNumber: profileData['phone_number'],
                    profileLastName: profileData['last_name']
                })
            },
            response => {
                alert('Ошибка! Попробуйте позже!');
                console.log(response.data);
                dispatch({
                    type: 'AUTH_LOGIN_ERROR', status: 'Ошибка при входе в систему'
                })
            }
        );
    }
}


export function logout() {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('profileId');
        localStorage.removeItem('profileFirstName');
        localStorage.removeItem('profilePhoneNumber');
        localStorage.removeItem('profileLastName');
        dispatch({
            type: AUTH_LOGOUT
        })
    }
}