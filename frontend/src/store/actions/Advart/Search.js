import axios from 'axios';
import {GET_SEARCH, SEARCH_ADVERTS} from "../ActionTypes";


export function getSearchedAdverts({search, params})
{
    return async dispatch => {
        const instance = axios.create({
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        try {
            let query_params = `http://localhost:8000/api/advert/adverts/?query=${search}&categories=${params.categories}&city=${params.city}&country=${params.country}`;

            const adverts = await instance.get(query_params);
            const result = adverts.data['result'];
            dispatch({
                type: SEARCH_ADVERTS,
                search: search,
                params: params,
                adverts: result,
            });

        } catch (e) {
            dispatch({
                type: SEARCH_ADVERTS,
                search: search,
                params: params,
                adverts: [],
            });
        }
    }
}

export function setSearch({search, params}) {
    return async dispatch => {
        dispatch({
            type: GET_SEARCH,
            search: search,
            params: params,
        });
    }
}