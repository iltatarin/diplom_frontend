import {
    AUTH_LOGIN,
    AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_REGISTER_ERROR,
    AUTH_REGISTER_SUCCESS
} from "../../actions/ActionTypes";

const initialState = {
    token: null,
    isAuthenticated: false,
    errorAlert: null,
    successAlert: null,
    userId: null,
    userEmail: null,
    profileId: null,
    profilePhoneNumber: null,
    profileFirstName: null,
    profileLastName: null
};

export default function authReducer(state=initialState, action) {
    switch (action.type) {
        case AUTH_REGISTER:
            return {
                ...state, token: ''
            };
        case AUTH_REGISTER_ERROR:
            return {
                ...state, errorAlert: action.status, successAlert: null
            };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state, successAlert: action.status, errorAlert: null
            };
        case AUTH_LOGIN:
            return {
                ...state
            };
        case AUTH_LOGIN_ERROR:
            return {
                ...state, token: '', isAuthenticated: false
            };
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                userId: action.userId,
                userEmail: action.userEmail,
                profileId: action.profileId,
                profileFirstName: action.profileFirstName,
                profilePhoneNumber: action.profilePhoneNumber,
                profileLastName: action.profileLastName
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                errorAlert: null,
                successAlert: null,
                userId: null,
                userEmail: null,
                profileId: null,
                profileFirstName: null,
                profileLastName: null
            };
        default:
            return state
    }
}