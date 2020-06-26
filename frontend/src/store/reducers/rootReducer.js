import {combineReducers} from 'redux';
import authReducer from "./Auth/Auth";
import advertReducer from "./Advert/Adverts";

export default combineReducers({
    auth: authReducer,
    advert: advertReducer,
});