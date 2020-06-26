import axios from 'axios';
import {GET_CATEGORIES} from "../ActionTypes";

export function getCategoryList()
{
    return async dispatch => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        try {
            const categories = await instance.get('/category/categories/');
            const result = categories.data['result'];

            dispatch({
                type: GET_CATEGORIES,
                categories: result,
            });
        } catch (e) {
            dispatch({
                type: GET_CATEGORIES,
                categories: [],
            });
        }
    }
}
