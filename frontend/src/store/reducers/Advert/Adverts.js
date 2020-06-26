import {ADVERT_CREATE, GET_CATEGORIES, GET_SEARCH, SEARCH_ADVERTS} from "../../actions/ActionTypes";

const initialState = {
    adverts: [],
    search: '',
    params: {
        categories: '',
        city: '',
        country: ''
    },
    sort: null,
    categories: [],
    cities: [
        'Казань', 'Москва', 'Арск',
        'Санкт-Петербург', 'Набережные Челны', 'Екатеринбург'
    ],
    countries: [
        'Россия', 'Франция', 'США', 'Китай', 'Белоруссия'
    ]
};

export default function advertReducer(state=initialState, action) {
    switch (action.type) {
        case ADVERT_CREATE:
            return {
                ...state,
            };
        case SEARCH_ADVERTS:
            return {
                ...state,
                search: action.search,
                params: action.params,
                adverts: action.adverts,
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case GET_SEARCH:
            return {
                ...state,
                search: action.search,
                params: action.params,
            };
        default:
            return state
    }
}